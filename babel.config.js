module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@utils": "./src/utils",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@errors": "./src/shared/errors"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
}
