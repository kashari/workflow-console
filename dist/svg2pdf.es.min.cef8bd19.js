// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"1nwOm":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "b3ad0ccecef8bd19";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"7EGBj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "svg2pdf", ()=>Yt);
var _cssesc = require("cssesc");
var _cssescDefault = parcelHelpers.interopDefault(_cssesc);
var _fontFamilyPapandreou = require("font-family-papandreou");
var _fontFamilyPapandreouDefault = parcelHelpers.interopDefault(_fontFamilyPapandreou);
var _jspdf = require("jspdf");
var _svgpath = require("svgpath");
var _svgpathDefault = parcelHelpers.interopDefault(_svgpath);
var _specificity = require("specificity");
var l = function(t, e) {
    return l = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for(var r in e)Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }, l(t, e);
};
function u(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    function r() {
        this.constructor = t;
    }
    l(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r);
}
var h = function() {
    return h = Object.assign || function(t) {
        for(var e, r = 1, i = arguments.length; r < i; r++)for(var n in e = arguments[r])Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
    }, h.apply(this, arguments);
};
function f(t, e, r, i) {
    return new (r || (r = Promise))(function(n, a) {
        function s(t) {
            try {
                l(i.next(t));
            } catch (t) {
                a(t);
            }
        }
        function o(t) {
            try {
                l(i.throw(t));
            } catch (t) {
                a(t);
            }
        }
        function l(t) {
            var e;
            t.done ? n(t.value) : (e = t.value, e instanceof r ? e : new r(function(t) {
                t(e);
            })).then(s, o);
        }
        l((i = i.apply(t, e || [])).next());
    });
}
function c(t, e) {
    var r, i, n, a, s = {
        label: 0,
        sent: function() {
            if (1 & n[0]) throw n[1];
            return n[1];
        },
        trys: [],
        ops: []
    };
    return a = {
        next: o(0),
        throw: o(1),
        return: o(2)
    }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
        return this;
    }), a;
    function o(a) {
        return function(o) {
            return function(a) {
                if (r) throw new TypeError("Generator is already executing.");
                for(; s;)try {
                    if (r = 1, i && (n = 2 & a[0] ? i.return : a[0] ? i.throw || ((n = i.return) && n.call(i), 0) : i.next) && !(n = n.call(i, a[1])).done) return n;
                    switch(i = 0, n && (a = [
                        2 & a[0],
                        n.value
                    ]), a[0]){
                        case 0:
                        case 1:
                            n = a;
                            break;
                        case 4:
                            return s.label++, {
                                value: a[1],
                                done: !1
                            };
                        case 5:
                            s.label++, i = a[1], a = [
                                0
                            ];
                            continue;
                        case 7:
                            a = s.ops.pop(), s.trys.pop();
                            continue;
                        default:
                            if (!(n = s.trys, (n = n.length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                s = 0;
                                continue;
                            }
                            if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                                s.label = a[1];
                                break;
                            }
                            if (6 === a[0] && s.label < n[1]) {
                                s.label = n[1], n = a;
                                break;
                            }
                            if (n && s.label < n[2]) {
                                s.label = n[2], s.ops.push(a);
                                break;
                            }
                            n[2] && s.ops.pop(), s.trys.pop();
                            continue;
                    }
                    a = e.call(t, s);
                } catch (t) {
                    a = [
                        6,
                        t
                    ], i = 0;
                } finally{
                    r = n = 0;
                }
                if (5 & a[0]) throw a[1];
                return {
                    value: a[0] ? a[1] : void 0,
                    done: !0
                };
            }([
                a,
                o
            ]);
        };
    }
}
var p = function() {
    function t(t) {
        if (this.a = void 0, this.r = 0, this.g = 0, this.b = 0, this.simpleColors = {}, this.colorDefs = [], this.ok = !1, t) {
            for(var e in "#" == t.charAt(0) && (t = t.substr(1, 6)), t = (t = t.replace(/ /g, "")).toLowerCase(), this.simpleColors = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "00ffff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000000",
                blanchedalmond: "ffebcd",
                blue: "0000ff",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "00ffff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgrey: "a9a9a9",
                darkgreen: "006400",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                feldspar: "d19275",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "ff00ff",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                grey: "808080",
                green: "008000",
                greenyellow: "adff2f",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgrey: "d3d3d3",
                lightgreen: "90ee90",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslateblue: "8470ff",
                lightslategray: "778899",
                lightslategrey: "778899",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "00ff00",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "ff00ff",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370d8",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "d87093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                red: "ff0000",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                violetred: "d02090",
                wheat: "f5deb3",
                white: "ffffff",
                whitesmoke: "f5f5f5",
                yellow: "ffff00",
                yellowgreen: "9acd32"
            }, this.simpleColors)t == e && (t = this.simpleColors[e]);
            this.colorDefs = [
                {
                    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                    example: [
                        "rgb(123, 234, 45)",
                        "rgb(255,234,245)"
                    ],
                    process: function(t) {
                        return [
                            parseInt(t[1]),
                            parseInt(t[2]),
                            parseInt(t[3])
                        ];
                    }
                },
                {
                    re: /^rgb\(([0-9.]+)%,\s*([0-9.]+)%,\s*([0-9.]+)%\)$/,
                    example: [
                        "rgb(50.5%, 25.75%, 75.5%)",
                        "rgb(100%,0%,0%)"
                    ],
                    process: function(t) {
                        return [
                            Math.round(2.55 * parseFloat(t[1])),
                            Math.round(2.55 * parseFloat(t[2])),
                            Math.round(2.55 * parseFloat(t[3]))
                        ];
                    }
                },
                {
                    re: /^(\w{2})(\w{2})(\w{2})$/,
                    example: [
                        "#00ff00",
                        "336699"
                    ],
                    process: function(t) {
                        return [
                            parseInt(t[1], 16),
                            parseInt(t[2], 16),
                            parseInt(t[3], 16)
                        ];
                    }
                },
                {
                    re: /^(\w{1})(\w{1})(\w{1})$/,
                    example: [
                        "#fb0",
                        "f0f"
                    ],
                    process: function(t) {
                        return [
                            parseInt(t[1] + t[1], 16),
                            parseInt(t[2] + t[2], 16),
                            parseInt(t[3] + t[3], 16)
                        ];
                    }
                }
            ];
            for(var r = 0; r < this.colorDefs.length; r++){
                var i = this.colorDefs[r].re, n = this.colorDefs[r].process, a = i.exec(t);
                if (a) {
                    var s = n(a);
                    this.r = s[0], this.g = s[1], this.b = s[2], this.ok = !0;
                }
            }
            this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
        }
    }
    return t.prototype.toRGB = function() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }, t.prototype.toRGBA = function() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + (this.a || "1") + ")";
    }, t.prototype.toHex = function() {
        var t = this.r.toString(16), e = this.g.toString(16), r = this.b.toString(16);
        return 1 == t.length && (t = "0" + t), 1 == e.length && (e = "0" + e), 1 == r.length && (r = "0" + r), "#" + t + e + r;
    }, t.prototype.getHelpXML = function() {
        for(var e = [], r = 0; r < this.colorDefs.length; r++)for(var i = this.colorDefs[r].example, n = 0; n < i.length; n++)e[e.length] = i[n];
        for(var a in this.simpleColors)e[e.length] = a;
        var s = document.createElement("ul");
        s.setAttribute("id", "rgbcolor-examples");
        for(r = 0; r < e.length; r++)try {
            var o = document.createElement("li"), l = new t(e[r]), u = document.createElement("div");
            u.style.cssText = "margin: 3px; border: 1px solid black; background:" + l.toHex() + "; color:" + l.toHex(), u.appendChild(document.createTextNode("test"));
            var h = document.createTextNode(" " + e[r] + " -> " + l.toRGB() + " -> " + l.toHex());
            o.appendChild(u), o.appendChild(h), s.appendChild(o);
        } catch (t) {}
        return s;
    }, t;
}(), d = function() {
    function t(t) {
        this.color = t;
    }
    return t.prototype.getFillData = function(t, e) {
        return f(this, void 0, void 0, function() {
            return c(this, function(t) {
                return [
                    2,
                    void 0
                ];
            });
        });
    }, t;
}(), m = function() {
    function t() {
        this.xmlSpace = "", this.whiteSpace = "", this.fill = null, this.fillOpacity = 1, this.fontFamily = "", this.fontSize = 16, this.fontStyle = "", this.fontWeight = "", this.opacity = 1, this.stroke = null, this.strokeDasharray = null, this.strokeDashoffset = 0, this.strokeLinecap = "", this.strokeLinejoin = "", this.strokeMiterlimit = 4, this.strokeOpacity = 1, this.strokeWidth = 1, this.alignmentBaseline = "", this.textAnchor = "", this.visibility = "", this.color = null, this.contextFill = null, this.contextStroke = null, this.fillRule = null;
    }
    return t.prototype.clone = function() {
        var e = new t;
        return e.xmlSpace = this.xmlSpace, e.whiteSpace = this.whiteSpace, e.fill = this.fill, e.fillOpacity = this.fillOpacity, e.fontFamily = this.fontFamily, e.fontSize = this.fontSize, e.fontStyle = this.fontStyle, e.fontWeight = this.fontWeight, e.opacity = this.opacity, e.stroke = this.stroke, e.strokeDasharray = this.strokeDasharray, e.strokeDashoffset = this.strokeDashoffset, e.strokeLinecap = this.strokeLinecap, e.strokeLinejoin = this.strokeLinejoin, e.strokeMiterlimit = this.strokeMiterlimit, e.strokeOpacity = this.strokeOpacity, e.strokeWidth = this.strokeWidth, e.textAnchor = this.textAnchor, e.alignmentBaseline = this.alignmentBaseline, e.visibility = this.visibility, e.color = this.color, e.fillRule = this.fillRule, e.contextFill = this.contextFill, e.contextStroke = this.contextStroke, e;
    }, t.default = function() {
        var e = new t;
        return e.xmlSpace = "default", e.whiteSpace = "normal", e.fill = new d(new p("rgb(0, 0, 0)")), e.fillOpacity = 1, e.fontFamily = "times", e.fontSize = 16, e.fontStyle = "normal", e.fontWeight = "normal", e.opacity = 1, e.stroke = null, e.strokeDasharray = null, e.strokeDashoffset = 0, e.strokeLinecap = "butt", e.strokeLinejoin = "miter", e.strokeMiterlimit = 4, e.strokeOpacity = 1, e.strokeWidth = 1, e.alignmentBaseline = "baseline", e.textAnchor = "start", e.visibility = "visible", e.color = new p("rgb(0, 0, 0)"), e.fillRule = "nonzero", e.contextFill = null, e.contextStroke = null, e;
    }, t.getContextColors = function(t, e) {
        void 0 === e && (e = !1);
        var r = {};
        return t.attributeState.contextFill && (r.contextFill = t.attributeState.contextFill), t.attributeState.contextStroke && (r.contextStroke = t.attributeState.contextStroke), e && t.attributeState.color && (r.color = t.attributeState.color), r;
    }, t;
}(), g = function() {
    function t(t, e) {
        var r, i, n;
        this.pdf = t, this.svg2pdfParameters = e.svg2pdfParameters, this.attributeState = e.attributeState ? e.attributeState.clone() : m.default(), this.viewport = e.viewport, this.refsHandler = e.refsHandler, this.styleSheets = e.styleSheets, this.textMeasure = e.textMeasure, this.transform = null !== (r = e.transform) && void 0 !== r ? r : this.pdf.unitMatrix, this.withinClipPath = null !== (i = e.withinClipPath) && void 0 !== i && i, this.withinUse = null !== (n = e.withinUse) && void 0 !== n && n;
    }
    return t.prototype.clone = function(e) {
        var r, i, n, a;
        return void 0 === e && (e = {}), new t(this.pdf, {
            svg2pdfParameters: this.svg2pdfParameters,
            attributeState: e.attributeState ? e.attributeState.clone() : this.attributeState.clone(),
            viewport: null !== (r = e.viewport) && void 0 !== r ? r : this.viewport,
            refsHandler: this.refsHandler,
            styleSheets: this.styleSheets,
            textMeasure: this.textMeasure,
            transform: null !== (i = e.transform) && void 0 !== i ? i : this.transform,
            withinClipPath: null !== (n = e.withinClipPath) && void 0 !== n ? n : this.withinClipPath,
            withinUse: null !== (a = e.withinUse) && void 0 !== a ? a : this.withinUse
        });
    }, t;
}(), b = function() {
    function e(t) {
        this.renderedElements = {}, this.idMap = t, this.idPrefix = String(e.instanceCounter++);
    }
    return e.prototype.getRendered = function(t, e, r) {
        return f(this, void 0, void 0, function() {
            var i, n;
            return c(this, function(a) {
                switch(a.label){
                    case 0:
                        return i = this.generateKey(t, e), this.renderedElements.hasOwnProperty(i) ? [
                            2,
                            this.renderedElements[t]
                        ] : (n = this.get(t), this.renderedElements[i] = n, [
                            4,
                            r(n)
                        ]);
                    case 1:
                        return a.sent(), [
                            2,
                            n
                        ];
                }
            });
        });
    }, e.prototype.get = function(e) {
        return this.idMap[(0, _cssescDefault.default)(e, {
            isIdentifier: !0
        })];
    }, e.prototype.generateKey = function(t, e) {
        var r = "";
        return e && (r = [
            "color",
            "contextFill",
            "contextStroke"
        ].map(function(t) {
            var r, i;
            return null !== (i = null === (r = e[t]) || void 0 === r ? void 0 : r.toRGBA()) && void 0 !== i ? i : "";
        }).join("|")), this.idPrefix + "|" + t + "|" + r;
    }, e.instanceCounter = 0, e;
}();
function y(t, e) {
    return Math.atan2(e[1] - t[1], e[0] - t[0]);
}
var v = 2 / 3;
function x(t, e) {
    return [
        v * (e[0] - t[0]) + t[0],
        v * (e[1] - t[1]) + t[1]
    ];
}
function S(t) {
    var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    return [
        t[0] / e,
        t[1] / e
    ];
}
function w(t, e) {
    return S([
        e[0] - t[0],
        e[1] - t[1]
    ]);
}
function k(t, e) {
    return [
        t[0] + e[0],
        t[1] + e[1]
    ];
}
function M(t, e) {
    var r = t[0], i = t[1];
    return [
        e.a * r + e.c * i + e.e,
        e.b * r + e.d * i + e.f
    ];
}
var C = function() {
    function t() {
        this.segments = [];
    }
    return t.prototype.moveTo = function(t, e) {
        return this.segments.push(new T(t, e)), this;
    }, t.prototype.lineTo = function(t, e) {
        return this.segments.push(new F(t, e)), this;
    }, t.prototype.curveTo = function(t, e, r, i, n, a) {
        return this.segments.push(new A(t, e, r, i, n, a)), this;
    }, t.prototype.close = function() {
        return this.segments.push(new P), this;
    }, t.prototype.transform = function(t) {
        this.segments.forEach(function(e) {
            if (e instanceof T || e instanceof F || e instanceof A) {
                var r = M([
                    e.x,
                    e.y
                ], t);
                e.x = r[0], e.y = r[1];
            }
            if (e instanceof A) {
                var i = M([
                    e.x1,
                    e.y1
                ], t), n = M([
                    e.x2,
                    e.y2
                ], t);
                e.x1 = i[0], e.y1 = i[1], e.x2 = n[0], e.y2 = n[1];
            }
        });
    }, t.prototype.draw = function(t) {
        var e = t.pdf;
        this.segments.forEach(function(t) {
            t instanceof T ? e.moveTo(t.x, t.y) : t instanceof F ? e.lineTo(t.x, t.y) : t instanceof A ? e.curveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y) : e.close();
        });
    }, t;
}(), T = function(t, e) {
    this.x = t, this.y = e;
}, F = function(t, e) {
    this.x = t, this.y = e;
}, A = function(t, e, r, i, n, a) {
    this.x1 = t, this.y1 = e, this.x2 = r, this.y2 = i, this.x = n, this.y = a;
}, P = function() {};
function B(t, e) {
    return e.split(",").indexOf((t.nodeName || t.tagName).toLowerCase()) >= 0;
}
function N(t, e, r, i) {
    var n;
    void 0 === i && (i = r);
    var a = null === (n = t.style) || void 0 === n ? void 0 : n.getPropertyValue(i);
    if (a) return a;
    var s = e.getPropertyValue(t, i);
    return s || t.hasAttribute(r) && t.getAttribute(r) || void 0;
}
function O(t, e, r) {
    if ("none" === N(t.element, r.styleSheets, "display")) return !1;
    var i = e, n = N(t.element, r.styleSheets, "visibility");
    return n && (i = "hidden" !== n), i;
}
function L(t, e, r) {
    var i = O(t, e, r);
    return 0 !== t.element.childNodes.length && (t.children.forEach(function(t) {
        t.isVisible(i, r) && (i = !0);
    }), i);
}
var E = function() {
    function t() {
        this.markers = [];
    }
    return t.prototype.addMarker = function(t) {
        this.markers.push(t);
    }, t.prototype.draw = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a, s, o, l;
            return c(this, function(u) {
                switch(u.label){
                    case 0:
                        e = 0, u.label = 1;
                    case 1:
                        return e < this.markers.length ? (r = this.markers[e], i = void 0, n = r.angle, a = r.anchor, s = Math.cos(n), o = Math.sin(n), i = t.pdf.Matrix(s, o, -o, s, a[0], a[1]), i = t.pdf.matrixMult(t.pdf.Matrix(t.attributeState.strokeWidth, 0, 0, t.attributeState.strokeWidth, 0, 0), i), i = t.pdf.matrixMult(i, t.transform), t.pdf.saveGraphicsState(), l = m.getContextColors(t), [
                            4,
                            t.refsHandler.getRendered(r.id, l, function(e) {
                                return e.apply(t);
                            })
                        ]) : [
                            3,
                            4
                        ];
                    case 2:
                        u.sent(), t.pdf.doFormObject(t.refsHandler.generateKey(r.id, l), i), t.pdf.restoreGraphicsState(), u.label = 3;
                    case 3:
                        return e++, [
                            3,
                            1
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        });
    }, t;
}(), I = function(t, e, r, i) {
    void 0 === i && (i = !1), this.id = t, this.anchor = e, this.angle = r, this.isStartMarker = i;
}, R = /url\(["']?#([^"']+)["']?\)/, H = {
    bottom: "bottom",
    "text-bottom": "bottom",
    top: "top",
    "text-top": "top",
    hanging: "hanging",
    middle: "middle",
    central: "middle",
    center: "middle",
    mathematical: "middle",
    ideographic: "ideographic",
    alphabetic: "alphabetic",
    baseline: "alphabetic"
}, D = "http://www.w3.org/2000/svg";
function W(t, e) {
    var r;
    return (r = t && t.toString().match(/^([\-0-9.]+)em$/)) ? parseFloat(r[1]) * e : (r = t && t.toString().match(/^([\-0-9.]+)(px|)$/)) ? parseFloat(r[1]) : 0;
}
function V(t) {
    return H[t] || "alphabetic";
}
function j(t) {
    for(var e, r = [], i = /[+-]?(?:(?:\d+\.?\d*)|(?:\d*\.?\d+))(?:[eE][+-]?\d+)?/g; e = i.exec(t);)r.push(parseFloat(e[0]));
    return r;
}
function G(t, e) {
    if ("transparent" === t) {
        var r = new p("rgb(0,0,0)");
        return r.a = 0, r;
    }
    if (e && "currentcolor" === t.toLowerCase()) return e.color || new p("rgb(0,0,0)");
    if (e && "context-stroke" === t.toLowerCase()) return e.contextStroke || new p("rgb(0,0,0)");
    if (e && "context-fill" === t.toLowerCase()) return e.contextFill || new p("rgb(0,0,0)");
    var i = /\s*rgba\(((?:[^,\)]*,){3}[^,\)]*)\)\s*/.exec(t);
    if (i) {
        var n = j(i[1]), a = new p("rgb(" + n.slice(0, 3).join(",") + ")");
        return a.a = n[3], a;
    }
    return new p(t);
}
var U = {
    "sans-serif": "helvetica",
    verdana: "helvetica",
    arial: "helvetica",
    fixed: "courier",
    monospace: "courier",
    terminal: "courier",
    serif: "times",
    cursive: "times",
    fantasy: "times"
};
var z, Y = (z = (0, _jspdf.jsPDF).version.split("."), 2 === parseFloat(z[0]) && 3 === parseFloat(z[1]));
function X(t, e) {
    return Y ? 400 == e ? "italic" == t ? "italic" : "normal" : 700 == e && "italic" !== t ? "bold" : t + "" + e : 400 == e || "normal" === e ? "italic" === t ? "italic" : "normal" : 700 != e && "bold" !== e || "normal" !== t ? (700 == e ? "bold" : e) + "" + t : "bold";
}
function q(t, e) {
    if ("none" === N(e.element, t.styleSheets, "display")) return [
        0,
        0,
        0,
        0
    ];
    var r = [];
    return e.children.forEach(function(e) {
        var i = e.getBoundingBox(t);
        if (0 !== i[0] || 0 !== i[1] || 0 !== i[2] || 0 !== i[3]) {
            var n = e.computeNodeTransform(t);
            i[0] = i[0] * n.sx + n.tx, i[1] = i[1] * n.sy + n.ty, i[2] = i[2] * n.sx, i[3] = i[3] * n.sy, r = 0 === r.length ? i : [
                Math.min(r[0], i[0]),
                Math.min(r[1], i[1]),
                Math.max(r[0] + r[2], i[0] + i[2]) - Math.min(r[0], i[0]),
                Math.max(r[1] + r[3], i[1] + i[3]) - Math.min(r[1], i[1])
            ];
        }
    }), 0 === r.length ? [
        0,
        0,
        0,
        0
    ] : r;
}
function _(t, e) {
    var r = parseFloat, i = r(t.getAttribute("x1")) || r(N(t, e.styleSheets, "x")) || r(N(t, e.styleSheets, "cx")) - r(N(t, e.styleSheets, "r")) || 0, n = r(t.getAttribute("x2")) || i + r(N(t, e.styleSheets, "width")) || r(N(t, e.styleSheets, "cx")) + r(N(t, e.styleSheets, "r")) || 0, a = r(t.getAttribute("y1")) || r(N(t, e.styleSheets, "y")) || r(N(t, e.styleSheets, "cy")) - r(N(t, e.styleSheets, "r")) || 0, s = r(t.getAttribute("y2")) || a + r(N(t, e.styleSheets, "height")) || r(N(t, e.styleSheets, "cy")) + r(N(t, e.styleSheets, "r")) || 0;
    return [
        Math.min(i, n),
        Math.min(a, s),
        Math.max(i, n) - Math.min(i, n),
        Math.max(a, s) - Math.min(a, s)
    ];
}
function $(t, e, r, i, n, a, s, o) {
    void 0 === o && (o = !1);
    var l, u, h = e[0], f = e[1], c = e[2], p = e[3], d = n / c, m = a / p, g = t.getAttribute("preserveAspectRatio");
    if (g) {
        var b = g.split(" ");
        "defer" === b[0] && (b = b.slice(1)), l = b[0], u = b[1] || "meet";
    } else l = "xMidYMid", u = "meet";
    if ("none" !== l && ("meet" === u ? d = m = Math.min(d, m) : "slice" === u && (d = m = Math.max(d, m))), o) return s.pdf.Matrix(d, 0, 0, m, 0, 0);
    var y = r - h * d, v = i - f * m;
    l.indexOf("xMid") >= 0 ? y += (n - c * d) / 2 : l.indexOf("xMax") >= 0 && (y += n - c * d), l.indexOf("YMid") >= 0 ? v += (a - p * m) / 2 : l.indexOf("YMax") >= 0 && (v += a - p * m);
    var x = s.pdf.Matrix(1, 0, 0, 1, y, v), S = s.pdf.Matrix(d, 0, 0, m, 0, 0);
    return s.pdf.matrixMult(S, x);
}
function Q(t, e) {
    if (!t || "none" === t) return e.pdf.unitMatrix;
    for(var r, i, n = /^[\s,]*matrix\(([^)]+)\)\s*/, a = /^[\s,]*translate\(([^)]+)\)\s*/, s = /^[\s,]*rotate\(([^)]+)\)\s*/, o = /^[\s,]*scale\(([^)]+)\)\s*/, l = /^[\s,]*skewX\(([^)]+)\)\s*/, u = /^[\s,]*skewY\(([^)]+)\)\s*/, h = e.pdf.unitMatrix; t.length > 0 && t.length !== i;){
        i = t.length;
        var f = n.exec(t);
        if (f && (r = j(f[1]), h = e.pdf.matrixMult(e.pdf.Matrix(r[0], r[1], r[2], r[3], r[4], r[5]), h), t = t.substr(f[0].length)), f = s.exec(t)) {
            r = j(f[1]);
            var c = Math.PI * r[0] / 180;
            if (h = e.pdf.matrixMult(e.pdf.Matrix(Math.cos(c), Math.sin(c), -Math.sin(c), Math.cos(c), 0, 0), h), r[1] || r[2]) {
                var p = e.pdf.Matrix(1, 0, 0, 1, r[1], r[2]), d = e.pdf.Matrix(1, 0, 0, 1, -r[1], -r[2]);
                h = e.pdf.matrixMult(d, e.pdf.matrixMult(h, p));
            }
            t = t.substr(f[0].length);
        }
        (f = a.exec(t)) && (r = j(f[1]), h = e.pdf.matrixMult(e.pdf.Matrix(1, 0, 0, 1, r[0], r[1] || 0), h), t = t.substr(f[0].length)), (f = o.exec(t)) && ((r = j(f[1]))[1] || (r[1] = r[0]), h = e.pdf.matrixMult(e.pdf.Matrix(r[0], 0, 0, r[1], 0, 0), h), t = t.substr(f[0].length)), (f = l.exec(t)) && (r = parseFloat(f[1]), r *= Math.PI / 180, h = e.pdf.matrixMult(e.pdf.Matrix(1, 0, Math.tan(r), 1, 0, 0), h), t = t.substr(f[0].length)), (f = u.exec(t)) && (r = parseFloat(f[1]), r *= Math.PI / 180, h = e.pdf.matrixMult(e.pdf.Matrix(1, Math.tan(r), 0, 1, 0, 0), h), t = t.substr(f[0].length));
    }
    return h;
}
var K = function() {
    function t(t, e) {
        this.element = t, this.children = e, this.parent = null;
    }
    return t.prototype.setParent = function(t) {
        this.parent = t;
    }, t.prototype.getParent = function() {
        return this.parent;
    }, t.prototype.getBoundingBox = function(t) {
        return "none" === N(this.element, t.styleSheets, "display") ? [
            0,
            0,
            0,
            0
        ] : this.getBoundingBoxCore(t);
    }, t.prototype.computeNodeTransform = function(t) {
        var e = this.computeNodeTransformCore(t), r = N(this.element, t.styleSheets, "transform");
        return r ? t.pdf.matrixMult(e, Q(r, t)) : e;
    }, t;
}(), J = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.render = function(t) {
        return Promise.resolve();
    }, e.prototype.getBoundingBoxCore = function(t) {
        return [];
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e;
}(K), Z = function(t) {
    function e(e, r, i) {
        var n = t.call(this, r, i) || this;
        return n.pdfGradientType = e, n.contextColor = void 0, n;
    }
    return u(e, t), e.prototype.apply = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, a, s, o, l;
            return c(this, function(u) {
                return (e = this.element.getAttribute("id")) ? (r = this.getStops(t.styleSheets), a = 0, s = !1, r.forEach(function(t) {
                    var e = t.opacity;
                    e && 1 !== e && (a += e, s = !0);
                }), s && (o = new (0, _jspdf.GState)({
                    opacity: a / r.length
                })), l = new (0, _jspdf.ShadingPattern)(this.pdfGradientType, this.getCoordinates(), r, o), t.pdf.addShadingPattern(e, l), [
                    2
                ]) : [
                    2
                ];
            });
        });
    }, e.prototype.getStops = function(t) {
        var r = this;
        if (this.stops) return this.stops;
        if (void 0 === this.contextColor) {
            this.contextColor = null;
            for(var i = this; i;){
                var n = N(i.element, t, "color");
                if (n) {
                    this.contextColor = G(n, null);
                    break;
                }
                i = i.getParent();
            }
        }
        var a = [];
        return this.children.forEach(function(i) {
            if ("stop" === i.element.tagName.toLowerCase()) {
                var n = N(i.element, t, "color"), s = G(N(i.element, t, "stop-color") || "", n ? {
                    color: G(n, null)
                } : {
                    color: r.contextColor
                }), o = parseFloat(N(i.element, t, "stop-opacity") || "1");
                a.push({
                    offset: e.parseGradientOffset(i.element.getAttribute("offset") || "0"),
                    color: [
                        s.r,
                        s.g,
                        s.b
                    ],
                    opacity: o
                });
            }
        }), this.stops = a;
    }, e.prototype.getBoundingBoxCore = function(t) {
        return _(this.element, t);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.parseGradientOffset = function(t) {
        var e = parseFloat(t);
        return !isNaN(e) && t.indexOf("%") >= 0 ? e / 100 : e;
    }, e;
}(J), tt = function(t) {
    function e(e, r) {
        return t.call(this, "axial", e, r) || this;
    }
    return u(e, t), e.prototype.getCoordinates = function() {
        return [
            parseFloat(this.element.getAttribute("x1") || "0"),
            parseFloat(this.element.getAttribute("y1") || "0"),
            parseFloat(this.element.getAttribute("x2") || "1"),
            parseFloat(this.element.getAttribute("y2") || "0")
        ];
    }, e;
}(Z), et = function(t) {
    function e(e, r) {
        return t.call(this, "radial", e, r) || this;
    }
    return u(e, t), e.prototype.getCoordinates = function() {
        var t = this.element.getAttribute("cx"), e = this.element.getAttribute("cy"), r = this.element.getAttribute("fx"), i = this.element.getAttribute("fy");
        return [
            parseFloat(r || t || "0.5"),
            parseFloat(i || e || "0.5"),
            0,
            parseFloat(t || "0.5"),
            parseFloat(e || "0.5"),
            parseFloat(this.element.getAttribute("r") || "0.5")
        ];
    }, e;
}(Z), rt = function() {
    function t(t, e) {
        this.key = t, this.gradient = e;
    }
    return t.prototype.getFillData = function(t, e) {
        return f(this, void 0, void 0, function() {
            var r, i, n;
            return c(this, function(a) {
                switch(a.label){
                    case 0:
                        return [
                            4,
                            e.refsHandler.getRendered(this.key, null, function(t) {
                                return t.apply(new g(e.pdf, {
                                    refsHandler: e.refsHandler,
                                    textMeasure: e.textMeasure,
                                    styleSheets: e.styleSheets,
                                    viewport: e.viewport,
                                    svg2pdfParameters: e.svg2pdfParameters
                                }));
                            })
                        ];
                    case 1:
                        return a.sent(), this.gradient.element.hasAttribute("gradientUnits") && "objectboundingbox" !== this.gradient.element.getAttribute("gradientUnits").toLowerCase() ? r = e.pdf.unitMatrix : (i = t.getBoundingBox(e), r = e.pdf.Matrix(i[2], 0, 0, i[3], i[0], i[1])), n = Q(N(this.gradient.element, e.styleSheets, "gradientTransform", "transform"), e), [
                            2,
                            {
                                key: this.key,
                                matrix: e.pdf.matrixMult(n, r)
                            }
                        ];
                }
            });
        });
    }, t;
}(), it = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.apply = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, s;
            return c(this, function(o) {
                switch(o.label){
                    case 0:
                        if (!(e = this.element.getAttribute("id"))) return [
                            2
                        ];
                        r = this.getBoundingBox(t), i = new (0, _jspdf.TilingPattern)([
                            r[0],
                            r[1],
                            r[0] + r[2],
                            r[1] + r[3]
                        ], r[2], r[3]), t.pdf.beginTilingPattern(i), n = 0, s = this.children, o.label = 1;
                    case 1:
                        return n < s.length ? [
                            4,
                            s[n].render(new g(t.pdf, {
                                attributeState: t.attributeState,
                                refsHandler: t.refsHandler,
                                styleSheets: t.styleSheets,
                                viewport: t.viewport,
                                svg2pdfParameters: t.svg2pdfParameters,
                                textMeasure: t.textMeasure
                            }))
                        ] : [
                            3,
                            4
                        ];
                    case 2:
                        o.sent(), o.label = 3;
                    case 3:
                        return n++, [
                            3,
                            1
                        ];
                    case 4:
                        return t.pdf.endTilingPattern(e, i), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return _(this.element, t);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e;
}(J), nt = function() {
    function t(t, e) {
        this.key = t, this.pattern = e;
    }
    return t.prototype.getFillData = function(t, e) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a, s, o, l, u, h, f, p, d;
            return c(this, function(c) {
                switch(c.label){
                    case 0:
                        return [
                            4,
                            e.refsHandler.getRendered(this.key, null, function(t) {
                                return t.apply(new g(e.pdf, {
                                    refsHandler: e.refsHandler,
                                    textMeasure: e.textMeasure,
                                    styleSheets: e.styleSheets,
                                    viewport: e.viewport,
                                    svg2pdfParameters: e.svg2pdfParameters
                                }));
                            })
                        ];
                    case 1:
                        return c.sent(), r = {
                            key: this.key,
                            boundingBox: void 0,
                            xStep: 0,
                            yStep: 0,
                            matrix: void 0
                        }, n = e.pdf.unitMatrix, this.pattern.element.hasAttribute("patternUnits") && "objectboundingbox" !== this.pattern.element.getAttribute("patternUnits").toLowerCase() || (i = t.getBoundingBox(e), n = e.pdf.Matrix(1, 0, 0, 1, i[0], i[1]), s = this.pattern.getBoundingBox(e), o = s[0] * i[0] || 0, l = s[1] * i[1] || 0, u = s[2] * i[2] || 0, h = s[3] * i[3] || 0, r.boundingBox = [
                            o,
                            l,
                            o + u,
                            l + h
                        ], r.xStep = u, r.yStep = h), a = e.pdf.unitMatrix, this.pattern.element.hasAttribute("patternContentUnits") && "objectboundingbox" === this.pattern.element.getAttribute("patternContentUnits").toLowerCase() && (i || (i = t.getBoundingBox(e)), a = e.pdf.Matrix(i[2], 0, 0, i[3], 0, 0), s = r.boundingBox || this.pattern.getBoundingBox(e), o = s[0] / i[0] || 0, l = s[1] / i[1] || 0, u = s[2] / i[2] || 0, h = s[3] / i[3] || 0, r.boundingBox = [
                            o,
                            l,
                            o + u,
                            l + h
                        ], r.xStep = u, r.yStep = h), f = e.pdf.unitMatrix, (p = N(this.pattern.element, e.styleSheets, "patternTransform", "transform")) && (f = Q(p, e)), d = a, d = e.pdf.matrixMult(d, n), d = e.pdf.matrixMult(d, f), d = e.pdf.matrixMult(d, e.transform), r.matrix = d, [
                            2,
                            r
                        ];
                }
            });
        });
    }, t;
}();
function at(t, e) {
    var r = R.exec(t);
    if (r) {
        var i = r[1], n = e.refsHandler.get(i);
        return n && (n instanceof tt || n instanceof et) ? function(t, e, r) {
            var i = e.getStops(r.styleSheets);
            if (0 === i.length) return null;
            if (1 === i.length) {
                var n = i[0].color, a = new p;
                return a.ok = !0, a.r = n[0], a.g = n[1], a.b = n[2], a.a = i[0].opacity, new d(a);
            }
            return new rt(t, e);
        }(i, n, e) : n && n instanceof it ? new nt(i, n) : new d(new p("rgb(0, 0, 0)"));
    }
    var a = G(t, e.attributeState);
    return a.ok ? new d(a) : null;
}
function st(t, r, i) {
    var n = i || r.element, a = N(n, t.styleSheets, "color");
    if (a) {
        var s = G(a, t.attributeState);
        s.ok ? t.attributeState.color = s : t.attributeState.color = new p("rgb(0,0,0)");
    }
    var o = N(n, t.styleSheets, "visibility");
    o && (t.attributeState.visibility = o);
    var l = N(n, t.styleSheets, "fill");
    l && (t.attributeState.fill = at(l, t));
    var u = N(n, t.styleSheets, "fill-opacity");
    u && (t.attributeState.fillOpacity = parseFloat(u));
    var h = N(n, t.styleSheets, "stroke-opacity");
    h && (t.attributeState.strokeOpacity = parseFloat(h));
    var f = N(n, t.styleSheets, "opacity");
    f && (t.attributeState.opacity = parseFloat(f));
    var c = N(n, t.styleSheets, "stroke-width");
    void 0 !== c && "" !== c && (t.attributeState.strokeWidth = Math.abs(parseFloat(c)));
    var m = N(n, t.styleSheets, "stroke");
    if (m) {
        if ("none" === m) t.attributeState.stroke = null;
        else {
            var g = G(m, t.attributeState);
            g.ok && (t.attributeState.stroke = new d(g));
        }
    }
    m && t.attributeState.stroke instanceof d && (t.attributeState.contextStroke = t.attributeState.stroke.color), l && t.attributeState.fill instanceof d && (t.attributeState.contextFill = t.attributeState.fill.color);
    var b = N(n, t.styleSheets, "stroke-linecap");
    b && (t.attributeState.strokeLinecap = b);
    var y = N(n, t.styleSheets, "stroke-linejoin");
    y && (t.attributeState.strokeLinejoin = y);
    var v = N(n, t.styleSheets, "stroke-dasharray");
    if (v) {
        var x = parseInt(N(n, t.styleSheets, "stroke-dashoffset") || "0");
        t.attributeState.strokeDasharray = j(v), t.attributeState.strokeDashoffset = x;
    }
    var S = N(n, t.styleSheets, "stroke-miterlimit");
    void 0 !== S && "" !== S && (t.attributeState.strokeMiterlimit = parseFloat(S));
    var w = n.getAttribute("xml:space");
    w && (t.attributeState.xmlSpace = w);
    var k = N(n, t.styleSheets, "white-space");
    k && (t.attributeState.whiteSpace = k);
    var M = N(n, t.styleSheets, "font-weight");
    M && (t.attributeState.fontWeight = M);
    var C = N(n, t.styleSheets, "font-style");
    C && (t.attributeState.fontStyle = C);
    var T = N(n, t.styleSheets, "font-family");
    if (T) {
        var F = (0, _fontFamilyPapandreouDefault.default).parse(T);
        t.attributeState.fontFamily = function(t, e, r) {
            var i = X(t.fontStyle, t.fontWeight), n = r.pdf.getFontList(), a = "";
            return e.some(function(t) {
                var e = n[t];
                return e && e.indexOf(i) >= 0 ? (a = t, !0) : (t = t.toLowerCase(), !!U.hasOwnProperty(t) && (a = t, !0));
            }) || (a = "times"), a;
        }(t.attributeState, F, t);
    }
    var A = N(n, t.styleSheets, "font-size");
    if (A) {
        var P = t.pdf.getFontSize();
        t.attributeState.fontSize = W(A, P);
    }
    var B = N(n, t.styleSheets, "vertical-align") || N(n, t.styleSheets, "alignment-baseline");
    if (B) {
        var O = B.match(/(baseline|text-bottom|alphabetic|ideographic|middle|central|mathematical|text-top|bottom|center|top|hanging)/);
        O && (t.attributeState.alignmentBaseline = O[0]);
    }
    var L = N(n, t.styleSheets, "text-anchor");
    L && (t.attributeState.textAnchor = L);
    var E = N(n, t.styleSheets, "fill-rule");
    E && (t.attributeState.fillRule = E);
}
function ot(t, e, r) {
    var n = 1, a = 1;
    n *= t.attributeState.fillOpacity, n *= t.attributeState.opacity, t.attributeState.fill instanceof d && void 0 !== t.attributeState.fill.color.a && (n *= t.attributeState.fill.color.a), a *= t.attributeState.strokeOpacity, a *= t.attributeState.opacity, t.attributeState.stroke instanceof d && void 0 !== t.attributeState.stroke.color.a && (a *= t.attributeState.stroke.color.a);
    var s, o, l = n < 1, u = a < 1;
    if (B(r, "use") ? (l = !0, u = !0, n *= t.attributeState.fill ? 1 : 0, a *= t.attributeState.stroke ? 1 : 0) : t.withinUse && (t.attributeState.fill !== e.attributeState.fill ? (l = !0, n *= t.attributeState.fill ? 1 : 0) : l && !t.attributeState.fill && (n = 0), t.attributeState.stroke !== e.attributeState.stroke ? (u = !0, a *= t.attributeState.stroke ? 1 : 0) : u && !t.attributeState.stroke && (a = 0)), l || u) {
        var h = {};
        l && (h.opacity = n), u && (h["stroke-opacity"] = a), t.pdf.setGState(new (0, _jspdf.GState)(h));
    }
    if (t.attributeState.fill && t.attributeState.fill !== e.attributeState.fill && t.attributeState.fill instanceof d && t.attributeState.fill.color.ok && !B(r, "text") && t.pdf.setFillColor(t.attributeState.fill.color.r, t.attributeState.fill.color.g, t.attributeState.fill.color.b), t.attributeState.strokeWidth !== e.attributeState.strokeWidth && t.pdf.setLineWidth(t.attributeState.strokeWidth), t.attributeState.stroke !== e.attributeState.stroke && t.attributeState.stroke instanceof d && t.pdf.setDrawColor(t.attributeState.stroke.color.r, t.attributeState.stroke.color.g, t.attributeState.stroke.color.b), t.attributeState.strokeLinecap !== e.attributeState.strokeLinecap && t.pdf.setLineCap(t.attributeState.strokeLinecap), t.attributeState.strokeLinejoin !== e.attributeState.strokeLinejoin && t.pdf.setLineJoin(t.attributeState.strokeLinejoin), t.attributeState.strokeDasharray === e.attributeState.strokeDasharray && t.attributeState.strokeDashoffset === e.attributeState.strokeDashoffset || !t.attributeState.strokeDasharray || t.pdf.setLineDashPattern(t.attributeState.strokeDasharray, t.attributeState.strokeDashoffset), t.attributeState.strokeMiterlimit !== e.attributeState.strokeMiterlimit && t.pdf.setLineMiterLimit(t.attributeState.strokeMiterlimit), t.attributeState.fontFamily !== e.attributeState.fontFamily && (s = U.hasOwnProperty(t.attributeState.fontFamily) ? U[t.attributeState.fontFamily] : t.attributeState.fontFamily), t.attributeState.fill && t.attributeState.fill !== e.attributeState.fill && t.attributeState.fill instanceof d && t.attributeState.fill.color.ok) {
        var f = t.attributeState.fill.color;
        t.pdf.setTextColor(f.r, f.g, f.b);
    }
    t.attributeState.fontWeight === e.attributeState.fontWeight && t.attributeState.fontStyle === e.attributeState.fontStyle || (o = X(t.attributeState.fontStyle, t.attributeState.fontWeight)), void 0 === s && void 0 === o || (void 0 === s && (s = U.hasOwnProperty(t.attributeState.fontFamily) ? U[t.attributeState.fontFamily] : t.attributeState.fontFamily), t.pdf.setFont(s, o)), t.attributeState.fontSize !== e.attributeState.fontSize && t.pdf.setFontSize(t.attributeState.fontSize * t.pdf.internal.scaleFactor);
}
function lt(t, e, r) {
    var i = R.exec(t);
    if (i) {
        var n = i[1];
        return r.refsHandler.get(n) || void 0;
    }
}
function ut(t, e, r) {
    return f(this, void 0, void 0, function() {
        var i, n;
        return c(this, function(a) {
            switch(a.label){
                case 0:
                    return i = r.clone(), e.element.hasAttribute("clipPathUnits") && "objectboundingbox" === e.element.getAttribute("clipPathUnits").toLowerCase() && (n = t.getBoundingBox(r), i.transform = r.pdf.matrixMult(r.pdf.Matrix(n[2], 0, 0, n[3], n[0], n[1]), r.transform)), [
                        4,
                        e.apply(i)
                    ];
                case 1:
                    return a.sent(), [
                        2
                    ];
            }
        });
    });
}
var ht = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.render = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n;
            return c(this, function(a) {
                switch(a.label){
                    case 0:
                        return this.isVisible("hidden" !== t.attributeState.visibility, t) ? ((e = t.clone()).transform = e.pdf.matrixMult(this.computeNodeTransform(e), t.transform), st(e, this), r = N(this.element, e.styleSheets, "clip-path"), (i = r && "none" !== r) ? (n = lt(r, 0, e)) ? n.isVisible(!0, e) ? (e.pdf.saveGraphicsState(), [
                            4,
                            ut(this, n, e)
                        ]) : [
                            3,
                            2
                        ] : [
                            3,
                            4
                        ] : [
                            3,
                            5
                        ]) : [
                            2
                        ];
                    case 1:
                        return a.sent(), [
                            3,
                            3
                        ];
                    case 2:
                        return [
                            2
                        ];
                    case 3:
                        return [
                            3,
                            5
                        ];
                    case 4:
                        i = !1, a.label = 5;
                    case 5:
                        return e.withinClipPath || e.pdf.saveGraphicsState(), ot(e, t, this.element), [
                            4,
                            this.renderCore(e)
                        ];
                    case 6:
                        return a.sent(), e.withinClipPath || e.pdf.restoreGraphicsState(), i && e.pdf.restoreGraphicsState(), [
                            2
                        ];
                }
            });
        });
    }, e;
}(K), ft = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e;
}(ht), ct = function(t) {
    function e(e, r, i) {
        var n = t.call(this, r, i) || this;
        return n.cachedPath = null, n.hasMarkers = e, n;
    }
    return u(e, t), e.prototype.renderCore = function(t) {
        return f(this, void 0, void 0, function() {
            var e;
            return c(this, function(r) {
                switch(r.label){
                    case 0:
                        return null === (e = this.getCachedPath(t)) || 0 === e.segments.length ? [
                            2
                        ] : (t.withinClipPath ? e.transform(t.transform) : t.pdf.setCurrentTransformationMatrix(t.transform), e.draw(t), [
                            4,
                            this.fillOrStroke(t)
                        ]);
                    case 1:
                        return r.sent(), this.hasMarkers ? [
                            4,
                            this.drawMarkers(t, e)
                        ] : [
                            3,
                            3
                        ];
                    case 2:
                        r.sent(), r.label = 3;
                    case 3:
                        return [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getCachedPath = function(t) {
        return this.cachedPath || (this.cachedPath = this.getPath(t));
    }, e.prototype.drawMarkers = function(t, e) {
        return f(this, void 0, void 0, function() {
            return c(this, function(r) {
                switch(r.label){
                    case 0:
                        return [
                            4,
                            this.getMarkers(e, t).draw(t.clone({
                                transform: t.pdf.unitMatrix
                            }))
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.fillOrStroke = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a;
            return c(this, function(s) {
                switch(s.label){
                    case 0:
                        return t.withinClipPath ? [
                            2
                        ] : (e = t.attributeState.fill, r = t.attributeState.stroke && 0 !== t.attributeState.strokeWidth, e ? [
                            4,
                            e.getFillData(this, t)
                        ] : [
                            3,
                            2
                        ]);
                    case 1:
                        return n = s.sent(), [
                            3,
                            3
                        ];
                    case 2:
                        n = void 0, s.label = 3;
                    case 3:
                        return i = n, a = "evenodd" === t.attributeState.fillRule, e && r || t.withinUse ? a ? t.pdf.fillStrokeEvenOdd(i) : t.pdf.fillStroke(i) : e ? a ? t.pdf.fillEvenOdd(i) : t.pdf.fill(i) : r ? t.pdf.stroke() : t.pdf.discardPath(), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        var e = this.getCachedPath(t);
        if (!e || !e.segments.length) return [
            0,
            0,
            0,
            0
        ];
        for(var r = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY, s = 0, o = 0, l = 0; l < e.segments.length; l++){
            var u = e.segments[l];
            (u instanceof T || u instanceof F || u instanceof A) && (s = u.x, o = u.y), u instanceof A ? (r = Math.min(r, s, u.x1, u.x2, u.x), n = Math.max(n, s, u.x1, u.x2, u.x), i = Math.min(i, o, u.y1, u.y2, u.y), a = Math.max(a, o, u.y1, u.y2, u.y)) : (r = Math.min(r, s), n = Math.max(n, s), i = Math.min(i, o), a = Math.max(a, o));
        }
        return [
            r,
            i,
            n - r,
            a - i
        ];
    }, e.prototype.getMarkers = function(t, e) {
        var r = N(this.element, e.styleSheets, "marker-start"), i = N(this.element, e.styleSheets, "marker-mid"), n = N(this.element, e.styleSheets, "marker-end"), a = new E;
        if (r || i || n) {
            n && (n = pt(n)), r && (r = pt(r)), i && (i = pt(i));
            for(var s = t.segments, o = [
                1,
                0
            ], l = void 0, u = !1, h = [
                1,
                0
            ], f = !1, c = function(t) {
                var e = s[t], c = r && (1 === t || !(s[t] instanceof T) && s[t - 1] instanceof T);
                c && s.forEach(function(e, r) {
                    if (!f && e instanceof P && r > t) {
                        var i = s[r - 1];
                        f = (i instanceof T || i instanceof F || i instanceof A) && i;
                    }
                });
                var p = n && (t === s.length - 1 || !(s[t] instanceof T) && s[t + 1] instanceof T), d = i && t > 0 && !(1 === t && s[t - 1] instanceof T), m = s[t - 1] || null;
                if (m instanceof T || m instanceof F || m instanceof A) {
                    if (e instanceof A) c && a.addMarker(new I(r, [
                        m.x,
                        m.y
                    ], y(f ? [
                        f.x,
                        f.y
                    ] : [
                        m.x,
                        m.y
                    ], [
                        e.x1,
                        e.y1
                    ]), !0)), p && a.addMarker(new I(n, [
                        e.x,
                        e.y
                    ], y([
                        e.x2,
                        e.y2
                    ], [
                        e.x,
                        e.y
                    ]))), d && (l = w([
                        m.x,
                        m.y
                    ], [
                        e.x1,
                        e.y1
                    ]), l = m instanceof T ? l : S(k(o, l)), a.addMarker(new I(i, [
                        m.x,
                        m.y
                    ], Math.atan2(l[1], l[0])))), o = w([
                        e.x2,
                        e.y2
                    ], [
                        e.x,
                        e.y
                    ]);
                    else if (e instanceof T || e instanceof F) {
                        if (l = w([
                            m.x,
                            m.y
                        ], [
                            e.x,
                            e.y
                        ]), c) {
                            var g = f ? w([
                                f.x,
                                f.y
                            ], [
                                e.x,
                                e.y
                            ]) : l;
                            a.addMarker(new I(r, [
                                m.x,
                                m.y
                            ], Math.atan2(g[1], g[0]), !0));
                        }
                        if (p && a.addMarker(new I(n, [
                            e.x,
                            e.y
                        ], Math.atan2(l[1], l[0]))), d) {
                            g = e instanceof T ? o : m instanceof T ? l : S(k(o, l));
                            a.addMarker(new I(i, [
                                m.x,
                                m.y
                            ], Math.atan2(g[1], g[0])));
                        }
                        o = l;
                    } else if (e instanceof P) {
                        if (l = w([
                            m.x,
                            m.y
                        ], [
                            u.x,
                            u.y
                        ]), d) {
                            g = m instanceof T ? l : S(k(o, l));
                            a.addMarker(new I(i, [
                                m.x,
                                m.y
                            ], Math.atan2(g[1], g[0])));
                        }
                        if (p) {
                            g = S(k(l, h));
                            a.addMarker(new I(n, [
                                u.x,
                                u.y
                            ], Math.atan2(g[1], g[0])));
                        }
                        o = l;
                    }
                } else {
                    u = e instanceof T && e;
                    var b = s[t + 1];
                    (b instanceof T || b instanceof F || b instanceof A) && (h = w([
                        u.x,
                        u.y
                    ], [
                        b.x,
                        b.y
                    ]));
                }
            }, p = 0; p < s.length; p++)c(p);
        }
        return a.markers.forEach(function(t) {
            var r = e.refsHandler.get(t.id);
            if (r) {
                var i = N(r.element, e.styleSheets, "orient");
                null != i && (t.isStartMarker && "auto-start-reverse" === i && (t.angle += Math.PI), isNaN(Number(i)) || (t.angle = parseFloat(i) / 180 * Math.PI));
            }
        }), a;
    }, e;
}(ft);
function pt(t) {
    var e = R.exec(t);
    return e && e[1] || void 0;
}
var dt = function(t) {
    function e(e, r) {
        return t.call(this, !0, e, r) || this;
    }
    return u(e, t), e.prototype.getPath = function(t) {
        if (t.withinClipPath || null === t.attributeState.stroke) return null;
        var e = parseFloat(this.element.getAttribute("x1") || "0"), r = parseFloat(this.element.getAttribute("y1") || "0"), i = parseFloat(this.element.getAttribute("x2") || "0"), n = parseFloat(this.element.getAttribute("y2") || "0");
        return e || i || r || n ? (new C).moveTo(e, r).lineTo(i, n) : null;
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e.prototype.fillOrStroke = function(e) {
        return f(this, void 0, void 0, function() {
            return c(this, function(r) {
                switch(r.label){
                    case 0:
                        return e.attributeState.fill = null, [
                            4,
                            t.prototype.fillOrStroke.call(this, e)
                        ];
                    case 1:
                        return r.sent(), [
                            2
                        ];
                }
            });
        });
    }, e;
}(ct), mt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.apply = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a;
            return c(this, function(s) {
                switch(s.label){
                    case 0:
                        return this.isVisible("hidden" !== t.attributeState.visibility, t) ? ((e = t.clone()).transform = e.pdf.unitMatrix, st(e, this), r = N(this.element, e.styleSheets, "clip-path"), r && "none" !== r && (i = lt(r, 0, e)) ? i.isVisible(!0, e) ? [
                            4,
                            ut(this, i, e)
                        ] : [
                            3,
                            2
                        ] : [
                            3,
                            3
                        ]) : [
                            2
                        ];
                    case 1:
                        return s.sent(), [
                            3,
                            3
                        ];
                    case 2:
                        return [
                            2
                        ];
                    case 3:
                        ot(e, t, this.element), n = 0, a = this.children, s.label = 4;
                    case 4:
                        return n < a.length ? [
                            4,
                            a[n].render(e)
                        ] : [
                            3,
                            7
                        ];
                    case 5:
                        s.sent(), s.label = 6;
                    case 6:
                        return n++, [
                            3,
                            4
                        ];
                    case 7:
                        return [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return q(t, this);
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.prototype.computeNodeTransformCore = function(t) {
        var e = parseFloat(N(this.element, t.styleSheets, "x") || "0"), r = parseFloat(N(this.element, t.styleSheets, "y") || "0"), i = this.element.getAttribute("viewBox");
        if (i) {
            var n = j(i), a = parseFloat(N(this.element, t.styleSheets, "width") || N(this.element.ownerSVGElement, t.styleSheets, "width") || i[2]), s = parseFloat(N(this.element, t.styleSheets, "height") || N(this.element.ownerSVGElement, t.styleSheets, "height") || i[3]);
            return $(this.element, n, e, r, a, s, t);
        }
        return t.pdf.Matrix(1, 0, 0, 1, e, r);
    }, e;
}(J), gt = function(t, e) {
    this.width = t, this.height = e;
}, bt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.renderCore = function(t) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a, s, o, l, u, h, f, p, d, b;
            return c(this, function(c) {
                switch(c.label){
                    case 0:
                        return r = parseFloat, (i = this.element.getAttribute("href") || this.element.getAttribute("xlink:href")) ? (n = i.substring(1), a = t.refsHandler.get(n), s = B(a.element, "symbol,svg") && a.element.hasAttribute("viewBox"), o = r(N(this.element, t.styleSheets, "x") || "0"), l = r(N(this.element, t.styleSheets, "y") || "0"), u = void 0, h = void 0, s ? (u = r(N(this.element, t.styleSheets, "width") || N(a.element, t.styleSheets, "width") || "0"), h = r(N(this.element, t.styleSheets, "height") || N(a.element, t.styleSheets, "height") || "0"), o += r(N(a.element, t.styleSheets, "x") || "0"), l += r(N(a.element, t.styleSheets, "y") || "0"), p = j(a.element.getAttribute("viewBox")), f = $(a.element, p, o, l, u, h, t)) : f = t.pdf.Matrix(1, 0, 0, 1, o, l), d = m.getContextColors(t, !0), b = new g(t.pdf, {
                            refsHandler: t.refsHandler,
                            styleSheets: t.styleSheets,
                            withinUse: !0,
                            viewport: s ? new gt(u, h) : t.viewport,
                            svg2pdfParameters: t.svg2pdfParameters,
                            textMeasure: t.textMeasure,
                            attributeState: Object.assign(m.default(), d)
                        }), [
                            4,
                            t.refsHandler.getRendered(n, d, function(t) {
                                return e.renderReferencedNode(t, n, b);
                            })
                        ]) : [
                            2
                        ];
                    case 1:
                        return c.sent(), t.pdf.saveGraphicsState(), t.pdf.setCurrentTransformationMatrix(t.transform), s && "visible" !== N(a.element, t.styleSheets, "overflow") && (t.pdf.rect(o, l, u, h), t.pdf.clip().discardPath()), t.pdf.doFormObject(t.refsHandler.generateKey(n, d), f), t.pdf.restoreGraphicsState(), [
                            2
                        ];
                }
            });
        });
    }, e.renderReferencedNode = function(t, e, r) {
        return f(this, void 0, void 0, function() {
            var i;
            return c(this, function(n) {
                switch(n.label){
                    case 0:
                        return i = [
                            (i = t.getBoundingBox(r))[0] - .5 * i[2],
                            i[1] - .5 * i[3],
                            2 * i[2],
                            2 * i[3]
                        ], r.pdf.beginFormObject(i[0], i[1], i[2], i[3], r.pdf.unitMatrix), t instanceof mt ? [
                            4,
                            t.apply(r)
                        ] : [
                            3,
                            2
                        ];
                    case 1:
                        return n.sent(), [
                            3,
                            4
                        ];
                    case 2:
                        return [
                            4,
                            t.render(r)
                        ];
                    case 3:
                        n.sent(), n.label = 4;
                    case 4:
                        return r.pdf.endFormObject(r.refsHandler.generateKey(e, r.attributeState)), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return _(this.element, t);
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e;
}(ft), yt = function(t) {
    function e(e, r) {
        return t.call(this, !1, e, r) || this;
    }
    return u(e, t), e.prototype.getPath = function(t) {
        var e = parseFloat(N(this.element, t.styleSheets, "width") || "0"), r = parseFloat(N(this.element, t.styleSheets, "height") || "0");
        if (!isFinite(e) || e <= 0 || !isFinite(r) || r <= 0) return null;
        var i = N(this.element, t.styleSheets, "rx"), n = N(this.element, t.styleSheets, "ry"), a = Math.min(parseFloat(i || n || "0"), .5 * e), s = Math.min(parseFloat(n || i || "0"), .5 * r), o = parseFloat(N(this.element, t.styleSheets, "x") || "0"), l = parseFloat(N(this.element, t.styleSheets, "y") || "0"), u = 4 / 3 * (Math.SQRT2 - 1);
        return 0 === a && 0 === s ? (new C).moveTo(o, l).lineTo(o + e, l).lineTo(o + e, l + r).lineTo(o, l + r).close() : (new C).moveTo(o += a, l).lineTo(o += e - 2 * a, l).curveTo(o + a * u, l, o + a, l + (s - s * u), o += a, l += s).lineTo(o, l += r - 2 * s).curveTo(o, l + s * u, o - a * u, l + s, o -= a, l += s).lineTo(o += 2 * a - e, l).curveTo(o - a * u, l, o - a, l - s * u, o -= a, l -= s).lineTo(o, l += 2 * s - r).curveTo(o, l - s * u, o + a * u, l - s, o += a, l -= s).close();
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e;
}(ct), vt = function(t) {
    function e(e, r) {
        return t.call(this, !1, e, r) || this;
    }
    return u(e, t), e.prototype.getPath = function(t) {
        var e = this.getRx(t), r = this.getRy(t);
        if (!isFinite(e) || r <= 0 || !isFinite(r) || r <= 0) return null;
        var i = parseFloat(N(this.element, t.styleSheets, "cx") || "0"), n = parseFloat(N(this.element, t.styleSheets, "cy") || "0"), a = 4 / 3 * (Math.SQRT2 - 1) * e, s = 4 / 3 * (Math.SQRT2 - 1) * r;
        return (new C).moveTo(i + e, n).curveTo(i + e, n - s, i + a, n - r, i, n - r).curveTo(i - a, n - r, i - e, n - s, i - e, n).curveTo(i - e, n + s, i - a, n + r, i, n + r).curveTo(i + a, n + r, i + e, n + s, i + e, n);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e;
}(ct), xt = function(t) {
    function e(e, r) {
        return t.call(this, e, r) || this;
    }
    return u(e, t), e.prototype.getRx = function(t) {
        return parseFloat(N(this.element, t.styleSheets, "rx") || "0");
    }, e.prototype.getRy = function(t) {
        return parseFloat(N(this.element, t.styleSheets, "ry") || "0");
    }, e;
}(vt);
function St(t) {
    var e = "invisible", r = t.stroke && 0 !== t.strokeWidth, i = t.fill;
    return i && r ? e = "fillThenStroke" : i ? e = "fill" : r && (e = "stroke"), e;
}
function wt(t) {
    return t.replace(/[\n\r]/g, "");
}
function kt(t) {
    return t.replace(/[\t]/g, " ");
}
function Mt(t) {
    return t.replace(/ +/g, " ");
}
function Ct(t, e, r) {
    switch(N(t, r.styleSheets, "text-transform")){
        case "uppercase":
            return e.toUpperCase();
        case "lowercase":
            return e.toLowerCase();
        default:
            return e;
    }
}
var Tt = function() {
    function t(t, e, r, i) {
        this.textNode = t, this.texts = [], this.textNodes = [], this.contexts = [], this.textAnchor = e, this.originX = r, this.originY = i, this.textMeasures = [];
    }
    return t.prototype.setX = function(t) {
        this.originX = t;
    }, t.prototype.setY = function(t) {
        this.originY = t;
    }, t.prototype.add = function(t, e, r) {
        this.texts.push(e), this.textNodes.push(t), this.contexts.push(r);
    }, t.prototype.rightTrimText = function() {
        for(var t = this.texts.length - 1; t >= 0; t--){
            if ("preserve" === this.contexts[t].attributeState.xmlSpace || "pre" === this.contexts[t].attributeState.whiteSpace || (this.texts[t] = this.texts[t].replace(/\s+$/, "")), this.texts[t].match(/[^\s]/)) return !1;
        }
        return !0;
    }, t.prototype.measureText = function(t) {
        for(var e = 0; e < this.texts.length; e++)this.textMeasures.push({
            width: t.textMeasure.measureTextWidth(this.texts[e], this.contexts[e].attributeState),
            length: this.texts[e].length
        });
    }, t.prototype.put = function(e, r) {
        var i, n, a, s, o = [], l = [], u = [], h = this.originX, f = this.originY, c = h, p = h;
        for(i = 0; i < this.textNodes.length; i++){
            n = this.textNodes[i], a = this.contexts[i], s = this.textMeasures[i] || {
                width: e.textMeasure.measureTextWidth(this.texts[i], this.contexts[i].attributeState),
                length: this.texts[i].length
            };
            var d = h, m = f;
            if ("#text" !== n.nodeName && !o.includes(n)) {
                o.push(n);
                var g = t.resolveRelativePositionAttribute(n, "dx");
                null !== g && (d += W(g, a.attributeState.fontSize));
                var b = t.resolveRelativePositionAttribute(n, "dy");
                null !== b && (m += W(b, a.attributeState.fontSize));
            }
            l[i] = d, u[i] = m, h = d + s.width + s.length * r, f = m, c = Math.min(c, d), p = Math.max(p, h);
        }
        var y = 0;
        switch(this.textAnchor){
            case "start":
                y = 0;
                break;
            case "middle":
                y = (p - c) / 2;
                break;
            case "end":
                y = p - c;
        }
        for(i = 0; i < this.textNodes.length; i++)if (n = this.textNodes[i], a = this.contexts[i], "#text" === n.nodeName || "hidden" !== a.attributeState.visibility) {
            e.pdf.saveGraphicsState(), ot(a, e, n);
            var v = a.attributeState.alignmentBaseline, x = St(a.attributeState);
            e.pdf.text(this.texts[i], l[i] - y, u[i], {
                baseline: V(v),
                angle: e.transform,
                renderingMode: "fill" === x ? void 0 : x,
                charSpace: 0 === r ? void 0 : r
            }), e.pdf.restoreGraphicsState();
        }
        return [
            h,
            f
        ];
    }, t.resolveRelativePositionAttribute = function(t, e) {
        for(var r, i = t; i && B(i, "tspan");){
            if (i.hasAttribute(e)) return i.getAttribute(e);
            if ((null === (r = t.parentElement) || void 0 === r ? void 0 : r.firstChild) !== t) break;
            i = i.parentElement;
        }
        return null;
    }, t;
}(), Ft = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.boundingBox = [], e;
    }
    return u(e, t), e.prototype.processTSpans = function(t, e, r, i, n, a) {
        for(var s = r.pdf.getFontSize(), o = "preserve" === r.attributeState.xmlSpace || "pre" === r.attributeState.whiteSpace, l = !0, u = !1, h = 0; h < e.childNodes.length; h++){
            var f = e.childNodes[h];
            if (f.textContent) {
                var c = f.textContent;
                if ("#text" === f.nodeName) {
                    var p = wt(c);
                    p = kt(p), o || (p = Mt(p), l && p.match(/^\s/) && (u = !0), p.match(/[^\s]/) && (l = !1), a.prevText.match(/\s$/) && (p = p.replace(/^\s+/, "")));
                    var d = Ct(e, p, r);
                    n.add(e, d, r), a.prevText = c, a.prevContext = r;
                } else if (B(f, "title")) ;
                else if (B(f, "tspan")) {
                    var m = f, g = m.getAttribute("x");
                    if (null !== g) {
                        var b = W(g, s);
                        n = new Tt(this, N(m, r.styleSheets, "text-anchor") || r.attributeState.textAnchor, b, 0), i.push({
                            type: "y",
                            chunk: n
                        });
                    }
                    var y = m.getAttribute("y");
                    if (null !== y) {
                        var v = W(y, s);
                        n = new Tt(this, N(m, r.styleSheets, "text-anchor") || r.attributeState.textAnchor, 0, v), i.push({
                            type: "x",
                            chunk: n
                        });
                    }
                    var x = r.clone();
                    st(x, t, m), this.processTSpans(t, m, x, i, n, a);
                }
            }
        }
        return u;
    }, e.prototype.renderCore = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a, s, o, l, u, h, f, p, d, m, g, b, y, v, x, S, w, k, M;
            return c(this, function(c) {
                if (t.pdf.saveGraphicsState(), e = 0, r = 0, i = 1, n = t.pdf.getFontSize(), a = W(this.element.getAttribute("x"), n), s = W(this.element.getAttribute("y"), n), o = W(this.element.getAttribute("dx"), n), l = W(this.element.getAttribute("dy"), n), u = parseFloat(this.element.getAttribute("textLength") || "0"), h = t.attributeState.visibility, 0 === this.element.childElementCount) f = this.element.textContent || "", p = function(t, e) {
                    return t = kt(t = wt(t)), "preserve" === e.xmlSpace || "pre" === e.whiteSpace || (t = Mt(t = t.trim())), t;
                }(f, t.attributeState), d = Ct(this.element, p, t), e = t.textMeasure.getTextOffset(d, t.attributeState), u > 0 && (m = t.textMeasure.measureTextWidth(d, t.attributeState), !("preserve" === t.attributeState.xmlSpace || "pre" === t.attributeState.whiteSpace) && f.match(/^\s/) && (i = 0), r = (u - m) / (d.length - i) || 0), "visible" === h && (g = t.attributeState.alignmentBaseline, b = St(t.attributeState), t.pdf.text(d, a + o - e, s + l, {
                    baseline: V(g),
                    angle: t.transform,
                    renderingMode: "fill" === b ? void 0 : b,
                    charSpace: 0 === r ? void 0 : r
                }), this.boundingBox = [
                    a + o - e,
                    s + l + .1 * n,
                    t.textMeasure.measureTextWidth(d, t.attributeState),
                    n
                ]);
                else {
                    for(y = [], v = new Tt(this, t.attributeState.textAnchor, a + o, s + l), y.push({
                        type: "",
                        chunk: v
                    }), x = this.processTSpans(this, this.element, t, y, v, {
                        prevText: " ",
                        prevContext: t
                    }), i = x ? 0 : 1, S = !0, w = y.length - 1; w >= 0; w--)S && (S = y[w].chunk.rightTrimText());
                    u > 0 && (k = 0, M = 0, y.forEach(function(e) {
                        var r = e.chunk;
                        r.measureText(t), r.textMeasures.forEach(function(t) {
                            var e = t.width, r = t.length;
                            k += e, M += r;
                        });
                    }), r = (u - k) / (M - i)), y.reduce(function(e, i) {
                        var n = i.type, a = i.chunk;
                        return "x" === n ? a.setX(e[0]) : "y" === n && a.setY(e[1]), a.put(t, r);
                    }, [
                        0,
                        0
                    ]);
                }
                return t.pdf.restoreGraphicsState(), [
                    2
                ];
            });
        });
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.prototype.getBoundingBoxCore = function(t) {
        return this.boundingBox.length > 0 ? this.boundingBox : _(this.element, t);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e;
}(ft), At = function(t) {
    function e(e, r) {
        return t.call(this, !0, e, r) || this;
    }
    return u(e, t), e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e.prototype.getPath = function(t) {
        var e, r, i = new (0, _svgpathDefault.default)(N(this.element, t.styleSheets, "d") || "").unshort().unarc().abs(), n = new C;
        return i.iterate(function(t) {
            switch(t[0]){
                case "M":
                    n.moveTo(t[1], t[2]);
                    break;
                case "L":
                    n.lineTo(t[1], t[2]);
                    break;
                case "H":
                    n.lineTo(t[1], r);
                    break;
                case "V":
                    n.lineTo(e, t[1]);
                    break;
                case "C":
                    n.curveTo(t[1], t[2], t[3], t[4], t[5], t[6]);
                    break;
                case "Q":
                    var i = x([
                        e,
                        r
                    ], [
                        t[1],
                        t[2]
                    ]), a = x([
                        t[3],
                        t[4]
                    ], [
                        t[1],
                        t[2]
                    ]);
                    n.curveTo(i[0], i[1], a[0], a[1], t[3], t[4]);
                    break;
                case "Z":
                    n.close();
            }
            switch(t[0]){
                case "M":
                case "L":
                    e = t[1], r = t[2];
                    break;
                case "H":
                    e = t[1];
                    break;
                case "V":
                    r = t[1];
                    break;
                case "C":
                    e = t[5], r = t[6];
                    break;
                case "Q":
                    e = t[3], r = t[4];
            }
        }), n;
    }, e;
}(ct), Pt = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,((?:.|\s)*)$/i, Bt = function(t) {
    function e(r, i) {
        var n = t.call(this, r, i) || this;
        return n.imageLoadingPromise = null, n.imageUrl = n.element.getAttribute("xlink:href") || n.element.getAttribute("href"), n.imageUrl && (n.imageLoadingPromise = e.fetchImageData(n.imageUrl)), n;
    }
    return u(e, t), e.prototype.renderCore = function(t) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a, s, o, l, u, h, f, p, d, m, y, v, x, S, w;
            return c(this, function(c) {
                switch(c.label){
                    case 0:
                        return this.imageLoadingPromise ? (t.pdf.setCurrentTransformationMatrix(t.transform), r = parseFloat(N(this.element, t.styleSheets, "width") || "0"), i = parseFloat(N(this.element, t.styleSheets, "height") || "0"), n = parseFloat(N(this.element, t.styleSheets, "x") || "0"), a = parseFloat(N(this.element, t.styleSheets, "y") || "0"), !isFinite(r) || r <= 0 || !isFinite(i) || i <= 0 ? [
                            2
                        ] : [
                            4,
                            this.imageLoadingPromise
                        ]) : [
                            2
                        ];
                    case 1:
                        return s = c.sent(), o = s.data, 0 !== (l = s.format).indexOf("svg") ? [
                            3,
                            3
                        ] : (u = new DOMParser, h = u.parseFromString(o, "image/svg+xml").firstElementChild, (!(f = this.element.getAttribute("preserveAspectRatio")) || f.indexOf("defer") < 0 || !h.getAttribute("preserveAspectRatio")) && h.setAttribute("preserveAspectRatio", f || ""), h.setAttribute("x", String(n)), h.setAttribute("y", String(a)), h.setAttribute("width", String(r)), h.setAttribute("height", String(i)), [
                            4,
                            Gt(h, p = {}).render(new g(t.pdf, {
                                refsHandler: new b(p),
                                styleSheets: t.styleSheets,
                                viewport: new gt(r, i),
                                svg2pdfParameters: t.svg2pdfParameters,
                                textMeasure: t.textMeasure
                            }))
                        ]);
                    case 2:
                        return c.sent(), [
                            2
                        ];
                    case 3:
                        d = "data:image/".concat(l, ";base64,").concat(btoa(o)), c.label = 4;
                    case 4:
                        return c.trys.push([
                            4,
                            6,
                            ,
                            7
                        ]), [
                            4,
                            e.getImageDimensions(d)
                        ];
                    case 5:
                        return m = c.sent(), y = m[0], v = m[1], x = [
                            0,
                            0,
                            y,
                            v
                        ], S = $(this.element, x, n, a, r, i, t), t.pdf.setCurrentTransformationMatrix(S), t.pdf.addImage(d, "", 0, 0, y, v), [
                            3,
                            7
                        ];
                    case 6:
                        return w = c.sent(), "object" == typeof console && console.warn && console.warn("Could not load image ".concat(this.imageUrl, ". \n").concat(w)), [
                            3,
                            7
                        ];
                    case 7:
                        return [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return _(this.element, t);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e.fetchImageData = function(t) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a, s;
            return c(this, function(o) {
                switch(o.label){
                    case 0:
                        if (!(n = t.match(Pt))) return [
                            3,
                            1
                        ];
                        if (a = n[2], "image" !== (s = a.split("/"))[0]) throw new Error("Unsupported image URL: ".concat(t));
                        return i = s[1], r = n[5], "base64" === n[4] ? (r = r.replace(/\s/g, ""), r = atob(r)) : r = decodeURIComponent(r), [
                            3,
                            3
                        ];
                    case 1:
                        return [
                            4,
                            e.fetchImage(t)
                        ];
                    case 2:
                        r = o.sent(), i = t.substring(t.lastIndexOf(".") + 1), o.label = 3;
                    case 3:
                        return [
                            2,
                            {
                                data: r,
                                format: i
                            }
                        ];
                }
            });
        });
    }, e.fetchImage = function(t) {
        return new Promise(function(e, r) {
            var i = new XMLHttpRequest;
            i.open("GET", t, !0), i.responseType = "arraybuffer", i.onload = function() {
                if (200 !== i.status) throw new Error("Error ".concat(i.status, ": Failed to load image '").concat(t, "'"));
                for(var r = new Uint8Array(i.response), n = "", a = 0; a < r.length; a++)n += String.fromCharCode(r[a]);
                e(n);
            }, i.onerror = r, i.onabort = r, i.send(null);
        });
    }, e.getMimeType = function(t) {
        switch(t = t.toLowerCase()){
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            default:
                return "image/".concat(t);
        }
    }, e.getImageDimensions = function(t) {
        return new Promise(function(e, r) {
            var i = new Image;
            i.onload = function() {
                e([
                    i.width,
                    i.height
                ]);
            }, i.onerror = r, i.src = t;
        });
    }, e;
}(ft), Nt = function(t) {
    function e(e, r, i) {
        var n = t.call(this, !0, r, i) || this;
        return n.closed = e, n;
    }
    return u(e, t), e.prototype.getPath = function(t) {
        if (!this.element.hasAttribute("points") || "" === this.element.getAttribute("points")) return null;
        var r = e.parsePointsString(this.element.getAttribute("points")), i = new C;
        if (r.length < 1) return i;
        i.moveTo(r[0][0], r[0][1]);
        for(var n = 1; n < r.length; n++)i.lineTo(r[n][0], r[n][1]);
        return this.closed && i.close(), i;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.parsePointsString = function(t) {
        for(var e = j(t), r = [], i = 0; i < e.length - 1; i += 2){
            var n = e[i], a = e[i + 1];
            r.push([
                n,
                a
            ]);
        }
        return r;
    }, e;
}(ct), Ot = function(t) {
    function e(e, r) {
        return t.call(this, !0, e, r) || this;
    }
    return u(e, t), e;
}(Nt), Lt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.render = function(t) {
        return Promise.resolve();
    }, e.prototype.getBoundingBoxCore = function(t) {
        return [
            0,
            0,
            0,
            0
        ];
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e.prototype.isVisible = function(t, e) {
        return O(this, t, e);
    }, e;
}(K), Et = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.apply = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, n, a, s, o;
            return c(this, function(l) {
                switch(l.label){
                    case 0:
                        e = this.computeNodeTransform(t), r = this.getBoundingBox(t), t.pdf.beginFormObject(r[0], r[1], r[2], r[3], e), n = m.getContextColors(t), function(t) {
                            var e = t.attributeState, r = t.pdf, n = 1, a = 1;
                            n *= e.fillOpacity, n *= e.opacity, e.fill instanceof d && void 0 !== e.fill.color.a && (n *= e.fill.color.a), a *= e.strokeOpacity, a *= e.opacity, e.stroke instanceof d && void 0 !== e.stroke.color.a && (a *= e.stroke.color.a);
                            var s, o = {};
                            if (o.opacity = n, o["stroke-opacity"] = a, r.setGState(new (0, _jspdf.GState)(o)), e.fill && e.fill instanceof d && e.fill.color.ok ? r.setFillColor(e.fill.color.r, e.fill.color.g, e.fill.color.b) : r.setFillColor(0, 0, 0), r.setLineWidth(e.strokeWidth), e.stroke instanceof d ? r.setDrawColor(e.stroke.color.r, e.stroke.color.g, e.stroke.color.b) : r.setDrawColor(0, 0, 0), r.setLineCap(e.strokeLinecap), r.setLineJoin(e.strokeLinejoin), e.strokeDasharray ? r.setLineDashPattern(e.strokeDasharray, e.strokeDashoffset) : r.setLineDashPattern([], 0), r.setLineMiterLimit(e.strokeMiterlimit), s = U.hasOwnProperty(e.fontFamily) ? U[e.fontFamily] : e.fontFamily, e.fill && e.fill instanceof d && e.fill.color.ok) {
                                var l = e.fill.color;
                                r.setTextColor(l.r, l.g, l.b);
                            } else r.setTextColor(0, 0, 0);
                            var u = "";
                            "bold" === e.fontWeight && (u = "bold"), "italic" === e.fontStyle && (u += "italic"), "" === u && (u = "normal"), void 0 !== s || void 0 !== u ? (void 0 === s && (s = U.hasOwnProperty(e.fontFamily) ? U[e.fontFamily] : e.fontFamily), r.setFont(s, u)) : r.setFont("helvetica", u), r.setFontSize(e.fontSize * r.internal.scaleFactor);
                        }(a = new g(t.pdf, {
                            refsHandler: t.refsHandler,
                            styleSheets: t.styleSheets,
                            viewport: t.viewport,
                            svg2pdfParameters: t.svg2pdfParameters,
                            textMeasure: t.textMeasure,
                            attributeState: Object.assign(m.default(), n)
                        })), s = 0, o = this.children, l.label = 1;
                    case 1:
                        return s < o.length ? [
                            4,
                            o[s].render(a)
                        ] : [
                            3,
                            4
                        ];
                    case 2:
                        l.sent(), l.label = 3;
                    case 3:
                        return s++, [
                            3,
                            1
                        ];
                    case 4:
                        return t.pdf.endFormObject(a.refsHandler.generateKey(this.element.getAttribute("id"), n)), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        var e, r = this.element.getAttribute("viewBox");
        return r && (e = j(r)), [
            e && e[0] || 0,
            e && e[1] || 0,
            e && e[2] || parseFloat(this.element.getAttribute("markerWidth") || "3"),
            e && e[3] || parseFloat(this.element.getAttribute("markerHeight") || "3")
        ];
    }, e.prototype.computeNodeTransformCore = function(t) {
        var e, r = parseFloat(this.element.getAttribute("refX") || "0"), i = parseFloat(this.element.getAttribute("refY") || "0"), n = this.element.getAttribute("viewBox");
        if (n) {
            var a = j(n);
            e = $(this.element, a, 0, 0, parseFloat(this.element.getAttribute("markerWidth") || "3"), parseFloat(this.element.getAttribute("markerHeight") || "3"), t, !0), e = t.pdf.matrixMult(t.pdf.Matrix(1, 0, 0, 1, -r, -i), e);
        } else e = t.pdf.Matrix(1, 0, 0, 1, -r, -i);
        return e;
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e;
}(J), It = function(t) {
    function e(e, r) {
        return t.call(this, e, r) || this;
    }
    return u(e, t), e.prototype.getR = function(t) {
        var e;
        return null !== (e = this.r) && void 0 !== e ? e : this.r = parseFloat(N(this.element, t.styleSheets, "r") || "0");
    }, e.prototype.getRx = function(t) {
        return this.getR(t);
    }, e.prototype.getRy = function(t) {
        return this.getR(t);
    }, e;
}(vt), Rt = function(t) {
    function e(e, r) {
        return t.call(this, !1, e, r) || this;
    }
    return u(e, t), e;
}(Nt), Ht = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.renderCore = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r;
            return c(this, function(i) {
                switch(i.label){
                    case 0:
                        e = 0, r = this.children, i.label = 1;
                    case 1:
                        return e < r.length ? [
                            4,
                            r[e].render(t)
                        ] : [
                            3,
                            4
                        ];
                    case 2:
                        i.sent(), i.label = 3;
                    case 3:
                        return e++, [
                            3,
                            1
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return q(t, this);
    }, e;
}(ht), Dt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.prototype.render = function(e) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a, s;
            return c(this, function(o) {
                switch(o.label){
                    case 0:
                        return this.isVisible("hidden" !== e.attributeState.visibility, e) ? (r = this.getX(e), i = this.getY(e), n = this.getWidth(e), a = this.getHeight(e), e.pdf.saveGraphicsState(), s = e.transform, this.element.hasAttribute("transform") && (s = e.pdf.matrixMult(Q(this.element.getAttribute("transform"), e), s)), e.pdf.setCurrentTransformationMatrix(s), e.withinUse || "visible" === N(this.element, e.styleSheets, "overflow") || e.pdf.rect(r, i, n, a).clip().discardPath(), [
                            4,
                            t.prototype.render.call(this, e.clone({
                                transform: e.pdf.unitMatrix,
                                viewport: e.withinUse ? e.viewport : new gt(n, a)
                            }))
                        ]) : [
                            2
                        ];
                    case 1:
                        return o.sent(), e.pdf.restoreGraphicsState(), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.computeNodeTransform = function(t) {
        return this.computeNodeTransformCore(t);
    }, e.prototype.computeNodeTransformCore = function(t) {
        if (t.withinUse) return t.pdf.unitMatrix;
        var e, r = this.getX(t), i = this.getY(t), n = this.getViewBox();
        if (n) {
            var a = this.getWidth(t), s = this.getHeight(t);
            e = $(this.element, n, r, i, a, s, t);
        } else e = t.pdf.Matrix(1, 0, 0, 1, r, i);
        return e;
    }, e.prototype.getWidth = function(t) {
        if (void 0 !== this.width) return this.width;
        var e, r, i = t.svg2pdfParameters;
        if (this.isOutermostSvg(t)) {
            if (null != i.width) e = i.width;
            else if (r = N(this.element, t.styleSheets, "width")) e = parseFloat(r);
            else {
                var n = this.getViewBox();
                if (n && (null != i.height || N(this.element, t.styleSheets, "height"))) {
                    var a = n[2] / n[3];
                    e = this.getHeight(t) * a;
                } else e = Math.min(300, t.viewport.width, 2 * t.viewport.height);
            }
        } else e = (r = N(this.element, t.styleSheets, "width")) ? parseFloat(r) : t.viewport.width;
        return this.width = e;
    }, e.prototype.getHeight = function(t) {
        if (void 0 !== this.height) return this.height;
        var e, r, i = t.svg2pdfParameters;
        if (this.isOutermostSvg(t)) {
            if (null != i.height) e = i.height;
            else if (r = N(this.element, t.styleSheets, "height")) e = parseFloat(r);
            else {
                var n = this.getViewBox();
                if (n) {
                    var a = n[2] / n[3];
                    e = this.getWidth(t) / a;
                } else e = Math.min(150, t.viewport.width / 2, t.viewport.height);
            }
        } else e = (r = N(this.element, t.styleSheets, "height")) ? parseFloat(r) : t.viewport.height;
        return this.height = e;
    }, e.prototype.getX = function(t) {
        if (void 0 !== this.x) return this.x;
        if (this.isOutermostSvg(t)) return this.x = 0;
        var e = N(this.element, t.styleSheets, "x");
        return this.x = e ? parseFloat(e) : 0;
    }, e.prototype.getY = function(t) {
        if (void 0 !== this.y) return this.y;
        if (this.isOutermostSvg(t)) return this.y = 0;
        var e = N(this.element, t.styleSheets, "y");
        return this.y = e ? parseFloat(e) : 0;
    }, e.prototype.getViewBox = function() {
        if (void 0 !== this.viewBox) return this.viewBox;
        var t = this.element.getAttribute("viewBox");
        return this.viewBox = t ? j(t) : void 0;
    }, e.prototype.isOutermostSvg = function(t) {
        return t.svg2pdfParameters.element === this.element;
    }, e;
}(Ht), Wt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.prototype.computeNodeTransformCore = function(t) {
        return t.pdf.unitMatrix;
    }, e;
}(Ht), Vt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.renderCore = function(e) {
        return f(this, void 0, void 0, function() {
            var r, i, n, a;
            return c(this, function(s) {
                switch(s.label){
                    case 0:
                        return [
                            4,
                            t.prototype.renderCore.call(this, e)
                        ];
                    case 1:
                        return s.sent(), (r = N(this.element, e.styleSheets, "href")) && (i = this.getBoundingBox(e), n = e.pdf.internal.scaleFactor, a = e.pdf.internal.pageSize.getHeight(), e.pdf.link(n * (i[0] * e.transform.sx + e.transform.tx), a - n * (i[1] * e.transform.sy + e.transform.ty), n * i[2], n * i[3], {
                            url: r
                        })), [
                            2
                        ];
                }
            });
        });
    }, e;
}(Wt), jt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return u(e, t), e.prototype.apply = function(t) {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a;
            return c(this, function(s) {
                switch(s.label){
                    case 0:
                        if (!this.isVisible(!0, t)) return [
                            2
                        ];
                        e = t.pdf.matrixMult(this.computeNodeTransform(t), t.transform), t.pdf.setCurrentTransformationMatrix(e), r = 0, i = this.children, s.label = 1;
                    case 1:
                        return r < i.length ? [
                            4,
                            i[r].render(new g(t.pdf, {
                                refsHandler: t.refsHandler,
                                styleSheets: t.styleSheets,
                                viewport: t.viewport,
                                withinClipPath: !0,
                                svg2pdfParameters: t.svg2pdfParameters,
                                textMeasure: t.textMeasure
                            }))
                        ] : [
                            3,
                            4
                        ];
                    case 2:
                        s.sent(), s.label = 3;
                    case 3:
                        return r++, [
                            3,
                            1
                        ];
                    case 4:
                        return n = this.children.length > 0 && !!N(this.children[0].element, t.styleSheets, "clip-rule"), a = n ? this.getClipRuleAttr(this.children[0].element, t.styleSheets) : this.getClipRuleAttr(this.element, t.styleSheets), t.pdf.clip(a).discardPath(), t.pdf.setCurrentTransformationMatrix(e.inversed()), [
                            2
                        ];
                }
            });
        });
    }, e.prototype.getBoundingBoxCore = function(t) {
        return q(t, this);
    }, e.prototype.isVisible = function(t, e) {
        return L(this, t, e);
    }, e.prototype.getClipRuleAttr = function(t, e) {
        return "evenodd" === N(t, e, "clip-rule") ? "evenodd" : void 0;
    }, e;
}(J);
function Gt(e, r) {
    var i, n = [];
    switch(function(t, e) {
        for(var r = [], i = 0; i < t.childNodes.length; i++){
            var n = t.childNodes[i];
            "#" !== n.nodeName.charAt(0) && r.push(n);
        }
        for(i = 0; i < r.length; i++)e(i, r[i]);
    }(e, function(t, e) {
        return n.push(Gt(e, r));
    }), e.tagName.toLowerCase()){
        case "a":
            i = new Vt(e, n);
            break;
        case "g":
            i = new Wt(e, n);
            break;
        case "circle":
            i = new It(e, n);
            break;
        case "clippath":
            i = new jt(e, n);
            break;
        case "ellipse":
            i = new xt(e, n);
            break;
        case "lineargradient":
            i = new tt(e, n);
            break;
        case "image":
            i = new Bt(e, n);
            break;
        case "line":
            i = new dt(e, n);
            break;
        case "marker":
            i = new Et(e, n);
            break;
        case "path":
            i = new At(e, n);
            break;
        case "pattern":
            i = new it(e, n);
            break;
        case "polygon":
            i = new Ot(e, n);
            break;
        case "polyline":
            i = new Rt(e, n);
            break;
        case "radialgradient":
            i = new et(e, n);
            break;
        case "rect":
            i = new yt(e, n);
            break;
        case "svg":
            i = new Dt(e, n);
            break;
        case "symbol":
            i = new mt(e, n);
            break;
        case "text":
            i = new Ft(e, n);
            break;
        case "use":
            i = new bt(e, n);
            break;
        default:
            i = new Lt(e, n);
    }
    if (null != r && i.element.hasAttribute("id")) {
        var a = (0, _cssescDefault.default)(i.element.id, {
            isIdentifier: !0
        });
        r[a] = r[a] || i;
    }
    return i.children.forEach(function(t) {
        return t.setParent(i);
    }), i;
}
var Ut = function() {
    function t(t, e) {
        this.rootSvg = t, this.loadExternalSheets = e, this.styleSheets = [];
    }
    return t.prototype.load = function() {
        return f(this, void 0, void 0, function() {
            var t;
            return c(this, function(e) {
                switch(e.label){
                    case 0:
                        return [
                            4,
                            this.collectStyleSheetTexts()
                        ];
                    case 1:
                        return t = e.sent(), this.parseCssSheets(t), [
                            2
                        ];
                }
            });
        });
    }, t.prototype.collectStyleSheetTexts = function() {
        return f(this, void 0, void 0, function() {
            var e, r, i, n, a;
            return c(this, function(s) {
                switch(s.label){
                    case 0:
                        if (e = [], this.loadExternalSheets && this.rootSvg.ownerDocument) for(n = 0; n < this.rootSvg.ownerDocument.childNodes.length; n++)"xml-stylesheet" === (r = this.rootSvg.ownerDocument.childNodes[n]).nodeName && "string" == typeof r.data && e.push(t.loadSheet(r.data.match(/href=["'].*?["']/)[0].split("=")[1].slice(1, -1)));
                        for(i = this.rootSvg.querySelectorAll("style,link"), n = 0; n < i.length; n++)B(a = i[n], "style") ? e.push(a.textContent) : this.loadExternalSheets && B(a, "link") && "stylesheet" === a.getAttribute("rel") && a.hasAttribute("href") && e.push(t.loadSheet(a.getAttribute("href")));
                        return [
                            4,
                            Promise.all(e)
                        ];
                    case 1:
                        return [
                            2,
                            s.sent().filter(function(t) {
                                return null !== t;
                            })
                        ];
                }
            });
        });
    }, t.prototype.parseCssSheets = function(e) {
        for(var r = document.implementation.createHTMLDocument(""), i = 0, n = e; i < n.length; i++){
            var a = n[i], s = r.createElement("style");
            s.textContent = a, r.body.appendChild(s);
            var o = s.sheet;
            if (o instanceof CSSStyleSheet) {
                for(var l = o.cssRules.length - 1; l >= 0; l--){
                    var u = o.cssRules[l];
                    if (u instanceof CSSStyleRule) {
                        var h = u;
                        if (h.selectorText.indexOf(",") >= 0) {
                            o.deleteRule(l);
                            for(var f = h.cssText.substring(h.selectorText.length), c = t.splitSelectorAtCommas(h.selectorText), p = 0; p < c.length; p++)o.insertRule(c[p] + f, l + p);
                        }
                    } else o.deleteRule(l);
                }
                this.styleSheets.push(o);
            }
        }
    }, t.splitSelectorAtCommas = function(t) {
        for(var e, r = /,|["']/g, i = /[^\\]["]/g, n = /[^\\][']/g, a = [], s = "initial", o = -1, l = i, u = 0; u < t.length;)switch(s){
            case "initial":
                r.lastIndex = u, (e = r.exec(t)) ? ("," === e[0] ? (a.push(t.substring(o + 1, r.lastIndex - 1).trim()), o = r.lastIndex - 1) : (s = "withinQuotes", l = '"' === e[0] ? i : n), u = r.lastIndex) : (a.push(t.substring(o + 1).trim()), u = t.length);
                break;
            case "withinQuotes":
                l.lastIndex = u, (e = l.exec(t)) && (u = l.lastIndex, s = "initial");
        }
        return a;
    }, t.loadSheet = function(t) {
        return new Promise(function(e, r) {
            var i = new XMLHttpRequest;
            i.open("GET", t, !0), i.responseType = "text", i.onload = function() {
                200 !== i.status && r(new Error("Error ".concat(i.status, ": Failed to load '").concat(t, "'"))), e(i.responseText);
            }, i.onerror = r, i.onabort = r, i.send(null);
        }).catch(function() {
            return null;
        });
    }, t.prototype.getPropertyValue = function(t, e) {
        for(var r = [], i = 0, n = this.styleSheets; i < n.length; i++)for(var a = n[i], s = 0; s < a.cssRules.length; s++){
            var l = a.cssRules[s];
            l.style.getPropertyValue(e) && t.matches(l.selectorText) && r.push(l);
        }
        if (0 !== r.length) return r.reduce(function(t, r) {
            var i, n, a;
            return 1 === (n = r, (a = (i = t).style.getPropertyPriority(e)) !== n.style.getPropertyPriority(e) ? "important" === a ? 1 : -1 : (0, _specificity.compare)(i.selectorText, n.selectorText)) ? t : r;
        }).style.getPropertyValue(e) || void 0;
    }, t;
}(), zt = function() {
    function t() {
        this.measureMethods = {};
    }
    return t.prototype.getTextOffset = function(t, e) {
        var r = e.textAnchor;
        if ("start" === r) return 0;
        var i = this.measureTextWidth(t, e), n = 0;
        switch(r){
            case "end":
                n = i;
                break;
            case "middle":
                n = i / 2;
        }
        return n;
    }, t.prototype.measureTextWidth = function(t, e) {
        if (0 === t.length) return 0;
        var r = e.fontFamily;
        return this.getMeasureFunction(r).call(this, t, e.fontFamily, e.fontSize + "px", e.fontStyle, e.fontWeight);
    }, t.prototype.getMeasurementTextNode = function() {
        if (!this.textMeasuringTextElement) {
            this.textMeasuringTextElement = document.createElementNS(D, "text");
            var t = document.createElementNS(D, "svg");
            t.appendChild(this.textMeasuringTextElement), t.style.setProperty("position", "absolute"), t.style.setProperty("visibility", "hidden"), document.body.appendChild(t);
        }
        return this.textMeasuringTextElement;
    }, t.prototype.canvasTextMeasure = function(t, e, r, i, n) {
        var a = document.createElement("canvas").getContext("2d");
        return null != a ? (a.font = [
            i,
            n,
            r,
            e
        ].join(" "), a.measureText(t).width) : 0;
    }, t.prototype.svgTextMeasure = function(t, e, r, i, n, a) {
        void 0 === a && (a = this.getMeasurementTextNode());
        var s = a;
        return s.setAttribute("font-family", e), s.setAttribute("font-size", r), s.setAttribute("font-style", i), s.setAttribute("font-weight", n), s.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), s.textContent = t, s.getBBox().width;
    }, t.prototype.getMeasureFunction = function(e) {
        var r = this.measureMethods[e];
        if (!r) {
            var i = "16px", n = "normal", a = "normal", s = this.canvasTextMeasure(t.testString, e, i, n, a), o = this.svgTextMeasure(t.testString, e, i, n, a);
            r = Math.abs(s - o) < t.epsilon ? this.canvasTextMeasure : this.svgTextMeasure, this.measureMethods[e] = r;
        }
        return r;
    }, t.prototype.cleanupTextMeasuring = function() {
        if (this.textMeasuringTextElement) {
            var t = this.textMeasuringTextElement.parentNode;
            t && document.body.removeChild(t), this.textMeasuringTextElement = void 0;
        }
    }, t.testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789!\"$%&/()=?'\\+*-_.:,;^}][{#~|<>", t.epsilon = .1, t;
}();
function Yt(t, e) {
    return f(this, arguments, void 0, function(t, e, r) {
        var i, n, a, s, o, l, u, f, p, d, m, y, v, x;
        return void 0 === r && (r = {}), c(this, function(c) {
            switch(c.label){
                case 0:
                    return i = null !== (y = r.x) && void 0 !== y ? y : 0, n = null !== (v = r.y) && void 0 !== v ? v : 0, a = null !== (x = r.loadExternalStyleSheets) && void 0 !== x && x, o = new b(s = {}), [
                        4,
                        (l = new Ut(t, a)).load()
                    ];
                case 1:
                    return c.sent(), u = new gt(e.internal.pageSize.getWidth(), e.internal.pageSize.getHeight()), f = h(h({}, r), {
                        element: t
                    }), p = new zt, d = new g(e, {
                        refsHandler: o,
                        styleSheets: l,
                        viewport: u,
                        svg2pdfParameters: f,
                        textMeasure: p
                    }), e.advancedAPI(), e.saveGraphicsState(), e.setCurrentTransformationMatrix(e.Matrix(1, 0, 0, 1, i, n)), e.setLineWidth(d.attributeState.strokeWidth), m = d.attributeState.fill.color, e.setFillColor(m.r, m.g, m.b), e.setFont(d.attributeState.fontFamily), e.setFontSize(d.attributeState.fontSize * e.internal.scaleFactor), [
                        4,
                        Gt(t, s).render(d)
                    ];
                case 2:
                    return c.sent(), e.restoreGraphicsState(), e.compatAPI(), d.textMeasure.cleanupTextMeasuring(), [
                        2,
                        e
                    ];
            }
        });
    });
}
(0, _jspdf.jsPDF).API.svg = function(t, e) {
    return void 0 === e && (e = {}), Yt(t, this, e);
};

},{"cssesc":"5w49i","font-family-papandreou":"2UdMk","jspdf":"b6g54","svgpath":"eyh6C","specificity":"1WQva","@parcel/transformer-js/src/esmodule-helpers.js":"8JZvL"}],"5w49i":[function(require,module,exports,__globalThis) {
/*! https://mths.be/cssesc v3.0.0 by @mathias */ 'use strict';
var object = {};
var hasOwnProperty = object.hasOwnProperty;
var merge = function merge(options, defaults) {
    if (!options) return defaults;
    var result = {};
    for(var key in defaults)// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
    // only recognized option names are used.
    result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
    return result;
};
var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
var regexAlwaysEscape = /['"\\]/;
var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
// https://mathiasbynens.be/notes/css-escapes#css
var cssesc = function cssesc(string, options) {
    options = merge(options, cssesc.options);
    if (options.quotes != 'single' && options.quotes != 'double') options.quotes = 'single';
    var quote = options.quotes == 'double' ? '"' : '\'';
    var isIdentifier = options.isIdentifier;
    var firstChar = string.charAt(0);
    var output = '';
    var counter = 0;
    var length = string.length;
    while(counter < length){
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value = void 0;
        // If it’s not a printable ASCII character…
        if (codePoint < 0x20 || codePoint > 0x7E) {
            if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
                // It’s a high surrogate, and there is a next character.
                var extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) // next character is low surrogate
                codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                else // It’s an unmatched surrogate; only append this code unit, in case
                // the next code unit is the high surrogate of a surrogate pair.
                counter--;
            }
            value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
        } else {
            if (options.escapeEverything) {
                if (regexAnySingleEscape.test(character)) value = '\\' + character;
                else value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
            } else if (/[\t\n\f\r\x0B]/.test(character)) value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
            else if (character == '\\' || !isIdentifier && (character == '"' && quote == character || character == '\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) value = '\\' + character;
            else value = character;
        }
        output += value;
    }
    if (isIdentifier) {
        if (/^-[-\d]/.test(output)) output = '\\-' + output.slice(1);
        else if (/\d/.test(firstChar)) output = '\\3' + firstChar + ' ' + output.slice(1);
    }
    // Remove spaces after `\HEX` escapes that are not followed by a hex digit,
    // since they’re redundant. Note that this is only possible if the escape
    // sequence isn’t preceded by an odd number of backslashes.
    output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) // It’s not safe to remove the space, so don’t.
        return $0;
        // Strip the space.
        return ($1 || '') + $2;
    });
    if (!isIdentifier && options.wrap) return quote + output + quote;
    return output;
};
// Expose default options (so they can be overridden globally).
cssesc.options = {
    'escapeEverything': false,
    'isIdentifier': false,
    'quotes': 'single',
    'wrap': false
};
cssesc.version = '3.0.0';
module.exports = cssesc;

},{}],"2UdMk":[function(require,module,exports,__globalThis) {
// parse
// =====
// states
// ------
var PLAIN = 0;
var STRINGS = 1;
var ESCAPING = 2;
var IDENTIFIER = 3;
var SEPARATING = 4;
var SPACEAFTERIDENTIFIER = 5;
var ESCAPINGIDENTIFIER = 6;
// patterns
// --------
var identifierPattern = /[a-z0-9_-]/i;
var spacePattern = /[\s\t]/;
// ---
var parse = function(str) {
    // vars
    // ----
    var starting = true;
    var state = PLAIN;
    var buffer = '';
    var i = 0;
    var quote;
    var c;
    // result
    // ------
    var names = [];
    // parse
    // -----
    while(true){
        c = str[i];
        if (state === PLAIN) {
            if (!c && starting) break;
            else if (!c && !starting) throw new Error('Parse error');
            else if (c === '"' || c === "'") {
                quote = c;
                state = STRINGS;
                starting = false;
            } else if (spacePattern.test(c)) ;
            else if (identifierPattern.test(c)) {
                state = IDENTIFIER;
                starting = false;
                i--;
            } else throw new Error('Parse error');
        } else if (state === STRINGS) {
            if (!c) throw new Error('Parse Error');
            else if (c === "\\") state = ESCAPING;
            else if (c === quote) {
                names.push(buffer);
                buffer = '';
                state = SEPARATING;
            } else buffer += c;
        } else if (state === ESCAPING) {
            if (c === quote || c === "\\") {
                buffer += c;
                state = STRINGS;
            } else throw new Error('Parse error');
        } else if (state === IDENTIFIER) {
            if (!c) {
                names.push(buffer);
                break;
            } else if (identifierPattern.test(c)) buffer += c;
            else if (c === ',') {
                names.push(buffer);
                buffer = '';
                state = PLAIN;
            } else if (spacePattern.test(c)) state = SPACEAFTERIDENTIFIER;
            else if (c === "\\") state = ESCAPINGIDENTIFIER;
        } else if (state === ESCAPINGIDENTIFIER) {
            if (/[0-9a-f]/i.test(c)) // TODO: Support escaped unicode characters (backslash followed by hex digits)
            // https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
            throw new Error('Parse error');
            else {
                buffer += c;
                state = IDENTIFIER;
            }
        } else if (state === SPACEAFTERIDENTIFIER) {
            if (!c) {
                names.push(buffer);
                break;
            } else if (identifierPattern.test(c)) {
                buffer += ' ' + c;
                state = IDENTIFIER;
            } else if (c === ',') {
                names.push(buffer);
                buffer = '';
                state = PLAIN;
            } else if (spacePattern.test(c)) ;
            else throw new Error('Parse error');
        } else if (state === SEPARATING) {
            if (!c) break;
            else if (c === ',') state = PLAIN;
            else if (spacePattern.test(c)) ;
            else throw new Error('Parse error');
        }
        i++;
    }
    // result
    // ------
    return names;
};
// stringify
// =========
// pattern
// -------
var stringsPattern = /[^a-z0-9_-]/i;
// ---
var stringify = function(names, options) {
    // quote
    // -----
    var quote = options && options.quote || '"';
    if (quote !== '"' && quote !== "'") throw new Error('Quote must be `\'` or `"`');
    var quotePattern = new RegExp(quote, 'g');
    // stringify
    // ---------
    var safeNames = [];
    for(var i = 0; i < names.length; ++i){
        var name = names[i];
        if (stringsPattern.test(name)) {
            name = name.replace(/\\/g, "\\\\").replace(quotePattern, "\\" + quote);
            name = quote + name + quote;
        }
        safeNames.push(name);
    }
    // result
    // ------
    return safeNames.join(', ');
};
// export
// ======
module.exports = {
    parse: parse,
    stringify: stringify
};

},{}],"eyh6C":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = require("b7a21345fb18db26");

},{"b7a21345fb18db26":"7M7Bn"}],"7M7Bn":[function(require,module,exports,__globalThis) {
// SVG Path transformations library
//
// Usage:
//
//    SvgPath('...')
//      .translate(-150, -100)
//      .scale(0.5)
//      .translate(-150, -100)
//      .toFixed(1)
//      .toString()
//
'use strict';
var pathParse = require("35145da737529f6");
var transformParse = require("6bc4268e7f8669f5");
var matrix = require("cbb2e9fadca34df3");
var a2c = require("587ea3e7d9f148e1");
var ellipse = require("bd75b7d4caa4ad39");
// Class constructor
//
function SvgPath(path) {
    if (!(this instanceof SvgPath)) return new SvgPath(path);
    var pstate = pathParse(path);
    // Array of path segments.
    // Each segment is array [command, param1, param2, ...]
    this.segments = pstate.segments;
    // Error message on parse error.
    this.err = pstate.err;
    // Transforms stack for lazy evaluation
    this.__stack = [];
}
SvgPath.from = function(src) {
    if (typeof src === 'string') return new SvgPath(src);
    if (src instanceof SvgPath) {
        // Create empty object
        var s = new SvgPath('');
        // Clone properies
        s.err = src.err;
        s.segments = src.segments.map(function(sgm) {
            return sgm.slice();
        });
        s.__stack = src.__stack.map(function(m) {
            return matrix().matrix(m.toArray());
        });
        return s;
    }
    throw new Error('SvgPath.from: invalid param type ' + src);
};
SvgPath.prototype.__matrix = function(m) {
    var self = this, i;
    // Quick leave for empty matrix
    if (!m.queue.length) return;
    this.iterate(function(s, index, x, y) {
        var p, result, name, isRelative;
        switch(s[0]){
            // Process 'assymetric' commands separately
            case 'v':
                p = m.calc(0, s[1], true);
                result = p[0] === 0 ? [
                    'v',
                    p[1]
                ] : [
                    'l',
                    p[0],
                    p[1]
                ];
                break;
            case 'V':
                p = m.calc(x, s[1], false);
                result = p[0] === m.calc(x, y, false)[0] ? [
                    'V',
                    p[1]
                ] : [
                    'L',
                    p[0],
                    p[1]
                ];
                break;
            case 'h':
                p = m.calc(s[1], 0, true);
                result = p[1] === 0 ? [
                    'h',
                    p[0]
                ] : [
                    'l',
                    p[0],
                    p[1]
                ];
                break;
            case 'H':
                p = m.calc(s[1], y, false);
                result = p[1] === m.calc(x, y, false)[1] ? [
                    'H',
                    p[0]
                ] : [
                    'L',
                    p[0],
                    p[1]
                ];
                break;
            case 'a':
            case 'A':
                // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
                // Drop segment if arc is empty (end point === start point)
                /*if ((s[0] === 'A' && s[6] === x && s[7] === y) ||
            (s[0] === 'a' && s[6] === 0 && s[7] === 0)) {
          return [];
        }*/ // Transform rx, ry and the x-axis-rotation
                var ma = m.toArray();
                var e = ellipse(s[1], s[2], s[3]).transform(ma);
                // flip sweep-flag if matrix is not orientation-preserving
                if (ma[0] * ma[3] - ma[1] * ma[2] < 0) s[5] = s[5] ? '0' : '1';
                // Transform end point as usual (without translation for relative notation)
                p = m.calc(s[6], s[7], s[0] === 'a');
                // Empty arcs can be ignored by renderer, but should not be dropped
                // to avoid collisions with `S A S` and so on. Replace with empty line.
                if (s[0] === 'A' && s[6] === x && s[7] === y || s[0] === 'a' && s[6] === 0 && s[7] === 0) {
                    result = [
                        s[0] === 'a' ? 'l' : 'L',
                        p[0],
                        p[1]
                    ];
                    break;
                }
                // if the resulting ellipse is (almost) a segment ...
                if (e.isDegenerate()) // replace the arc by a line
                result = [
                    s[0] === 'a' ? 'l' : 'L',
                    p[0],
                    p[1]
                ];
                else // if it is a real ellipse
                // s[0], s[4] and s[5] are not modified
                result = [
                    s[0],
                    e.rx,
                    e.ry,
                    e.ax,
                    s[4],
                    s[5],
                    p[0],
                    p[1]
                ];
                break;
            case 'm':
                // Edge case. The very first `m` should be processed as absolute, if happens.
                // Make sense for coord shift transforms.
                isRelative = index > 0;
                p = m.calc(s[1], s[2], isRelative);
                result = [
                    'm',
                    p[0],
                    p[1]
                ];
                break;
            default:
                name = s[0];
                result = [
                    name
                ];
                isRelative = name.toLowerCase() === name;
                // Apply transformations to the segment
                for(i = 1; i < s.length; i += 2){
                    p = m.calc(s[i], s[i + 1], isRelative);
                    result.push(p[0], p[1]);
                }
        }
        self.segments[index] = result;
    }, true);
};
// Apply stacked commands
//
SvgPath.prototype.__evaluateStack = function() {
    var m, i;
    if (!this.__stack.length) return;
    if (this.__stack.length === 1) {
        this.__matrix(this.__stack[0]);
        this.__stack = [];
        return;
    }
    m = matrix();
    i = this.__stack.length;
    while(--i >= 0)m.matrix(this.__stack[i].toArray());
    this.__matrix(m);
    this.__stack = [];
};
// Convert processed SVG Path back to string
//
SvgPath.prototype.toString = function() {
    var result = '', prevCmd = '', cmdSkipped = false;
    this.__evaluateStack();
    for(var i = 0, len = this.segments.length; i < len; i++){
        var segment = this.segments[i];
        var cmd = segment[0];
        // Command not repeating => store
        if (cmd !== prevCmd || cmd === 'm' || cmd === 'M') {
            // workaround for FontForge SVG importing bug, keep space between "z m".
            if (cmd === 'm' && prevCmd === 'z') result += ' ';
            result += cmd;
            cmdSkipped = false;
        } else cmdSkipped = true;
        // Store segment params
        for(var pos = 1; pos < segment.length; pos++){
            var val = segment[pos];
            // Space can be skipped
            // 1. After command (always)
            // 2. For negative value (with '-' at start)
            if (pos === 1) {
                if (cmdSkipped && val >= 0) result += ' ';
            } else if (val >= 0) result += ' ';
            result += val;
        }
        prevCmd = cmd;
    }
    return result;
};
// Translate path to (x [, y])
//
SvgPath.prototype.translate = function(x, y) {
    this.__stack.push(matrix().translate(x, y || 0));
    return this;
};
// Scale path to (sx [, sy])
// sy = sx if not defined
//
SvgPath.prototype.scale = function(sx, sy) {
    this.__stack.push(matrix().scale(sx, !sy && sy !== 0 ? sx : sy));
    return this;
};
// Rotate path around point (sx [, sy])
// sy = sx if not defined
//
SvgPath.prototype.rotate = function(angle, rx, ry) {
    this.__stack.push(matrix().rotate(angle, rx || 0, ry || 0));
    return this;
};
// Skew path along the X axis by `degrees` angle
//
SvgPath.prototype.skewX = function(degrees) {
    this.__stack.push(matrix().skewX(degrees));
    return this;
};
// Skew path along the Y axis by `degrees` angle
//
SvgPath.prototype.skewY = function(degrees) {
    this.__stack.push(matrix().skewY(degrees));
    return this;
};
// Apply matrix transform (array of 6 elements)
//
SvgPath.prototype.matrix = function(m) {
    this.__stack.push(matrix().matrix(m));
    return this;
};
// Transform path according to "transform" attr of SVG spec
//
SvgPath.prototype.transform = function(transformString) {
    if (!transformString.trim()) return this;
    this.__stack.push(transformParse(transformString));
    return this;
};
// Round coords with given decimal precition.
// 0 by default (to integers)
//
SvgPath.prototype.round = function(d) {
    var contourStartDeltaX = 0, contourStartDeltaY = 0, deltaX = 0, deltaY = 0, l;
    d = d || 0;
    this.__evaluateStack();
    this.segments.forEach(function(s) {
        var isRelative = s[0].toLowerCase() === s[0];
        switch(s[0]){
            case 'H':
            case 'h':
                if (isRelative) s[1] += deltaX;
                deltaX = s[1] - s[1].toFixed(d);
                s[1] = +s[1].toFixed(d);
                return;
            case 'V':
            case 'v':
                if (isRelative) s[1] += deltaY;
                deltaY = s[1] - s[1].toFixed(d);
                s[1] = +s[1].toFixed(d);
                return;
            case 'Z':
            case 'z':
                deltaX = contourStartDeltaX;
                deltaY = contourStartDeltaY;
                return;
            case 'M':
            case 'm':
                if (isRelative) {
                    s[1] += deltaX;
                    s[2] += deltaY;
                }
                deltaX = s[1] - s[1].toFixed(d);
                deltaY = s[2] - s[2].toFixed(d);
                contourStartDeltaX = deltaX;
                contourStartDeltaY = deltaY;
                s[1] = +s[1].toFixed(d);
                s[2] = +s[2].toFixed(d);
                return;
            case 'A':
            case 'a':
                // [cmd, rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
                if (isRelative) {
                    s[6] += deltaX;
                    s[7] += deltaY;
                }
                deltaX = s[6] - s[6].toFixed(d);
                deltaY = s[7] - s[7].toFixed(d);
                s[1] = +s[1].toFixed(d);
                s[2] = +s[2].toFixed(d);
                s[3] = +s[3].toFixed(d + 2); // better precision for rotation
                s[6] = +s[6].toFixed(d);
                s[7] = +s[7].toFixed(d);
                return;
            default:
                // a c l q s t
                l = s.length;
                if (isRelative) {
                    s[l - 2] += deltaX;
                    s[l - 1] += deltaY;
                }
                deltaX = s[l - 2] - s[l - 2].toFixed(d);
                deltaY = s[l - 1] - s[l - 1].toFixed(d);
                s.forEach(function(val, i) {
                    if (!i) return;
                    s[i] = +s[i].toFixed(d);
                });
                return;
        }
    });
    return this;
};
// Apply iterator function to all segments. If function returns result,
// current segment will be replaced to array of returned segments.
// If empty array is returned, current regment will be deleted.
//
SvgPath.prototype.iterate = function(iterator, keepLazyStack) {
    var segments = this.segments, replacements = {}, needReplace = false, lastX = 0, lastY = 0, countourStartX = 0, countourStartY = 0;
    var i, j, newSegments;
    if (!keepLazyStack) this.__evaluateStack();
    segments.forEach(function(s, index) {
        var res = iterator(s, index, lastX, lastY);
        if (Array.isArray(res)) {
            replacements[index] = res;
            needReplace = true;
        }
        var isRelative = s[0] === s[0].toLowerCase();
        // calculate absolute X and Y
        switch(s[0]){
            case 'm':
            case 'M':
                lastX = s[1] + (isRelative ? lastX : 0);
                lastY = s[2] + (isRelative ? lastY : 0);
                countourStartX = lastX;
                countourStartY = lastY;
                return;
            case 'h':
            case 'H':
                lastX = s[1] + (isRelative ? lastX : 0);
                return;
            case 'v':
            case 'V':
                lastY = s[1] + (isRelative ? lastY : 0);
                return;
            case 'z':
            case 'Z':
                // That make sence for multiple contours
                lastX = countourStartX;
                lastY = countourStartY;
                return;
            default:
                lastX = s[s.length - 2] + (isRelative ? lastX : 0);
                lastY = s[s.length - 1] + (isRelative ? lastY : 0);
        }
    });
    // Replace segments if iterator return results
    if (!needReplace) return this;
    newSegments = [];
    for(i = 0; i < segments.length; i++){
        if (typeof replacements[i] !== 'undefined') for(j = 0; j < replacements[i].length; j++)newSegments.push(replacements[i][j]);
        else newSegments.push(segments[i]);
    }
    this.segments = newSegments;
    return this;
};
// Converts segments from relative to absolute
//
SvgPath.prototype.abs = function() {
    this.iterate(function(s, index, x, y) {
        var name = s[0], nameUC = name.toUpperCase(), i;
        // Skip absolute commands
        if (name === nameUC) return;
        s[0] = nameUC;
        switch(name){
            case 'v':
                // v has shifted coords parity
                s[1] += y;
                return;
            case 'a':
                // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
                // touch x, y only
                s[6] += x;
                s[7] += y;
                return;
            default:
                for(i = 1; i < s.length; i++)s[i] += i % 2 ? x : y; // odd values are X, even - Y
        }
    }, true);
    return this;
};
// Converts segments from absolute to relative
//
SvgPath.prototype.rel = function() {
    this.iterate(function(s, index, x, y) {
        var name = s[0], nameLC = name.toLowerCase(), i;
        // Skip relative commands
        if (name === nameLC) return;
        // Don't touch the first M to avoid potential confusions.
        if (index === 0 && name === 'M') return;
        s[0] = nameLC;
        switch(name){
            case 'V':
                // V has shifted coords parity
                s[1] -= y;
                return;
            case 'A':
                // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
                // touch x, y only
                s[6] -= x;
                s[7] -= y;
                return;
            default:
                for(i = 1; i < s.length; i++)s[i] -= i % 2 ? x : y; // odd values are X, even - Y
        }
    }, true);
    return this;
};
// Converts arcs to cubic bézier curves
//
SvgPath.prototype.unarc = function() {
    this.iterate(function(s, index, x, y) {
        var new_segments, nextX, nextY, result = [], name = s[0];
        // Skip anything except arcs
        if (name !== 'A' && name !== 'a') return null;
        if (name === 'a') {
            // convert relative arc coordinates to absolute
            nextX = x + s[6];
            nextY = y + s[7];
        } else {
            nextX = s[6];
            nextY = s[7];
        }
        new_segments = a2c(x, y, nextX, nextY, s[4], s[5], s[1], s[2], s[3]);
        // Degenerated arcs can be ignored by renderer, but should not be dropped
        // to avoid collisions with `S A S` and so on. Replace with empty line.
        if (new_segments.length === 0) return [
            [
                s[0] === 'a' ? 'l' : 'L',
                s[6],
                s[7]
            ]
        ];
        new_segments.forEach(function(s) {
            result.push([
                'C',
                s[2],
                s[3],
                s[4],
                s[5],
                s[6],
                s[7]
            ]);
        });
        return result;
    });
    return this;
};
// Converts smooth curves (with missed control point) to generic curves
//
SvgPath.prototype.unshort = function() {
    var segments = this.segments;
    var prevControlX, prevControlY, prevSegment;
    var curControlX, curControlY;
    // TODO: add lazy evaluation flag when relative commands supported
    this.iterate(function(s, idx, x, y) {
        var name = s[0], nameUC = name.toUpperCase(), isRelative;
        // First command MUST be M|m, it's safe to skip.
        // Protect from access to [-1] for sure.
        if (!idx) return;
        if (nameUC === 'T') {
            isRelative = name === 't';
            prevSegment = segments[idx - 1];
            if (prevSegment[0] === 'Q') {
                prevControlX = prevSegment[1] - x;
                prevControlY = prevSegment[2] - y;
            } else if (prevSegment[0] === 'q') {
                prevControlX = prevSegment[1] - prevSegment[3];
                prevControlY = prevSegment[2] - prevSegment[4];
            } else {
                prevControlX = 0;
                prevControlY = 0;
            }
            curControlX = -prevControlX;
            curControlY = -prevControlY;
            if (!isRelative) {
                curControlX += x;
                curControlY += y;
            }
            segments[idx] = [
                isRelative ? 'q' : 'Q',
                curControlX,
                curControlY,
                s[1],
                s[2]
            ];
        } else if (nameUC === 'S') {
            isRelative = name === 's';
            prevSegment = segments[idx - 1];
            if (prevSegment[0] === 'C') {
                prevControlX = prevSegment[3] - x;
                prevControlY = prevSegment[4] - y;
            } else if (prevSegment[0] === 'c') {
                prevControlX = prevSegment[3] - prevSegment[5];
                prevControlY = prevSegment[4] - prevSegment[6];
            } else {
                prevControlX = 0;
                prevControlY = 0;
            }
            curControlX = -prevControlX;
            curControlY = -prevControlY;
            if (!isRelative) {
                curControlX += x;
                curControlY += y;
            }
            segments[idx] = [
                isRelative ? 'c' : 'C',
                curControlX,
                curControlY,
                s[1],
                s[2],
                s[3],
                s[4]
            ];
        }
    });
    return this;
};
module.exports = SvgPath;

},{"35145da737529f6":"esNpi","6bc4268e7f8669f5":"huCvk","cbb2e9fadca34df3":"1S797","587ea3e7d9f148e1":"4AekD","bd75b7d4caa4ad39":"glwPF"}],"esNpi":[function(require,module,exports,__globalThis) {
'use strict';
var paramCounts = {
    a: 7,
    c: 6,
    h: 1,
    l: 2,
    m: 2,
    r: 4,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    z: 0
};
var SPECIAL_SPACES = [
    0x1680,
    0x180E,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2007,
    0x2008,
    0x2009,
    0x200A,
    0x202F,
    0x205F,
    0x3000,
    0xFEFF
];
function isSpace(ch) {
    return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029 || // Line terminators
    // White spaces
    ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && SPECIAL_SPACES.indexOf(ch) >= 0;
}
function isCommand(code) {
    /*eslint-disable no-bitwise*/ switch(code | 0x20){
        case 0x6D /* m */ :
        case 0x7A /* z */ :
        case 0x6C /* l */ :
        case 0x68 /* h */ :
        case 0x76 /* v */ :
        case 0x63 /* c */ :
        case 0x73 /* s */ :
        case 0x71 /* q */ :
        case 0x74 /* t */ :
        case 0x61 /* a */ :
        case 0x72 /* r */ :
            return true;
    }
    return false;
}
function isArc(code) {
    return (code | 0x20) === 0x61;
}
function isDigit(code) {
    return code >= 48 && code <= 57; // 0..9
}
function isDigitStart(code) {
    return code >= 48 && code <= 57 || /* 0..9 */ code === 0x2B || /* + */ code === 0x2D || /* - */ code === 0x2E; /* . */ 
}
function State(path) {
    this.index = 0;
    this.path = path;
    this.max = path.length;
    this.result = [];
    this.param = 0.0;
    this.err = '';
    this.segmentStart = 0;
    this.data = [];
}
function skipSpaces(state) {
    while(state.index < state.max && isSpace(state.path.charCodeAt(state.index)))state.index++;
}
function scanFlag(state) {
    var ch = state.path.charCodeAt(state.index);
    if (ch === 0x30 /* 0 */ ) {
        state.param = 0;
        state.index++;
        return;
    }
    if (ch === 0x31 /* 1 */ ) {
        state.param = 1;
        state.index++;
        return;
    }
    state.err = 'SvgPath: arc flag can be 0 or 1 only (at pos ' + state.index + ')';
}
function scanParam(state) {
    var start = state.index, index = start, max = state.max, zeroFirst = false, hasCeiling = false, hasDecimal = false, hasDot = false, ch;
    if (index >= max) {
        state.err = 'SvgPath: missed param (at pos ' + index + ')';
        return;
    }
    ch = state.path.charCodeAt(index);
    if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
        index++;
        ch = index < max ? state.path.charCodeAt(index) : 0;
    }
    // This logic is shamelessly borrowed from Esprima
    // https://github.com/ariya/esprimas
    //
    if (!isDigit(ch) && ch !== 0x2E /* . */ ) {
        state.err = 'SvgPath: param should start with 0..9 or `.` (at pos ' + index + ')';
        return;
    }
    if (ch !== 0x2E /* . */ ) {
        zeroFirst = ch === 0x30 /* 0 */ ;
        index++;
        ch = index < max ? state.path.charCodeAt(index) : 0;
        if (zeroFirst && index < max) // decimal number starts with '0' such as '09' is illegal.
        {
            if (ch && isDigit(ch)) {
                state.err = 'SvgPath: numbers started with `0` such as `09` are illegal (at pos ' + start + ')';
                return;
            }
        }
        while(index < max && isDigit(state.path.charCodeAt(index))){
            index++;
            hasCeiling = true;
        }
        ch = index < max ? state.path.charCodeAt(index) : 0;
    }
    if (ch === 0x2E /* . */ ) {
        hasDot = true;
        index++;
        while(isDigit(state.path.charCodeAt(index))){
            index++;
            hasDecimal = true;
        }
        ch = index < max ? state.path.charCodeAt(index) : 0;
    }
    if (ch === 0x65 /* e */  || ch === 0x45 /* E */ ) {
        if (hasDot && !hasCeiling && !hasDecimal) {
            state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
            return;
        }
        index++;
        ch = index < max ? state.path.charCodeAt(index) : 0;
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) index++;
        if (index < max && isDigit(state.path.charCodeAt(index))) while(index < max && isDigit(state.path.charCodeAt(index)))index++;
        else {
            state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
            return;
        }
    }
    state.index = index;
    state.param = parseFloat(state.path.slice(start, index)) + 0.0;
}
function finalizeSegment(state) {
    var cmd, cmdLC;
    // Process duplicated commands (without comand name)
    // This logic is shamelessly borrowed from Raphael
    // https://github.com/DmitryBaranovskiy/raphael/
    //
    cmd = state.path[state.segmentStart];
    cmdLC = cmd.toLowerCase();
    var params = state.data;
    if (cmdLC === 'm' && params.length > 2) {
        state.result.push([
            cmd,
            params[0],
            params[1]
        ]);
        params = params.slice(2);
        cmdLC = 'l';
        cmd = cmd === 'm' ? 'l' : 'L';
    }
    if (cmdLC === 'r') state.result.push([
        cmd
    ].concat(params));
    else while(params.length >= paramCounts[cmdLC]){
        state.result.push([
            cmd
        ].concat(params.splice(0, paramCounts[cmdLC])));
        if (!paramCounts[cmdLC]) break;
    }
}
function scanSegment(state) {
    var max = state.max, cmdCode, is_arc, comma_found, need_params, i;
    state.segmentStart = state.index;
    cmdCode = state.path.charCodeAt(state.index);
    is_arc = isArc(cmdCode);
    if (!isCommand(cmdCode)) {
        state.err = 'SvgPath: bad command ' + state.path[state.index] + ' (at pos ' + state.index + ')';
        return;
    }
    need_params = paramCounts[state.path[state.index].toLowerCase()];
    state.index++;
    skipSpaces(state);
    state.data = [];
    if (!need_params) {
        // Z
        finalizeSegment(state);
        return;
    }
    comma_found = false;
    for(;;){
        for(i = need_params; i > 0; i--){
            if (is_arc && (i === 3 || i === 4)) scanFlag(state);
            else scanParam(state);
            if (state.err.length) {
                finalizeSegment(state);
                return;
            }
            state.data.push(state.param);
            skipSpaces(state);
            comma_found = false;
            if (state.index < max && state.path.charCodeAt(state.index) === 0x2C /* , */ ) {
                state.index++;
                skipSpaces(state);
                comma_found = true;
            }
        }
        // after ',' param is mandatory
        if (comma_found) continue;
        if (state.index >= state.max) break;
        // Stop on next segment
        if (!isDigitStart(state.path.charCodeAt(state.index))) break;
    }
    finalizeSegment(state);
}
/* Returns array of segments:
 *
 * [
 *   [ command, coord1, coord2, ... ]
 * ]
 */ module.exports = function pathParse(svgPath) {
    var state = new State(svgPath);
    var max = state.max;
    skipSpaces(state);
    while(state.index < max && !state.err.length)scanSegment(state);
    if (state.result.length) {
        if ('mM'.indexOf(state.result[0][0]) < 0) {
            state.err = 'SvgPath: string should start with `M` or `m`';
            state.result = [];
        } else state.result[0][0] = 'M';
    }
    return {
        err: state.err,
        segments: state.result
    };
};

},{}],"huCvk":[function(require,module,exports,__globalThis) {
'use strict';
var Matrix = require("8767346c3b03add6");
var operations = {
    matrix: true,
    scale: true,
    rotate: true,
    translate: true,
    skewX: true,
    skewY: true
};
var CMD_SPLIT_RE = /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/;
var PARAMS_SPLIT_RE = /[\s,]+/;
module.exports = function transformParse(transformString) {
    var matrix = new Matrix();
    var cmd, params;
    // Split value into ['', 'translate', '10 50', '', 'scale', '2', '', 'rotate',  '-45', '']
    transformString.split(CMD_SPLIT_RE).forEach(function(item) {
        // Skip empty elements
        if (!item.length) return;
        // remember operation
        if (typeof operations[item] !== 'undefined') {
            cmd = item;
            return;
        }
        // extract params & att operation to matrix
        params = item.split(PARAMS_SPLIT_RE).map(function(i) {
            return +i || 0;
        });
        // If params count is not correct - ignore command
        switch(cmd){
            case 'matrix':
                if (params.length === 6) matrix.matrix(params);
                return;
            case 'scale':
                if (params.length === 1) matrix.scale(params[0], params[0]);
                else if (params.length === 2) matrix.scale(params[0], params[1]);
                return;
            case 'rotate':
                if (params.length === 1) matrix.rotate(params[0], 0, 0);
                else if (params.length === 3) matrix.rotate(params[0], params[1], params[2]);
                return;
            case 'translate':
                if (params.length === 1) matrix.translate(params[0], 0);
                else if (params.length === 2) matrix.translate(params[0], params[1]);
                return;
            case 'skewX':
                if (params.length === 1) matrix.skewX(params[0]);
                return;
            case 'skewY':
                if (params.length === 1) matrix.skewY(params[0]);
                return;
        }
    });
    return matrix;
};

},{"8767346c3b03add6":"1S797"}],"1S797":[function(require,module,exports,__globalThis) {
'use strict';
// combine 2 matrixes
// m1, m2 - [a, b, c, d, e, g]
//
function combine(m1, m2) {
    return [
        m1[0] * m2[0] + m1[2] * m2[1],
        m1[1] * m2[0] + m1[3] * m2[1],
        m1[0] * m2[2] + m1[2] * m2[3],
        m1[1] * m2[2] + m1[3] * m2[3],
        m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
        m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
    ];
}
function Matrix() {
    if (!(this instanceof Matrix)) return new Matrix();
    this.queue = []; // list of matrixes to apply
    this.cache = null; // combined matrix cache
}
Matrix.prototype.matrix = function(m) {
    if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0) return this;
    this.cache = null;
    this.queue.push(m);
    return this;
};
Matrix.prototype.translate = function(tx, ty) {
    if (tx !== 0 || ty !== 0) {
        this.cache = null;
        this.queue.push([
            1,
            0,
            0,
            1,
            tx,
            ty
        ]);
    }
    return this;
};
Matrix.prototype.scale = function(sx, sy) {
    if (sx !== 1 || sy !== 1) {
        this.cache = null;
        this.queue.push([
            sx,
            0,
            0,
            sy,
            0,
            0
        ]);
    }
    return this;
};
Matrix.prototype.rotate = function(angle, rx, ry) {
    var rad, cos, sin;
    if (angle !== 0) {
        this.translate(rx, ry);
        rad = angle * Math.PI / 180;
        cos = Math.cos(rad);
        sin = Math.sin(rad);
        this.queue.push([
            cos,
            sin,
            -sin,
            cos,
            0,
            0
        ]);
        this.cache = null;
        this.translate(-rx, -ry);
    }
    return this;
};
Matrix.prototype.skewX = function(angle) {
    if (angle !== 0) {
        this.cache = null;
        this.queue.push([
            1,
            0,
            Math.tan(angle * Math.PI / 180),
            1,
            0,
            0
        ]);
    }
    return this;
};
Matrix.prototype.skewY = function(angle) {
    if (angle !== 0) {
        this.cache = null;
        this.queue.push([
            1,
            Math.tan(angle * Math.PI / 180),
            0,
            1,
            0,
            0
        ]);
    }
    return this;
};
// Flatten queue
//
Matrix.prototype.toArray = function() {
    if (this.cache) return this.cache;
    if (!this.queue.length) {
        this.cache = [
            1,
            0,
            0,
            1,
            0,
            0
        ];
        return this.cache;
    }
    this.cache = this.queue[0];
    if (this.queue.length === 1) return this.cache;
    for(var i = 1; i < this.queue.length; i++)this.cache = combine(this.cache, this.queue[i]);
    return this.cache;
};
// Apply list of matrixes to (x,y) point.
// If `isRelative` set, `translate` component of matrix will be skipped
//
Matrix.prototype.calc = function(x, y, isRelative) {
    var m;
    // Don't change point on empty transforms queue
    if (!this.queue.length) return [
        x,
        y
    ];
    // Calculate final matrix, if not exists
    //
    // NB. if you deside to apply transforms to point one-by-one,
    // they should be taken in reverse order
    if (!this.cache) this.cache = this.toArray();
    m = this.cache;
    // Apply matrix to point
    return [
        x * m[0] + y * m[2] + (isRelative ? 0 : m[4]),
        x * m[1] + y * m[3] + (isRelative ? 0 : m[5])
    ];
};
module.exports = Matrix;

},{}],"4AekD":[function(require,module,exports,__globalThis) {
// Convert an arc to a sequence of cubic bézier curves
//
'use strict';
var TAU = Math.PI * 2;
/* eslint-disable space-infix-ops */ // Calculate an angle between two unit vectors
//
// Since we measure angle between radii of circular arcs,
// we can use simplified math (without length normalization)
//
function unit_vector_angle(ux, uy, vx, vy) {
    var sign = ux * vy - uy * vx < 0 ? -1 : 1;
    var dot = ux * vx + uy * vy;
    // Add this to work with arbitrary vectors:
    // dot /= Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
    // rounding errors, e.g. -1.0000000000000002 can screw up this
    if (dot > 1.0) dot = 1.0;
    if (dot < -1) dot = -1;
    return sign * Math.acos(dot);
}
// Convert from endpoint to center parameterization,
// see http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
//
// Return [cx, cy, theta1, delta_theta]
//
function get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi) {
    // Step 1.
    //
    // Moving an ellipse so origin will be the middlepoint between our two
    // points. After that, rotate it to line up ellipse axes with coordinate
    // axes.
    //
    var x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
    var y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;
    var rx_sq = rx * rx;
    var ry_sq = ry * ry;
    var x1p_sq = x1p * x1p;
    var y1p_sq = y1p * y1p;
    // Step 2.
    //
    // Compute coordinates of the centre of this ellipse (cx', cy')
    // in the new coordinate system.
    //
    var radicant = rx_sq * ry_sq - rx_sq * y1p_sq - ry_sq * x1p_sq;
    if (radicant < 0) // due to rounding errors it might be e.g. -1.3877787807814457e-17
    radicant = 0;
    radicant /= rx_sq * y1p_sq + ry_sq * x1p_sq;
    radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);
    var cxp = radicant * rx / ry * y1p;
    var cyp = radicant * -ry / rx * x1p;
    // Step 3.
    //
    // Transform back to get centre coordinates (cx, cy) in the original
    // coordinate system.
    //
    var cx = cos_phi * cxp - sin_phi * cyp + (x1 + x2) / 2;
    var cy = sin_phi * cxp + cos_phi * cyp + (y1 + y2) / 2;
    // Step 4.
    //
    // Compute angles (theta1, delta_theta).
    //
    var v1x = (x1p - cxp) / rx;
    var v1y = (y1p - cyp) / ry;
    var v2x = (-x1p - cxp) / rx;
    var v2y = (-y1p - cyp) / ry;
    var theta1 = unit_vector_angle(1, 0, v1x, v1y);
    var delta_theta = unit_vector_angle(v1x, v1y, v2x, v2y);
    if (fs === 0 && delta_theta > 0) delta_theta -= TAU;
    if (fs === 1 && delta_theta < 0) delta_theta += TAU;
    return [
        cx,
        cy,
        theta1,
        delta_theta
    ];
}
//
// Approximate one unit arc segment with bézier curves,
// see http://math.stackexchange.com/questions/873224
//
function approximate_unit_arc(theta1, delta_theta) {
    var alpha = 4 / 3 * Math.tan(delta_theta / 4);
    var x1 = Math.cos(theta1);
    var y1 = Math.sin(theta1);
    var x2 = Math.cos(theta1 + delta_theta);
    var y2 = Math.sin(theta1 + delta_theta);
    return [
        x1,
        y1,
        x1 - y1 * alpha,
        y1 + x1 * alpha,
        x2 + y2 * alpha,
        y2 - x2 * alpha,
        x2,
        y2
    ];
}
module.exports = function a2c(x1, y1, x2, y2, fa, fs, rx, ry, phi) {
    var sin_phi = Math.sin(phi * TAU / 360);
    var cos_phi = Math.cos(phi * TAU / 360);
    // Make sure radii are valid
    //
    var x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
    var y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;
    if (x1p === 0 && y1p === 0) // we're asked to draw line to itself
    return [];
    if (rx === 0 || ry === 0) // one of the radii is zero
    return [];
    // Compensate out-of-range radii
    //
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    var lambda = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
    if (lambda > 1) {
        rx *= Math.sqrt(lambda);
        ry *= Math.sqrt(lambda);
    }
    // Get center parameters (cx, cy, theta1, delta_theta)
    //
    var cc = get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi);
    var result = [];
    var theta1 = cc[2];
    var delta_theta = cc[3];
    // Split an arc to multiple segments, so each segment
    // will be less than τ/4 (= 90°)
    //
    var segments = Math.max(Math.ceil(Math.abs(delta_theta) / (TAU / 4)), 1);
    delta_theta /= segments;
    for(var i = 0; i < segments; i++){
        result.push(approximate_unit_arc(theta1, delta_theta));
        theta1 += delta_theta;
    }
    // We have a bezier approximation of a unit circle,
    // now need to transform back to the original ellipse
    //
    return result.map(function(curve) {
        for(var i = 0; i < curve.length; i += 2){
            var x = curve[i + 0];
            var y = curve[i + 1];
            // scale
            x *= rx;
            y *= ry;
            // rotate
            var xp = cos_phi * x - sin_phi * y;
            var yp = sin_phi * x + cos_phi * y;
            // translate
            curve[i + 0] = xp + cc[0];
            curve[i + 1] = yp + cc[1];
        }
        return curve;
    });
};

},{}],"glwPF":[function(require,module,exports,__globalThis) {
'use strict';
/* eslint-disable space-infix-ops */ // The precision used to consider an ellipse as a circle
//
var epsilon = 0.0000000001;
// To convert degree in radians
//
var torad = Math.PI / 180;
// Class constructor :
//  an ellipse centred at 0 with radii rx,ry and x - axis - angle ax.
//
function Ellipse(rx, ry, ax) {
    if (!(this instanceof Ellipse)) return new Ellipse(rx, ry, ax);
    this.rx = rx;
    this.ry = ry;
    this.ax = ax;
}
// Apply a linear transform m to the ellipse
// m is an array representing a matrix :
//    -         -
//   | m[0] m[2] |
//   | m[1] m[3] |
//    -         -
//
Ellipse.prototype.transform = function(m) {
    // We consider the current ellipse as image of the unit circle
    // by first scale(rx,ry) and then rotate(ax) ...
    // So we apply ma =  m x rotate(ax) x scale(rx,ry) to the unit circle.
    var c = Math.cos(this.ax * torad), s = Math.sin(this.ax * torad);
    var ma = [
        this.rx * (m[0] * c + m[2] * s),
        this.rx * (m[1] * c + m[3] * s),
        this.ry * (-m[0] * s + m[2] * c),
        this.ry * (-m[1] * s + m[3] * c)
    ];
    // ma * transpose(ma) = [ J L ]
    //                      [ L K ]
    // L is calculated later (if the image is not a circle)
    var J = ma[0] * ma[0] + ma[2] * ma[2], K = ma[1] * ma[1] + ma[3] * ma[3];
    // the discriminant of the characteristic polynomial of ma * transpose(ma)
    var D = ((ma[0] - ma[3]) * (ma[0] - ma[3]) + (ma[2] + ma[1]) * (ma[2] + ma[1])) * ((ma[0] + ma[3]) * (ma[0] + ma[3]) + (ma[2] - ma[1]) * (ma[2] - ma[1]));
    // the "mean eigenvalue"
    var JK = (J + K) / 2;
    // check if the image is (almost) a circle
    if (D < epsilon * JK) {
        // if it is
        this.rx = this.ry = Math.sqrt(JK);
        this.ax = 0;
        return this;
    }
    // if it is not a circle
    var L = ma[0] * ma[1] + ma[2] * ma[3];
    D = Math.sqrt(D);
    // {l1,l2} = the two eigen values of ma * transpose(ma)
    var l1 = JK + D / 2, l2 = JK - D / 2;
    // the x - axis - rotation angle is the argument of the l1 - eigenvector
    /*eslint-disable indent*/ this.ax = Math.abs(L) < epsilon && Math.abs(l1 - K) < epsilon ? 90 : Math.atan(Math.abs(L) > Math.abs(l1 - K) ? (l1 - J) / L : L / (l1 - K)) * 180 / Math.PI;
    /*eslint-enable indent*/ // if ax > 0 => rx = sqrt(l1), ry = sqrt(l2), else exchange axes and ax += 90
    if (this.ax >= 0) {
        // if ax in [0,90]
        this.rx = Math.sqrt(l1);
        this.ry = Math.sqrt(l2);
    } else {
        // if ax in ]-90,0[ => exchange axes
        this.ax += 90;
        this.rx = Math.sqrt(l2);
        this.ry = Math.sqrt(l1);
    }
    return this;
};
// Check if the ellipse is (almost) degenerate, i.e. rx = 0 or ry = 0
//
Ellipse.prototype.isDegenerate = function() {
    return this.rx < epsilon * this.ry || this.ry < epsilon * this.rx;
};
module.exports = Ellipse;

},{}],"1WQva":[function(require,module,exports,__globalThis) {
// Calculate the specificity for a selector by dividing it into simple selectors and counting them
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calculate", ()=>calculate);
parcelHelpers.export(exports, "compare", ()=>compare);
var calculate = function(input) {
    var selectors, selector, i, len, results = [];
    // Separate input by commas
    selectors = input.split(',');
    for(i = 0, len = selectors.length; i < len; i += 1){
        selector = selectors[i];
        if (selector.length > 0) results.push(calculateSingle(selector));
    }
    return results;
};
/**
 * Calculates the specificity of CSS selectors
 * http://www.w3.org/TR/css3-selectors/#specificity
 *
 * Returns an object with the following properties:
 *  - selector: the input
 *  - specificity: e.g. 0,1,0,0
 *  - parts: array with details about each part of the selector that counts towards the specificity
 *  - specificityArray: e.g. [0, 1, 0, 0]
 */ var calculateSingle = function(input) {
    var selector = input, findMatch, typeCount = {
        'a': 0,
        'b': 0,
        'c': 0
    }, parts = [], // The following regular expressions assume that selectors matching the preceding regular expressions have been removed
    attributeRegex = /(\[[^\]]+\])/g, idRegex = /(#[^\#\s\+>~\.\[:\)]+)/g, classRegex = /(\.[^\s\+>~\.\[:\)]+)/g, pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, // A regex for pseudo classes with brackets - :nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-type(), :lang()
    // The negation psuedo class (:not) is filtered out because specificity is calculated on its argument
    // :global and :local are filtered out - they look like psuedo classes but are an identifier for CSS Modules
    pseudoClassWithBracketsRegex = /(:(?!not|global|local)[\w-]+\([^\)]*\))/gi, // A regex for other pseudo classes, which don't have brackets
    pseudoClassRegex = /(:(?!not|global|local)[^\s\+>~\.\[:]+)/g, elementRegex = /([^\s\+>~\.\[:]+)/g;
    // Find matches for a regular expression in a string and push their details to parts
    // Type is "a" for IDs, "b" for classes, attributes and pseudo-classes and "c" for elements and pseudo-elements
    findMatch = function(regex, type) {
        var matches, i, len, match, index, length;
        if (regex.test(selector)) {
            matches = selector.match(regex);
            for(i = 0, len = matches.length; i < len; i += 1){
                typeCount[type] += 1;
                match = matches[i];
                index = selector.indexOf(match);
                length = match.length;
                parts.push({
                    selector: input.substr(index, length),
                    type: type,
                    index: index,
                    length: length
                });
                // Replace this simple selector with whitespace so it won't be counted in further simple selectors
                selector = selector.replace(match, Array(length + 1).join(' '));
            }
        }
    };
    // Replace escaped characters with plain text, using the "A" character
    // https://www.w3.org/TR/CSS21/syndata.html#characters
    (function() {
        var replaceWithPlainText = function(regex) {
            var matches, i, len, match;
            if (regex.test(selector)) {
                matches = selector.match(regex);
                for(i = 0, len = matches.length; i < len; i += 1){
                    match = matches[i];
                    selector = selector.replace(match, Array(match.length + 1).join('A'));
                }
            }
        }, // Matches a backslash followed by six hexadecimal digits followed by an optional single whitespace character
        escapeHexadecimalRegex = /\\[0-9A-Fa-f]{6}\s?/g, // Matches a backslash followed by fewer than six hexadecimal digits followed by a mandatory single whitespace character
        escapeHexadecimalRegex2 = /\\[0-9A-Fa-f]{1,5}\s/g, // Matches a backslash followed by any character
        escapeSpecialCharacter = /\\./g;
        replaceWithPlainText(escapeHexadecimalRegex);
        replaceWithPlainText(escapeHexadecimalRegex2);
        replaceWithPlainText(escapeSpecialCharacter);
    })();
    // Remove anything after a left brace in case a user has pasted in a rule, not just a selector
    (function() {
        var regex = /{[^]*/gm, matches, i, len, match;
        if (regex.test(selector)) {
            matches = selector.match(regex);
            for(i = 0, len = matches.length; i < len; i += 1){
                match = matches[i];
                selector = selector.replace(match, Array(match.length + 1).join(' '));
            }
        }
    })();
    // Add attribute selectors to parts collection (type b)
    findMatch(attributeRegex, 'b');
    // Add ID selectors to parts collection (type a)
    findMatch(idRegex, 'a');
    // Add class selectors to parts collection (type b)
    findMatch(classRegex, 'b');
    // Add pseudo-element selectors to parts collection (type c)
    findMatch(pseudoElementRegex, 'c');
    // Add pseudo-class selectors to parts collection (type b)
    findMatch(pseudoClassWithBracketsRegex, 'b');
    findMatch(pseudoClassRegex, 'b');
    // Remove universal selector and separator characters
    selector = selector.replace(/[\*\s\+>~]/g, ' ');
    // Remove any stray dots or hashes which aren't attached to words
    // These may be present if the user is live-editing this selector
    selector = selector.replace(/[#\.]/g, ' ');
    // Remove the negation psuedo-class (:not) but leave its argument because specificity is calculated on its argument
    // Remove non-standard :local and :global CSS Module identifiers because they do not effect the specificity
    selector = selector.replace(/:not/g, '    ');
    selector = selector.replace(/:local/g, '      ');
    selector = selector.replace(/:global/g, '       ');
    selector = selector.replace(/[\(\)]/g, ' ');
    // The only things left should be element selectors (type c)
    findMatch(elementRegex, 'c');
    // Order the parts in the order they appear in the original selector
    // This is neater for external apps to deal with
    parts.sort(function(a, b) {
        return a.index - b.index;
    });
    return {
        selector: input,
        specificity: '0,' + typeCount.a.toString() + ',' + typeCount.b.toString() + ',' + typeCount.c.toString(),
        specificityArray: [
            0,
            typeCount.a,
            typeCount.b,
            typeCount.c
        ],
        parts: parts
    };
};
/**
 * Compares two CSS selectors for specificity
 * Alternatively you can replace one of the CSS selectors with a specificity array
 *
 *  - it returns -1 if a has a lower specificity than b
 *  - it returns 1 if a has a higher specificity than b
 *  - it returns 0 if a has the same specificity than b
 */ var compare = function(a, b) {
    var aSpecificity, bSpecificity, i;
    if (typeof a === 'string') {
        if (a.indexOf(',') !== -1) throw 'Invalid CSS selector';
        else aSpecificity = calculateSingle(a)['specificityArray'];
    } else if (Array.isArray(a)) {
        if (a.filter(function(e) {
            return typeof e === 'number';
        }).length !== 4) throw 'Invalid specificity array';
        else aSpecificity = a;
    } else throw 'Invalid CSS selector or specificity array';
    if (typeof b === 'string') {
        if (b.indexOf(',') !== -1) throw 'Invalid CSS selector';
        else bSpecificity = calculateSingle(b)['specificityArray'];
    } else if (Array.isArray(b)) {
        if (b.filter(function(e) {
            return typeof e === 'number';
        }).length !== 4) throw 'Invalid specificity array';
        else bSpecificity = b;
    } else throw 'Invalid CSS selector or specificity array';
    for(i = 0; i < 4; i += 1){
        if (aSpecificity[i] < bSpecificity[i]) return -1;
        else if (aSpecificity[i] > bSpecificity[i]) return 1;
    }
    return 0;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8JZvL"}]},["1nwOm"], null, "parcelRequire55b0", {})

//# sourceMappingURL=svg2pdf.es.min.cef8bd19.js.map
