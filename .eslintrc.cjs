module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "@electron-toolkit/eslint-config-ts/recommended",
    "prettier"
  ],
  rules: {
    "prettier/prettier": 0,
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
