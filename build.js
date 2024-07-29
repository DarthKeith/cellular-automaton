import * as esbuild from "esbuild";

await esbuild.build({
    alias: {
        "ps-main": "./output/Main/index.js",
        "controller": "./src/controller.js",
        "model": "./src/model.js",
        "view": "./src/view.js",
        "array-util": "./src/array-util.js",
        "constants": "./src/constants.js"
    },
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    outfile: "./docs/index.js"
});

