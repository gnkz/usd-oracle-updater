module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:node/recommended"],
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "node/exports-style": ["error", "module.exports"]
  },
  overrides: [
    {
      files: [
        "**/*.test.js"
      ],
      env: {
        jest: true
      },
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
};
