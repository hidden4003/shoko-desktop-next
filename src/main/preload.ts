// Script loaded by the preload attribute of the browser window
const isDevelopmentEnvironment = process.env.NODE_ENV !== "production";
const nodeRequire = require;

// In development mode we need the require function to get hot reload to work
window.require = ((requiredModule) => {
    if(isDevelopmentEnvironment) {
        console.warn(`Allowing to require module "${requiredModule}" (${typeof(requiredModule)}) because running in dev...`);
        // To get the modules to work we need to get them to be hardcoded, so this kinda weird switch does the trick
        switch(requiredModule) {
            case "url":
                return nodeRequire("url");
            case "querystring":
                return nodeRequire("querystring");
            case "events":
                return nodeRequire("events");
            case "module":
                return nodeRequire("module");
            case "source-map-support/source-map-support.js":
                return nodeRequire("source-map-support/source-map-support.js");
            case "punycode":
                return nodeRequire("punycode");
            case "prop-types":
                return nodeRequire("prop-types");
            case "path":
                return nodeRequire("path");
            case "electron":
                return nodeRequire("electron");
            case "fs":
                return nodeRequire("fs");
            case "crypto":
                return nodeRequire("crypto");
            case "assert":
                return nodeRequire("assert");
            case "util":
                return nodeRequire("util");
            case "process":
                return nodeRequire("process");
            default:
                throw new Error(`Tried to require unknown module "${requiredModule}"`)
        }
    } else {
        // This is basically here as a reminder to not use require when being run in production mode
        throw new Error(`require(${requiredModule}) call caught in production!`)
    }
});

// Make a module available
window.module = {
    exports: {},
    require: window.require,
    id: "preload-module",
    filename: __filename,
    loaded: true,
    parent: null,
    children: [],
    paths: []
};