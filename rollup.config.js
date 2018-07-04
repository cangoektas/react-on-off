import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import minify from "rollup-plugin-babel-minify";

const getBabelConfig = require("./get-babel-config");

const devConfig = {
  input: "src/index.js",
  external: ["react", "prop-types"],
  plugins: [babel(getBabelConfig({ modules: false })), resolve()],
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "OnOff",
      globals: {
        react: "React",
        "prop-types": "PropTypes"
      }
    }
  ],
  watch: {
    include: "src/**"
  }
};
const prodConfig = {
  input: "src/index.js",
  external: ["react", "prop-types"],
  plugins: [
    babel(getBabelConfig({ modules: false })),
    resolve(),
    minify({ comments: false, sourceMap: false })
  ],
  output: {
    file: "dist/index.umd.min.js",
    format: "umd",
    name: "OnOff",
    globals: {
      react: "React"
    }
  }
};

export default [devConfig, prodConfig];
