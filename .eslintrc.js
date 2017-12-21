module.exports = {
    "extends": "google",
    "env" : {
        "browser" : true,
        "node" : true,
        "es6" : true
    },
     "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "off",
        "require-jsdoc": "off",
        "quotes": "off",
        "comma-dangle": "off",
        // "no-trailing-spaces": "off"
    },
};