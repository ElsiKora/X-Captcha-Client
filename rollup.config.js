import typescript from "@rollup/plugin-typescript";
import generatePackageJson from "rollup-plugin-generate-package-json";

export default [
	{
		input: "src/index.ts",
		output: {
			dir: "dist/esm",
			format: "esm",
			preserveModules: true,
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/esm",
				outDir: "dist/esm",
				sourceMap: true,
				tsconfig: "./tsconfig.json",
			}),
			generatePackageJson({
				baseContents: { type: "module" },
				outputFolder: "dist/esm",
			}),
		],
	},
	{
		input: "src/index.ts",
		output: {
			dir: "dist/cjs",
			exports: "named",
			format: "cjs",
			preserveModules: true,
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/cjs",
				outDir: "dist/cjs",
				sourceMap: true,
				tsconfig: "./tsconfig.json",
			}),
			generatePackageJson({
				baseContents: { type: "commonjs" },
				outputFolder: "dist/cjs",
			}),
		],
	},
];
