import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

const getBabelConfig = require("./get-babel-config");

export default {
  input: "src/index.js",
  external: ["react", "prop-types"],
  plugins: [babel(getBabelConfig({ modules: false })), resolve()],
  output: [
    {
      file: "lib/react-on-off.cjs.js",
      format: "cjs"
    },
    {
      file: "lib/react-on-off.es.js",
      format: "es"
    },
    {
      file: "lib/react-on-off.js",
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
