"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var components_1 = require("../../src/components");
require("./index.css");
var App = function () { return (react_1.default.createElement(components_1.MousePosProvider, null,
    react_1.default.createElement("div", { className: 'max-w-screen-lg p-5 md:p-10 antialiased' },
        react_1.default.createElement("h1", { className: 'font-bold text-3xl md:text-4xl' }, "react-custom-cursor"),
        react_1.default.createElement(components_1.CursorWrapper, { element: react_1.default.createElement("div", { className: 'w-24 h-24 rounded-full' }) },
            react_1.default.createElement("div", { className: 'w-96 h-96 bg-red-200' }, "Hover here"))))); };
react_dom_1.render(react_1.default.createElement(App, null), document.getElementById('root'));
