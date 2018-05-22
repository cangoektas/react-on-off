import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

const getBabelConfig = require("./get-babel-config");

export default {
  input: "src/index.js",
  external: ["react", "prop-types"],
  plugins: [babel(getBabelConfig({ modules: false })), resolve()],
  output: [
    {
      file: "dist/react-on-off.esm.js",
      format: "esm"
    },
    {
      file: "dist/react-on-off.umd.js",
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
