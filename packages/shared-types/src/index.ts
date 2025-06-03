export type FigmaNodeType =
	| "DOCUMENT"
	| "CANVAS"
	| "FRAME"
	| "GROUP"
	| "VECTOR"
	| "BOOLEAN_OPERATION"
	| "STAR"
	| "LINE"
	| "ELLIPSE"
	| "POLYGON"
	| "RECTANGLE"
	| "TEXT"
	| "SLICE"
	| "COMPONENT"
	| "COMPONENT_SET"
	| "INSTANCE"
	| "STICKY"
	| "SHAPE_WITH_TEXT"
	| "CONNECTOR"
	| "WIDGET"
	| "EMBED"
	| "LINK_UNFURL"
	| "SECTION"
	| "TABLE"
	| "TABLE_CELL";

// 기본 Figma 노드 인터페이스
export interface BaseFigmaNode {
	id: string;
	name: string;
	type: FigmaNodeType;
	children?: FigmaNode[]; // 자식 노드 (재귀적)
}

// Figma 컴포넌트/컴포넌트 셋 노드
export interface FigmaComponentNode extends BaseFigmaNode {
	type: "COMPONENT" | "COMPONENT_SET";
	description?: string;
	// componentPropertyDefinitions?: any; // 필요시 추가
	// componentSetId?: string; // COMPONENT_SET의 자식인 경우
}

// Figma 인스턴스 노드
export interface FigmaInstanceNode extends BaseFigmaNode {
	type: "INSTANCE";
	componentId?: string; // 원본 컴포넌트 ID
	// componentProperties?: any; // 필요시 추가
}

// 다양한 Figma 노드 타입을 위한 유니온 타입 (필요에 따라 확장)
export type FigmaNode = BaseFigmaNode | FigmaComponentNode | FigmaInstanceNode;

// Figma 변수 관련 타입
export type FigmaVariableScope =
	| "ALL_SCOPES"
	| "TEXT_CONTENT"
	| "CORNER_RADIUS"
	| "WIDTH_HEIGHT"
	| "GAP"
	| "STROKE_FLOAT"
	| "OPACITY"
	| "EFFECT_FLOAT"
	| "FILL_COLOR"
	| "STROKE_COLOR"
	| "TEXT_FILL_COLOR"
	| "EFFECT_COLOR"
	| "FILL_STYLE_ID"
	| "STROKE_STYLE_ID"
	| "TEXT_STYLE_ID"
	| "EFFECT_STYLE_ID";

export type FigmaVariableResolvedType =
	| "BOOLEAN"
	| "FLOAT"
	| "STRING"
	| "COLOR";

// RGBA 색상 값
export interface FigmaColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

// 변수의 각 모드에 대한 값
export type FigmaVariableValue = string | number | boolean | FigmaColor;

export interface FigmaVariable {
	id: string; // "VariableID:20:21"
	name: string; // "colors/primary" 또는 "radius/small"
	key: string; // API에서 반환되는 유니크 키
	variableCollectionId: string;
	resolvedType: FigmaVariableResolvedType;
	description: string;
	hiddenFromPublishing: boolean;
	scopes: FigmaVariableScope[];
	codeSyntax: Record<string, string>; // e.g. { "WEB": "tokens.colors.primary" }
	valuesByMode: Record<string, FigmaVariableValue>; // ModeID to Value 매핑
}

export interface FigmaVariableCollection {
	id: string;
	name: string;
	modes: { modeId: string; name: string }[];
	defaultModeId: string;
	variableIds: string[];
}

// figma-connector가 최종적으로 생성할 YAML 데이터 구조
export interface ProcessedDesignSystemData {
	fileName: string;
	lastModified: string;
	components: Record<
		string,
		Pick<FigmaComponentNode, "id" | "name" | "type" | "description">
	>; // ID를 키로 사용
	variables?: Record<
		string,
		Pick<
			FigmaVariable,
			| "id"
			| "name"
			| "resolvedType"
			| "valuesByMode"
			| "scopes"
			| "description"
			| "codeSyntax"
		>
	>; // ID를 키로 사용
	variableCollections?: Record<
		string,
		Pick<FigmaVariableCollection, "id" | "name" | "modes" | "defaultModeId">
	>; // ID를 키로 사용
	// 필요에 따라 스타일, 이펙트 등의 정보 추가 가능
}
