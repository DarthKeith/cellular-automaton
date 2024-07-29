import * as esbuild from "esbuild";

await esbuild.build({
    alias: {"automaton-controller": "./src/automaton-controller.js"},
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    outfile: "./docs/index.js"
});

