module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      }
    },
    "extends": "airbnb",
    "plugins": [
        "cypress",
        "react"
      ],
      "env": {
        "cypress/globals": true
        },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "react/button-has-type": [0, {
            "button": false,
            "submit": false,
            "reset": false
          }],
        "react/prop-types": [0]
    },
};