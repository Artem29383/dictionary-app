module.exports = {
  processors: [
    "stylelint-processor-styled-components"
  ],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-styled-components"
  ],
  rules: {
    "declaration-colon-newline-after": null
  },
  syntax: "scss"
};