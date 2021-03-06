const getBabelConfig = (envConfig = { modules: "commonjs" }) => ({
  presets: [["@babel/env", envConfig], "@babel/react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ],
  env: {
    production: {
      plugins: [
        [
          "transform-react-remove-prop-types",
          { mode: "remove", removeImport: true }
        ]
      ]
    }
  }
});

module.exports = getBabelConfig;
