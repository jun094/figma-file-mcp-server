import type { FigmaComponent } from "@figma-design-system-query/shared-types";

async function extractData() {
	console.log("Extracting Figma data...");
	const component: FigmaComponent = {
		id: "1:2",
		name: "Primary Button",
		type: "COMPONENT",
		description: "Our main call to action button.",
	};
	console.log("Data extracted:", component);
	// 여기에 실제 Figma API 호출 및 YAML 저장 로직 추가
}

extractData().catch(console.error);
