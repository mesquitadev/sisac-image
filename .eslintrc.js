module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:prettier/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    parser: "babel-eslint",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
}
