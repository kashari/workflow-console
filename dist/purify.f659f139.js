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
})({"e7zem":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "fa6dae23f659f139";
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

},{}],"1IHUz":[function(require,module,exports,__globalThis) {
/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
        return n;
    }
    function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
            var e, n, i, u, a = [], f = true, o = false;
            try {
                if (i = (t = t.call(r)).next, 0 === l) ;
                else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
            } catch (r) {
                o = true, n = r;
            } finally{
                try {
                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                } finally{
                    if (o) throw n;
                }
            }
            return a;
        }
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = ({}).toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    const entries = Object.entries, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    let freeze = Object.freeze, seal = Object.seal, create = Object.create; // eslint-disable-line import/no-mutable-exports
    let _ref = typeof Reflect !== 'undefined' && Reflect, apply = _ref.apply, construct = _ref.construct;
    if (!freeze) freeze = function freeze(x) {
        return x;
    };
    if (!seal) seal = function seal(x) {
        return x;
    };
    if (!apply) apply = function apply(func, thisArg) {
        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++)args[_key - 2] = arguments[_key];
        return func.apply(thisArg, args);
    };
    if (!construct) construct = function construct(Func) {
        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)args[_key2 - 1] = arguments[_key2];
        return new Func(...args);
    };
    const arrayForEach = unapply(Array.prototype.forEach);
    const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
    const arrayPop = unapply(Array.prototype.pop);
    const arrayPush = unapply(Array.prototype.push);
    const arraySplice = unapply(Array.prototype.splice);
    const arrayIsArray = Array.isArray;
    const stringToLowerCase = unapply(String.prototype.toLowerCase);
    const stringToString = unapply(String.prototype.toString);
    const stringMatch = unapply(String.prototype.match);
    const stringReplace = unapply(String.prototype.replace);
    const stringIndexOf = unapply(String.prototype.indexOf);
    const stringTrim = unapply(String.prototype.trim);
    const numberToString = unapply(Number.prototype.toString);
    const booleanToString = unapply(Boolean.prototype.toString);
    const bigintToString = typeof BigInt === 'undefined' ? null : unapply(BigInt.prototype.toString);
    const symbolToString = typeof Symbol === 'undefined' ? null : unapply(Symbol.prototype.toString);
    const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
    const objectToString = unapply(Object.prototype.toString);
    const regExpTest = unapply(RegExp.prototype.test);
    const typeErrorCreate = unconstruct(TypeError);
    /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param func - The function to be wrapped and called.
   * @returns A new function that calls the given function with a specified thisArg and arguments.
   */ function unapply(func) {
        return function(thisArg) {
            if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
            for(var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)args[_key3 - 1] = arguments[_key3];
            return apply(func, thisArg, args);
        };
    }
    /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param func - The constructor function to be wrapped and called.
   * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
   */ function unconstruct(Func) {
        return function() {
            for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)args[_key4] = arguments[_key4];
            return construct(Func, args);
        };
    }
    /**
   * Add properties to a lookup table
   *
   * @param set - The set to which elements will be added.
   * @param array - The array containing elements to be added to the set.
   * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns The modified set with added elements.
   */ function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null);
        if (!arrayIsArray(array)) return set;
        let l = array.length;
        while(l--){
            let element = array[l];
            if (typeof element === 'string') {
                const lcElement = transformCaseFunc(element);
                if (lcElement !== element) {
                    // Config presets (e.g. tags.js, attrs.js) are immutable.
                    if (!isFrozen(array)) array[l] = lcElement;
                    element = lcElement;
                }
            }
            set[element] = true;
        }
        return set;
    }
    /**
   * Clean up an array to harden against CSPP
   *
   * @param array - The array to be cleaned.
   * @returns The cleaned version of the array
   */ function cleanArray(array) {
        for(let index = 0; index < array.length; index++){
            const isPropertyExist = objectHasOwnProperty(array, index);
            if (!isPropertyExist) array[index] = null;
        }
        return array;
    }
    /**
   * Shallow clone an object
   *
   * @param object - The object to be cloned.
   * @returns A new object that copies the original.
   */ function clone(object) {
        const newObject = create(null);
        for (const _ref2 of entries(object)){
            var _ref3 = _slicedToArray(_ref2, 2);
            const property = _ref3[0];
            const value = _ref3[1];
            const isPropertyExist = objectHasOwnProperty(object, property);
            if (isPropertyExist) {
                if (arrayIsArray(value)) newObject[property] = cleanArray(value);
                else if (value && typeof value === 'object' && value.constructor === Object) newObject[property] = clone(value);
                else newObject[property] = value;
            }
        }
        return newObject;
    }
    /**
   * Convert non-node values into strings without depending on direct property access.
   *
   * @param value - The value to stringify.
   * @returns A string representation of the provided value.
   */ function stringifyValue(value) {
        switch(typeof value){
            case 'string':
                return value;
            case 'number':
                return numberToString(value);
            case 'boolean':
                return booleanToString(value);
            case 'bigint':
                return bigintToString ? bigintToString(value) : '0';
            case 'symbol':
                return symbolToString ? symbolToString(value) : 'Symbol()';
            case 'undefined':
                return objectToString(value);
            case 'function':
            case 'object':
                {
                    if (value === null) return objectToString(value);
                    const valueAsRecord = value;
                    const valueToString = lookupGetter(valueAsRecord, 'toString');
                    if (typeof valueToString === 'function') {
                        const stringified = valueToString(valueAsRecord);
                        return typeof stringified === 'string' ? stringified : objectToString(stringified);
                    }
                    return objectToString(value);
                }
            default:
                return objectToString(value);
        }
    }
    /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param object - The object to look up the getter function in its prototype chain.
   * @param prop - The property name for which to find the getter function.
   * @returns The getter function found in the prototype chain or a fallback function.
   */ function lookupGetter(object, prop) {
        while(object !== null){
            const desc = getOwnPropertyDescriptor(object, prop);
            if (desc) {
                if (desc.get) return unapply(desc.get);
                if (typeof desc.value === 'function') return unapply(desc.value);
            }
            object = getPrototypeOf(object);
        }
        function fallbackValue() {
            return null;
        }
        return fallbackValue;
    }
    function isRegex(value) {
        try {
            regExpTest(value, '');
            return true;
        } catch (_unused) {
            return false;
        }
    }
    const html$1 = freeze([
        'a',
        'abbr',
        'acronym',
        'address',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'content',
        'data',
        'datalist',
        'dd',
        'decorator',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'element',
        'em',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'map',
        'mark',
        'marquee',
        'menu',
        'menuitem',
        'meter',
        'nav',
        'nobr',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'picture',
        'pre',
        'progress',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'search',
        'section',
        'select',
        'shadow',
        'slot',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr'
    ]);
    const svg$1 = freeze([
        'svg',
        'a',
        'altglyph',
        'altglyphdef',
        'altglyphitem',
        'animatecolor',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'enterkeyhint',
        'exportparts',
        'filter',
        'font',
        'g',
        'glyph',
        'glyphref',
        'hkern',
        'image',
        'inputmode',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'part',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'stop',
        'style',
        'switch',
        'symbol',
        'text',
        'textpath',
        'title',
        'tref',
        'tspan',
        'view',
        'vkern'
    ]);
    const svgFilters = freeze([
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence'
    ]);
    // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.
    const svgDisallowed = freeze([
        'animate',
        'color-profile',
        'cursor',
        'discard',
        'font-face',
        'font-face-format',
        'font-face-name',
        'font-face-src',
        'font-face-uri',
        'foreignobject',
        'hatch',
        'hatchpath',
        'mesh',
        'meshgradient',
        'meshpatch',
        'meshrow',
        'missing-glyph',
        'script',
        'set',
        'solidcolor',
        'unknown',
        'use'
    ]);
    const mathMl$1 = freeze([
        'math',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'mprescripts'
    ]);
    // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.
    const mathMlDisallowed = freeze([
        'maction',
        'maligngroup',
        'malignmark',
        'mlongdiv',
        'mscarries',
        'mscarry',
        'msgroup',
        'mstack',
        'msline',
        'msrow',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ]);
    const text = freeze([
        '#text'
    ]);
    const html = freeze([
        'accept',
        'action',
        'align',
        'alt',
        'autocapitalize',
        'autocomplete',
        'autopictureinpicture',
        'autoplay',
        'background',
        'bgcolor',
        'border',
        'capture',
        'cellpadding',
        'cellspacing',
        'checked',
        'cite',
        'class',
        'clear',
        'color',
        'cols',
        'colspan',
        'command',
        'commandfor',
        'controls',
        'controlslist',
        'coords',
        'crossorigin',
        'datetime',
        'decoding',
        'default',
        'dir',
        'disabled',
        'disablepictureinpicture',
        'disableremoteplayback',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'exportparts',
        'face',
        'for',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'id',
        'inert',
        'inputmode',
        'integrity',
        'ismap',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'loop',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'multiple',
        'muted',
        'name',
        'nonce',
        'noshade',
        'novalidate',
        'nowrap',
        'open',
        'optimum',
        'part',
        'pattern',
        'placeholder',
        'playsinline',
        'popover',
        'popovertarget',
        'popovertargetaction',
        'poster',
        'preload',
        'pubdate',
        'radiogroup',
        'readonly',
        'rel',
        'required',
        'rev',
        'reversed',
        'role',
        'rows',
        'rowspan',
        'spellcheck',
        'scope',
        'selected',
        'shape',
        'size',
        'sizes',
        'slot',
        'span',
        'srclang',
        'start',
        'src',
        'srcset',
        'step',
        'style',
        'summary',
        'tabindex',
        'title',
        'translate',
        'type',
        'usemap',
        'valign',
        'value',
        'width',
        'wrap',
        'xmlns'
    ]);
    const svg = freeze([
        'accent-height',
        'accumulate',
        'additive',
        'alignment-baseline',
        'amplitude',
        'ascent',
        'attributename',
        'attributetype',
        'azimuth',
        'basefrequency',
        'baseline-shift',
        'begin',
        'bias',
        'by',
        'class',
        'clip',
        'clippathunits',
        'clip-path',
        'clip-rule',
        'color',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'cx',
        'cy',
        'd',
        'dx',
        'dy',
        'diffuseconstant',
        'direction',
        'display',
        'divisor',
        'dur',
        'edgemode',
        'elevation',
        'end',
        'exponent',
        'fill',
        'fill-opacity',
        'fill-rule',
        'filter',
        'filterunits',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'fx',
        'fy',
        'g1',
        'g2',
        'glyph-name',
        'glyphref',
        'gradientunits',
        'gradienttransform',
        'height',
        'href',
        'id',
        'image-rendering',
        'in',
        'in2',
        'intercept',
        'k',
        'k1',
        'k2',
        'k3',
        'k4',
        'kerning',
        'keypoints',
        'keysplines',
        'keytimes',
        'lang',
        'lengthadjust',
        'letter-spacing',
        'kernelmatrix',
        'kernelunitlength',
        'lighting-color',
        'local',
        'marker-end',
        'marker-mid',
        'marker-start',
        'markerheight',
        'markerunits',
        'markerwidth',
        'maskcontentunits',
        'maskunits',
        'max',
        'mask',
        'mask-type',
        'media',
        'method',
        'mode',
        'min',
        'name',
        'numoctaves',
        'offset',
        'operator',
        'opacity',
        'order',
        'orient',
        'orientation',
        'origin',
        'overflow',
        'paint-order',
        'path',
        'pathlength',
        'patterncontentunits',
        'patterntransform',
        'patternunits',
        'points',
        'preservealpha',
        'preserveaspectratio',
        'primitiveunits',
        'r',
        'rx',
        'ry',
        'radius',
        'refx',
        'refy',
        'repeatcount',
        'repeatdur',
        'restart',
        'result',
        'rotate',
        'scale',
        'seed',
        'shape-rendering',
        'slope',
        'specularconstant',
        'specularexponent',
        'spreadmethod',
        'startoffset',
        'stddeviation',
        'stitchtiles',
        'stop-color',
        'stop-opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke',
        'stroke-width',
        'style',
        'surfacescale',
        'systemlanguage',
        'tabindex',
        'tablevalues',
        'targetx',
        'targety',
        'transform',
        'transform-origin',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'textlength',
        'type',
        'u1',
        'u2',
        'unicode',
        'values',
        'viewbox',
        'visibility',
        'version',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'width',
        'word-spacing',
        'wrap',
        'writing-mode',
        'xchannelselector',
        'ychannelselector',
        'x',
        'x1',
        'x2',
        'xmlns',
        'y',
        'y1',
        'y2',
        'z',
        'zoomandpan'
    ]);
    const mathMl = freeze([
        'accent',
        'accentunder',
        'align',
        'bevelled',
        'close',
        'columnalign',
        'columnlines',
        'columnspacing',
        'columnspan',
        'denomalign',
        'depth',
        'dir',
        'display',
        'displaystyle',
        'encoding',
        'fence',
        'frame',
        'height',
        'href',
        'id',
        'largeop',
        'length',
        'linethickness',
        'lquote',
        'lspace',
        'mathbackground',
        'mathcolor',
        'mathsize',
        'mathvariant',
        'maxsize',
        'minsize',
        'movablelimits',
        'notation',
        'numalign',
        'open',
        'rowalign',
        'rowlines',
        'rowspacing',
        'rowspan',
        'rspace',
        'rquote',
        'scriptlevel',
        'scriptminsize',
        'scriptsizemultiplier',
        'selection',
        'separator',
        'separators',
        'stretchy',
        'subscriptshift',
        'supscriptshift',
        'symmetric',
        'voffset',
        'width',
        'xmlns'
    ]);
    const xml = freeze([
        'xlink:href',
        'xml:id',
        'xlink:title',
        'xml:space',
        'xmlns:xlink'
    ]);
    const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
    const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
    const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
    const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
    const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
    const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    );
    const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    );
    const DOCTYPE_NAME = seal(/^html$/i);
    const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
    // Markup-significant character probes used by _sanitizeElements.
    // Shared module-level instances are safe despite the sticky /g flags:
    // unapply() resets lastIndex for RegExp receivers before every call.
    const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
    const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
    const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
    const SELF_CLOSING_TAG = seal(/\/>/i);
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        // Deprecated
        entityNode: 6,
        // Deprecated
        processingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12 // Deprecated
    };
    const getGlobal = function getGlobal() {
        return typeof window === 'undefined' ? null : window;
    };
    /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param trustedTypes The policy factory.
   * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */ const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') return null;
        // Allow the callers to control the unique policy name
        // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
        // Policy creation with duplicate names throws in Trusted Types.
        let suffix = null;
        const ATTR_NAME = 'data-tt-policy-suffix';
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
        const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
        try {
            return trustedTypes.createPolicy(policyName, {
                createHTML (html) {
                    return html;
                },
                createScriptURL (scriptUrl) {
                    return scriptUrl;
                }
            });
        } catch (_) {
            // Policy creation failed (most likely another DOMPurify script has
            // already run). Skip creating the policy, as this will only cause errors
            // if TT are enforced.
            console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
            return null;
        }
    };
    const _createHooksMap = function _createHooksMap() {
        return {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
        };
    };
    /**
   * Resolve a set-valued configuration option: a fresh set built from
   * cfg[key] when it is an own array property (seeded with a clone of
   * options.base when given, case-normalized via options.transform),
   * the fallback set otherwise.
   *
   * @param cfg the cloned, prototype-free configuration object
   * @param key the configuration property to read
   * @param fallback the set to use when the option is absent or not an array
   * @param options transform and optional base set to merge into
   * @returns the resolved set
   */ const _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
        return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
    };
    function createDOMPurify() {
        let window1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
        const DOMPurify = (root)=>createDOMPurify(root);
        DOMPurify.version = '3.4.11';
        DOMPurify.removed = [];
        if (!window1 || !window1.document || window1.document.nodeType !== NODE_TYPE.document || !window1.Element) {
            // Not running in a browser, provide a factory function
            // so that you can pass your own Window
            DOMPurify.isSupported = false;
            return DOMPurify;
        }
        let document = window1.document;
        const originalDocument = document;
        const currentScript = originalDocument.currentScript;
        window1.DocumentFragment;
        const HTMLTemplateElement = window1.HTMLTemplateElement, Node = window1.Node, Element = window1.Element, NodeFilter = window1.NodeFilter, _window$NamedNodeMap = window1.NamedNodeMap;
        _window$NamedNodeMap === void 0 ? window1.NamedNodeMap || window1.MozNamedAttrMap : _window$NamedNodeMap;
        window1.HTMLFormElement;
        const DOMParser = window1.DOMParser, trustedTypes = window1.trustedTypes;
        const ElementPrototype = Element.prototype;
        const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
        const remove = lookupGetter(ElementPrototype, 'remove');
        const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
        const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
        const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
        const getShadowRoot = lookupGetter(ElementPrototype, 'shadowRoot');
        const getAttributes = lookupGetter(ElementPrototype, 'attributes');
        const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeType') : null;
        const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeName') : null;
        // As per issue #47, the web-components registry is inherited by a
        // new document created via createHTMLDocument. As per the spec
        // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
        // a new empty registry is used when creating a template contents owner
        // document, so we use that as our parent document to ensure nothing
        // is inherited.
        if (typeof HTMLTemplateElement === 'function') {
            const template = document.createElement('template');
            if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
        }
        let trustedTypesPolicy;
        let emptyHTML = '';
        // The instance's own internal Trusted Types policy. Unlike a caller-supplied
        // `TRUSTED_TYPES_POLICY`, this is created at most once — Trusted Types throws
        // on duplicate policy names — and is the only policy allowed to persist
        // across configurations and survive `clearConfig()`.
        let defaultTrustedTypesPolicy;
        let defaultTrustedTypesPolicyResolved = false;
        // Tracks whether we are already inside a call to the configured Trusted Types
        // policy (`createHTML` or `createScriptURL`). If a supplied policy callback
        // itself calls `DOMPurify.sanitize` (the cause of #1422), `sanitize` would
        // re-enter the policy and recurse until the stack overflows. We detect that
        // re-entry and throw a clear, actionable error instead. The guard is shared
        // across both callbacks, because either one re-entering `sanitize` triggers
        // the same unbounded recursion.
        let IN_TRUSTED_TYPES_POLICY = 0;
        const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
            if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
        };
        const _createTrustedHTML = function _createTrustedHTML(html) {
            _assertNotInTrustedTypesPolicy();
            IN_TRUSTED_TYPES_POLICY++;
            try {
                return trustedTypesPolicy.createHTML(html);
            } finally{
                IN_TRUSTED_TYPES_POLICY--;
            }
        };
        const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
            _assertNotInTrustedTypesPolicy();
            IN_TRUSTED_TYPES_POLICY++;
            try {
                return trustedTypesPolicy.createScriptURL(scriptUrl);
            } finally{
                IN_TRUSTED_TYPES_POLICY--;
            }
        };
        // Lazily resolve (and cache) the instance's internal default policy.
        // Resolution is attempted at most once: a successful `createPolicy` cannot be
        // repeated (Trusted Types throws on duplicate names), and a failed or
        // unsupported attempt must not be retried on every parse.
        const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
            if (!defaultTrustedTypesPolicyResolved) {
                defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
                defaultTrustedTypesPolicyResolved = true;
            }
            return defaultTrustedTypesPolicy;
        };
        const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        const importNode = originalDocument.importNode;
        let hooks = _createHooksMap();
        /**
     * Expose whether this browser supports running the full DOMPurify.
     */ DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
        const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
        let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */ /* allowed element names */ let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [
            ...html$1,
            ...svg$1,
            ...svgFilters,
            ...mathMl$1,
            ...text
        ]);
        /* Allowed attribute names */ let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [
            ...html,
            ...svg,
            ...mathMl,
            ...xml
        ]);
        /*
     * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */ let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
            tagNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: false
            }
        }));
        /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */ let FORBID_TAGS = null;
        /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */ let FORBID_ATTR = null;
        /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */ const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
            tagCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            }
        }));
        /* Decide if ARIA attributes are okay */ let ALLOW_ARIA_ATTR = true;
        /* Decide if custom data attributes are okay */ let ALLOW_DATA_ATTR = true;
        /* Decide if unknown protocols are okay */ let ALLOW_UNKNOWN_PROTOCOLS = false;
        /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */ let ALLOW_SELF_CLOSE_IN_ATTR = true;
        /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */ let SAFE_FOR_TEMPLATES = false;
        /* Output should be safe even for XML used within HTML and alike.
     * This means, DOMPurify removes comments when containing risky content.
     */ let SAFE_FOR_XML = true;
        /* Decide if document with <html>... should be returned */ let WHOLE_DOCUMENT = false;
        /* Track whether config is already set on this instance of DOMPurify. */ let SET_CONFIG = false;
        /* Pristine allowlist bindings captured at setConfig() time. On the
     * persistent-config path sanitize() restores the sets from these before
     * the per-walk hook clone-guard, so a hook's in-call widening cannot
     * carry across calls. Null until setConfig() is called; reset by
     * clearConfig(). */ let SET_CONFIG_ALLOWED_TAGS = null;
        let SET_CONFIG_ALLOWED_ATTR = null;
        /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */ let FORCE_BODY = false;
        /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */ let RETURN_DOM = false;
        /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */ let RETURN_DOM_FRAGMENT = false;
        /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */ let RETURN_TRUSTED_TYPE = false;
        /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */ let SANITIZE_DOM = true;
        /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */ let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
        /* Keep element content when removing element? */ let KEEP_CONTENT = true;
        /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */ let IN_PLACE = false;
        /* Allow usage of profiles like html, svg and mathMl */ let USE_PROFILES = {};
        /* Tags to ignore content of when KEEP_CONTENT is true */ let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, [
            'annotation-xml',
            'audio',
            'colgroup',
            'desc',
            'foreignobject',
            'head',
            'iframe',
            'math',
            'mi',
            'mn',
            'mo',
            'ms',
            'mtext',
            'noembed',
            'noframes',
            'noscript',
            'plaintext',
            'script',
            // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
            // the UA (customizable <select>) — including any on* handlers — and the
            // engine re-mirrors synchronously whenever a removal changes which
            // option/selectedcontent is current, even inside DOMPurify's inert
            // DOMParser document. Hoisting its children on removal re-inserts a fresh
            // mirror target ahead of the walk, which the engine refills, looping
            // forever (DoS) and amplifying output. Dropping its content on removal
            // (rather than hoisting) breaks that cascade; the content is a duplicate
            // of the option, which is sanitized on its own. See campaign-3 F1/F6.
            'selectedcontent',
            'style',
            'svg',
            'template',
            'thead',
            'title',
            'video',
            'xmp'
        ]);
        /* Tags that are safe for data: URIs */ let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, [
            'audio',
            'video',
            'img',
            'source',
            'image',
            'track'
        ]);
        /* Attributes safe for values like "javascript:" */ let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
            'alt',
            'class',
            'for',
            'id',
            'label',
            'name',
            'pattern',
            'placeholder',
            'role',
            'summary',
            'title',
            'value',
            'style',
            'xmlns'
        ]);
        const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
        const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
        /* Document namespace */ let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        /* Allowed XHTML+XML namespaces */ let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
            MATHML_NAMESPACE,
            SVG_NAMESPACE,
            HTML_NAMESPACE
        ], stringToString);
        const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
            'mi',
            'mo',
            'mn',
            'ms',
            'mtext'
        ]);
        let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
        const DEFAULT_HTML_INTEGRATION_POINTS = freeze([
            'annotation-xml'
        ]);
        let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
        // Certain elements are allowed in both SVG and HTML
        // namespace. We need to specify them explicitly
        // so that they don't get erroneously deleted from
        // HTML namespace.
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
            'title',
            'style',
            'font',
            'a',
            'script'
        ]);
        /* Parsing of strict XHTML documents */ let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = [
            'application/xhtml+xml',
            'text/html'
        ];
        const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
        let transformCaseFunc = null;
        /* Keep a reference to config to pass to hooks */ let CONFIG = null;
        /* Ideally, do not touch anything below this line */ /* ______________________________________________ */ const formElement = document.createElement('form');
        const isRegexOrFunction = function isRegexOrFunction(testValue) {
            return testValue instanceof RegExp || testValue instanceof Function;
        };
        /**
     * _parseConfig
     *
     * @param cfg optional config literal
     */ // eslint-disable-next-line complexity
        const _parseConfig = function _parseConfig() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            if (CONFIG && CONFIG === cfg) return;
            /* Shield configuration object from tampering */ if (!cfg || typeof cfg !== 'object') cfg = {};
            /* Shield configuration object from prototype pollution */ cfg = clone(cfg);
            PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
            SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
            // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
            transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
            /* Set configuration parameters */ ALLOWED_TAGS = _resolveSetOption(cfg, 'ALLOWED_TAGS', DEFAULT_ALLOWED_TAGS, {
                transform: transformCaseFunc
            });
            ALLOWED_ATTR = _resolveSetOption(cfg, 'ALLOWED_ATTR', DEFAULT_ALLOWED_ATTR, {
                transform: transformCaseFunc
            });
            ALLOWED_NAMESPACES = _resolveSetOption(cfg, 'ALLOWED_NAMESPACES', DEFAULT_ALLOWED_NAMESPACES, {
                transform: stringToString
            });
            URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, 'ADD_URI_SAFE_ATTR', DEFAULT_URI_SAFE_ATTRIBUTES, {
                transform: transformCaseFunc,
                base: DEFAULT_URI_SAFE_ATTRIBUTES
            });
            DATA_URI_TAGS = _resolveSetOption(cfg, 'ADD_DATA_URI_TAGS', DEFAULT_DATA_URI_TAGS, {
                transform: transformCaseFunc,
                base: DEFAULT_DATA_URI_TAGS
            });
            FORBID_CONTENTS = _resolveSetOption(cfg, 'FORBID_CONTENTS', DEFAULT_FORBID_CONTENTS, {
                transform: transformCaseFunc
            });
            FORBID_TAGS = _resolveSetOption(cfg, 'FORBID_TAGS', clone({}), {
                transform: transformCaseFunc
            });
            FORBID_ATTR = _resolveSetOption(cfg, 'FORBID_ATTR', clone({}), {
                transform: transformCaseFunc
            });
            USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === 'object' ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
            ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
            ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
            ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
            ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
            SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
            SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
            WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
            RETURN_DOM = cfg.RETURN_DOM || false; // Default false
            RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
            RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
            FORCE_BODY = cfg.FORCE_BODY || false; // Default false
            SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
            SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
            KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
            IN_PLACE = cfg.IN_PLACE || false; // Default false
            IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI; // Default regexp
            NAMESPACE = typeof cfg.NAMESPACE === 'string' ? cfg.NAMESPACE : HTML_NAMESPACE; // Default HTML namespace
            MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'MATHML_TEXT_INTEGRATION_POINTS') && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === 'object' ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS); // Default built-in map
            HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'HTML_INTEGRATION_POINTS') && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === 'object' ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS); // Default built-in map
            const customElementHandling = objectHasOwnProperty(cfg, 'CUSTOM_ELEMENT_HANDLING') && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === 'object' ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create(null);
            CUSTOM_ELEMENT_HANDLING = create(null);
            if (objectHasOwnProperty(customElementHandling, 'tagNameCheck') && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck; // Default undefined
            if (objectHasOwnProperty(customElementHandling, 'attributeNameCheck') && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck; // Default undefined
            if (objectHasOwnProperty(customElementHandling, 'allowCustomizedBuiltInElements') && typeof customElementHandling.allowCustomizedBuiltInElements === 'boolean') CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements; // Default undefined
            seal(CUSTOM_ELEMENT_HANDLING);
            if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
            if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
            /* Parse profile info */ if (USE_PROFILES) {
                ALLOWED_TAGS = addToSet({}, text);
                ALLOWED_ATTR = create(null);
                if (USE_PROFILES.html === true) {
                    addToSet(ALLOWED_TAGS, html$1);
                    addToSet(ALLOWED_ATTR, html);
                }
                if (USE_PROFILES.svg === true) {
                    addToSet(ALLOWED_TAGS, svg$1);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.svgFilters === true) {
                    addToSet(ALLOWED_TAGS, svgFilters);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.mathMl === true) {
                    addToSet(ALLOWED_TAGS, mathMl$1);
                    addToSet(ALLOWED_ATTR, mathMl);
                    addToSet(ALLOWED_ATTR, xml);
                }
            }
            /* Always reset function-based ADD_TAGS / ADD_ATTR checks to prevent
       * leaking across calls when switching from function to array config */ EXTRA_ELEMENT_HANDLING.tagCheck = null;
            EXTRA_ELEMENT_HANDLING.attributeCheck = null;
            /* Merge configuration parameters */ if (objectHasOwnProperty(cfg, 'ADD_TAGS')) {
                if (typeof cfg.ADD_TAGS === 'function') EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
                else if (arrayIsArray(cfg.ADD_TAGS)) {
                    if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
                    addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
                }
            }
            if (objectHasOwnProperty(cfg, 'ADD_ATTR')) {
                if (typeof cfg.ADD_ATTR === 'function') EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
                else if (arrayIsArray(cfg.ADD_ATTR)) {
                    if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
                    addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
                }
            }
            if (objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
            if (objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS)) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
                addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
            }
            if (objectHasOwnProperty(cfg, 'ADD_FORBID_CONTENTS') && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
                addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
            }
            /* Add #text in case KEEP_CONTENT is set to true */ if (KEEP_CONTENT) ALLOWED_TAGS['#text'] = true;
            /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */ if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
                'html',
                'head',
                'body'
            ]);
            /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */ if (ALLOWED_TAGS.table) {
                addToSet(ALLOWED_TAGS, [
                    'tbody'
                ]);
                delete FORBID_TAGS.tbody;
            }
            // Re-derive the active Trusted Types policy from this configuration on
            // every parse. The active policy must never be sticky closure state that
            // outlives the config that set it: a caller-supplied policy left in place
            // after `clearConfig()` — or after a later call that supplied none, or
            // `TRUSTED_TYPES_POLICY: null` — could sign a subsequent "default"
            // `RETURN_TRUSTED_TYPE` result with a foreign, possibly unsafe policy.
            // See GHSA-vxr8-fq34-vvx9.
            if (cfg.TRUSTED_TYPES_POLICY) {
                if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                // A caller-supplied policy applies to this configuration only.
                const previousTrustedTypesPolicy = trustedTypesPolicy;
                trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
                // Sign local variables required by `sanitize`. If the supplied policy's
                // `createHTML` is circular (i.e. it calls `DOMPurify.sanitize`), this
                // throws via the re-entrancy guard. Restore the previous policy first so
                // the instance is not left in a poisoned state. See #1422.
                try {
                    emptyHTML = _createTrustedHTML('');
                } catch (error) {
                    trustedTypesPolicy = previousTrustedTypesPolicy;
                    throw error;
                }
            } else if (cfg.TRUSTED_TYPES_POLICY === null) {
                // Explicit opt-out for this call: perform no Trusted Types signing and
                // create nothing (so a strict `trusted-types` CSP that disallows a
                // `dompurify` policy can still call `sanitize` from inside its own
                // policy — see #1422). Resetting to `undefined` rather than a sticky
                // `null` also drops any previously retained caller policy, so it cannot
                // resurface on a later call, while still allowing the next config-less
                // call to restore the internal default policy. See GHSA-vxr8-fq34-vvx9.
                trustedTypesPolicy = undefined;
                emptyHTML = '';
            } else {
                // No policy supplied: keep the currently active policy if one is set — a
                // previously supplied policy is intentionally sticky across config-less
                // calls — otherwise fall back to the instance's own internal policy,
                // created at most once. (A policy supplied for a *single* call still
                // lingers by design; what must not linger is a policy whose configuration
                // has been torn down via `clearConfig()`, which restores the default.)
                if (trustedTypesPolicy === undefined) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
                // Sign internal variables only when a policy is active. A falsy policy
                // (Trusted Types unsupported, creation failed, or an explicit opt-out)
                // leaves `emptyHTML` as a plain string, so we never call `.createHTML` on
                // a non-policy and throw. See #1422.
                if (trustedTypesPolicy && typeof emptyHTML === 'string') emptyHTML = _createTrustedHTML('');
            }
            // Prevent further manipulation of configuration.
            // Not available in IE8, Safari 5, etc.
            if (freeze) freeze(cfg);
            CONFIG = cfg;
        };
        /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */ const ALL_SVG_TAGS = addToSet({}, [
            ...svg$1,
            ...svgFilters,
            ...svgDisallowed
        ]);
        const ALL_MATHML_TAGS = addToSet({}, [
            ...mathMl$1,
            ...mathMlDisallowed
        ]);
        /**
     * Namespace rules for an element in the SVG namespace.
     *
     * @param tagName the element's lowercase tag name
     * @param parent the (possibly simulated) parent node
     * @param parentTagName the parent's lowercase tag name
     * @returns true if a spec-compliant parser could produce this element
     */ const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
            // The only way to switch from HTML namespace to SVG
            // is via <svg>. If it happens via any other tag, then
            // it should be killed.
            if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'svg';
            // The only way to switch from MathML to SVG is via <svg>
            // if the parent is either <annotation-xml> or a MathML
            // text integration point.
            if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            // We only allow elements that are defined in SVG
            // spec. All others are disallowed in SVG namespace.
            return Boolean(ALL_SVG_TAGS[tagName]);
        };
        /**
     * Namespace rules for an element in the MathML namespace.
     *
     * @param tagName the element's lowercase tag name
     * @param parent the (possibly simulated) parent node
     * @param parentTagName the parent's lowercase tag name
     * @returns true if a spec-compliant parser could produce this element
     */ const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
            // The only way to switch from HTML namespace to MathML
            // is via <math>. If it happens via any other tag, then
            // it should be killed.
            if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'math';
            // The only way to switch from SVG to MathML is via
            // <math> and HTML integration points
            if (parent.namespaceURI === SVG_NAMESPACE) return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
            // We only allow elements that are defined in MathML
            // spec. All others are disallowed in MathML namespace.
            return Boolean(ALL_MATHML_TAGS[tagName]);
        };
        /**
     * Namespace rules for an element in the HTML namespace.
     *
     * @param tagName the element's lowercase tag name
     * @param parent the (possibly simulated) parent node
     * @param parentTagName the parent's lowercase tag name
     * @returns true if a spec-compliant parser could produce this element
     */ const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
            // The only way to switch from SVG to HTML is via
            // HTML integration points, and from MathML to HTML
            // is via MathML text integration points
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
            // We disallow tags that are specific for MathML
            // or SVG and should never appear in HTML namespace
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
        };
        /**
     * @param element a DOM element whose namespace is being checked
     * @returns Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */ const _checkValidNamespace = function _checkValidNamespace(element) {
            let parent = getParentNode(element);
            // In JSDOM, if we're inside shadow DOM, then parentNode
            // can be null. We just simulate parent in this case.
            if (!parent || !parent.tagName) parent = {
                namespaceURI: NAMESPACE,
                tagName: 'template'
            };
            const tagName = stringToLowerCase(element.tagName);
            const parentTagName = stringToLowerCase(parent.tagName);
            if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
            if (element.namespaceURI === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
            if (element.namespaceURI === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
            if (element.namespaceURI === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
            // For XHTML and XML documents that support custom namespaces
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
            // The code should never reach this place (this means
            // that the element somehow got namespace that is not
            // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
            // Return false just in case.
            return false;
        };
        /**
     * _forceRemove
     *
     * @param node a DOM node
     */ const _forceRemove = function _forceRemove(node) {
            arrayPush(DOMPurify.removed, {
                element: node
            });
            try {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                getParentNode(node).removeChild(node);
            } catch (_) {
                /* The normal detach failed — this is reached for a parentless node
           (getParentNode() is null, so .removeChild throws). Element.prototype
           .remove() is itself a spec no-op on a parentless node, so a recorded
           "removal" would otherwise hand the caller back an intact,
           payload-bearing node (e.g. a detached IN_PLACE root the mXSS canary or
           the style-with-element-child rule decided to kill). Fail closed by
           throwing — exactly as a clobbered root does at the IN_PLACE entry —
           rather than trying to "neutralize" the node via its own methods.
           Neutralizing would mean calling getAttributeNames()/removeAttribute()
           on the node, both of which a <form> root can clobber via a named child
           (and _isClobbered does not even probe getAttributeNames), so the
           neutralize step could itself be silently defeated, leaving the payload
           intact. A throw touches only the cached, clobber-safe remove() and
           getParentNode(). Generalizes GHSA-r47g-fvhr-h676 (clobbered-form root)
           to every root-kill reason. REPORT-3.
                  This lives inside the catch, so it never fires for a normally-removed
           in-tree node: those have a parent, removeChild() succeeds, and the
           catch is not entered. Only a kept (parentless) root reaches here. */ remove(node);
                if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
            }
        };
        /**
     * _neutralizeRoot
     *
     * Fail-closed teardown of an in-place root after the sanitize walk aborts
     * (campaign-3 F2). An internal throw mid-walk — e.g. a page-registered
     * custom element's reaction detaches a node so `_forceRemove`'s deliberate
     * parentless guard throws, or any other re-entrant engine mutation — would
     * otherwise leave the caller's *live* tree half-sanitized, with everything
     * after the abort point still carrying its handlers. There is no safe way
     * to resume the walk (the tree mutated under us), so we strip the root bare:
     * remove every child and every attribute, then let the caller's catch see
     * the original error. Clobber-safe (cached `remove`/`childNodes`/`attributes`
     * getters; the root was already clobber-pre-flighted at the IN_PLACE entry).
     *
     * @param root the in-place root to empty
     */ const _neutralizeRoot = function _neutralizeRoot(root) {
            const childNodes = getChildNodes(root);
            if (childNodes) {
                const snapshot = [];
                arrayForEach(childNodes, (child)=>{
                    arrayPush(snapshot, child);
                });
                arrayForEach(snapshot, (child)=>{
                    try {
                        remove(child);
                    } catch (_) {
                    /* Best-effort teardown; a still-attached child is handled below */ }
                });
            }
            const attributes = getAttributes(root);
            if (attributes) for(let i = attributes.length - 1; i >= 0; --i){
                const attribute = attributes[i];
                const name = attribute && attribute.name;
                if (typeof name === 'string') try {
                    root.removeAttribute(name);
                } catch (_) {
                /* Clobbered removeAttribute — ignore (fail-closed best effort) */ }
            }
        };
        /**
     * _removeAttribute
     *
     * @param name an Attribute name
     * @param element a DOM node
     */ const _removeAttribute = function _removeAttribute(name, element) {
            try {
                arrayPush(DOMPurify.removed, {
                    attribute: element.getAttributeNode(name),
                    from: element
                });
            } catch (_) {
                arrayPush(DOMPurify.removed, {
                    attribute: null,
                    from: element
                });
            }
            element.removeAttribute(name);
            // We void attribute values for unremovable "is" attributes
            if (name === 'is') {
                if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
                    _forceRemove(element);
                } catch (_) {}
                else try {
                    element.setAttribute(name, '');
                } catch (_) {}
            }
        };
        /**
     * _stripDisallowedAttributes
     *
     * Removes every attribute the active configuration does not allow from a
     * single element, using the same allowlist as the main attribute pass (so
     * `on*` handlers go, but no `/^on/` blocklist is introduced). Used only to
     * neutralise nodes that are being discarded from an in-place tree.
     *
     * @param element the element to strip
     */ const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
            const attributes = getAttributes(element);
            if (!attributes) return;
            for(let i = attributes.length - 1; i >= 0; --i){
                const attribute = attributes[i];
                const name = attribute && attribute.name;
                if (typeof name !== 'string' || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
                try {
                    element.removeAttribute(name);
                } catch (_) {
                /* Clobbered removeAttribute on a doomed node — ignore */ }
            }
        };
        /**
     * _neutralizeSubtree
     *
     * Completes the audit-5 F1 fix across every removal path. The KEEP_CONTENT
     * move-hoist neutralises only disallowed-tag removals; clobber, mXSS-canary,
     * namespace, comment, processing-instruction and KEEP_CONTENT:false removals
     * all drop their subtree wholesale via `_forceRemove`. On the IN_PLACE path
     * those dropped nodes are detached from the caller's LIVE tree but a
     * handler-bearing original among them (an `<img onerror>`/`<video>` that was
     * loading) keeps its queued resource event, which fires in page scope after
     * sanitize returns. This walks a removed subtree and strips every attribute
     * the active configuration does not allow — so `on*` handlers are cancelled
     * through the SAME allowlist that governs kept nodes, not a separate `/^on/`
     * blocklist. Run synchronously before sanitize returns, i.e. before any
     * queued event can fire. Hook-free by design: these nodes leave the output,
     * so firing attribute hooks for them would be surprising. Clobber-safe reads;
     * a doomed clobbered node may shadow `removeAttribute` (its own attributes are
     * irrelevant — it is discarded — while its non-clobbered descendants, e.g.
     * the `<img>`, are reached and scrubbed).
     *
     * @param root the root of a removed subtree to neutralise
     */ const _neutralizeSubtree = function _neutralizeSubtree(root) {
            const stack = [
                root
            ];
            while(stack.length > 0){
                const node = stack.pop();
                const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
                if (nodeType === NODE_TYPE.element) _stripDisallowedAttributes(node);
                const childNodes = getChildNodes(node);
                if (childNodes) for(let i = childNodes.length - 1; i >= 0; --i)stack.push(childNodes[i]);
            }
        };
        /**
     * _initDocument
     *
     * @param dirty - a string of dirty markup
     * @return a DOM, filled with the dirty markup
     */ const _initDocument = function _initDocument(dirty) {
            /* Create a HTML document */ let doc = null;
            let leadingWhitespace = null;
            if (FORCE_BODY) dirty = '<remove></remove>' + dirty;
            else {
                /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */ const matches = stringMatch(dirty, /^[\r\n\t ]+/);
                leadingWhitespace = matches && matches[0];
            }
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
            const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
            /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */ if (NAMESPACE === HTML_NAMESPACE) try {
                doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {}
            /* Use createHTMLDocument in case DOMParser is not available */ if (!doc || !doc.documentElement) {
                doc = implementation.createDocument(NAMESPACE, 'template', null);
                try {
                    doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
                } catch (_) {
                // Syntax error if dirtyPayload is invalid xml
                }
            }
            const body = doc.body || doc.documentElement;
            if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
            /* Work on whole document or just its body */ if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
            return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param root The root element or node to start traversing on.
     * @return The created NodeIterator
     */ const _createNodeIterator = function _createNodeIterator(root) {
            return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
        };
        /**
     * Replace template expression syntax (mustache, ERB, template
     * literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
     * sites. Order matters: mustache, then ERB, then template literal.
     *
     * @param value the string to scrub
     * @returns the scrubbed string
     */ const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
            value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
            value = stringReplace(value, ERB_EXPR$1, ' ');
            value = stringReplace(value, TMPLIT_EXPR$1, ' ');
            return value;
        };
        /**
     * Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
     * character data of an element subtree. Used as the final safety net for
     * SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
     * which only form after text-node normalization (e.g. fragments split across
     * stripped elements) cannot survive into a template-evaluating framework.
     *
     * Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
     * in place rather than round-tripping through innerHTML. This preserves
     * descendant node references (important for IN_PLACE callers), avoids a
     * serialize/reparse cycle, and reads literal character data — which means
     * `<%...%>` in text content matches the ERB regex against its real bytes
     * instead of the HTML-entity-escaped form innerHTML would produce.
     *
     * Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
     * attributes is performed during the per-node `_sanitizeAttributes` pass.
     *
     * @param node The root element whose character data should be scrubbed.
     */ const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
            var _node$querySelectorAl;
            node.normalize();
            const walker = createNodeIterator.call(node.ownerDocument || node, node, // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
            let currentNode = walker.nextNode();
            while(currentNode){
                currentNode.data = _stripTemplateExpressions(currentNode.data);
                currentNode = walker.nextNode();
            }
            // NodeIterator does not descend into <template>.content per the DOM spec,
            // so we must explicitly recurse into each template's content fragment,
            // mirroring the approach used by _sanitizeShadowDOM.
            const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, 'template');
            if (templates) arrayForEach(templates, (tmpl)=>{
                if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
            });
        };
        /**
     * _isClobbered
     *
     * Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
     * interface with [LegacyOverrideBuiltIns]; a descendant element with a
     * `name` attribute matching a prototype property shadows that property
     * on direct reads. We use this check at the IN_PLACE entry-point and
     * during attribute sanitization to refuse clobbered forms.
     *
     * @param element element to check for clobbering attacks
     * @return true if clobbered, false if safe
     */ const _isClobbered = function _isClobbered(element) {
            // Realm-independent tag-name probe. If we can't determine the tag
            // name at all, we can't reason about clobbering — return false
            // (the caller's other defences still apply).
            const realTagName = getNodeName ? getNodeName(element) : null;
            if (typeof realTagName !== 'string') return false;
            if (transformCaseFunc(realTagName) !== 'form') return false;
            return typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || // Realm-safe NamedNodeMap detection: equality against the cached
            // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
            // makes the direct read diverge from the cached read; a clean form
            // (same-realm OR foreign-realm) has both reads pointing at the same
            // canonical NamedNodeMap.
            element.attributes !== getAttributes(element) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function' || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
            // returns the integer 1 for any Element regardless of realm; direct
            // read on a clobbered form (e.g. <input name="nodeType">) returns
            // the named child element. Cheap addition — nodeType is read from
            // an internal slot, no serialization cost — and removes a residual
            // clobbering surface used by several mXSS / PI / comment branches
            // in _sanitizeElements that compare currentNode.nodeType directly.
            element.nodeType !== getNodeType(element) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
            // "childNodes" shadows the prototype getter. Direct reads of
            // form.childNodes from a clobbered form return the named child
            // instead of the real NodeList, so any walk that reads it directly
            // skips the form's real children. Compare the direct read to the
            // cached Node.prototype getter — when the form's named-property
            // getter intercepts the read, the two values differ and we flag
            // the form. This catches every clobbering child type (input,
            // select, etc.) regardless of whether the named child happens to
            // carry a numeric .length, which a typeof-based probe would miss
            // (e.g. HTMLSelectElement.length is a defined unsigned-long).
            element.childNodes !== getChildNodes(element);
        };
        /**
     * Checks whether the given value is a DocumentFragment from any realm.
     *
     * The realm-independent replacement reads `nodeType` through the cached
     * Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
     * constant (11). nodeType is a numeric value resolved from the node's
     * internal slot, identical across realms for the same kind of node.
     *
     * @param value object to check
     * @return true if value is a DocumentFragment-shaped node from any realm
     */ const _isDocumentFragment = function _isDocumentFragment(value) {
            if (!getNodeType || typeof value !== 'object' || value === null) return false;
            try {
                return getNodeType(value) === NODE_TYPE.documentFragment;
            } catch (_) {
                return false;
            }
        };
        /**
     * Checks whether the given object is a DOM node, including nodes that
     * originate from a different window/realm (e.g. an iframe's
     * contentDocument). The previous `value instanceof Node` check was
     * realm-bound: nodes from a different window failed it, causing
     * sanitize() to silently stringify them and reset IN_PLACE to false,
     * returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
     *
     * @param value object to check whether it's a DOM node
     * @return true if value is a DOM node from any realm
     */ const _isNode = function _isNode(value) {
            if (!getNodeType || typeof value !== 'object' || value === null) return false;
            try {
                return typeof getNodeType(value) === 'number';
            } catch (_) {
                return false;
            }
        };
        function _executeHooks(hooks, currentNode, data) {
            if (hooks.length === 0) return;
            arrayForEach(hooks, (hook)=>{
                hook.call(DOMPurify, currentNode, data, CONFIG);
            });
        }
        /**
     * Structural-threat checks that condemn a node regardless of the
     * allowlists: mXSS via namespace confusion, risky CSS construction,
     * processing instructions, markup-bearing comments. Pure predicate;
     * the caller removes. Check order is load-bearing.
     *
     * @param currentNode the node to inspect
     * @param tagName the node's transformCaseFunc'd tag name
     * @return true if the node must be removed
     */ const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
            /* Detect mXSS attempts abusing namespace confusion */ if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
            /* Remove risky CSS construction leading to mXSS */ if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === 'style' && _isNode(currentNode.firstElementChild)) return true;
            /* Remove any occurrence of processing instructions */ if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
            /* Remove any kind of possibly harmful comments */ if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
            return false;
        };
        /**
     * Handle a node whose tag is forbidden or not allowlisted: keep
     * allowed custom elements (false return exits _sanitizeElements
     * early - namespace/fallback checks and the afterSanitizeElements
     * hook are intentionally skipped for kept custom elements), else
     * hoist content per KEEP_CONTENT and remove.
     *
     * @param currentNode the disallowed node
     * @param tagName the node's transformCaseFunc'd tag name
     * @return true if the node was removed, false if kept
     */ const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName) {
            /* Check if we have a custom element to handle */ if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
                if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
                if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
            }
            /* Keep content except for bad-listed elements.
           Use the cached prototype getters exclusively — the previous code
           had `|| currentNode.parentNode` / `|| currentNode.childNodes`
           fallbacks, but the cached getters always return the canonical
           value (or null for a real parent-less node), so the fallback
           path was dead in safe cases and a clobbering surface in unsafe
           ones. Falsy cached results stay falsy; the `if (childNodes &&
           parentNode)` check already gates correctly. */ if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                const parentNode = getParentNode(currentNode);
                const childNodes = getChildNodes(currentNode);
                if (childNodes && parentNode) {
                    const childCount = childNodes.length;
                    /* In-place: hoist the *original* children so the iterator visits
               and sanitises them through the same allowlist pass as every other
               node. The caller built the tree in the live document, so the
               originals carry already-queued resource events (`<img onerror>`,
               `<video>`/`<audio>` error, lazy/`onload`, …); cloning would leave
               those originals detached but still armed, firing in page scope
               while the returned tree looked clean. Moving is safe in-place: the
               root is pre-validated as an allowed tag and so is never the node
               being removed, which keeps `parentNode` inside the iterator root
               and the relocated child inside the serialised tree.
                        Otherwise (string / DOM-copy paths): clone. The iterator is rooted
               at — and the result serialised from — `body`, so a restrictive
               ALLOWED_TAGS that removes `body` itself must leave its content in
               place, which only cloning does; and those paths parse into an
               inert document, so their discarded originals never had a queued
               event to neutralise.
                        `childNodes` is live; a tail-to-head walk keeps `childNodes[i]`
               valid whether we move (drops the trailing entry) or clone (leaves
               the list intact). */ for(let i = childCount - 1; i >= 0; --i){
                        const hoisted = IN_PLACE ? childNodes[i] : cloneNode(childNodes[i], true);
                        parentNode.insertBefore(hoisted, getNextSibling(currentNode));
                    }
                }
            }
            _forceRemove(currentNode);
            return true;
        };
        /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     * @param currentNode to check for permission to exist
     * @return true if node was killed, false if left alive
     */ const _sanitizeElements = function _sanitizeElements(currentNode) {
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
            /* Check if element is clobbered or can clobber */ if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Now let's check the element's type and name */ const tagName = transformCaseFunc(getNodeName ? getNodeName(currentNode) : currentNode.nodeName);
            /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeElement, currentNode, {
                tagName,
                allowedTags: ALLOWED_TAGS
            });
            /* Remove mXSS vectors, processing instructions and risky comments */ if (_isUnsafeNode(currentNode, tagName)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove element if anything forbids its presence */ if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) return _sanitizeDisallowedNode(currentNode, tagName);
            /* Check whether element has a valid namespace.
         Realm-safe check (GHSA-hpcv-96wg-7vj8): use the cached Node.prototype
         nodeType getter rather than `instanceof Element`, which is realm-
         bound and short-circuits to false for any node minted in a different
         realm — letting a foreign-realm element with a forbidden namespace
         slip past the namespace check entirely. */ const nt = getNodeType ? getNodeType(currentNode) : currentNode.nodeType;
            if (nt === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Make sure that older browsers don't get fallback-tag mXSS */ if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Sanitize element content to be template-safe */ if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
                /* Get the element's text content */ const content = _stripTemplateExpressions(currentNode.textContent);
                if (currentNode.textContent !== content) {
                    arrayPush(DOMPurify.removed, {
                        element: currentNode.cloneNode()
                    });
                    currentNode.textContent = content;
                }
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeElements, currentNode, null);
            return false;
        };
        /**
     * _isValidAttribute
     *
     * @param lcTag Lowercase tag name of containing element.
     * @param lcName Lowercase attribute name.
     * @param value Attribute value.
     * @return Returns true if `value` is valid, otherwise false.
     */ // eslint-disable-next-line complexity
        const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
            /* FORBID_ATTR must always win, even if ADD_ATTR predicate would allow it */ if (FORBID_ATTR[lcName]) return false;
            /* Make sure attribute cannot clobber */ if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) return false;
            const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
            /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */ if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) ;
            else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ;
            else if (!nameIsPermitted) {
                if (// First condition does a very basic check if a) it's basically a valid custom element tagname AND
                // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
                _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
                // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ;
                else return false;
            /* Check value is safe. First, is attr inert? If so, is safe */ } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
            else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ;
            else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;
            else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ;
            else if (value) return false;
            return true;
        };
        /* Names the HTML spec reserves from valid-custom-element-name; these must
     * never be treated as basic custom elements even when a permissive
     * CUSTOM_ELEMENT_HANDLING.tagNameCheck is configured. */ const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
            'annotation-xml',
            'color-profile',
            'font-face',
            'font-face-format',
            'font-face-name',
            'font-face-src',
            'font-face-uri',
            'missing-glyph'
        ]);
        /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param tagName name of the tag of the node to sanitize
     * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */ const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
            return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
        };
        /**
     * Wrap an attribute value in the matching Trusted Types object when
     * the active policy requires it. Namespaced attributes pass through
     * unchanged (no TT support yet, see
     * https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
     *
     * @param lcTag lowercase tag name of the containing element
     * @param lcName lowercase attribute name
     * @param namespaceURI the attribute's namespace, if any
     * @param value the attribute value to wrap
     * @return the value, wrapped when Trusted Types demand it
     */ const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
            if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function' && !namespaceURI) switch(trustedTypes.getAttributeType(lcTag, lcName)){
                case 'TrustedHTML':
                    return _createTrustedHTML(value);
                case 'TrustedScriptURL':
                    return _createTrustedScriptURL(value);
            }
            return value;
        };
        /**
     * Write a modified attribute value back onto the element. On
     * success, re-probe for clobbering introduced by the new value and
     * remove the element when found; otherwise pop the removal entry
     * recorded by the earlier _removeAttribute (long-standing pairing
     * with the SANITIZE_NAMED_PROPS path - do not "fix" casually). On
     * failure, remove the attribute instead.
     *
     * @param currentNode the element carrying the attribute
     * @param name the attribute name as present on the element
     * @param namespaceURI the attribute's namespace, if any
     * @param value the new attribute value
     */ const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
            try {
                if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
                else /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */ currentNode.setAttribute(name, value);
                if (_isClobbered(currentNode)) _forceRemove(currentNode);
                else arrayPop(DOMPurify.removed);
            } catch (_) {
                _removeAttribute(name, currentNode);
            }
        };
        /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param currentNode to sanitize
     */ const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
            const attributes = currentNode.attributes;
            /* Check if we have attributes; if not we might have a text node */ if (!attributes || _isClobbered(currentNode)) return;
            const hookEvent = {
                attrName: '',
                attrValue: '',
                keepAttr: true,
                allowedAttributes: ALLOWED_ATTR,
                forceKeepAttr: undefined
            };
            let l = attributes.length;
            const lcTag = transformCaseFunc(currentNode.nodeName);
            /* Go backwards over all attributes; safely remove bad ones */ while(l--){
                const attr = attributes[l];
                const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
                const lcName = transformCaseFunc(name);
                const initValue = attrValue;
                let value = name === 'value' ? initValue : stringTrim(initValue);
                /* Execute a hook if present */ hookEvent.attrName = lcName;
                hookEvent.attrValue = value;
                hookEvent.keepAttr = true;
                hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
                _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
                value = hookEvent.attrValue;
                /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */ if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name') && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
                    // Remove the attribute with this value
                    _removeAttribute(name, currentNode);
                    // Prefix the value and later re-create the attribute with the sanitized value
                    value = SANITIZE_NAMED_PROPS_PREFIX + value;
                }
                // Else: already prefixed, leave the attribute alone — the prefix is
                // itself the clobbering protection, and re-applying it is incorrect.
                /* Work around a security issue with comments inside attributes */ if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Make sure we cannot easily use animated hrefs, even if animations are allowed */ if (lcName === 'attributename' && stringMatch(value, 'href')) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Did the hooks force-keep the attribute? */ if (hookEvent.forceKeepAttr) continue;
                /* Did the hooks approve of the attribute? */ if (!hookEvent.keepAttr) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Work around a security issue in jQuery 3.0 */ if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Sanitize attribute content to be template-safe */ if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
                /* Is `value` valid for this attribute? */ if (!_isValidAttribute(lcTag, lcName, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Handle attributes that require Trusted Types */ value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
                /* Handle invalid data-* attribute set by try-catching it */ if (value !== initValue) _setAttributeValue(currentNode, name, namespaceURI, value);
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
        };
        /**
     * _sanitizeShadowDOM
     *
     * @param fragment to iterate over recursively
     */ const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
            let shadowNode = null;
            const shadowIterator = _createNodeIterator(fragment);
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
            while(shadowNode = shadowIterator.nextNode()){
                /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
                /* Sanitize tags and elements */ _sanitizeElements(shadowNode);
                /* Check attributes next */ _sanitizeAttributes(shadowNode);
                /* Deep shadow DOM detected.
           Realm-safe check (GHSA-hpcv-96wg-7vj8): use nodeType against the
           DOCUMENT_FRAGMENT_NODE constant rather than instanceof, so we
           recurse into <template>.content from foreign realms too. */ if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
                /* An element iterated here may itself host an attached
           shadow root. The default NodeIterator does not enter shadow
           trees, so a shadow root nested inside template.content was
           previously reached by no walk at all (the pre-pass at
           _sanitizeAttachedShadowRoots descends via childNodes, which
           doesn't enter template.content; the template-content recursion
           above iterates the content but never inspected shadowRoot).
           Walk it explicitly. The nodeType guard avoids reading
           shadowRoot off text / comment / CDATA / PI nodes that the
           iterator also surfaces. */ const shadowNodeType = getNodeType ? getNodeType(shadowNode) : shadowNode.nodeType;
                if (shadowNodeType === NODE_TYPE.element) {
                    const innerSr = getShadowRoot(shadowNode);
                    if (_isDocumentFragment(innerSr)) {
                        _sanitizeAttachedShadowRoots(innerSr);
                        _sanitizeShadowDOM2(innerSr);
                    }
                }
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
        };
        /**
     * _sanitizeAttachedShadowRoots
     *
     * Walks `root` and feeds every attached shadow root we encounter into
     * the existing _sanitizeShadowDOM pipeline. The default node iterator
     * does not descend into shadow trees, so nodes inside an attached
     * shadow root would otherwise be skipped entirely.
     *
     * Two real input paths put attached shadow roots in front of us:
     *   1. IN_PLACE on a DOM node that already has shadow roots attached.
     *   2. DOM-node input where importNode(dirty, true) deep-clones the
     *      shadow root because it was created with `clonable: true`.
     *
     * This pass runs once, up front, so the main iteration loop (and the
     * existing _sanitizeShadowDOM template-content recursion) stay
     * untouched — string-input paths are not affected.
     *
     * @param root the subtree root to walk for attached shadow roots
     */ const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
            /* Iterative (explicit stack) rather than per-child recursion. DOM APIs
         impose no depth cap, so an attacker-shaped tree (JSON/CRDT/editor data
         built straight into the DOM — the IN_PLACE surface) deeper than the JS
         call-stack budget would otherwise overflow native recursion here and
         throw at the IN_PLACE entry pre-pass, before a single node is
         sanitized, leaving the caller's live tree untouched (fail-open). See
         campaign-3 F4. A heap stack keeps depth off the call stack.
              Each work item is either a node to descend into, or a deferred
         `_sanitizeShadowDOM` for an already-walked shadow root. The deferred
         form preserves the original post-order discipline: a shadow root's
         nested shadow roots are discovered before the outer shadow is
         sanitized (which may remove hosts). Pushes are in reverse of the
         desired processing order (LIFO): template content, then children, then
         the shadow-sanitize, then the shadow walk — so the order matches the
         previous recursion exactly. */ const stack = [
                {
                    node: root,
                    shadow: null
                }
            ];
            while(stack.length > 0){
                const item = stack.pop();
                /* Deferred shadow-DOM sanitisation: runs after its subtree was walked. */ if (item.shadow) {
                    _sanitizeShadowDOM2(item.shadow);
                    continue;
                }
                const node = item.node;
                const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
                const isElement = nodeType === NODE_TYPE.element;
                /* (pushed last → processed first) Children, snapshotted in reverse so
           the first child is processed first. Snapshotting matters because a
           hook may detach siblings mid-walk. */ const childNodes = getChildNodes(node);
                if (childNodes) for(let i = childNodes.length - 1; i >= 0; --i)stack.push({
                    node: childNodes[i],
                    shadow: null
                });
                /* (pushed before children → processed after them, matching the old
           "template content last" order) When the node is a <template>,
           descend into its content. */ if (isElement) {
                    const rootName = getNodeName ? getNodeName(node) : null;
                    if (typeof rootName === 'string' && transformCaseFunc(rootName) === 'template') {
                        const content = node.content;
                        if (_isDocumentFragment(content)) stack.push({
                            node: content,
                            shadow: null
                        });
                    }
                }
                /* Shadow root (processed first): walk its subtree, then sanitise it.
           Realm-safe check (GHSA-hpcv-96wg-7vj8): nodeType-based detection
           rather than `instanceof DocumentFragment`, which is realm-bound and
           silently skipped foreign-realm shadow roots (e.g.
           iframe.contentDocument attachShadow). */ if (isElement) {
                    const sr = getShadowRoot(node);
                    if (_isDocumentFragment(sr)) /* Push the deferred sanitise first so it pops after the shadow
               walk we push next, i.e. nested shadow roots are discovered
               before this one is sanitised. */ stack.push({
                        node: null,
                        shadow: sr
                    }, {
                        node: sr,
                        shadow: null
                    });
                }
            }
        };
        // eslint-disable-next-line complexity
        DOMPurify.sanitize = function(dirty) {
            let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            let body = null;
            let importedNode = null;
            let currentNode = null;
            let returnNode = null;
            /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */ IS_EMPTY_INPUT = !dirty;
            if (IS_EMPTY_INPUT) dirty = '<!-->';
            /* Stringify, in case dirty is an object */ if (typeof dirty !== 'string' && !_isNode(dirty)) {
                dirty = stringifyValue(dirty);
                if (typeof dirty !== 'string') throw typeErrorCreate('dirty is not a string, aborting');
            }
            /* Return dirty HTML if DOMPurify cannot run */ if (!DOMPurify.isSupported) return dirty;
            /* Assign config vars */ if (SET_CONFIG) {
                /* Persistent setConfig() path: _parseConfig is skipped, so the sets are
         * not re-derived per call. Restore them from the pristine bindings
         * captured at setConfig() time so a previous call's hook clone (mutated
         * below) does not carry over. */ ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
                ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
            } else _parseConfig(cfg);
            /* Clone the hook-mutable allowlists before the walk whenever an
       * uponSanitize* hook is registered. The hook event exposes ALLOWED_TAGS
       * and ALLOWED_ATTR by reference (as allowedTags / allowedAttributes), so
       * a hook that widens them would otherwise mutate the shared set
       * permanently: across later calls and across every element. Cloning per
       * walk keeps documented in-call widening working while scoping it to the
       * call. A single guard for both config paths - the per-call path rebinds
       * the sets in _parseConfig each call, the persistent path restores them
       * from the captured bindings just above - so the two cannot diverge. */ if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
            if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
            /* Clean up removed elements */ DOMPurify.removed = [];
            /* Resolve IN_PLACE for this call without mutating persistent config.
         Writing the IN_PLACE closure variable here leaks under setConfig(),
         where _parseConfig is skipped on later calls: a single string call would
         disable in-place mode for every subsequent node call, returning a
         sanitized copy while leaving the caller's node — which in-place callers
         keep using and whose return value they ignore — unsanitized. REPORT-2. */ const inPlace = IN_PLACE && typeof dirty !== 'string' && _isNode(dirty);
            if (inPlace) {
                /* Do some early pre-sanitization to avoid unsafe root nodes.
           Read nodeName through the cached prototype getter — a clobbering
           child named "nodeName" on the form root would otherwise shadow
           the property and let this check skip the root-allowlist
           validation entirely. */ const nn = getNodeName ? getNodeName(dirty) : dirty.nodeName;
                if (typeof nn === 'string') {
                    const tagName = transformCaseFunc(nn);
                    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
                }
                /* Pre-flight the root through _isClobbered. The iterator-driven
           removal path can not detach a parent-less root: _forceRemove
           falls through to Element.prototype.remove(), which per spec
           is a no-op on a node with no parent. A clobbered root would
           then survive the main loop with its attributes uninspected,
           because _sanitizeAttributes early-returns on _isClobbered. The
           result would be an attacker-controlled form, complete with any
           event-handler attributes the caller passed in, handed back to
           the application unsanitized. Refuse to sanitize such a root
           the same way we refuse a forbidden tag. GHSA-r47g-fvhr-h676. */ if (_isClobbered(dirty)) throw typeErrorCreate('root node is clobbered and cannot be sanitized in-place');
                /* Sanitize attached shadow roots before the main iterator runs.
           The iterator does not descend into shadow trees. Same fail-closed
           barrier as the main walk (campaign-3 F2): a custom-element reaction
           inside a shadow root could abort this pre-pass before the walk runs,
           which would otherwise leave the entire live tree unsanitized. */ try {
                    _sanitizeAttachedShadowRoots(dirty);
                } catch (error) {
                    _neutralizeRoot(dirty);
                    throw error;
                }
            } else if (_isNode(dirty)) {
                /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */ body = _initDocument('<!---->');
                importedNode = body.ownerDocument.importNode(dirty, true);
                if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') /* Node is already a body, use as is */ body = importedNode;
                else if (importedNode.nodeName === 'HTML') body = importedNode;
                else // eslint-disable-next-line unicorn/prefer-dom-node-append
                body.appendChild(importedNode);
                /* Clonable shadow roots are deep-cloned by importNode(); sanitize
           them before the main iterator runs, since the iterator does not
           descend into shadow trees. The walk routes every read through a
           cached prototype getter so clobbering descendants on a form root
           cannot hide a shadow host from this pass. */ _sanitizeAttachedShadowRoots(importedNode);
            } else {
                /* Exit directly if we have nothing to do */ if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
                dirty.indexOf('<') === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
                /* Initialize the document to work on */ body = _initDocument(dirty);
                /* Check we have a DOM node from the data */ if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
            }
            /* Remove first element node (ours) if FORCE_BODY is set */ if (body && FORCE_BODY) _forceRemove(body.firstChild);
            /* Get node iterator */ const nodeIterator = _createNodeIterator(inPlace ? dirty : body);
            /* Now start iterating over the created document.
         The walk runs inside an exception barrier (campaign-3 F2): a re-entrant
         engine/custom-element mutation can detach a node mid-walk so
         `_forceRemove`'s parentless guard throws, aborting the loop. Without the
         barrier the caller's in-place tree would be left half-sanitized with the
         unvisited tail still armed. On any throw we fail closed — strip the
         in-place root bare — then rethrow so the existing throw contract is
         preserved. (String/DOM-copy paths never return the partial body, so the
         propagating throw is already fail-closed there.) */ try {
                while(currentNode = nodeIterator.nextNode()){
                    /* Sanitize tags and elements */ _sanitizeElements(currentNode);
                    /* Check attributes next */ _sanitizeAttributes(currentNode);
                    /* Shadow DOM detected, sanitize it.
             Realm-safe check (GHSA-hpcv-96wg-7vj8): nodeType-based detection
             instead of instanceof, so foreign-realm <template>.content is
             walked correctly. */ if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
                }
            } catch (error) {
                if (inPlace) _neutralizeRoot(dirty);
                throw error;
            }
            /* If we sanitized `dirty` in-place, return it. */ if (inPlace) {
                /* Fail-closed completion of the audit-5 F1 fix: every node removed from
           the caller's live tree is detached but may still hold a queued
           resource-event handler that fires in page scope after we return. The
           move-hoist covers only disallowed-tag KEEP_CONTENT removals; strip the
           non-allow-listed attributes off every other removed subtree (clobber,
           mXSS, namespace, comments, KEEP_CONTENT:false, …) so those handlers are
           cancelled before any event can fire. Runs synchronously, pre-return. */ arrayForEach(DOMPurify.removed, (entry)=>{
                    if (entry.element) _neutralizeSubtree(entry.element);
                });
                if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
                return dirty;
            }
            /* Return sanitized string or DOM */ if (RETURN_DOM) {
                if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
                if (RETURN_DOM_FRAGMENT) {
                    returnNode = createDocumentFragment.call(body.ownerDocument);
                    while(body.firstChild)// eslint-disable-next-line unicorn/prefer-dom-node-append
                    returnNode.appendChild(body.firstChild);
                } else returnNode = body;
                if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */ returnNode = importNode.call(originalDocument, returnNode, true);
                return returnNode;
            }
            let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
            /* Serialize doctype if allowed */ if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
            /* Sanitize final string template-safe */ if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _parseConfig(cfg);
            SET_CONFIG = true;
            SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
            SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
        };
        DOMPurify.clearConfig = function() {
            CONFIG = null;
            SET_CONFIG = false;
            SET_CONFIG_ALLOWED_TAGS = null;
            SET_CONFIG_ALLOWED_ATTR = null;
            // Drop any caller-supplied Trusted Types policy so it cannot poison later
            // `RETURN_TRUSTED_TYPE` output. The internal default policy (cached, and
            // never recreated — Trusted Types throws on duplicate names) is restored by
            // the next `_parseConfig`. See GHSA-vxr8-fq34-vvx9.
            trustedTypesPolicy = defaultTrustedTypesPolicy;
            emptyHTML = '';
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
            /* Initialize shared config vars if necessary. */ if (!CONFIG) _parseConfig({});
            const lcTag = transformCaseFunc(tag);
            const lcName = transformCaseFunc(attr);
            return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
            if (typeof hookFunction !== 'function') return;
            /* Reject unknown entry points. Without this, a non-hook key (e.g.
       * '__proto__') indexes off the prototype chain rather than a real
       * hook array, and arrayPush then writes to Object.prototype. Guard
       * with an own-property check against the known hook names. */ if (!objectHasOwnProperty(hooks, entryPoint)) return;
            arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint, hookFunction) {
            if (!objectHasOwnProperty(hooks, entryPoint)) return undefined;
            if (hookFunction !== undefined) {
                const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
                return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
            }
            return arrayPop(hooks[entryPoint]);
        };
        DOMPurify.removeHooks = function(entryPoint) {
            if (!objectHasOwnProperty(hooks, entryPoint)) return;
            hooks[entryPoint] = [];
        };
        DOMPurify.removeAllHooks = function() {
            hooks = _createHooksMap();
        };
        return DOMPurify;
    }
    var purify = createDOMPurify();
    return purify;
});

},{}]},["e7zem"], null, "parcelRequire55b0", {})

//# sourceMappingURL=purify.f659f139.js.map
