require("@babel/register").default({
  configFile: "./babel.test.config.js",
  extensions: [".js", ".jsx"],
  ignore: [/node_modules/],
});

const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });

global.window = dom.window;
global.self = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.getComputedStyle = dom.window.getComputedStyle;
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// framer-motion / next uses matchMedia and IntersectionObserver in some paths
window.matchMedia =
  window.matchMedia ||
  function () {
    return { matches: false, addListener: () => {}, removeListener: () => {} };
  };
window.IntersectionObserver =
  window.IntersectionObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
window.ResizeObserver =
  window.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
