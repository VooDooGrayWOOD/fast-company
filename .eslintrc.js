module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        // "multiline-ternary": ["error", "always"],
        // "operator-linebreak": [
        //     "error",
        //     "after",
        //     { overrides: { "?": "after", ":": "after" } }
        // ],
        // "no-unneeded-ternary": ["error", { defaultAssignment: true }]
    }
};
