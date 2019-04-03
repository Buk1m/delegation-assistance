module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.js$": "babel-jest",
        "\\.(css|less|scss)$": "<rootDir>/node_modules/jest-css-modules"
    },
    testResultsProcessor: "jest-bamboo-reporter"
};
