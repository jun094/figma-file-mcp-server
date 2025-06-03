import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true, // .d.ts 파일을 생성합니다.
	splitting: false,
	sourcemap: true,
	clean: true, // 빌드 전에 dist 폴더를 정리합니다.
	target: "es2020", // 대상 JS 버전을 설정합니다.
});
