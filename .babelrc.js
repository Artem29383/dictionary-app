module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 2
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "macros",
    [
      "module-resolver",
      {
        alias: require('./config/alias')
      }
    ]
  ]
};