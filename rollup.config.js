import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

const config = {
  input: "src/index.js",
  plugins: [
    babel({
      presets: [["@babel/env", { modules: false }], "@babel/react"],
      plugins: ["@babel/plugin-proposal-class-properties"]
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

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify());
}

export default config;
