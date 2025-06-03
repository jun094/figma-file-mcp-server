export interface FigmaComponent {
	id: string;
	name: string;
	type: "COMPONENT" | "COMPONENT_SET";
	description?: string;
}
export interface FigmaVariable {
	id: string;
	name: string;
	value: string | number | boolean; // 단순화된 예시
	type: "COLOR" | "NUMBER" | "STRING" | "BOOLEAN";
}
