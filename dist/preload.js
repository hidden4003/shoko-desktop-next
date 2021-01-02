const {
    contextBridge,
    ipcRenderer
} = require("electron");
const fs = require("fs");
const Store = require("secure-electron-store").default;
// Script loaded by the preload attribute of the browser window
const isDevelopmentEnvironment = process.env.NODE_ENV !== "production"
const nodeRequire = require

// In development mode we need the require function to get hot reload to work
const devRequire = (requiredModule) => {
    if(isDevelopmentEnvironment) {
        console.warn(`Allowing to require module "${requiredModule}" (${typeof(requiredModule)}) because running in dev...`)
        // To get the modules to work we need to get them to be hardcoded, so this kinda weird switch does the trick
        switch(requiredModule) {
            case "url":
                return nodeRequire("url")
            case "querystring":
                return nodeRequire("querystring")
            case "events":
                return nodeRequire("events")
            case "module":
                return nodeRequire("module")
            case "source-map-support/source-map-support.js":
                return nodeRequire(
                    "source-map-support/source-map-support.js")
            case "punycode":
                return nodeRequire("punycode")
            default:
                throw new Error("Tried to require unknown module")
        }
    } else {
        // This is basically here as a reminder to not use require when being run in production mode
        throw new Error(`require(${requiredModule}) call caught in production!`)
    }
};
contextBridge.exposeInMainWorld("require", devRequire);

// Create the electron store to be made available in the renderer process
let store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        store: store.preloadBindings(ipcRenderer, fs)
    }
);

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
});

contextBridge.exposeInMainWorld(
"module", {
        exports: {},
        require: devRequire,
        id: "preload-module",
        filename: __filename,
        loaded: true,
        parent: null,
        children: [],
        paths: []
    });
