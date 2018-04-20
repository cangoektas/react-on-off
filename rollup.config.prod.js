import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";

const getBabelConfig = require("./get-babel-config");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

export default {
  input: "src/index.js",
  external: ["react", "prop-types"],
  plugins: [babel(getBabelConfig({ modules: false })), resolve(), uglify()],
  output: {
    file: "lib/react-on-off.min.js",
    format: "umd",
    name: "OnOff",
    globals: {
      react: "React",
      "prop-types": "PropTypes"
    }
  }
};
