import * as esbuild from "esbuild";

await esbuild.build({
    alias: {"automaton-controller": "./src/automaton-controller.mjs"},
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    outfile: "./docs/index.js"
});

