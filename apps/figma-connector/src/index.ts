import dotenv from "dotenv";
import path from "path";
import axios, { AxiosError } from "axios";
import yaml from "js-yaml";
import fs from "fs/promises";

import type {
	ProcessedDesignSystemData,
	FigmaComponentNode,
	FigmaVariable,
	FigmaVariableCollection,
	BaseFigmaNode,
	FigmaNode, // API 응답 타입으로 사용
} from "@figma-design-system-query/types";

const MONOREPO_ROOT = path.resolve(process.cwd(), "../..");
dotenv.config({ path: path.resolve(MONOREPO_ROOT, ".env") });

// --- Configuration ---
const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

const OUTPUT_DIR_NAME = process.env.OUTPUT_YAML_DIR || "output/design-system";
const OUTPUT_DIR = path.resolve(MONOREPO_ROOT, OUTPUT_DIR_NAME);
const OUTPUT_FILE_PATH = path.join(OUTPUT_DIR, "design-system-data.yaml");

const FIGMA_API_BASE_URL = "https://api.figma.com/v1";

/**
 * Figma API로부터 파일 전체 데이터를 가져옵니다.
 */
async function fetchFigmaFileAndVariables(
	fileKey: string,
	token: string
): Promise<{ fileData: any; variablesData: any }> {
	if (!token) {
		throw new Error(
			"Figma API token is not provided. Set FIGMA_API_TOKEN environment variable."
		);
	}
	if (!fileKey) {
		throw new Error(
			"Figma File ID is not provided. Set FIGMA_FILE_ID environment variable."
		);
	}

	const fileUrl = `${FIGMA_API_BASE_URL}/files/${fileKey}`;
	// 로컬 변수 엔드포인트 (퍼블리시된 라이브러리 변수는 다른 엔드포인트 필요)
	const variablesUrl = `${FIGMA_API_BASE_URL}/files/${fileKey}/variables/local`;

	console.log(`Fetching file data from Figma API: ${fileUrl}`);
	console.log(`Fetching local variables data from Figma API: ${variablesUrl}`);

	try {
		const [fileResponse, variablesResponse] = await Promise.all([
			axios.get(fileUrl, { headers: { "X-Figma-Token": token } }),
			axios.get(variablesUrl, { headers: { "X-Figma-Token": token } }),
		]);

		return {
			fileData: fileResponse.data,
			variablesData: variablesResponse.data,
		};
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			console.error(
				`Figma API Error: ${error.response.status} - ${JSON.stringify(
					error.response.data
				)}`
			);
			throw new Error(
				`Figma API request failed with status ${error.response.status}`
			);
		}
		throw error;
	}
}

/**
 * Figma API 응답 데이터를 우리가 원하는 형태로 가공합니다.
 */
function transformFigmaData(
	fileData: any,
	variablesData: any
): ProcessedDesignSystemData {
	console.log("Transforming Figma data...");
	const { name: fileName, lastModified, document } = fileData;

	const processedComponents: ProcessedDesignSystemData["components"] = {};
	const processedVariables: ProcessedDesignSystemData["variables"] = {};
	const processedVariableCollections: ProcessedDesignSystemData["variableCollections"] =
		{};

	// 1. 컴포넌트 정보 추출 (단순화된 예시)
	function findAndProcessComponentsRecursive(node: FigmaNode): void {
		// API 응답 노드 타입 사용
		if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
			const componentNode = node as FigmaComponentNode; // 타입 단언
			processedComponents[componentNode.id] = {
				id: componentNode.id,
				name: componentNode.name,
				type: componentNode.type,
				description: componentNode.description || "",
			};
		}
		if (node.children) {
			for (const child of node.children) {
				findAndProcessComponentsRecursive(child as FigmaNode); // 자식도 FigmaNode로 간주
			}
		}
	}

	if (document && document.children) {
		for (const page of document.children) {
			findAndProcessComponentsRecursive(page as FigmaNode);
		}
	}

	// 2. 변수 및 컬렉션 정보 처리
	if (variablesData && variablesData.meta) {
		const { variables, collections } = variablesData.meta;

		if (variables) {
			for (const varId in variables) {
				const v = variables[varId] as Omit<FigmaVariable, "valuesByMode"> & {
					valuesByMode: Record<string, { value: any; modeId: string }>;
				}; // API 응답 구조에 맞게 임시 타입
				processedVariables[varId] = {
					id: varId,
					name: v.name,
					resolvedType: v.resolvedType,
					description: v.description,
					scopes: v.scopes,
					codeSyntax: v.codeSyntax || {},
					// API 응답의 valuesByMode는 { modeId: { value: ... } } 형태일 수 있음, shared-types에 맞게 변환 필요
					// 여기서는 단순화를 위해 API 응답 형태를 그대로 사용한다고 가정하고, 실제로는 변환 로직 추가
					valuesByMode: Object.entries(v.valuesByMode).reduce(
						(acc, [modeId, modeValWrapper]) => {
							acc[modeId] = (modeValWrapper as any).value; // 실제 API 응답 구조 확인 필요
							return acc;
						},
						{} as Record<string, any>
					),
				};
			}
		}

		if (collections) {
			for (const collId in collections) {
				const c = collections[collId] as FigmaVariableCollection;
				processedVariableCollections[collId] = {
					id: collId,
					name: c.name,
					modes: c.modes,
					defaultModeId: c.defaultModeId,
				};
			}
		}
	}

	return {
		fileName,
		lastModified,
		components: processedComponents,
		variables: processedVariables,
		variableCollections: processedVariableCollections,
	};
}

/**
 * 데이터를 YAML 형식으로 변환하여 파일에 저장합니다.
 */
async function saveDataToYaml(
	data: ProcessedDesignSystemData,
	filePath: string
): Promise<void> {
	console.log(`Saving data to YAML file: ${filePath}`);
	try {
		const yamlData = yaml.dump(data, {
			indent: 2,
			noRefs: true,
			sortKeys: true,
		});

		const dirname = path.dirname(filePath);
		await fs.mkdir(dirname, { recursive: true });

		await fs.writeFile(filePath, yamlData, "utf8");
		console.log(`Data successfully saved to ${filePath}`);
	} catch (error) {
		console.error("Error saving data to YAML:", error);
		throw error;
	}
}

/**
 * 메인 실행 함수
 */
async function runConnector() {
	console.log("Starting Figma Connector...");

	if (!FIGMA_API_TOKEN || !FIGMA_FILE_ID) {
		console.error(
			"Error: FIGMA_API_TOKEN or FIGMA_FILE_ID environment variable is not set. Check your .env file."
		);
		process.exit(1);
	}

	try {
		const { fileData, variablesData } = await fetchFigmaFileAndVariables(
			FIGMA_FILE_ID,
			FIGMA_API_TOKEN
		);
		const processedData = transformFigmaData(fileData, variablesData);
		await saveDataToYaml(processedData, OUTPUT_FILE_PATH);

		console.log("Figma Connector finished successfully.");
	} catch (error) {
		// 에러 객체가 Error 인스턴스인지 확인 후 메시지 출력
		if (error instanceof Error) {
			console.error("Figma Connector failed:", error.message);
			if (error.stack) {
				console.error(error.stack);
			}
		} else {
			console.error("Figma Connector failed with an unknown error:", error);
		}
		process.exit(1);
	}
}

// --- 실행 ---
runConnector();
