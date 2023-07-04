const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@pages": "src/pages",
    "@layouts": "src/layouts",
    "@routes": "src/routes",
    "@mock": "src/utils/mock-data",
    "@utils": "src/utils",
    '@states': "src/states"
  })(config);

  return config;
};
