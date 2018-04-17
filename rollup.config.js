import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  plugins: [
    babel({
      presets: [["@babel/env", { modules: false }], "@babel/react"],
      plugins: ["@babel/plugin-proposal-class-properties"],
      exclude: "node_modules/**"
    })
  ],
  output: [
    {
      file: "lib/index.cjs.js",
      format: "cjs"
    },
    {
      file: "lib/index.es.js",
      format: "es"
    }
  ]
};
