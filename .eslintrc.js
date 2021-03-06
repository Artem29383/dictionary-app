module.exports = {
  parser: "babel-eslint",
  extends: ['airbnb', 'prettier/react', 'plugin:prettier/recommended'],
  plugins: [
    "react",
    "prettier",
    "jest"
  ],
  settings: {
    "react": {
      "version": "16.12"
    },
    "import/resolver": {
      "babel-module": {}
    }
  },
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  rules: {
    "global-require": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "function-paren-newline": "off",
    "import/first": "off",
    "comma-dangle": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "specialLink": [
          "to"
        ]
      }
    ],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
  globals: {
    "window": true,
    "document": true,
    "localStorage": true,
    "FormData": true,
    "FileReader": true,
    "Blob": true,
    "navigator": true,
    "Headers": true,
    "Request": true,
    "fetch": true
  },
  root: true,
};
