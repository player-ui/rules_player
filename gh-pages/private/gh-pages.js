var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/y18n@5.0.8/node_modules/y18n/build/index.cjs
var require_build = __commonJS({
  "node_modules/.pnpm/y18n@5.0.8/node_modules/y18n/build/index.cjs"(exports2, module2) {
    "use strict";
    var fs12 = require("fs");
    var util = require("util");
    var path9 = require("path");
    var shim2;
    var Y18N2 = class {
      constructor(opts) {
        opts = opts || {};
        this.directory = opts.directory || "./locales";
        this.updateFiles = typeof opts.updateFiles === "boolean" ? opts.updateFiles : true;
        this.locale = opts.locale || "en";
        this.fallbackToLanguage = typeof opts.fallbackToLanguage === "boolean" ? opts.fallbackToLanguage : true;
        this.cache = /* @__PURE__ */ Object.create(null);
        this.writeQueue = [];
      }
      __(...args) {
        if (typeof arguments[0] !== "string") {
          return this._taggedLiteral(arguments[0], ...arguments);
        }
        const str = args.shift();
        let cb = function() {
        };
        if (typeof args[args.length - 1] === "function")
          cb = args.pop();
        cb = cb || function() {
        };
        if (!this.cache[this.locale])
          this._readLocaleFile();
        if (!this.cache[this.locale][str] && this.updateFiles) {
          this.cache[this.locale][str] = str;
          this._enqueueWrite({
            directory: this.directory,
            locale: this.locale,
            cb
          });
        } else {
          cb();
        }
        return shim2.format.apply(shim2.format, [this.cache[this.locale][str] || str].concat(args));
      }
      __n() {
        const args = Array.prototype.slice.call(arguments);
        const singular = args.shift();
        const plural = args.shift();
        const quantity = args.shift();
        let cb = function() {
        };
        if (typeof args[args.length - 1] === "function")
          cb = args.pop();
        if (!this.cache[this.locale])
          this._readLocaleFile();
        let str = quantity === 1 ? singular : plural;
        if (this.cache[this.locale][singular]) {
          const entry = this.cache[this.locale][singular];
          str = entry[quantity === 1 ? "one" : "other"];
        }
        if (!this.cache[this.locale][singular] && this.updateFiles) {
          this.cache[this.locale][singular] = {
            one: singular,
            other: plural
          };
          this._enqueueWrite({
            directory: this.directory,
            locale: this.locale,
            cb
          });
        } else {
          cb();
        }
        const values = [str];
        if (~str.indexOf("%d"))
          values.push(quantity);
        return shim2.format.apply(shim2.format, values.concat(args));
      }
      setLocale(locale) {
        this.locale = locale;
      }
      getLocale() {
        return this.locale;
      }
      updateLocale(obj) {
        if (!this.cache[this.locale])
          this._readLocaleFile();
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            this.cache[this.locale][key] = obj[key];
          }
        }
      }
      _taggedLiteral(parts, ...args) {
        let str = "";
        parts.forEach(function(part, i) {
          const arg = args[i + 1];
          str += part;
          if (typeof arg !== "undefined") {
            str += "%s";
          }
        });
        return this.__.apply(this, [str].concat([].slice.call(args, 1)));
      }
      _enqueueWrite(work) {
        this.writeQueue.push(work);
        if (this.writeQueue.length === 1)
          this._processWriteQueue();
      }
      _processWriteQueue() {
        const _this = this;
        const work = this.writeQueue[0];
        const directory = work.directory;
        const locale = work.locale;
        const cb = work.cb;
        const languageFile = this._resolveLocaleFile(directory, locale);
        const serializedLocale = JSON.stringify(this.cache[locale], null, 2);
        shim2.fs.writeFile(languageFile, serializedLocale, "utf-8", function(err) {
          _this.writeQueue.shift();
          if (_this.writeQueue.length > 0)
            _this._processWriteQueue();
          cb(err);
        });
      }
      _readLocaleFile() {
        let localeLookup = {};
        const languageFile = this._resolveLocaleFile(this.directory, this.locale);
        try {
          if (shim2.fs.readFileSync) {
            localeLookup = JSON.parse(shim2.fs.readFileSync(languageFile, "utf-8"));
          }
        } catch (err) {
          if (err instanceof SyntaxError) {
            err.message = "syntax error in " + languageFile;
          }
          if (err.code === "ENOENT")
            localeLookup = {};
          else
            throw err;
        }
        this.cache[this.locale] = localeLookup;
      }
      _resolveLocaleFile(directory, locale) {
        let file = shim2.resolve(directory, "./", locale + ".json");
        if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf("_")) {
          const languageFile = shim2.resolve(directory, "./", locale.split("_")[0] + ".json");
          if (this._fileExistsSync(languageFile))
            file = languageFile;
        }
        return file;
      }
      _fileExistsSync(file) {
        return shim2.exists(file);
      }
    };
    function y18n$1(opts, _shim) {
      shim2 = _shim;
      const y18n4 = new Y18N2(opts);
      return {
        __: y18n4.__.bind(y18n4),
        __n: y18n4.__n.bind(y18n4),
        setLocale: y18n4.setLocale.bind(y18n4),
        getLocale: y18n4.getLocale.bind(y18n4),
        updateLocale: y18n4.updateLocale.bind(y18n4),
        locale: y18n4.locale
      };
    }
    var nodePlatformShim = {
      fs: {
        readFileSync: fs12.readFileSync,
        writeFile: fs12.writeFile
      },
      format: util.format,
      resolve: path9.resolve,
      exists: (file) => {
        try {
          return fs12.statSync(file).isFile();
        } catch (err) {
          return false;
        }
      }
    };
    var y18n3 = (opts) => {
      return y18n$1(opts, nodePlatformShim);
    };
    module2.exports = y18n3;
  }
});

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/index.cjs
var require_build2 = __commonJS({
  "node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/index.cjs"(exports2, module2) {
    "use strict";
    var util = require("util");
    var path9 = require("path");
    var fs12 = require("fs");
    function camelCase2(str) {
      const isCamelCase = str !== str.toLowerCase() && str !== str.toUpperCase();
      if (!isCamelCase) {
        str = str.toLowerCase();
      }
      if (str.indexOf("-") === -1 && str.indexOf("_") === -1) {
        return str;
      } else {
        let camelcase = "";
        let nextChrUpper = false;
        const leadingHyphens = str.match(/^-+/);
        for (let i = leadingHyphens ? leadingHyphens[0].length : 0; i < str.length; i++) {
          let chr = str.charAt(i);
          if (nextChrUpper) {
            nextChrUpper = false;
            chr = chr.toUpperCase();
          }
          if (i !== 0 && (chr === "-" || chr === "_")) {
            nextChrUpper = true;
          } else if (chr !== "-" && chr !== "_") {
            camelcase += chr;
          }
        }
        return camelcase;
      }
    }
    function decamelize2(str, joinString) {
      const lowercase = str.toLowerCase();
      joinString = joinString || "-";
      let notCamelcase = "";
      for (let i = 0; i < str.length; i++) {
        const chrLower = lowercase.charAt(i);
        const chrString = str.charAt(i);
        if (chrLower !== chrString && i > 0) {
          notCamelcase += `${joinString}${lowercase.charAt(i)}`;
        } else {
          notCamelcase += chrString;
        }
      }
      return notCamelcase;
    }
    function looksLikeNumber2(x) {
      if (x === null || x === void 0)
        return false;
      if (typeof x === "number")
        return true;
      if (/^0x[0-9a-f]+$/i.test(x))
        return true;
      if (/^0[^.]/.test(x))
        return false;
      return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function tokenizeArgString2(argString) {
      if (Array.isArray(argString)) {
        return argString.map((e) => typeof e !== "string" ? e + "" : e);
      }
      argString = argString.trim();
      let i = 0;
      let prevC = null;
      let c = null;
      let opening = null;
      const args = [];
      for (let ii = 0; ii < argString.length; ii++) {
        prevC = c;
        c = argString.charAt(ii);
        if (c === " " && !opening) {
          if (!(prevC === " ")) {
            i++;
          }
          continue;
        }
        if (c === opening) {
          opening = null;
        } else if ((c === "'" || c === '"') && !opening) {
          opening = c;
        }
        if (!args[i])
          args[i] = "";
        args[i] += c;
      }
      return args;
    }
    var DefaultValuesForTypeKey2;
    (function(DefaultValuesForTypeKey3) {
      DefaultValuesForTypeKey3["BOOLEAN"] = "boolean";
      DefaultValuesForTypeKey3["STRING"] = "string";
      DefaultValuesForTypeKey3["NUMBER"] = "number";
      DefaultValuesForTypeKey3["ARRAY"] = "array";
    })(DefaultValuesForTypeKey2 || (DefaultValuesForTypeKey2 = {}));
    var mixin3;
    var YargsParser2 = class {
      constructor(_mixin) {
        mixin3 = _mixin;
      }
      parse(argsInput, options) {
        const opts = Object.assign({
          alias: void 0,
          array: void 0,
          boolean: void 0,
          config: void 0,
          configObjects: void 0,
          configuration: void 0,
          coerce: void 0,
          count: void 0,
          default: void 0,
          envPrefix: void 0,
          narg: void 0,
          normalize: void 0,
          string: void 0,
          number: void 0,
          __: void 0,
          key: void 0
        }, options);
        const args = tokenizeArgString2(argsInput);
        const inputIsString = typeof argsInput === "string";
        const aliases = combineAliases2(Object.assign(/* @__PURE__ */ Object.create(null), opts.alias));
        const configuration = Object.assign({
          "boolean-negation": true,
          "camel-case-expansion": true,
          "combine-arrays": false,
          "dot-notation": true,
          "duplicate-arguments-array": true,
          "flatten-duplicate-arrays": true,
          "greedy-arrays": true,
          "halt-at-non-option": false,
          "nargs-eats-options": false,
          "negation-prefix": "no-",
          "parse-numbers": true,
          "parse-positional-numbers": true,
          "populate--": false,
          "set-placeholder-key": false,
          "short-option-groups": true,
          "strip-aliased": false,
          "strip-dashed": false,
          "unknown-options-as-args": false
        }, opts.configuration);
        const defaults = Object.assign(/* @__PURE__ */ Object.create(null), opts.default);
        const configObjects = opts.configObjects || [];
        const envPrefix = opts.envPrefix;
        const notFlagsOption = configuration["populate--"];
        const notFlagsArgv = notFlagsOption ? "--" : "_";
        const newAliases = /* @__PURE__ */ Object.create(null);
        const defaulted = /* @__PURE__ */ Object.create(null);
        const __ = opts.__ || mixin3.format;
        const flags = {
          aliases: /* @__PURE__ */ Object.create(null),
          arrays: /* @__PURE__ */ Object.create(null),
          bools: /* @__PURE__ */ Object.create(null),
          strings: /* @__PURE__ */ Object.create(null),
          numbers: /* @__PURE__ */ Object.create(null),
          counts: /* @__PURE__ */ Object.create(null),
          normalize: /* @__PURE__ */ Object.create(null),
          configs: /* @__PURE__ */ Object.create(null),
          nargs: /* @__PURE__ */ Object.create(null),
          coercions: /* @__PURE__ */ Object.create(null),
          keys: []
        };
        const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
        const negatedBoolean = new RegExp("^--" + configuration["negation-prefix"] + "(.+)");
        [].concat(opts.array || []).filter(Boolean).forEach(function(opt) {
          const key = typeof opt === "object" ? opt.key : opt;
          const assignment = Object.keys(opt).map(function(key2) {
            const arrayFlagKeys = {
              boolean: "bools",
              string: "strings",
              number: "numbers"
            };
            return arrayFlagKeys[key2];
          }).filter(Boolean).pop();
          if (assignment) {
            flags[assignment][key] = true;
          }
          flags.arrays[key] = true;
          flags.keys.push(key);
        });
        [].concat(opts.boolean || []).filter(Boolean).forEach(function(key) {
          flags.bools[key] = true;
          flags.keys.push(key);
        });
        [].concat(opts.string || []).filter(Boolean).forEach(function(key) {
          flags.strings[key] = true;
          flags.keys.push(key);
        });
        [].concat(opts.number || []).filter(Boolean).forEach(function(key) {
          flags.numbers[key] = true;
          flags.keys.push(key);
        });
        [].concat(opts.count || []).filter(Boolean).forEach(function(key) {
          flags.counts[key] = true;
          flags.keys.push(key);
        });
        [].concat(opts.normalize || []).filter(Boolean).forEach(function(key) {
          flags.normalize[key] = true;
          flags.keys.push(key);
        });
        if (typeof opts.narg === "object") {
          Object.entries(opts.narg).forEach(([key, value]) => {
            if (typeof value === "number") {
              flags.nargs[key] = value;
              flags.keys.push(key);
            }
          });
        }
        if (typeof opts.coerce === "object") {
          Object.entries(opts.coerce).forEach(([key, value]) => {
            if (typeof value === "function") {
              flags.coercions[key] = value;
              flags.keys.push(key);
            }
          });
        }
        if (typeof opts.config !== "undefined") {
          if (Array.isArray(opts.config) || typeof opts.config === "string") {
            [].concat(opts.config).filter(Boolean).forEach(function(key) {
              flags.configs[key] = true;
            });
          } else if (typeof opts.config === "object") {
            Object.entries(opts.config).forEach(([key, value]) => {
              if (typeof value === "boolean" || typeof value === "function") {
                flags.configs[key] = value;
              }
            });
          }
        }
        extendAliases(opts.key, aliases, opts.default, flags.arrays);
        Object.keys(defaults).forEach(function(key) {
          (flags.aliases[key] || []).forEach(function(alias) {
            defaults[alias] = defaults[key];
          });
        });
        let error = null;
        checkConfiguration();
        let notFlags = [];
        const argv = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] });
        const argvReturn = {};
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          const truncatedArg = arg.replace(/^-{3,}/, "---");
          let broken;
          let key;
          let letters;
          let m;
          let next;
          let value;
          if (arg !== "--" && /^-/.test(arg) && isUnknownOptionAsArg(arg)) {
            pushPositional(arg);
          } else if (truncatedArg.match(/^---+(=|$)/)) {
            pushPositional(arg);
            continue;
          } else if (arg.match(/^--.+=/) || !configuration["short-option-groups"] && arg.match(/^-.+=/)) {
            m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
            if (m !== null && Array.isArray(m) && m.length >= 3) {
              if (checkAllAliases(m[1], flags.arrays)) {
                i = eatArray(i, m[1], args, m[2]);
              } else if (checkAllAliases(m[1], flags.nargs) !== false) {
                i = eatNargs(i, m[1], args, m[2]);
              } else {
                setArg(m[1], m[2], true);
              }
            }
          } else if (arg.match(negatedBoolean) && configuration["boolean-negation"]) {
            m = arg.match(negatedBoolean);
            if (m !== null && Array.isArray(m) && m.length >= 2) {
              key = m[1];
              setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
            }
          } else if (arg.match(/^--.+/) || !configuration["short-option-groups"] && arg.match(/^-[^-]+/)) {
            m = arg.match(/^--?(.+)/);
            if (m !== null && Array.isArray(m) && m.length >= 2) {
              key = m[1];
              if (checkAllAliases(key, flags.arrays)) {
                i = eatArray(i, key, args);
              } else if (checkAllAliases(key, flags.nargs) !== false) {
                i = eatNargs(i, key, args);
              } else {
                next = args[i + 1];
                if (next !== void 0 && (!next.match(/^-/) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
                  setArg(key, next);
                  i++;
                } else if (/^(true|false)$/.test(next)) {
                  setArg(key, next);
                  i++;
                } else {
                  setArg(key, defaultValue(key));
                }
              }
            }
          } else if (arg.match(/^-.\..+=/)) {
            m = arg.match(/^-([^=]+)=([\s\S]*)$/);
            if (m !== null && Array.isArray(m) && m.length >= 3) {
              setArg(m[1], m[2]);
            }
          } else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
            next = args[i + 1];
            m = arg.match(/^-(.\..+)/);
            if (m !== null && Array.isArray(m) && m.length >= 2) {
              key = m[1];
              if (next !== void 0 && !next.match(/^-/) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
                setArg(key, next);
                i++;
              } else {
                setArg(key, defaultValue(key));
              }
            }
          } else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
            letters = arg.slice(1, -1).split("");
            broken = false;
            for (let j = 0; j < letters.length; j++) {
              next = arg.slice(j + 2);
              if (letters[j + 1] && letters[j + 1] === "=") {
                value = arg.slice(j + 3);
                key = letters[j];
                if (checkAllAliases(key, flags.arrays)) {
                  i = eatArray(i, key, args, value);
                } else if (checkAllAliases(key, flags.nargs) !== false) {
                  i = eatNargs(i, key, args, value);
                } else {
                  setArg(key, value);
                }
                broken = true;
                break;
              }
              if (next === "-") {
                setArg(letters[j], next);
                continue;
              }
              if (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) && checkAllAliases(next, flags.bools) === false) {
                setArg(letters[j], next);
                broken = true;
                break;
              }
              if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                setArg(letters[j], next);
                broken = true;
                break;
              } else {
                setArg(letters[j], defaultValue(letters[j]));
              }
            }
            key = arg.slice(-1)[0];
            if (!broken && key !== "-") {
              if (checkAllAliases(key, flags.arrays)) {
                i = eatArray(i, key, args);
              } else if (checkAllAliases(key, flags.nargs) !== false) {
                i = eatNargs(i, key, args);
              } else {
                next = args[i + 1];
                if (next !== void 0 && (!/^(-|--)[^-]/.test(next) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
                  setArg(key, next);
                  i++;
                } else if (/^(true|false)$/.test(next)) {
                  setArg(key, next);
                  i++;
                } else {
                  setArg(key, defaultValue(key));
                }
              }
            }
          } else if (arg.match(/^-[0-9]$/) && arg.match(negative) && checkAllAliases(arg.slice(1), flags.bools)) {
            key = arg.slice(1);
            setArg(key, defaultValue(key));
          } else if (arg === "--") {
            notFlags = args.slice(i + 1);
            break;
          } else if (configuration["halt-at-non-option"]) {
            notFlags = args.slice(i);
            break;
          } else {
            pushPositional(arg);
          }
        }
        applyEnvVars(argv, true);
        applyEnvVars(argv, false);
        setConfig(argv);
        setConfigObjects();
        applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
        applyCoercions(argv);
        if (configuration["set-placeholder-key"])
          setPlaceholderKeys(argv);
        Object.keys(flags.counts).forEach(function(key) {
          if (!hasKey(argv, key.split(".")))
            setArg(key, 0);
        });
        if (notFlagsOption && notFlags.length)
          argv[notFlagsArgv] = [];
        notFlags.forEach(function(key) {
          argv[notFlagsArgv].push(key);
        });
        if (configuration["camel-case-expansion"] && configuration["strip-dashed"]) {
          Object.keys(argv).filter((key) => key !== "--" && key.includes("-")).forEach((key) => {
            delete argv[key];
          });
        }
        if (configuration["strip-aliased"]) {
          [].concat(...Object.keys(aliases).map((k) => aliases[k])).forEach((alias) => {
            if (configuration["camel-case-expansion"] && alias.includes("-")) {
              delete argv[alias.split(".").map((prop) => camelCase2(prop)).join(".")];
            }
            delete argv[alias];
          });
        }
        function pushPositional(arg) {
          const maybeCoercedNumber = maybeCoerceNumber("_", arg);
          if (typeof maybeCoercedNumber === "string" || typeof maybeCoercedNumber === "number") {
            argv._.push(maybeCoercedNumber);
          }
        }
        function eatNargs(i, key, args2, argAfterEqualSign) {
          let ii;
          let toEat = checkAllAliases(key, flags.nargs);
          toEat = typeof toEat !== "number" || isNaN(toEat) ? 1 : toEat;
          if (toEat === 0) {
            if (!isUndefined(argAfterEqualSign)) {
              error = Error(__("Argument unexpected for: %s", key));
            }
            setArg(key, defaultValue(key));
            return i;
          }
          let available = isUndefined(argAfterEqualSign) ? 0 : 1;
          if (configuration["nargs-eats-options"]) {
            if (args2.length - (i + 1) + available < toEat) {
              error = Error(__("Not enough arguments following: %s", key));
            }
            available = toEat;
          } else {
            for (ii = i + 1; ii < args2.length; ii++) {
              if (!args2[ii].match(/^-[^0-9]/) || args2[ii].match(negative) || isUnknownOptionAsArg(args2[ii]))
                available++;
              else
                break;
            }
            if (available < toEat)
              error = Error(__("Not enough arguments following: %s", key));
          }
          let consumed = Math.min(available, toEat);
          if (!isUndefined(argAfterEqualSign) && consumed > 0) {
            setArg(key, argAfterEqualSign);
            consumed--;
          }
          for (ii = i + 1; ii < consumed + i + 1; ii++) {
            setArg(key, args2[ii]);
          }
          return i + consumed;
        }
        function eatArray(i, key, args2, argAfterEqualSign) {
          let argsToSet = [];
          let next = argAfterEqualSign || args2[i + 1];
          const nargsCount = checkAllAliases(key, flags.nargs);
          if (checkAllAliases(key, flags.bools) && !/^(true|false)$/.test(next)) {
            argsToSet.push(true);
          } else if (isUndefined(next) || isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next)) {
            if (defaults[key] !== void 0) {
              const defVal = defaults[key];
              argsToSet = Array.isArray(defVal) ? defVal : [defVal];
            }
          } else {
            if (!isUndefined(argAfterEqualSign)) {
              argsToSet.push(processValue(key, argAfterEqualSign, true));
            }
            for (let ii = i + 1; ii < args2.length; ii++) {
              if (!configuration["greedy-arrays"] && argsToSet.length > 0 || nargsCount && typeof nargsCount === "number" && argsToSet.length >= nargsCount)
                break;
              next = args2[ii];
              if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
                break;
              i = ii;
              argsToSet.push(processValue(key, next, inputIsString));
            }
          }
          if (typeof nargsCount === "number" && (nargsCount && argsToSet.length < nargsCount || isNaN(nargsCount) && argsToSet.length === 0)) {
            error = Error(__("Not enough arguments following: %s", key));
          }
          setArg(key, argsToSet);
          return i;
        }
        function setArg(key, val, shouldStripQuotes = inputIsString) {
          if (/-/.test(key) && configuration["camel-case-expansion"]) {
            const alias = key.split(".").map(function(prop) {
              return camelCase2(prop);
            }).join(".");
            addNewAlias(key, alias);
          }
          const value = processValue(key, val, shouldStripQuotes);
          const splitKey = key.split(".");
          setKey(argv, splitKey, value);
          if (flags.aliases[key]) {
            flags.aliases[key].forEach(function(x) {
              const keyProperties = x.split(".");
              setKey(argv, keyProperties, value);
            });
          }
          if (splitKey.length > 1 && configuration["dot-notation"]) {
            (flags.aliases[splitKey[0]] || []).forEach(function(x) {
              let keyProperties = x.split(".");
              const a = [].concat(splitKey);
              a.shift();
              keyProperties = keyProperties.concat(a);
              if (!(flags.aliases[key] || []).includes(keyProperties.join("."))) {
                setKey(argv, keyProperties, value);
              }
            });
          }
          if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
            const keys = [key].concat(flags.aliases[key] || []);
            keys.forEach(function(key2) {
              Object.defineProperty(argvReturn, key2, {
                enumerable: true,
                get() {
                  return val;
                },
                set(value2) {
                  val = typeof value2 === "string" ? mixin3.normalize(value2) : value2;
                }
              });
            });
          }
        }
        function addNewAlias(key, alias) {
          if (!(flags.aliases[key] && flags.aliases[key].length)) {
            flags.aliases[key] = [alias];
            newAliases[alias] = true;
          }
          if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
            addNewAlias(alias, key);
          }
        }
        function processValue(key, val, shouldStripQuotes) {
          if (shouldStripQuotes) {
            val = stripQuotes2(val);
          }
          if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
            if (typeof val === "string")
              val = val === "true";
          }
          let value = Array.isArray(val) ? val.map(function(v) {
            return maybeCoerceNumber(key, v);
          }) : maybeCoerceNumber(key, val);
          if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === "boolean")) {
            value = increment2();
          }
          if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
            if (Array.isArray(val))
              value = val.map((val2) => {
                return mixin3.normalize(val2);
              });
            else
              value = mixin3.normalize(val);
          }
          return value;
        }
        function maybeCoerceNumber(key, value) {
          if (!configuration["parse-positional-numbers"] && key === "_")
            return value;
          if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
            const shouldCoerceNumber = looksLikeNumber2(value) && configuration["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${value}`)));
            if (shouldCoerceNumber || !isUndefined(value) && checkAllAliases(key, flags.numbers)) {
              value = Number(value);
            }
          }
          return value;
        }
        function setConfig(argv2) {
          const configLookup = /* @__PURE__ */ Object.create(null);
          applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
          Object.keys(flags.configs).forEach(function(configKey) {
            const configPath = argv2[configKey] || configLookup[configKey];
            if (configPath) {
              try {
                let config = null;
                const resolvedConfigPath = mixin3.resolve(mixin3.cwd(), configPath);
                const resolveConfig = flags.configs[configKey];
                if (typeof resolveConfig === "function") {
                  try {
                    config = resolveConfig(resolvedConfigPath);
                  } catch (e) {
                    config = e;
                  }
                  if (config instanceof Error) {
                    error = config;
                    return;
                  }
                } else {
                  config = mixin3.require(resolvedConfigPath);
                }
                setConfigObject(config);
              } catch (ex) {
                if (ex.name === "PermissionDenied")
                  error = ex;
                else if (argv2[configKey])
                  error = Error(__("Invalid JSON config file: %s", configPath));
              }
            }
          });
        }
        function setConfigObject(config, prev) {
          Object.keys(config).forEach(function(key) {
            const value = config[key];
            const fullKey = prev ? prev + "." + key : key;
            if (typeof value === "object" && value !== null && !Array.isArray(value) && configuration["dot-notation"]) {
              setConfigObject(value, fullKey);
            } else {
              if (!hasKey(argv, fullKey.split(".")) || checkAllAliases(fullKey, flags.arrays) && configuration["combine-arrays"]) {
                setArg(fullKey, value);
              }
            }
          });
        }
        function setConfigObjects() {
          if (typeof configObjects !== "undefined") {
            configObjects.forEach(function(configObject) {
              setConfigObject(configObject);
            });
          }
        }
        function applyEnvVars(argv2, configOnly) {
          if (typeof envPrefix === "undefined")
            return;
          const prefix = typeof envPrefix === "string" ? envPrefix : "";
          const env3 = mixin3.env();
          Object.keys(env3).forEach(function(envVar) {
            if (prefix === "" || envVar.lastIndexOf(prefix, 0) === 0) {
              const keys = envVar.split("__").map(function(key, i) {
                if (i === 0) {
                  key = key.substring(prefix.length);
                }
                return camelCase2(key);
              });
              if ((configOnly && flags.configs[keys.join(".")] || !configOnly) && !hasKey(argv2, keys)) {
                setArg(keys.join("."), env3[envVar]);
              }
            }
          });
        }
        function applyCoercions(argv2) {
          let coerce;
          const applied = /* @__PURE__ */ new Set();
          Object.keys(argv2).forEach(function(key) {
            if (!applied.has(key)) {
              coerce = checkAllAliases(key, flags.coercions);
              if (typeof coerce === "function") {
                try {
                  const value = maybeCoerceNumber(key, coerce(argv2[key]));
                  [].concat(flags.aliases[key] || [], key).forEach((ali) => {
                    applied.add(ali);
                    argv2[ali] = value;
                  });
                } catch (err) {
                  error = err;
                }
              }
            }
          });
        }
        function setPlaceholderKeys(argv2) {
          flags.keys.forEach((key) => {
            if (~key.indexOf("."))
              return;
            if (typeof argv2[key] === "undefined")
              argv2[key] = void 0;
          });
          return argv2;
        }
        function applyDefaultsAndAliases(obj, aliases2, defaults2, canLog = false) {
          Object.keys(defaults2).forEach(function(key) {
            if (!hasKey(obj, key.split("."))) {
              setKey(obj, key.split("."), defaults2[key]);
              if (canLog)
                defaulted[key] = true;
              (aliases2[key] || []).forEach(function(x) {
                if (hasKey(obj, x.split(".")))
                  return;
                setKey(obj, x.split("."), defaults2[key]);
              });
            }
          });
        }
        function hasKey(obj, keys) {
          let o = obj;
          if (!configuration["dot-notation"])
            keys = [keys.join(".")];
          keys.slice(0, -1).forEach(function(key2) {
            o = o[key2] || {};
          });
          const key = keys[keys.length - 1];
          if (typeof o !== "object")
            return false;
          else
            return key in o;
        }
        function setKey(obj, keys, value) {
          let o = obj;
          if (!configuration["dot-notation"])
            keys = [keys.join(".")];
          keys.slice(0, -1).forEach(function(key2) {
            key2 = sanitizeKey2(key2);
            if (typeof o === "object" && o[key2] === void 0) {
              o[key2] = {};
            }
            if (typeof o[key2] !== "object" || Array.isArray(o[key2])) {
              if (Array.isArray(o[key2])) {
                o[key2].push({});
              } else {
                o[key2] = [o[key2], {}];
              }
              o = o[key2][o[key2].length - 1];
            } else {
              o = o[key2];
            }
          });
          const key = sanitizeKey2(keys[keys.length - 1]);
          const isTypeArray = checkAllAliases(keys.join("."), flags.arrays);
          const isValueArray = Array.isArray(value);
          let duplicate = configuration["duplicate-arguments-array"];
          if (!duplicate && checkAllAliases(key, flags.nargs)) {
            duplicate = true;
            if (!isUndefined(o[key]) && flags.nargs[key] === 1 || Array.isArray(o[key]) && o[key].length === flags.nargs[key]) {
              o[key] = void 0;
            }
          }
          if (value === increment2()) {
            o[key] = increment2(o[key]);
          } else if (Array.isArray(o[key])) {
            if (duplicate && isTypeArray && isValueArray) {
              o[key] = configuration["flatten-duplicate-arrays"] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
            } else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
              o[key] = value;
            } else {
              o[key] = o[key].concat([value]);
            }
          } else if (o[key] === void 0 && isTypeArray) {
            o[key] = isValueArray ? value : [value];
          } else if (duplicate && !(o[key] === void 0 || checkAllAliases(key, flags.counts) || checkAllAliases(key, flags.bools))) {
            o[key] = [o[key], value];
          } else {
            o[key] = value;
          }
        }
        function extendAliases(...args2) {
          args2.forEach(function(obj) {
            Object.keys(obj || {}).forEach(function(key) {
              if (flags.aliases[key])
                return;
              flags.aliases[key] = [].concat(aliases[key] || []);
              flags.aliases[key].concat(key).forEach(function(x) {
                if (/-/.test(x) && configuration["camel-case-expansion"]) {
                  const c = camelCase2(x);
                  if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                    flags.aliases[key].push(c);
                    newAliases[c] = true;
                  }
                }
              });
              flags.aliases[key].concat(key).forEach(function(x) {
                if (x.length > 1 && /[A-Z]/.test(x) && configuration["camel-case-expansion"]) {
                  const c = decamelize2(x, "-");
                  if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                    flags.aliases[key].push(c);
                    newAliases[c] = true;
                  }
                }
              });
              flags.aliases[key].forEach(function(x) {
                flags.aliases[x] = [key].concat(flags.aliases[key].filter(function(y) {
                  return x !== y;
                }));
              });
            });
          });
        }
        function checkAllAliases(key, flag) {
          const toCheck = [].concat(flags.aliases[key] || [], key);
          const keys = Object.keys(flag);
          const setAlias = toCheck.find((key2) => keys.includes(key2));
          return setAlias ? flag[setAlias] : false;
        }
        function hasAnyFlag(key) {
          const flagsKeys = Object.keys(flags);
          const toCheck = [].concat(flagsKeys.map((k) => flags[k]));
          return toCheck.some(function(flag) {
            return Array.isArray(flag) ? flag.includes(key) : flag[key];
          });
        }
        function hasFlagsMatching(arg, ...patterns) {
          const toCheck = [].concat(...patterns);
          return toCheck.some(function(pattern) {
            const match = arg.match(pattern);
            return match && hasAnyFlag(match[1]);
          });
        }
        function hasAllShortFlags(arg) {
          if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
            return false;
          }
          let hasAllFlags = true;
          let next;
          const letters = arg.slice(1).split("");
          for (let j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (!hasAnyFlag(letters[j])) {
              hasAllFlags = false;
              break;
            }
            if (letters[j + 1] && letters[j + 1] === "=" || next === "-" || /[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) || letters[j + 1] && letters[j + 1].match(/\W/)) {
              break;
            }
          }
          return hasAllFlags;
        }
        function isUnknownOptionAsArg(arg) {
          return configuration["unknown-options-as-args"] && isUnknownOption(arg);
        }
        function isUnknownOption(arg) {
          arg = arg.replace(/^-{3,}/, "--");
          if (arg.match(negative)) {
            return false;
          }
          if (hasAllShortFlags(arg)) {
            return false;
          }
          const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
          const normalFlag = /^-+([^=]+?)$/;
          const flagEndingInHyphen = /^-+([^=]+?)-$/;
          const flagEndingInDigits = /^-+([^=]+?\d+)$/;
          const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
          return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
        }
        function defaultValue(key) {
          if (!checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts) && `${key}` in defaults) {
            return defaults[key];
          } else {
            return defaultForType(guessType(key));
          }
        }
        function defaultForType(type) {
          const def = {
            [DefaultValuesForTypeKey2.BOOLEAN]: true,
            [DefaultValuesForTypeKey2.STRING]: "",
            [DefaultValuesForTypeKey2.NUMBER]: void 0,
            [DefaultValuesForTypeKey2.ARRAY]: []
          };
          return def[type];
        }
        function guessType(key) {
          let type = DefaultValuesForTypeKey2.BOOLEAN;
          if (checkAllAliases(key, flags.strings))
            type = DefaultValuesForTypeKey2.STRING;
          else if (checkAllAliases(key, flags.numbers))
            type = DefaultValuesForTypeKey2.NUMBER;
          else if (checkAllAliases(key, flags.bools))
            type = DefaultValuesForTypeKey2.BOOLEAN;
          else if (checkAllAliases(key, flags.arrays))
            type = DefaultValuesForTypeKey2.ARRAY;
          return type;
        }
        function isUndefined(num) {
          return num === void 0;
        }
        function checkConfiguration() {
          Object.keys(flags.counts).find((key) => {
            if (checkAllAliases(key, flags.arrays)) {
              error = Error(__("Invalid configuration: %s, opts.count excludes opts.array.", key));
              return true;
            } else if (checkAllAliases(key, flags.nargs)) {
              error = Error(__("Invalid configuration: %s, opts.count excludes opts.narg.", key));
              return true;
            }
            return false;
          });
        }
        return {
          aliases: Object.assign({}, flags.aliases),
          argv: Object.assign(argvReturn, argv),
          configuration,
          defaulted: Object.assign({}, defaulted),
          error,
          newAliases: Object.assign({}, newAliases)
        };
      }
    };
    function combineAliases2(aliases) {
      const aliasArrays = [];
      const combined = /* @__PURE__ */ Object.create(null);
      let change = true;
      Object.keys(aliases).forEach(function(key) {
        aliasArrays.push([].concat(aliases[key], key));
      });
      while (change) {
        change = false;
        for (let i = 0; i < aliasArrays.length; i++) {
          for (let ii = i + 1; ii < aliasArrays.length; ii++) {
            const intersect = aliasArrays[i].filter(function(v) {
              return aliasArrays[ii].indexOf(v) !== -1;
            });
            if (intersect.length) {
              aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
              aliasArrays.splice(ii, 1);
              change = true;
              break;
            }
          }
        }
      }
      aliasArrays.forEach(function(aliasArray) {
        aliasArray = aliasArray.filter(function(v, i, self2) {
          return self2.indexOf(v) === i;
        });
        const lastAlias = aliasArray.pop();
        if (lastAlias !== void 0 && typeof lastAlias === "string") {
          combined[lastAlias] = aliasArray;
        }
      });
      return combined;
    }
    function increment2(orig) {
      return orig !== void 0 ? orig + 1 : 1;
    }
    function sanitizeKey2(key) {
      if (key === "__proto__")
        return "___proto___";
      return key;
    }
    function stripQuotes2(val) {
      return typeof val === "string" && (val[0] === "'" || val[0] === '"') && val[val.length - 1] === val[0] ? val.substring(1, val.length - 1) : val;
    }
    var _a2;
    var _b2;
    var _c2;
    var minNodeVersion2 = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
    var nodeVersion2 = (_b2 = (_a2 = process === null || process === void 0 ? void 0 : process.versions) === null || _a2 === void 0 ? void 0 : _a2.node) !== null && _b2 !== void 0 ? _b2 : (_c2 = process === null || process === void 0 ? void 0 : process.version) === null || _c2 === void 0 ? void 0 : _c2.slice(1);
    if (nodeVersion2) {
      const major = Number(nodeVersion2.match(/^([^.]+)/)[1]);
      if (major < minNodeVersion2) {
        throw Error(`yargs parser supports a minimum Node.js version of ${minNodeVersion2}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
      }
    }
    var env2 = process ? process.env : {};
    var parser2 = new YargsParser2({
      cwd: process.cwd,
      env: () => {
        return env2;
      },
      format: util.format,
      normalize: path9.normalize,
      resolve: path9.resolve,
      require: (path10) => {
        if (typeof require !== "undefined") {
          return require(path10);
        } else if (path10.match(/\.json$/)) {
          return JSON.parse(fs12.readFileSync(path10, "utf8"));
        } else {
          throw Error("only .json config files are supported in ESM");
        }
      }
    });
    var yargsParser2 = function Parser4(args, opts) {
      const result = parser2.parse(args.slice(), opts);
      return result.argv;
    };
    yargsParser2.detailed = function(args, opts) {
      return parser2.parse(args.slice(), opts);
    };
    yargsParser2.camelCase = camelCase2;
    yargsParser2.decamelize = decamelize2;
    yargsParser2.looksLikeNumber = looksLikeNumber2;
    module2.exports = yargsParser2;
  }
});

// node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js"(exports2, module2) {
    "use strict";
    var ansiRegex = require_ansi_regex();
    module2.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
  }
});

// node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS({
  "node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js"(exports2, module2) {
    "use strict";
    var isFullwidthCodePoint = (codePoint) => {
      if (Number.isNaN(codePoint)) {
        return false;
      }
      if (codePoint >= 4352 && (codePoint <= 4447 || // Hangul Jamo
      codePoint === 9001 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 9002 || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      12880 <= codePoint && codePoint <= 19903 || // CJK Unified Ideographs .. Yi Radicals
      19968 <= codePoint && codePoint <= 42182 || // Hangul Jamo Extended-A
      43360 <= codePoint && codePoint <= 43388 || // Hangul Syllables
      44032 <= codePoint && codePoint <= 55203 || // CJK Compatibility Ideographs
      63744 <= codePoint && codePoint <= 64255 || // Vertical Forms
      65040 <= codePoint && codePoint <= 65049 || // CJK Compatibility Forms .. Small Form Variants
      65072 <= codePoint && codePoint <= 65131 || // Halfwidth and Fullwidth Forms
      65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || // Kana Supplement
      110592 <= codePoint && codePoint <= 110593 || // Enclosed Ideographic Supplement
      127488 <= codePoint && codePoint <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      131072 <= codePoint && codePoint <= 262141)) {
        return true;
      }
      return false;
    };
    module2.exports = isFullwidthCodePoint;
    module2.exports.default = isFullwidthCodePoint;
  }
});

// node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js
var require_string_width = __commonJS({
  "node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var isFullwidthCodePoint = require_is_fullwidth_code_point();
    var emojiRegex = require_emoji_regex();
    var stringWidth = (string) => {
      if (typeof string !== "string" || string.length === 0) {
        return 0;
      }
      string = stripAnsi2(string);
      if (string.length === 0) {
        return 0;
      }
      string = string.replace(emojiRegex(), "  ");
      let width = 0;
      for (let i = 0; i < string.length; i++) {
        const code2 = string.codePointAt(i);
        if (code2 <= 31 || code2 >= 127 && code2 <= 159) {
          continue;
        }
        if (code2 >= 768 && code2 <= 879) {
          continue;
        }
        if (code2 > 65535) {
          i++;
        }
        width += isFullwidthCodePoint(code2) ? 2 : 1;
      }
      return width;
    };
    module2.exports = stringWidth;
    module2.exports.default = stringWidth;
  }
});

// node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports2, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi2 = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi2 += 60;
      }
      return ansi2;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi2 = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi2;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports2, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path9 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path9.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path9;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports2, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code2 = fn(...args);
      return `\x1B[${code2 + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code2 = fn(...args);
      return `\x1B[${38 + offset};5;${code2}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap2, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name2 = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name2] = wrap2(identity, offset);
        } else if (typeof suite === "object") {
          styles[name2] = wrap2(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/.pnpm/wrap-ansi@7.0.0/node_modules/wrap-ansi/index.js
var require_wrap_ansi = __commonJS({
  "node_modules/.pnpm/wrap-ansi@7.0.0/node_modules/wrap-ansi/index.js"(exports2, module2) {
    "use strict";
    var stringWidth = require_string_width();
    var stripAnsi2 = require_strip_ansi();
    var ansiStyles = require_ansi_styles();
    var ESCAPES = /* @__PURE__ */ new Set([
      "\x1B",
      "\x9B"
    ]);
    var END_CODE = 39;
    var ANSI_ESCAPE_BELL = "\x07";
    var ANSI_CSI = "[";
    var ANSI_OSC = "]";
    var ANSI_SGR_TERMINATOR = "m";
    var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
    var wrapAnsi = (code2) => `${ESCAPES.values().next().value}${ANSI_CSI}${code2}${ANSI_SGR_TERMINATOR}`;
    var wrapAnsiHyperlink = (uri) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;
    var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
    var wrapWord = (rows, word, columns) => {
      const characters = [...word];
      let isInsideEscape = false;
      let isInsideLinkEscape = false;
      let visible = stringWidth(stripAnsi2(rows[rows.length - 1]));
      for (const [index, character] of characters.entries()) {
        const characterLength = stringWidth(character);
        if (visible + characterLength <= columns) {
          rows[rows.length - 1] += character;
        } else {
          rows.push(character);
          visible = 0;
        }
        if (ESCAPES.has(character)) {
          isInsideEscape = true;
          isInsideLinkEscape = characters.slice(index + 1).join("").startsWith(ANSI_ESCAPE_LINK);
        }
        if (isInsideEscape) {
          if (isInsideLinkEscape) {
            if (character === ANSI_ESCAPE_BELL) {
              isInsideEscape = false;
              isInsideLinkEscape = false;
            }
          } else if (character === ANSI_SGR_TERMINATOR) {
            isInsideEscape = false;
          }
          continue;
        }
        visible += characterLength;
        if (visible === columns && index < characters.length - 1) {
          rows.push("");
          visible = 0;
        }
      }
      if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
        rows[rows.length - 2] += rows.pop();
      }
    };
    var stringVisibleTrimSpacesRight = (string) => {
      const words = string.split(" ");
      let last = words.length;
      while (last > 0) {
        if (stringWidth(words[last - 1]) > 0) {
          break;
        }
        last--;
      }
      if (last === words.length) {
        return string;
      }
      return words.slice(0, last).join(" ") + words.slice(last).join("");
    };
    var exec = (string, columns, options = {}) => {
      if (options.trim !== false && string.trim() === "") {
        return "";
      }
      let returnValue = "";
      let escapeCode;
      let escapeUrl;
      const lengths = wordLengths(string);
      let rows = [""];
      for (const [index, word] of string.split(" ").entries()) {
        if (options.trim !== false) {
          rows[rows.length - 1] = rows[rows.length - 1].trimStart();
        }
        let rowLength = stringWidth(rows[rows.length - 1]);
        if (index !== 0) {
          if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
            rows.push("");
            rowLength = 0;
          }
          if (rowLength > 0 || options.trim === false) {
            rows[rows.length - 1] += " ";
            rowLength++;
          }
        }
        if (options.hard && lengths[index] > columns) {
          const remainingColumns = columns - rowLength;
          const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
          const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
          if (breaksStartingNextLine < breaksStartingThisLine) {
            rows.push("");
          }
          wrapWord(rows, word, columns);
          continue;
        }
        if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
          if (options.wordWrap === false && rowLength < columns) {
            wrapWord(rows, word, columns);
            continue;
          }
          rows.push("");
        }
        if (rowLength + lengths[index] > columns && options.wordWrap === false) {
          wrapWord(rows, word, columns);
          continue;
        }
        rows[rows.length - 1] += word;
      }
      if (options.trim !== false) {
        rows = rows.map(stringVisibleTrimSpacesRight);
      }
      const pre = [...rows.join("\n")];
      for (const [index, character] of pre.entries()) {
        returnValue += character;
        if (ESCAPES.has(character)) {
          const { groups } = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join("")) || { groups: {} };
          if (groups.code !== void 0) {
            const code3 = Number.parseFloat(groups.code);
            escapeCode = code3 === END_CODE ? void 0 : code3;
          } else if (groups.uri !== void 0) {
            escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
          }
        }
        const code2 = ansiStyles.codes.get(Number(escapeCode));
        if (pre[index + 1] === "\n") {
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink("");
          }
          if (escapeCode && code2) {
            returnValue += wrapAnsi(code2);
          }
        } else if (character === "\n") {
          if (escapeCode && code2) {
            returnValue += wrapAnsi(escapeCode);
          }
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink(escapeUrl);
          }
        }
      }
      return returnValue;
    };
    module2.exports = (string, columns, options) => {
      return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line) => exec(line, columns, options)).join("\n");
    };
  }
});

// node_modules/.pnpm/cliui@8.0.1/node_modules/cliui/build/index.cjs
var require_build3 = __commonJS({
  "node_modules/.pnpm/cliui@8.0.1/node_modules/cliui/build/index.cjs"(exports2, module2) {
    "use strict";
    var align2 = {
      right: alignRight2,
      center: alignCenter2
    };
    var top2 = 0;
    var right2 = 1;
    var bottom2 = 2;
    var left2 = 3;
    var UI2 = class {
      constructor(opts) {
        var _a2;
        this.width = opts.width;
        this.wrap = (_a2 = opts.wrap) !== null && _a2 !== void 0 ? _a2 : true;
        this.rows = [];
      }
      span(...args) {
        const cols = this.div(...args);
        cols.span = true;
      }
      resetOutput() {
        this.rows = [];
      }
      div(...args) {
        if (args.length === 0) {
          this.div("");
        }
        if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === "string") {
          return this.applyLayoutDSL(args[0]);
        }
        const cols = args.map((arg) => {
          if (typeof arg === "string") {
            return this.colFromString(arg);
          }
          return arg;
        });
        this.rows.push(cols);
        return cols;
      }
      shouldApplyLayoutDSL(...args) {
        return args.length === 1 && typeof args[0] === "string" && /[\t\n]/.test(args[0]);
      }
      applyLayoutDSL(str) {
        const rows = str.split("\n").map((row) => row.split("	"));
        let leftColumnWidth = 0;
        rows.forEach((columns) => {
          if (columns.length > 1 && mixin3.stringWidth(columns[0]) > leftColumnWidth) {
            leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin3.stringWidth(columns[0]));
          }
        });
        rows.forEach((columns) => {
          this.div(...columns.map((r, i) => {
            return {
              text: r.trim(),
              padding: this.measurePadding(r),
              width: i === 0 && columns.length > 1 ? leftColumnWidth : void 0
            };
          }));
        });
        return this.rows[this.rows.length - 1];
      }
      colFromString(text) {
        return {
          text,
          padding: this.measurePadding(text)
        };
      }
      measurePadding(str) {
        const noAnsi = mixin3.stripAnsi(str);
        return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
      }
      toString() {
        const lines = [];
        this.rows.forEach((row) => {
          this.rowToString(row, lines);
        });
        return lines.filter((line) => !line.hidden).map((line) => line.text).join("\n");
      }
      rowToString(row, lines) {
        this.rasterize(row).forEach((rrow, r) => {
          let str = "";
          rrow.forEach((col, c) => {
            const { width } = row[c];
            const wrapWidth = this.negatePadding(row[c]);
            let ts = col;
            if (wrapWidth > mixin3.stringWidth(col)) {
              ts += " ".repeat(wrapWidth - mixin3.stringWidth(col));
            }
            if (row[c].align && row[c].align !== "left" && this.wrap) {
              const fn = align2[row[c].align];
              ts = fn(ts, wrapWidth);
              if (mixin3.stringWidth(ts) < wrapWidth) {
                ts += " ".repeat((width || 0) - mixin3.stringWidth(ts) - 1);
              }
            }
            const padding = row[c].padding || [0, 0, 0, 0];
            if (padding[left2]) {
              str += " ".repeat(padding[left2]);
            }
            str += addBorder2(row[c], ts, "| ");
            str += ts;
            str += addBorder2(row[c], ts, " |");
            if (padding[right2]) {
              str += " ".repeat(padding[right2]);
            }
            if (r === 0 && lines.length > 0) {
              str = this.renderInline(str, lines[lines.length - 1]);
            }
          });
          lines.push({
            text: str.replace(/ +$/, ""),
            span: row.span
          });
        });
        return lines;
      }
      // if the full 'source' can render in
      // the target line, do so.
      renderInline(source, previousLine) {
        const match = source.match(/^ */);
        const leadingWhitespace = match ? match[0].length : 0;
        const target = previousLine.text;
        const targetTextWidth = mixin3.stringWidth(target.trimRight());
        if (!previousLine.span) {
          return source;
        }
        if (!this.wrap) {
          previousLine.hidden = true;
          return target + source;
        }
        if (leadingWhitespace < targetTextWidth) {
          return source;
        }
        previousLine.hidden = true;
        return target.trimRight() + " ".repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
      }
      rasterize(row) {
        const rrows = [];
        const widths = this.columnWidths(row);
        let wrapped;
        row.forEach((col, c) => {
          col.width = widths[c];
          if (this.wrap) {
            wrapped = mixin3.wrap(col.text, this.negatePadding(col), { hard: true }).split("\n");
          } else {
            wrapped = col.text.split("\n");
          }
          if (col.border) {
            wrapped.unshift("." + "-".repeat(this.negatePadding(col) + 2) + ".");
            wrapped.push("'" + "-".repeat(this.negatePadding(col) + 2) + "'");
          }
          if (col.padding) {
            wrapped.unshift(...new Array(col.padding[top2] || 0).fill(""));
            wrapped.push(...new Array(col.padding[bottom2] || 0).fill(""));
          }
          wrapped.forEach((str, r) => {
            if (!rrows[r]) {
              rrows.push([]);
            }
            const rrow = rrows[r];
            for (let i = 0; i < c; i++) {
              if (rrow[i] === void 0) {
                rrow.push("");
              }
            }
            rrow.push(str);
          });
        });
        return rrows;
      }
      negatePadding(col) {
        let wrapWidth = col.width || 0;
        if (col.padding) {
          wrapWidth -= (col.padding[left2] || 0) + (col.padding[right2] || 0);
        }
        if (col.border) {
          wrapWidth -= 4;
        }
        return wrapWidth;
      }
      columnWidths(row) {
        if (!this.wrap) {
          return row.map((col) => {
            return col.width || mixin3.stringWidth(col.text);
          });
        }
        let unset = row.length;
        let remainingWidth = this.width;
        const widths = row.map((col) => {
          if (col.width) {
            unset--;
            remainingWidth -= col.width;
            return col.width;
          }
          return void 0;
        });
        const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
        return widths.map((w, i) => {
          if (w === void 0) {
            return Math.max(unsetWidth, _minWidth2(row[i]));
          }
          return w;
        });
      }
    };
    function addBorder2(col, ts, style) {
      if (col.border) {
        if (/[.']-+[.']/.test(ts)) {
          return "";
        }
        if (ts.trim().length !== 0) {
          return style;
        }
        return "  ";
      }
      return "";
    }
    function _minWidth2(col) {
      const padding = col.padding || [];
      const minWidth = 1 + (padding[left2] || 0) + (padding[right2] || 0);
      if (col.border) {
        return minWidth + 4;
      }
      return minWidth;
    }
    function getWindowWidth2() {
      if (typeof process === "object" && process.stdout && process.stdout.columns) {
        return process.stdout.columns;
      }
      return 80;
    }
    function alignRight2(str, width) {
      str = str.trim();
      const strWidth = mixin3.stringWidth(str);
      if (strWidth < width) {
        return " ".repeat(width - strWidth) + str;
      }
      return str;
    }
    function alignCenter2(str, width) {
      str = str.trim();
      const strWidth = mixin3.stringWidth(str);
      if (strWidth >= width) {
        return str;
      }
      return " ".repeat(width - strWidth >> 1) + str;
    }
    var mixin3;
    function cliui2(opts, _mixin) {
      mixin3 = _mixin;
      return new UI2({
        width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth2(),
        wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
      });
    }
    var stringWidth = require_string_width();
    var stripAnsi2 = require_strip_ansi();
    var wrap2 = require_wrap_ansi();
    function ui2(opts) {
      return cliui2(opts, {
        stringWidth,
        stripAnsi: stripAnsi2,
        wrap: wrap2
      });
    }
    module2.exports = ui2;
  }
});

// node_modules/.pnpm/escalade@3.1.2/node_modules/escalade/sync/index.js
var require_sync = __commonJS({
  "node_modules/.pnpm/escalade@3.1.2/node_modules/escalade/sync/index.js"(exports2, module2) {
    var { dirname: dirname7, resolve: resolve6 } = require("path");
    var { readdirSync: readdirSync2, statSync: statSync4 } = require("fs");
    module2.exports = function(start, callback) {
      let dir = resolve6(".", start);
      let tmp, stats = statSync4(dir);
      if (!stats.isDirectory()) {
        dir = dirname7(dir);
      }
      while (true) {
        tmp = callback(dir, readdirSync2(dir));
        if (tmp) return resolve6(dir, tmp);
        dir = dirname7(tmp = dir);
        if (tmp === dir) break;
      }
    };
  }
});

// node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js
var require_get_caller_file = __commonJS({
  "node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function getCallerFile(position) {
      if (position === void 0) {
        position = 2;
      }
      if (position >= Error.stackTraceLimit) {
        throw new TypeError("getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" + position + "` and Error.stackTraceLimit was: `" + Error.stackTraceLimit + "`");
      }
      var oldPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = oldPrepareStackTrace;
      if (stack !== null && typeof stack === "object") {
        return stack[position] ? stack[position].getFileName() : void 0;
      }
    };
  }
});

// node_modules/.pnpm/require-directory@2.1.1/node_modules/require-directory/index.js
var require_require_directory = __commonJS({
  "node_modules/.pnpm/require-directory@2.1.1/node_modules/require-directory/index.js"(exports2, module2) {
    "use strict";
    var fs12 = require("fs");
    var join2 = require("path").join;
    var resolve6 = require("path").resolve;
    var dirname7 = require("path").dirname;
    var defaultOptions = {
      extensions: ["js", "json", "coffee"],
      recurse: true,
      rename: function(name2) {
        return name2;
      },
      visit: function(obj) {
        return obj;
      }
    };
    function checkFileInclusion(path9, filename, options) {
      return (
        // verify file has valid extension
        new RegExp("\\.(" + options.extensions.join("|") + ")$", "i").test(filename) && // if options.include is a RegExp, evaluate it and make sure the path passes
        !(options.include && options.include instanceof RegExp && !options.include.test(path9)) && // if options.include is a function, evaluate it and make sure the path passes
        !(options.include && typeof options.include === "function" && !options.include(path9, filename)) && // if options.exclude is a RegExp, evaluate it and make sure the path doesn't pass
        !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path9)) && // if options.exclude is a function, evaluate it and make sure the path doesn't pass
        !(options.exclude && typeof options.exclude === "function" && options.exclude(path9, filename))
      );
    }
    function requireDirectory(m, path9, options) {
      var retval = {};
      if (path9 && !options && typeof path9 !== "string") {
        options = path9;
        path9 = null;
      }
      options = options || {};
      for (var prop in defaultOptions) {
        if (typeof options[prop] === "undefined") {
          options[prop] = defaultOptions[prop];
        }
      }
      path9 = !path9 ? dirname7(m.filename) : resolve6(dirname7(m.filename), path9);
      fs12.readdirSync(path9).forEach(function(filename) {
        var joined = join2(path9, filename), files, key, obj;
        if (fs12.statSync(joined).isDirectory() && options.recurse) {
          files = requireDirectory(m, joined, options);
          if (Object.keys(files).length) {
            retval[options.rename(filename, joined, filename)] = files;
          }
        } else {
          if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
            key = filename.substring(0, filename.lastIndexOf("."));
            obj = m.require(joined);
            retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
          }
        }
      });
      return retval;
    }
    module2.exports = requireDirectory;
    module2.exports.defaults = defaultOptions;
  }
});

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/build/index.cjs
var require_build4 = __commonJS({
  "node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/build/index.cjs"(exports2, module2) {
    "use strict";
    var t = require("assert");
    var e = class _e extends Error {
      constructor(t2) {
        super(t2 || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, _e);
      }
    };
    var s;
    var i = [];
    function n(t2, o2, a2, h2) {
      s = h2;
      let l2 = {};
      if (Object.prototype.hasOwnProperty.call(t2, "extends")) {
        if ("string" != typeof t2.extends) return l2;
        const r2 = /\.json|\..*rc$/.test(t2.extends);
        let h3 = null;
        if (r2) h3 = function(t3, e2) {
          return s.path.resolve(t3, e2);
        }(o2, t2.extends);
        else try {
          h3 = require.resolve(t2.extends);
        } catch (e2) {
          return t2;
        }
        !function(t3) {
          if (i.indexOf(t3) > -1) throw new e(`Circular extended configurations: '${t3}'.`);
        }(h3), i.push(h3), l2 = r2 ? JSON.parse(s.readFileSync(h3, "utf8")) : require(t2.extends), delete t2.extends, l2 = n(l2, s.path.dirname(h3), a2, s);
      }
      return i = [], a2 ? r(l2, t2) : Object.assign({}, l2, t2);
    }
    function r(t2, e2) {
      const s2 = {};
      function i2(t3) {
        return t3 && "object" == typeof t3 && !Array.isArray(t3);
      }
      Object.assign(s2, t2);
      for (const n2 of Object.keys(e2)) i2(e2[n2]) && i2(s2[n2]) ? s2[n2] = r(t2[n2], e2[n2]) : s2[n2] = e2[n2];
      return s2;
    }
    function o(t2) {
      const e2 = t2.replace(/\s{2,}/g, " ").split(/\s+(?![^[]*]|[^<]*>)/), s2 = /\.*[\][<>]/g, i2 = e2.shift();
      if (!i2) throw new Error(`No command found in: ${t2}`);
      const n2 = { cmd: i2.replace(s2, ""), demanded: [], optional: [] };
      return e2.forEach((t3, i3) => {
        let r2 = false;
        t3 = t3.replace(/\s/g, ""), /\.+[\]>]/.test(t3) && i3 === e2.length - 1 && (r2 = true), /^\[/.test(t3) ? n2.optional.push({ cmd: t3.replace(s2, "").split("|"), variadic: r2 }) : n2.demanded.push({ cmd: t3.replace(s2, "").split("|"), variadic: r2 });
      }), n2;
    }
    var a = ["first", "second", "third", "fourth", "fifth", "sixth"];
    function h(t2, s2, i2) {
      try {
        let n2 = 0;
        const [r2, a2, h2] = "object" == typeof t2 ? [{ demanded: [], optional: [] }, t2, s2] : [o(`cmd ${t2}`), s2, i2], f2 = [].slice.call(a2);
        for (; f2.length && void 0 === f2[f2.length - 1]; ) f2.pop();
        const d2 = h2 || f2.length;
        if (d2 < r2.demanded.length) throw new e(`Not enough arguments provided. Expected ${r2.demanded.length} but received ${f2.length}.`);
        const u2 = r2.demanded.length + r2.optional.length;
        if (d2 > u2) throw new e(`Too many arguments provided. Expected max ${u2} but received ${d2}.`);
        r2.demanded.forEach((t3) => {
          const e2 = l(f2.shift());
          0 === t3.cmd.filter((t4) => t4 === e2 || "*" === t4).length && c(e2, t3.cmd, n2), n2 += 1;
        }), r2.optional.forEach((t3) => {
          if (0 === f2.length) return;
          const e2 = l(f2.shift());
          0 === t3.cmd.filter((t4) => t4 === e2 || "*" === t4).length && c(e2, t3.cmd, n2), n2 += 1;
        });
      } catch (t3) {
        console.warn(t3.stack);
      }
    }
    function l(t2) {
      return Array.isArray(t2) ? "array" : null === t2 ? "null" : typeof t2;
    }
    function c(t2, s2, i2) {
      throw new e(`Invalid ${a[i2] || "manyith"} argument. Expected ${s2.join(" or ")} but received ${t2}.`);
    }
    function f(t2) {
      return !!t2 && !!t2.then && "function" == typeof t2.then;
    }
    function d(t2, e2, s2, i2) {
      s2.assert.notStrictEqual(t2, e2, i2);
    }
    function u(t2, e2) {
      e2.assert.strictEqual(typeof t2, "string");
    }
    function p(t2) {
      return Object.keys(t2);
    }
    function g(t2 = {}, e2 = () => true) {
      const s2 = {};
      return p(t2).forEach((i2) => {
        e2(i2, t2[i2]) && (s2[i2] = t2[i2]);
      }), s2;
    }
    function m() {
      return process.versions.electron && !process.defaultApp ? 0 : 1;
    }
    function y() {
      return process.argv[m()];
    }
    var b = Object.freeze({ __proto__: null, hideBin: function(t2) {
      return t2.slice(m() + 1);
    }, getProcessArgvBin: y });
    function v(t2, e2, s2, i2) {
      if ("a" === s2 && !i2) throw new TypeError("Private accessor was defined without a getter");
      if ("function" == typeof e2 ? t2 !== e2 || !i2 : !e2.has(t2)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return "m" === s2 ? i2 : "a" === s2 ? i2.call(t2) : i2 ? i2.value : e2.get(t2);
    }
    function O(t2, e2, s2, i2, n2) {
      if ("m" === i2) throw new TypeError("Private method is not writable");
      if ("a" === i2 && !n2) throw new TypeError("Private accessor was defined without a setter");
      if ("function" == typeof e2 ? t2 !== e2 || !n2 : !e2.has(t2)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return "a" === i2 ? n2.call(t2, s2) : n2 ? n2.value = s2 : e2.set(t2, s2), s2;
    }
    var w = class {
      constructor(t2) {
        this.globalMiddleware = [], this.frozens = [], this.yargs = t2;
      }
      addMiddleware(t2, e2, s2 = true, i2 = false) {
        if (h("<array|function> [boolean] [boolean] [boolean]", [t2, e2, s2], arguments.length), Array.isArray(t2)) {
          for (let i3 = 0; i3 < t2.length; i3++) {
            if ("function" != typeof t2[i3]) throw Error("middleware must be a function");
            const n2 = t2[i3];
            n2.applyBeforeValidation = e2, n2.global = s2;
          }
          Array.prototype.push.apply(this.globalMiddleware, t2);
        } else if ("function" == typeof t2) {
          const n2 = t2;
          n2.applyBeforeValidation = e2, n2.global = s2, n2.mutates = i2, this.globalMiddleware.push(t2);
        }
        return this.yargs;
      }
      addCoerceMiddleware(t2, e2) {
        const s2 = this.yargs.getAliases();
        return this.globalMiddleware = this.globalMiddleware.filter((t3) => {
          const i2 = [...s2[e2] || [], e2];
          return !t3.option || !i2.includes(t3.option);
        }), t2.option = e2, this.addMiddleware(t2, true, true, true);
      }
      getMiddleware() {
        return this.globalMiddleware;
      }
      freeze() {
        this.frozens.push([...this.globalMiddleware]);
      }
      unfreeze() {
        const t2 = this.frozens.pop();
        void 0 !== t2 && (this.globalMiddleware = t2);
      }
      reset() {
        this.globalMiddleware = this.globalMiddleware.filter((t2) => t2.global);
      }
    };
    function C(t2, e2, s2, i2) {
      return s2.reduce((t3, s3) => {
        if (s3.applyBeforeValidation !== i2) return t3;
        if (s3.mutates) {
          if (s3.applied) return t3;
          s3.applied = true;
        }
        if (f(t3)) return t3.then((t4) => Promise.all([t4, s3(t4, e2)])).then(([t4, e3]) => Object.assign(t4, e3));
        {
          const i3 = s3(t3, e2);
          return f(i3) ? i3.then((e3) => Object.assign(t3, e3)) : Object.assign(t3, i3);
        }
      }, t2);
    }
    function j(t2, e2, s2 = (t3) => {
      throw t3;
    }) {
      try {
        const s3 = "function" == typeof t2 ? t2() : t2;
        return f(s3) ? s3.then((t3) => e2(t3)) : e2(s3);
      } catch (t3) {
        return s2(t3);
      }
    }
    var M = /(^\*)|(^\$0)/;
    var _ = class {
      constructor(t2, e2, s2, i2) {
        this.requireCache = /* @__PURE__ */ new Set(), this.handlers = {}, this.aliasMap = {}, this.frozens = [], this.shim = i2, this.usage = t2, this.globalMiddleware = s2, this.validation = e2;
      }
      addDirectory(t2, e2, s2, i2) {
        "boolean" != typeof (i2 = i2 || {}).recurse && (i2.recurse = false), Array.isArray(i2.extensions) || (i2.extensions = ["js"]);
        const n2 = "function" == typeof i2.visit ? i2.visit : (t3) => t3;
        i2.visit = (t3, e3, s3) => {
          const i3 = n2(t3, e3, s3);
          if (i3) {
            if (this.requireCache.has(e3)) return i3;
            this.requireCache.add(e3), this.addHandler(i3);
          }
          return i3;
        }, this.shim.requireDirectory({ require: e2, filename: s2 }, t2, i2);
      }
      addHandler(t2, e2, s2, i2, n2, r2) {
        let a2 = [];
        const h2 = function(t3) {
          return t3 ? t3.map((t4) => (t4.applyBeforeValidation = false, t4)) : [];
        }(n2);
        if (i2 = i2 || (() => {
        }), Array.isArray(t2)) if (function(t3) {
          return t3.every((t4) => "string" == typeof t4);
        }(t2)) [t2, ...a2] = t2;
        else for (const e3 of t2) this.addHandler(e3);
        else {
          if (function(t3) {
            return "object" == typeof t3 && !Array.isArray(t3);
          }(t2)) {
            let e3 = Array.isArray(t2.command) || "string" == typeof t2.command ? t2.command : this.moduleName(t2);
            return t2.aliases && (e3 = [].concat(e3).concat(t2.aliases)), void this.addHandler(e3, this.extractDesc(t2), t2.builder, t2.handler, t2.middlewares, t2.deprecated);
          }
          if (k(s2)) return void this.addHandler([t2].concat(a2), e2, s2.builder, s2.handler, s2.middlewares, s2.deprecated);
        }
        if ("string" == typeof t2) {
          const n3 = o(t2);
          a2 = a2.map((t3) => o(t3).cmd);
          let l2 = false;
          const c2 = [n3.cmd].concat(a2).filter((t3) => !M.test(t3) || (l2 = true, false));
          0 === c2.length && l2 && c2.push("$0"), l2 && (n3.cmd = c2[0], a2 = c2.slice(1), t2 = t2.replace(M, n3.cmd)), a2.forEach((t3) => {
            this.aliasMap[t3] = n3.cmd;
          }), false !== e2 && this.usage.command(t2, e2, l2, a2, r2), this.handlers[n3.cmd] = { original: t2, description: e2, handler: i2, builder: s2 || {}, middlewares: h2, deprecated: r2, demanded: n3.demanded, optional: n3.optional }, l2 && (this.defaultCommand = this.handlers[n3.cmd]);
        }
      }
      getCommandHandlers() {
        return this.handlers;
      }
      getCommands() {
        return Object.keys(this.handlers).concat(Object.keys(this.aliasMap));
      }
      hasDefaultCommand() {
        return !!this.defaultCommand;
      }
      runCommand(t2, e2, s2, i2, n2, r2) {
        const o2 = this.handlers[t2] || this.handlers[this.aliasMap[t2]] || this.defaultCommand, a2 = e2.getInternalMethods().getContext(), h2 = a2.commands.slice(), l2 = !t2;
        t2 && (a2.commands.push(t2), a2.fullCommands.push(o2.original));
        const c2 = this.applyBuilderUpdateUsageAndParse(l2, o2, e2, s2.aliases, h2, i2, n2, r2);
        return f(c2) ? c2.then((t3) => this.applyMiddlewareAndGetResult(l2, o2, t3.innerArgv, a2, n2, t3.aliases, e2)) : this.applyMiddlewareAndGetResult(l2, o2, c2.innerArgv, a2, n2, c2.aliases, e2);
      }
      applyBuilderUpdateUsageAndParse(t2, e2, s2, i2, n2, r2, o2, a2) {
        const h2 = e2.builder;
        let l2 = s2;
        if (x(h2)) {
          s2.getInternalMethods().getUsageInstance().freeze();
          const c2 = h2(s2.getInternalMethods().reset(i2), a2);
          if (f(c2)) return c2.then((i3) => {
            var a3;
            return l2 = (a3 = i3) && "function" == typeof a3.getInternalMethods ? i3 : s2, this.parseAndUpdateUsage(t2, e2, l2, n2, r2, o2);
          });
        } else /* @__PURE__ */ (function(t3) {
          return "object" == typeof t3;
        })(h2) && (s2.getInternalMethods().getUsageInstance().freeze(), l2 = s2.getInternalMethods().reset(i2), Object.keys(e2.builder).forEach((t3) => {
          l2.option(t3, h2[t3]);
        }));
        return this.parseAndUpdateUsage(t2, e2, l2, n2, r2, o2);
      }
      parseAndUpdateUsage(t2, e2, s2, i2, n2, r2) {
        t2 && s2.getInternalMethods().getUsageInstance().unfreeze(true), this.shouldUpdateUsage(s2) && s2.getInternalMethods().getUsageInstance().usage(this.usageFromParentCommandsCommandHandler(i2, e2), e2.description);
        const o2 = s2.getInternalMethods().runYargsParserAndExecuteCommands(null, void 0, true, n2, r2);
        return f(o2) ? o2.then((t3) => ({ aliases: s2.parsed.aliases, innerArgv: t3 })) : { aliases: s2.parsed.aliases, innerArgv: o2 };
      }
      shouldUpdateUsage(t2) {
        return !t2.getInternalMethods().getUsageInstance().getUsageDisabled() && 0 === t2.getInternalMethods().getUsageInstance().getUsage().length;
      }
      usageFromParentCommandsCommandHandler(t2, e2) {
        const s2 = M.test(e2.original) ? e2.original.replace(M, "").trim() : e2.original, i2 = t2.filter((t3) => !M.test(t3));
        return i2.push(s2), `$0 ${i2.join(" ")}`;
      }
      handleValidationAndGetResult(t2, e2, s2, i2, n2, r2, o2, a2) {
        if (!r2.getInternalMethods().getHasOutput()) {
          const e3 = r2.getInternalMethods().runValidation(n2, a2, r2.parsed.error, t2);
          s2 = j(s2, (t3) => (e3(t3), t3));
        }
        if (e2.handler && !r2.getInternalMethods().getHasOutput()) {
          r2.getInternalMethods().setHasOutput();
          const i3 = !!r2.getOptions().configuration["populate--"];
          r2.getInternalMethods().postProcess(s2, i3, false, false), s2 = j(s2 = C(s2, r2, o2, false), (t3) => {
            const s3 = e2.handler(t3);
            return f(s3) ? s3.then(() => t3) : t3;
          }), t2 || r2.getInternalMethods().getUsageInstance().cacheHelpMessage(), f(s2) && !r2.getInternalMethods().hasParseCallback() && s2.catch((t3) => {
            try {
              r2.getInternalMethods().getUsageInstance().fail(null, t3);
            } catch (t4) {
            }
          });
        }
        return t2 || (i2.commands.pop(), i2.fullCommands.pop()), s2;
      }
      applyMiddlewareAndGetResult(t2, e2, s2, i2, n2, r2, o2) {
        let a2 = {};
        if (n2) return s2;
        o2.getInternalMethods().getHasOutput() || (a2 = this.populatePositionals(e2, s2, i2, o2));
        const h2 = this.globalMiddleware.getMiddleware().slice(0).concat(e2.middlewares), l2 = C(s2, o2, h2, true);
        return f(l2) ? l2.then((s3) => this.handleValidationAndGetResult(t2, e2, s3, i2, r2, o2, h2, a2)) : this.handleValidationAndGetResult(t2, e2, l2, i2, r2, o2, h2, a2);
      }
      populatePositionals(t2, e2, s2, i2) {
        e2._ = e2._.slice(s2.commands.length);
        const n2 = t2.demanded.slice(0), r2 = t2.optional.slice(0), o2 = {};
        for (this.validation.positionalCount(n2.length, e2._.length); n2.length; ) {
          const t3 = n2.shift();
          this.populatePositional(t3, e2, o2);
        }
        for (; r2.length; ) {
          const t3 = r2.shift();
          this.populatePositional(t3, e2, o2);
        }
        return e2._ = s2.commands.concat(e2._.map((t3) => "" + t3)), this.postProcessPositionals(e2, o2, this.cmdToParseOptions(t2.original), i2), o2;
      }
      populatePositional(t2, e2, s2) {
        const i2 = t2.cmd[0];
        t2.variadic ? s2[i2] = e2._.splice(0).map(String) : e2._.length && (s2[i2] = [String(e2._.shift())]);
      }
      cmdToParseOptions(t2) {
        const e2 = { array: [], default: {}, alias: {}, demand: {} }, s2 = o(t2);
        return s2.demanded.forEach((t3) => {
          const [s3, ...i2] = t3.cmd;
          t3.variadic && (e2.array.push(s3), e2.default[s3] = []), e2.alias[s3] = i2, e2.demand[s3] = true;
        }), s2.optional.forEach((t3) => {
          const [s3, ...i2] = t3.cmd;
          t3.variadic && (e2.array.push(s3), e2.default[s3] = []), e2.alias[s3] = i2;
        }), e2;
      }
      postProcessPositionals(t2, e2, s2, i2) {
        const n2 = Object.assign({}, i2.getOptions());
        n2.default = Object.assign(s2.default, n2.default);
        for (const t3 of Object.keys(s2.alias)) n2.alias[t3] = (n2.alias[t3] || []).concat(s2.alias[t3]);
        n2.array = n2.array.concat(s2.array), n2.config = {};
        const r2 = [];
        if (Object.keys(e2).forEach((t3) => {
          e2[t3].map((e3) => {
            n2.configuration["unknown-options-as-args"] && (n2.key[t3] = true), r2.push(`--${t3}`), r2.push(e3);
          });
        }), !r2.length) return;
        const o2 = Object.assign({}, n2.configuration, { "populate--": false }), a2 = this.shim.Parser.detailed(r2, Object.assign({}, n2, { configuration: o2 }));
        if (a2.error) i2.getInternalMethods().getUsageInstance().fail(a2.error.message, a2.error);
        else {
          const s3 = Object.keys(e2);
          Object.keys(e2).forEach((t3) => {
            s3.push(...a2.aliases[t3]);
          }), Object.keys(a2.argv).forEach((n3) => {
            s3.includes(n3) && (e2[n3] || (e2[n3] = a2.argv[n3]), !this.isInConfigs(i2, n3) && !this.isDefaulted(i2, n3) && Object.prototype.hasOwnProperty.call(t2, n3) && Object.prototype.hasOwnProperty.call(a2.argv, n3) && (Array.isArray(t2[n3]) || Array.isArray(a2.argv[n3])) ? t2[n3] = [].concat(t2[n3], a2.argv[n3]) : t2[n3] = a2.argv[n3]);
          });
        }
      }
      isDefaulted(t2, e2) {
        const { default: s2 } = t2.getOptions();
        return Object.prototype.hasOwnProperty.call(s2, e2) || Object.prototype.hasOwnProperty.call(s2, this.shim.Parser.camelCase(e2));
      }
      isInConfigs(t2, e2) {
        const { configObjects: s2 } = t2.getOptions();
        return s2.some((t3) => Object.prototype.hasOwnProperty.call(t3, e2)) || s2.some((t3) => Object.prototype.hasOwnProperty.call(t3, this.shim.Parser.camelCase(e2)));
      }
      runDefaultBuilderOn(t2) {
        if (!this.defaultCommand) return;
        if (this.shouldUpdateUsage(t2)) {
          const e3 = M.test(this.defaultCommand.original) ? this.defaultCommand.original : this.defaultCommand.original.replace(/^[^[\]<>]*/, "$0 ");
          t2.getInternalMethods().getUsageInstance().usage(e3, this.defaultCommand.description);
        }
        const e2 = this.defaultCommand.builder;
        if (x(e2)) return e2(t2, true);
        k(e2) || Object.keys(e2).forEach((s2) => {
          t2.option(s2, e2[s2]);
        });
      }
      moduleName(t2) {
        const e2 = function(t3) {
          if ("undefined" == typeof require) return null;
          for (let e3, s2 = 0, i2 = Object.keys(require.cache); s2 < i2.length; s2++) if (e3 = require.cache[i2[s2]], e3.exports === t3) return e3;
          return null;
        }(t2);
        if (!e2) throw new Error(`No command name given for module: ${this.shim.inspect(t2)}`);
        return this.commandFromFilename(e2.filename);
      }
      commandFromFilename(t2) {
        return this.shim.path.basename(t2, this.shim.path.extname(t2));
      }
      extractDesc({ describe: t2, description: e2, desc: s2 }) {
        for (const i2 of [t2, e2, s2]) {
          if ("string" == typeof i2 || false === i2) return i2;
          d(i2, true, this.shim);
        }
        return false;
      }
      freeze() {
        this.frozens.push({ handlers: this.handlers, aliasMap: this.aliasMap, defaultCommand: this.defaultCommand });
      }
      unfreeze() {
        const t2 = this.frozens.pop();
        d(t2, void 0, this.shim), { handlers: this.handlers, aliasMap: this.aliasMap, defaultCommand: this.defaultCommand } = t2;
      }
      reset() {
        return this.handlers = {}, this.aliasMap = {}, this.defaultCommand = void 0, this.requireCache = /* @__PURE__ */ new Set(), this;
      }
    };
    function k(t2) {
      return "object" == typeof t2 && !!t2.builder && "function" == typeof t2.handler;
    }
    function x(t2) {
      return "function" == typeof t2;
    }
    function E(t2) {
      "undefined" != typeof process && [process.stdout, process.stderr].forEach((e2) => {
        const s2 = e2;
        s2._handle && s2.isTTY && "function" == typeof s2._handle.setBlocking && s2._handle.setBlocking(t2);
      });
    }
    function A(t2) {
      return "boolean" == typeof t2;
    }
    function P(t2, s2) {
      const i2 = s2.y18n.__, n2 = {}, r2 = [];
      n2.failFn = function(t3) {
        r2.push(t3);
      };
      let o2 = null, a2 = null, h2 = true;
      n2.showHelpOnFail = function(e2 = true, s3) {
        const [i3, r3] = "string" == typeof e2 ? [true, e2] : [e2, s3];
        return t2.getInternalMethods().isGlobalContext() && (a2 = r3), o2 = r3, h2 = i3, n2;
      };
      let l2 = false;
      n2.fail = function(s3, i3) {
        const c3 = t2.getInternalMethods().getLoggerInstance();
        if (!r2.length) {
          if (t2.getExitProcess() && E(true), !l2) {
            l2 = true, h2 && (t2.showHelp("error"), c3.error()), (s3 || i3) && c3.error(s3 || i3);
            const e2 = o2 || a2;
            e2 && ((s3 || i3) && c3.error(""), c3.error(e2));
          }
          if (i3 = i3 || new e(s3), t2.getExitProcess()) return t2.exit(1);
          if (t2.getInternalMethods().hasParseCallback()) return t2.exit(1, i3);
          throw i3;
        }
        for (let t3 = r2.length - 1; t3 >= 0; --t3) {
          const e2 = r2[t3];
          if (A(e2)) {
            if (i3) throw i3;
            if (s3) throw Error(s3);
          } else e2(s3, i3, n2);
        }
      };
      let c2 = [], f2 = false;
      n2.usage = (t3, e2) => null === t3 ? (f2 = true, c2 = [], n2) : (f2 = false, c2.push([t3, e2 || ""]), n2), n2.getUsage = () => c2, n2.getUsageDisabled = () => f2, n2.getPositionalGroupName = () => i2("Positionals:");
      let d2 = [];
      n2.example = (t3, e2) => {
        d2.push([t3, e2 || ""]);
      };
      let u2 = [];
      n2.command = function(t3, e2, s3, i3, n3 = false) {
        s3 && (u2 = u2.map((t4) => (t4[2] = false, t4))), u2.push([t3, e2 || "", s3, i3, n3]);
      }, n2.getCommands = () => u2;
      let p2 = {};
      n2.describe = function(t3, e2) {
        Array.isArray(t3) ? t3.forEach((t4) => {
          n2.describe(t4, e2);
        }) : "object" == typeof t3 ? Object.keys(t3).forEach((e3) => {
          n2.describe(e3, t3[e3]);
        }) : p2[t3] = e2;
      }, n2.getDescriptions = () => p2;
      let m2 = [];
      n2.epilog = (t3) => {
        m2.push(t3);
      };
      let y2, b2 = false;
      n2.wrap = (t3) => {
        b2 = true, y2 = t3;
      }, n2.getWrap = () => s2.getEnv("YARGS_DISABLE_WRAP") ? null : (b2 || (y2 = function() {
        const t3 = 80;
        return s2.process.stdColumns ? Math.min(t3, s2.process.stdColumns) : t3;
      }(), b2 = true), y2);
      const v2 = "__yargsString__:";
      function O2(t3, e2, i3) {
        let n3 = 0;
        return Array.isArray(t3) || (t3 = Object.values(t3).map((t4) => [t4])), t3.forEach((t4) => {
          n3 = Math.max(s2.stringWidth(i3 ? `${i3} ${I(t4[0])}` : I(t4[0])) + $(t4[0]), n3);
        }), e2 && (n3 = Math.min(n3, parseInt((0.5 * e2).toString(), 10))), n3;
      }
      let w2;
      function C2(e2) {
        return t2.getOptions().hiddenOptions.indexOf(e2) < 0 || t2.parsed.argv[t2.getOptions().showHiddenOpt];
      }
      function j2(t3, e2) {
        let s3 = `[${i2("default:")} `;
        if (void 0 === t3 && !e2) return null;
        if (e2) s3 += e2;
        else switch (typeof t3) {
          case "string":
            s3 += `"${t3}"`;
            break;
          case "object":
            s3 += JSON.stringify(t3);
            break;
          default:
            s3 += t3;
        }
        return `${s3}]`;
      }
      n2.deferY18nLookup = (t3) => v2 + t3, n2.help = function() {
        if (w2) return w2;
        !function() {
          const e3 = t2.getDemandedOptions(), s3 = t2.getOptions();
          (Object.keys(s3.alias) || []).forEach((i3) => {
            s3.alias[i3].forEach((r4) => {
              p2[r4] && n2.describe(i3, p2[r4]), r4 in e3 && t2.demandOption(i3, e3[r4]), s3.boolean.includes(r4) && t2.boolean(i3), s3.count.includes(r4) && t2.count(i3), s3.string.includes(r4) && t2.string(i3), s3.normalize.includes(r4) && t2.normalize(i3), s3.array.includes(r4) && t2.array(i3), s3.number.includes(r4) && t2.number(i3);
            });
          });
        }();
        const e2 = t2.customScriptName ? t2.$0 : s2.path.basename(t2.$0), r3 = t2.getDemandedOptions(), o3 = t2.getDemandedCommands(), a3 = t2.getDeprecatedOptions(), h3 = t2.getGroups(), l3 = t2.getOptions();
        let g2 = [];
        g2 = g2.concat(Object.keys(p2)), g2 = g2.concat(Object.keys(r3)), g2 = g2.concat(Object.keys(o3)), g2 = g2.concat(Object.keys(l3.default)), g2 = g2.filter(C2), g2 = Object.keys(g2.reduce((t3, e3) => ("_" !== e3 && (t3[e3] = true), t3), {}));
        const y3 = n2.getWrap(), b3 = s2.cliui({ width: y3, wrap: !!y3 });
        if (!f2) {
          if (c2.length) c2.forEach((t3) => {
            b3.div({ text: `${t3[0].replace(/\$0/g, e2)}` }), t3[1] && b3.div({ text: `${t3[1]}`, padding: [1, 0, 0, 0] });
          }), b3.div();
          else if (u2.length) {
            let t3 = null;
            t3 = o3._ ? `${e2} <${i2("command")}>
` : `${e2} [${i2("command")}]
`, b3.div(`${t3}`);
          }
        }
        if (u2.length > 1 || 1 === u2.length && !u2[0][2]) {
          b3.div(i2("Commands:"));
          const s3 = t2.getInternalMethods().getContext(), n3 = s3.commands.length ? `${s3.commands.join(" ")} ` : "";
          true === t2.getInternalMethods().getParserConfiguration()["sort-commands"] && (u2 = u2.sort((t3, e3) => t3[0].localeCompare(e3[0])));
          const r4 = e2 ? `${e2} ` : "";
          u2.forEach((t3) => {
            const s4 = `${r4}${n3}${t3[0].replace(/^\$0 ?/, "")}`;
            b3.span({ text: s4, padding: [0, 2, 0, 2], width: O2(u2, y3, `${e2}${n3}`) + 4 }, { text: t3[1] });
            const o4 = [];
            t3[2] && o4.push(`[${i2("default")}]`), t3[3] && t3[3].length && o4.push(`[${i2("aliases:")} ${t3[3].join(", ")}]`), t3[4] && ("string" == typeof t3[4] ? o4.push(`[${i2("deprecated: %s", t3[4])}]`) : o4.push(`[${i2("deprecated")}]`)), o4.length ? b3.div({ text: o4.join(" "), padding: [0, 0, 0, 2], align: "right" }) : b3.div();
          }), b3.div();
        }
        const M3 = (Object.keys(l3.alias) || []).concat(Object.keys(t2.parsed.newAliases) || []);
        g2 = g2.filter((e3) => !t2.parsed.newAliases[e3] && M3.every((t3) => -1 === (l3.alias[t3] || []).indexOf(e3)));
        const _3 = i2("Options:");
        h3[_3] || (h3[_3] = []), function(t3, e3, s3, i3) {
          let n3 = [], r4 = null;
          Object.keys(s3).forEach((t4) => {
            n3 = n3.concat(s3[t4]);
          }), t3.forEach((t4) => {
            r4 = [t4].concat(e3[t4]), r4.some((t5) => -1 !== n3.indexOf(t5)) || s3[i3].push(t4);
          });
        }(g2, l3.alias, h3, _3);
        const k2 = (t3) => /^--/.test(I(t3)), x2 = Object.keys(h3).filter((t3) => h3[t3].length > 0).map((t3) => ({ groupName: t3, normalizedKeys: h3[t3].filter(C2).map((t4) => {
          if (M3.includes(t4)) return t4;
          for (let e3, s3 = 0; void 0 !== (e3 = M3[s3]); s3++) if ((l3.alias[e3] || []).includes(t4)) return e3;
          return t4;
        }) })).filter(({ normalizedKeys: t3 }) => t3.length > 0).map(({ groupName: t3, normalizedKeys: e3 }) => {
          const s3 = e3.reduce((e4, s4) => (e4[s4] = [s4].concat(l3.alias[s4] || []).map((e5) => t3 === n2.getPositionalGroupName() ? e5 : (/^[0-9]$/.test(e5) ? l3.boolean.includes(s4) ? "-" : "--" : e5.length > 1 ? "--" : "-") + e5).sort((t4, e5) => k2(t4) === k2(e5) ? 0 : k2(t4) ? 1 : -1).join(", "), e4), {});
          return { groupName: t3, normalizedKeys: e3, switches: s3 };
        });
        if (x2.filter(({ groupName: t3 }) => t3 !== n2.getPositionalGroupName()).some(({ normalizedKeys: t3, switches: e3 }) => !t3.every((t4) => k2(e3[t4]))) && x2.filter(({ groupName: t3 }) => t3 !== n2.getPositionalGroupName()).forEach(({ normalizedKeys: t3, switches: e3 }) => {
          t3.forEach((t4) => {
            var s3, i3;
            k2(e3[t4]) && (e3[t4] = (s3 = e3[t4], i3 = 4, S(s3) ? { text: s3.text, indentation: s3.indentation + i3 } : { text: s3, indentation: i3 }));
          });
        }), x2.forEach(({ groupName: e3, normalizedKeys: s3, switches: o4 }) => {
          b3.div(e3), s3.forEach((e4) => {
            const s4 = o4[e4];
            let h4 = p2[e4] || "", c3 = null;
            h4.includes(v2) && (h4 = i2(h4.substring(16))), l3.boolean.includes(e4) && (c3 = `[${i2("boolean")}]`), l3.count.includes(e4) && (c3 = `[${i2("count")}]`), l3.string.includes(e4) && (c3 = `[${i2("string")}]`), l3.normalize.includes(e4) && (c3 = `[${i2("string")}]`), l3.array.includes(e4) && (c3 = `[${i2("array")}]`), l3.number.includes(e4) && (c3 = `[${i2("number")}]`);
            const f3 = [e4 in a3 ? (d3 = a3[e4], "string" == typeof d3 ? `[${i2("deprecated: %s", d3)}]` : `[${i2("deprecated")}]`) : null, c3, e4 in r3 ? `[${i2("required")}]` : null, l3.choices && l3.choices[e4] ? `[${i2("choices:")} ${n2.stringifiedValues(l3.choices[e4])}]` : null, j2(l3.default[e4], l3.defaultDescription[e4])].filter(Boolean).join(" ");
            var d3;
            b3.span({ text: I(s4), padding: [0, 2, 0, 2 + $(s4)], width: O2(o4, y3) + 4 }, h4);
            const u3 = true === t2.getInternalMethods().getUsageConfiguration()["hide-types"];
            f3 && !u3 ? b3.div({ text: f3, padding: [0, 0, 0, 2], align: "right" }) : b3.div();
          }), b3.div();
        }), d2.length && (b3.div(i2("Examples:")), d2.forEach((t3) => {
          t3[0] = t3[0].replace(/\$0/g, e2);
        }), d2.forEach((t3) => {
          "" === t3[1] ? b3.div({ text: t3[0], padding: [0, 2, 0, 2] }) : b3.div({ text: t3[0], padding: [0, 2, 0, 2], width: O2(d2, y3) + 4 }, { text: t3[1] });
        }), b3.div()), m2.length > 0) {
          const t3 = m2.map((t4) => t4.replace(/\$0/g, e2)).join("\n");
          b3.div(`${t3}
`);
        }
        return b3.toString().replace(/\s*$/, "");
      }, n2.cacheHelpMessage = function() {
        w2 = this.help();
      }, n2.clearCachedHelpMessage = function() {
        w2 = void 0;
      }, n2.hasCachedHelpMessage = function() {
        return !!w2;
      }, n2.showHelp = (e2) => {
        const s3 = t2.getInternalMethods().getLoggerInstance();
        e2 || (e2 = "error");
        ("function" == typeof e2 ? e2 : s3[e2])(n2.help());
      }, n2.functionDescription = (t3) => ["(", t3.name ? s2.Parser.decamelize(t3.name, "-") : i2("generated-value"), ")"].join(""), n2.stringifiedValues = function(t3, e2) {
        let s3 = "";
        const i3 = e2 || ", ", n3 = [].concat(t3);
        return t3 && n3.length ? (n3.forEach((t4) => {
          s3.length && (s3 += i3), s3 += JSON.stringify(t4);
        }), s3) : s3;
      };
      let M2 = null;
      n2.version = (t3) => {
        M2 = t3;
      }, n2.showVersion = (e2) => {
        const s3 = t2.getInternalMethods().getLoggerInstance();
        e2 || (e2 = "error");
        ("function" == typeof e2 ? e2 : s3[e2])(M2);
      }, n2.reset = function(t3) {
        return o2 = null, l2 = false, c2 = [], f2 = false, m2 = [], d2 = [], u2 = [], p2 = g(p2, (e2) => !t3[e2]), n2;
      };
      const _2 = [];
      return n2.freeze = function() {
        _2.push({ failMessage: o2, failureOutput: l2, usages: c2, usageDisabled: f2, epilogs: m2, examples: d2, commands: u2, descriptions: p2 });
      }, n2.unfreeze = function(t3 = false) {
        const e2 = _2.pop();
        e2 && (t3 ? (p2 = { ...e2.descriptions, ...p2 }, u2 = [...e2.commands, ...u2], c2 = [...e2.usages, ...c2], d2 = [...e2.examples, ...d2], m2 = [...e2.epilogs, ...m2]) : { failMessage: o2, failureOutput: l2, usages: c2, usageDisabled: f2, epilogs: m2, examples: d2, commands: u2, descriptions: p2 } = e2);
      }, n2;
    }
    function S(t2) {
      return "object" == typeof t2;
    }
    function $(t2) {
      return S(t2) ? t2.indentation : 0;
    }
    function I(t2) {
      return S(t2) ? t2.text : t2;
    }
    var D = class {
      constructor(t2, e2, s2, i2) {
        var n2, r2, o2;
        this.yargs = t2, this.usage = e2, this.command = s2, this.shim = i2, this.completionKey = "get-yargs-completions", this.aliases = null, this.customCompletionFunction = null, this.indexAfterLastReset = 0, this.zshShell = null !== (o2 = (null === (n2 = this.shim.getEnv("SHELL")) || void 0 === n2 ? void 0 : n2.includes("zsh")) || (null === (r2 = this.shim.getEnv("ZSH_NAME")) || void 0 === r2 ? void 0 : r2.includes("zsh"))) && void 0 !== o2 && o2;
      }
      defaultCompletion(t2, e2, s2, i2) {
        const n2 = this.command.getCommandHandlers();
        for (let e3 = 0, s3 = t2.length; e3 < s3; ++e3) if (n2[t2[e3]] && n2[t2[e3]].builder) {
          const s4 = n2[t2[e3]].builder;
          if (x(s4)) {
            this.indexAfterLastReset = e3 + 1;
            const t3 = this.yargs.getInternalMethods().reset();
            return s4(t3, true), t3.argv;
          }
        }
        const r2 = [];
        this.commandCompletions(r2, t2, s2), this.optionCompletions(r2, t2, e2, s2), this.choicesFromOptionsCompletions(r2, t2, e2, s2), this.choicesFromPositionalsCompletions(r2, t2, e2, s2), i2(null, r2);
      }
      commandCompletions(t2, e2, s2) {
        const i2 = this.yargs.getInternalMethods().getContext().commands;
        s2.match(/^-/) || i2[i2.length - 1] === s2 || this.previousArgHasChoices(e2) || this.usage.getCommands().forEach((s3) => {
          const i3 = o(s3[0]).cmd;
          if (-1 === e2.indexOf(i3)) if (this.zshShell) {
            const e3 = s3[1] || "";
            t2.push(i3.replace(/:/g, "\\:") + ":" + e3);
          } else t2.push(i3);
        });
      }
      optionCompletions(t2, e2, s2, i2) {
        if ((i2.match(/^-/) || "" === i2 && 0 === t2.length) && !this.previousArgHasChoices(e2)) {
          const s3 = this.yargs.getOptions(), n2 = this.yargs.getGroups()[this.usage.getPositionalGroupName()] || [];
          Object.keys(s3.key).forEach((r2) => {
            const o2 = !!s3.configuration["boolean-negation"] && s3.boolean.includes(r2);
            n2.includes(r2) || s3.hiddenOptions.includes(r2) || this.argsContainKey(e2, r2, o2) || this.completeOptionKey(r2, t2, i2, o2 && !!s3.default[r2]);
          });
        }
      }
      choicesFromOptionsCompletions(t2, e2, s2, i2) {
        if (this.previousArgHasChoices(e2)) {
          const s3 = this.getPreviousArgChoices(e2);
          s3 && s3.length > 0 && t2.push(...s3.map((t3) => t3.replace(/:/g, "\\:")));
        }
      }
      choicesFromPositionalsCompletions(t2, e2, s2, i2) {
        if ("" === i2 && t2.length > 0 && this.previousArgHasChoices(e2)) return;
        const n2 = this.yargs.getGroups()[this.usage.getPositionalGroupName()] || [], r2 = Math.max(this.indexAfterLastReset, this.yargs.getInternalMethods().getContext().commands.length + 1), o2 = n2[s2._.length - r2 - 1];
        if (!o2) return;
        const a2 = this.yargs.getOptions().choices[o2] || [];
        for (const e3 of a2) e3.startsWith(i2) && t2.push(e3.replace(/:/g, "\\:"));
      }
      getPreviousArgChoices(t2) {
        if (t2.length < 1) return;
        let e2 = t2[t2.length - 1], s2 = "";
        if (!e2.startsWith("-") && t2.length > 1 && (s2 = e2, e2 = t2[t2.length - 2]), !e2.startsWith("-")) return;
        const i2 = e2.replace(/^-+/, ""), n2 = this.yargs.getOptions(), r2 = [i2, ...this.yargs.getAliases()[i2] || []];
        let o2;
        for (const t3 of r2) if (Object.prototype.hasOwnProperty.call(n2.key, t3) && Array.isArray(n2.choices[t3])) {
          o2 = n2.choices[t3];
          break;
        }
        return o2 ? o2.filter((t3) => !s2 || t3.startsWith(s2)) : void 0;
      }
      previousArgHasChoices(t2) {
        const e2 = this.getPreviousArgChoices(t2);
        return void 0 !== e2 && e2.length > 0;
      }
      argsContainKey(t2, e2, s2) {
        const i2 = (e3) => -1 !== t2.indexOf((/^[^0-9]$/.test(e3) ? "-" : "--") + e3);
        if (i2(e2)) return true;
        if (s2 && i2(`no-${e2}`)) return true;
        if (this.aliases) {
          for (const t3 of this.aliases[e2]) if (i2(t3)) return true;
        }
        return false;
      }
      completeOptionKey(t2, e2, s2, i2) {
        var n2, r2, o2, a2;
        let h2 = t2;
        if (this.zshShell) {
          const e3 = this.usage.getDescriptions(), s3 = null === (r2 = null === (n2 = null == this ? void 0 : this.aliases) || void 0 === n2 ? void 0 : n2[t2]) || void 0 === r2 ? void 0 : r2.find((t3) => {
            const s4 = e3[t3];
            return "string" == typeof s4 && s4.length > 0;
          }), i3 = s3 ? e3[s3] : void 0, l3 = null !== (a2 = null !== (o2 = e3[t2]) && void 0 !== o2 ? o2 : i3) && void 0 !== a2 ? a2 : "";
          h2 = `${t2.replace(/:/g, "\\:")}:${l3.replace("__yargsString__:", "").replace(/(\r\n|\n|\r)/gm, " ")}`;
        }
        const l2 = !/^--/.test(s2) && ((t3) => /^[^0-9]$/.test(t3))(t2) ? "-" : "--";
        e2.push(l2 + h2), i2 && e2.push(l2 + "no-" + h2);
      }
      customCompletion(t2, e2, s2, i2) {
        if (d(this.customCompletionFunction, null, this.shim), this.customCompletionFunction.length < 3) {
          const t3 = this.customCompletionFunction(s2, e2);
          return f(t3) ? t3.then((t4) => {
            this.shim.process.nextTick(() => {
              i2(null, t4);
            });
          }).catch((t4) => {
            this.shim.process.nextTick(() => {
              i2(t4, void 0);
            });
          }) : i2(null, t3);
        }
        return function(t3) {
          return t3.length > 3;
        }(this.customCompletionFunction) ? this.customCompletionFunction(s2, e2, (n2 = i2) => this.defaultCompletion(t2, e2, s2, n2), (t3) => {
          i2(null, t3);
        }) : this.customCompletionFunction(s2, e2, (t3) => {
          i2(null, t3);
        });
      }
      getCompletion(t2, e2) {
        const s2 = t2.length ? t2[t2.length - 1] : "", i2 = this.yargs.parse(t2, true), n2 = this.customCompletionFunction ? (i3) => this.customCompletion(t2, i3, s2, e2) : (i3) => this.defaultCompletion(t2, i3, s2, e2);
        return f(i2) ? i2.then(n2) : n2(i2);
      }
      generateCompletionScript(t2, e2) {
        let s2 = this.zshShell ? `#compdef {{app_name}}
###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.zshrc
#    or {{app_path}} {{completion_command}} >> ~/.zprofile on OSX.
#
_{{app_name}}_yargs_completions()
{
  local reply
  local si=$IFS
  IFS=$'
' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" {{app_path}} --get-yargs-completions "\${words[@]}"))
  IFS=$si
  _describe 'values' reply
}
compdef _{{app_name}}_yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
` : '###-begin-{{app_name}}-completions-###\n#\n# yargs command completion script\n#\n# Installation: {{app_path}} {{completion_command}} >> ~/.bashrc\n#    or {{app_path}} {{completion_command}} >> ~/.bash_profile on OSX.\n#\n_{{app_name}}_yargs_completions()\n{\n    local cur_word args type_list\n\n    cur_word="${COMP_WORDS[COMP_CWORD]}"\n    args=("${COMP_WORDS[@]}")\n\n    # ask yargs to generate completions.\n    type_list=$({{app_path}} --get-yargs-completions "${args[@]}")\n\n    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )\n\n    # if no match was found, fall back to filename completion\n    if [ ${#COMPREPLY[@]} -eq 0 ]; then\n      COMPREPLY=()\n    fi\n\n    return 0\n}\ncomplete -o bashdefault -o default -F _{{app_name}}_yargs_completions {{app_name}}\n###-end-{{app_name}}-completions-###\n';
        const i2 = this.shim.path.basename(t2);
        return t2.match(/\.js$/) && (t2 = `./${t2}`), s2 = s2.replace(/{{app_name}}/g, i2), s2 = s2.replace(/{{completion_command}}/g, e2), s2.replace(/{{app_path}}/g, t2);
      }
      registerFunction(t2) {
        this.customCompletionFunction = t2;
      }
      setParsed(t2) {
        this.aliases = t2.aliases;
      }
    };
    function N(t2, e2) {
      if (0 === t2.length) return e2.length;
      if (0 === e2.length) return t2.length;
      const s2 = [];
      let i2, n2;
      for (i2 = 0; i2 <= e2.length; i2++) s2[i2] = [i2];
      for (n2 = 0; n2 <= t2.length; n2++) s2[0][n2] = n2;
      for (i2 = 1; i2 <= e2.length; i2++) for (n2 = 1; n2 <= t2.length; n2++) e2.charAt(i2 - 1) === t2.charAt(n2 - 1) ? s2[i2][n2] = s2[i2 - 1][n2 - 1] : i2 > 1 && n2 > 1 && e2.charAt(i2 - 2) === t2.charAt(n2 - 1) && e2.charAt(i2 - 1) === t2.charAt(n2 - 2) ? s2[i2][n2] = s2[i2 - 2][n2 - 2] + 1 : s2[i2][n2] = Math.min(s2[i2 - 1][n2 - 1] + 1, Math.min(s2[i2][n2 - 1] + 1, s2[i2 - 1][n2] + 1));
      return s2[e2.length][t2.length];
    }
    var H = ["$0", "--", "_"];
    var z;
    var W;
    var q;
    var U;
    var F;
    var L;
    var V;
    var G;
    var R;
    var T;
    var B;
    var Y;
    var K;
    var J;
    var Z;
    var X;
    var Q;
    var tt;
    var et;
    var st;
    var it;
    var nt;
    var rt;
    var ot;
    var at;
    var ht;
    var lt;
    var ct;
    var ft;
    var dt;
    var ut;
    var pt;
    var gt;
    var mt;
    var yt;
    var bt = Symbol("copyDoubleDash");
    var vt = Symbol("copyDoubleDash");
    var Ot = Symbol("deleteFromParserHintObject");
    var wt = Symbol("emitWarning");
    var Ct = Symbol("freeze");
    var jt = Symbol("getDollarZero");
    var Mt = Symbol("getParserConfiguration");
    var _t = Symbol("getUsageConfiguration");
    var kt = Symbol("guessLocale");
    var xt = Symbol("guessVersion");
    var Et = Symbol("parsePositionalNumbers");
    var At = Symbol("pkgUp");
    var Pt = Symbol("populateParserHintArray");
    var St = Symbol("populateParserHintSingleValueDictionary");
    var $t = Symbol("populateParserHintArrayDictionary");
    var It = Symbol("populateParserHintDictionary");
    var Dt = Symbol("sanitizeKey");
    var Nt = Symbol("setKey");
    var Ht = Symbol("unfreeze");
    var zt = Symbol("validateAsync");
    var Wt = Symbol("getCommandInstance");
    var qt = Symbol("getContext");
    var Ut = Symbol("getHasOutput");
    var Ft = Symbol("getLoggerInstance");
    var Lt = Symbol("getParseContext");
    var Vt = Symbol("getUsageInstance");
    var Gt = Symbol("getValidationInstance");
    var Rt = Symbol("hasParseCallback");
    var Tt = Symbol("isGlobalContext");
    var Bt = Symbol("postProcess");
    var Yt = Symbol("rebase");
    var Kt = Symbol("reset");
    var Jt = Symbol("runYargsParserAndExecuteCommands");
    var Zt = Symbol("runValidation");
    var Xt = Symbol("setHasOutput");
    var Qt = Symbol("kTrackManuallySetKeys");
    var te = class {
      constructor(t2 = [], e2, s2, i2) {
        this.customScriptName = false, this.parsed = false, z.set(this, void 0), W.set(this, void 0), q.set(this, { commands: [], fullCommands: [] }), U.set(this, null), F.set(this, null), L.set(this, "show-hidden"), V.set(this, null), G.set(this, true), R.set(this, {}), T.set(this, true), B.set(this, []), Y.set(this, void 0), K.set(this, {}), J.set(this, false), Z.set(this, null), X.set(this, true), Q.set(this, void 0), tt.set(this, ""), et.set(this, void 0), st.set(this, void 0), it.set(this, {}), nt.set(this, null), rt.set(this, null), ot.set(this, {}), at.set(this, {}), ht.set(this, void 0), lt.set(this, false), ct.set(this, void 0), ft.set(this, false), dt.set(this, false), ut.set(this, false), pt.set(this, void 0), gt.set(this, {}), mt.set(this, null), yt.set(this, void 0), O(this, ct, i2, "f"), O(this, ht, t2, "f"), O(this, W, e2, "f"), O(this, st, s2, "f"), O(this, Y, new w(this), "f"), this.$0 = this[jt](), this[Kt](), O(this, z, v(this, z, "f"), "f"), O(this, pt, v(this, pt, "f"), "f"), O(this, yt, v(this, yt, "f"), "f"), O(this, et, v(this, et, "f"), "f"), v(this, et, "f").showHiddenOpt = v(this, L, "f"), O(this, Q, this[vt](), "f");
      }
      addHelpOpt(t2, e2) {
        return h("[string|boolean] [string]", [t2, e2], arguments.length), v(this, Z, "f") && (this[Ot](v(this, Z, "f")), O(this, Z, null, "f")), false === t2 && void 0 === e2 || (O(this, Z, "string" == typeof t2 ? t2 : "help", "f"), this.boolean(v(this, Z, "f")), this.describe(v(this, Z, "f"), e2 || v(this, pt, "f").deferY18nLookup("Show help"))), this;
      }
      help(t2, e2) {
        return this.addHelpOpt(t2, e2);
      }
      addShowHiddenOpt(t2, e2) {
        if (h("[string|boolean] [string]", [t2, e2], arguments.length), false === t2 && void 0 === e2) return this;
        const s2 = "string" == typeof t2 ? t2 : v(this, L, "f");
        return this.boolean(s2), this.describe(s2, e2 || v(this, pt, "f").deferY18nLookup("Show hidden options")), v(this, et, "f").showHiddenOpt = s2, this;
      }
      showHidden(t2, e2) {
        return this.addShowHiddenOpt(t2, e2);
      }
      alias(t2, e2) {
        return h("<object|string|array> [string|array]", [t2, e2], arguments.length), this[$t](this.alias.bind(this), "alias", t2, e2), this;
      }
      array(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("array", t2), this[Qt](t2), this;
      }
      boolean(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("boolean", t2), this[Qt](t2), this;
      }
      check(t2, e2) {
        return h("<function> [boolean]", [t2, e2], arguments.length), this.middleware((e3, s2) => j(() => t2(e3, s2.getOptions()), (s3) => (s3 ? ("string" == typeof s3 || s3 instanceof Error) && v(this, pt, "f").fail(s3.toString(), s3) : v(this, pt, "f").fail(v(this, ct, "f").y18n.__("Argument check failed: %s", t2.toString())), e3), (t3) => (v(this, pt, "f").fail(t3.message ? t3.message : t3.toString(), t3), e3)), false, e2), this;
      }
      choices(t2, e2) {
        return h("<object|string|array> [string|array]", [t2, e2], arguments.length), this[$t](this.choices.bind(this), "choices", t2, e2), this;
      }
      coerce(t2, s2) {
        if (h("<object|string|array> [function]", [t2, s2], arguments.length), Array.isArray(t2)) {
          if (!s2) throw new e("coerce callback must be provided");
          for (const e2 of t2) this.coerce(e2, s2);
          return this;
        }
        if ("object" == typeof t2) {
          for (const e2 of Object.keys(t2)) this.coerce(e2, t2[e2]);
          return this;
        }
        if (!s2) throw new e("coerce callback must be provided");
        return v(this, et, "f").key[t2] = true, v(this, Y, "f").addCoerceMiddleware((i2, n2) => {
          let r2;
          return Object.prototype.hasOwnProperty.call(i2, t2) ? j(() => (r2 = n2.getAliases(), s2(i2[t2])), (e2) => {
            i2[t2] = e2;
            const s3 = n2.getInternalMethods().getParserConfiguration()["strip-aliased"];
            if (r2[t2] && true !== s3) for (const s4 of r2[t2]) i2[s4] = e2;
            return i2;
          }, (t3) => {
            throw new e(t3.message);
          }) : i2;
        }, t2), this;
      }
      conflicts(t2, e2) {
        return h("<string|object> [string|array]", [t2, e2], arguments.length), v(this, yt, "f").conflicts(t2, e2), this;
      }
      config(t2 = "config", e2, s2) {
        return h("[object|string] [string|function] [function]", [t2, e2, s2], arguments.length), "object" != typeof t2 || Array.isArray(t2) ? ("function" == typeof e2 && (s2 = e2, e2 = void 0), this.describe(t2, e2 || v(this, pt, "f").deferY18nLookup("Path to JSON config file")), (Array.isArray(t2) ? t2 : [t2]).forEach((t3) => {
          v(this, et, "f").config[t3] = s2 || true;
        }), this) : (t2 = n(t2, v(this, W, "f"), this[Mt]()["deep-merge-config"] || false, v(this, ct, "f")), v(this, et, "f").configObjects = (v(this, et, "f").configObjects || []).concat(t2), this);
      }
      completion(t2, e2, s2) {
        return h("[string] [string|boolean|function] [function]", [t2, e2, s2], arguments.length), "function" == typeof e2 && (s2 = e2, e2 = void 0), O(this, F, t2 || v(this, F, "f") || "completion", "f"), e2 || false === e2 || (e2 = "generate completion script"), this.command(v(this, F, "f"), e2), s2 && v(this, U, "f").registerFunction(s2), this;
      }
      command(t2, e2, s2, i2, n2, r2) {
        return h("<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]", [t2, e2, s2, i2, n2, r2], arguments.length), v(this, z, "f").addHandler(t2, e2, s2, i2, n2, r2), this;
      }
      commands(t2, e2, s2, i2, n2, r2) {
        return this.command(t2, e2, s2, i2, n2, r2);
      }
      commandDir(t2, e2) {
        h("<string> [object]", [t2, e2], arguments.length);
        const s2 = v(this, st, "f") || v(this, ct, "f").require;
        return v(this, z, "f").addDirectory(t2, s2, v(this, ct, "f").getCallerFile(), e2), this;
      }
      count(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("count", t2), this[Qt](t2), this;
      }
      default(t2, e2, s2) {
        return h("<object|string|array> [*] [string]", [t2, e2, s2], arguments.length), s2 && (u(t2, v(this, ct, "f")), v(this, et, "f").defaultDescription[t2] = s2), "function" == typeof e2 && (u(t2, v(this, ct, "f")), v(this, et, "f").defaultDescription[t2] || (v(this, et, "f").defaultDescription[t2] = v(this, pt, "f").functionDescription(e2)), e2 = e2.call()), this[St](this.default.bind(this), "default", t2, e2), this;
      }
      defaults(t2, e2, s2) {
        return this.default(t2, e2, s2);
      }
      demandCommand(t2 = 1, e2, s2, i2) {
        return h("[number] [number|string] [string|null|undefined] [string|null|undefined]", [t2, e2, s2, i2], arguments.length), "number" != typeof e2 && (s2 = e2, e2 = 1 / 0), this.global("_", false), v(this, et, "f").demandedCommands._ = { min: t2, max: e2, minMsg: s2, maxMsg: i2 }, this;
      }
      demand(t2, e2, s2) {
        return Array.isArray(e2) ? (e2.forEach((t3) => {
          d(s2, true, v(this, ct, "f")), this.demandOption(t3, s2);
        }), e2 = 1 / 0) : "number" != typeof e2 && (s2 = e2, e2 = 1 / 0), "number" == typeof t2 ? (d(s2, true, v(this, ct, "f")), this.demandCommand(t2, e2, s2, s2)) : Array.isArray(t2) ? t2.forEach((t3) => {
          d(s2, true, v(this, ct, "f")), this.demandOption(t3, s2);
        }) : "string" == typeof s2 ? this.demandOption(t2, s2) : true !== s2 && void 0 !== s2 || this.demandOption(t2), this;
      }
      demandOption(t2, e2) {
        return h("<object|string|array> [string]", [t2, e2], arguments.length), this[St](this.demandOption.bind(this), "demandedOptions", t2, e2), this;
      }
      deprecateOption(t2, e2) {
        return h("<string> [string|boolean]", [t2, e2], arguments.length), v(this, et, "f").deprecatedOptions[t2] = e2, this;
      }
      describe(t2, e2) {
        return h("<object|string|array> [string]", [t2, e2], arguments.length), this[Nt](t2, true), v(this, pt, "f").describe(t2, e2), this;
      }
      detectLocale(t2) {
        return h("<boolean>", [t2], arguments.length), O(this, G, t2, "f"), this;
      }
      env(t2) {
        return h("[string|boolean]", [t2], arguments.length), false === t2 ? delete v(this, et, "f").envPrefix : v(this, et, "f").envPrefix = t2 || "", this;
      }
      epilogue(t2) {
        return h("<string>", [t2], arguments.length), v(this, pt, "f").epilog(t2), this;
      }
      epilog(t2) {
        return this.epilogue(t2);
      }
      example(t2, e2) {
        return h("<string|array> [string]", [t2, e2], arguments.length), Array.isArray(t2) ? t2.forEach((t3) => this.example(...t3)) : v(this, pt, "f").example(t2, e2), this;
      }
      exit(t2, e2) {
        O(this, J, true, "f"), O(this, V, e2, "f"), v(this, T, "f") && v(this, ct, "f").process.exit(t2);
      }
      exitProcess(t2 = true) {
        return h("[boolean]", [t2], arguments.length), O(this, T, t2, "f"), this;
      }
      fail(t2) {
        if (h("<function|boolean>", [t2], arguments.length), "boolean" == typeof t2 && false !== t2) throw new e("Invalid first argument. Expected function or boolean 'false'");
        return v(this, pt, "f").failFn(t2), this;
      }
      getAliases() {
        return this.parsed ? this.parsed.aliases : {};
      }
      async getCompletion(t2, e2) {
        return h("<array> [function]", [t2, e2], arguments.length), e2 ? v(this, U, "f").getCompletion(t2, e2) : new Promise((e3, s2) => {
          v(this, U, "f").getCompletion(t2, (t3, i2) => {
            t3 ? s2(t3) : e3(i2);
          });
        });
      }
      getDemandedOptions() {
        return h([], 0), v(this, et, "f").demandedOptions;
      }
      getDemandedCommands() {
        return h([], 0), v(this, et, "f").demandedCommands;
      }
      getDeprecatedOptions() {
        return h([], 0), v(this, et, "f").deprecatedOptions;
      }
      getDetectLocale() {
        return v(this, G, "f");
      }
      getExitProcess() {
        return v(this, T, "f");
      }
      getGroups() {
        return Object.assign({}, v(this, K, "f"), v(this, at, "f"));
      }
      getHelp() {
        if (O(this, J, true, "f"), !v(this, pt, "f").hasCachedHelpMessage()) {
          if (!this.parsed) {
            const t3 = this[Jt](v(this, ht, "f"), void 0, void 0, 0, true);
            if (f(t3)) return t3.then(() => v(this, pt, "f").help());
          }
          const t2 = v(this, z, "f").runDefaultBuilderOn(this);
          if (f(t2)) return t2.then(() => v(this, pt, "f").help());
        }
        return Promise.resolve(v(this, pt, "f").help());
      }
      getOptions() {
        return v(this, et, "f");
      }
      getStrict() {
        return v(this, ft, "f");
      }
      getStrictCommands() {
        return v(this, dt, "f");
      }
      getStrictOptions() {
        return v(this, ut, "f");
      }
      global(t2, e2) {
        return h("<string|array> [boolean]", [t2, e2], arguments.length), t2 = [].concat(t2), false !== e2 ? v(this, et, "f").local = v(this, et, "f").local.filter((e3) => -1 === t2.indexOf(e3)) : t2.forEach((t3) => {
          v(this, et, "f").local.includes(t3) || v(this, et, "f").local.push(t3);
        }), this;
      }
      group(t2, e2) {
        h("<string|array> <string>", [t2, e2], arguments.length);
        const s2 = v(this, at, "f")[e2] || v(this, K, "f")[e2];
        v(this, at, "f")[e2] && delete v(this, at, "f")[e2];
        const i2 = {};
        return v(this, K, "f")[e2] = (s2 || []).concat(t2).filter((t3) => !i2[t3] && (i2[t3] = true)), this;
      }
      hide(t2) {
        return h("<string>", [t2], arguments.length), v(this, et, "f").hiddenOptions.push(t2), this;
      }
      implies(t2, e2) {
        return h("<string|object> [number|string|array]", [t2, e2], arguments.length), v(this, yt, "f").implies(t2, e2), this;
      }
      locale(t2) {
        return h("[string]", [t2], arguments.length), void 0 === t2 ? (this[kt](), v(this, ct, "f").y18n.getLocale()) : (O(this, G, false, "f"), v(this, ct, "f").y18n.setLocale(t2), this);
      }
      middleware(t2, e2, s2) {
        return v(this, Y, "f").addMiddleware(t2, !!e2, s2);
      }
      nargs(t2, e2) {
        return h("<string|object|array> [number]", [t2, e2], arguments.length), this[St](this.nargs.bind(this), "narg", t2, e2), this;
      }
      normalize(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("normalize", t2), this;
      }
      number(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("number", t2), this[Qt](t2), this;
      }
      option(t2, e2) {
        if (h("<string|object> [object]", [t2, e2], arguments.length), "object" == typeof t2) Object.keys(t2).forEach((e3) => {
          this.options(e3, t2[e3]);
        });
        else {
          "object" != typeof e2 && (e2 = {}), this[Qt](t2), !v(this, mt, "f") || "version" !== t2 && "version" !== (null == e2 ? void 0 : e2.alias) || this[wt](['"version" is a reserved word.', "Please do one of the following:", '- Disable version with `yargs.version(false)` if using "version" as an option', "- Use the built-in `yargs.version` method instead (if applicable)", "- Use a different option key", "https://yargs.js.org/docs/#api-reference-version"].join("\n"), void 0, "versionWarning"), v(this, et, "f").key[t2] = true, e2.alias && this.alias(t2, e2.alias);
          const s2 = e2.deprecate || e2.deprecated;
          s2 && this.deprecateOption(t2, s2);
          const i2 = e2.demand || e2.required || e2.require;
          i2 && this.demand(t2, i2), e2.demandOption && this.demandOption(t2, "string" == typeof e2.demandOption ? e2.demandOption : void 0), e2.conflicts && this.conflicts(t2, e2.conflicts), "default" in e2 && this.default(t2, e2.default), void 0 !== e2.implies && this.implies(t2, e2.implies), void 0 !== e2.nargs && this.nargs(t2, e2.nargs), e2.config && this.config(t2, e2.configParser), e2.normalize && this.normalize(t2), e2.choices && this.choices(t2, e2.choices), e2.coerce && this.coerce(t2, e2.coerce), e2.group && this.group(t2, e2.group), (e2.boolean || "boolean" === e2.type) && (this.boolean(t2), e2.alias && this.boolean(e2.alias)), (e2.array || "array" === e2.type) && (this.array(t2), e2.alias && this.array(e2.alias)), (e2.number || "number" === e2.type) && (this.number(t2), e2.alias && this.number(e2.alias)), (e2.string || "string" === e2.type) && (this.string(t2), e2.alias && this.string(e2.alias)), (e2.count || "count" === e2.type) && this.count(t2), "boolean" == typeof e2.global && this.global(t2, e2.global), e2.defaultDescription && (v(this, et, "f").defaultDescription[t2] = e2.defaultDescription), e2.skipValidation && this.skipValidation(t2);
          const n2 = e2.describe || e2.description || e2.desc, r2 = v(this, pt, "f").getDescriptions();
          Object.prototype.hasOwnProperty.call(r2, t2) && "string" != typeof n2 || this.describe(t2, n2), e2.hidden && this.hide(t2), e2.requiresArg && this.requiresArg(t2);
        }
        return this;
      }
      options(t2, e2) {
        return this.option(t2, e2);
      }
      parse(t2, e2, s2) {
        h("[string|array] [function|boolean|object] [function]", [t2, e2, s2], arguments.length), this[Ct](), void 0 === t2 && (t2 = v(this, ht, "f")), "object" == typeof e2 && (O(this, rt, e2, "f"), e2 = s2), "function" == typeof e2 && (O(this, nt, e2, "f"), e2 = false), e2 || O(this, ht, t2, "f"), v(this, nt, "f") && O(this, T, false, "f");
        const i2 = this[Jt](t2, !!e2), n2 = this.parsed;
        return v(this, U, "f").setParsed(this.parsed), f(i2) ? i2.then((t3) => (v(this, nt, "f") && v(this, nt, "f").call(this, v(this, V, "f"), t3, v(this, tt, "f")), t3)).catch((t3) => {
          throw v(this, nt, "f") && v(this, nt, "f")(t3, this.parsed.argv, v(this, tt, "f")), t3;
        }).finally(() => {
          this[Ht](), this.parsed = n2;
        }) : (v(this, nt, "f") && v(this, nt, "f").call(this, v(this, V, "f"), i2, v(this, tt, "f")), this[Ht](), this.parsed = n2, i2);
      }
      parseAsync(t2, e2, s2) {
        const i2 = this.parse(t2, e2, s2);
        return f(i2) ? i2 : Promise.resolve(i2);
      }
      parseSync(t2, s2, i2) {
        const n2 = this.parse(t2, s2, i2);
        if (f(n2)) throw new e(".parseSync() must not be used with asynchronous builders, handlers, or middleware");
        return n2;
      }
      parserConfiguration(t2) {
        return h("<object>", [t2], arguments.length), O(this, it, t2, "f"), this;
      }
      pkgConf(t2, e2) {
        h("<string> [string]", [t2, e2], arguments.length);
        let s2 = null;
        const i2 = this[At](e2 || v(this, W, "f"));
        return i2[t2] && "object" == typeof i2[t2] && (s2 = n(i2[t2], e2 || v(this, W, "f"), this[Mt]()["deep-merge-config"] || false, v(this, ct, "f")), v(this, et, "f").configObjects = (v(this, et, "f").configObjects || []).concat(s2)), this;
      }
      positional(t2, e2) {
        h("<string> <object>", [t2, e2], arguments.length);
        const s2 = ["default", "defaultDescription", "implies", "normalize", "choices", "conflicts", "coerce", "type", "describe", "desc", "description", "alias"];
        e2 = g(e2, (t3, e3) => !("type" === t3 && !["string", "number", "boolean"].includes(e3)) && s2.includes(t3));
        const i2 = v(this, q, "f").fullCommands[v(this, q, "f").fullCommands.length - 1], n2 = i2 ? v(this, z, "f").cmdToParseOptions(i2) : { array: [], alias: {}, default: {}, demand: {} };
        return p(n2).forEach((s3) => {
          const i3 = n2[s3];
          Array.isArray(i3) ? -1 !== i3.indexOf(t2) && (e2[s3] = true) : i3[t2] && !(s3 in e2) && (e2[s3] = i3[t2]);
        }), this.group(t2, v(this, pt, "f").getPositionalGroupName()), this.option(t2, e2);
      }
      recommendCommands(t2 = true) {
        return h("[boolean]", [t2], arguments.length), O(this, lt, t2, "f"), this;
      }
      required(t2, e2, s2) {
        return this.demand(t2, e2, s2);
      }
      require(t2, e2, s2) {
        return this.demand(t2, e2, s2);
      }
      requiresArg(t2) {
        return h("<array|string|object> [number]", [t2], arguments.length), "string" == typeof t2 && v(this, et, "f").narg[t2] || this[St](this.requiresArg.bind(this), "narg", t2, NaN), this;
      }
      showCompletionScript(t2, e2) {
        return h("[string] [string]", [t2, e2], arguments.length), t2 = t2 || this.$0, v(this, Q, "f").log(v(this, U, "f").generateCompletionScript(t2, e2 || v(this, F, "f") || "completion")), this;
      }
      showHelp(t2) {
        if (h("[string|function]", [t2], arguments.length), O(this, J, true, "f"), !v(this, pt, "f").hasCachedHelpMessage()) {
          if (!this.parsed) {
            const e3 = this[Jt](v(this, ht, "f"), void 0, void 0, 0, true);
            if (f(e3)) return e3.then(() => {
              v(this, pt, "f").showHelp(t2);
            }), this;
          }
          const e2 = v(this, z, "f").runDefaultBuilderOn(this);
          if (f(e2)) return e2.then(() => {
            v(this, pt, "f").showHelp(t2);
          }), this;
        }
        return v(this, pt, "f").showHelp(t2), this;
      }
      scriptName(t2) {
        return this.customScriptName = true, this.$0 = t2, this;
      }
      showHelpOnFail(t2, e2) {
        return h("[boolean|string] [string]", [t2, e2], arguments.length), v(this, pt, "f").showHelpOnFail(t2, e2), this;
      }
      showVersion(t2) {
        return h("[string|function]", [t2], arguments.length), v(this, pt, "f").showVersion(t2), this;
      }
      skipValidation(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("skipValidation", t2), this;
      }
      strict(t2) {
        return h("[boolean]", [t2], arguments.length), O(this, ft, false !== t2, "f"), this;
      }
      strictCommands(t2) {
        return h("[boolean]", [t2], arguments.length), O(this, dt, false !== t2, "f"), this;
      }
      strictOptions(t2) {
        return h("[boolean]", [t2], arguments.length), O(this, ut, false !== t2, "f"), this;
      }
      string(t2) {
        return h("<array|string>", [t2], arguments.length), this[Pt]("string", t2), this[Qt](t2), this;
      }
      terminalWidth() {
        return h([], 0), v(this, ct, "f").process.stdColumns;
      }
      updateLocale(t2) {
        return this.updateStrings(t2);
      }
      updateStrings(t2) {
        return h("<object>", [t2], arguments.length), O(this, G, false, "f"), v(this, ct, "f").y18n.updateLocale(t2), this;
      }
      usage(t2, s2, i2, n2) {
        if (h("<string|null|undefined> [string|boolean] [function|object] [function]", [t2, s2, i2, n2], arguments.length), void 0 !== s2) {
          if (d(t2, null, v(this, ct, "f")), (t2 || "").match(/^\$0( |$)/)) return this.command(t2, s2, i2, n2);
          throw new e(".usage() description must start with $0 if being used as alias for .command()");
        }
        return v(this, pt, "f").usage(t2), this;
      }
      usageConfiguration(t2) {
        return h("<object>", [t2], arguments.length), O(this, gt, t2, "f"), this;
      }
      version(t2, e2, s2) {
        const i2 = "version";
        if (h("[boolean|string] [string] [string]", [t2, e2, s2], arguments.length), v(this, mt, "f") && (this[Ot](v(this, mt, "f")), v(this, pt, "f").version(void 0), O(this, mt, null, "f")), 0 === arguments.length) s2 = this[xt](), t2 = i2;
        else if (1 === arguments.length) {
          if (false === t2) return this;
          s2 = t2, t2 = i2;
        } else 2 === arguments.length && (s2 = e2, e2 = void 0);
        return O(this, mt, "string" == typeof t2 ? t2 : i2, "f"), e2 = e2 || v(this, pt, "f").deferY18nLookup("Show version number"), v(this, pt, "f").version(s2 || void 0), this.boolean(v(this, mt, "f")), this.describe(v(this, mt, "f"), e2), this;
      }
      wrap(t2) {
        return h("<number|null|undefined>", [t2], arguments.length), v(this, pt, "f").wrap(t2), this;
      }
      [(z = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), bt)](t2) {
        if (!t2._ || !t2["--"]) return t2;
        t2._.push.apply(t2._, t2["--"]);
        try {
          delete t2["--"];
        } catch (t3) {
        }
        return t2;
      }
      [vt]() {
        return { log: (...t2) => {
          this[Rt]() || console.log(...t2), O(this, J, true, "f"), v(this, tt, "f").length && O(this, tt, v(this, tt, "f") + "\n", "f"), O(this, tt, v(this, tt, "f") + t2.join(" "), "f");
        }, error: (...t2) => {
          this[Rt]() || console.error(...t2), O(this, J, true, "f"), v(this, tt, "f").length && O(this, tt, v(this, tt, "f") + "\n", "f"), O(this, tt, v(this, tt, "f") + t2.join(" "), "f");
        } };
      }
      [Ot](t2) {
        p(v(this, et, "f")).forEach((e2) => {
          if ("configObjects" === e2) return;
          const s2 = v(this, et, "f")[e2];
          Array.isArray(s2) ? s2.includes(t2) && s2.splice(s2.indexOf(t2), 1) : "object" == typeof s2 && delete s2[t2];
        }), delete v(this, pt, "f").getDescriptions()[t2];
      }
      [wt](t2, e2, s2) {
        v(this, R, "f")[s2] || (v(this, ct, "f").process.emitWarning(t2, e2), v(this, R, "f")[s2] = true);
      }
      [Ct]() {
        v(this, B, "f").push({ options: v(this, et, "f"), configObjects: v(this, et, "f").configObjects.slice(0), exitProcess: v(this, T, "f"), groups: v(this, K, "f"), strict: v(this, ft, "f"), strictCommands: v(this, dt, "f"), strictOptions: v(this, ut, "f"), completionCommand: v(this, F, "f"), output: v(this, tt, "f"), exitError: v(this, V, "f"), hasOutput: v(this, J, "f"), parsed: this.parsed, parseFn: v(this, nt, "f"), parseContext: v(this, rt, "f") }), v(this, pt, "f").freeze(), v(this, yt, "f").freeze(), v(this, z, "f").freeze(), v(this, Y, "f").freeze();
      }
      [jt]() {
        let t2, e2 = "";
        return t2 = /\b(node|iojs|electron)(\.exe)?$/.test(v(this, ct, "f").process.argv()[0]) ? v(this, ct, "f").process.argv().slice(1, 2) : v(this, ct, "f").process.argv().slice(0, 1), e2 = t2.map((t3) => {
          const e3 = this[Yt](v(this, W, "f"), t3);
          return t3.match(/^(\/|([a-zA-Z]:)?\\)/) && e3.length < t3.length ? e3 : t3;
        }).join(" ").trim(), v(this, ct, "f").getEnv("_") && v(this, ct, "f").getProcessArgvBin() === v(this, ct, "f").getEnv("_") && (e2 = v(this, ct, "f").getEnv("_").replace(`${v(this, ct, "f").path.dirname(v(this, ct, "f").process.execPath())}/`, "")), e2;
      }
      [Mt]() {
        return v(this, it, "f");
      }
      [_t]() {
        return v(this, gt, "f");
      }
      [kt]() {
        if (!v(this, G, "f")) return;
        const t2 = v(this, ct, "f").getEnv("LC_ALL") || v(this, ct, "f").getEnv("LC_MESSAGES") || v(this, ct, "f").getEnv("LANG") || v(this, ct, "f").getEnv("LANGUAGE") || "en_US";
        this.locale(t2.replace(/[.:].*/, ""));
      }
      [xt]() {
        return this[At]().version || "unknown";
      }
      [Et](t2) {
        const e2 = t2["--"] ? t2["--"] : t2._;
        for (let t3, s2 = 0; void 0 !== (t3 = e2[s2]); s2++) v(this, ct, "f").Parser.looksLikeNumber(t3) && Number.isSafeInteger(Math.floor(parseFloat(`${t3}`))) && (e2[s2] = Number(t3));
        return t2;
      }
      [At](t2) {
        const e2 = t2 || "*";
        if (v(this, ot, "f")[e2]) return v(this, ot, "f")[e2];
        let s2 = {};
        try {
          let e3 = t2 || v(this, ct, "f").mainFilename;
          !t2 && v(this, ct, "f").path.extname(e3) && (e3 = v(this, ct, "f").path.dirname(e3));
          const i2 = v(this, ct, "f").findUp(e3, (t3, e4) => e4.includes("package.json") ? "package.json" : void 0);
          d(i2, void 0, v(this, ct, "f")), s2 = JSON.parse(v(this, ct, "f").readFileSync(i2, "utf8"));
        } catch (t3) {
        }
        return v(this, ot, "f")[e2] = s2 || {}, v(this, ot, "f")[e2];
      }
      [Pt](t2, e2) {
        (e2 = [].concat(e2)).forEach((e3) => {
          e3 = this[Dt](e3), v(this, et, "f")[t2].push(e3);
        });
      }
      [St](t2, e2, s2, i2) {
        this[It](t2, e2, s2, i2, (t3, e3, s3) => {
          v(this, et, "f")[t3][e3] = s3;
        });
      }
      [$t](t2, e2, s2, i2) {
        this[It](t2, e2, s2, i2, (t3, e3, s3) => {
          v(this, et, "f")[t3][e3] = (v(this, et, "f")[t3][e3] || []).concat(s3);
        });
      }
      [It](t2, e2, s2, i2, n2) {
        if (Array.isArray(s2)) s2.forEach((e3) => {
          t2(e3, i2);
        });
        else if (/* @__PURE__ */ ((t3) => "object" == typeof t3)(s2)) for (const e3 of p(s2)) t2(e3, s2[e3]);
        else n2(e2, this[Dt](s2), i2);
      }
      [Dt](t2) {
        return "__proto__" === t2 ? "___proto___" : t2;
      }
      [Nt](t2, e2) {
        return this[St](this[Nt].bind(this), "key", t2, e2), this;
      }
      [Ht]() {
        var t2, e2, s2, i2, n2, r2, o2, a2, h2, l2, c2, f2;
        const u2 = v(this, B, "f").pop();
        let p2;
        d(u2, void 0, v(this, ct, "f")), t2 = this, e2 = this, s2 = this, i2 = this, n2 = this, r2 = this, o2 = this, a2 = this, h2 = this, l2 = this, c2 = this, f2 = this, { options: { set value(e3) {
          O(t2, et, e3, "f");
        } }.value, configObjects: p2, exitProcess: { set value(t3) {
          O(e2, T, t3, "f");
        } }.value, groups: { set value(t3) {
          O(s2, K, t3, "f");
        } }.value, output: { set value(t3) {
          O(i2, tt, t3, "f");
        } }.value, exitError: { set value(t3) {
          O(n2, V, t3, "f");
        } }.value, hasOutput: { set value(t3) {
          O(r2, J, t3, "f");
        } }.value, parsed: this.parsed, strict: { set value(t3) {
          O(o2, ft, t3, "f");
        } }.value, strictCommands: { set value(t3) {
          O(a2, dt, t3, "f");
        } }.value, strictOptions: { set value(t3) {
          O(h2, ut, t3, "f");
        } }.value, completionCommand: { set value(t3) {
          O(l2, F, t3, "f");
        } }.value, parseFn: { set value(t3) {
          O(c2, nt, t3, "f");
        } }.value, parseContext: { set value(t3) {
          O(f2, rt, t3, "f");
        } }.value } = u2, v(this, et, "f").configObjects = p2, v(this, pt, "f").unfreeze(), v(this, yt, "f").unfreeze(), v(this, z, "f").unfreeze(), v(this, Y, "f").unfreeze();
      }
      [zt](t2, e2) {
        return j(e2, (e3) => (t2(e3), e3));
      }
      getInternalMethods() {
        return { getCommandInstance: this[Wt].bind(this), getContext: this[qt].bind(this), getHasOutput: this[Ut].bind(this), getLoggerInstance: this[Ft].bind(this), getParseContext: this[Lt].bind(this), getParserConfiguration: this[Mt].bind(this), getUsageConfiguration: this[_t].bind(this), getUsageInstance: this[Vt].bind(this), getValidationInstance: this[Gt].bind(this), hasParseCallback: this[Rt].bind(this), isGlobalContext: this[Tt].bind(this), postProcess: this[Bt].bind(this), reset: this[Kt].bind(this), runValidation: this[Zt].bind(this), runYargsParserAndExecuteCommands: this[Jt].bind(this), setHasOutput: this[Xt].bind(this) };
      }
      [Wt]() {
        return v(this, z, "f");
      }
      [qt]() {
        return v(this, q, "f");
      }
      [Ut]() {
        return v(this, J, "f");
      }
      [Ft]() {
        return v(this, Q, "f");
      }
      [Lt]() {
        return v(this, rt, "f") || {};
      }
      [Vt]() {
        return v(this, pt, "f");
      }
      [Gt]() {
        return v(this, yt, "f");
      }
      [Rt]() {
        return !!v(this, nt, "f");
      }
      [Tt]() {
        return v(this, X, "f");
      }
      [Bt](t2, e2, s2, i2) {
        if (s2) return t2;
        if (f(t2)) return t2;
        e2 || (t2 = this[bt](t2));
        return (this[Mt]()["parse-positional-numbers"] || void 0 === this[Mt]()["parse-positional-numbers"]) && (t2 = this[Et](t2)), i2 && (t2 = C(t2, this, v(this, Y, "f").getMiddleware(), false)), t2;
      }
      [Kt](t2 = {}) {
        O(this, et, v(this, et, "f") || {}, "f");
        const e2 = {};
        e2.local = v(this, et, "f").local || [], e2.configObjects = v(this, et, "f").configObjects || [];
        const s2 = {};
        e2.local.forEach((e3) => {
          s2[e3] = true, (t2[e3] || []).forEach((t3) => {
            s2[t3] = true;
          });
        }), Object.assign(v(this, at, "f"), Object.keys(v(this, K, "f")).reduce((t3, e3) => {
          const i2 = v(this, K, "f")[e3].filter((t4) => !(t4 in s2));
          return i2.length > 0 && (t3[e3] = i2), t3;
        }, {})), O(this, K, {}, "f");
        return ["array", "boolean", "string", "skipValidation", "count", "normalize", "number", "hiddenOptions"].forEach((t3) => {
          e2[t3] = (v(this, et, "f")[t3] || []).filter((t4) => !s2[t4]);
        }), ["narg", "key", "alias", "default", "defaultDescription", "config", "choices", "demandedOptions", "demandedCommands", "deprecatedOptions"].forEach((t3) => {
          e2[t3] = g(v(this, et, "f")[t3], (t4) => !s2[t4]);
        }), e2.envPrefix = v(this, et, "f").envPrefix, O(this, et, e2, "f"), O(this, pt, v(this, pt, "f") ? v(this, pt, "f").reset(s2) : P(this, v(this, ct, "f")), "f"), O(this, yt, v(this, yt, "f") ? v(this, yt, "f").reset(s2) : function(t3, e3, s3) {
          const i2 = s3.y18n.__, n2 = s3.y18n.__n, r2 = { nonOptionCount: function(s4) {
            const i3 = t3.getDemandedCommands(), r3 = s4._.length + (s4["--"] ? s4["--"].length : 0) - t3.getInternalMethods().getContext().commands.length;
            i3._ && (r3 < i3._.min || r3 > i3._.max) && (r3 < i3._.min ? void 0 !== i3._.minMsg ? e3.fail(i3._.minMsg ? i3._.minMsg.replace(/\$0/g, r3.toString()).replace(/\$1/, i3._.min.toString()) : null) : e3.fail(n2("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", r3, r3.toString(), i3._.min.toString())) : r3 > i3._.max && (void 0 !== i3._.maxMsg ? e3.fail(i3._.maxMsg ? i3._.maxMsg.replace(/\$0/g, r3.toString()).replace(/\$1/, i3._.max.toString()) : null) : e3.fail(n2("Too many non-option arguments: got %s, maximum of %s", "Too many non-option arguments: got %s, maximum of %s", r3, r3.toString(), i3._.max.toString()))));
          }, positionalCount: function(t4, s4) {
            s4 < t4 && e3.fail(n2("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", s4, s4 + "", t4 + ""));
          }, requiredArguments: function(t4, s4) {
            let i3 = null;
            for (const e4 of Object.keys(s4)) Object.prototype.hasOwnProperty.call(t4, e4) && void 0 !== t4[e4] || (i3 = i3 || {}, i3[e4] = s4[e4]);
            if (i3) {
              const t5 = [];
              for (const e4 of Object.keys(i3)) {
                const s6 = i3[e4];
                s6 && t5.indexOf(s6) < 0 && t5.push(s6);
              }
              const s5 = t5.length ? `
${t5.join("\n")}` : "";
              e3.fail(n2("Missing required argument: %s", "Missing required arguments: %s", Object.keys(i3).length, Object.keys(i3).join(", ") + s5));
            }
          }, unknownArguments: function(s4, i3, o3, a3, h2 = true) {
            var l3;
            const c3 = t3.getInternalMethods().getCommandInstance().getCommands(), f2 = [], d2 = t3.getInternalMethods().getContext();
            if (Object.keys(s4).forEach((e4) => {
              H.includes(e4) || Object.prototype.hasOwnProperty.call(o3, e4) || Object.prototype.hasOwnProperty.call(t3.getInternalMethods().getParseContext(), e4) || r2.isValidAndSomeAliasIsNotNew(e4, i3) || f2.push(e4);
            }), h2 && (d2.commands.length > 0 || c3.length > 0 || a3) && s4._.slice(d2.commands.length).forEach((t4) => {
              c3.includes("" + t4) || f2.push("" + t4);
            }), h2) {
              const e4 = (null === (l3 = t3.getDemandedCommands()._) || void 0 === l3 ? void 0 : l3.max) || 0, i4 = d2.commands.length + e4;
              i4 < s4._.length && s4._.slice(i4).forEach((t4) => {
                t4 = String(t4), d2.commands.includes(t4) || f2.includes(t4) || f2.push(t4);
              });
            }
            f2.length && e3.fail(n2("Unknown argument: %s", "Unknown arguments: %s", f2.length, f2.map((t4) => t4.trim() ? t4 : `"${t4}"`).join(", ")));
          }, unknownCommands: function(s4) {
            const i3 = t3.getInternalMethods().getCommandInstance().getCommands(), r3 = [], o3 = t3.getInternalMethods().getContext();
            return (o3.commands.length > 0 || i3.length > 0) && s4._.slice(o3.commands.length).forEach((t4) => {
              i3.includes("" + t4) || r3.push("" + t4);
            }), r3.length > 0 && (e3.fail(n2("Unknown command: %s", "Unknown commands: %s", r3.length, r3.join(", "))), true);
          }, isValidAndSomeAliasIsNotNew: function(e4, s4) {
            if (!Object.prototype.hasOwnProperty.call(s4, e4)) return false;
            const i3 = t3.parsed.newAliases;
            return [e4, ...s4[e4]].some((t4) => !Object.prototype.hasOwnProperty.call(i3, t4) || !i3[e4]);
          }, limitedChoices: function(s4) {
            const n3 = t3.getOptions(), r3 = {};
            if (!Object.keys(n3.choices).length) return;
            Object.keys(s4).forEach((t4) => {
              -1 === H.indexOf(t4) && Object.prototype.hasOwnProperty.call(n3.choices, t4) && [].concat(s4[t4]).forEach((e4) => {
                -1 === n3.choices[t4].indexOf(e4) && void 0 !== e4 && (r3[t4] = (r3[t4] || []).concat(e4));
              });
            });
            const o3 = Object.keys(r3);
            if (!o3.length) return;
            let a3 = i2("Invalid values:");
            o3.forEach((t4) => {
              a3 += `
  ${i2("Argument: %s, Given: %s, Choices: %s", t4, e3.stringifiedValues(r3[t4]), e3.stringifiedValues(n3.choices[t4]))}`;
            }), e3.fail(a3);
          } };
          let o2 = {};
          function a2(t4, e4) {
            const s4 = Number(e4);
            return "number" == typeof (e4 = isNaN(s4) ? e4 : s4) ? e4 = t4._.length >= e4 : e4.match(/^--no-.+/) ? (e4 = e4.match(/^--no-(.+)/)[1], e4 = !Object.prototype.hasOwnProperty.call(t4, e4)) : e4 = Object.prototype.hasOwnProperty.call(t4, e4), e4;
          }
          r2.implies = function(e4, i3) {
            h("<string|object> [array|number|string]", [e4, i3], arguments.length), "object" == typeof e4 ? Object.keys(e4).forEach((t4) => {
              r2.implies(t4, e4[t4]);
            }) : (t3.global(e4), o2[e4] || (o2[e4] = []), Array.isArray(i3) ? i3.forEach((t4) => r2.implies(e4, t4)) : (d(i3, void 0, s3), o2[e4].push(i3)));
          }, r2.getImplied = function() {
            return o2;
          }, r2.implications = function(t4) {
            const s4 = [];
            if (Object.keys(o2).forEach((e4) => {
              const i3 = e4;
              (o2[e4] || []).forEach((e5) => {
                let n3 = i3;
                const r3 = e5;
                n3 = a2(t4, n3), e5 = a2(t4, e5), n3 && !e5 && s4.push(` ${i3} -> ${r3}`);
              });
            }), s4.length) {
              let t5 = `${i2("Implications failed:")}
`;
              s4.forEach((e4) => {
                t5 += e4;
              }), e3.fail(t5);
            }
          };
          let l2 = {};
          r2.conflicts = function(e4, s4) {
            h("<string|object> [array|string]", [e4, s4], arguments.length), "object" == typeof e4 ? Object.keys(e4).forEach((t4) => {
              r2.conflicts(t4, e4[t4]);
            }) : (t3.global(e4), l2[e4] || (l2[e4] = []), Array.isArray(s4) ? s4.forEach((t4) => r2.conflicts(e4, t4)) : l2[e4].push(s4));
          }, r2.getConflicting = () => l2, r2.conflicting = function(n3) {
            Object.keys(n3).forEach((t4) => {
              l2[t4] && l2[t4].forEach((s4) => {
                s4 && void 0 !== n3[t4] && void 0 !== n3[s4] && e3.fail(i2("Arguments %s and %s are mutually exclusive", t4, s4));
              });
            }), t3.getInternalMethods().getParserConfiguration()["strip-dashed"] && Object.keys(l2).forEach((t4) => {
              l2[t4].forEach((r3) => {
                r3 && void 0 !== n3[s3.Parser.camelCase(t4)] && void 0 !== n3[s3.Parser.camelCase(r3)] && e3.fail(i2("Arguments %s and %s are mutually exclusive", t4, r3));
              });
            });
          }, r2.recommendCommands = function(t4, s4) {
            s4 = s4.sort((t5, e4) => e4.length - t5.length);
            let n3 = null, r3 = 1 / 0;
            for (let e4, i3 = 0; void 0 !== (e4 = s4[i3]); i3++) {
              const s5 = N(t4, e4);
              s5 <= 3 && s5 < r3 && (r3 = s5, n3 = e4);
            }
            n3 && e3.fail(i2("Did you mean %s?", n3));
          }, r2.reset = function(t4) {
            return o2 = g(o2, (e4) => !t4[e4]), l2 = g(l2, (e4) => !t4[e4]), r2;
          };
          const c2 = [];
          return r2.freeze = function() {
            c2.push({ implied: o2, conflicting: l2 });
          }, r2.unfreeze = function() {
            const t4 = c2.pop();
            d(t4, void 0, s3), { implied: o2, conflicting: l2 } = t4;
          }, r2;
        }(this, v(this, pt, "f"), v(this, ct, "f")), "f"), O(this, z, v(this, z, "f") ? v(this, z, "f").reset() : function(t3, e3, s3, i2) {
          return new _(t3, e3, s3, i2);
        }(v(this, pt, "f"), v(this, yt, "f"), v(this, Y, "f"), v(this, ct, "f")), "f"), v(this, U, "f") || O(this, U, function(t3, e3, s3, i2) {
          return new D(t3, e3, s3, i2);
        }(this, v(this, pt, "f"), v(this, z, "f"), v(this, ct, "f")), "f"), v(this, Y, "f").reset(), O(this, F, null, "f"), O(this, tt, "", "f"), O(this, V, null, "f"), O(this, J, false, "f"), this.parsed = false, this;
      }
      [Yt](t2, e2) {
        return v(this, ct, "f").path.relative(t2, e2);
      }
      [Jt](t2, s2, i2, n2 = 0, r2 = false) {
        let o2 = !!i2 || r2;
        t2 = t2 || v(this, ht, "f"), v(this, et, "f").__ = v(this, ct, "f").y18n.__, v(this, et, "f").configuration = this[Mt]();
        const a2 = !!v(this, et, "f").configuration["populate--"], h2 = Object.assign({}, v(this, et, "f").configuration, { "populate--": true }), l2 = v(this, ct, "f").Parser.detailed(t2, Object.assign({}, v(this, et, "f"), { configuration: { "parse-positional-numbers": false, ...h2 } })), c2 = Object.assign(l2.argv, v(this, rt, "f"));
        let d2;
        const u2 = l2.aliases;
        let p2 = false, g2 = false;
        Object.keys(c2).forEach((t3) => {
          t3 === v(this, Z, "f") && c2[t3] ? p2 = true : t3 === v(this, mt, "f") && c2[t3] && (g2 = true);
        }), c2.$0 = this.$0, this.parsed = l2, 0 === n2 && v(this, pt, "f").clearCachedHelpMessage();
        try {
          if (this[kt](), s2) return this[Bt](c2, a2, !!i2, false);
          if (v(this, Z, "f")) {
            [v(this, Z, "f")].concat(u2[v(this, Z, "f")] || []).filter((t3) => t3.length > 1).includes("" + c2._[c2._.length - 1]) && (c2._.pop(), p2 = true);
          }
          O(this, X, false, "f");
          const h3 = v(this, z, "f").getCommands(), m2 = v(this, U, "f").completionKey in c2, y2 = p2 || m2 || r2;
          if (c2._.length) {
            if (h3.length) {
              let t3;
              for (let e2, s3 = n2 || 0; void 0 !== c2._[s3]; s3++) {
                if (e2 = String(c2._[s3]), h3.includes(e2) && e2 !== v(this, F, "f")) {
                  const t4 = v(this, z, "f").runCommand(e2, this, l2, s3 + 1, r2, p2 || g2 || r2);
                  return this[Bt](t4, a2, !!i2, false);
                }
                if (!t3 && e2 !== v(this, F, "f")) {
                  t3 = e2;
                  break;
                }
              }
              !v(this, z, "f").hasDefaultCommand() && v(this, lt, "f") && t3 && !y2 && v(this, yt, "f").recommendCommands(t3, h3);
            }
            v(this, F, "f") && c2._.includes(v(this, F, "f")) && !m2 && (v(this, T, "f") && E(true), this.showCompletionScript(), this.exit(0));
          }
          if (v(this, z, "f").hasDefaultCommand() && !y2) {
            const t3 = v(this, z, "f").runCommand(null, this, l2, 0, r2, p2 || g2 || r2);
            return this[Bt](t3, a2, !!i2, false);
          }
          if (m2) {
            v(this, T, "f") && E(true);
            const s3 = (t2 = [].concat(t2)).slice(t2.indexOf(`--${v(this, U, "f").completionKey}`) + 1);
            return v(this, U, "f").getCompletion(s3, (t3, s4) => {
              if (t3) throw new e(t3.message);
              (s4 || []).forEach((t4) => {
                v(this, Q, "f").log(t4);
              }), this.exit(0);
            }), this[Bt](c2, !a2, !!i2, false);
          }
          if (v(this, J, "f") || (p2 ? (v(this, T, "f") && E(true), o2 = true, this.showHelp("log"), this.exit(0)) : g2 && (v(this, T, "f") && E(true), o2 = true, v(this, pt, "f").showVersion("log"), this.exit(0))), !o2 && v(this, et, "f").skipValidation.length > 0 && (o2 = Object.keys(c2).some((t3) => v(this, et, "f").skipValidation.indexOf(t3) >= 0 && true === c2[t3])), !o2) {
            if (l2.error) throw new e(l2.error.message);
            if (!m2) {
              const t3 = this[Zt](u2, {}, l2.error);
              i2 || (d2 = C(c2, this, v(this, Y, "f").getMiddleware(), true)), d2 = this[zt](t3, null != d2 ? d2 : c2), f(d2) && !i2 && (d2 = d2.then(() => C(c2, this, v(this, Y, "f").getMiddleware(), false)));
            }
          }
        } catch (t3) {
          if (!(t3 instanceof e)) throw t3;
          v(this, pt, "f").fail(t3.message, t3);
        }
        return this[Bt](null != d2 ? d2 : c2, a2, !!i2, true);
      }
      [Zt](t2, s2, i2, n2) {
        const r2 = { ...this.getDemandedOptions() };
        return (o2) => {
          if (i2) throw new e(i2.message);
          v(this, yt, "f").nonOptionCount(o2), v(this, yt, "f").requiredArguments(o2, r2);
          let a2 = false;
          v(this, dt, "f") && (a2 = v(this, yt, "f").unknownCommands(o2)), v(this, ft, "f") && !a2 ? v(this, yt, "f").unknownArguments(o2, t2, s2, !!n2) : v(this, ut, "f") && v(this, yt, "f").unknownArguments(o2, t2, {}, false, false), v(this, yt, "f").limitedChoices(o2), v(this, yt, "f").implications(o2), v(this, yt, "f").conflicting(o2);
        };
      }
      [Xt]() {
        O(this, J, true, "f");
      }
      [Qt](t2) {
        if ("string" == typeof t2) v(this, et, "f").key[t2] = true;
        else for (const e2 of t2) v(this, et, "f").key[e2] = true;
      }
    };
    var ee;
    var se;
    var { readFileSync: ie } = require("fs");
    var { inspect: ne } = require("util");
    var { resolve: re } = require("path");
    var oe = require_build();
    var ae = require_build2();
    var he;
    var le = { assert: { notStrictEqual: t.notStrictEqual, strictEqual: t.strictEqual }, cliui: require_build3(), findUp: require_sync(), getEnv: (t2) => process.env[t2], getCallerFile: require_get_caller_file(), getProcessArgvBin: y, inspect: ne, mainFilename: null !== (se = null === (ee = null === require || void 0 === require ? void 0 : require.main) || void 0 === ee ? void 0 : ee.filename) && void 0 !== se ? se : process.cwd(), Parser: ae, path: require("path"), process: { argv: () => process.argv, cwd: process.cwd, emitWarning: (t2, e2) => process.emitWarning(t2, e2), execPath: () => process.execPath, exit: (t2) => {
      process.exit(t2);
    }, nextTick: process.nextTick, stdColumns: void 0 !== process.stdout.columns ? process.stdout.columns : null }, readFileSync: ie, require, requireDirectory: require_require_directory(), stringWidth: require_string_width(), y18n: oe({ directory: re(__dirname, "../locales"), updateFiles: false }) };
    var ce = (null === (he = null === process || void 0 === process ? void 0 : process.env) || void 0 === he ? void 0 : he.YARGS_MIN_NODE_VERSION) ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
    if (process && process.version) {
      if (Number(process.version.match(/v([^.]+)/)[1]) < ce) throw Error(`yargs supports a minimum Node.js version of ${ce}. Read our version support policy: https://github.com/yargs/yargs#supported-nodejs-versions`);
    }
    var fe = require_build2();
    var de;
    var ue = { applyExtends: n, cjsPlatformShim: le, Yargs: (de = le, (t2 = [], e2 = de.process.cwd(), s2) => {
      const i2 = new te(t2, e2, s2, de);
      return Object.defineProperty(i2, "argv", { get: () => i2.parse(), enumerable: true }), i2.help(), i2.version(), i2;
    }), argsert: h, isPromise: f, objFilter: g, parseCommand: o, Parser: fe, processArgv: b, YError: e };
    module2.exports = ue;
  }
});

// node_modules/.pnpm/commondir@1.0.1/node_modules/commondir/index.js
var require_commondir = __commonJS({
  "node_modules/.pnpm/commondir@1.0.1/node_modules/commondir/index.js"(exports2, module2) {
    var path9 = require("path");
    module2.exports = function(basedir, relfiles) {
      if (relfiles) {
        var files = relfiles.map(function(r) {
          return path9.resolve(basedir, r);
        });
      } else {
        var files = basedir;
      }
      var res = files.slice(1).reduce(function(ps, file) {
        if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
          throw new Error("relative path without a basedir");
        }
        var xs = file.split(/\/+|\\+/);
        for (var i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++) ;
        return ps.slice(0, i);
      }, files[0].split(/\/+|\\+/));
      return res.length > 1 ? res.join("/") : "/";
    };
  }
});

// node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js
var require_p_try = __commonJS({
  "node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js"(exports2, module2) {
    "use strict";
    var pTry = (fn, ...arguments_) => new Promise((resolve6) => {
      resolve6(fn(...arguments_));
    });
    module2.exports = pTry;
    module2.exports.default = pTry;
  }
});

// node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js
var require_p_limit = __commonJS({
  "node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js"(exports2, module2) {
    "use strict";
    var pTry = require_p_try();
    var pLimit = (concurrency) => {
      if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
      }
      const queue = [];
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };
      const run = (fn, resolve6, ...args) => {
        activeCount++;
        const result = pTry(fn, ...args);
        resolve6(result);
        result.then(next, next);
      };
      const enqueue = (fn, resolve6, ...args) => {
        if (activeCount < concurrency) {
          run(fn, resolve6, ...args);
        } else {
          queue.push(run.bind(null, fn, resolve6, ...args));
        }
      };
      const generator = (fn, ...args) => new Promise((resolve6) => enqueue(fn, resolve6, ...args));
      Object.defineProperties(generator, {
        activeCount: {
          get: () => activeCount
        },
        pendingCount: {
          get: () => queue.length
        },
        clearQueue: {
          value: () => {
            queue.length = 0;
          }
        }
      });
      return generator;
    };
    module2.exports = pLimit;
    module2.exports.default = pLimit;
  }
});

// node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js
var require_p_locate = __commonJS({
  "node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js"(exports2, module2) {
    "use strict";
    var pLimit = require_p_limit();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = async (element, tester) => tester(await element);
    var finder = async (element) => {
      const values = await Promise.all(element);
      if (values[1] === true) {
        throw new EndError(values[0]);
      }
      return false;
    };
    var pLocate = async (iterable, tester, options) => {
      options = {
        concurrency: Infinity,
        preserveOrder: true,
        ...options
      };
      const limit = pLimit(options.concurrency);
      const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
      const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);
      try {
        await Promise.all(items.map((element) => checkLimit(finder, element)));
      } catch (error) {
        if (error instanceof EndError) {
          return error.value;
        }
        throw error;
      }
    };
    module2.exports = pLocate;
    module2.exports.default = pLocate;
  }
});

// node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js
var require_locate_path = __commonJS({
  "node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var fs12 = require("fs");
    var { promisify } = require("util");
    var pLocate = require_p_locate();
    var fsStat = promisify(fs12.stat);
    var fsLStat = promisify(fs12.lstat);
    var typeMappings = {
      directory: "isDirectory",
      file: "isFile"
    };
    function checkType({ type }) {
      if (type in typeMappings) {
        return;
      }
      throw new Error(`Invalid type specified: ${type}`);
    }
    var matchType = (type, stat2) => type === void 0 || stat2[typeMappings[type]]();
    module2.exports = async (paths, options) => {
      options = {
        cwd: process.cwd(),
        type: "file",
        allowSymlinks: true,
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fsStat : fsLStat;
      return pLocate(paths, async (path_) => {
        try {
          const stat2 = await statFn(path9.resolve(options.cwd, path_));
          return matchType(options.type, stat2);
        } catch (_) {
          return false;
        }
      }, options);
    };
    module2.exports.sync = (paths, options) => {
      options = {
        cwd: process.cwd(),
        allowSymlinks: true,
        type: "file",
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fs12.statSync : fs12.lstatSync;
      for (const path_ of paths) {
        try {
          const stat2 = statFn(path9.resolve(options.cwd, path_));
          if (matchType(options.type, stat2)) {
            return path_;
          }
        } catch (_) {
        }
      }
    };
  }
});

// node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js"(exports2, module2) {
    "use strict";
    var fs12 = require("fs");
    var { promisify } = require("util");
    var pAccess = promisify(fs12.access);
    module2.exports = async (path9) => {
      try {
        await pAccess(path9);
        return true;
      } catch (_) {
        return false;
      }
    };
    module2.exports.sync = (path9) => {
      try {
        fs12.accessSync(path9);
        return true;
      } catch (_) {
        return false;
      }
    };
  }
});

// node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js
var require_find_up = __commonJS({
  "node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var locatePath = require_locate_path();
    var pathExists = require_path_exists();
    var stop = Symbol("findUp.stop");
    module2.exports = async (name2, options = {}) => {
      let directory = path9.resolve(options.cwd || "");
      const { root } = path9.parse(directory);
      const paths = [].concat(name2);
      const runMatcher = async (locateOptions) => {
        if (typeof name2 !== "function") {
          return locatePath(paths, locateOptions);
        }
        const foundPath = await name2(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = await runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path9.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path9.dirname(directory);
      }
    };
    module2.exports.sync = (name2, options = {}) => {
      let directory = path9.resolve(options.cwd || "");
      const { root } = path9.parse(directory);
      const paths = [].concat(name2);
      const runMatcher = (locateOptions) => {
        if (typeof name2 !== "function") {
          return locatePath.sync(paths, locateOptions);
        }
        const foundPath = name2(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath.sync([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path9.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path9.dirname(directory);
      }
    };
    module2.exports.exists = pathExists;
    module2.exports.sync.exists = pathExists.sync;
    module2.exports.stop = stop;
  }
});

// node_modules/.pnpm/pkg-dir@4.2.0/node_modules/pkg-dir/index.js
var require_pkg_dir = __commonJS({
  "node_modules/.pnpm/pkg-dir@4.2.0/node_modules/pkg-dir/index.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var findUp = require_find_up();
    var pkgDir = async (cwd) => {
      const filePath = await findUp("package.json", { cwd });
      return filePath && path9.dirname(filePath);
    };
    module2.exports = pkgDir;
    module2.exports.default = pkgDir;
    module2.exports.sync = (cwd) => {
      const filePath = findUp.sync("package.json", { cwd });
      return filePath && path9.dirname(filePath);
    };
  }
});

// node_modules/.pnpm/semver@6.3.1/node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@6.3.1/node_modules/semver/semver.js"(exports2, module2) {
    exports2 = module2.exports = SemVer;
    var debug;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports2.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var t = exports2.tokens = {};
    var R = 0;
    function tok(n) {
      t[n] = R++;
    }
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    function makeSafeRe(value) {
      for (var i2 = 0; i2 < safeRegexReplacements.length; i2++) {
        var token = safeRegexReplacements[i2][0];
        var max = safeRegexReplacements[i2][1];
        value = value.split(token + "*").join(token + "{0," + max + "}").split(token + "+").join(token + "{1," + max + "}");
      }
      return value;
    }
    tok("NUMERICIDENTIFIER");
    src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    tok("NUMERICIDENTIFIERLOOSE");
    src[t.NUMERICIDENTIFIERLOOSE] = "\\d+";
    tok("NONNUMERICIDENTIFIER");
    src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + LETTERDASHNUMBER + "*";
    tok("MAINVERSION");
    src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")";
    tok("MAINVERSIONLOOSE");
    src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
    tok("PRERELEASEIDENTIFIER");
    src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
    tok("PRERELEASEIDENTIFIERLOOSE");
    src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
    tok("PRERELEASE");
    src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
    tok("PRERELEASELOOSE");
    src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
    tok("BUILDIDENTIFIER");
    src[t.BUILDIDENTIFIER] = LETTERDASHNUMBER + "+";
    tok("BUILD");
    src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
    tok("FULL");
    tok("FULLPLAIN");
    src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
    src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
    tok("LOOSEPLAIN");
    src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
    tok("LOOSE");
    src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
    tok("GTLT");
    src[t.GTLT] = "((?:<|>)?=?)";
    tok("XRANGEIDENTIFIERLOOSE");
    src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    tok("XRANGEIDENTIFIER");
    src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
    tok("XRANGEPLAIN");
    src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?";
    tok("XRANGEPLAINLOOSE");
    src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?";
    tok("XRANGE");
    src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
    tok("XRANGELOOSE");
    src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
    tok("COERCE");
    src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    tok("COERCERTL");
    re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
    safeRe[t.COERCERTL] = new RegExp(makeSafeRe(src[t.COERCE]), "g");
    tok("LONETILDE");
    src[t.LONETILDE] = "(?:~>?)";
    tok("TILDETRIM");
    src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
    re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
    safeRe[t.TILDETRIM] = new RegExp(makeSafeRe(src[t.TILDETRIM]), "g");
    var tildeTrimReplace = "$1~";
    tok("TILDE");
    src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
    tok("TILDELOOSE");
    src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
    tok("LONECARET");
    src[t.LONECARET] = "(?:\\^)";
    tok("CARETTRIM");
    src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
    re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
    safeRe[t.CARETTRIM] = new RegExp(makeSafeRe(src[t.CARETTRIM]), "g");
    var caretTrimReplace = "$1^";
    tok("CARET");
    src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
    tok("CARETLOOSE");
    src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
    tok("COMPARATORLOOSE");
    src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
    tok("COMPARATOR");
    src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
    tok("COMPARATORTRIM");
    src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
    re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
    safeRe[t.COMPARATORTRIM] = new RegExp(makeSafeRe(src[t.COMPARATORTRIM]), "g");
    var comparatorTrimReplace = "$1$2$3";
    tok("HYPHENRANGE");
    src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$";
    tok("HYPHENRANGELOOSE");
    src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$";
    tok("STAR");
    src[t.STAR] = "(<|>)?=?\\s*\\*";
    for (i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
        safeRe[i] = new RegExp(makeSafeRe(src[i]));
      }
    }
    var i;
    exports2.parse = parse5;
    function parse5(version2, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 !== "string") {
        return null;
      }
      if (version2.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL];
      if (!r.test(version2)) {
        return null;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        return null;
      }
    }
    exports2.valid = valid;
    function valid(version2, options) {
      var v = parse5(version2, options);
      return v ? v.version : null;
    }
    exports2.clean = clean;
    function clean(version2, options) {
      var s = parse5(version2.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports2.SemVer = SemVer;
    function SemVer(version2, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version2 instanceof SemVer) {
        if (version2.loose === options.loose) {
          return version2;
        } else {
          version2 = version2.version;
        }
      } else if (typeof version2 !== "string") {
        throw new TypeError("Invalid Version: " + version2);
      }
      if (version2.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version2, options);
      }
      debug("SemVer", version2, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version2.trim().match(options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version2);
      }
      this.raw = version2;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.compareBuild = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      var i2 = 0;
      do {
        var a = this.build[i2];
        var b = other.build[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports2.inc = inc;
    function inc(version2, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version2, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports2.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse5(version1);
        var v2 = parse5(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports2.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports2.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports2.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports2.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports2.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports2.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports2.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports2.compareBuild = compareBuild;
    function compareBuild(a, b, loose) {
      var versionA = new SemVer(a, loose);
      var versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    }
    exports2.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports2.sort = sort;
    function sort(list2, loose) {
      return list2.sort(function(a, b) {
        return exports2.compareBuild(a, b, loose);
      });
    }
    exports2.rsort = rsort;
    function rsort(list2, loose) {
      return list2.sort(function(a, b) {
        return exports2.compareBuild(b, a, loose);
      });
    }
    exports2.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports2.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports2.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports2.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports2.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports2.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports2.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports2.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version2) {
      debug("Comparator.test", version2, this.options.loose);
      if (this.semver === ANY || version2 === ANY) {
        return true;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version2, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports2.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + this.raw);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      var hr = loose ? safeRe[t.HYPHENRANGELOOSE] : safeRe[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(safeRe[t.COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, safeRe[t.COMPARATORTRIM]);
      range = range.replace(safeRe[t.TILDETRIM], tildeTrimReplace);
      range = range.replace(safeRe[t.CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
          return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    function isSatisfiable(comparators, options) {
      var result = true;
      var remainingComparators = comparators.slice();
      var testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every(function(otherComparator) {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    }
    exports2.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? safeRe[t.TILDELOOSE] : safeRe[t.TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? safeRe[t.CARETLOOSE] : safeRe[t.CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? safeRe[t.XRANGELOOSE] : safeRe[t.XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p + pr;
        } else if (xm) {
          ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(safeRe[t.STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version2) {
      if (!version2) {
        return false;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version2, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version2, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version2)) {
          return false;
        }
      }
      if (version2.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports2.satisfies = satisfies;
    function satisfies(version2, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version2);
    }
    exports2.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports2.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports2.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports2.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports2.ltr = ltr;
    function ltr(version2, range, options) {
      return outside(version2, range, "<", options);
    }
    exports2.gtr = gtr;
    function gtr(version2, range, options) {
      return outside(version2, range, ">", options);
    }
    exports2.outside = outside;
    function outside(version2, range, hilo, options) {
      version2 = new SemVer(version2, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version2, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports2.prerelease = prerelease;
    function prerelease(version2, options) {
      var parsed2 = parse5(version2, options);
      return parsed2 && parsed2.prerelease.length ? parsed2.prerelease : null;
    }
    exports2.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports2.coerce = coerce;
    function coerce(version2, options) {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      var match = null;
      if (!options.rtl) {
        match = version2.match(safeRe[t.COERCE]);
      } else {
        var next;
        while ((next = safeRe[t.COERCERTL].exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          safeRe[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        safeRe[t.COERCERTL].lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      return parse5(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
    }
  }
});

// node_modules/.pnpm/make-dir@3.1.0/node_modules/make-dir/index.js
var require_make_dir = __commonJS({
  "node_modules/.pnpm/make-dir@3.1.0/node_modules/make-dir/index.js"(exports2, module2) {
    "use strict";
    var fs12 = require("fs");
    var path9 = require("path");
    var { promisify } = require("util");
    var semver = require_semver();
    var useNativeRecursiveOption = semver.satisfies(process.version, ">=10.12.0");
    var checkPath = (pth) => {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path9.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
    var processOptions = (options) => {
      const defaults = {
        mode: 511,
        fs: fs12
      };
      return {
        ...defaults,
        ...options
      };
    };
    var permissionError = (pth) => {
      const error = new Error(`operation not permitted, mkdir '${pth}'`);
      error.code = "EPERM";
      error.errno = -4048;
      error.path = pth;
      error.syscall = "mkdir";
      return error;
    };
    var makeDir = async (input, options) => {
      checkPath(input);
      options = processOptions(options);
      const mkdir4 = promisify(options.fs.mkdir);
      const stat2 = promisify(options.fs.stat);
      if (useNativeRecursiveOption && options.fs.mkdir === fs12.mkdir) {
        const pth = path9.resolve(input);
        await mkdir4(pth, {
          mode: options.mode,
          recursive: true
        });
        return pth;
      }
      const make = async (pth) => {
        try {
          await mkdir4(pth, options.mode);
          return pth;
        } catch (error) {
          if (error.code === "EPERM") {
            throw error;
          }
          if (error.code === "ENOENT") {
            if (path9.dirname(pth) === pth) {
              throw permissionError(pth);
            }
            if (error.message.includes("null bytes")) {
              throw error;
            }
            await make(path9.dirname(pth));
            return make(pth);
          }
          try {
            const stats = await stat2(pth);
            if (!stats.isDirectory()) {
              throw new Error("The path is not a directory");
            }
          } catch (_) {
            throw error;
          }
          return pth;
        }
      };
      return make(path9.resolve(input));
    };
    module2.exports = makeDir;
    module2.exports.sync = (input, options) => {
      checkPath(input);
      options = processOptions(options);
      if (useNativeRecursiveOption && options.fs.mkdirSync === fs12.mkdirSync) {
        const pth = path9.resolve(input);
        fs12.mkdirSync(pth, {
          mode: options.mode,
          recursive: true
        });
        return pth;
      }
      const make = (pth) => {
        try {
          options.fs.mkdirSync(pth, options.mode);
        } catch (error) {
          if (error.code === "EPERM") {
            throw error;
          }
          if (error.code === "ENOENT") {
            if (path9.dirname(pth) === pth) {
              throw permissionError(pth);
            }
            if (error.message.includes("null bytes")) {
              throw error;
            }
            make(path9.dirname(pth));
            return make(pth);
          }
          try {
            if (!options.fs.statSync(pth).isDirectory()) {
              throw new Error("The path is not a directory");
            }
          } catch (_) {
            throw error;
          }
        }
        return pth;
      };
      return make(path9.resolve(input));
    };
  }
});

// node_modules/.pnpm/find-cache-dir@3.3.2/node_modules/find-cache-dir/index.js
var require_find_cache_dir = __commonJS({
  "node_modules/.pnpm/find-cache-dir@3.3.2/node_modules/find-cache-dir/index.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var fs12 = require("fs");
    var commonDir = require_commondir();
    var pkgDir = require_pkg_dir();
    var makeDir = require_make_dir();
    var { env: env2, cwd } = process;
    var isWritable2 = (path10) => {
      try {
        fs12.accessSync(path10, fs12.constants.W_OK);
        return true;
      } catch (_) {
        return false;
      }
    };
    function useDirectory(directory, options) {
      if (options.create) {
        makeDir.sync(directory);
      }
      if (options.thunk) {
        return (...arguments_) => path9.join(directory, ...arguments_);
      }
      return directory;
    }
    function getNodeModuleDirectory(directory) {
      const nodeModules = path9.join(directory, "node_modules");
      if (!isWritable2(nodeModules) && (fs12.existsSync(nodeModules) || !isWritable2(path9.join(directory)))) {
        return;
      }
      return nodeModules;
    }
    module2.exports = (options = {}) => {
      if (env2.CACHE_DIR && !["true", "false", "1", "0"].includes(env2.CACHE_DIR)) {
        return useDirectory(path9.join(env2.CACHE_DIR, options.name), options);
      }
      let { cwd: directory = cwd() } = options;
      if (options.files) {
        directory = commonDir(directory, options.files);
      }
      directory = pkgDir.sync(directory);
      if (!directory) {
        return;
      }
      const nodeModules = getNodeModuleDirectory(directory);
      if (!nodeModules) {
        return void 0;
      }
      return useDirectory(path9.join(directory, "node_modules", ".cache", options.name), options);
    };
  }
});

// node_modules/.pnpm/universalify@2.0.1/node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/.pnpm/universalify@2.0.1/node_modules/universalify/index.js"(exports2) {
    "use strict";
    exports2.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function") fn.apply(this, args);
        else {
          return new Promise((resolve6, reject) => {
            args.push((err, res) => err != null ? reject(err) : resolve6(res));
            fn.apply(this, args);
          });
        }
      }, "name", { value: fn.name });
    };
    exports2.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function") return fn.apply(this, args);
        else {
          args.pop();
          fn.apply(this, args).then((r) => cb(null, r), cb);
        }
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js"(exports2, module2) {
    var constants2 = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform6 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs12) {
      if (constants2.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs12);
      }
      if (!fs12.lutimes) {
        patchLutimes(fs12);
      }
      fs12.chown = chownFix(fs12.chown);
      fs12.fchown = chownFix(fs12.fchown);
      fs12.lchown = chownFix(fs12.lchown);
      fs12.chmod = chmodFix(fs12.chmod);
      fs12.fchmod = chmodFix(fs12.fchmod);
      fs12.lchmod = chmodFix(fs12.lchmod);
      fs12.chownSync = chownFixSync(fs12.chownSync);
      fs12.fchownSync = chownFixSync(fs12.fchownSync);
      fs12.lchownSync = chownFixSync(fs12.lchownSync);
      fs12.chmodSync = chmodFixSync(fs12.chmodSync);
      fs12.fchmodSync = chmodFixSync(fs12.fchmodSync);
      fs12.lchmodSync = chmodFixSync(fs12.lchmodSync);
      fs12.stat = statFix(fs12.stat);
      fs12.fstat = statFix(fs12.fstat);
      fs12.lstat = statFix(fs12.lstat);
      fs12.statSync = statFixSync(fs12.statSync);
      fs12.fstatSync = statFixSync(fs12.fstatSync);
      fs12.lstatSync = statFixSync(fs12.lstatSync);
      if (fs12.chmod && !fs12.lchmod) {
        fs12.lchmod = function(path9, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs12.lchmodSync = function() {
        };
      }
      if (fs12.chown && !fs12.lchown) {
        fs12.lchown = function(path9, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs12.lchownSync = function() {
        };
      }
      if (platform6 === "win32") {
        fs12.rename = typeof fs12.rename !== "function" ? fs12.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs12.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb) cb(er);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs12.rename);
      }
      fs12.read = typeof fs12.read !== "function" ? fs12.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs12, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs12, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs12.read);
      fs12.readSync = typeof fs12.readSync !== "function" ? fs12.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs12, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs12.readSync);
      function patchLchmod(fs13) {
        fs13.lchmod = function(path9, mode, callback) {
          fs13.open(
            path9,
            constants2.O_WRONLY | constants2.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs13.fchmod(fd, mode, function(err2) {
                fs13.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs13.lchmodSync = function(path9, mode) {
          var fd = fs13.openSync(path9, constants2.O_WRONLY | constants2.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs13.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs13.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs13.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs13) {
        if (constants2.hasOwnProperty("O_SYMLINK") && fs13.futimes) {
          fs13.lutimes = function(path9, at, mt, cb) {
            fs13.open(path9, constants2.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb) cb(er);
                return;
              }
              fs13.futimes(fd, at, mt, function(er2) {
                fs13.close(fd, function(er22) {
                  if (cb) cb(er2 || er22);
                });
              });
            });
          };
          fs13.lutimesSync = function(path9, at, mt) {
            var fd = fs13.openSync(path9, constants2.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs13.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs13.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs13.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs13.futimes) {
          fs13.lutimes = function(_a2, _b2, _c2, cb) {
            if (cb) process.nextTick(cb);
          };
          fs13.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs12, target, mode, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs12, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs12, target, uid, gid, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs12, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig) return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 4294967296;
              if (stats.gid < 0) stats.gid += 4294967296;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs12, target, options, callback) : orig.call(fs12, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs12, target, options) : orig.call(fs12, target);
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js"(exports2, module2) {
    var Stream2 = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs12) {
      return {
        ReadStream: ReadStream2,
        WriteStream: WriteStream2
      };
      function ReadStream2(path9, options) {
        if (!(this instanceof ReadStream2)) return new ReadStream2(path9, options);
        Stream2.call(this);
        var self2 = this;
        this.path = path9;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs12.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream2(path9, options) {
        if (!(this instanceof WriteStream2)) return new WriteStream2(path9, options);
        Stream2.call(this);
        this.path = path9;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs12.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js"(exports2, module2) {
    var fs12 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop2() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop2;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs12[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs12, queue);
      fs12.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs12, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs12.close);
      fs12.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs12, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs12.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs12[gracefulQueue]);
          require("assert").equal(fs12[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs12[gracefulQueue]);
    }
    module2.exports = patch(clone(fs12));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs12.__patched) {
      module2.exports = patch(fs12);
      fs12.__patched = true;
    }
    function patch(fs13) {
      polyfills(fs13);
      fs13.gracefulify = patch;
      fs13.createReadStream = createReadStream;
      fs13.createWriteStream = createWriteStream;
      var fs$readFile = fs13.readFile;
      fs13.readFile = readFile;
      function readFile(path9, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path9, options, cb);
        function go$readFile(path10, options2, cb2, startTime) {
          return fs$readFile(path10, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path10, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs13.writeFile;
      fs13.writeFile = writeFile2;
      function writeFile2(path9, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path9, data, options, cb);
        function go$writeFile(path10, data2, options2, cb2, startTime) {
          return fs$writeFile(path10, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path10, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs13.appendFile;
      if (fs$appendFile)
        fs13.appendFile = appendFile;
      function appendFile(path9, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path9, data, options, cb);
        function go$appendFile(path10, data2, options2, cb2, startTime) {
          return fs$appendFile(path10, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path10, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs13.copyFile;
      if (fs$copyFile)
        fs13.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs13.readdir;
      fs13.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path9, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path10, options2, cb2, startTime) {
          return fs$readdir(path10, fs$readdirCallback(
            path10,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path10, options2, cb2, startTime) {
          return fs$readdir(path10, options2, fs$readdirCallback(
            path10,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path9, options, cb);
        function fs$readdirCallback(path10, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path10, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs13);
        ReadStream2 = legStreams.ReadStream;
        WriteStream2 = legStreams.WriteStream;
      }
      var fs$ReadStream = fs13.ReadStream;
      if (fs$ReadStream) {
        ReadStream2.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream2.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs13.WriteStream;
      if (fs$WriteStream) {
        WriteStream2.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream2.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs13, "ReadStream", {
        get: function() {
          return ReadStream2;
        },
        set: function(val) {
          ReadStream2 = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs13, "WriteStream", {
        get: function() {
          return WriteStream2;
        },
        set: function(val) {
          WriteStream2 = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream2;
      Object.defineProperty(fs13, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream2;
      Object.defineProperty(fs13, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream2(path9, options) {
        if (this instanceof ReadStream2)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream2.apply(Object.create(ReadStream2.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream2(path9, options) {
        if (this instanceof WriteStream2)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream2.apply(Object.create(WriteStream2.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path9, options) {
        return new fs13.ReadStream(path9, options);
      }
      function createWriteStream(path9, options) {
        return new fs13.WriteStream(path9, options);
      }
      var fs$open = fs13.open;
      fs13.open = open;
      function open(path9, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path9, flags, mode, cb);
        function go$open(path10, flags2, mode2, cb2, startTime) {
          return fs$open(path10, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path10, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs13;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs12[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs12[gracefulQueue].length; ++i) {
        if (fs12[gracefulQueue][i].length > 2) {
          fs12[gracefulQueue][i][3] = now;
          fs12[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs12[gracefulQueue].length === 0)
        return;
      var elem = fs12[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs12[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/fs/index.js"(exports2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs12 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs12[key] === "function";
    });
    Object.assign(exports2, fs12);
    api.forEach((method) => {
      exports2[method] = u(fs12[method]);
    });
    exports2.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs12.exists(filename, callback);
      }
      return new Promise((resolve6) => {
        return fs12.exists(filename, resolve6);
      });
    };
    exports2.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs12.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve6, reject) => {
        fs12.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err) return reject(err);
          resolve6({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports2.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs12.write(fd, buffer, ...args);
      }
      return new Promise((resolve6, reject) => {
        fs12.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err) return reject(err);
          resolve6({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports2.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs12.readv(fd, buffers, ...args);
      }
      return new Promise((resolve6, reject) => {
        fs12.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err) return reject(err);
          resolve6({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports2.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs12.writev(fd, buffers, ...args);
      }
      return new Promise((resolve6, reject) => {
        fs12.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err) return reject(err);
          resolve6({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs12.realpath.native === "function") {
      exports2.realpath.native = u(fs12.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/utils.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path9.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var { checkPath } = require_utils();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number") return options;
      return { ...defaults, ...options }.mode;
    };
    module2.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs12.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module2.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs12.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/mkdirs/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir2();
    var makeDir = u(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/path-exists/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs12 = require_fs();
    function pathExists(path9) {
      return fs12.access(path9).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs12.existsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/util/utimes.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var u = require_universalify().fromPromise;
    async function utimesMillis(path9, atime, mtime) {
      const fd = await fs12.open(path9, "r+");
      let closeErr = null;
      try {
        await fs12.futimes(fd, atime, mtime);
      } finally {
        try {
          await fs12.close(fd);
        } catch (e) {
          closeErr = e;
        }
      }
      if (closeErr) {
        throw closeErr;
      }
    }
    function utimesMillisSync(path9, atime, mtime) {
      const fd = fs12.openSync(path9, "r+");
      fs12.futimesSync(fd, atime, mtime);
      return fs12.closeSync(fd);
    }
    module2.exports = {
      utimesMillis: u(utimesMillis),
      utimesMillisSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/util/stat.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var path9 = require("path");
    var u = require_universalify().fromPromise;
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs12.stat(file, { bigint: true }) : (file) => fs12.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT") return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs12.statSync(file, { bigint: true }) : (file) => fs12.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT") return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    async function checkPaths(src, dest, funcName, opts) {
      const { srcStat, destStat } = await getStats(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path9.basename(src);
          const destBaseName = path9.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path9.basename(src);
          const destBaseName = path9.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    async function checkParentPaths(src, srcStat, dest, funcName) {
      const srcParent = path9.resolve(path9.dirname(src));
      const destParent = path9.resolve(path9.dirname(dest));
      if (destParent === srcParent || destParent === path9.parse(destParent).root) return;
      let destStat;
      try {
        destStat = await fs12.stat(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPaths(src, srcStat, destParent, funcName);
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path9.resolve(path9.dirname(src));
      const destParent = path9.resolve(path9.dirname(dest));
      if (destParent === srcParent || destParent === path9.parse(destParent).root) return;
      let destStat;
      try {
        destStat = fs12.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path9.resolve(src).split(path9.sep).filter((i) => i);
      const destArr = path9.resolve(dest).split(path9.sep).filter((i) => i);
      return srcArr.every((cur, i) => destArr[i] === cur);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      // checkPaths
      checkPaths: u(checkPaths),
      checkPathsSync,
      // checkParent
      checkParentPaths: u(checkParentPaths),
      checkParentPathsSync,
      // Misc
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/copy.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var path9 = require("path");
    var { mkdirs } = require_mkdirs();
    var { pathExists } = require_path_exists2();
    var { utimesMillis } = require_utimes();
    var stat2 = require_stat();
    async function copy(src, dest, opts = {}) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      const { srcStat, destStat } = await stat2.checkPaths(src, dest, "copy", opts);
      await stat2.checkParentPaths(src, srcStat, dest, "copy");
      const include = await runFilter(src, dest, opts);
      if (!include) return;
      const destParent = path9.dirname(dest);
      const dirExists = await pathExists(destParent);
      if (!dirExists) {
        await mkdirs(destParent);
      }
      await getStatsAndPerformCopy(destStat, src, dest, opts);
    }
    async function runFilter(src, dest, opts) {
      if (!opts.filter) return true;
      return opts.filter(src, dest);
    }
    async function getStatsAndPerformCopy(destStat, src, dest, opts) {
      const statFn = opts.dereference ? fs12.stat : fs12.lstat;
      const srcStat = await statFn(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    async function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      if (opts.overwrite) {
        await fs12.unlink(dest);
        return copyFile(srcStat, src, dest, opts);
      }
      if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    async function copyFile(srcStat, src, dest, opts) {
      await fs12.copyFile(src, dest);
      if (opts.preserveTimestamps) {
        if (fileIsNotWritable(srcStat.mode)) {
          await makeFileWritable(dest, srcStat.mode);
        }
        const updatedSrcStat = await fs12.stat(src);
        await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
      }
      return fs12.chmod(dest, srcStat.mode);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return fs12.chmod(dest, srcMode | 128);
    }
    async function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) {
        await fs12.mkdir(dest);
      }
      const items = await fs12.readdir(src);
      await Promise.all(items.map(async (item) => {
        const srcItem = path9.join(src, item);
        const destItem = path9.join(dest, item);
        const include = await runFilter(srcItem, destItem, opts);
        if (!include) return;
        const { destStat: destStat2 } = await stat2.checkPaths(srcItem, destItem, "copy", opts);
        return getStatsAndPerformCopy(destStat2, srcItem, destItem, opts);
      }));
      if (!destStat) {
        await fs12.chmod(dest, srcStat.mode);
      }
    }
    async function onLink(destStat, src, dest, opts) {
      let resolvedSrc = await fs12.readlink(src);
      if (opts.dereference) {
        resolvedSrc = path9.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs12.symlink(resolvedSrc, dest);
      }
      let resolvedDest = null;
      try {
        resolvedDest = await fs12.readlink(dest);
      } catch (e) {
        if (e.code === "EINVAL" || e.code === "UNKNOWN") return fs12.symlink(resolvedSrc, dest);
        throw e;
      }
      if (opts.dereference) {
        resolvedDest = path9.resolve(process.cwd(), resolvedDest);
      }
      if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
        throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
      }
      if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
        throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
      }
      await fs12.unlink(dest);
      return fs12.symlink(resolvedSrc, dest);
    }
    module2.exports = copy;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/copy-sync.js"(exports2, module2) {
    "use strict";
    var fs12 = require_graceful_fs();
    var path9 = require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat2 = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat2.checkPathsSync(src, dest, "copy", opts);
      stat2.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest)) return;
      const destParent = path9.dirname(dest);
      if (!fs12.existsSync(destParent)) mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync4 = opts.dereference ? fs12.statSync : fs12.lstatSync;
      const srcStat = statSync4(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs12.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs12.copyFileSync(src, dest);
      if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs12.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs12.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs12.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs12.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path9.join(src, item);
      const destItem = path9.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem)) return;
      const { destStat } = stat2.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs12.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path9.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs12.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs12.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs12.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path9.resolve(process.cwd(), resolvedDest);
        }
        if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs12.unlinkSync(dest);
      return fs12.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/copy/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    module2.exports = {
      copy: u(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/remove/index.js"(exports2, module2) {
    "use strict";
    var fs12 = require_graceful_fs();
    var u = require_universalify().fromCallback;
    function remove(path9, callback) {
      fs12.rm(path9, { recursive: true, force: true }, callback);
    }
    function removeSync(path9) {
      fs12.rmSync(path9, { recursive: true, force: true });
    }
    module2.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/empty/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs12 = require_fs();
    var path9 = require("path");
    var mkdir4 = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs12.readdir(dir);
      } catch {
        return mkdir4.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path9.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs12.readdirSync(dir);
      } catch {
        return mkdir4.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path9.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/file.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path9 = require("path");
    var fs12 = require_fs();
    var mkdir4 = require_mkdirs();
    async function createFile2(file) {
      let stats;
      try {
        stats = await fs12.stat(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path9.dirname(file);
      let dirStats = null;
      try {
        dirStats = await fs12.stat(dir);
      } catch (err) {
        if (err.code === "ENOENT") {
          await mkdir4.mkdirs(dir);
          await fs12.writeFile(file, "");
          return;
        } else {
          throw err;
        }
      }
      if (dirStats.isDirectory()) {
        await fs12.writeFile(file, "");
      } else {
        await fs12.readdir(dir);
      }
    }
    function createFileSync2(file) {
      let stats;
      try {
        stats = fs12.statSync(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path9.dirname(file);
      try {
        if (!fs12.statSync(dir).isDirectory()) {
          fs12.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT") mkdir4.mkdirsSync(dir);
        else throw err;
      }
      fs12.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile2),
      createFileSync: createFileSync2
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/link.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path9 = require("path");
    var fs12 = require_fs();
    var mkdir4 = require_mkdirs();
    var { pathExists } = require_path_exists2();
    var { areIdentical } = require_stat();
    async function createLink(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = await fs12.lstat(dstpath);
      } catch {
      }
      let srcStat;
      try {
        srcStat = await fs12.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return;
      const dir = path9.dirname(dstpath);
      const dirExists = await pathExists(dir);
      if (!dirExists) {
        await mkdir4.mkdirs(dir);
      }
      await fs12.link(srcpath, dstpath);
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs12.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs12.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat)) return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path9.dirname(dstpath);
      const dirExists = fs12.existsSync(dir);
      if (dirExists) return fs12.linkSync(srcpath, dstpath);
      mkdir4.mkdirsSync(dir);
      return fs12.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var fs12 = require_fs();
    var { pathExists } = require_path_exists2();
    var u = require_universalify().fromPromise;
    async function symlinkPaths(srcpath, dstpath) {
      if (path9.isAbsolute(srcpath)) {
        try {
          await fs12.lstat(srcpath);
        } catch (err) {
          err.message = err.message.replace("lstat", "ensureSymlink");
          throw err;
        }
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path9.dirname(dstpath);
      const relativeToDst = path9.join(dstdir, srcpath);
      const exists = await pathExists(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      try {
        await fs12.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: path9.relative(dstdir, srcpath)
      };
    }
    function symlinkPathsSync(srcpath, dstpath) {
      if (path9.isAbsolute(srcpath)) {
        const exists2 = fs12.existsSync(srcpath);
        if (!exists2) throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path9.dirname(dstpath);
      const relativeToDst = path9.join(dstdir, srcpath);
      const exists = fs12.existsSync(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      const srcExists = fs12.existsSync(srcpath);
      if (!srcExists) throw new Error("relative srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: path9.relative(dstdir, srcpath)
      };
    }
    module2.exports = {
      symlinkPaths: u(symlinkPaths),
      symlinkPathsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var u = require_universalify().fromPromise;
    async function symlinkType(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = await fs12.lstat(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    function symlinkTypeSync(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = fs12.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType: u(symlinkType),
      symlinkTypeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/symlink.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path9 = require("path");
    var fs12 = require_fs();
    var { mkdirs, mkdirsSync } = require_mkdirs();
    var { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
    var { symlinkType, symlinkTypeSync } = require_symlink_type();
    var { pathExists } = require_path_exists2();
    var { areIdentical } = require_stat();
    async function createSymlink(srcpath, dstpath, type) {
      let stats;
      try {
        stats = await fs12.lstat(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const [srcStat, dstStat] = await Promise.all([
          fs12.stat(srcpath),
          fs12.stat(dstpath)
        ]);
        if (areIdentical(srcStat, dstStat)) return;
      }
      const relative2 = await symlinkPaths(srcpath, dstpath);
      srcpath = relative2.toDst;
      const toType = await symlinkType(relative2.toCwd, type);
      const dir = path9.dirname(dstpath);
      if (!await pathExists(dir)) {
        await mkdirs(dir);
      }
      return fs12.symlink(srcpath, dstpath, toType);
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs12.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs12.statSync(srcpath);
        const dstStat = fs12.statSync(dstpath);
        if (areIdentical(srcStat, dstStat)) return;
      }
      const relative2 = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative2.toDst;
      type = symlinkTypeSync(relative2.toCwd, type);
      const dir = path9.dirname(dstpath);
      const exists = fs12.existsSync(dir);
      if (exists) return fs12.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs12.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/ensure/index.js"(exports2, module2) {
    "use strict";
    var { createFile: createFile2, createFileSync: createFileSync2 } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module2.exports = {
      // file
      createFile: createFile2,
      createFileSync: createFileSync2,
      ensureFile: createFile2,
      ensureFileSync: createFileSync2,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js"(exports2, module2) {
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF3 = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF3;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content)) content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module2.exports = { stringify, stripBom };
  }
});

// node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js"(exports2, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils2();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs12 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs12.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync4(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs12 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs12.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs12 = options.fs || _fs;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs12.writeFile)(file, str, options);
    }
    var writeFile2 = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs12 = options.fs || _fs;
      const str = stringify(obj, options);
      return fs12.writeFileSync(file, str, options);
    }
    var jsonfile = {
      readFile,
      readFileSync: readFileSync4,
      writeFile: writeFile2,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/jsonfile.js"(exports2, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/output-file/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs12 = require_fs();
    var path9 = require("path");
    var mkdir4 = require_mkdirs();
    var pathExists = require_path_exists2().pathExists;
    async function outputFile(file, data, encoding = "utf-8") {
      const dir = path9.dirname(file);
      if (!await pathExists(dir)) {
        await mkdir4.mkdirs(dir);
      }
      return fs12.writeFile(file, data, encoding);
    }
    function outputFileSync(file, ...args) {
      const dir = path9.dirname(file);
      if (!fs12.existsSync(dir)) {
        mkdir4.mkdirsSync(dir);
      }
      fs12.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/output-json.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module2.exports = outputJson;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/output-json-sync.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/json/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/move.js"(exports2, module2) {
    "use strict";
    var fs12 = require_fs();
    var path9 = require("path");
    var { copy } = require_copy2();
    var { remove } = require_remove();
    var { mkdirp: mkdirp2 } = require_mkdirs();
    var { pathExists } = require_path_exists2();
    var stat2 = require_stat();
    async function move(src, dest, opts = {}) {
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = await stat2.checkPaths(src, dest, "move", opts);
      await stat2.checkParentPaths(src, srcStat, dest, "move");
      const destParent = path9.dirname(dest);
      const parsedParentPath = path9.parse(destParent);
      if (parsedParentPath.root !== destParent) {
        await mkdirp2(destParent);
      }
      return doRename(src, dest, overwrite, isChangingCase);
    }
    async function doRename(src, dest, overwrite, isChangingCase) {
      if (!isChangingCase) {
        if (overwrite) {
          await remove(dest);
        } else if (await pathExists(dest)) {
          throw new Error("dest already exists.");
        }
      }
      try {
        await fs12.rename(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") {
          throw err;
        }
        await moveAcrossDevice(src, dest, overwrite);
      }
    }
    async function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      await copy(src, dest, opts);
      return remove(src);
    }
    module2.exports = move;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/move-sync.js"(exports2, module2) {
    "use strict";
    var fs12 = require_graceful_fs();
    var path9 = require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync2 = require_mkdirs().mkdirpSync;
    var stat2 = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat2.checkPathsSync(src, dest, "move", opts);
      stat2.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest)) mkdirpSync2(path9.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path9.dirname(dest);
      const parsedPath = path9.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase) return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs12.existsSync(dest)) throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs12.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/move/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    module2.exports = {
      move: u(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      // Export promiseified graceful-fs:
      ...require_fs(),
      // Export extra methods:
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists2(),
      ...require_remove()
    };
  }
});

// node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/git.js
var require_git = __commonJS({
  "node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/git.js"(exports2, module2) {
    var cp = require("child_process");
    var fs12 = require_lib();
    var path9 = require("path");
    var util = require("util");
    function ProcessError(code2, message) {
      const callee = arguments.callee;
      Error.apply(this, [message]);
      Error.captureStackTrace(this, callee);
      this.code = code2;
      this.message = message;
      this.name = callee.name;
    }
    util.inherits(ProcessError, Error);
    function spawn(exe, args, cwd) {
      return new Promise((resolve6, reject) => {
        const child = cp.spawn(exe, args, { cwd: cwd || process.cwd() });
        const buffer = [];
        child.stderr.on("data", (chunk) => {
          buffer.push(chunk.toString());
        });
        child.stdout.on("data", (chunk) => {
          buffer.push(chunk.toString());
        });
        child.on("close", (code2) => {
          const output = buffer.join("");
          if (code2) {
            const msg = output || "Process failed: " + code2;
            reject(new ProcessError(code2, msg));
          } else {
            resolve6(output);
          }
        });
      });
    }
    function Git(cwd, cmd) {
      this.cwd = cwd;
      this.cmd = cmd || "git";
      this.output = "";
    }
    Git.prototype.exec = function(...args) {
      return spawn(this.cmd, [...args], this.cwd).then((output) => {
        this.output = output;
        return this;
      });
    };
    Git.prototype.init = function() {
      return this.exec("init");
    };
    Git.prototype.clean = function() {
      return this.exec("clean", "-f", "-d");
    };
    Git.prototype.reset = function(remote, branch) {
      return this.exec("reset", "--hard", remote + "/" + branch);
    };
    Git.prototype.fetch = function(remote) {
      return this.exec("fetch", remote);
    };
    Git.prototype.checkout = function(remote, branch) {
      const treeish = remote + "/" + branch;
      return this.exec("ls-remote", "--exit-code", ".", treeish).then(
        () => {
          return this.exec("checkout", branch).then(() => this.clean()).then(() => this.reset(remote, branch));
        },
        (error) => {
          if (error instanceof ProcessError && error.code === 2) {
            return this.exec("checkout", "--orphan", branch);
          } else {
            throw error;
          }
        }
      );
    };
    Git.prototype.rm = function(files) {
      if (!Array.isArray(files)) {
        files = [files];
      }
      return this.exec("rm", "--ignore-unmatch", "-r", "-f", ...files);
    };
    Git.prototype.add = function(files) {
      if (!Array.isArray(files)) {
        files = [files];
      }
      return this.exec("add", ...files);
    };
    Git.prototype.commit = function(message) {
      return this.exec("diff-index", "--quiet", "HEAD").catch(
        () => this.exec("commit", "-m", message)
      );
    };
    Git.prototype.tag = function(name2) {
      return this.exec("tag", name2);
    };
    Git.prototype.push = function(remote, branch, force) {
      const args = ["push", "--tags", remote, branch];
      if (force) {
        args.push("--force");
      }
      return this.exec.apply(this, args);
    };
    Git.prototype.getRemoteUrl = function(remote) {
      return this.exec("config", "--get", "remote." + remote + ".url").then((git) => {
        const repo = git.output && git.output.split(/[\n\r]/).shift();
        if (repo) {
          return repo;
        } else {
          throw new Error(
            "Failed to get repo URL from options or current directory."
          );
        }
      }).catch((err) => {
        throw new Error(
          "Failed to get remote." + remote + ".url (task must either be run in a git repository with a configured " + remote + ' remote or must be configured with the "repo" option).'
        );
      });
    };
    Git.prototype.deleteRef = function(branch) {
      return this.exec("update-ref", "-d", "refs/heads/" + branch);
    };
    Git.clone = function clone(repo, dir, branch, options) {
      return fs12.exists(dir).then((exists) => {
        if (exists) {
          return Promise.resolve(new Git(dir, options.git));
        } else {
          return fs12.mkdirp(path9.dirname(path9.resolve(dir))).then(() => {
            const args = [
              "clone",
              repo,
              dir,
              "--branch",
              branch,
              "--single-branch",
              "--origin",
              options.remote,
              "--depth",
              options.depth
            ];
            return spawn(options.git, args).catch((err) => {
              return spawn(options.git, [
                "clone",
                repo,
                dir,
                "--origin",
                options.remote
              ]);
            }).then(() => new Git(dir, options.git));
          });
        }
      });
    };
    module2.exports = Git;
  }
});

// node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/.pnpm/escape-string-regexp@1.0.5/node_modules/escape-string-regexp/index.js"(exports2, module2) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/.pnpm/trim-repeated@1.0.0/node_modules/trim-repeated/index.js
var require_trim_repeated = __commonJS({
  "node_modules/.pnpm/trim-repeated@1.0.0/node_modules/trim-repeated/index.js"(exports2, module2) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    module2.exports = function(str, target) {
      if (typeof str !== "string" || typeof target !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(new RegExp("(?:" + escapeStringRegexp(target) + "){2,}", "g"), target);
    };
  }
});

// node_modules/.pnpm/filename-reserved-regex@2.0.0/node_modules/filename-reserved-regex/index.js
var require_filename_reserved_regex = __commonJS({
  "node_modules/.pnpm/filename-reserved-regex@2.0.0/node_modules/filename-reserved-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = () => /[<>:"\/\\|?*\x00-\x1F]/g;
    module2.exports.windowsNames = () => /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
  }
});

// node_modules/.pnpm/strip-outer@1.0.1/node_modules/strip-outer/index.js
var require_strip_outer = __commonJS({
  "node_modules/.pnpm/strip-outer@1.0.1/node_modules/strip-outer/index.js"(exports2, module2) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    module2.exports = function(str, sub) {
      if (typeof str !== "string" || typeof sub !== "string") {
        throw new TypeError();
      }
      sub = escapeStringRegexp(sub);
      return str.replace(new RegExp("^" + sub + "|" + sub + "$", "g"), "");
    };
  }
});

// node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/filenamify.js
var require_filenamify = __commonJS({
  "node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/filenamify.js"(exports2, module2) {
    "use strict";
    var trimRepeated = require_trim_repeated();
    var filenameReservedRegex = require_filename_reserved_regex();
    var stripOuter = require_strip_outer();
    var MAX_FILENAME_LENGTH = 100;
    var reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
    var reRelativePath = /^\.+/;
    var reTrailingPeriods = /\.+$/;
    var filenamify = (string, options = {}) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      const replacement = options.replacement === void 0 ? "!" : options.replacement;
      if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
        throw new Error("Replacement string cannot contain reserved filename characters");
      }
      string = string.replace(filenameReservedRegex(), replacement);
      string = string.replace(reControlChars, replacement);
      string = string.replace(reRelativePath, replacement);
      string = string.replace(reTrailingPeriods, "");
      if (replacement.length > 0) {
        string = trimRepeated(string, replacement);
        string = string.length > 1 ? stripOuter(string, replacement) : string;
      }
      string = filenameReservedRegex.windowsNames().test(string) ? string + replacement : string;
      string = string.slice(0, typeof options.maxLength === "number" ? options.maxLength : MAX_FILENAME_LENGTH);
      return string;
    };
    module2.exports = filenamify;
  }
});

// node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/filenamify-path.js
var require_filenamify_path = __commonJS({
  "node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/filenamify-path.js"(exports2, module2) {
    "use strict";
    var path9 = require("path");
    var filenamify = require_filenamify();
    var filenamifyPath = (filePath, options) => {
      filePath = path9.resolve(filePath);
      return path9.join(path9.dirname(filePath), filenamify(path9.basename(filePath), options));
    };
    module2.exports = filenamifyPath;
  }
});

// node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/index.js
var require_filenamify2 = __commonJS({
  "node_modules/.pnpm/filenamify@4.3.0/node_modules/filenamify/index.js"(exports2, module2) {
    "use strict";
    var filenamify = require_filenamify();
    var filenamifyPath = require_filenamify_path();
    var filenamifyCombined = filenamify;
    filenamifyCombined.path = filenamifyPath;
    module2.exports = filenamify;
  }
});

// node_modules/.pnpm/async@3.2.5/node_modules/async/dist/async.js
var require_async = __commonJS({
  "node_modules/.pnpm/async@3.2.5/node_modules/async/dist/async.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.async = {}));
    })(exports2, function(exports3) {
      "use strict";
      function apply(fn, ...args) {
        return (...callArgs) => fn(...args, ...callArgs);
      }
      function initialParams(fn) {
        return function(...args) {
          var callback = args.pop();
          return fn.call(this, args, callback);
        };
      }
      var hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
      var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
      var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
      function fallback(fn) {
        setTimeout(fn, 0);
      }
      function wrap2(defer2) {
        return (fn, ...args) => defer2(() => fn(...args));
      }
      var _defer$1;
      if (hasQueueMicrotask) {
        _defer$1 = queueMicrotask;
      } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
      } else if (hasNextTick) {
        _defer$1 = process.nextTick;
      } else {
        _defer$1 = fallback;
      }
      var setImmediate$1 = wrap2(_defer$1);
      function asyncify(func) {
        if (isAsync(func)) {
          return function(...args) {
            const callback = args.pop();
            const promise = func.apply(this, args);
            return handlePromise(promise, callback);
          };
        }
        return initialParams(function(args, callback) {
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (result && typeof result.then === "function") {
            return handlePromise(result, callback);
          } else {
            callback(null, result);
          }
        });
      }
      function handlePromise(promise, callback) {
        return promise.then((value) => {
          invokeCallback(callback, null, value);
        }, (err) => {
          invokeCallback(callback, err && (err instanceof Error || err.message) ? err : new Error(err));
        });
      }
      function invokeCallback(callback, error, value) {
        try {
          callback(error, value);
        } catch (err) {
          setImmediate$1((e) => {
            throw e;
          }, err);
        }
      }
      function isAsync(fn) {
        return fn[Symbol.toStringTag] === "AsyncFunction";
      }
      function isAsyncGenerator(fn) {
        return fn[Symbol.toStringTag] === "AsyncGenerator";
      }
      function isAsyncIterable(obj) {
        return typeof obj[Symbol.asyncIterator] === "function";
      }
      function wrapAsync(asyncFn) {
        if (typeof asyncFn !== "function") throw new Error("expected a function");
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
      }
      function awaitify(asyncFn, arity) {
        if (!arity) arity = asyncFn.length;
        if (!arity) throw new Error("arity is undefined");
        function awaitable(...args) {
          if (typeof args[arity - 1] === "function") {
            return asyncFn.apply(this, args);
          }
          return new Promise((resolve6, reject2) => {
            args[arity - 1] = (err, ...cbArgs) => {
              if (err) return reject2(err);
              resolve6(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
            };
            asyncFn.apply(this, args);
          });
        }
        return awaitable;
      }
      function applyEach$1(eachfn) {
        return function applyEach2(fns, ...callArgs) {
          const go = awaitify(function(callback) {
            var that = this;
            return eachfn(fns, (fn, cb) => {
              wrapAsync(fn).apply(that, callArgs.concat(cb));
            }, callback);
          });
          return go;
        };
      }
      function _asyncMap(eachfn, arr, iteratee, callback) {
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
        return eachfn(arr, (value, _, iterCb) => {
          var index2 = counter++;
          _iteratee(value, (err, v) => {
            results[index2] = v;
            iterCb(err);
          });
        }, (err) => {
          callback(err, results);
        });
      }
      function isArrayLike(value) {
        return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
      }
      const breakLoop = {};
      var breakLoop$1 = breakLoop;
      function once(fn) {
        function wrapper(...args) {
          if (fn === null) return;
          var callFn = fn;
          fn = null;
          callFn.apply(this, args);
        }
        Object.assign(wrapper, fn);
        return wrapper;
      }
      function getIterator(coll) {
        return coll[Symbol.iterator] && coll[Symbol.iterator]();
      }
      function createArrayIterator(coll) {
        var i = -1;
        var len = coll.length;
        return function next() {
          return ++i < len ? { value: coll[i], key: i } : null;
        };
      }
      function createES2015Iterator(iterator) {
        var i = -1;
        return function next() {
          var item = iterator.next();
          if (item.done)
            return null;
          i++;
          return { value: item.value, key: i };
        };
      }
      function createObjectIterator(obj) {
        var okeys = obj ? Object.keys(obj) : [];
        var i = -1;
        var len = okeys.length;
        return function next() {
          var key = okeys[++i];
          if (key === "__proto__") {
            return next();
          }
          return i < len ? { value: obj[key], key } : null;
        };
      }
      function createIterator(coll) {
        if (isArrayLike(coll)) {
          return createArrayIterator(coll);
        }
        var iterator = getIterator(coll);
        return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
      }
      function onlyOnce(fn) {
        return function(...args) {
          if (fn === null) throw new Error("Callback was already called.");
          var callFn = fn;
          fn = null;
          callFn.apply(this, args);
        };
      }
      function asyncEachOfLimit(generator, limit, iteratee, callback) {
        let done = false;
        let canceled = false;
        let awaiting = false;
        let running = 0;
        let idx = 0;
        function replenish() {
          if (running >= limit || awaiting || done) return;
          awaiting = true;
          generator.next().then(({ value, done: iterDone }) => {
            if (canceled || done) return;
            awaiting = false;
            if (iterDone) {
              done = true;
              if (running <= 0) {
                callback(null);
              }
              return;
            }
            running++;
            iteratee(value, idx, iterateeCallback);
            idx++;
            replenish();
          }).catch(handleError);
        }
        function iterateeCallback(err, result) {
          running -= 1;
          if (canceled) return;
          if (err) return handleError(err);
          if (err === false) {
            done = true;
            canceled = true;
            return;
          }
          if (result === breakLoop$1 || done && running <= 0) {
            done = true;
            return callback(null);
          }
          replenish();
        }
        function handleError(err) {
          if (canceled) return;
          awaiting = false;
          done = true;
          callback(err);
        }
        replenish();
      }
      var eachOfLimit$2 = (limit) => {
        return (obj, iteratee, callback) => {
          callback = once(callback);
          if (limit <= 0) {
            throw new RangeError("concurrency limit cannot be less than 1");
          }
          if (!obj) {
            return callback(null);
          }
          if (isAsyncGenerator(obj)) {
            return asyncEachOfLimit(obj, limit, iteratee, callback);
          }
          if (isAsyncIterable(obj)) {
            return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
          }
          var nextElem = createIterator(obj);
          var done = false;
          var canceled = false;
          var running = 0;
          var looping = false;
          function iterateeCallback(err, value) {
            if (canceled) return;
            running -= 1;
            if (err) {
              done = true;
              callback(err);
            } else if (err === false) {
              done = true;
              canceled = true;
            } else if (value === breakLoop$1 || done && running <= 0) {
              done = true;
              return callback(null);
            } else if (!looping) {
              replenish();
            }
          }
          function replenish() {
            looping = true;
            while (running < limit && !done) {
              var elem = nextElem();
              if (elem === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return;
              }
              running += 1;
              iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
          }
          replenish();
        };
      };
      function eachOfLimit(coll, limit, iteratee, callback) {
        return eachOfLimit$2(limit)(coll, wrapAsync(iteratee), callback);
      }
      var eachOfLimit$1 = awaitify(eachOfLimit, 4);
      function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback);
        var index2 = 0, completed = 0, { length } = coll, canceled = false;
        if (length === 0) {
          callback(null);
        }
        function iteratorCallback(err, value) {
          if (err === false) {
            canceled = true;
          }
          if (canceled === true) return;
          if (err) {
            callback(err);
          } else if (++completed === length || value === breakLoop$1) {
            callback(null);
          }
        }
        for (; index2 < length; index2++) {
          iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
        }
      }
      function eachOfGeneric(coll, iteratee, callback) {
        return eachOfLimit$1(coll, Infinity, iteratee, callback);
      }
      function eachOf(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        return eachOfImplementation(coll, wrapAsync(iteratee), callback);
      }
      var eachOf$1 = awaitify(eachOf, 3);
      function map(coll, iteratee, callback) {
        return _asyncMap(eachOf$1, coll, iteratee, callback);
      }
      var map$1 = awaitify(map, 3);
      var applyEach = applyEach$1(map$1);
      function eachOfSeries(coll, iteratee, callback) {
        return eachOfLimit$1(coll, 1, iteratee, callback);
      }
      var eachOfSeries$1 = awaitify(eachOfSeries, 3);
      function mapSeries(coll, iteratee, callback) {
        return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
      }
      var mapSeries$1 = awaitify(mapSeries, 3);
      var applyEachSeries = applyEach$1(mapSeries$1);
      const PROMISE_SYMBOL = Symbol("promiseCallback");
      function promiseCallback() {
        let resolve6, reject2;
        function callback(err, ...args) {
          if (err) return reject2(err);
          resolve6(args.length > 1 ? args : args[0]);
        }
        callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
          resolve6 = res, reject2 = rej;
        });
        return callback;
      }
      function auto(tasks, concurrency, callback) {
        if (typeof concurrency !== "number") {
          callback = concurrency;
          concurrency = null;
        }
        callback = once(callback || promiseCallback());
        var numTasks = Object.keys(tasks).length;
        if (!numTasks) {
          return callback(null);
        }
        if (!concurrency) {
          concurrency = numTasks;
        }
        var results = {};
        var runningTasks = 0;
        var canceled = false;
        var hasError = false;
        var listeners = /* @__PURE__ */ Object.create(null);
        var readyTasks = [];
        var readyToCheck = [];
        var uncheckedDependencies = {};
        Object.keys(tasks).forEach((key) => {
          var task = tasks[key];
          if (!Array.isArray(task)) {
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
          }
          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
          }
          uncheckedDependencies[key] = remainingDependencies;
          dependencies.forEach((dependencyName) => {
            if (!tasks[dependencyName]) {
              throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
            }
            addListener(dependencyName, () => {
              remainingDependencies--;
              if (remainingDependencies === 0) {
                enqueueTask(key, task);
              }
            });
          });
        });
        checkForDeadlocks();
        processQueue();
        function enqueueTask(key, task) {
          readyTasks.push(() => runTask(key, task));
        }
        function processQueue() {
          if (canceled) return;
          if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
          }
        }
        function addListener(taskName, fn) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
          }
          taskListeners.push(fn);
        }
        function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          taskListeners.forEach((fn) => fn());
          processQueue();
        }
        function runTask(key, task) {
          if (hasError) return;
          var taskCallback = onlyOnce((err, ...result) => {
            runningTasks--;
            if (err === false) {
              canceled = true;
              return;
            }
            if (result.length < 2) {
              [result] = result;
            }
            if (err) {
              var safeResults = {};
              Object.keys(results).forEach((rkey) => {
                safeResults[rkey] = results[rkey];
              });
              safeResults[key] = result;
              hasError = true;
              listeners = /* @__PURE__ */ Object.create(null);
              if (canceled) return;
              callback(err, safeResults);
            } else {
              results[key] = result;
              taskComplete(key);
            }
          });
          runningTasks++;
          var taskFn = wrapAsync(task[task.length - 1]);
          if (task.length > 1) {
            taskFn(results, taskCallback);
          } else {
            taskFn(taskCallback);
          }
        }
        function checkForDeadlocks() {
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            getDependents(currentTask).forEach((dependent) => {
              if (--uncheckedDependencies[dependent] === 0) {
                readyToCheck.push(dependent);
              }
            });
          }
          if (counter !== numTasks) {
            throw new Error(
              "async.auto cannot execute tasks due to a recursive dependency"
            );
          }
        }
        function getDependents(taskName) {
          var result = [];
          Object.keys(tasks).forEach((key) => {
            const task = tasks[key];
            if (Array.isArray(task) && task.indexOf(taskName) >= 0) {
              result.push(key);
            }
          });
          return result;
        }
        return callback[PROMISE_SYMBOL];
      }
      var FN_ARGS = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/;
      var ARROW_FN_ARGS = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/;
      var FN_ARG_SPLIT = /,/;
      var FN_ARG = /(=.+)?(\s*)$/;
      function stripComments(string) {
        let stripped = "";
        let index2 = 0;
        let endBlockComment = string.indexOf("*/");
        while (index2 < string.length) {
          if (string[index2] === "/" && string[index2 + 1] === "/") {
            let endIndex = string.indexOf("\n", index2);
            index2 = endIndex === -1 ? string.length : endIndex;
          } else if (endBlockComment !== -1 && string[index2] === "/" && string[index2 + 1] === "*") {
            let endIndex = string.indexOf("*/", index2);
            if (endIndex !== -1) {
              index2 = endIndex + 2;
              endBlockComment = string.indexOf("*/", index2);
            } else {
              stripped += string[index2];
              index2++;
            }
          } else {
            stripped += string[index2];
            index2++;
          }
        }
        return stripped;
      }
      function parseParams(func) {
        const src = stripComments(func.toString());
        let match = src.match(FN_ARGS);
        if (!match) {
          match = src.match(ARROW_FN_ARGS);
        }
        if (!match) throw new Error("could not parse args in autoInject\nSource:\n" + src);
        let [, args] = match;
        return args.replace(/\s/g, "").split(FN_ARG_SPLIT).map((arg) => arg.replace(FN_ARG, "").trim());
      }
      function autoInject(tasks, callback) {
        var newTasks = {};
        Object.keys(tasks).forEach((key) => {
          var taskFn = tasks[key];
          var params;
          var fnIsAsync = isAsync(taskFn);
          var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
          if (Array.isArray(taskFn)) {
            params = [...taskFn];
            taskFn = params.pop();
            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (hasNoDeps) {
            newTasks[key] = taskFn;
          } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
              throw new Error("autoInject task functions require explicit parameters.");
            }
            if (!fnIsAsync) params.pop();
            newTasks[key] = params.concat(newTask);
          }
          function newTask(results, taskCb) {
            var newArgs = params.map((name2) => results[name2]);
            newArgs.push(taskCb);
            wrapAsync(taskFn)(...newArgs);
          }
        });
        return auto(newTasks, callback);
      }
      class DLL {
        constructor() {
          this.head = this.tail = null;
          this.length = 0;
        }
        removeLink(node) {
          if (node.prev) node.prev.next = node.next;
          else this.head = node.next;
          if (node.next) node.next.prev = node.prev;
          else this.tail = node.prev;
          node.prev = node.next = null;
          this.length -= 1;
          return node;
        }
        empty() {
          while (this.head) this.shift();
          return this;
        }
        insertAfter(node, newNode) {
          newNode.prev = node;
          newNode.next = node.next;
          if (node.next) node.next.prev = newNode;
          else this.tail = newNode;
          node.next = newNode;
          this.length += 1;
        }
        insertBefore(node, newNode) {
          newNode.prev = node.prev;
          newNode.next = node;
          if (node.prev) node.prev.next = newNode;
          else this.head = newNode;
          node.prev = newNode;
          this.length += 1;
        }
        unshift(node) {
          if (this.head) this.insertBefore(this.head, node);
          else setInitial(this, node);
        }
        push(node) {
          if (this.tail) this.insertAfter(this.tail, node);
          else setInitial(this, node);
        }
        shift() {
          return this.head && this.removeLink(this.head);
        }
        pop() {
          return this.tail && this.removeLink(this.tail);
        }
        toArray() {
          return [...this];
        }
        *[Symbol.iterator]() {
          var cur = this.head;
          while (cur) {
            yield cur.data;
            cur = cur.next;
          }
        }
        remove(testFn) {
          var curr = this.head;
          while (curr) {
            var { next } = curr;
            if (testFn(curr)) {
              this.removeLink(curr);
            }
            curr = next;
          }
          return this;
        }
      }
      function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
      }
      function queue$1(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new RangeError("Concurrency must not be zero");
        }
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
        const events = {
          error: [],
          drain: [],
          saturated: [],
          unsaturated: [],
          empty: []
        };
        function on(event, handler) {
          events[event].push(handler);
        }
        function once2(event, handler) {
          const handleAndRemove = (...args) => {
            off(event, handleAndRemove);
            handler(...args);
          };
          events[event].push(handleAndRemove);
        }
        function off(event, handler) {
          if (!event) return Object.keys(events).forEach((ev) => events[ev] = []);
          if (!handler) return events[event] = [];
          events[event] = events[event].filter((ev) => ev !== handler);
        }
        function trigger(event, ...args) {
          events[event].forEach((handler) => handler(...args));
        }
        var processingScheduled = false;
        function _insert(data, insertAtFront, rejectOnError, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          var res, rej;
          function promiseCallback2(err, ...args) {
            if (err) return rejectOnError ? rej(err) : res();
            if (args.length <= 1) return res(args[0]);
            res(args);
          }
          var item = q._createTaskItem(
            data,
            rejectOnError ? promiseCallback2 : callback || promiseCallback2
          );
          if (insertAtFront) {
            q._tasks.unshift(item);
          } else {
            q._tasks.push(item);
          }
          if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(() => {
              processingScheduled = false;
              q.process();
            });
          }
          if (rejectOnError || !callback) {
            return new Promise((resolve6, reject2) => {
              res = resolve6;
              rej = reject2;
            });
          }
        }
        function _createCB(tasks) {
          return function(err, ...args) {
            numRunning -= 1;
            for (var i = 0, l = tasks.length; i < l; i++) {
              var task = tasks[i];
              var index2 = workersList.indexOf(task);
              if (index2 === 0) {
                workersList.shift();
              } else if (index2 > 0) {
                workersList.splice(index2, 1);
              }
              task.callback(err, ...args);
              if (err != null) {
                trigger("error", err, task.data);
              }
            }
            if (numRunning <= q.concurrency - q.buffer) {
              trigger("unsaturated");
            }
            if (q.idle()) {
              trigger("drain");
            }
            q.process();
          };
        }
        function _maybeDrain(data) {
          if (data.length === 0 && q.idle()) {
            setImmediate$1(() => trigger("drain"));
            return true;
          }
          return false;
        }
        const eventMethod = (name2) => (handler) => {
          if (!handler) {
            return new Promise((resolve6, reject2) => {
              once2(name2, (err, data) => {
                if (err) return reject2(err);
                resolve6(data);
              });
            });
          }
          off(name2);
          on(name2, handler);
        };
        var isProcessing = false;
        var q = {
          _tasks: new DLL(),
          _createTaskItem(data, callback) {
            return {
              data,
              callback
            };
          },
          *[Symbol.iterator]() {
            yield* q._tasks[Symbol.iterator]();
          },
          concurrency,
          payload,
          buffer: concurrency / 4,
          started: false,
          paused: false,
          push(data, callback) {
            if (Array.isArray(data)) {
              if (_maybeDrain(data)) return;
              return data.map((datum) => _insert(datum, false, false, callback));
            }
            return _insert(data, false, false, callback);
          },
          pushAsync(data, callback) {
            if (Array.isArray(data)) {
              if (_maybeDrain(data)) return;
              return data.map((datum) => _insert(datum, false, true, callback));
            }
            return _insert(data, false, true, callback);
          },
          kill() {
            off();
            q._tasks.empty();
          },
          unshift(data, callback) {
            if (Array.isArray(data)) {
              if (_maybeDrain(data)) return;
              return data.map((datum) => _insert(datum, true, false, callback));
            }
            return _insert(data, true, false, callback);
          },
          unshiftAsync(data, callback) {
            if (Array.isArray(data)) {
              if (_maybeDrain(data)) return;
              return data.map((datum) => _insert(datum, true, true, callback));
            }
            return _insert(data, true, true, callback);
          },
          remove(testFn) {
            q._tasks.remove(testFn);
          },
          process() {
            if (isProcessing) {
              return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
              var tasks = [], data = [];
              var l = q._tasks.length;
              if (q.payload) l = Math.min(l, q.payload);
              for (var i = 0; i < l; i++) {
                var node = q._tasks.shift();
                tasks.push(node);
                workersList.push(node);
                data.push(node.data);
              }
              numRunning += 1;
              if (q._tasks.length === 0) {
                trigger("empty");
              }
              if (numRunning === q.concurrency) {
                trigger("saturated");
              }
              var cb = onlyOnce(_createCB(tasks));
              _worker(data, cb);
            }
            isProcessing = false;
          },
          length() {
            return q._tasks.length;
          },
          running() {
            return numRunning;
          },
          workersList() {
            return workersList;
          },
          idle() {
            return q._tasks.length + numRunning === 0;
          },
          pause() {
            q.paused = true;
          },
          resume() {
            if (q.paused === false) {
              return;
            }
            q.paused = false;
            setImmediate$1(q.process);
          }
        };
        Object.defineProperties(q, {
          saturated: {
            writable: false,
            value: eventMethod("saturated")
          },
          unsaturated: {
            writable: false,
            value: eventMethod("unsaturated")
          },
          empty: {
            writable: false,
            value: eventMethod("empty")
          },
          drain: {
            writable: false,
            value: eventMethod("drain")
          },
          error: {
            writable: false,
            value: eventMethod("error")
          }
        });
        return q;
      }
      function cargo$1(worker, payload) {
        return queue$1(worker, 1, payload);
      }
      function cargo(worker, concurrency, payload) {
        return queue$1(worker, concurrency, payload);
      }
      function reduce(coll, memo, iteratee, callback) {
        callback = once(callback);
        var _iteratee = wrapAsync(iteratee);
        return eachOfSeries$1(coll, (x, i, iterCb) => {
          _iteratee(memo, x, (err, v) => {
            memo = v;
            iterCb(err);
          });
        }, (err) => callback(err, memo));
      }
      var reduce$1 = awaitify(reduce, 4);
      function seq(...functions) {
        var _functions = functions.map(wrapAsync);
        return function(...args) {
          var that = this;
          var cb = args[args.length - 1];
          if (typeof cb == "function") {
            args.pop();
          } else {
            cb = promiseCallback();
          }
          reduce$1(
            _functions,
            args,
            (newargs, fn, iterCb) => {
              fn.apply(that, newargs.concat((err, ...nextargs) => {
                iterCb(err, nextargs);
              }));
            },
            (err, results) => cb(err, ...results)
          );
          return cb[PROMISE_SYMBOL];
        };
      }
      function compose(...args) {
        return seq(...args.reverse());
      }
      function mapLimit(coll, limit, iteratee, callback) {
        return _asyncMap(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var mapLimit$1 = awaitify(mapLimit, 4);
      function concatLimit(coll, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(coll, limit, (val, iterCb) => {
          _iteratee(val, (err, ...args) => {
            if (err) return iterCb(err);
            return iterCb(err, args);
          });
        }, (err, mapResults) => {
          var result = [];
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              result = result.concat(...mapResults[i]);
            }
          }
          return callback(err, result);
        });
      }
      var concatLimit$1 = awaitify(concatLimit, 4);
      function concat(coll, iteratee, callback) {
        return concatLimit$1(coll, Infinity, iteratee, callback);
      }
      var concat$1 = awaitify(concat, 3);
      function concatSeries(coll, iteratee, callback) {
        return concatLimit$1(coll, 1, iteratee, callback);
      }
      var concatSeries$1 = awaitify(concatSeries, 3);
      function constant$1(...args) {
        return function(...ignoredArgs) {
          var callback = ignoredArgs.pop();
          return callback(null, ...args);
        };
      }
      function _createTester(check, getResult) {
        return (eachfn, arr, _iteratee, cb) => {
          var testPassed = false;
          var testResult;
          const iteratee = wrapAsync(_iteratee);
          eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
              if (err || err === false) return callback(err);
              if (check(result) && !testResult) {
                testPassed = true;
                testResult = getResult(true, value);
                return callback(null, breakLoop$1);
              }
              callback();
            });
          }, (err) => {
            if (err) return cb(err);
            cb(null, testPassed ? testResult : getResult(false));
          });
        };
      }
      function detect(coll, iteratee, callback) {
        return _createTester((bool) => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
      }
      var detect$1 = awaitify(detect, 3);
      function detectLimit(coll, limit, iteratee, callback) {
        return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var detectLimit$1 = awaitify(detectLimit, 4);
      function detectSeries(coll, iteratee, callback) {
        return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(1), coll, iteratee, callback);
      }
      var detectSeries$1 = awaitify(detectSeries, 3);
      function consoleFunc(name2) {
        return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
          if (typeof console === "object") {
            if (err) {
              if (console.error) {
                console.error(err);
              }
            } else if (console[name2]) {
              resultArgs.forEach((x) => console[name2](x));
            }
          }
        });
      }
      var dir = consoleFunc("dir");
      function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback);
        var _fn = wrapAsync(iteratee);
        var _test = wrapAsync(test);
        var results;
        function next(err, ...args) {
          if (err) return callback(err);
          if (err === false) return;
          results = args;
          _test(...args, check);
        }
        function check(err, truth) {
          if (err) return callback(err);
          if (err === false) return;
          if (!truth) return callback(null, ...results);
          _fn(next);
        }
        return check(null, true);
      }
      var doWhilst$1 = awaitify(doWhilst, 3);
      function doUntil(iteratee, test, callback) {
        const _test = wrapAsync(test);
        return doWhilst$1(iteratee, (...args) => {
          const cb = args.pop();
          _test(...args, (err, truth) => cb(err, !truth));
        }, callback);
      }
      function _withoutIndex(iteratee) {
        return (value, index2, callback) => iteratee(value, callback);
      }
      function eachLimit$2(coll, iteratee, callback) {
        return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var each = awaitify(eachLimit$2, 3);
      function eachLimit(coll, limit, iteratee, callback) {
        return eachOfLimit$2(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var eachLimit$1 = awaitify(eachLimit, 4);
      function eachSeries(coll, iteratee, callback) {
        return eachLimit$1(coll, 1, iteratee, callback);
      }
      var eachSeries$1 = awaitify(eachSeries, 3);
      function ensureAsync(fn) {
        if (isAsync(fn)) return fn;
        return function(...args) {
          var callback = args.pop();
          var sync = true;
          args.push((...innerArgs) => {
            if (sync) {
              setImmediate$1(() => callback(...innerArgs));
            } else {
              callback(...innerArgs);
            }
          });
          fn.apply(this, args);
          sync = false;
        };
      }
      function every(coll, iteratee, callback) {
        return _createTester((bool) => !bool, (res) => !res)(eachOf$1, coll, iteratee, callback);
      }
      var every$1 = awaitify(every, 3);
      function everyLimit(coll, limit, iteratee, callback) {
        return _createTester((bool) => !bool, (res) => !res)(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var everyLimit$1 = awaitify(everyLimit, 4);
      function everySeries(coll, iteratee, callback) {
        return _createTester((bool) => !bool, (res) => !res)(eachOfSeries$1, coll, iteratee, callback);
      }
      var everySeries$1 = awaitify(everySeries, 3);
      function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, (x, index2, iterCb) => {
          iteratee(x, (err, v) => {
            truthValues[index2] = !!v;
            iterCb(err);
          });
        }, (err) => {
          if (err) return callback(err);
          var results = [];
          for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
          }
          callback(null, results);
        });
      }
      function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, (x, index2, iterCb) => {
          iteratee(x, (err, v) => {
            if (err) return iterCb(err);
            if (v) {
              results.push({ index: index2, value: x });
            }
            iterCb(err);
          });
        }, (err) => {
          if (err) return callback(err);
          callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
        });
      }
      function _filter(eachfn, coll, iteratee, callback) {
        var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
        return filter2(eachfn, coll, wrapAsync(iteratee), callback);
      }
      function filter(coll, iteratee, callback) {
        return _filter(eachOf$1, coll, iteratee, callback);
      }
      var filter$1 = awaitify(filter, 3);
      function filterLimit(coll, limit, iteratee, callback) {
        return _filter(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var filterLimit$1 = awaitify(filterLimit, 4);
      function filterSeries(coll, iteratee, callback) {
        return _filter(eachOfSeries$1, coll, iteratee, callback);
      }
      var filterSeries$1 = awaitify(filterSeries, 3);
      function forever(fn, errback) {
        var done = onlyOnce(errback);
        var task = wrapAsync(ensureAsync(fn));
        function next(err) {
          if (err) return done(err);
          if (err === false) return;
          task(next);
        }
        return next();
      }
      var forever$1 = awaitify(forever, 2);
      function groupByLimit(coll, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(coll, limit, (val, iterCb) => {
          _iteratee(val, (err, key) => {
            if (err) return iterCb(err);
            return iterCb(err, { key, val });
          });
        }, (err, mapResults) => {
          var result = {};
          var { hasOwnProperty: hasOwnProperty2 } = Object.prototype;
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              var { key } = mapResults[i];
              var { val } = mapResults[i];
              if (hasOwnProperty2.call(result, key)) {
                result[key].push(val);
              } else {
                result[key] = [val];
              }
            }
          }
          return callback(err, result);
        });
      }
      var groupByLimit$1 = awaitify(groupByLimit, 4);
      function groupBy(coll, iteratee, callback) {
        return groupByLimit$1(coll, Infinity, iteratee, callback);
      }
      function groupBySeries(coll, iteratee, callback) {
        return groupByLimit$1(coll, 1, iteratee, callback);
      }
      var log = consoleFunc("log");
      function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        return eachOfLimit$2(limit)(obj, (val, key, next) => {
          _iteratee(val, key, (err, result) => {
            if (err) return next(err);
            newObj[key] = result;
            next(err);
          });
        }, (err) => callback(err, newObj));
      }
      var mapValuesLimit$1 = awaitify(mapValuesLimit, 4);
      function mapValues(obj, iteratee, callback) {
        return mapValuesLimit$1(obj, Infinity, iteratee, callback);
      }
      function mapValuesSeries(obj, iteratee, callback) {
        return mapValuesLimit$1(obj, 1, iteratee, callback);
      }
      function memoize(fn, hasher = (v) => v) {
        var memo = /* @__PURE__ */ Object.create(null);
        var queues = /* @__PURE__ */ Object.create(null);
        var _fn = wrapAsync(fn);
        var memoized = initialParams((args, callback) => {
          var key = hasher(...args);
          if (key in memo) {
            setImmediate$1(() => callback(null, ...memo[key]));
          } else if (key in queues) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            _fn(...args, (err, ...resultArgs) => {
              if (!err) {
                memo[key] = resultArgs;
              }
              var q = queues[key];
              delete queues[key];
              for (var i = 0, l = q.length; i < l; i++) {
                q[i](err, ...resultArgs);
              }
            });
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
      }
      var _defer;
      if (hasNextTick) {
        _defer = process.nextTick;
      } else if (hasSetImmediate) {
        _defer = setImmediate;
      } else {
        _defer = fallback;
      }
      var nextTick = wrap2(_defer);
      var _parallel = awaitify((eachfn, tasks, callback) => {
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, (task, key, taskCb) => {
          wrapAsync(task)((err, ...result) => {
            if (result.length < 2) {
              [result] = result;
            }
            results[key] = result;
            taskCb(err);
          });
        }, (err) => callback(err, results));
      }, 3);
      function parallel(tasks, callback) {
        return _parallel(eachOf$1, tasks, callback);
      }
      function parallelLimit(tasks, limit, callback) {
        return _parallel(eachOfLimit$2(limit), tasks, callback);
      }
      function queue(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue$1((items, cb) => {
          _worker(items[0], cb);
        }, concurrency, 1);
      }
      class Heap {
        constructor() {
          this.heap = [];
          this.pushCount = Number.MIN_SAFE_INTEGER;
        }
        get length() {
          return this.heap.length;
        }
        empty() {
          this.heap = [];
          return this;
        }
        percUp(index2) {
          let p;
          while (index2 > 0 && smaller(this.heap[index2], this.heap[p = parent(index2)])) {
            let t = this.heap[index2];
            this.heap[index2] = this.heap[p];
            this.heap[p] = t;
            index2 = p;
          }
        }
        percDown(index2) {
          let l;
          while ((l = leftChi(index2)) < this.heap.length) {
            if (l + 1 < this.heap.length && smaller(this.heap[l + 1], this.heap[l])) {
              l = l + 1;
            }
            if (smaller(this.heap[index2], this.heap[l])) {
              break;
            }
            let t = this.heap[index2];
            this.heap[index2] = this.heap[l];
            this.heap[l] = t;
            index2 = l;
          }
        }
        push(node) {
          node.pushCount = ++this.pushCount;
          this.heap.push(node);
          this.percUp(this.heap.length - 1);
        }
        unshift(node) {
          return this.heap.push(node);
        }
        shift() {
          let [top2] = this.heap;
          this.heap[0] = this.heap[this.heap.length - 1];
          this.heap.pop();
          this.percDown(0);
          return top2;
        }
        toArray() {
          return [...this];
        }
        *[Symbol.iterator]() {
          for (let i = 0; i < this.heap.length; i++) {
            yield this.heap[i].data;
          }
        }
        remove(testFn) {
          let j = 0;
          for (let i = 0; i < this.heap.length; i++) {
            if (!testFn(this.heap[i])) {
              this.heap[j] = this.heap[i];
              j++;
            }
          }
          this.heap.splice(j);
          for (let i = parent(this.heap.length - 1); i >= 0; i--) {
            this.percDown(i);
          }
          return this;
        }
      }
      function leftChi(i) {
        return (i << 1) + 1;
      }
      function parent(i) {
        return (i + 1 >> 1) - 1;
      }
      function smaller(x, y) {
        if (x.priority !== y.priority) {
          return x.priority < y.priority;
        } else {
          return x.pushCount < y.pushCount;
        }
      }
      function priorityQueue(worker, concurrency) {
        var q = queue(worker, concurrency);
        var {
          push: push2,
          pushAsync
        } = q;
        q._tasks = new Heap();
        q._createTaskItem = ({ data, priority }, callback) => {
          return {
            data,
            priority,
            callback
          };
        };
        function createDataItems(tasks, priority) {
          if (!Array.isArray(tasks)) {
            return { data: tasks, priority };
          }
          return tasks.map((data) => {
            return { data, priority };
          });
        }
        q.push = function(data, priority = 0, callback) {
          return push2(createDataItems(data, priority), callback);
        };
        q.pushAsync = function(data, priority = 0, callback) {
          return pushAsync(createDataItems(data, priority), callback);
        };
        delete q.unshift;
        delete q.unshiftAsync;
        return q;
      }
      function race(tasks, callback) {
        callback = once(callback);
        if (!Array.isArray(tasks)) return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length) return callback();
        for (var i = 0, l = tasks.length; i < l; i++) {
          wrapAsync(tasks[i])(callback);
        }
      }
      var race$1 = awaitify(race, 2);
      function reduceRight(array, memo, iteratee, callback) {
        var reversed = [...array].reverse();
        return reduce$1(reversed, memo, iteratee, callback);
      }
      function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function reflectOn(args, reflectCallback) {
          args.push((error, ...cbArgs) => {
            let retVal = {};
            if (error) {
              retVal.error = error;
            }
            if (cbArgs.length > 0) {
              var value = cbArgs;
              if (cbArgs.length <= 1) {
                [value] = cbArgs;
              }
              retVal.value = value;
            }
            reflectCallback(null, retVal);
          });
          return _fn.apply(this, args);
        });
      }
      function reflectAll(tasks) {
        var results;
        if (Array.isArray(tasks)) {
          results = tasks.map(reflect);
        } else {
          results = {};
          Object.keys(tasks).forEach((key) => {
            results[key] = reflect.call(this, tasks[key]);
          });
        }
        return results;
      }
      function reject$2(eachfn, arr, _iteratee, callback) {
        const iteratee = wrapAsync(_iteratee);
        return _filter(eachfn, arr, (value, cb) => {
          iteratee(value, (err, v) => {
            cb(err, !v);
          });
        }, callback);
      }
      function reject(coll, iteratee, callback) {
        return reject$2(eachOf$1, coll, iteratee, callback);
      }
      var reject$1 = awaitify(reject, 3);
      function rejectLimit(coll, limit, iteratee, callback) {
        return reject$2(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var rejectLimit$1 = awaitify(rejectLimit, 4);
      function rejectSeries(coll, iteratee, callback) {
        return reject$2(eachOfSeries$1, coll, iteratee, callback);
      }
      var rejectSeries$1 = awaitify(rejectSeries, 3);
      function constant(value) {
        return function() {
          return value;
        };
      }
      const DEFAULT_TIMES = 5;
      const DEFAULT_INTERVAL = 0;
      function retry(opts, task, callback) {
        var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant(DEFAULT_INTERVAL)
        };
        if (arguments.length < 3 && typeof opts === "function") {
          callback = task || promiseCallback();
          task = opts;
        } else {
          parseTimes(options, opts);
          callback = callback || promiseCallback();
        }
        if (typeof task !== "function") {
          throw new Error("Invalid arguments for async.retry");
        }
        var _task = wrapAsync(task);
        var attempt = 1;
        function retryAttempt() {
          _task((err, ...args) => {
            if (err === false) return;
            if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
              setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
            } else {
              callback(err, ...args);
            }
          });
        }
        retryAttempt();
        return callback[PROMISE_SYMBOL];
      }
      function parseTimes(acc, t) {
        if (typeof t === "object") {
          acc.times = +t.times || DEFAULT_TIMES;
          acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant(+t.interval || DEFAULT_INTERVAL);
          acc.errorFilter = t.errorFilter;
        } else if (typeof t === "number" || typeof t === "string") {
          acc.times = +t || DEFAULT_TIMES;
        } else {
          throw new Error("Invalid arguments for async.retry");
        }
      }
      function retryable(opts, task) {
        if (!task) {
          task = opts;
          opts = null;
        }
        let arity = opts && opts.arity || task.length;
        if (isAsync(task)) {
          arity += 1;
        }
        var _task = wrapAsync(task);
        return initialParams((args, callback) => {
          if (args.length < arity - 1 || callback == null) {
            args.push(callback);
            callback = promiseCallback();
          }
          function taskFn(cb) {
            _task(...args, cb);
          }
          if (opts) retry(opts, taskFn, callback);
          else retry(taskFn, callback);
          return callback[PROMISE_SYMBOL];
        });
      }
      function series(tasks, callback) {
        return _parallel(eachOfSeries$1, tasks, callback);
      }
      function some(coll, iteratee, callback) {
        return _createTester(Boolean, (res) => res)(eachOf$1, coll, iteratee, callback);
      }
      var some$1 = awaitify(some, 3);
      function someLimit(coll, limit, iteratee, callback) {
        return _createTester(Boolean, (res) => res)(eachOfLimit$2(limit), coll, iteratee, callback);
      }
      var someLimit$1 = awaitify(someLimit, 4);
      function someSeries(coll, iteratee, callback) {
        return _createTester(Boolean, (res) => res)(eachOfSeries$1, coll, iteratee, callback);
      }
      var someSeries$1 = awaitify(someSeries, 3);
      function sortBy(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return map$1(coll, (x, iterCb) => {
          _iteratee(x, (err, criteria) => {
            if (err) return iterCb(err);
            iterCb(err, { value: x, criteria });
          });
        }, (err, results) => {
          if (err) return callback(err);
          callback(null, results.sort(comparator).map((v) => v.value));
        });
        function comparator(left2, right2) {
          var a = left2.criteria, b = right2.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      }
      var sortBy$1 = awaitify(sortBy, 3);
      function timeout(asyncFn, milliseconds, info) {
        var fn = wrapAsync(asyncFn);
        return initialParams((args, callback) => {
          var timedOut = false;
          var timer;
          function timeoutCallback() {
            var name2 = asyncFn.name || "anonymous";
            var error = new Error('Callback function "' + name2 + '" timed out.');
            error.code = "ETIMEDOUT";
            if (info) {
              error.info = info;
            }
            timedOut = true;
            callback(error);
          }
          args.push((...cbArgs) => {
            if (!timedOut) {
              callback(...cbArgs);
              clearTimeout(timer);
            }
          });
          timer = setTimeout(timeoutCallback, milliseconds);
          fn(...args);
        });
      }
      function range(size) {
        var result = Array(size);
        while (size--) {
          result[size] = size;
        }
        return result;
      }
      function timesLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        return mapLimit$1(range(count), limit, _iteratee, callback);
      }
      function times(n, iteratee, callback) {
        return timesLimit(n, Infinity, iteratee, callback);
      }
      function timesSeries(n, iteratee, callback) {
        return timesLimit(n, 1, iteratee, callback);
      }
      function transform(coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3 && typeof accumulator === "function") {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = Array.isArray(coll) ? [] : {};
        }
        callback = once(callback || promiseCallback());
        var _iteratee = wrapAsync(iteratee);
        eachOf$1(coll, (v, k, cb) => {
          _iteratee(accumulator, v, k, cb);
        }, (err) => callback(err, accumulator));
        return callback[PROMISE_SYMBOL];
      }
      function tryEach(tasks, callback) {
        var error = null;
        var result;
        return eachSeries$1(tasks, (task, taskCb) => {
          wrapAsync(task)((err, ...args) => {
            if (err === false) return taskCb(err);
            if (args.length < 2) {
              [result] = args;
            } else {
              result = args;
            }
            error = err;
            taskCb(err ? null : {});
          });
        }, () => callback(error, result));
      }
      var tryEach$1 = awaitify(tryEach);
      function unmemoize(fn) {
        return (...args) => {
          return (fn.unmemoized || fn)(...args);
        };
      }
      function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback);
        var _fn = wrapAsync(iteratee);
        var _test = wrapAsync(test);
        var results = [];
        function next(err, ...rest) {
          if (err) return callback(err);
          results = rest;
          if (err === false) return;
          _test(check);
        }
        function check(err, truth) {
          if (err) return callback(err);
          if (err === false) return;
          if (!truth) return callback(null, ...results);
          _fn(next);
        }
        return _test(check);
      }
      var whilst$1 = awaitify(whilst, 3);
      function until(test, iteratee, callback) {
        const _test = wrapAsync(test);
        return whilst$1((cb) => _test((err, truth) => cb(err, !truth)), iteratee, callback);
      }
      function waterfall(tasks, callback) {
        callback = once(callback);
        if (!Array.isArray(tasks)) return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length) return callback();
        var taskIndex = 0;
        function nextTask(args) {
          var task = wrapAsync(tasks[taskIndex++]);
          task(...args, onlyOnce(next));
        }
        function next(err, ...args) {
          if (err === false) return;
          if (err || taskIndex === tasks.length) {
            return callback(err, ...args);
          }
          nextTask(args);
        }
        nextTask([]);
      }
      var waterfall$1 = awaitify(waterfall);
      var index = {
        apply,
        applyEach,
        applyEachSeries,
        asyncify,
        auto,
        autoInject,
        cargo: cargo$1,
        cargoQueue: cargo,
        compose,
        concat: concat$1,
        concatLimit: concatLimit$1,
        concatSeries: concatSeries$1,
        constant: constant$1,
        detect: detect$1,
        detectLimit: detectLimit$1,
        detectSeries: detectSeries$1,
        dir,
        doUntil,
        doWhilst: doWhilst$1,
        each,
        eachLimit: eachLimit$1,
        eachOf: eachOf$1,
        eachOfLimit: eachOfLimit$1,
        eachOfSeries: eachOfSeries$1,
        eachSeries: eachSeries$1,
        ensureAsync,
        every: every$1,
        everyLimit: everyLimit$1,
        everySeries: everySeries$1,
        filter: filter$1,
        filterLimit: filterLimit$1,
        filterSeries: filterSeries$1,
        forever: forever$1,
        groupBy,
        groupByLimit: groupByLimit$1,
        groupBySeries,
        log,
        map: map$1,
        mapLimit: mapLimit$1,
        mapSeries: mapSeries$1,
        mapValues,
        mapValuesLimit: mapValuesLimit$1,
        mapValuesSeries,
        memoize,
        nextTick,
        parallel,
        parallelLimit,
        priorityQueue,
        queue,
        race: race$1,
        reduce: reduce$1,
        reduceRight,
        reflect,
        reflectAll,
        reject: reject$1,
        rejectLimit: rejectLimit$1,
        rejectSeries: rejectSeries$1,
        retry,
        retryable,
        seq,
        series,
        setImmediate: setImmediate$1,
        some: some$1,
        someLimit: someLimit$1,
        someSeries: someSeries$1,
        sortBy: sortBy$1,
        timeout,
        times,
        timesLimit,
        timesSeries,
        transform,
        tryEach: tryEach$1,
        unmemoize,
        until,
        waterfall: waterfall$1,
        whilst: whilst$1,
        // aliases
        all: every$1,
        allLimit: everyLimit$1,
        allSeries: everySeries$1,
        any: some$1,
        anyLimit: someLimit$1,
        anySeries: someSeries$1,
        find: detect$1,
        findLimit: detectLimit$1,
        findSeries: detectSeries$1,
        flatMap: concat$1,
        flatMapLimit: concatLimit$1,
        flatMapSeries: concatSeries$1,
        forEach: each,
        forEachSeries: eachSeries$1,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf$1,
        forEachOfSeries: eachOfSeries$1,
        forEachOfLimit: eachOfLimit$1,
        inject: reduce$1,
        foldl: reduce$1,
        foldr: reduceRight,
        select: filter$1,
        selectLimit: filterLimit$1,
        selectSeries: filterSeries$1,
        wrapSync: asyncify,
        during: whilst$1,
        doDuring: doWhilst$1
      };
      exports3.all = every$1;
      exports3.allLimit = everyLimit$1;
      exports3.allSeries = everySeries$1;
      exports3.any = some$1;
      exports3.anyLimit = someLimit$1;
      exports3.anySeries = someSeries$1;
      exports3.apply = apply;
      exports3.applyEach = applyEach;
      exports3.applyEachSeries = applyEachSeries;
      exports3.asyncify = asyncify;
      exports3.auto = auto;
      exports3.autoInject = autoInject;
      exports3.cargo = cargo$1;
      exports3.cargoQueue = cargo;
      exports3.compose = compose;
      exports3.concat = concat$1;
      exports3.concatLimit = concatLimit$1;
      exports3.concatSeries = concatSeries$1;
      exports3.constant = constant$1;
      exports3.default = index;
      exports3.detect = detect$1;
      exports3.detectLimit = detectLimit$1;
      exports3.detectSeries = detectSeries$1;
      exports3.dir = dir;
      exports3.doDuring = doWhilst$1;
      exports3.doUntil = doUntil;
      exports3.doWhilst = doWhilst$1;
      exports3.during = whilst$1;
      exports3.each = each;
      exports3.eachLimit = eachLimit$1;
      exports3.eachOf = eachOf$1;
      exports3.eachOfLimit = eachOfLimit$1;
      exports3.eachOfSeries = eachOfSeries$1;
      exports3.eachSeries = eachSeries$1;
      exports3.ensureAsync = ensureAsync;
      exports3.every = every$1;
      exports3.everyLimit = everyLimit$1;
      exports3.everySeries = everySeries$1;
      exports3.filter = filter$1;
      exports3.filterLimit = filterLimit$1;
      exports3.filterSeries = filterSeries$1;
      exports3.find = detect$1;
      exports3.findLimit = detectLimit$1;
      exports3.findSeries = detectSeries$1;
      exports3.flatMap = concat$1;
      exports3.flatMapLimit = concatLimit$1;
      exports3.flatMapSeries = concatSeries$1;
      exports3.foldl = reduce$1;
      exports3.foldr = reduceRight;
      exports3.forEach = each;
      exports3.forEachLimit = eachLimit$1;
      exports3.forEachOf = eachOf$1;
      exports3.forEachOfLimit = eachOfLimit$1;
      exports3.forEachOfSeries = eachOfSeries$1;
      exports3.forEachSeries = eachSeries$1;
      exports3.forever = forever$1;
      exports3.groupBy = groupBy;
      exports3.groupByLimit = groupByLimit$1;
      exports3.groupBySeries = groupBySeries;
      exports3.inject = reduce$1;
      exports3.log = log;
      exports3.map = map$1;
      exports3.mapLimit = mapLimit$1;
      exports3.mapSeries = mapSeries$1;
      exports3.mapValues = mapValues;
      exports3.mapValuesLimit = mapValuesLimit$1;
      exports3.mapValuesSeries = mapValuesSeries;
      exports3.memoize = memoize;
      exports3.nextTick = nextTick;
      exports3.parallel = parallel;
      exports3.parallelLimit = parallelLimit;
      exports3.priorityQueue = priorityQueue;
      exports3.queue = queue;
      exports3.race = race$1;
      exports3.reduce = reduce$1;
      exports3.reduceRight = reduceRight;
      exports3.reflect = reflect;
      exports3.reflectAll = reflectAll;
      exports3.reject = reject$1;
      exports3.rejectLimit = rejectLimit$1;
      exports3.rejectSeries = rejectSeries$1;
      exports3.retry = retry;
      exports3.retryable = retryable;
      exports3.select = filter$1;
      exports3.selectLimit = filterLimit$1;
      exports3.selectSeries = filterSeries$1;
      exports3.seq = seq;
      exports3.series = series;
      exports3.setImmediate = setImmediate$1;
      exports3.some = some$1;
      exports3.someLimit = someLimit$1;
      exports3.someSeries = someSeries$1;
      exports3.sortBy = sortBy$1;
      exports3.timeout = timeout;
      exports3.times = times;
      exports3.timesLimit = timesLimit;
      exports3.timesSeries = timesSeries;
      exports3.transform = transform;
      exports3.tryEach = tryEach$1;
      exports3.unmemoize = unmemoize;
      exports3.until = until;
      exports3.waterfall = waterfall$1;
      exports3.whilst = whilst$1;
      exports3.wrapSync = asyncify;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/util.js"(exports2) {
    var path9 = require("path");
    var Git = require_git();
    var async = require_async();
    var fs12 = require_lib();
    function uniqueDirs(files) {
      const dirs = /* @__PURE__ */ new Set();
      files.forEach((filepath) => {
        const parts = path9.dirname(filepath).split(path9.sep);
        let partial = parts[0] || "/";
        dirs.add(partial);
        for (let i = 1, ii = parts.length; i < ii; ++i) {
          partial = path9.join(partial, parts[i]);
          dirs.add(partial);
        }
      });
      return Array.from(dirs);
    }
    exports2.uniqueDirs = uniqueDirs;
    function byShortPath(a, b) {
      const aParts = a.split(path9.sep);
      const bParts = b.split(path9.sep);
      const aLength = aParts.length;
      const bLength = bParts.length;
      let cmp = 0;
      if (aLength < bLength) {
        cmp = -1;
      } else if (aLength > bLength) {
        cmp = 1;
      } else {
        let aPart, bPart;
        for (let i = 0; i < aLength; ++i) {
          aPart = aParts[i];
          bPart = bParts[i];
          if (aPart < bPart) {
            cmp = -1;
            break;
          } else if (aPart > bPart) {
            cmp = 1;
            break;
          }
        }
      }
      return cmp;
    }
    exports2.byShortPath = byShortPath;
    function dirsToCreate(files) {
      return uniqueDirs(files).sort(byShortPath);
    }
    exports2.dirsToCreate = dirsToCreate;
    function copyFile(obj, callback) {
      let called = false;
      function done(err) {
        if (!called) {
          called = true;
          callback(err);
        }
      }
      const read = fs12.createReadStream(obj.src);
      read.on("error", (err) => {
        done(err);
      });
      const write = fs12.createWriteStream(obj.dest);
      write.on("error", (err) => {
        done(err);
      });
      write.on("close", () => {
        done();
      });
      read.pipe(write);
    }
    exports2.copyFile = copyFile;
    function makeDir(path10, callback) {
      fs12.mkdir(path10, (err) => {
        if (err) {
          fs12.stat(path10, (err2, stat2) => {
            if (err2 || !stat2.isDirectory()) {
              callback(err);
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      });
    }
    exports2.copy = function(files, base, dest) {
      return new Promise((resolve6, reject) => {
        const pairs = [];
        const destFiles = [];
        files.forEach((file) => {
          const src = path9.resolve(base, file);
          const relative2 = path9.relative(base, src);
          const target = path9.join(dest, relative2);
          pairs.push({
            src,
            dest: target
          });
          destFiles.push(target);
        });
        async.eachSeries(dirsToCreate(destFiles), makeDir, (err) => {
          if (err) {
            return reject(err);
          }
          async.each(pairs, copyFile, (err2) => {
            if (err2) {
              return reject(err2);
            } else {
              return resolve6();
            }
          });
        });
      });
    };
    exports2.getUser = function(cwd) {
      return Promise.all([
        new Git(cwd).exec("config", "user.name"),
        new Git(cwd).exec("config", "user.email")
      ]).then((results) => {
        return { name: results[0].output.trim(), email: results[1].output.trim() };
      }).catch((err) => {
        return null;
      });
    };
  }
});

// node_modules/.pnpm/pinkie@2.0.4/node_modules/pinkie/index.js
var require_pinkie = __commonJS({
  "node_modules/.pnpm/pinkie@2.0.4/node_modules/pinkie/index.js"(exports2, module2) {
    "use strict";
    var PENDING2 = "pending";
    var SETTLED = "settled";
    var FULFILLED = "fulfilled";
    var REJECTED = "rejected";
    var NOOP = function() {
    };
    var isNode = typeof global !== "undefined" && typeof global.process !== "undefined" && typeof global.process.emit === "function";
    var asyncSetTimer = typeof setImmediate === "undefined" ? setTimeout : setImmediate;
    var asyncQueue = [];
    var asyncTimer;
    function asyncFlush() {
      for (var i = 0; i < asyncQueue.length; i++) {
        asyncQueue[i][0](asyncQueue[i][1]);
      }
      asyncQueue = [];
      asyncTimer = false;
    }
    function asyncCall(callback, arg) {
      asyncQueue.push([callback, arg]);
      if (!asyncTimer) {
        asyncTimer = true;
        asyncSetTimer(asyncFlush, 0);
      }
    }
    function invokeResolver(resolver, promise) {
      function resolvePromise(value) {
        resolve6(promise, value);
      }
      function rejectPromise(reason) {
        reject(promise, reason);
      }
      try {
        resolver(resolvePromise, rejectPromise);
      } catch (e) {
        rejectPromise(e);
      }
    }
    function invokeCallback(subscriber) {
      var owner = subscriber.owner;
      var settled = owner._state;
      var value = owner._data;
      var callback = subscriber[settled];
      var promise = subscriber.then;
      if (typeof callback === "function") {
        settled = FULFILLED;
        try {
          value = callback(value);
        } catch (e) {
          reject(promise, e);
        }
      }
      if (!handleThenable(promise, value)) {
        if (settled === FULFILLED) {
          resolve6(promise, value);
        }
        if (settled === REJECTED) {
          reject(promise, value);
        }
      }
    }
    function handleThenable(promise, value) {
      var resolved;
      try {
        if (promise === value) {
          throw new TypeError("A promises callback cannot return that same promise.");
        }
        if (value && (typeof value === "function" || typeof value === "object")) {
          var then = value.then;
          if (typeof then === "function") {
            then.call(value, function(val) {
              if (!resolved) {
                resolved = true;
                if (value === val) {
                  fulfill(promise, val);
                } else {
                  resolve6(promise, val);
                }
              }
            }, function(reason) {
              if (!resolved) {
                resolved = true;
                reject(promise, reason);
              }
            });
            return true;
          }
        }
      } catch (e) {
        if (!resolved) {
          reject(promise, e);
        }
        return true;
      }
      return false;
    }
    function resolve6(promise, value) {
      if (promise === value || !handleThenable(promise, value)) {
        fulfill(promise, value);
      }
    }
    function fulfill(promise, value) {
      if (promise._state === PENDING2) {
        promise._state = SETTLED;
        promise._data = value;
        asyncCall(publishFulfillment, promise);
      }
    }
    function reject(promise, reason) {
      if (promise._state === PENDING2) {
        promise._state = SETTLED;
        promise._data = reason;
        asyncCall(publishRejection, promise);
      }
    }
    function publish(promise) {
      promise._then = promise._then.forEach(invokeCallback);
    }
    function publishFulfillment(promise) {
      promise._state = FULFILLED;
      publish(promise);
    }
    function publishRejection(promise) {
      promise._state = REJECTED;
      publish(promise);
      if (!promise._handled && isNode) {
        global.process.emit("unhandledRejection", promise._data, promise);
      }
    }
    function notifyRejectionHandled(promise) {
      global.process.emit("rejectionHandled", promise);
    }
    function Promise2(resolver) {
      if (typeof resolver !== "function") {
        throw new TypeError("Promise resolver " + resolver + " is not a function");
      }
      if (this instanceof Promise2 === false) {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }
      this._then = [];
      invokeResolver(resolver, this);
    }
    Promise2.prototype = {
      constructor: Promise2,
      _state: PENDING2,
      _then: null,
      _data: void 0,
      _handled: false,
      then: function(onFulfillment, onRejection) {
        var subscriber = {
          owner: this,
          then: new this.constructor(NOOP),
          fulfilled: onFulfillment,
          rejected: onRejection
        };
        if ((onRejection || onFulfillment) && !this._handled) {
          this._handled = true;
          if (this._state === REJECTED && isNode) {
            asyncCall(notifyRejectionHandled, this);
          }
        }
        if (this._state === FULFILLED || this._state === REJECTED) {
          asyncCall(invokeCallback, subscriber);
        } else {
          this._then.push(subscriber);
        }
        return subscriber.then;
      },
      catch: function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    Promise2.all = function(promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("You must pass an array to Promise.all().");
      }
      return new Promise2(function(resolve7, reject2) {
        var results = [];
        var remaining = 0;
        function resolver(index) {
          remaining++;
          return function(value) {
            results[index] = value;
            if (!--remaining) {
              resolve7(results);
            }
          };
        }
        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];
          if (promise && typeof promise.then === "function") {
            promise.then(resolver(i), reject2);
          } else {
            results[i] = promise;
          }
        }
        if (!remaining) {
          resolve7(results);
        }
      });
    };
    Promise2.race = function(promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("You must pass an array to Promise.race().");
      }
      return new Promise2(function(resolve7, reject2) {
        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];
          if (promise && typeof promise.then === "function") {
            promise.then(resolve7, reject2);
          } else {
            resolve7(promise);
          }
        }
      });
    };
    Promise2.resolve = function(value) {
      if (value && typeof value === "object" && value.constructor === Promise2) {
        return value;
      }
      return new Promise2(function(resolve7) {
        resolve7(value);
      });
    };
    Promise2.reject = function(reason) {
      return new Promise2(function(resolve7, reject2) {
        reject2(reason);
      });
    };
    module2.exports = Promise2;
  }
});

// node_modules/.pnpm/pinkie-promise@2.0.1/node_modules/pinkie-promise/index.js
var require_pinkie_promise = __commonJS({
  "node_modules/.pnpm/pinkie-promise@2.0.1/node_modules/pinkie-promise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Promise === "function" ? Promise : require_pinkie();
  }
});

// node_modules/.pnpm/array-uniq@1.0.3/node_modules/array-uniq/index.js
var require_array_uniq = __commonJS({
  "node_modules/.pnpm/array-uniq@1.0.3/node_modules/array-uniq/index.js"(exports2, module2) {
    "use strict";
    function uniqNoSet(arr) {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
        if (ret.indexOf(arr[i]) === -1) {
          ret.push(arr[i]);
        }
      }
      return ret;
    }
    function uniqSet(arr) {
      var seen = /* @__PURE__ */ new Set();
      return arr.filter(function(el) {
        if (!seen.has(el)) {
          seen.add(el);
          return true;
        }
        return false;
      });
    }
    function uniqSetWithForEach(arr) {
      var ret = [];
      new Set(arr).forEach(function(el) {
        ret.push(el);
      });
      return ret;
    }
    function doesForEachActuallyWork() {
      var ret = false;
      (/* @__PURE__ */ new Set([true])).forEach(function(el) {
        ret = el;
      });
      return ret === true;
    }
    if ("Set" in global) {
      if (typeof Set.prototype.forEach === "function" && doesForEachActuallyWork()) {
        module2.exports = uniqSetWithForEach;
      } else {
        module2.exports = uniqSet;
      }
    } else {
      module2.exports = uniqNoSet;
    }
  }
});

// node_modules/.pnpm/array-union@1.0.2/node_modules/array-union/index.js
var require_array_union = __commonJS({
  "node_modules/.pnpm/array-union@1.0.2/node_modules/array-union/index.js"(exports2, module2) {
    "use strict";
    var arrayUniq = require_array_uniq();
    module2.exports = function() {
      return arrayUniq([].concat.apply([], arguments));
    };
  }
});

// node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty2.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js"(exports2) {
    var pathModule2 = require("path");
    var isWindows4 = process.platform === "win32";
    var fs12 = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize2 = pathModule2.normalize;
    if (isWindows4) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows4) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports2.realpathSync = function realpathSync(p, cache) {
      p = pathModule2.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos2;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos2 = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows4 && !knownHard[base]) {
          fs12.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos2 < p.length) {
        nextPartRe.lastIndex = pos2;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos2 = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat2 = fs12.lstatSync(base);
          if (!stat2.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache) cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows4) {
            var id = stat2.dev.toString(32) + ":" + stat2.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs12.statSync(base);
            linkTarget = fs12.readlinkSync(base);
          }
          resolvedLink = pathModule2.resolve(previous, linkTarget);
          if (cache) cache[base] = resolvedLink;
          if (!isWindows4) seenLinks[id] = linkTarget;
        }
        p = pathModule2.resolve(resolvedLink, p.slice(pos2));
        start();
      }
      if (cache) cache[original] = p;
      return p;
    };
    exports2.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule2.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos2;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos2 = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows4 && !knownHard[base]) {
          fs12.lstat(base, function(err) {
            if (err) return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos2 >= p.length) {
          if (cache) cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos2;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos2 = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs12.lstat(base, gotStat);
      }
      function gotStat(err, stat2) {
        if (err) return cb(err);
        if (!stat2.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows4) {
          var id = stat2.dev.toString(32) + ":" + stat2.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs12.stat(base, function(err2) {
          if (err2) return cb(err2);
          fs12.readlink(base, function(err3, target) {
            if (!isWindows4) seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err) return cb(err);
        var resolvedLink = pathModule2.resolve(previous, target);
        if (cache) cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule2.resolve(resolvedLink, p.slice(pos2));
        start();
      }
    };
  }
});

// node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js
var require_fs2 = __commonJS({
  "node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js"(exports2, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs12 = require("fs");
    var origRealpath = fs12.realpath;
    var origRealpathSync = fs12.realpathSync;
    var version2 = process.version;
    var ok = /^v[0-5]\./.test(version2);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs12.realpath = realpath;
      fs12.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs12.realpath = origRealpath;
      fs12.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js"(exports2, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js"(exports2, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left2, right2, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left2 = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left2) {
              left2 = beg;
              right2 = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left2, right2];
        }
      }
      return result;
    }
  }
});

// node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js"(exports2, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre)) return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/.pnpm/minimatch@3.1.2/node_modules/minimatch/minimatch.js"(exports2, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path9 = function() {
      try {
        return require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path9.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list2) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list2, pattern, options) {
        return orig.match(list2, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options) options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options) options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path9.sep !== "/") {
        pattern = pattern.split(path9.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug) this.debug = function debug() {
        console.error.apply(console, arguments);
      };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate) return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset) this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse5;
    var SUBPARSE = {};
    function parse5(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "") return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self2 = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self2.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1) c = "^";
              re += c;
              continue;
            }
            self2.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext) clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false) return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate) re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list2, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list2 = list2.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list2.length) {
        list2.push(pattern);
      }
      return list2;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined") partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment) return false;
      if (this.empty) return f === "";
      if (f === "/" && partial) return true;
      var options = this.options;
      if (path9.sep !== "/") {
        f = f.split(path9.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename) break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate) return true;
          return !this.negate;
        }
      }
      if (options.flipNegate) return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false) return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl) return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit) return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js"(exports2, module2) {
    "use strict";
    function posix(path9) {
      return path9.charAt(0) === "/";
    }
    function win322(path9) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path9);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win322 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win322;
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/common.js"(exports2) {
    exports2.setopts = setopts;
    exports2.ownProp = ownProp;
    exports2.makeAbs = makeAbs;
    exports2.finish = finish;
    exports2.mark = mark;
    exports2.isIgnored = isIgnored;
    exports2.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs12 = require("fs");
    var path9 = require("path");
    var minimatch = require_minimatch();
    var isAbsolute2 = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self2, options) {
      self2.ignore = options.ignore || [];
      if (!Array.isArray(self2.ignore))
        self2.ignore = [self2.ignore];
      if (self2.ignore.length) {
        self2.ignore = self2.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self2, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self2.silent = !!options.silent;
      self2.pattern = pattern;
      self2.strict = options.strict !== false;
      self2.realpath = !!options.realpath;
      self2.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self2.follow = !!options.follow;
      self2.dot = !!options.dot;
      self2.mark = !!options.mark;
      self2.nodir = !!options.nodir;
      if (self2.nodir)
        self2.mark = true;
      self2.sync = !!options.sync;
      self2.nounique = !!options.nounique;
      self2.nonull = !!options.nonull;
      self2.nosort = !!options.nosort;
      self2.nocase = !!options.nocase;
      self2.stat = !!options.stat;
      self2.noprocess = !!options.noprocess;
      self2.absolute = !!options.absolute;
      self2.fs = options.fs || fs12;
      self2.maxLength = options.maxLength || Infinity;
      self2.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self2.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self2.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self2, options);
      self2.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self2.cwd = cwd;
      else {
        self2.cwd = path9.resolve(options.cwd);
        self2.changedCwd = self2.cwd !== cwd;
      }
      self2.root = options.root || path9.resolve(self2.cwd, "/");
      self2.root = path9.resolve(self2.root);
      if (process.platform === "win32")
        self2.root = self2.root.replace(/\\/g, "/");
      self2.cwdAbs = isAbsolute2(self2.cwd) ? self2.cwd : makeAbs(self2, self2.cwd);
      if (process.platform === "win32")
        self2.cwdAbs = self2.cwdAbs.replace(/\\/g, "/");
      self2.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self2.minimatch = new Minimatch(pattern, options);
      self2.options = self2.minimatch.options;
    }
    function finish(self2) {
      var nou = self2.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self2.matches.length; i < l; i++) {
        var matches = self2.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self2.nonull) {
            var literal = self2.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self2.nosort)
        all = all.sort(alphasort);
      if (self2.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self2._mark(all[i]);
        }
        if (self2.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self2.cache[e] || self2.cache[makeAbs(self2, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self2.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self2, m2);
        });
      self2.found = all;
    }
    function mark(self2, p) {
      var abs = makeAbs(self2, p);
      var c = self2.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self2, m);
          self2.statCache[mabs] = self2.statCache[abs];
          self2.cache[mabs] = self2.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self2, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path9.join(self2.root, f);
      } else if (isAbsolute2(f) || f === "") {
        abs = f;
      } else if (self2.changedCwd) {
        abs = path9.resolve(self2.cwd, f);
      } else {
        abs = path9.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self2, path10) {
      if (!self2.ignore.length)
        return false;
      return self2.ignore.some(function(item) {
        return item.matcher.match(path10) || !!(item.gmatcher && item.gmatcher.match(path10));
      });
    }
    function childrenIgnored(self2, path10) {
      if (!self2.ignore.length)
        return false;
      return self2.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path10));
      });
    }
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js
var require_sync2 = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/sync.js"(exports2, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs2();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util = require("util");
    var path9 = require("path");
    var assert3 = require("assert");
    var isAbsolute2 = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert3.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self2 = this;
        this.matches.forEach(function(matchset, index) {
          var set = self2.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self2._makeAbs(p);
              var real = rp.realpathSync(p, self2.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self2._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert3.ok(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute2(prefix) || isAbsolute2(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute2(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path9.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat2;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute2(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path9.join(this.root, prefix);
        } else {
          prefix = path9.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat2 = this.statCache[abs];
      if (!stat2) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat2 = this.fs.statSync(abs);
          } catch (er) {
            stat2 = lstat;
          }
        } else {
          stat2 = lstat;
        }
      }
      this.statCache[abs] = stat2;
      var c = true;
      if (stat2)
        c = stat2.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports2, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports2, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name2 = fn.name || "Function wrapped with `once`";
      f.onceError = name2 + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js"(exports2, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++) array[i] = args[i];
      return array;
    }
  }
});

// node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/.pnpm/glob@7.2.3/node_modules/glob/glob.js"(exports2, module2) {
    module2.exports = glob;
    var rp = require_fs2();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE3 = require("events").EventEmitter;
    var path9 = require("path");
    var assert3 = require("assert");
    var isAbsolute2 = require_path_is_absolute();
    var globSync = require_sync2();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function") cb = options, options = {};
      if (!options) options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE3);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self2 = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self2._processing;
        if (self2._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self2._finish();
            });
          } else {
            self2._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert3(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self2 = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self2._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self2 = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self2._makeAbs(p);
        rp.realpath(p, self2.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self2.emit("error", er);
          if (--n === 0) {
            self2.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert3(this instanceof Glob);
      assert3(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute2(prefix) || isAbsolute2(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute2(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self2 = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self2._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path9.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute2(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self2 = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self2.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self2.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self2.cache[abs] = "FILE";
          cb();
        } else
          self2._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self2 = this;
      self2.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self2, abs, cb) {
      return function(er, entries) {
        if (er)
          self2._readdirError(abs, er, cb);
        else
          self2._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self2 = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self2._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self2 = this;
      this._stat(prefix, function(er, exists) {
        self2._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute2(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path9.join(this.root, prefix);
        } else {
          prefix = path9.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat2 = this.statCache[abs];
      if (stat2 !== void 0) {
        if (stat2 === false)
          return cb(null, stat2);
        else {
          var type = stat2.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat2);
        }
      }
      var self2 = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self2.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self2.fs.stat(abs, function(er2, stat3) {
            if (er2)
              self2._stat2(f, abs, null, lstat, cb);
            else
              self2._stat2(f, abs, er2, stat3, cb);
          });
        } else {
          self2._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat2, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat2;
      if (abs.slice(-1) === "/" && stat2 && !stat2.isDirectory())
        return cb(null, false, stat2);
      var c = true;
      if (stat2)
        c = stat2.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat2);
    };
  }
});

// node_modules/.pnpm/pify@2.3.0/node_modules/pify/index.js
var require_pify = __commonJS({
  "node_modules/.pnpm/pify@2.3.0/node_modules/pify/index.js"(exports2, module2) {
    "use strict";
    var processFn = function(fn, P, opts) {
      return function() {
        var that = this;
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        return new P(function(resolve6, reject) {
          args.push(function(err, result) {
            if (err) {
              reject(err);
            } else if (opts.multiArgs) {
              var results = new Array(arguments.length - 1);
              for (var i2 = 1; i2 < arguments.length; i2++) {
                results[i2 - 1] = arguments[i2];
              }
              resolve6(results);
            } else {
              resolve6(result);
            }
          });
          fn.apply(that, args);
        });
      };
    };
    var pify = module2.exports = function(obj, P, opts) {
      if (typeof P !== "function") {
        opts = P;
        P = Promise;
      }
      opts = opts || {};
      opts.exclude = opts.exclude || [/.+Sync$/];
      var filter = function(key) {
        var match = function(pattern) {
          return typeof pattern === "string" ? key === pattern : pattern.test(key);
        };
        return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
      };
      var ret = typeof obj === "function" ? function() {
        if (opts.excludeMain) {
          return obj.apply(this, arguments);
        }
        return processFn(obj, P, opts).apply(this, arguments);
      } : {};
      return Object.keys(obj).reduce(function(ret2, key) {
        var x = obj[key];
        ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
        return ret2;
      }, ret);
    };
    pify.all = pify;
  }
});

// node_modules/.pnpm/globby@6.1.0/node_modules/globby/index.js
var require_globby = __commonJS({
  "node_modules/.pnpm/globby@6.1.0/node_modules/globby/index.js"(exports2, module2) {
    "use strict";
    var Promise2 = require_pinkie_promise();
    var arrayUnion = require_array_union();
    var objectAssign = require_object_assign();
    var glob = require_glob();
    var pify = require_pify();
    var globP = pify(glob, Promise2).bind(glob);
    function isNegative(pattern) {
      return pattern[0] === "!";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function assertPatternsInput(patterns) {
      if (!patterns.every(isString)) {
        throw new TypeError("patterns must be a string or an array of strings");
      }
    }
    function generateGlobTasks(patterns, opts) {
      patterns = [].concat(patterns);
      assertPatternsInput(patterns);
      var globTasks = [];
      opts = objectAssign({
        cache: /* @__PURE__ */ Object.create(null),
        statCache: /* @__PURE__ */ Object.create(null),
        realpathCache: /* @__PURE__ */ Object.create(null),
        symlinks: /* @__PURE__ */ Object.create(null),
        ignore: []
      }, opts);
      patterns.forEach(function(pattern, i) {
        if (isNegative(pattern)) {
          return;
        }
        var ignore = patterns.slice(i).filter(isNegative).map(function(pattern2) {
          return pattern2.slice(1);
        });
        globTasks.push({
          pattern,
          opts: objectAssign({}, opts, {
            ignore: opts.ignore.concat(ignore)
          })
        });
      });
      return globTasks;
    }
    module2.exports = function(patterns, opts) {
      var globTasks;
      try {
        globTasks = generateGlobTasks(patterns, opts);
      } catch (err) {
        return Promise2.reject(err);
      }
      return Promise2.all(globTasks.map(function(task) {
        return globP(task.pattern, task.opts);
      })).then(function(paths) {
        return arrayUnion.apply(null, paths);
      });
    };
    module2.exports.sync = function(patterns, opts) {
      var globTasks = generateGlobTasks(patterns, opts);
      return globTasks.reduce(function(matches, task) {
        return arrayUnion(matches, glob.sync(task.pattern, task.opts));
      }, []);
    };
    module2.exports.generateGlobTasks = generateGlobTasks;
    module2.exports.hasMagic = function(patterns, opts) {
      return [].concat(patterns).some(function(pattern) {
        return glob.hasMagic(pattern, opts);
      });
    };
  }
});

// node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/gh-pages@6.1.1/node_modules/gh-pages/lib/index.js"(exports2) {
    var findCacheDir = require_find_cache_dir();
    var Git = require_git();
    var filenamify = require_filenamify2();
    var copy = require_util().copy;
    var getUser = require_util().getUser;
    var fs12 = require_lib();
    var globby = require_globby();
    var path9 = require("path");
    var util = require("util");
    var log = util.debuglog("gh-pages");
    function getCacheDir(optPath) {
      const dir = findCacheDir({ name: "gh-pages" });
      if (!optPath) {
        return dir;
      }
      return path9.join(dir, filenamify(optPath));
    }
    exports2.getCacheDir = getCacheDir;
    function getRepo(options) {
      if (options.repo) {
        return Promise.resolve(options.repo);
      } else {
        const git = new Git(process.cwd(), options.git);
        return git.getRemoteUrl(options.remote);
      }
    }
    exports2.defaults = {
      dest: ".",
      add: false,
      git: "git",
      depth: 1,
      dotfiles: false,
      branch: "gh-pages",
      remote: "origin",
      src: "**/*",
      remove: ".",
      push: true,
      history: true,
      message: "Updates",
      silent: false
    };
    exports2.publish = function publish(basePath, config, callback) {
      if (typeof config === "function") {
        callback = config;
        config = {};
      }
      const options = Object.assign({}, exports2.defaults, config);
      if (options.only) {
        options.remove = options.only;
      }
      if (!callback) {
        callback = function(err) {
          if (err) {
            log(err.message);
          }
        };
      }
      function done(err) {
        try {
          callback(err);
        } catch (err2) {
          log("Publish callback threw: %s", err2.message);
        }
      }
      try {
        if (!fs12.statSync(basePath).isDirectory()) {
          const err = new Error('The "base" option must be an existing directory');
          done(err);
          return Promise.reject(err);
        }
      } catch (err) {
        done(err);
        return Promise.reject(err);
      }
      const files = globby.sync(options.src, {
        cwd: basePath,
        dot: options.dotfiles
      }).filter((file) => {
        return !fs12.statSync(path9.join(basePath, file)).isDirectory();
      });
      if (!Array.isArray(files) || files.length === 0) {
        done(
          new Error(`The pattern in the "src" property didn't match any files.`)
        );
        return;
      }
      let repoUrl;
      let userPromise;
      if (options.user) {
        userPromise = Promise.resolve(options.user);
      } else {
        userPromise = getUser();
      }
      return userPromise.then(
        (user) => getRepo(options).then((repo) => {
          repoUrl = repo;
          const clone = getCacheDir(repo);
          log("Cloning %s into %s", repo, clone);
          return Git.clone(repo, clone, options.branch, options);
        }).then((git) => {
          return git.getRemoteUrl(options.remote).then((url) => {
            if (url !== repoUrl) {
              const message = 'Remote url mismatch.  Got "' + url + '" but expected "' + repoUrl + '" in ' + git.cwd + ".  Try running the `gh-pages-clean` script first.";
              throw new Error(message);
            }
            return git;
          });
        }).then((git) => {
          log("Cleaning");
          return git.clean();
        }).then((git) => {
          log("Fetching %s", options.remote);
          return git.fetch(options.remote);
        }).then((git) => {
          log("Checking out %s/%s ", options.remote, options.branch);
          return git.checkout(options.remote, options.branch);
        }).then((git) => {
          if (!options.history) {
            return git.deleteRef(options.branch);
          } else {
            return git;
          }
        }).then((git) => {
          if (options.add) {
            return git;
          }
          log("Removing files");
          const files2 = globby.sync(options.remove, {
            cwd: path9.join(git.cwd, options.dest)
          }).map((file) => path9.join(options.dest, file));
          if (files2.length > 0) {
            return git.rm(files2);
          } else {
            return git;
          }
        }).then((git) => {
          if (options.nojekyll) {
            log("Creating .nojekyll");
            fs12.createFileSync(path9.join(git.cwd, ".nojekyll"));
          }
          if (options.cname) {
            log("Creating CNAME for %s", options.cname);
            fs12.writeFileSync(path9.join(git.cwd, "CNAME"), options.cname);
          }
          log("Copying files");
          return copy(files, basePath, path9.join(git.cwd, options.dest)).then(
            function() {
              return git;
            }
          );
        }).then((git) => {
          return Promise.resolve(
            options.beforeAdd && options.beforeAdd(git)
          ).then(() => git);
        }).then((git) => {
          log("Adding all");
          return git.add(".");
        }).then((git) => {
          if (!user) {
            return git;
          }
          return git.exec("config", "user.email", user.email).then(() => {
            if (!user.name) {
              return git;
            }
            return git.exec("config", "user.name", user.name);
          });
        }).then((git) => {
          log("Committing");
          return git.commit(options.message);
        }).then((git) => {
          if (options.tag) {
            log("Tagging");
            return git.tag(options.tag).catch((error) => {
              log(error);
              log("Tagging failed, continuing");
              return git;
            });
          } else {
            return git;
          }
        }).then((git) => {
          if (options.push) {
            log("Pushing");
            return git.push(options.remote, options.branch, !options.history);
          } else {
            return git;
          }
        }).then(
          () => done(),
          (error) => {
            if (options.silent) {
              error = new Error(
                "Unspecified error (run without silent option for detail)"
              );
            }
            done(error);
          }
        )
      );
    };
    exports2.clean = function clean() {
      fs12.removeSync(getCacheDir());
    };
  }
});

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/yargs.mjs
var import_build = __toESM(require_build4(), 1);
var { applyExtends, cjsPlatformShim, Parser, processArgv, Yargs } = import_build.default;
Yargs.applyExtends = (config, cwd, mergeExtends) => {
  return applyExtends(config, cwd, mergeExtends, cjsPlatformShim);
};
Yargs.hideBin = processArgv.hideBin;
Yargs.Parser = Parser;
var yargs_default = Yargs;

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/build/lib/yerror.js
var YError = class _YError extends Error {
  constructor(msg) {
    super(msg || "yargs error");
    this.name = "YError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _YError);
    }
  }
};

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/build/lib/utils/process-argv.js
function getProcessArgvBinIndex() {
  if (isBundledElectronApp())
    return 0;
  return 1;
}
function isBundledElectronApp() {
  return isElectronApp() && !process.defaultApp;
}
function isElectronApp() {
  return !!process.versions.electron;
}
function hideBin(argv) {
  return argv.slice(getProcessArgvBinIndex() + 1);
}
function getProcessArgvBin() {
  return process.argv[getProcessArgvBinIndex()];
}

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/index.js
var import_util = require("util");
var import_path = require("path");

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/string-utils.js
function camelCase(str) {
  const isCamelCase = str !== str.toLowerCase() && str !== str.toUpperCase();
  if (!isCamelCase) {
    str = str.toLowerCase();
  }
  if (str.indexOf("-") === -1 && str.indexOf("_") === -1) {
    return str;
  } else {
    let camelcase = "";
    let nextChrUpper = false;
    const leadingHyphens = str.match(/^-+/);
    for (let i = leadingHyphens ? leadingHyphens[0].length : 0; i < str.length; i++) {
      let chr = str.charAt(i);
      if (nextChrUpper) {
        nextChrUpper = false;
        chr = chr.toUpperCase();
      }
      if (i !== 0 && (chr === "-" || chr === "_")) {
        nextChrUpper = true;
      } else if (chr !== "-" && chr !== "_") {
        camelcase += chr;
      }
    }
    return camelcase;
  }
}
function decamelize(str, joinString) {
  const lowercase = str.toLowerCase();
  joinString = joinString || "-";
  let notCamelcase = "";
  for (let i = 0; i < str.length; i++) {
    const chrLower = lowercase.charAt(i);
    const chrString = str.charAt(i);
    if (chrLower !== chrString && i > 0) {
      notCamelcase += `${joinString}${lowercase.charAt(i)}`;
    } else {
      notCamelcase += chrString;
    }
  }
  return notCamelcase;
}
function looksLikeNumber(x) {
  if (x === null || x === void 0)
    return false;
  if (typeof x === "number")
    return true;
  if (/^0x[0-9a-f]+$/i.test(x))
    return true;
  if (/^0[^.]/.test(x))
    return false;
  return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/tokenize-arg-string.js
function tokenizeArgString(argString) {
  if (Array.isArray(argString)) {
    return argString.map((e) => typeof e !== "string" ? e + "" : e);
  }
  argString = argString.trim();
  let i = 0;
  let prevC = null;
  let c = null;
  let opening = null;
  const args = [];
  for (let ii = 0; ii < argString.length; ii++) {
    prevC = c;
    c = argString.charAt(ii);
    if (c === " " && !opening) {
      if (!(prevC === " ")) {
        i++;
      }
      continue;
    }
    if (c === opening) {
      opening = null;
    } else if ((c === "'" || c === '"') && !opening) {
      opening = c;
    }
    if (!args[i])
      args[i] = "";
    args[i] += c;
  }
  return args;
}

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/yargs-parser-types.js
var DefaultValuesForTypeKey;
(function(DefaultValuesForTypeKey2) {
  DefaultValuesForTypeKey2["BOOLEAN"] = "boolean";
  DefaultValuesForTypeKey2["STRING"] = "string";
  DefaultValuesForTypeKey2["NUMBER"] = "number";
  DefaultValuesForTypeKey2["ARRAY"] = "array";
})(DefaultValuesForTypeKey || (DefaultValuesForTypeKey = {}));

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/yargs-parser.js
var mixin;
var YargsParser = class {
  constructor(_mixin) {
    mixin = _mixin;
  }
  parse(argsInput, options) {
    const opts = Object.assign({
      alias: void 0,
      array: void 0,
      boolean: void 0,
      config: void 0,
      configObjects: void 0,
      configuration: void 0,
      coerce: void 0,
      count: void 0,
      default: void 0,
      envPrefix: void 0,
      narg: void 0,
      normalize: void 0,
      string: void 0,
      number: void 0,
      __: void 0,
      key: void 0
    }, options);
    const args = tokenizeArgString(argsInput);
    const inputIsString = typeof argsInput === "string";
    const aliases = combineAliases(Object.assign(/* @__PURE__ */ Object.create(null), opts.alias));
    const configuration = Object.assign({
      "boolean-negation": true,
      "camel-case-expansion": true,
      "combine-arrays": false,
      "dot-notation": true,
      "duplicate-arguments-array": true,
      "flatten-duplicate-arrays": true,
      "greedy-arrays": true,
      "halt-at-non-option": false,
      "nargs-eats-options": false,
      "negation-prefix": "no-",
      "parse-numbers": true,
      "parse-positional-numbers": true,
      "populate--": false,
      "set-placeholder-key": false,
      "short-option-groups": true,
      "strip-aliased": false,
      "strip-dashed": false,
      "unknown-options-as-args": false
    }, opts.configuration);
    const defaults = Object.assign(/* @__PURE__ */ Object.create(null), opts.default);
    const configObjects = opts.configObjects || [];
    const envPrefix = opts.envPrefix;
    const notFlagsOption = configuration["populate--"];
    const notFlagsArgv = notFlagsOption ? "--" : "_";
    const newAliases = /* @__PURE__ */ Object.create(null);
    const defaulted = /* @__PURE__ */ Object.create(null);
    const __ = opts.__ || mixin.format;
    const flags = {
      aliases: /* @__PURE__ */ Object.create(null),
      arrays: /* @__PURE__ */ Object.create(null),
      bools: /* @__PURE__ */ Object.create(null),
      strings: /* @__PURE__ */ Object.create(null),
      numbers: /* @__PURE__ */ Object.create(null),
      counts: /* @__PURE__ */ Object.create(null),
      normalize: /* @__PURE__ */ Object.create(null),
      configs: /* @__PURE__ */ Object.create(null),
      nargs: /* @__PURE__ */ Object.create(null),
      coercions: /* @__PURE__ */ Object.create(null),
      keys: []
    };
    const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
    const negatedBoolean = new RegExp("^--" + configuration["negation-prefix"] + "(.+)");
    [].concat(opts.array || []).filter(Boolean).forEach(function(opt) {
      const key = typeof opt === "object" ? opt.key : opt;
      const assignment = Object.keys(opt).map(function(key2) {
        const arrayFlagKeys = {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        };
        return arrayFlagKeys[key2];
      }).filter(Boolean).pop();
      if (assignment) {
        flags[assignment][key] = true;
      }
      flags.arrays[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.boolean || []).filter(Boolean).forEach(function(key) {
      flags.bools[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.string || []).filter(Boolean).forEach(function(key) {
      flags.strings[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.number || []).filter(Boolean).forEach(function(key) {
      flags.numbers[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.count || []).filter(Boolean).forEach(function(key) {
      flags.counts[key] = true;
      flags.keys.push(key);
    });
    [].concat(opts.normalize || []).filter(Boolean).forEach(function(key) {
      flags.normalize[key] = true;
      flags.keys.push(key);
    });
    if (typeof opts.narg === "object") {
      Object.entries(opts.narg).forEach(([key, value]) => {
        if (typeof value === "number") {
          flags.nargs[key] = value;
          flags.keys.push(key);
        }
      });
    }
    if (typeof opts.coerce === "object") {
      Object.entries(opts.coerce).forEach(([key, value]) => {
        if (typeof value === "function") {
          flags.coercions[key] = value;
          flags.keys.push(key);
        }
      });
    }
    if (typeof opts.config !== "undefined") {
      if (Array.isArray(opts.config) || typeof opts.config === "string") {
        ;
        [].concat(opts.config).filter(Boolean).forEach(function(key) {
          flags.configs[key] = true;
        });
      } else if (typeof opts.config === "object") {
        Object.entries(opts.config).forEach(([key, value]) => {
          if (typeof value === "boolean" || typeof value === "function") {
            flags.configs[key] = value;
          }
        });
      }
    }
    extendAliases(opts.key, aliases, opts.default, flags.arrays);
    Object.keys(defaults).forEach(function(key) {
      (flags.aliases[key] || []).forEach(function(alias) {
        defaults[alias] = defaults[key];
      });
    });
    let error = null;
    checkConfiguration();
    let notFlags = [];
    const argv = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] });
    const argvReturn = {};
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const truncatedArg = arg.replace(/^-{3,}/, "---");
      let broken;
      let key;
      let letters;
      let m;
      let next;
      let value;
      if (arg !== "--" && /^-/.test(arg) && isUnknownOptionAsArg(arg)) {
        pushPositional(arg);
      } else if (truncatedArg.match(/^---+(=|$)/)) {
        pushPositional(arg);
        continue;
      } else if (arg.match(/^--.+=/) || !configuration["short-option-groups"] && arg.match(/^-.+=/)) {
        m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
        if (m !== null && Array.isArray(m) && m.length >= 3) {
          if (checkAllAliases(m[1], flags.arrays)) {
            i = eatArray(i, m[1], args, m[2]);
          } else if (checkAllAliases(m[1], flags.nargs) !== false) {
            i = eatNargs(i, m[1], args, m[2]);
          } else {
            setArg(m[1], m[2], true);
          }
        }
      } else if (arg.match(negatedBoolean) && configuration["boolean-negation"]) {
        m = arg.match(negatedBoolean);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
        }
      } else if (arg.match(/^--.+/) || !configuration["short-option-groups"] && arg.match(/^-[^-]+/)) {
        m = arg.match(/^--?(.+)/);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          if (checkAllAliases(key, flags.arrays)) {
            i = eatArray(i, key, args);
          } else if (checkAllAliases(key, flags.nargs) !== false) {
            i = eatNargs(i, key, args);
          } else {
            next = args[i + 1];
            if (next !== void 0 && (!next.match(/^-/) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
              setArg(key, next);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next);
              i++;
            } else {
              setArg(key, defaultValue(key));
            }
          }
        }
      } else if (arg.match(/^-.\..+=/)) {
        m = arg.match(/^-([^=]+)=([\s\S]*)$/);
        if (m !== null && Array.isArray(m) && m.length >= 3) {
          setArg(m[1], m[2]);
        }
      } else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
        next = args[i + 1];
        m = arg.match(/^-(.\..+)/);
        if (m !== null && Array.isArray(m) && m.length >= 2) {
          key = m[1];
          if (next !== void 0 && !next.match(/^-/) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
            setArg(key, next);
            i++;
          } else {
            setArg(key, defaultValue(key));
          }
        }
      } else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
        letters = arg.slice(1, -1).split("");
        broken = false;
        for (let j = 0; j < letters.length; j++) {
          next = arg.slice(j + 2);
          if (letters[j + 1] && letters[j + 1] === "=") {
            value = arg.slice(j + 3);
            key = letters[j];
            if (checkAllAliases(key, flags.arrays)) {
              i = eatArray(i, key, args, value);
            } else if (checkAllAliases(key, flags.nargs) !== false) {
              i = eatNargs(i, key, args, value);
            } else {
              setArg(key, value);
            }
            broken = true;
            break;
          }
          if (next === "-") {
            setArg(letters[j], next);
            continue;
          }
          if (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) && checkAllAliases(next, flags.bools) === false) {
            setArg(letters[j], next);
            broken = true;
            break;
          }
          if (letters[j + 1] && letters[j + 1].match(/\W/)) {
            setArg(letters[j], next);
            broken = true;
            break;
          } else {
            setArg(letters[j], defaultValue(letters[j]));
          }
        }
        key = arg.slice(-1)[0];
        if (!broken && key !== "-") {
          if (checkAllAliases(key, flags.arrays)) {
            i = eatArray(i, key, args);
          } else if (checkAllAliases(key, flags.nargs) !== false) {
            i = eatNargs(i, key, args);
          } else {
            next = args[i + 1];
            if (next !== void 0 && (!/^(-|--)[^-]/.test(next) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
              setArg(key, next);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next);
              i++;
            } else {
              setArg(key, defaultValue(key));
            }
          }
        }
      } else if (arg.match(/^-[0-9]$/) && arg.match(negative) && checkAllAliases(arg.slice(1), flags.bools)) {
        key = arg.slice(1);
        setArg(key, defaultValue(key));
      } else if (arg === "--") {
        notFlags = args.slice(i + 1);
        break;
      } else if (configuration["halt-at-non-option"]) {
        notFlags = args.slice(i);
        break;
      } else {
        pushPositional(arg);
      }
    }
    applyEnvVars(argv, true);
    applyEnvVars(argv, false);
    setConfig(argv);
    setConfigObjects();
    applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
    applyCoercions(argv);
    if (configuration["set-placeholder-key"])
      setPlaceholderKeys(argv);
    Object.keys(flags.counts).forEach(function(key) {
      if (!hasKey(argv, key.split(".")))
        setArg(key, 0);
    });
    if (notFlagsOption && notFlags.length)
      argv[notFlagsArgv] = [];
    notFlags.forEach(function(key) {
      argv[notFlagsArgv].push(key);
    });
    if (configuration["camel-case-expansion"] && configuration["strip-dashed"]) {
      Object.keys(argv).filter((key) => key !== "--" && key.includes("-")).forEach((key) => {
        delete argv[key];
      });
    }
    if (configuration["strip-aliased"]) {
      ;
      [].concat(...Object.keys(aliases).map((k) => aliases[k])).forEach((alias) => {
        if (configuration["camel-case-expansion"] && alias.includes("-")) {
          delete argv[alias.split(".").map((prop) => camelCase(prop)).join(".")];
        }
        delete argv[alias];
      });
    }
    function pushPositional(arg) {
      const maybeCoercedNumber = maybeCoerceNumber("_", arg);
      if (typeof maybeCoercedNumber === "string" || typeof maybeCoercedNumber === "number") {
        argv._.push(maybeCoercedNumber);
      }
    }
    function eatNargs(i, key, args2, argAfterEqualSign) {
      let ii;
      let toEat = checkAllAliases(key, flags.nargs);
      toEat = typeof toEat !== "number" || isNaN(toEat) ? 1 : toEat;
      if (toEat === 0) {
        if (!isUndefined(argAfterEqualSign)) {
          error = Error(__("Argument unexpected for: %s", key));
        }
        setArg(key, defaultValue(key));
        return i;
      }
      let available = isUndefined(argAfterEqualSign) ? 0 : 1;
      if (configuration["nargs-eats-options"]) {
        if (args2.length - (i + 1) + available < toEat) {
          error = Error(__("Not enough arguments following: %s", key));
        }
        available = toEat;
      } else {
        for (ii = i + 1; ii < args2.length; ii++) {
          if (!args2[ii].match(/^-[^0-9]/) || args2[ii].match(negative) || isUnknownOptionAsArg(args2[ii]))
            available++;
          else
            break;
        }
        if (available < toEat)
          error = Error(__("Not enough arguments following: %s", key));
      }
      let consumed = Math.min(available, toEat);
      if (!isUndefined(argAfterEqualSign) && consumed > 0) {
        setArg(key, argAfterEqualSign);
        consumed--;
      }
      for (ii = i + 1; ii < consumed + i + 1; ii++) {
        setArg(key, args2[ii]);
      }
      return i + consumed;
    }
    function eatArray(i, key, args2, argAfterEqualSign) {
      let argsToSet = [];
      let next = argAfterEqualSign || args2[i + 1];
      const nargsCount = checkAllAliases(key, flags.nargs);
      if (checkAllAliases(key, flags.bools) && !/^(true|false)$/.test(next)) {
        argsToSet.push(true);
      } else if (isUndefined(next) || isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next)) {
        if (defaults[key] !== void 0) {
          const defVal = defaults[key];
          argsToSet = Array.isArray(defVal) ? defVal : [defVal];
        }
      } else {
        if (!isUndefined(argAfterEqualSign)) {
          argsToSet.push(processValue(key, argAfterEqualSign, true));
        }
        for (let ii = i + 1; ii < args2.length; ii++) {
          if (!configuration["greedy-arrays"] && argsToSet.length > 0 || nargsCount && typeof nargsCount === "number" && argsToSet.length >= nargsCount)
            break;
          next = args2[ii];
          if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
            break;
          i = ii;
          argsToSet.push(processValue(key, next, inputIsString));
        }
      }
      if (typeof nargsCount === "number" && (nargsCount && argsToSet.length < nargsCount || isNaN(nargsCount) && argsToSet.length === 0)) {
        error = Error(__("Not enough arguments following: %s", key));
      }
      setArg(key, argsToSet);
      return i;
    }
    function setArg(key, val, shouldStripQuotes = inputIsString) {
      if (/-/.test(key) && configuration["camel-case-expansion"]) {
        const alias = key.split(".").map(function(prop) {
          return camelCase(prop);
        }).join(".");
        addNewAlias(key, alias);
      }
      const value = processValue(key, val, shouldStripQuotes);
      const splitKey = key.split(".");
      setKey(argv, splitKey, value);
      if (flags.aliases[key]) {
        flags.aliases[key].forEach(function(x) {
          const keyProperties = x.split(".");
          setKey(argv, keyProperties, value);
        });
      }
      if (splitKey.length > 1 && configuration["dot-notation"]) {
        ;
        (flags.aliases[splitKey[0]] || []).forEach(function(x) {
          let keyProperties = x.split(".");
          const a = [].concat(splitKey);
          a.shift();
          keyProperties = keyProperties.concat(a);
          if (!(flags.aliases[key] || []).includes(keyProperties.join("."))) {
            setKey(argv, keyProperties, value);
          }
        });
      }
      if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
        const keys = [key].concat(flags.aliases[key] || []);
        keys.forEach(function(key2) {
          Object.defineProperty(argvReturn, key2, {
            enumerable: true,
            get() {
              return val;
            },
            set(value2) {
              val = typeof value2 === "string" ? mixin.normalize(value2) : value2;
            }
          });
        });
      }
    }
    function addNewAlias(key, alias) {
      if (!(flags.aliases[key] && flags.aliases[key].length)) {
        flags.aliases[key] = [alias];
        newAliases[alias] = true;
      }
      if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
        addNewAlias(alias, key);
      }
    }
    function processValue(key, val, shouldStripQuotes) {
      if (shouldStripQuotes) {
        val = stripQuotes(val);
      }
      if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
        if (typeof val === "string")
          val = val === "true";
      }
      let value = Array.isArray(val) ? val.map(function(v) {
        return maybeCoerceNumber(key, v);
      }) : maybeCoerceNumber(key, val);
      if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === "boolean")) {
        value = increment();
      }
      if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
        if (Array.isArray(val))
          value = val.map((val2) => {
            return mixin.normalize(val2);
          });
        else
          value = mixin.normalize(val);
      }
      return value;
    }
    function maybeCoerceNumber(key, value) {
      if (!configuration["parse-positional-numbers"] && key === "_")
        return value;
      if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
        const shouldCoerceNumber = looksLikeNumber(value) && configuration["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${value}`)));
        if (shouldCoerceNumber || !isUndefined(value) && checkAllAliases(key, flags.numbers)) {
          value = Number(value);
        }
      }
      return value;
    }
    function setConfig(argv2) {
      const configLookup = /* @__PURE__ */ Object.create(null);
      applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
      Object.keys(flags.configs).forEach(function(configKey) {
        const configPath = argv2[configKey] || configLookup[configKey];
        if (configPath) {
          try {
            let config = null;
            const resolvedConfigPath = mixin.resolve(mixin.cwd(), configPath);
            const resolveConfig = flags.configs[configKey];
            if (typeof resolveConfig === "function") {
              try {
                config = resolveConfig(resolvedConfigPath);
              } catch (e) {
                config = e;
              }
              if (config instanceof Error) {
                error = config;
                return;
              }
            } else {
              config = mixin.require(resolvedConfigPath);
            }
            setConfigObject(config);
          } catch (ex) {
            if (ex.name === "PermissionDenied")
              error = ex;
            else if (argv2[configKey])
              error = Error(__("Invalid JSON config file: %s", configPath));
          }
        }
      });
    }
    function setConfigObject(config, prev) {
      Object.keys(config).forEach(function(key) {
        const value = config[key];
        const fullKey = prev ? prev + "." + key : key;
        if (typeof value === "object" && value !== null && !Array.isArray(value) && configuration["dot-notation"]) {
          setConfigObject(value, fullKey);
        } else {
          if (!hasKey(argv, fullKey.split(".")) || checkAllAliases(fullKey, flags.arrays) && configuration["combine-arrays"]) {
            setArg(fullKey, value);
          }
        }
      });
    }
    function setConfigObjects() {
      if (typeof configObjects !== "undefined") {
        configObjects.forEach(function(configObject) {
          setConfigObject(configObject);
        });
      }
    }
    function applyEnvVars(argv2, configOnly) {
      if (typeof envPrefix === "undefined")
        return;
      const prefix = typeof envPrefix === "string" ? envPrefix : "";
      const env2 = mixin.env();
      Object.keys(env2).forEach(function(envVar) {
        if (prefix === "" || envVar.lastIndexOf(prefix, 0) === 0) {
          const keys = envVar.split("__").map(function(key, i) {
            if (i === 0) {
              key = key.substring(prefix.length);
            }
            return camelCase(key);
          });
          if ((configOnly && flags.configs[keys.join(".")] || !configOnly) && !hasKey(argv2, keys)) {
            setArg(keys.join("."), env2[envVar]);
          }
        }
      });
    }
    function applyCoercions(argv2) {
      let coerce;
      const applied = /* @__PURE__ */ new Set();
      Object.keys(argv2).forEach(function(key) {
        if (!applied.has(key)) {
          coerce = checkAllAliases(key, flags.coercions);
          if (typeof coerce === "function") {
            try {
              const value = maybeCoerceNumber(key, coerce(argv2[key]));
              [].concat(flags.aliases[key] || [], key).forEach((ali) => {
                applied.add(ali);
                argv2[ali] = value;
              });
            } catch (err) {
              error = err;
            }
          }
        }
      });
    }
    function setPlaceholderKeys(argv2) {
      flags.keys.forEach((key) => {
        if (~key.indexOf("."))
          return;
        if (typeof argv2[key] === "undefined")
          argv2[key] = void 0;
      });
      return argv2;
    }
    function applyDefaultsAndAliases(obj, aliases2, defaults2, canLog = false) {
      Object.keys(defaults2).forEach(function(key) {
        if (!hasKey(obj, key.split("."))) {
          setKey(obj, key.split("."), defaults2[key]);
          if (canLog)
            defaulted[key] = true;
          (aliases2[key] || []).forEach(function(x) {
            if (hasKey(obj, x.split(".")))
              return;
            setKey(obj, x.split("."), defaults2[key]);
          });
        }
      });
    }
    function hasKey(obj, keys) {
      let o = obj;
      if (!configuration["dot-notation"])
        keys = [keys.join(".")];
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      const key = keys[keys.length - 1];
      if (typeof o !== "object")
        return false;
      else
        return key in o;
    }
    function setKey(obj, keys, value) {
      let o = obj;
      if (!configuration["dot-notation"])
        keys = [keys.join(".")];
      keys.slice(0, -1).forEach(function(key2) {
        key2 = sanitizeKey(key2);
        if (typeof o === "object" && o[key2] === void 0) {
          o[key2] = {};
        }
        if (typeof o[key2] !== "object" || Array.isArray(o[key2])) {
          if (Array.isArray(o[key2])) {
            o[key2].push({});
          } else {
            o[key2] = [o[key2], {}];
          }
          o = o[key2][o[key2].length - 1];
        } else {
          o = o[key2];
        }
      });
      const key = sanitizeKey(keys[keys.length - 1]);
      const isTypeArray = checkAllAliases(keys.join("."), flags.arrays);
      const isValueArray = Array.isArray(value);
      let duplicate = configuration["duplicate-arguments-array"];
      if (!duplicate && checkAllAliases(key, flags.nargs)) {
        duplicate = true;
        if (!isUndefined(o[key]) && flags.nargs[key] === 1 || Array.isArray(o[key]) && o[key].length === flags.nargs[key]) {
          o[key] = void 0;
        }
      }
      if (value === increment()) {
        o[key] = increment(o[key]);
      } else if (Array.isArray(o[key])) {
        if (duplicate && isTypeArray && isValueArray) {
          o[key] = configuration["flatten-duplicate-arrays"] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
        } else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
          o[key] = value;
        } else {
          o[key] = o[key].concat([value]);
        }
      } else if (o[key] === void 0 && isTypeArray) {
        o[key] = isValueArray ? value : [value];
      } else if (duplicate && !(o[key] === void 0 || checkAllAliases(key, flags.counts) || checkAllAliases(key, flags.bools))) {
        o[key] = [o[key], value];
      } else {
        o[key] = value;
      }
    }
    function extendAliases(...args2) {
      args2.forEach(function(obj) {
        Object.keys(obj || {}).forEach(function(key) {
          if (flags.aliases[key])
            return;
          flags.aliases[key] = [].concat(aliases[key] || []);
          flags.aliases[key].concat(key).forEach(function(x) {
            if (/-/.test(x) && configuration["camel-case-expansion"]) {
              const c = camelCase(x);
              if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                flags.aliases[key].push(c);
                newAliases[c] = true;
              }
            }
          });
          flags.aliases[key].concat(key).forEach(function(x) {
            if (x.length > 1 && /[A-Z]/.test(x) && configuration["camel-case-expansion"]) {
              const c = decamelize(x, "-");
              if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                flags.aliases[key].push(c);
                newAliases[c] = true;
              }
            }
          });
          flags.aliases[key].forEach(function(x) {
            flags.aliases[x] = [key].concat(flags.aliases[key].filter(function(y) {
              return x !== y;
            }));
          });
        });
      });
    }
    function checkAllAliases(key, flag) {
      const toCheck = [].concat(flags.aliases[key] || [], key);
      const keys = Object.keys(flag);
      const setAlias = toCheck.find((key2) => keys.includes(key2));
      return setAlias ? flag[setAlias] : false;
    }
    function hasAnyFlag(key) {
      const flagsKeys = Object.keys(flags);
      const toCheck = [].concat(flagsKeys.map((k) => flags[k]));
      return toCheck.some(function(flag) {
        return Array.isArray(flag) ? flag.includes(key) : flag[key];
      });
    }
    function hasFlagsMatching(arg, ...patterns) {
      const toCheck = [].concat(...patterns);
      return toCheck.some(function(pattern) {
        const match = arg.match(pattern);
        return match && hasAnyFlag(match[1]);
      });
    }
    function hasAllShortFlags(arg) {
      if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
        return false;
      }
      let hasAllFlags = true;
      let next;
      const letters = arg.slice(1).split("");
      for (let j = 0; j < letters.length; j++) {
        next = arg.slice(j + 2);
        if (!hasAnyFlag(letters[j])) {
          hasAllFlags = false;
          break;
        }
        if (letters[j + 1] && letters[j + 1] === "=" || next === "-" || /[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) || letters[j + 1] && letters[j + 1].match(/\W/)) {
          break;
        }
      }
      return hasAllFlags;
    }
    function isUnknownOptionAsArg(arg) {
      return configuration["unknown-options-as-args"] && isUnknownOption(arg);
    }
    function isUnknownOption(arg) {
      arg = arg.replace(/^-{3,}/, "--");
      if (arg.match(negative)) {
        return false;
      }
      if (hasAllShortFlags(arg)) {
        return false;
      }
      const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
      const normalFlag = /^-+([^=]+?)$/;
      const flagEndingInHyphen = /^-+([^=]+?)-$/;
      const flagEndingInDigits = /^-+([^=]+?\d+)$/;
      const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
      return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
    }
    function defaultValue(key) {
      if (!checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts) && `${key}` in defaults) {
        return defaults[key];
      } else {
        return defaultForType(guessType(key));
      }
    }
    function defaultForType(type) {
      const def = {
        [DefaultValuesForTypeKey.BOOLEAN]: true,
        [DefaultValuesForTypeKey.STRING]: "",
        [DefaultValuesForTypeKey.NUMBER]: void 0,
        [DefaultValuesForTypeKey.ARRAY]: []
      };
      return def[type];
    }
    function guessType(key) {
      let type = DefaultValuesForTypeKey.BOOLEAN;
      if (checkAllAliases(key, flags.strings))
        type = DefaultValuesForTypeKey.STRING;
      else if (checkAllAliases(key, flags.numbers))
        type = DefaultValuesForTypeKey.NUMBER;
      else if (checkAllAliases(key, flags.bools))
        type = DefaultValuesForTypeKey.BOOLEAN;
      else if (checkAllAliases(key, flags.arrays))
        type = DefaultValuesForTypeKey.ARRAY;
      return type;
    }
    function isUndefined(num) {
      return num === void 0;
    }
    function checkConfiguration() {
      Object.keys(flags.counts).find((key) => {
        if (checkAllAliases(key, flags.arrays)) {
          error = Error(__("Invalid configuration: %s, opts.count excludes opts.array.", key));
          return true;
        } else if (checkAllAliases(key, flags.nargs)) {
          error = Error(__("Invalid configuration: %s, opts.count excludes opts.narg.", key));
          return true;
        }
        return false;
      });
    }
    return {
      aliases: Object.assign({}, flags.aliases),
      argv: Object.assign(argvReturn, argv),
      configuration,
      defaulted: Object.assign({}, defaulted),
      error,
      newAliases: Object.assign({}, newAliases)
    };
  }
};
function combineAliases(aliases) {
  const aliasArrays = [];
  const combined = /* @__PURE__ */ Object.create(null);
  let change = true;
  Object.keys(aliases).forEach(function(key) {
    aliasArrays.push([].concat(aliases[key], key));
  });
  while (change) {
    change = false;
    for (let i = 0; i < aliasArrays.length; i++) {
      for (let ii = i + 1; ii < aliasArrays.length; ii++) {
        const intersect = aliasArrays[i].filter(function(v) {
          return aliasArrays[ii].indexOf(v) !== -1;
        });
        if (intersect.length) {
          aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
          aliasArrays.splice(ii, 1);
          change = true;
          break;
        }
      }
    }
  }
  aliasArrays.forEach(function(aliasArray) {
    aliasArray = aliasArray.filter(function(v, i, self2) {
      return self2.indexOf(v) === i;
    });
    const lastAlias = aliasArray.pop();
    if (lastAlias !== void 0 && typeof lastAlias === "string") {
      combined[lastAlias] = aliasArray;
    }
  });
  return combined;
}
function increment(orig) {
  return orig !== void 0 ? orig + 1 : 1;
}
function sanitizeKey(key) {
  if (key === "__proto__")
    return "___proto___";
  return key;
}
function stripQuotes(val) {
  return typeof val === "string" && (val[0] === "'" || val[0] === '"') && val[val.length - 1] === val[0] ? val.substring(1, val.length - 1) : val;
}

// node_modules/.pnpm/yargs-parser@21.1.1/node_modules/yargs-parser/build/lib/index.js
var import_fs = require("fs");
var _a;
var _b;
var _c;
var minNodeVersion = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12;
var nodeVersion = (_b = (_a = process === null || process === void 0 ? void 0 : process.versions) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : (_c = process === null || process === void 0 ? void 0 : process.version) === null || _c === void 0 ? void 0 : _c.slice(1);
if (nodeVersion) {
  const major = Number(nodeVersion.match(/^([^.]+)/)[1]);
  if (major < minNodeVersion) {
    throw Error(`yargs parser supports a minimum Node.js version of ${minNodeVersion}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
  }
}
var env = process ? process.env : {};
var parser = new YargsParser({
  cwd: process.cwd,
  env: () => {
    return env;
  },
  format: import_util.format,
  normalize: import_path.normalize,
  resolve: import_path.resolve,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (path9) => {
    if (typeof require !== "undefined") {
      return require(path9);
    } else if (path9.match(/\.json$/)) {
      return JSON.parse((0, import_fs.readFileSync)(path9, "utf8"));
    } else {
      throw Error("only .json config files are supported in ESM");
    }
  }
});
var yargsParser = function Parser2(args, opts) {
  const result = parser.parse(args.slice(), opts);
  return result.argv;
};
yargsParser.detailed = function(args, opts) {
  return parser.parse(args.slice(), opts);
};
yargsParser.camelCase = camelCase;
yargsParser.decamelize = decamelize;
yargsParser.looksLikeNumber = looksLikeNumber;
var lib_default = yargsParser;

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/lib/platform-shims/esm.mjs
var import_assert = require("assert");

// node_modules/.pnpm/cliui@8.0.1/node_modules/cliui/build/lib/index.js
var align = {
  right: alignRight,
  center: alignCenter
};
var top = 0;
var right = 1;
var bottom = 2;
var left = 3;
var UI = class {
  constructor(opts) {
    var _a2;
    this.width = opts.width;
    this.wrap = (_a2 = opts.wrap) !== null && _a2 !== void 0 ? _a2 : true;
    this.rows = [];
  }
  span(...args) {
    const cols = this.div(...args);
    cols.span = true;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...args) {
    if (args.length === 0) {
      this.div("");
    }
    if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === "string") {
      return this.applyLayoutDSL(args[0]);
    }
    const cols = args.map((arg) => {
      if (typeof arg === "string") {
        return this.colFromString(arg);
      }
      return arg;
    });
    this.rows.push(cols);
    return cols;
  }
  shouldApplyLayoutDSL(...args) {
    return args.length === 1 && typeof args[0] === "string" && /[\t\n]/.test(args[0]);
  }
  applyLayoutDSL(str) {
    const rows = str.split("\n").map((row) => row.split("	"));
    let leftColumnWidth = 0;
    rows.forEach((columns) => {
      if (columns.length > 1 && mixin2.stringWidth(columns[0]) > leftColumnWidth) {
        leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin2.stringWidth(columns[0]));
      }
    });
    rows.forEach((columns) => {
      this.div(...columns.map((r, i) => {
        return {
          text: r.trim(),
          padding: this.measurePadding(r),
          width: i === 0 && columns.length > 1 ? leftColumnWidth : void 0
        };
      }));
    });
    return this.rows[this.rows.length - 1];
  }
  colFromString(text) {
    return {
      text,
      padding: this.measurePadding(text)
    };
  }
  measurePadding(str) {
    const noAnsi = mixin2.stripAnsi(str);
    return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
  }
  toString() {
    const lines = [];
    this.rows.forEach((row) => {
      this.rowToString(row, lines);
    });
    return lines.filter((line) => !line.hidden).map((line) => line.text).join("\n");
  }
  rowToString(row, lines) {
    this.rasterize(row).forEach((rrow, r) => {
      let str = "";
      rrow.forEach((col, c) => {
        const { width } = row[c];
        const wrapWidth = this.negatePadding(row[c]);
        let ts = col;
        if (wrapWidth > mixin2.stringWidth(col)) {
          ts += " ".repeat(wrapWidth - mixin2.stringWidth(col));
        }
        if (row[c].align && row[c].align !== "left" && this.wrap) {
          const fn = align[row[c].align];
          ts = fn(ts, wrapWidth);
          if (mixin2.stringWidth(ts) < wrapWidth) {
            ts += " ".repeat((width || 0) - mixin2.stringWidth(ts) - 1);
          }
        }
        const padding = row[c].padding || [0, 0, 0, 0];
        if (padding[left]) {
          str += " ".repeat(padding[left]);
        }
        str += addBorder(row[c], ts, "| ");
        str += ts;
        str += addBorder(row[c], ts, " |");
        if (padding[right]) {
          str += " ".repeat(padding[right]);
        }
        if (r === 0 && lines.length > 0) {
          str = this.renderInline(str, lines[lines.length - 1]);
        }
      });
      lines.push({
        text: str.replace(/ +$/, ""),
        span: row.span
      });
    });
    return lines;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(source, previousLine) {
    const match = source.match(/^ */);
    const leadingWhitespace = match ? match[0].length : 0;
    const target = previousLine.text;
    const targetTextWidth = mixin2.stringWidth(target.trimRight());
    if (!previousLine.span) {
      return source;
    }
    if (!this.wrap) {
      previousLine.hidden = true;
      return target + source;
    }
    if (leadingWhitespace < targetTextWidth) {
      return source;
    }
    previousLine.hidden = true;
    return target.trimRight() + " ".repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
  }
  rasterize(row) {
    const rrows = [];
    const widths = this.columnWidths(row);
    let wrapped;
    row.forEach((col, c) => {
      col.width = widths[c];
      if (this.wrap) {
        wrapped = mixin2.wrap(col.text, this.negatePadding(col), { hard: true }).split("\n");
      } else {
        wrapped = col.text.split("\n");
      }
      if (col.border) {
        wrapped.unshift("." + "-".repeat(this.negatePadding(col) + 2) + ".");
        wrapped.push("'" + "-".repeat(this.negatePadding(col) + 2) + "'");
      }
      if (col.padding) {
        wrapped.unshift(...new Array(col.padding[top] || 0).fill(""));
        wrapped.push(...new Array(col.padding[bottom] || 0).fill(""));
      }
      wrapped.forEach((str, r) => {
        if (!rrows[r]) {
          rrows.push([]);
        }
        const rrow = rrows[r];
        for (let i = 0; i < c; i++) {
          if (rrow[i] === void 0) {
            rrow.push("");
          }
        }
        rrow.push(str);
      });
    });
    return rrows;
  }
  negatePadding(col) {
    let wrapWidth = col.width || 0;
    if (col.padding) {
      wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
    }
    if (col.border) {
      wrapWidth -= 4;
    }
    return wrapWidth;
  }
  columnWidths(row) {
    if (!this.wrap) {
      return row.map((col) => {
        return col.width || mixin2.stringWidth(col.text);
      });
    }
    let unset = row.length;
    let remainingWidth = this.width;
    const widths = row.map((col) => {
      if (col.width) {
        unset--;
        remainingWidth -= col.width;
        return col.width;
      }
      return void 0;
    });
    const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
    return widths.map((w, i) => {
      if (w === void 0) {
        return Math.max(unsetWidth, _minWidth(row[i]));
      }
      return w;
    });
  }
};
function addBorder(col, ts, style) {
  if (col.border) {
    if (/[.']-+[.']/.test(ts)) {
      return "";
    }
    if (ts.trim().length !== 0) {
      return style;
    }
    return "  ";
  }
  return "";
}
function _minWidth(col) {
  const padding = col.padding || [];
  const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
  if (col.border) {
    return minWidth + 4;
  }
  return minWidth;
}
function getWindowWidth() {
  if (typeof process === "object" && process.stdout && process.stdout.columns) {
    return process.stdout.columns;
  }
  return 80;
}
function alignRight(str, width) {
  str = str.trim();
  const strWidth = mixin2.stringWidth(str);
  if (strWidth < width) {
    return " ".repeat(width - strWidth) + str;
  }
  return str;
}
function alignCenter(str, width) {
  str = str.trim();
  const strWidth = mixin2.stringWidth(str);
  if (strWidth >= width) {
    return str;
  }
  return " ".repeat(width - strWidth >> 1) + str;
}
var mixin2;
function cliui(opts, _mixin) {
  mixin2 = _mixin;
  return new UI({
    width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
    wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
  });
}

// node_modules/.pnpm/cliui@8.0.1/node_modules/cliui/build/lib/string-utils.js
var ansi = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function stripAnsi(str) {
  return str.replace(ansi, "");
}
function wrap(str, width) {
  const [start, end] = str.match(ansi) || ["", ""];
  str = stripAnsi(str);
  let wrapped = "";
  for (let i = 0; i < str.length; i++) {
    if (i !== 0 && i % width === 0) {
      wrapped += "\n";
    }
    wrapped += str.charAt(i);
  }
  if (start && end) {
    wrapped = `${start}${wrapped}${end}`;
  }
  return wrapped;
}

// node_modules/.pnpm/cliui@8.0.1/node_modules/cliui/index.mjs
function ui(opts) {
  return cliui(opts, {
    stringWidth: (str) => {
      return [...str].length;
    },
    stripAnsi,
    wrap
  });
}

// node_modules/.pnpm/escalade@3.1.2/node_modules/escalade/sync/index.mjs
var import_path2 = require("path");
var import_fs2 = require("fs");
function sync_default(start, callback) {
  let dir = (0, import_path2.resolve)(".", start);
  let tmp, stats = (0, import_fs2.statSync)(dir);
  if (!stats.isDirectory()) {
    dir = (0, import_path2.dirname)(dir);
  }
  while (true) {
    tmp = callback(dir, (0, import_fs2.readdirSync)(dir));
    if (tmp) return (0, import_path2.resolve)(dir, tmp);
    dir = (0, import_path2.dirname)(tmp = dir);
    if (tmp === dir) break;
  }
}

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/lib/platform-shims/esm.mjs
var import_util3 = require("util");
var import_fs4 = require("fs");
var import_url = require("url");
var import_path4 = require("path");

// node_modules/.pnpm/y18n@5.0.8/node_modules/y18n/build/lib/platform-shims/node.js
var import_fs3 = require("fs");
var import_util2 = require("util");
var import_path3 = require("path");
var node_default = {
  fs: {
    readFileSync: import_fs3.readFileSync,
    writeFile: import_fs3.writeFile
  },
  format: import_util2.format,
  resolve: import_path3.resolve,
  exists: (file) => {
    try {
      return (0, import_fs3.statSync)(file).isFile();
    } catch (err) {
      return false;
    }
  }
};

// node_modules/.pnpm/y18n@5.0.8/node_modules/y18n/build/lib/index.js
var shim;
var Y18N = class {
  constructor(opts) {
    opts = opts || {};
    this.directory = opts.directory || "./locales";
    this.updateFiles = typeof opts.updateFiles === "boolean" ? opts.updateFiles : true;
    this.locale = opts.locale || "en";
    this.fallbackToLanguage = typeof opts.fallbackToLanguage === "boolean" ? opts.fallbackToLanguage : true;
    this.cache = /* @__PURE__ */ Object.create(null);
    this.writeQueue = [];
  }
  __(...args) {
    if (typeof arguments[0] !== "string") {
      return this._taggedLiteral(arguments[0], ...arguments);
    }
    const str = args.shift();
    let cb = function() {
    };
    if (typeof args[args.length - 1] === "function")
      cb = args.pop();
    cb = cb || function() {
    };
    if (!this.cache[this.locale])
      this._readLocaleFile();
    if (!this.cache[this.locale][str] && this.updateFiles) {
      this.cache[this.locale][str] = str;
      this._enqueueWrite({
        directory: this.directory,
        locale: this.locale,
        cb
      });
    } else {
      cb();
    }
    return shim.format.apply(shim.format, [this.cache[this.locale][str] || str].concat(args));
  }
  __n() {
    const args = Array.prototype.slice.call(arguments);
    const singular = args.shift();
    const plural = args.shift();
    const quantity = args.shift();
    let cb = function() {
    };
    if (typeof args[args.length - 1] === "function")
      cb = args.pop();
    if (!this.cache[this.locale])
      this._readLocaleFile();
    let str = quantity === 1 ? singular : plural;
    if (this.cache[this.locale][singular]) {
      const entry = this.cache[this.locale][singular];
      str = entry[quantity === 1 ? "one" : "other"];
    }
    if (!this.cache[this.locale][singular] && this.updateFiles) {
      this.cache[this.locale][singular] = {
        one: singular,
        other: plural
      };
      this._enqueueWrite({
        directory: this.directory,
        locale: this.locale,
        cb
      });
    } else {
      cb();
    }
    const values = [str];
    if (~str.indexOf("%d"))
      values.push(quantity);
    return shim.format.apply(shim.format, values.concat(args));
  }
  setLocale(locale) {
    this.locale = locale;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(obj) {
    if (!this.cache[this.locale])
      this._readLocaleFile();
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        this.cache[this.locale][key] = obj[key];
      }
    }
  }
  _taggedLiteral(parts, ...args) {
    let str = "";
    parts.forEach(function(part, i) {
      const arg = args[i + 1];
      str += part;
      if (typeof arg !== "undefined") {
        str += "%s";
      }
    });
    return this.__.apply(this, [str].concat([].slice.call(args, 1)));
  }
  _enqueueWrite(work) {
    this.writeQueue.push(work);
    if (this.writeQueue.length === 1)
      this._processWriteQueue();
  }
  _processWriteQueue() {
    const _this = this;
    const work = this.writeQueue[0];
    const directory = work.directory;
    const locale = work.locale;
    const cb = work.cb;
    const languageFile = this._resolveLocaleFile(directory, locale);
    const serializedLocale = JSON.stringify(this.cache[locale], null, 2);
    shim.fs.writeFile(languageFile, serializedLocale, "utf-8", function(err) {
      _this.writeQueue.shift();
      if (_this.writeQueue.length > 0)
        _this._processWriteQueue();
      cb(err);
    });
  }
  _readLocaleFile() {
    let localeLookup = {};
    const languageFile = this._resolveLocaleFile(this.directory, this.locale);
    try {
      if (shim.fs.readFileSync) {
        localeLookup = JSON.parse(shim.fs.readFileSync(languageFile, "utf-8"));
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        err.message = "syntax error in " + languageFile;
      }
      if (err.code === "ENOENT")
        localeLookup = {};
      else
        throw err;
    }
    this.cache[this.locale] = localeLookup;
  }
  _resolveLocaleFile(directory, locale) {
    let file = shim.resolve(directory, "./", locale + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf("_")) {
      const languageFile = shim.resolve(directory, "./", locale.split("_")[0] + ".json");
      if (this._fileExistsSync(languageFile))
        file = languageFile;
    }
    return file;
  }
  _fileExistsSync(file) {
    return shim.exists(file);
  }
};
function y18n(opts, _shim) {
  shim = _shim;
  const y18n3 = new Y18N(opts);
  return {
    __: y18n3.__.bind(y18n3),
    __n: y18n3.__n.bind(y18n3),
    setLocale: y18n3.setLocale.bind(y18n3),
    getLocale: y18n3.getLocale.bind(y18n3),
    updateLocale: y18n3.updateLocale.bind(y18n3),
    locale: y18n3.locale
  };
}

// node_modules/.pnpm/y18n@5.0.8/node_modules/y18n/index.mjs
var y18n2 = (opts) => {
  return y18n(opts, node_default);
};
var y18n_default = y18n2;

// node_modules/.pnpm/yargs@17.7.2/node_modules/yargs/lib/platform-shims/esm.mjs
var import_meta = {};
var REQUIRE_ERROR = "require is not supported by ESM";
var REQUIRE_DIRECTORY_ERROR = "loading a directory of commands is not supported yet for ESM";
var __dirname2;
try {
  __dirname2 = (0, import_url.fileURLToPath)(import_meta.url);
} catch (e) {
  __dirname2 = process.cwd();
}
var mainFilename = __dirname2.substring(0, __dirname2.lastIndexOf("node_modules"));
var esm_default = {
  assert: {
    notStrictEqual: import_assert.notStrictEqual,
    strictEqual: import_assert.strictEqual
  },
  cliui: ui,
  findUp: sync_default,
  getEnv: (key) => {
    return process.env[key];
  },
  inspect: import_util3.inspect,
  getCallerFile: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR);
  },
  getProcessArgvBin,
  mainFilename: mainFilename || process.cwd(),
  Parser: lib_default,
  path: {
    basename: import_path4.basename,
    dirname: import_path4.dirname,
    extname: import_path4.extname,
    relative: import_path4.relative,
    resolve: import_path4.resolve
  },
  process: {
    argv: () => process.argv,
    cwd: process.cwd,
    emitWarning: (warning, type) => process.emitWarning(warning, type),
    execPath: () => process.execPath,
    exit: process.exit,
    nextTick: process.nextTick,
    stdColumns: typeof process.stdout.columns !== "undefined" ? process.stdout.columns : null
  },
  readFileSync: import_fs4.readFileSync,
  require: () => {
    throw new YError(REQUIRE_ERROR);
  },
  requireDirectory: () => {
    throw new YError(REQUIRE_DIRECTORY_ERROR);
  },
  stringWidth: (str) => {
    return [...str].length;
  },
  y18n: y18n_default({
    directory: (0, import_path4.resolve)(__dirname2, "../../../locales"),
    updateFiles: false
  })
};

// gh-pages/gh-pages.ts
var import_fs12 = __toESM(require("fs"));
var import_gh_pages = __toESM(require_lib2());
var import_path12 = __toESM(require("path"));

// node_modules/.pnpm/@isaacs+fs-minipass@4.0.1/node_modules/@isaacs/fs-minipass/dist/esm/index.js
var import_events = __toESM(require("events"), 1);
var import_fs5 = __toESM(require("fs"), 1);

// node_modules/.pnpm/minipass@7.1.2/node_modules/minipass/dist/esm/index.js
var import_node_events = require("node:events");
var import_node_stream = __toESM(require("node:stream"), 1);
var import_node_string_decoder = require("node:string_decoder");
var proc = typeof process === "object" && process ? process : {
  stdout: null,
  stderr: null
};
var isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof import_node_stream.default || isReadable(s) || isWritable(s));
var isReadable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
s.pipe !== import_node_stream.default.Writable.prototype.pipe;
var isWritable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
var EOF = Symbol("EOF");
var MAYBE_EMIT_END = Symbol("maybeEmitEnd");
var EMITTED_END = Symbol("emittedEnd");
var EMITTING_END = Symbol("emittingEnd");
var EMITTED_ERROR = Symbol("emittedError");
var CLOSED = Symbol("closed");
var READ = Symbol("read");
var FLUSH = Symbol("flush");
var FLUSHCHUNK = Symbol("flushChunk");
var ENCODING = Symbol("encoding");
var DECODER = Symbol("decoder");
var FLOWING = Symbol("flowing");
var PAUSED = Symbol("paused");
var RESUME = Symbol("resume");
var BUFFER = Symbol("buffer");
var PIPES = Symbol("pipes");
var BUFFERLENGTH = Symbol("bufferLength");
var BUFFERPUSH = Symbol("bufferPush");
var BUFFERSHIFT = Symbol("bufferShift");
var OBJECTMODE = Symbol("objectMode");
var DESTROYED = Symbol("destroyed");
var ERROR = Symbol("error");
var EMITDATA = Symbol("emitData");
var EMITEND = Symbol("emitEnd");
var EMITEND2 = Symbol("emitEnd2");
var ASYNC = Symbol("async");
var ABORT = Symbol("abort");
var ABORTED = Symbol("aborted");
var SIGNAL = Symbol("signal");
var DATALISTENERS = Symbol("dataListeners");
var DISCARDED = Symbol("discarded");
var defer = (fn) => Promise.resolve().then(fn);
var nodefer = (fn) => fn();
var isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
var isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
var isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
var Pipe = class {
  src;
  dest;
  opts;
  ondrain;
  constructor(src, dest, opts) {
    this.src = src;
    this.dest = dest;
    this.opts = opts;
    this.ondrain = () => src[RESUME]();
    this.dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  // only here for the prototype
  /* c8 ignore start */
  proxyErrors(_er) {
  }
  /* c8 ignore stop */
  end() {
    this.unpipe();
    if (this.opts.end)
      this.dest.end();
  }
};
var PipeProxyErrors = class extends Pipe {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors);
    super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts);
    this.proxyErrors = (er) => dest.emit("error", er);
    src.on("error", this.proxyErrors);
  }
};
var isObjectModeOptions = (o) => !!o.objectMode;
var isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
var Minipass = class extends import_node_events.EventEmitter {
  [FLOWING] = false;
  [PAUSED] = false;
  [PIPES] = [];
  [BUFFER] = [];
  [OBJECTMODE];
  [ENCODING];
  [ASYNC];
  [DECODER];
  [EOF] = false;
  [EMITTED_END] = false;
  [EMITTING_END] = false;
  [CLOSED] = false;
  [EMITTED_ERROR] = null;
  [BUFFERLENGTH] = 0;
  [DESTROYED] = false;
  [SIGNAL];
  [ABORTED] = false;
  [DATALISTENERS] = 0;
  [DISCARDED] = false;
  /**
   * true if the stream can be written
   */
  writable = true;
  /**
   * true if the stream can be read
   */
  readable = true;
  /**
   * If `RType` is Buffer, then options do not need to be provided.
   * Otherwise, an options object must be provided to specify either
   * {@link Minipass.SharedOptions.objectMode} or
   * {@link Minipass.SharedOptions.encoding}, as appropriate.
   */
  constructor(...args) {
    const options = args[0] || {};
    super();
    if (options.objectMode && typeof options.encoding === "string") {
      throw new TypeError("Encoding and objectMode may not be used together");
    }
    if (isObjectModeOptions(options)) {
      this[OBJECTMODE] = true;
      this[ENCODING] = null;
    } else if (isEncodingOptions(options)) {
      this[ENCODING] = options.encoding;
      this[OBJECTMODE] = false;
    } else {
      this[OBJECTMODE] = false;
      this[ENCODING] = null;
    }
    this[ASYNC] = !!options.async;
    this[DECODER] = this[ENCODING] ? new import_node_string_decoder.StringDecoder(this[ENCODING]) : null;
    if (options && options.debugExposeBuffer === true) {
      Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
    }
    if (options && options.debugExposePipes === true) {
      Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
    }
    const { signal } = options;
    if (signal) {
      this[SIGNAL] = signal;
      if (signal.aborted) {
        this[ABORT]();
      } else {
        signal.addEventListener("abort", () => this[ABORT]());
      }
    }
  }
  /**
   * The amount of data stored in the buffer waiting to be read.
   *
   * For Buffer strings, this will be the total byte length.
   * For string encoding streams, this will be the string character length,
   * according to JavaScript's `string.length` logic.
   * For objectMode streams, this is a count of the items waiting to be
   * emitted.
   */
  get bufferLength() {
    return this[BUFFERLENGTH];
  }
  /**
   * The `BufferEncoding` currently in use, or `null`
   */
  get encoding() {
    return this[ENCODING];
  }
  /**
   * @deprecated - This is a read only property
   */
  set encoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * @deprecated - Encoding may only be set at instantiation time
   */
  setEncoding(_enc) {
    throw new Error("Encoding must be set at instantiation time");
  }
  /**
   * True if this is an objectMode stream
   */
  get objectMode() {
    return this[OBJECTMODE];
  }
  /**
   * @deprecated - This is a read-only property
   */
  set objectMode(_om) {
    throw new Error("objectMode must be set at instantiation time");
  }
  /**
   * true if this is an async stream
   */
  get ["async"]() {
    return this[ASYNC];
  }
  /**
   * Set to true to make this stream async.
   *
   * Once set, it cannot be unset, as this would potentially cause incorrect
   * behavior.  Ie, a sync stream can be made async, but an async stream
   * cannot be safely made sync.
   */
  set ["async"](a) {
    this[ASYNC] = this[ASYNC] || !!a;
  }
  // drop everything and get out of the flow completely
  [ABORT]() {
    this[ABORTED] = true;
    this.emit("abort", this[SIGNAL]?.reason);
    this.destroy(this[SIGNAL]?.reason);
  }
  /**
   * True if the stream has been aborted.
   */
  get aborted() {
    return this[ABORTED];
  }
  /**
   * No-op setter. Stream aborted status is set via the AbortSignal provided
   * in the constructor options.
   */
  set aborted(_) {
  }
  write(chunk, encoding, cb) {
    if (this[ABORTED])
      return false;
    if (this[EOF])
      throw new Error("write after end");
    if (this[DESTROYED]) {
      this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
      return true;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (!encoding)
      encoding = "utf8";
    const fn = this[ASYNC] ? defer : nodefer;
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk)) {
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
      } else if (isArrayBufferLike(chunk)) {
        chunk = Buffer.from(chunk);
      } else if (typeof chunk !== "string") {
        throw new Error("Non-contiguous data written to non-objectMode stream");
      }
    }
    if (this[OBJECTMODE]) {
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (!chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    if (typeof chunk === "string" && // unless it is a string already ready for us to use
    !(encoding === this[ENCODING] && !this[DECODER]?.lastNeed)) {
      chunk = Buffer.from(chunk, encoding);
    }
    if (Buffer.isBuffer(chunk) && this[ENCODING]) {
      chunk = this[DECODER].write(chunk);
    }
    if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
      this[FLUSH](true);
    if (this[FLOWING])
      this.emit("data", chunk);
    else
      this[BUFFERPUSH](chunk);
    if (this[BUFFERLENGTH] !== 0)
      this.emit("readable");
    if (cb)
      fn(cb);
    return this[FLOWING];
  }
  /**
   * Low-level explicit read method.
   *
   * In objectMode, the argument is ignored, and one item is returned if
   * available.
   *
   * `n` is the number of bytes (or in the case of encoding streams,
   * characters) to consume. If `n` is not provided, then the entire buffer
   * is returned, or `null` is returned if no data is available.
   *
   * If `n` is greater that the amount of data in the internal buffer,
   * then `null` is returned.
   */
  read(n) {
    if (this[DESTROYED])
      return null;
    this[DISCARDED] = false;
    if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
      this[MAYBE_EMIT_END]();
      return null;
    }
    if (this[OBJECTMODE])
      n = null;
    if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
      this[BUFFER] = [
        this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
      ];
    }
    const ret = this[READ](n || null, this[BUFFER][0]);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [READ](n, chunk) {
    if (this[OBJECTMODE])
      this[BUFFERSHIFT]();
    else {
      const c = chunk;
      if (n === c.length || n === null)
        this[BUFFERSHIFT]();
      else if (typeof c === "string") {
        this[BUFFER][0] = c.slice(n);
        chunk = c.slice(0, n);
        this[BUFFERLENGTH] -= n;
      } else {
        this[BUFFER][0] = c.subarray(n);
        chunk = c.subarray(0, n);
        this[BUFFERLENGTH] -= n;
      }
    }
    this.emit("data", chunk);
    if (!this[BUFFER].length && !this[EOF])
      this.emit("drain");
    return chunk;
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = "utf8";
    }
    if (chunk !== void 0)
      this.write(chunk, encoding);
    if (cb)
      this.once("end", cb);
    this[EOF] = true;
    this.writable = false;
    if (this[FLOWING] || !this[PAUSED])
      this[MAYBE_EMIT_END]();
    return this;
  }
  // don't let the internal resume be overwritten
  [RESUME]() {
    if (this[DESTROYED])
      return;
    if (!this[DATALISTENERS] && !this[PIPES].length) {
      this[DISCARDED] = true;
    }
    this[PAUSED] = false;
    this[FLOWING] = true;
    this.emit("resume");
    if (this[BUFFER].length)
      this[FLUSH]();
    else if (this[EOF])
      this[MAYBE_EMIT_END]();
    else
      this.emit("drain");
  }
  /**
   * Resume the stream if it is currently in a paused state
   *
   * If called when there are no pipe destinations or `data` event listeners,
   * this will place the stream in a "discarded" state, where all data will
   * be thrown away. The discarded state is removed if a pipe destination or
   * data handler is added, if pause() is called, or if any synchronous or
   * asynchronous iteration is started.
   */
  resume() {
    return this[RESUME]();
  }
  /**
   * Pause the stream
   */
  pause() {
    this[FLOWING] = false;
    this[PAUSED] = true;
    this[DISCARDED] = false;
  }
  /**
   * true if the stream has been forcibly destroyed
   */
  get destroyed() {
    return this[DESTROYED];
  }
  /**
   * true if the stream is currently in a flowing state, meaning that
   * any writes will be immediately emitted.
   */
  get flowing() {
    return this[FLOWING];
  }
  /**
   * true if the stream is currently in a paused state
   */
  get paused() {
    return this[PAUSED];
  }
  [BUFFERPUSH](chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1;
    else
      this[BUFFERLENGTH] += chunk.length;
    this[BUFFER].push(chunk);
  }
  [BUFFERSHIFT]() {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] -= 1;
    else
      this[BUFFERLENGTH] -= this[BUFFER][0].length;
    return this[BUFFER].shift();
  }
  [FLUSH](noDrain = false) {
    do {
    } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
    if (!noDrain && !this[BUFFER].length && !this[EOF])
      this.emit("drain");
  }
  [FLUSHCHUNK](chunk) {
    this.emit("data", chunk);
    return this[FLOWING];
  }
  /**
   * Pipe all data emitted by this stream into the destination provided.
   *
   * Triggers the flow of data.
   */
  pipe(dest, opts) {
    if (this[DESTROYED])
      return dest;
    this[DISCARDED] = false;
    const ended = this[EMITTED_END];
    opts = opts || {};
    if (dest === proc.stdout || dest === proc.stderr)
      opts.end = false;
    else
      opts.end = opts.end !== false;
    opts.proxyErrors = !!opts.proxyErrors;
    if (ended) {
      if (opts.end)
        dest.end();
    } else {
      this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
      if (this[ASYNC])
        defer(() => this[RESUME]());
      else
        this[RESUME]();
    }
    return dest;
  }
  /**
   * Fully unhook a piped destination stream.
   *
   * If the destination stream was the only consumer of this stream (ie,
   * there are no other piped destinations or `'data'` event listeners)
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  unpipe(dest) {
    const p = this[PIPES].find((p2) => p2.dest === dest);
    if (p) {
      if (this[PIPES].length === 1) {
        if (this[FLOWING] && this[DATALISTENERS] === 0) {
          this[FLOWING] = false;
        }
        this[PIPES] = [];
      } else
        this[PIPES].splice(this[PIPES].indexOf(p), 1);
      p.unpipe();
    }
  }
  /**
   * Alias for {@link Minipass#on}
   */
  addListener(ev, handler) {
    return this.on(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.on`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * - Adding a 'data' event handler will trigger the flow of data
   *
   * - Adding a 'readable' event handler when there is data waiting to be read
   *   will cause 'readable' to be emitted immediately.
   *
   * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
   *   already passed will cause the event to be emitted immediately and all
   *   handlers removed.
   *
   * - Adding an 'error' event handler after an error has been emitted will
   *   cause the event to be re-emitted immediately with the error previously
   *   raised.
   */
  on(ev, handler) {
    const ret = super.on(ev, handler);
    if (ev === "data") {
      this[DISCARDED] = false;
      this[DATALISTENERS]++;
      if (!this[PIPES].length && !this[FLOWING]) {
        this[RESUME]();
      }
    } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
      super.emit("readable");
    } else if (isEndish(ev) && this[EMITTED_END]) {
      super.emit(ev);
      this.removeAllListeners(ev);
    } else if (ev === "error" && this[EMITTED_ERROR]) {
      const h = handler;
      if (this[ASYNC])
        defer(() => h.call(this, this[EMITTED_ERROR]));
      else
        h.call(this, this[EMITTED_ERROR]);
    }
    return ret;
  }
  /**
   * Alias for {@link Minipass#off}
   */
  removeListener(ev, handler) {
    return this.off(ev, handler);
  }
  /**
   * Mostly identical to `EventEmitter.off`
   *
   * If a 'data' event handler is removed, and it was the last consumer
   * (ie, there are no pipe destinations or other 'data' event listeners),
   * then the flow of data will stop until there is another consumer or
   * {@link Minipass#resume} is explicitly called.
   */
  off(ev, handler) {
    const ret = super.off(ev, handler);
    if (ev === "data") {
      this[DATALISTENERS] = this.listeners("data").length;
      if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * Mostly identical to `EventEmitter.removeAllListeners`
   *
   * If all 'data' event handlers are removed, and they were the last consumer
   * (ie, there are no pipe destinations), then the flow of data will stop
   * until there is another consumer or {@link Minipass#resume} is explicitly
   * called.
   */
  removeAllListeners(ev) {
    const ret = super.removeAllListeners(ev);
    if (ev === "data" || ev === void 0) {
      this[DATALISTENERS] = 0;
      if (!this[DISCARDED] && !this[PIPES].length) {
        this[FLOWING] = false;
      }
    }
    return ret;
  }
  /**
   * true if the 'end' event has been emitted
   */
  get emittedEnd() {
    return this[EMITTED_END];
  }
  [MAYBE_EMIT_END]() {
    if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
      this[EMITTING_END] = true;
      this.emit("end");
      this.emit("prefinish");
      this.emit("finish");
      if (this[CLOSED])
        this.emit("close");
      this[EMITTING_END] = false;
    }
  }
  /**
   * Mostly identical to `EventEmitter.emit`, with the following
   * behavior differences to prevent data loss and unnecessary hangs:
   *
   * If the stream has been destroyed, and the event is something other
   * than 'close' or 'error', then `false` is returned and no handlers
   * are called.
   *
   * If the event is 'end', and has already been emitted, then the event
   * is ignored. If the stream is in a paused or non-flowing state, then
   * the event will be deferred until data flow resumes. If the stream is
   * async, then handlers will be called on the next tick rather than
   * immediately.
   *
   * If the event is 'close', and 'end' has not yet been emitted, then
   * the event will be deferred until after 'end' is emitted.
   *
   * If the event is 'error', and an AbortSignal was provided for the stream,
   * and there are no listeners, then the event is ignored, matching the
   * behavior of node core streams in the presense of an AbortSignal.
   *
   * If the event is 'finish' or 'prefinish', then all listeners will be
   * removed after emitting the event, to prevent double-firing.
   */
  emit(ev, ...args) {
    const data = args[0];
    if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
      return false;
    } else if (ev === "data") {
      return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
    } else if (ev === "end") {
      return this[EMITEND]();
    } else if (ev === "close") {
      this[CLOSED] = true;
      if (!this[EMITTED_END] && !this[DESTROYED])
        return false;
      const ret2 = super.emit("close");
      this.removeAllListeners("close");
      return ret2;
    } else if (ev === "error") {
      this[EMITTED_ERROR] = data;
      super.emit(ERROR, data);
      const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "resume") {
      const ret2 = super.emit("resume");
      this[MAYBE_EMIT_END]();
      return ret2;
    } else if (ev === "finish" || ev === "prefinish") {
      const ret2 = super.emit(ev);
      this.removeAllListeners(ev);
      return ret2;
    }
    const ret = super.emit(ev, ...args);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITDATA](data) {
    for (const p of this[PIPES]) {
      if (p.dest.write(data) === false)
        this.pause();
    }
    const ret = this[DISCARDED] ? false : super.emit("data", data);
    this[MAYBE_EMIT_END]();
    return ret;
  }
  [EMITEND]() {
    if (this[EMITTED_END])
      return false;
    this[EMITTED_END] = true;
    this.readable = false;
    return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
  }
  [EMITEND2]() {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this[PIPES]) {
          p.dest.write(data);
        }
        if (!this[DISCARDED])
          super.emit("data", data);
      }
    }
    for (const p of this[PIPES]) {
      p.end();
    }
    const ret = super.emit("end");
    this.removeAllListeners("end");
    return ret;
  }
  /**
   * Return a Promise that resolves to an array of all emitted data once
   * the stream ends.
   */
  async collect() {
    const buf = Object.assign([], {
      dataLength: 0
    });
    if (!this[OBJECTMODE])
      buf.dataLength = 0;
    const p = this.promise();
    this.on("data", (c) => {
      buf.push(c);
      if (!this[OBJECTMODE])
        buf.dataLength += c.length;
    });
    await p;
    return buf;
  }
  /**
   * Return a Promise that resolves to the concatenation of all emitted data
   * once the stream ends.
   *
   * Not allowed on objectMode streams.
   */
  async concat() {
    if (this[OBJECTMODE]) {
      throw new Error("cannot concat in objectMode");
    }
    const buf = await this.collect();
    return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
  }
  /**
   * Return a void Promise that resolves once the stream ends.
   */
  async promise() {
    return new Promise((resolve6, reject) => {
      this.on(DESTROYED, () => reject(new Error("stream destroyed")));
      this.on("error", (er) => reject(er));
      this.on("end", () => resolve6());
    });
  }
  /**
   * Asynchronous `for await of` iteration.
   *
   * This will continue emitting all chunks until the stream terminates.
   */
  [Symbol.asyncIterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = async () => {
      this.pause();
      stopped = true;
      return { value: void 0, done: true };
    };
    const next = () => {
      if (stopped)
        return stop();
      const res = this.read();
      if (res !== null)
        return Promise.resolve({ done: false, value: res });
      if (this[EOF])
        return stop();
      let resolve6;
      let reject;
      const onerr = (er) => {
        this.off("data", ondata);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        stop();
        reject(er);
      };
      const ondata = (value) => {
        this.off("error", onerr);
        this.off("end", onend);
        this.off(DESTROYED, ondestroy);
        this.pause();
        resolve6({ value, done: !!this[EOF] });
      };
      const onend = () => {
        this.off("error", onerr);
        this.off("data", ondata);
        this.off(DESTROYED, ondestroy);
        stop();
        resolve6({ done: true, value: void 0 });
      };
      const ondestroy = () => onerr(new Error("stream destroyed"));
      return new Promise((res2, rej) => {
        reject = rej;
        resolve6 = res2;
        this.once(DESTROYED, ondestroy);
        this.once("error", onerr);
        this.once("end", onend);
        this.once("data", ondata);
      });
    };
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  /**
   * Synchronous `for of` iteration.
   *
   * The iteration will terminate when the internal buffer runs out, even
   * if the stream has not yet terminated.
   */
  [Symbol.iterator]() {
    this[DISCARDED] = false;
    let stopped = false;
    const stop = () => {
      this.pause();
      this.off(ERROR, stop);
      this.off(DESTROYED, stop);
      this.off("end", stop);
      stopped = true;
      return { done: true, value: void 0 };
    };
    const next = () => {
      if (stopped)
        return stop();
      const value = this.read();
      return value === null ? stop() : { done: false, value };
    };
    this.once("end", stop);
    this.once(ERROR, stop);
    this.once(DESTROYED, stop);
    return {
      next,
      throw: stop,
      return: stop,
      [Symbol.iterator]() {
        return this;
      }
    };
  }
  /**
   * Destroy a stream, preventing it from being used for any further purpose.
   *
   * If the stream has a `close()` method, then it will be called on
   * destruction.
   *
   * After destruction, any attempt to write data, read data, or emit most
   * events will be ignored.
   *
   * If an error argument is provided, then it will be emitted in an
   * 'error' event.
   */
  destroy(er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    this[DESTROYED] = true;
    this[DISCARDED] = true;
    this[BUFFER].length = 0;
    this[BUFFERLENGTH] = 0;
    const wc = this;
    if (typeof wc.close === "function" && !this[CLOSED])
      wc.close();
    if (er)
      this.emit("error", er);
    else
      this.emit(DESTROYED);
    return this;
  }
  /**
   * Alias for {@link isStream}
   *
   * Former export location, maintained for backwards compatibility.
   *
   * @deprecated
   */
  static get isStream() {
    return isStream;
  }
};

// node_modules/.pnpm/@isaacs+fs-minipass@4.0.1/node_modules/@isaacs/fs-minipass/dist/esm/index.js
var writev = import_fs5.default.writev;
var _autoClose = Symbol("_autoClose");
var _close = Symbol("_close");
var _ended = Symbol("_ended");
var _fd = Symbol("_fd");
var _finished = Symbol("_finished");
var _flags = Symbol("_flags");
var _flush = Symbol("_flush");
var _handleChunk = Symbol("_handleChunk");
var _makeBuf = Symbol("_makeBuf");
var _mode = Symbol("_mode");
var _needDrain = Symbol("_needDrain");
var _onerror = Symbol("_onerror");
var _onopen = Symbol("_onopen");
var _onread = Symbol("_onread");
var _onwrite = Symbol("_onwrite");
var _open = Symbol("_open");
var _path = Symbol("_path");
var _pos = Symbol("_pos");
var _queue = Symbol("_queue");
var _read = Symbol("_read");
var _readSize = Symbol("_readSize");
var _reading = Symbol("_reading");
var _remain = Symbol("_remain");
var _size = Symbol("_size");
var _write = Symbol("_write");
var _writing = Symbol("_writing");
var _defaultFlag = Symbol("_defaultFlag");
var _errored = Symbol("_errored");
var ReadStream = class extends Minipass {
  [_errored] = false;
  [_fd];
  [_path];
  [_readSize];
  [_reading] = false;
  [_size];
  [_remain];
  [_autoClose];
  constructor(path9, opt) {
    opt = opt || {};
    super(opt);
    this.readable = true;
    this.writable = false;
    if (typeof path9 !== "string") {
      throw new TypeError("path must be a string");
    }
    this[_errored] = false;
    this[_fd] = typeof opt.fd === "number" ? opt.fd : void 0;
    this[_path] = path9;
    this[_readSize] = opt.readSize || 16 * 1024 * 1024;
    this[_reading] = false;
    this[_size] = typeof opt.size === "number" ? opt.size : Infinity;
    this[_remain] = this[_size];
    this[_autoClose] = typeof opt.autoClose === "boolean" ? opt.autoClose : true;
    if (typeof this[_fd] === "number") {
      this[_read]();
    } else {
      this[_open]();
    }
  }
  get fd() {
    return this[_fd];
  }
  get path() {
    return this[_path];
  }
  //@ts-ignore
  write() {
    throw new TypeError("this is a readable stream");
  }
  //@ts-ignore
  end() {
    throw new TypeError("this is a readable stream");
  }
  [_open]() {
    import_fs5.default.open(this[_path], "r", (er, fd) => this[_onopen](er, fd));
  }
  [_onopen](er, fd) {
    if (er) {
      this[_onerror](er);
    } else {
      this[_fd] = fd;
      this.emit("open", fd);
      this[_read]();
    }
  }
  [_makeBuf]() {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]));
  }
  [_read]() {
    if (!this[_reading]) {
      this[_reading] = true;
      const buf = this[_makeBuf]();
      if (buf.length === 0) {
        return process.nextTick(() => this[_onread](null, 0, buf));
      }
      import_fs5.default.read(this[_fd], buf, 0, buf.length, null, (er, br, b) => this[_onread](er, br, b));
    }
  }
  [_onread](er, br, buf) {
    this[_reading] = false;
    if (er) {
      this[_onerror](er);
    } else if (this[_handleChunk](br, buf)) {
      this[_read]();
    }
  }
  [_close]() {
    if (this[_autoClose] && typeof this[_fd] === "number") {
      const fd = this[_fd];
      this[_fd] = void 0;
      import_fs5.default.close(fd, (er) => er ? this.emit("error", er) : this.emit("close"));
    }
  }
  [_onerror](er) {
    this[_reading] = true;
    this[_close]();
    this.emit("error", er);
  }
  [_handleChunk](br, buf) {
    let ret = false;
    this[_remain] -= br;
    if (br > 0) {
      ret = super.write(br < buf.length ? buf.subarray(0, br) : buf);
    }
    if (br === 0 || this[_remain] <= 0) {
      ret = false;
      this[_close]();
      super.end();
    }
    return ret;
  }
  emit(ev, ...args) {
    switch (ev) {
      case "prefinish":
      case "finish":
        return false;
      case "drain":
        if (typeof this[_fd] === "number") {
          this[_read]();
        }
        return false;
      case "error":
        if (this[_errored]) {
          return false;
        }
        this[_errored] = true;
        return super.emit(ev, ...args);
      default:
        return super.emit(ev, ...args);
    }
  }
};
var ReadStreamSync = class extends ReadStream {
  [_open]() {
    let threw = true;
    try {
      this[_onopen](null, import_fs5.default.openSync(this[_path], "r"));
      threw = false;
    } finally {
      if (threw) {
        this[_close]();
      }
    }
  }
  [_read]() {
    let threw = true;
    try {
      if (!this[_reading]) {
        this[_reading] = true;
        do {
          const buf = this[_makeBuf]();
          const br = buf.length === 0 ? 0 : import_fs5.default.readSync(this[_fd], buf, 0, buf.length, null);
          if (!this[_handleChunk](br, buf)) {
            break;
          }
        } while (true);
        this[_reading] = false;
      }
      threw = false;
    } finally {
      if (threw) {
        this[_close]();
      }
    }
  }
  [_close]() {
    if (this[_autoClose] && typeof this[_fd] === "number") {
      const fd = this[_fd];
      this[_fd] = void 0;
      import_fs5.default.closeSync(fd);
      this.emit("close");
    }
  }
};
var WriteStream = class extends import_events.default {
  readable = false;
  writable = true;
  [_errored] = false;
  [_writing] = false;
  [_ended] = false;
  [_queue] = [];
  [_needDrain] = false;
  [_path];
  [_mode];
  [_autoClose];
  [_fd];
  [_defaultFlag];
  [_flags];
  [_finished] = false;
  [_pos];
  constructor(path9, opt) {
    opt = opt || {};
    super(opt);
    this[_path] = path9;
    this[_fd] = typeof opt.fd === "number" ? opt.fd : void 0;
    this[_mode] = opt.mode === void 0 ? 438 : opt.mode;
    this[_pos] = typeof opt.start === "number" ? opt.start : void 0;
    this[_autoClose] = typeof opt.autoClose === "boolean" ? opt.autoClose : true;
    const defaultFlag = this[_pos] !== void 0 ? "r+" : "w";
    this[_defaultFlag] = opt.flags === void 0;
    this[_flags] = opt.flags === void 0 ? defaultFlag : opt.flags;
    if (this[_fd] === void 0) {
      this[_open]();
    }
  }
  emit(ev, ...args) {
    if (ev === "error") {
      if (this[_errored]) {
        return false;
      }
      this[_errored] = true;
    }
    return super.emit(ev, ...args);
  }
  get fd() {
    return this[_fd];
  }
  get path() {
    return this[_path];
  }
  [_onerror](er) {
    this[_close]();
    this[_writing] = true;
    this.emit("error", er);
  }
  [_open]() {
    import_fs5.default.open(this[_path], this[_flags], this[_mode], (er, fd) => this[_onopen](er, fd));
  }
  [_onopen](er, fd) {
    if (this[_defaultFlag] && this[_flags] === "r+" && er && er.code === "ENOENT") {
      this[_flags] = "w";
      this[_open]();
    } else if (er) {
      this[_onerror](er);
    } else {
      this[_fd] = fd;
      this.emit("open", fd);
      if (!this[_writing]) {
        this[_flush]();
      }
    }
  }
  end(buf, enc) {
    if (buf) {
      this.write(buf, enc);
    }
    this[_ended] = true;
    if (!this[_writing] && !this[_queue].length && typeof this[_fd] === "number") {
      this[_onwrite](null, 0);
    }
    return this;
  }
  write(buf, enc) {
    if (typeof buf === "string") {
      buf = Buffer.from(buf, enc);
    }
    if (this[_ended]) {
      this.emit("error", new Error("write() after end()"));
      return false;
    }
    if (this[_fd] === void 0 || this[_writing] || this[_queue].length) {
      this[_queue].push(buf);
      this[_needDrain] = true;
      return false;
    }
    this[_writing] = true;
    this[_write](buf);
    return true;
  }
  [_write](buf) {
    import_fs5.default.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) => this[_onwrite](er, bw));
  }
  [_onwrite](er, bw) {
    if (er) {
      this[_onerror](er);
    } else {
      if (this[_pos] !== void 0 && typeof bw === "number") {
        this[_pos] += bw;
      }
      if (this[_queue].length) {
        this[_flush]();
      } else {
        this[_writing] = false;
        if (this[_ended] && !this[_finished]) {
          this[_finished] = true;
          this[_close]();
          this.emit("finish");
        } else if (this[_needDrain]) {
          this[_needDrain] = false;
          this.emit("drain");
        }
      }
    }
  }
  [_flush]() {
    if (this[_queue].length === 0) {
      if (this[_ended]) {
        this[_onwrite](null, 0);
      }
    } else if (this[_queue].length === 1) {
      this[_write](this[_queue].pop());
    } else {
      const iovec = this[_queue];
      this[_queue] = [];
      writev(this[_fd], iovec, this[_pos], (er, bw) => this[_onwrite](er, bw));
    }
  }
  [_close]() {
    if (this[_autoClose] && typeof this[_fd] === "number") {
      const fd = this[_fd];
      this[_fd] = void 0;
      import_fs5.default.close(fd, (er) => er ? this.emit("error", er) : this.emit("close"));
    }
  }
};
var WriteStreamSync = class extends WriteStream {
  [_open]() {
    let fd;
    if (this[_defaultFlag] && this[_flags] === "r+") {
      try {
        fd = import_fs5.default.openSync(this[_path], this[_flags], this[_mode]);
      } catch (er) {
        if (er?.code === "ENOENT") {
          this[_flags] = "w";
          return this[_open]();
        } else {
          throw er;
        }
      }
    } else {
      fd = import_fs5.default.openSync(this[_path], this[_flags], this[_mode]);
    }
    this[_onopen](null, fd);
  }
  [_close]() {
    if (this[_autoClose] && typeof this[_fd] === "number") {
      const fd = this[_fd];
      this[_fd] = void 0;
      import_fs5.default.closeSync(fd);
      this.emit("close");
    }
  }
  [_write](buf) {
    let threw = true;
    try {
      this[_onwrite](null, import_fs5.default.writeSync(this[_fd], buf, 0, buf.length, this[_pos]));
      threw = false;
    } finally {
      if (threw) {
        try {
          this[_close]();
        } catch {
        }
      }
    }
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/create.js
var import_node_path4 = __toESM(require("node:path"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/list.js
var import_node_fs = __toESM(require("node:fs"), 1);
var import_path5 = require("path");

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/options.js
var argmap = /* @__PURE__ */ new Map([
  ["C", "cwd"],
  ["f", "file"],
  ["z", "gzip"],
  ["P", "preservePaths"],
  ["U", "unlink"],
  ["strip-components", "strip"],
  ["stripComponents", "strip"],
  ["keep-newer", "newer"],
  ["keepNewer", "newer"],
  ["keep-newer-files", "newer"],
  ["keepNewerFiles", "newer"],
  ["k", "keep"],
  ["keep-existing", "keep"],
  ["keepExisting", "keep"],
  ["m", "noMtime"],
  ["no-mtime", "noMtime"],
  ["p", "preserveOwner"],
  ["L", "follow"],
  ["h", "follow"],
  ["onentry", "onReadEntry"]
]);
var isSyncFile = (o) => !!o.sync && !!o.file;
var isAsyncFile = (o) => !o.sync && !!o.file;
var isSyncNoFile = (o) => !!o.sync && !o.file;
var isAsyncNoFile = (o) => !o.sync && !o.file;
var isFile = (o) => !!o.file;
var dealiasKey = (k) => {
  const d = argmap.get(k);
  if (d)
    return d;
  return k;
};
var dealias = (opt = {}) => {
  if (!opt)
    return {};
  const result = {};
  for (const [key, v] of Object.entries(opt)) {
    const k = dealiasKey(key);
    result[k] = v;
  }
  if (result.chmod === void 0 && result.noChmod === false) {
    result.chmod = true;
  }
  delete result.noChmod;
  return result;
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/make-command.js
var makeCommand = (syncFile, asyncFile, syncNoFile, asyncNoFile, validate) => {
  return Object.assign((opt_ = [], entries, cb) => {
    if (Array.isArray(opt_)) {
      entries = opt_;
      opt_ = {};
    }
    if (typeof entries === "function") {
      cb = entries;
      entries = void 0;
    }
    if (!entries) {
      entries = [];
    } else {
      entries = Array.from(entries);
    }
    const opt = dealias(opt_);
    validate?.(opt, entries);
    if (isSyncFile(opt)) {
      if (typeof cb === "function") {
        throw new TypeError("callback not supported for sync tar functions");
      }
      return syncFile(opt, entries);
    } else if (isAsyncFile(opt)) {
      const p = asyncFile(opt, entries);
      const c = cb ? cb : void 0;
      return c ? p.then(() => c(), c) : p;
    } else if (isSyncNoFile(opt)) {
      if (typeof cb === "function") {
        throw new TypeError("callback not supported for sync tar functions");
      }
      return syncNoFile(opt, entries);
    } else if (isAsyncNoFile(opt)) {
      if (typeof cb === "function") {
        throw new TypeError("callback only supported with file option");
      }
      return asyncNoFile(opt, entries);
    } else {
      throw new Error("impossible options??");
    }
  }, {
    syncFile,
    asyncFile,
    syncNoFile,
    asyncNoFile,
    validate
  });
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/parse.js
var import_events2 = require("events");

// node_modules/.pnpm/minizlib@3.0.1/node_modules/minizlib/dist/esm/index.js
var import_assert2 = __toESM(require("assert"), 1);
var import_buffer = require("buffer");
var import_zlib2 = __toESM(require("zlib"), 1);

// node_modules/.pnpm/minizlib@3.0.1/node_modules/minizlib/dist/esm/constants.js
var import_zlib = __toESM(require("zlib"), 1);
var realZlibConstants = import_zlib.default.constants || { ZLIB_VERNUM: 4736 };
var constants = Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31
}, realZlibConstants));

// node_modules/.pnpm/minizlib@3.0.1/node_modules/minizlib/dist/esm/index.js
var OriginalBufferConcat = import_buffer.Buffer.concat;
var _superWrite = Symbol("_superWrite");
var ZlibError = class extends Error {
  code;
  errno;
  constructor(err) {
    super("zlib: " + err.message);
    this.code = err.code;
    this.errno = err.errno;
    if (!this.code)
      this.code = "ZLIB_ERROR";
    this.message = "zlib: " + err.message;
    Error.captureStackTrace(this, this.constructor);
  }
  get name() {
    return "ZlibError";
  }
};
var _flushFlag = Symbol("flushFlag");
var ZlibBase = class extends Minipass {
  #sawError = false;
  #ended = false;
  #flushFlag;
  #finishFlushFlag;
  #fullFlushFlag;
  #handle;
  #onError;
  get sawError() {
    return this.#sawError;
  }
  get handle() {
    return this.#handle;
  }
  /* c8 ignore start */
  get flushFlag() {
    return this.#flushFlag;
  }
  /* c8 ignore stop */
  constructor(opts, mode) {
    if (!opts || typeof opts !== "object")
      throw new TypeError("invalid options for ZlibBase constructor");
    super(opts);
    this.#flushFlag = opts.flush ?? 0;
    this.#finishFlushFlag = opts.finishFlush ?? 0;
    this.#fullFlushFlag = opts.fullFlushFlag ?? 0;
    try {
      this.#handle = new import_zlib2.default[mode](opts);
    } catch (er) {
      throw new ZlibError(er);
    }
    this.#onError = (err) => {
      if (this.#sawError)
        return;
      this.#sawError = true;
      this.close();
      this.emit("error", err);
    };
    this.#handle?.on("error", (er) => this.#onError(new ZlibError(er)));
    this.once("end", () => this.close);
  }
  close() {
    if (this.#handle) {
      this.#handle.close();
      this.#handle = void 0;
      this.emit("close");
    }
  }
  reset() {
    if (!this.#sawError) {
      (0, import_assert2.default)(this.#handle, "zlib binding closed");
      return this.#handle.reset?.();
    }
  }
  flush(flushFlag) {
    if (this.ended)
      return;
    if (typeof flushFlag !== "number")
      flushFlag = this.#fullFlushFlag;
    this.write(Object.assign(import_buffer.Buffer.alloc(0), { [_flushFlag]: flushFlag }));
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      encoding = void 0;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (chunk) {
      if (encoding)
        this.write(chunk, encoding);
      else
        this.write(chunk);
    }
    this.flush(this.#finishFlushFlag);
    this.#ended = true;
    return super.end(cb);
  }
  get ended() {
    return this.#ended;
  }
  // overridden in the gzip classes to do portable writes
  [_superWrite](data) {
    return super.write(data);
  }
  write(chunk, encoding, cb) {
    if (typeof encoding === "function")
      cb = encoding, encoding = "utf8";
    if (typeof chunk === "string")
      chunk = import_buffer.Buffer.from(chunk, encoding);
    if (this.#sawError)
      return;
    (0, import_assert2.default)(this.#handle, "zlib binding closed");
    const nativeHandle = this.#handle._handle;
    const originalNativeClose = nativeHandle.close;
    nativeHandle.close = () => {
    };
    const originalClose = this.#handle.close;
    this.#handle.close = () => {
    };
    import_buffer.Buffer.concat = (args) => args;
    let result = void 0;
    try {
      const flushFlag = typeof chunk[_flushFlag] === "number" ? chunk[_flushFlag] : this.#flushFlag;
      result = this.#handle._processChunk(chunk, flushFlag);
      import_buffer.Buffer.concat = OriginalBufferConcat;
    } catch (err) {
      import_buffer.Buffer.concat = OriginalBufferConcat;
      this.#onError(new ZlibError(err));
    } finally {
      if (this.#handle) {
        ;
        this.#handle._handle = nativeHandle;
        nativeHandle.close = originalNativeClose;
        this.#handle.close = originalClose;
        this.#handle.removeAllListeners("error");
      }
    }
    if (this.#handle)
      this.#handle.on("error", (er) => this.#onError(new ZlibError(er)));
    let writeReturn;
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        const r = result[0];
        writeReturn = this[_superWrite](import_buffer.Buffer.from(r));
        for (let i = 1; i < result.length; i++) {
          writeReturn = this[_superWrite](result[i]);
        }
      } else {
        writeReturn = this[_superWrite](import_buffer.Buffer.from(result));
      }
    }
    if (cb)
      cb();
    return writeReturn;
  }
};
var Zlib = class extends ZlibBase {
  #level;
  #strategy;
  constructor(opts, mode) {
    opts = opts || {};
    opts.flush = opts.flush || constants.Z_NO_FLUSH;
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH;
    opts.fullFlushFlag = constants.Z_FULL_FLUSH;
    super(opts, mode);
    this.#level = opts.level;
    this.#strategy = opts.strategy;
  }
  params(level, strategy) {
    if (this.sawError)
      return;
    if (!this.handle)
      throw new Error("cannot switch params when binding is closed");
    if (!this.handle.params)
      throw new Error("not supported in this implementation");
    if (this.#level !== level || this.#strategy !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH);
      (0, import_assert2.default)(this.handle, "zlib binding closed");
      const origFlush = this.handle.flush;
      this.handle.flush = (flushFlag, cb) => {
        if (typeof flushFlag === "function") {
          cb = flushFlag;
          flushFlag = this.flushFlag;
        }
        this.flush(flushFlag);
        cb?.();
      };
      try {
        ;
        this.handle.params(level, strategy);
      } finally {
        this.handle.flush = origFlush;
      }
      if (this.handle) {
        this.#level = level;
        this.#strategy = strategy;
      }
    }
  }
};
var Gzip = class extends Zlib {
  #portable;
  constructor(opts) {
    super(opts, "Gzip");
    this.#portable = opts && !!opts.portable;
  }
  [_superWrite](data) {
    if (!this.#portable)
      return super[_superWrite](data);
    this.#portable = false;
    data[9] = 255;
    return super[_superWrite](data);
  }
};
var Unzip = class extends Zlib {
  constructor(opts) {
    super(opts, "Unzip");
  }
};
var Brotli = class extends ZlibBase {
  constructor(opts, mode) {
    opts = opts || {};
    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS;
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH;
    opts.fullFlushFlag = constants.BROTLI_OPERATION_FLUSH;
    super(opts, mode);
  }
};
var BrotliCompress = class extends Brotli {
  constructor(opts) {
    super(opts, "BrotliCompress");
  }
};
var BrotliDecompress = class extends Brotli {
  constructor(opts) {
    super(opts, "BrotliDecompress");
  }
};

// node_modules/.pnpm/yallist@5.0.0/node_modules/yallist/dist/esm/index.js
var Yallist = class _Yallist {
  tail;
  head;
  length = 0;
  static create(list2 = []) {
    return new _Yallist(list2);
  }
  constructor(list2 = []) {
    for (const item of list2) {
      this.push(item);
    }
  }
  *[Symbol.iterator]() {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  }
  removeNode(node) {
    if (node.list !== this) {
      throw new Error("removing node which does not belong to this list");
    }
    const next = node.next;
    const prev = node.prev;
    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }
    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }
    this.length--;
    node.next = void 0;
    node.prev = void 0;
    node.list = void 0;
    return next;
  }
  unshiftNode(node) {
    if (node === this.head) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    const head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  }
  pushNode(node) {
    if (node === this.tail) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    const tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  }
  push(...args) {
    for (let i = 0, l = args.length; i < l; i++) {
      push(this, args[i]);
    }
    return this.length;
  }
  unshift(...args) {
    for (var i = 0, l = args.length; i < l; i++) {
      unshift(this, args[i]);
    }
    return this.length;
  }
  pop() {
    if (!this.tail) {
      return void 0;
    }
    const res = this.tail.value;
    const t = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = void 0;
    } else {
      this.head = void 0;
    }
    t.list = void 0;
    this.length--;
    return res;
  }
  shift() {
    if (!this.head) {
      return void 0;
    }
    const res = this.head.value;
    const h = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = void 0;
    } else {
      this.tail = void 0;
    }
    h.list = void 0;
    this.length--;
    return res;
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this.head, i = 0; !!walker; i++) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.next;
    }
  }
  forEachReverse(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this.tail, i = this.length - 1; !!walker; i--) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.prev;
    }
  }
  get(n) {
    let i = 0;
    let walker = this.head;
    for (; !!walker && i < n; i++) {
      walker = walker.next;
    }
    if (i === n && !!walker) {
      return walker.value;
    }
  }
  getReverse(n) {
    let i = 0;
    let walker = this.tail;
    for (; !!walker && i < n; i++) {
      walker = walker.prev;
    }
    if (i === n && !!walker) {
      return walker.value;
    }
  }
  map(fn, thisp) {
    thisp = thisp || this;
    const res = new _Yallist();
    for (let walker = this.head; !!walker; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.next;
    }
    return res;
  }
  mapReverse(fn, thisp) {
    thisp = thisp || this;
    var res = new _Yallist();
    for (let walker = this.tail; !!walker; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.prev;
    }
    return res;
  }
  reduce(fn, initial) {
    let acc;
    let walker = this.head;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.head) {
      walker = this.head.next;
      acc = this.head.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (var i = 0; !!walker; i++) {
      acc = fn(acc, walker.value, i);
      walker = walker.next;
    }
    return acc;
  }
  reduceReverse(fn, initial) {
    let acc;
    let walker = this.tail;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.tail) {
      walker = this.tail.prev;
      acc = this.tail.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (let i = this.length - 1; !!walker; i--) {
      acc = fn(acc, walker.value, i);
      walker = walker.prev;
    }
    return acc;
  }
  toArray() {
    const arr = new Array(this.length);
    for (let i = 0, walker = this.head; !!walker; i++) {
      arr[i] = walker.value;
      walker = walker.next;
    }
    return arr;
  }
  toArrayReverse() {
    const arr = new Array(this.length);
    for (let i = 0, walker = this.tail; !!walker; i++) {
      arr[i] = walker.value;
      walker = walker.prev;
    }
    return arr;
  }
  slice(from = 0, to = this.length) {
    if (to < 0) {
      to += this.length;
    }
    if (from < 0) {
      from += this.length;
    }
    const ret = new _Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    let walker = this.head;
    let i = 0;
    for (i = 0; !!walker && i < from; i++) {
      walker = walker.next;
    }
    for (; !!walker && i < to; i++, walker = walker.next) {
      ret.push(walker.value);
    }
    return ret;
  }
  sliceReverse(from = 0, to = this.length) {
    if (to < 0) {
      to += this.length;
    }
    if (from < 0) {
      from += this.length;
    }
    const ret = new _Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    let i = this.length;
    let walker = this.tail;
    for (; !!walker && i > to; i--) {
      walker = walker.prev;
    }
    for (; !!walker && i > from; i--, walker = walker.prev) {
      ret.push(walker.value);
    }
    return ret;
  }
  splice(start, deleteCount = 0, ...nodes) {
    if (start > this.length) {
      start = this.length - 1;
    }
    if (start < 0) {
      start = this.length + start;
    }
    let walker = this.head;
    for (let i = 0; !!walker && i < start; i++) {
      walker = walker.next;
    }
    const ret = [];
    for (let i = 0; !!walker && i < deleteCount; i++) {
      ret.push(walker.value);
      walker = this.removeNode(walker);
    }
    if (!walker) {
      walker = this.tail;
    } else if (walker !== this.tail) {
      walker = walker.prev;
    }
    for (const v of nodes) {
      walker = insertAfter(this, walker, v);
    }
    return ret;
  }
  reverse() {
    const head = this.head;
    const tail = this.tail;
    for (let walker = head; !!walker; walker = walker.prev) {
      const p = walker.prev;
      walker.prev = walker.next;
      walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
  }
};
function insertAfter(self2, node, value) {
  const prev = node;
  const next = node ? node.next : self2.head;
  const inserted = new Node(value, prev, next, self2);
  if (inserted.next === void 0) {
    self2.tail = inserted;
  }
  if (inserted.prev === void 0) {
    self2.head = inserted;
  }
  self2.length++;
  return inserted;
}
function push(self2, item) {
  self2.tail = new Node(item, self2.tail, void 0, self2);
  if (!self2.head) {
    self2.head = self2.tail;
  }
  self2.length++;
}
function unshift(self2, item) {
  self2.head = new Node(item, void 0, self2.head, self2);
  if (!self2.tail) {
    self2.tail = self2.head;
  }
  self2.length++;
}
var Node = class {
  list;
  next;
  prev;
  value;
  constructor(value, prev, next, list2) {
    this.list = list2;
    this.value = value;
    if (prev) {
      prev.next = this;
      this.prev = prev;
    } else {
      this.prev = void 0;
    }
    if (next) {
      next.prev = this;
      this.next = next;
    } else {
      this.next = void 0;
    }
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/header.js
var import_node_path = require("node:path");

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/large-numbers.js
var encode = (num, buf) => {
  if (!Number.isSafeInteger(num)) {
    throw Error("cannot encode number outside of javascript safe integer range");
  } else if (num < 0) {
    encodeNegative(num, buf);
  } else {
    encodePositive(num, buf);
  }
  return buf;
};
var encodePositive = (num, buf) => {
  buf[0] = 128;
  for (var i = buf.length; i > 1; i--) {
    buf[i - 1] = num & 255;
    num = Math.floor(num / 256);
  }
};
var encodeNegative = (num, buf) => {
  buf[0] = 255;
  var flipped = false;
  num = num * -1;
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 255;
    num = Math.floor(num / 256);
    if (flipped) {
      buf[i - 1] = onesComp(byte);
    } else if (byte === 0) {
      buf[i - 1] = 0;
    } else {
      flipped = true;
      buf[i - 1] = twosComp(byte);
    }
  }
};
var parse = (buf) => {
  const pre = buf[0];
  const value = pre === 128 ? pos(buf.subarray(1, buf.length)) : pre === 255 ? twos(buf) : null;
  if (value === null) {
    throw Error("invalid base256 encoding");
  }
  if (!Number.isSafeInteger(value)) {
    throw Error("parsed number outside of javascript safe integer range");
  }
  return value;
};
var twos = (buf) => {
  var len = buf.length;
  var sum = 0;
  var flipped = false;
  for (var i = len - 1; i > -1; i--) {
    var byte = Number(buf[i]);
    var f;
    if (flipped) {
      f = onesComp(byte);
    } else if (byte === 0) {
      f = byte;
    } else {
      flipped = true;
      f = twosComp(byte);
    }
    if (f !== 0) {
      sum -= f * Math.pow(256, len - i - 1);
    }
  }
  return sum;
};
var pos = (buf) => {
  var len = buf.length;
  var sum = 0;
  for (var i = len - 1; i > -1; i--) {
    var byte = Number(buf[i]);
    if (byte !== 0) {
      sum += byte * Math.pow(256, len - i - 1);
    }
  }
  return sum;
};
var onesComp = (byte) => (255 ^ byte) & 255;
var twosComp = (byte) => (255 ^ byte) + 1 & 255;

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/types.js
var isCode = (c) => name.has(c);
var name = /* @__PURE__ */ new Map([
  ["0", "File"],
  // same as File
  ["", "OldFile"],
  ["1", "Link"],
  ["2", "SymbolicLink"],
  // Devices and FIFOs aren't fully supported
  // they are parsed, but skipped when unpacking
  ["3", "CharacterDevice"],
  ["4", "BlockDevice"],
  ["5", "Directory"],
  ["6", "FIFO"],
  // same as File
  ["7", "ContiguousFile"],
  // pax headers
  ["g", "GlobalExtendedHeader"],
  ["x", "ExtendedHeader"],
  // vendor-specific stuff
  // skip
  ["A", "SolarisACL"],
  // like 5, but with data, which should be skipped
  ["D", "GNUDumpDir"],
  // metadata only, skip
  ["I", "Inode"],
  // data = link path of next file
  ["K", "NextFileHasLongLinkpath"],
  // data = path of next file
  ["L", "NextFileHasLongPath"],
  // skip
  ["M", "ContinuationFile"],
  // like L
  ["N", "OldGnuLongPath"],
  // skip
  ["S", "SparseFile"],
  // skip
  ["V", "TapeVolumeHeader"],
  // like x
  ["X", "OldExtendedHeader"]
]);
var code = new Map(Array.from(name).map((kv) => [kv[1], kv[0]]));

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/header.js
var Header = class {
  cksumValid = false;
  needPax = false;
  nullBlock = false;
  block;
  path;
  mode;
  uid;
  gid;
  size;
  cksum;
  #type = "Unsupported";
  linkpath;
  uname;
  gname;
  devmaj = 0;
  devmin = 0;
  atime;
  ctime;
  mtime;
  charset;
  comment;
  constructor(data, off = 0, ex, gex) {
    if (Buffer.isBuffer(data)) {
      this.decode(data, off || 0, ex, gex);
    } else if (data) {
      this.#slurp(data);
    }
  }
  decode(buf, off, ex, gex) {
    if (!off) {
      off = 0;
    }
    if (!buf || !(buf.length >= off + 512)) {
      throw new Error("need 512 bytes for header");
    }
    this.path = decString(buf, off, 100);
    this.mode = decNumber(buf, off + 100, 8);
    this.uid = decNumber(buf, off + 108, 8);
    this.gid = decNumber(buf, off + 116, 8);
    this.size = decNumber(buf, off + 124, 12);
    this.mtime = decDate(buf, off + 136, 12);
    this.cksum = decNumber(buf, off + 148, 12);
    if (gex)
      this.#slurp(gex, true);
    if (ex)
      this.#slurp(ex);
    const t = decString(buf, off + 156, 1);
    if (isCode(t)) {
      this.#type = t || "0";
    }
    if (this.#type === "0" && this.path.slice(-1) === "/") {
      this.#type = "5";
    }
    if (this.#type === "5") {
      this.size = 0;
    }
    this.linkpath = decString(buf, off + 157, 100);
    if (buf.subarray(off + 257, off + 265).toString() === "ustar\x0000") {
      this.uname = decString(buf, off + 265, 32);
      this.gname = decString(buf, off + 297, 32);
      this.devmaj = decNumber(buf, off + 329, 8) ?? 0;
      this.devmin = decNumber(buf, off + 337, 8) ?? 0;
      if (buf[off + 475] !== 0) {
        const prefix = decString(buf, off + 345, 155);
        this.path = prefix + "/" + this.path;
      } else {
        const prefix = decString(buf, off + 345, 130);
        if (prefix) {
          this.path = prefix + "/" + this.path;
        }
        this.atime = decDate(buf, off + 476, 12);
        this.ctime = decDate(buf, off + 488, 12);
      }
    }
    let sum = 8 * 32;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }
    this.cksumValid = sum === this.cksum;
    if (this.cksum === void 0 && sum === 8 * 32) {
      this.nullBlock = true;
    }
  }
  #slurp(ex, gex = false) {
    Object.assign(this, Object.fromEntries(Object.entries(ex).filter(([k, v]) => {
      return !(v === null || v === void 0 || k === "path" && gex || k === "linkpath" && gex || k === "global");
    })));
  }
  encode(buf, off = 0) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512);
    }
    if (this.#type === "Unsupported") {
      this.#type = "0";
    }
    if (!(buf.length >= off + 512)) {
      throw new Error("need 512 bytes for header");
    }
    const prefixSize = this.ctime || this.atime ? 130 : 155;
    const split = splitPrefix(this.path || "", prefixSize);
    const path9 = split[0];
    const prefix = split[1];
    this.needPax = !!split[2];
    this.needPax = encString(buf, off, 100, path9) || this.needPax;
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax;
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax;
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax;
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax;
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax;
    buf[off + 156] = this.#type.charCodeAt(0);
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax;
    buf.write("ustar\x0000", off + 257, 8);
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax;
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax;
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax;
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax;
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax;
    if (buf[off + 475] !== 0) {
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax;
    } else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax;
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax;
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax;
    }
    let sum = 8 * 32;
    for (let i = off; i < off + 148; i++) {
      sum += buf[i];
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i];
    }
    this.cksum = sum;
    encNumber(buf, off + 148, 8, this.cksum);
    this.cksumValid = true;
    return this.needPax;
  }
  get type() {
    return this.#type === "Unsupported" ? this.#type : name.get(this.#type);
  }
  get typeKey() {
    return this.#type;
  }
  set type(type) {
    const c = String(code.get(type));
    if (isCode(c) || c === "Unsupported") {
      this.#type = c;
    } else if (isCode(type)) {
      this.#type = type;
    } else {
      throw new TypeError("invalid entry type: " + type);
    }
  }
};
var splitPrefix = (p, prefixSize) => {
  const pathSize = 100;
  let pp = p;
  let prefix = "";
  let ret = void 0;
  const root = import_node_path.posix.parse(p).root || ".";
  if (Buffer.byteLength(pp) < pathSize) {
    ret = [pp, prefix, false];
  } else {
    prefix = import_node_path.posix.dirname(pp);
    pp = import_node_path.posix.basename(pp);
    do {
      if (Buffer.byteLength(pp) <= pathSize && Buffer.byteLength(prefix) <= prefixSize) {
        ret = [pp, prefix, false];
      } else if (Buffer.byteLength(pp) > pathSize && Buffer.byteLength(prefix) <= prefixSize) {
        ret = [pp.slice(0, pathSize - 1), prefix, true];
      } else {
        pp = import_node_path.posix.join(import_node_path.posix.basename(prefix), pp);
        prefix = import_node_path.posix.dirname(prefix);
      }
    } while (prefix !== root && ret === void 0);
    if (!ret) {
      ret = [p.slice(0, pathSize - 1), "", true];
    }
  }
  return ret;
};
var decString = (buf, off, size) => buf.subarray(off, off + size).toString("utf8").replace(/\0.*/, "");
var decDate = (buf, off, size) => numToDate(decNumber(buf, off, size));
var numToDate = (num) => num === void 0 ? void 0 : new Date(num * 1e3);
var decNumber = (buf, off, size) => Number(buf[off]) & 128 ? parse(buf.subarray(off, off + size)) : decSmallNumber(buf, off, size);
var nanUndef = (value) => isNaN(value) ? void 0 : value;
var decSmallNumber = (buf, off, size) => nanUndef(parseInt(buf.subarray(off, off + size).toString("utf8").replace(/\0.*$/, "").trim(), 8));
var MAXNUM = {
  12: 8589934591,
  8: 2097151
};
var encNumber = (buf, off, size, num) => num === void 0 ? false : num > MAXNUM[size] || num < 0 ? (encode(num, buf.subarray(off, off + size)), true) : (encSmallNumber(buf, off, size, num), false);
var encSmallNumber = (buf, off, size, num) => buf.write(octalString(num, size), off, size, "ascii");
var octalString = (num, size) => padOctal(Math.floor(num).toString(8), size);
var padOctal = (str, size) => (str.length === size - 1 ? str : new Array(size - str.length - 1).join("0") + str + " ") + "\0";
var encDate = (buf, off, size, date) => date === void 0 ? false : encNumber(buf, off, size, date.getTime() / 1e3);
var NULLS = new Array(156).join("\0");
var encString = (buf, off, size, str) => str === void 0 ? false : (buf.write(str + NULLS, off, size, "utf8"), str.length !== Buffer.byteLength(str) || str.length > size);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/pax.js
var import_node_path2 = require("node:path");
var Pax = class _Pax {
  atime;
  mtime;
  ctime;
  charset;
  comment;
  gid;
  uid;
  gname;
  uname;
  linkpath;
  dev;
  ino;
  nlink;
  path;
  size;
  mode;
  global;
  constructor(obj, global2 = false) {
    this.atime = obj.atime;
    this.charset = obj.charset;
    this.comment = obj.comment;
    this.ctime = obj.ctime;
    this.dev = obj.dev;
    this.gid = obj.gid;
    this.global = global2;
    this.gname = obj.gname;
    this.ino = obj.ino;
    this.linkpath = obj.linkpath;
    this.mtime = obj.mtime;
    this.nlink = obj.nlink;
    this.path = obj.path;
    this.size = obj.size;
    this.uid = obj.uid;
    this.uname = obj.uname;
  }
  encode() {
    const body = this.encodeBody();
    if (body === "") {
      return Buffer.allocUnsafe(0);
    }
    const bodyLen = Buffer.byteLength(body);
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512);
    const buf = Buffer.allocUnsafe(bufLen);
    for (let i = 0; i < 512; i++) {
      buf[i] = 0;
    }
    new Header({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      /* c8 ignore start */
      path: ("PaxHeader/" + (0, import_node_path2.basename)(this.path ?? "")).slice(0, 99),
      /* c8 ignore stop */
      mode: this.mode || 420,
      uid: this.uid,
      gid: this.gid,
      size: bodyLen,
      mtime: this.mtime,
      type: this.global ? "GlobalExtendedHeader" : "ExtendedHeader",
      linkpath: "",
      uname: this.uname || "",
      gname: this.gname || "",
      devmaj: 0,
      devmin: 0,
      atime: this.atime,
      ctime: this.ctime
    }).encode(buf);
    buf.write(body, 512, bodyLen, "utf8");
    for (let i = bodyLen + 512; i < buf.length; i++) {
      buf[i] = 0;
    }
    return buf;
  }
  encodeBody() {
    return this.encodeField("path") + this.encodeField("ctime") + this.encodeField("atime") + this.encodeField("dev") + this.encodeField("ino") + this.encodeField("nlink") + this.encodeField("charset") + this.encodeField("comment") + this.encodeField("gid") + this.encodeField("gname") + this.encodeField("linkpath") + this.encodeField("mtime") + this.encodeField("size") + this.encodeField("uid") + this.encodeField("uname");
  }
  encodeField(field) {
    if (this[field] === void 0) {
      return "";
    }
    const r = this[field];
    const v = r instanceof Date ? r.getTime() / 1e3 : r;
    const s = " " + (field === "dev" || field === "ino" || field === "nlink" ? "SCHILY." : "") + field + "=" + v + "\n";
    const byteLen = Buffer.byteLength(s);
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1;
    if (byteLen + digits >= Math.pow(10, digits)) {
      digits += 1;
    }
    const len = digits + byteLen;
    return len + s;
  }
  static parse(str, ex, g = false) {
    return new _Pax(merge(parseKV(str), ex), g);
  }
};
var merge = (a, b) => b ? Object.assign({}, b, a) : a;
var parseKV = (str) => str.replace(/\n$/, "").split("\n").reduce(parseKVLine, /* @__PURE__ */ Object.create(null));
var parseKVLine = (set, line) => {
  const n = parseInt(line, 10);
  if (n !== Buffer.byteLength(line) + 1) {
    return set;
  }
  line = line.slice((n + " ").length);
  const kv = line.split("=");
  const r = kv.shift();
  if (!r) {
    return set;
  }
  const k = r.replace(/^SCHILY\.(dev|ino|nlink)/, "$1");
  const v = kv.join("=");
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k) ? new Date(Number(v) * 1e3) : /^[0-9]+$/.test(v) ? +v : v;
  return set;
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/normalize-windows-path.js
var platform = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
var normalizeWindowsPath = platform !== "win32" ? (p) => p : (p) => p && p.replace(/\\/g, "/");

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/read-entry.js
var ReadEntry = class extends Minipass {
  extended;
  globalExtended;
  header;
  startBlockSize;
  blockRemain;
  remain;
  type;
  meta = false;
  ignore = false;
  path;
  mode;
  uid;
  gid;
  uname;
  gname;
  size = 0;
  mtime;
  atime;
  ctime;
  linkpath;
  dev;
  ino;
  nlink;
  invalid = false;
  absolute;
  unsupported = false;
  constructor(header, ex, gex) {
    super({});
    this.pause();
    this.extended = ex;
    this.globalExtended = gex;
    this.header = header;
    this.remain = header.size ?? 0;
    this.startBlockSize = 512 * Math.ceil(this.remain / 512);
    this.blockRemain = this.startBlockSize;
    this.type = header.type;
    switch (this.type) {
      case "File":
      case "OldFile":
      case "Link":
      case "SymbolicLink":
      case "CharacterDevice":
      case "BlockDevice":
      case "Directory":
      case "FIFO":
      case "ContiguousFile":
      case "GNUDumpDir":
        break;
      case "NextFileHasLongLinkpath":
      case "NextFileHasLongPath":
      case "OldGnuLongPath":
      case "GlobalExtendedHeader":
      case "ExtendedHeader":
      case "OldExtendedHeader":
        this.meta = true;
        break;
      default:
        this.ignore = true;
    }
    if (!header.path) {
      throw new Error("no path provided for tar.ReadEntry");
    }
    this.path = normalizeWindowsPath(header.path);
    this.mode = header.mode;
    if (this.mode) {
      this.mode = this.mode & 4095;
    }
    this.uid = header.uid;
    this.gid = header.gid;
    this.uname = header.uname;
    this.gname = header.gname;
    this.size = this.remain;
    this.mtime = header.mtime;
    this.atime = header.atime;
    this.ctime = header.ctime;
    this.linkpath = header.linkpath ? normalizeWindowsPath(header.linkpath) : void 0;
    this.uname = header.uname;
    this.gname = header.gname;
    if (ex) {
      this.#slurp(ex);
    }
    if (gex) {
      this.#slurp(gex, true);
    }
  }
  write(data) {
    const writeLen = data.length;
    if (writeLen > this.blockRemain) {
      throw new Error("writing more to entry than is appropriate");
    }
    const r = this.remain;
    const br = this.blockRemain;
    this.remain = Math.max(0, r - writeLen);
    this.blockRemain = Math.max(0, br - writeLen);
    if (this.ignore) {
      return true;
    }
    if (r >= writeLen) {
      return super.write(data);
    }
    return super.write(data.subarray(0, r));
  }
  #slurp(ex, gex = false) {
    if (ex.path)
      ex.path = normalizeWindowsPath(ex.path);
    if (ex.linkpath)
      ex.linkpath = normalizeWindowsPath(ex.linkpath);
    Object.assign(this, Object.fromEntries(Object.entries(ex).filter(([k, v]) => {
      return !(v === null || v === void 0 || k === "path" && gex);
    })));
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/warn-method.js
var warnMethod = (self2, code2, message, data = {}) => {
  if (self2.file) {
    data.file = self2.file;
  }
  if (self2.cwd) {
    data.cwd = self2.cwd;
  }
  data.code = message instanceof Error && message.code || code2;
  data.tarCode = code2;
  if (!self2.strict && data.recoverable !== false) {
    if (message instanceof Error) {
      data = Object.assign(message, data);
      message = message.message;
    }
    self2.emit("warn", code2, message, data);
  } else if (message instanceof Error) {
    self2.emit("error", Object.assign(message, data));
  } else {
    self2.emit("error", Object.assign(new Error(`${code2}: ${message}`), data));
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/parse.js
var maxMetaEntrySize = 1024 * 1024;
var gzipHeader = Buffer.from([31, 139]);
var STATE = Symbol("state");
var WRITEENTRY = Symbol("writeEntry");
var READENTRY = Symbol("readEntry");
var NEXTENTRY = Symbol("nextEntry");
var PROCESSENTRY = Symbol("processEntry");
var EX = Symbol("extendedHeader");
var GEX = Symbol("globalExtendedHeader");
var META = Symbol("meta");
var EMITMETA = Symbol("emitMeta");
var BUFFER2 = Symbol("buffer");
var QUEUE = Symbol("queue");
var ENDED = Symbol("ended");
var EMITTEDEND = Symbol("emittedEnd");
var EMIT = Symbol("emit");
var UNZIP = Symbol("unzip");
var CONSUMECHUNK = Symbol("consumeChunk");
var CONSUMECHUNKSUB = Symbol("consumeChunkSub");
var CONSUMEBODY = Symbol("consumeBody");
var CONSUMEMETA = Symbol("consumeMeta");
var CONSUMEHEADER = Symbol("consumeHeader");
var CONSUMING = Symbol("consuming");
var BUFFERCONCAT = Symbol("bufferConcat");
var MAYBEEND = Symbol("maybeEnd");
var WRITING = Symbol("writing");
var ABORTED2 = Symbol("aborted");
var DONE = Symbol("onDone");
var SAW_VALID_ENTRY = Symbol("sawValidEntry");
var SAW_NULL_BLOCK = Symbol("sawNullBlock");
var SAW_EOF = Symbol("sawEOF");
var CLOSESTREAM = Symbol("closeStream");
var noop = () => true;
var Parser3 = class extends import_events2.EventEmitter {
  file;
  strict;
  maxMetaEntrySize;
  filter;
  brotli;
  writable = true;
  readable = false;
  [QUEUE] = new Yallist();
  [BUFFER2];
  [READENTRY];
  [WRITEENTRY];
  [STATE] = "begin";
  [META] = "";
  [EX];
  [GEX];
  [ENDED] = false;
  [UNZIP];
  [ABORTED2] = false;
  [SAW_VALID_ENTRY];
  [SAW_NULL_BLOCK] = false;
  [SAW_EOF] = false;
  [WRITING] = false;
  [CONSUMING] = false;
  [EMITTEDEND] = false;
  constructor(opt = {}) {
    super();
    this.file = opt.file || "";
    this.on(DONE, () => {
      if (this[STATE] === "begin" || this[SAW_VALID_ENTRY] === false) {
        this.warn("TAR_BAD_ARCHIVE", "Unrecognized archive format");
      }
    });
    if (opt.ondone) {
      this.on(DONE, opt.ondone);
    } else {
      this.on(DONE, () => {
        this.emit("prefinish");
        this.emit("finish");
        this.emit("end");
      });
    }
    this.strict = !!opt.strict;
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize;
    this.filter = typeof opt.filter === "function" ? opt.filter : noop;
    const isTBR = opt.file && (opt.file.endsWith(".tar.br") || opt.file.endsWith(".tbr"));
    this.brotli = !opt.gzip && opt.brotli !== void 0 ? opt.brotli : isTBR ? void 0 : false;
    this.on("end", () => this[CLOSESTREAM]());
    if (typeof opt.onwarn === "function") {
      this.on("warn", opt.onwarn);
    }
    if (typeof opt.onReadEntry === "function") {
      this.on("entry", opt.onReadEntry);
    }
  }
  warn(code2, message, data = {}) {
    warnMethod(this, code2, message, data);
  }
  [CONSUMEHEADER](chunk, position) {
    if (this[SAW_VALID_ENTRY] === void 0) {
      this[SAW_VALID_ENTRY] = false;
    }
    let header;
    try {
      header = new Header(chunk, position, this[EX], this[GEX]);
    } catch (er) {
      return this.warn("TAR_ENTRY_INVALID", er);
    }
    if (header.nullBlock) {
      if (this[SAW_NULL_BLOCK]) {
        this[SAW_EOF] = true;
        if (this[STATE] === "begin") {
          this[STATE] = "header";
        }
        this[EMIT]("eof");
      } else {
        this[SAW_NULL_BLOCK] = true;
        this[EMIT]("nullBlock");
      }
    } else {
      this[SAW_NULL_BLOCK] = false;
      if (!header.cksumValid) {
        this.warn("TAR_ENTRY_INVALID", "checksum failure", { header });
      } else if (!header.path) {
        this.warn("TAR_ENTRY_INVALID", "path is required", { header });
      } else {
        const type = header.type;
        if (/^(Symbolic)?Link$/.test(type) && !header.linkpath) {
          this.warn("TAR_ENTRY_INVALID", "linkpath required", {
            header
          });
        } else if (!/^(Symbolic)?Link$/.test(type) && !/^(Global)?ExtendedHeader$/.test(type) && header.linkpath) {
          this.warn("TAR_ENTRY_INVALID", "linkpath forbidden", {
            header
          });
        } else {
          const entry = this[WRITEENTRY] = new ReadEntry(header, this[EX], this[GEX]);
          if (!this[SAW_VALID_ENTRY]) {
            if (entry.remain) {
              const onend = () => {
                if (!entry.invalid) {
                  this[SAW_VALID_ENTRY] = true;
                }
              };
              entry.on("end", onend);
            } else {
              this[SAW_VALID_ENTRY] = true;
            }
          }
          if (entry.meta) {
            if (entry.size > this.maxMetaEntrySize) {
              entry.ignore = true;
              this[EMIT]("ignoredEntry", entry);
              this[STATE] = "ignore";
              entry.resume();
            } else if (entry.size > 0) {
              this[META] = "";
              entry.on("data", (c) => this[META] += c);
              this[STATE] = "meta";
            }
          } else {
            this[EX] = void 0;
            entry.ignore = entry.ignore || !this.filter(entry.path, entry);
            if (entry.ignore) {
              this[EMIT]("ignoredEntry", entry);
              this[STATE] = entry.remain ? "ignore" : "header";
              entry.resume();
            } else {
              if (entry.remain) {
                this[STATE] = "body";
              } else {
                this[STATE] = "header";
                entry.end();
              }
              if (!this[READENTRY]) {
                this[QUEUE].push(entry);
                this[NEXTENTRY]();
              } else {
                this[QUEUE].push(entry);
              }
            }
          }
        }
      }
    }
  }
  [CLOSESTREAM]() {
    queueMicrotask(() => this.emit("close"));
  }
  [PROCESSENTRY](entry) {
    let go = true;
    if (!entry) {
      this[READENTRY] = void 0;
      go = false;
    } else if (Array.isArray(entry)) {
      const [ev, ...args] = entry;
      this.emit(ev, ...args);
    } else {
      this[READENTRY] = entry;
      this.emit("entry", entry);
      if (!entry.emittedEnd) {
        entry.on("end", () => this[NEXTENTRY]());
        go = false;
      }
    }
    return go;
  }
  [NEXTENTRY]() {
    do {
    } while (this[PROCESSENTRY](this[QUEUE].shift()));
    if (!this[QUEUE].length) {
      const re = this[READENTRY];
      const drainNow = !re || re.flowing || re.size === re.remain;
      if (drainNow) {
        if (!this[WRITING]) {
          this.emit("drain");
        }
      } else {
        re.once("drain", () => this.emit("drain"));
      }
    }
  }
  [CONSUMEBODY](chunk, position) {
    const entry = this[WRITEENTRY];
    if (!entry) {
      throw new Error("attempt to consume body without entry??");
    }
    const br = entry.blockRemain ?? 0;
    const c = br >= chunk.length && position === 0 ? chunk : chunk.subarray(position, position + br);
    entry.write(c);
    if (!entry.blockRemain) {
      this[STATE] = "header";
      this[WRITEENTRY] = void 0;
      entry.end();
    }
    return c.length;
  }
  [CONSUMEMETA](chunk, position) {
    const entry = this[WRITEENTRY];
    const ret = this[CONSUMEBODY](chunk, position);
    if (!this[WRITEENTRY] && entry) {
      this[EMITMETA](entry);
    }
    return ret;
  }
  [EMIT](ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY]) {
      this.emit(ev, data, extra);
    } else {
      this[QUEUE].push([ev, data, extra]);
    }
  }
  [EMITMETA](entry) {
    this[EMIT]("meta", this[META]);
    switch (entry.type) {
      case "ExtendedHeader":
      case "OldExtendedHeader":
        this[EX] = Pax.parse(this[META], this[EX], false);
        break;
      case "GlobalExtendedHeader":
        this[GEX] = Pax.parse(this[META], this[GEX], true);
        break;
      case "NextFileHasLongPath":
      case "OldGnuLongPath": {
        const ex = this[EX] ?? /* @__PURE__ */ Object.create(null);
        this[EX] = ex;
        ex.path = this[META].replace(/\0.*/, "");
        break;
      }
      case "NextFileHasLongLinkpath": {
        const ex = this[EX] || /* @__PURE__ */ Object.create(null);
        this[EX] = ex;
        ex.linkpath = this[META].replace(/\0.*/, "");
        break;
      }
      default:
        throw new Error("unknown meta: " + entry.type);
    }
  }
  abort(error) {
    this[ABORTED2] = true;
    this.emit("abort", error);
    this.warn("TAR_ABORT", error, { recoverable: false });
  }
  write(chunk, encoding, cb) {
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(
        chunk,
        /* c8 ignore next */
        typeof encoding === "string" ? encoding : "utf8"
      );
    }
    if (this[ABORTED2]) {
      cb?.();
      return false;
    }
    const needSniff = this[UNZIP] === void 0 || this.brotli === void 0 && this[UNZIP] === false;
    if (needSniff && chunk) {
      if (this[BUFFER2]) {
        chunk = Buffer.concat([this[BUFFER2], chunk]);
        this[BUFFER2] = void 0;
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER2] = chunk;
        cb?.();
        return true;
      }
      for (let i = 0; this[UNZIP] === void 0 && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i]) {
          this[UNZIP] = false;
        }
      }
      const maybeBrotli = this.brotli === void 0;
      if (this[UNZIP] === false && maybeBrotli) {
        if (chunk.length < 512) {
          if (this[ENDED]) {
            this.brotli = true;
          } else {
            this[BUFFER2] = chunk;
            cb?.();
            return true;
          }
        } else {
          try {
            new Header(chunk.subarray(0, 512));
            this.brotli = false;
          } catch (_) {
            this.brotli = true;
          }
        }
      }
      if (this[UNZIP] === void 0 || this[UNZIP] === false && this.brotli) {
        const ended = this[ENDED];
        this[ENDED] = false;
        this[UNZIP] = this[UNZIP] === void 0 ? new Unzip({}) : new BrotliDecompress({});
        this[UNZIP].on("data", (chunk2) => this[CONSUMECHUNK](chunk2));
        this[UNZIP].on("error", (er) => this.abort(er));
        this[UNZIP].on("end", () => {
          this[ENDED] = true;
          this[CONSUMECHUNK]();
        });
        this[WRITING] = true;
        const ret2 = !!this[UNZIP][ended ? "end" : "write"](chunk);
        this[WRITING] = false;
        cb?.();
        return ret2;
      }
    }
    this[WRITING] = true;
    if (this[UNZIP]) {
      this[UNZIP].write(chunk);
    } else {
      this[CONSUMECHUNK](chunk);
    }
    this[WRITING] = false;
    const ret = this[QUEUE].length ? false : this[READENTRY] ? this[READENTRY].flowing : true;
    if (!ret && !this[QUEUE].length) {
      this[READENTRY]?.once("drain", () => this.emit("drain"));
    }
    cb?.();
    return ret;
  }
  [BUFFERCONCAT](c) {
    if (c && !this[ABORTED2]) {
      this[BUFFER2] = this[BUFFER2] ? Buffer.concat([this[BUFFER2], c]) : c;
    }
  }
  [MAYBEEND]() {
    if (this[ENDED] && !this[EMITTEDEND] && !this[ABORTED2] && !this[CONSUMING]) {
      this[EMITTEDEND] = true;
      const entry = this[WRITEENTRY];
      if (entry && entry.blockRemain) {
        const have = this[BUFFER2] ? this[BUFFER2].length : 0;
        this.warn("TAR_BAD_ARCHIVE", `Truncated input (needed ${entry.blockRemain} more bytes, only ${have} available)`, { entry });
        if (this[BUFFER2]) {
          entry.write(this[BUFFER2]);
        }
        entry.end();
      }
      this[EMIT](DONE);
    }
  }
  [CONSUMECHUNK](chunk) {
    if (this[CONSUMING] && chunk) {
      this[BUFFERCONCAT](chunk);
    } else if (!chunk && !this[BUFFER2]) {
      this[MAYBEEND]();
    } else if (chunk) {
      this[CONSUMING] = true;
      if (this[BUFFER2]) {
        this[BUFFERCONCAT](chunk);
        const c = this[BUFFER2];
        this[BUFFER2] = void 0;
        this[CONSUMECHUNKSUB](c);
      } else {
        this[CONSUMECHUNKSUB](chunk);
      }
      while (this[BUFFER2] && this[BUFFER2]?.length >= 512 && !this[ABORTED2] && !this[SAW_EOF]) {
        const c = this[BUFFER2];
        this[BUFFER2] = void 0;
        this[CONSUMECHUNKSUB](c);
      }
      this[CONSUMING] = false;
    }
    if (!this[BUFFER2] || this[ENDED]) {
      this[MAYBEEND]();
    }
  }
  [CONSUMECHUNKSUB](chunk) {
    let position = 0;
    const length = chunk.length;
    while (position + 512 <= length && !this[ABORTED2] && !this[SAW_EOF]) {
      switch (this[STATE]) {
        case "begin":
        case "header":
          this[CONSUMEHEADER](chunk, position);
          position += 512;
          break;
        case "ignore":
        case "body":
          position += this[CONSUMEBODY](chunk, position);
          break;
        case "meta":
          position += this[CONSUMEMETA](chunk, position);
          break;
        default:
          throw new Error("invalid state: " + this[STATE]);
      }
    }
    if (position < length) {
      if (this[BUFFER2]) {
        this[BUFFER2] = Buffer.concat([
          chunk.subarray(position),
          this[BUFFER2]
        ]);
      } else {
        this[BUFFER2] = chunk.subarray(position);
      }
    }
  }
  end(chunk, encoding, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      encoding = void 0;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, encoding);
    }
    if (cb)
      this.once("finish", cb);
    if (!this[ABORTED2]) {
      if (this[UNZIP]) {
        if (chunk)
          this[UNZIP].write(chunk);
        this[UNZIP].end();
      } else {
        this[ENDED] = true;
        if (this.brotli === void 0)
          chunk = chunk || Buffer.alloc(0);
        if (chunk)
          this.write(chunk);
        this[MAYBEEND]();
      }
    }
    return this;
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/strip-trailing-slashes.js
var stripTrailingSlashes = (str) => {
  let i = str.length - 1;
  let slashesStart = -1;
  while (i > -1 && str.charAt(i) === "/") {
    slashesStart = i;
    i--;
  }
  return slashesStart === -1 ? str : str.slice(0, slashesStart);
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/list.js
var onReadEntryFunction = (opt) => {
  const onReadEntry = opt.onReadEntry;
  opt.onReadEntry = onReadEntry ? (e) => {
    onReadEntry(e);
    e.resume();
  } : (e) => e.resume();
};
var filesFilter = (opt, files) => {
  const map = new Map(files.map((f) => [stripTrailingSlashes(f), true]));
  const filter = opt.filter;
  const mapHas = (file, r = "") => {
    const root = r || (0, import_path5.parse)(file).root || ".";
    let ret;
    if (file === root)
      ret = false;
    else {
      const m = map.get(file);
      if (m !== void 0) {
        ret = m;
      } else {
        ret = mapHas((0, import_path5.dirname)(file), root);
      }
    }
    map.set(file, ret);
    return ret;
  };
  opt.filter = filter ? (file, entry) => filter(file, entry) && mapHas(stripTrailingSlashes(file)) : (file) => mapHas(stripTrailingSlashes(file));
};
var listFileSync = (opt) => {
  const p = new Parser3(opt);
  const file = opt.file;
  let fd;
  try {
    const stat2 = import_node_fs.default.statSync(file);
    const readSize = opt.maxReadSize || 16 * 1024 * 1024;
    if (stat2.size < readSize) {
      p.end(import_node_fs.default.readFileSync(file));
    } else {
      let pos2 = 0;
      const buf = Buffer.allocUnsafe(readSize);
      fd = import_node_fs.default.openSync(file, "r");
      while (pos2 < stat2.size) {
        const bytesRead = import_node_fs.default.readSync(fd, buf, 0, readSize, pos2);
        pos2 += bytesRead;
        p.write(buf.subarray(0, bytesRead));
      }
      p.end();
    }
  } finally {
    if (typeof fd === "number") {
      try {
        import_node_fs.default.closeSync(fd);
      } catch (er) {
      }
    }
  }
};
var listFile = (opt, _files) => {
  const parse5 = new Parser3(opt);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;
  const file = opt.file;
  const p = new Promise((resolve6, reject) => {
    parse5.on("error", reject);
    parse5.on("end", resolve6);
    import_node_fs.default.stat(file, (er, stat2) => {
      if (er) {
        reject(er);
      } else {
        const stream = new ReadStream(file, {
          readSize,
          size: stat2.size
        });
        stream.on("error", reject);
        stream.pipe(parse5);
      }
    });
  });
  return p;
};
var list = makeCommand(listFileSync, listFile, (opt) => new Parser3(opt), (opt) => new Parser3(opt), (opt, files) => {
  if (files?.length)
    filesFilter(opt, files);
  if (!opt.noResume)
    onReadEntryFunction(opt);
});

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/pack.js
var import_fs7 = __toESM(require("fs"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/write-entry.js
var import_fs6 = __toESM(require("fs"), 1);
var import_path6 = __toESM(require("path"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/mode-fix.js
var modeFix = (mode, isDir, portable) => {
  mode &= 4095;
  if (portable) {
    mode = (mode | 384) & ~18;
  }
  if (isDir) {
    if (mode & 256) {
      mode |= 64;
    }
    if (mode & 32) {
      mode |= 8;
    }
    if (mode & 4) {
      mode |= 1;
    }
  }
  return mode;
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/strip-absolute-path.js
var import_node_path3 = require("node:path");
var { isAbsolute, parse: parse3 } = import_node_path3.win32;
var stripAbsolutePath = (path9) => {
  let r = "";
  let parsed2 = parse3(path9);
  while (isAbsolute(path9) || parsed2.root) {
    const root = path9.charAt(0) === "/" && path9.slice(0, 4) !== "//?/" ? "/" : parsed2.root;
    path9 = path9.slice(root.length);
    r += root;
    parsed2 = parse3(path9);
  }
  return [r, path9];
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/winchars.js
var raw = ["|", "<", ">", "?", ":"];
var win = raw.map((char) => String.fromCharCode(61440 + char.charCodeAt(0)));
var toWin = new Map(raw.map((char, i) => [char, win[i]]));
var toRaw = new Map(win.map((char, i) => [char, raw[i]]));
var encode2 = (s) => raw.reduce((s2, c) => s2.split(c).join(toWin.get(c)), s);
var decode = (s) => win.reduce((s2, c) => s2.split(c).join(toRaw.get(c)), s);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/write-entry.js
var prefixPath = (path9, prefix) => {
  if (!prefix) {
    return normalizeWindowsPath(path9);
  }
  path9 = normalizeWindowsPath(path9).replace(/^\.(\/|$)/, "");
  return stripTrailingSlashes(prefix) + "/" + path9;
};
var maxReadSize = 16 * 1024 * 1024;
var PROCESS = Symbol("process");
var FILE = Symbol("file");
var DIRECTORY = Symbol("directory");
var SYMLINK = Symbol("symlink");
var HARDLINK = Symbol("hardlink");
var HEADER = Symbol("header");
var READ2 = Symbol("read");
var LSTAT = Symbol("lstat");
var ONLSTAT = Symbol("onlstat");
var ONREAD = Symbol("onread");
var ONREADLINK = Symbol("onreadlink");
var OPENFILE = Symbol("openfile");
var ONOPENFILE = Symbol("onopenfile");
var CLOSE = Symbol("close");
var MODE = Symbol("mode");
var AWAITDRAIN = Symbol("awaitDrain");
var ONDRAIN = Symbol("ondrain");
var PREFIX = Symbol("prefix");
var WriteEntry = class extends Minipass {
  path;
  portable;
  myuid = process.getuid && process.getuid() || 0;
  // until node has builtin pwnam functions, this'll have to do
  myuser = process.env.USER || "";
  maxReadSize;
  linkCache;
  statCache;
  preservePaths;
  cwd;
  strict;
  mtime;
  noPax;
  noMtime;
  prefix;
  fd;
  blockLen = 0;
  blockRemain = 0;
  buf;
  pos = 0;
  remain = 0;
  length = 0;
  offset = 0;
  win32;
  absolute;
  header;
  type;
  linkpath;
  stat;
  onWriteEntry;
  #hadError = false;
  constructor(p, opt_ = {}) {
    const opt = dealias(opt_);
    super();
    this.path = normalizeWindowsPath(p);
    this.portable = !!opt.portable;
    this.maxReadSize = opt.maxReadSize || maxReadSize;
    this.linkCache = opt.linkCache || /* @__PURE__ */ new Map();
    this.statCache = opt.statCache || /* @__PURE__ */ new Map();
    this.preservePaths = !!opt.preservePaths;
    this.cwd = normalizeWindowsPath(opt.cwd || process.cwd());
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;
    this.mtime = opt.mtime;
    this.prefix = opt.prefix ? normalizeWindowsPath(opt.prefix) : void 0;
    this.onWriteEntry = opt.onWriteEntry;
    if (typeof opt.onwarn === "function") {
      this.on("warn", opt.onwarn);
    }
    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath(this.path);
      if (root && typeof stripped === "string") {
        this.path = stripped;
        pathWarn = root;
      }
    }
    this.win32 = !!opt.win32 || process.platform === "win32";
    if (this.win32) {
      this.path = decode(this.path.replace(/\\/g, "/"));
      p = p.replace(/\\/g, "/");
    }
    this.absolute = normalizeWindowsPath(opt.absolute || import_path6.default.resolve(this.cwd, p));
    if (this.path === "") {
      this.path = "./";
    }
    if (pathWarn) {
      this.warn("TAR_ENTRY_INFO", `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path
      });
    }
    const cs = this.statCache.get(this.absolute);
    if (cs) {
      this[ONLSTAT](cs);
    } else {
      this[LSTAT]();
    }
  }
  warn(code2, message, data = {}) {
    return warnMethod(this, code2, message, data);
  }
  emit(ev, ...data) {
    if (ev === "error") {
      this.#hadError = true;
    }
    return super.emit(ev, ...data);
  }
  [LSTAT]() {
    import_fs6.default.lstat(this.absolute, (er, stat2) => {
      if (er) {
        return this.emit("error", er);
      }
      this[ONLSTAT](stat2);
    });
  }
  [ONLSTAT](stat2) {
    this.statCache.set(this.absolute, stat2);
    this.stat = stat2;
    if (!stat2.isFile()) {
      stat2.size = 0;
    }
    this.type = getType(stat2);
    this.emit("stat", stat2);
    this[PROCESS]();
  }
  [PROCESS]() {
    switch (this.type) {
      case "File":
        return this[FILE]();
      case "Directory":
        return this[DIRECTORY]();
      case "SymbolicLink":
        return this[SYMLINK]();
      default:
        return this.end();
    }
  }
  [MODE](mode) {
    return modeFix(mode, this.type === "Directory", this.portable);
  }
  [PREFIX](path9) {
    return prefixPath(path9, this.prefix);
  }
  [HEADER]() {
    if (!this.stat) {
      throw new Error("cannot write header before stat");
    }
    if (this.type === "Directory" && this.portable) {
      this.noMtime = true;
    }
    this.onWriteEntry?.(this);
    this.header = new Header({
      path: this[PREFIX](this.path),
      // only apply the prefix to hard links.
      linkpath: this.type === "Link" && this.linkpath !== void 0 ? this[PREFIX](this.linkpath) : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? void 0 : this.stat.uid,
      gid: this.portable ? void 0 : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? void 0 : this.mtime || this.stat.mtime,
      /* c8 ignore next */
      type: this.type === "Unsupported" ? void 0 : this.type,
      uname: this.portable ? void 0 : this.stat.uid === this.myuid ? this.myuser : "",
      atime: this.portable ? void 0 : this.stat.atime,
      ctime: this.portable ? void 0 : this.stat.ctime
    });
    if (this.header.encode() && !this.noPax) {
      super.write(new Pax({
        atime: this.portable ? void 0 : this.header.atime,
        ctime: this.portable ? void 0 : this.header.ctime,
        gid: this.portable ? void 0 : this.header.gid,
        mtime: this.noMtime ? void 0 : this.mtime || this.header.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === "Link" && this.linkpath !== void 0 ? this[PREFIX](this.linkpath) : this.linkpath,
        size: this.header.size,
        uid: this.portable ? void 0 : this.header.uid,
        uname: this.portable ? void 0 : this.header.uname,
        dev: this.portable ? void 0 : this.stat.dev,
        ino: this.portable ? void 0 : this.stat.ino,
        nlink: this.portable ? void 0 : this.stat.nlink
      }).encode());
    }
    const block = this.header?.block;
    if (!block) {
      throw new Error("failed to encode header");
    }
    super.write(block);
  }
  [DIRECTORY]() {
    if (!this.stat) {
      throw new Error("cannot create directory entry without stat");
    }
    if (this.path.slice(-1) !== "/") {
      this.path += "/";
    }
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }
  [SYMLINK]() {
    import_fs6.default.readlink(this.absolute, (er, linkpath) => {
      if (er) {
        return this.emit("error", er);
      }
      this[ONREADLINK](linkpath);
    });
  }
  [ONREADLINK](linkpath) {
    this.linkpath = normalizeWindowsPath(linkpath);
    this[HEADER]();
    this.end();
  }
  [HARDLINK](linkpath) {
    if (!this.stat) {
      throw new Error("cannot create link entry without stat");
    }
    this.type = "Link";
    this.linkpath = normalizeWindowsPath(import_path6.default.relative(this.cwd, linkpath));
    this.stat.size = 0;
    this[HEADER]();
    this.end();
  }
  [FILE]() {
    if (!this.stat) {
      throw new Error("cannot create file entry without stat");
    }
    if (this.stat.nlink > 1) {
      const linkKey = `${this.stat.dev}:${this.stat.ino}`;
      const linkpath = this.linkCache.get(linkKey);
      if (linkpath?.indexOf(this.cwd) === 0) {
        return this[HARDLINK](linkpath);
      }
      this.linkCache.set(linkKey, this.absolute);
    }
    this[HEADER]();
    if (this.stat.size === 0) {
      return this.end();
    }
    this[OPENFILE]();
  }
  [OPENFILE]() {
    import_fs6.default.open(this.absolute, "r", (er, fd) => {
      if (er) {
        return this.emit("error", er);
      }
      this[ONOPENFILE](fd);
    });
  }
  [ONOPENFILE](fd) {
    this.fd = fd;
    if (this.#hadError) {
      return this[CLOSE]();
    }
    if (!this.stat) {
      throw new Error("should stat before calling onopenfile");
    }
    this.blockLen = 512 * Math.ceil(this.stat.size / 512);
    this.blockRemain = this.blockLen;
    const bufLen = Math.min(this.blockLen, this.maxReadSize);
    this.buf = Buffer.allocUnsafe(bufLen);
    this.offset = 0;
    this.pos = 0;
    this.remain = this.stat.size;
    this.length = this.buf.length;
    this[READ2]();
  }
  [READ2]() {
    const { fd, buf, offset, length, pos: pos2 } = this;
    if (fd === void 0 || buf === void 0) {
      throw new Error("cannot read file without first opening");
    }
    import_fs6.default.read(fd, buf, offset, length, pos2, (er, bytesRead) => {
      if (er) {
        return this[CLOSE](() => this.emit("error", er));
      }
      this[ONREAD](bytesRead);
    });
  }
  /* c8 ignore start */
  [CLOSE](cb = () => {
  }) {
    if (this.fd !== void 0)
      import_fs6.default.close(this.fd, cb);
  }
  [ONREAD](bytesRead) {
    if (bytesRead <= 0 && this.remain > 0) {
      const er = Object.assign(new Error("encountered unexpected EOF"), {
        path: this.absolute,
        syscall: "read",
        code: "EOF"
      });
      return this[CLOSE](() => this.emit("error", er));
    }
    if (bytesRead > this.remain) {
      const er = Object.assign(new Error("did not encounter expected EOF"), {
        path: this.absolute,
        syscall: "read",
        code: "EOF"
      });
      return this[CLOSE](() => this.emit("error", er));
    }
    if (!this.buf) {
      throw new Error("should have created buffer prior to reading");
    }
    if (bytesRead === this.remain) {
      for (let i = bytesRead; i < this.length && bytesRead < this.blockRemain; i++) {
        this.buf[i + this.offset] = 0;
        bytesRead++;
        this.remain++;
      }
    }
    const chunk = this.offset === 0 && bytesRead === this.buf.length ? this.buf : this.buf.subarray(this.offset, this.offset + bytesRead);
    const flushed = this.write(chunk);
    if (!flushed) {
      this[AWAITDRAIN](() => this[ONDRAIN]());
    } else {
      this[ONDRAIN]();
    }
  }
  [AWAITDRAIN](cb) {
    this.once("drain", cb);
  }
  write(chunk, encoding, cb) {
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, typeof encoding === "string" ? encoding : "utf8");
    }
    if (this.blockRemain < chunk.length) {
      const er = Object.assign(new Error("writing more data than expected"), {
        path: this.absolute
      });
      return this.emit("error", er);
    }
    this.remain -= chunk.length;
    this.blockRemain -= chunk.length;
    this.pos += chunk.length;
    this.offset += chunk.length;
    return super.write(chunk, null, cb);
  }
  [ONDRAIN]() {
    if (!this.remain) {
      if (this.blockRemain) {
        super.write(Buffer.alloc(this.blockRemain));
      }
      return this[CLOSE]((er) => er ? this.emit("error", er) : this.end());
    }
    if (!this.buf) {
      throw new Error("buffer lost somehow in ONDRAIN");
    }
    if (this.offset >= this.length) {
      this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length));
      this.offset = 0;
    }
    this.length = this.buf.length - this.offset;
    this[READ2]();
  }
};
var WriteEntrySync = class extends WriteEntry {
  sync = true;
  [LSTAT]() {
    this[ONLSTAT](import_fs6.default.lstatSync(this.absolute));
  }
  [SYMLINK]() {
    this[ONREADLINK](import_fs6.default.readlinkSync(this.absolute));
  }
  [OPENFILE]() {
    this[ONOPENFILE](import_fs6.default.openSync(this.absolute, "r"));
  }
  [READ2]() {
    let threw = true;
    try {
      const { fd, buf, offset, length, pos: pos2 } = this;
      if (fd === void 0 || buf === void 0) {
        throw new Error("fd and buf must be set in READ method");
      }
      const bytesRead = import_fs6.default.readSync(fd, buf, offset, length, pos2);
      this[ONREAD](bytesRead);
      threw = false;
    } finally {
      if (threw) {
        try {
          this[CLOSE](() => {
          });
        } catch (er) {
        }
      }
    }
  }
  [AWAITDRAIN](cb) {
    cb();
  }
  /* c8 ignore start */
  [CLOSE](cb = () => {
  }) {
    if (this.fd !== void 0)
      import_fs6.default.closeSync(this.fd);
    cb();
  }
};
var WriteEntryTar = class extends Minipass {
  blockLen = 0;
  blockRemain = 0;
  buf = 0;
  pos = 0;
  remain = 0;
  length = 0;
  preservePaths;
  portable;
  strict;
  noPax;
  noMtime;
  readEntry;
  type;
  prefix;
  path;
  mode;
  uid;
  gid;
  uname;
  gname;
  header;
  mtime;
  atime;
  ctime;
  linkpath;
  size;
  onWriteEntry;
  warn(code2, message, data = {}) {
    return warnMethod(this, code2, message, data);
  }
  constructor(readEntry, opt_ = {}) {
    const opt = dealias(opt_);
    super();
    this.preservePaths = !!opt.preservePaths;
    this.portable = !!opt.portable;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.noMtime = !!opt.noMtime;
    this.onWriteEntry = opt.onWriteEntry;
    this.readEntry = readEntry;
    const { type } = readEntry;
    if (type === "Unsupported") {
      throw new Error("writing entry that should be ignored");
    }
    this.type = type;
    if (this.type === "Directory" && this.portable) {
      this.noMtime = true;
    }
    this.prefix = opt.prefix;
    this.path = normalizeWindowsPath(readEntry.path);
    this.mode = readEntry.mode !== void 0 ? this[MODE](readEntry.mode) : void 0;
    this.uid = this.portable ? void 0 : readEntry.uid;
    this.gid = this.portable ? void 0 : readEntry.gid;
    this.uname = this.portable ? void 0 : readEntry.uname;
    this.gname = this.portable ? void 0 : readEntry.gname;
    this.size = readEntry.size;
    this.mtime = this.noMtime ? void 0 : opt.mtime || readEntry.mtime;
    this.atime = this.portable ? void 0 : readEntry.atime;
    this.ctime = this.portable ? void 0 : readEntry.ctime;
    this.linkpath = readEntry.linkpath !== void 0 ? normalizeWindowsPath(readEntry.linkpath) : void 0;
    if (typeof opt.onwarn === "function") {
      this.on("warn", opt.onwarn);
    }
    let pathWarn = false;
    if (!this.preservePaths) {
      const [root, stripped] = stripAbsolutePath(this.path);
      if (root && typeof stripped === "string") {
        this.path = stripped;
        pathWarn = root;
      }
    }
    this.remain = readEntry.size;
    this.blockRemain = readEntry.startBlockSize;
    this.onWriteEntry?.(this);
    this.header = new Header({
      path: this[PREFIX](this.path),
      linkpath: this.type === "Link" && this.linkpath !== void 0 ? this[PREFIX](this.linkpath) : this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? void 0 : this.uid,
      gid: this.portable ? void 0 : this.gid,
      size: this.size,
      mtime: this.noMtime ? void 0 : this.mtime,
      type: this.type,
      uname: this.portable ? void 0 : this.uname,
      atime: this.portable ? void 0 : this.atime,
      ctime: this.portable ? void 0 : this.ctime
    });
    if (pathWarn) {
      this.warn("TAR_ENTRY_INFO", `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path
      });
    }
    if (this.header.encode() && !this.noPax) {
      super.write(new Pax({
        atime: this.portable ? void 0 : this.atime,
        ctime: this.portable ? void 0 : this.ctime,
        gid: this.portable ? void 0 : this.gid,
        mtime: this.noMtime ? void 0 : this.mtime,
        path: this[PREFIX](this.path),
        linkpath: this.type === "Link" && this.linkpath !== void 0 ? this[PREFIX](this.linkpath) : this.linkpath,
        size: this.size,
        uid: this.portable ? void 0 : this.uid,
        uname: this.portable ? void 0 : this.uname,
        dev: this.portable ? void 0 : this.readEntry.dev,
        ino: this.portable ? void 0 : this.readEntry.ino,
        nlink: this.portable ? void 0 : this.readEntry.nlink
      }).encode());
    }
    const b = this.header?.block;
    if (!b)
      throw new Error("failed to encode header");
    super.write(b);
    readEntry.pipe(this);
  }
  [PREFIX](path9) {
    return prefixPath(path9, this.prefix);
  }
  [MODE](mode) {
    return modeFix(mode, this.type === "Directory", this.portable);
  }
  write(chunk, encoding, cb) {
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, typeof encoding === "string" ? encoding : "utf8");
    }
    const writeLen = chunk.length;
    if (writeLen > this.blockRemain) {
      throw new Error("writing more to entry than is appropriate");
    }
    this.blockRemain -= writeLen;
    return super.write(chunk, cb);
  }
  end(chunk, encoding, cb) {
    if (this.blockRemain) {
      super.write(Buffer.alloc(this.blockRemain));
    }
    if (typeof chunk === "function") {
      cb = chunk;
      encoding = void 0;
      chunk = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, encoding ?? "utf8");
    }
    if (cb)
      this.once("finish", cb);
    chunk ? super.end(chunk, cb) : super.end(cb);
    return this;
  }
};
var getType = (stat2) => stat2.isFile() ? "File" : stat2.isDirectory() ? "Directory" : stat2.isSymbolicLink() ? "SymbolicLink" : "Unsupported";

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/pack.js
var import_path7 = __toESM(require("path"), 1);
var PackJob = class {
  path;
  absolute;
  entry;
  stat;
  readdir;
  pending = false;
  ignore = false;
  piped = false;
  constructor(path9, absolute) {
    this.path = path9 || "./";
    this.absolute = absolute;
  }
};
var EOF2 = Buffer.alloc(1024);
var ONSTAT = Symbol("onStat");
var ENDED2 = Symbol("ended");
var QUEUE2 = Symbol("queue");
var CURRENT = Symbol("current");
var PROCESS2 = Symbol("process");
var PROCESSING = Symbol("processing");
var PROCESSJOB = Symbol("processJob");
var JOBS = Symbol("jobs");
var JOBDONE = Symbol("jobDone");
var ADDFSENTRY = Symbol("addFSEntry");
var ADDTARENTRY = Symbol("addTarEntry");
var STAT = Symbol("stat");
var READDIR = Symbol("readdir");
var ONREADDIR = Symbol("onreaddir");
var PIPE = Symbol("pipe");
var ENTRY = Symbol("entry");
var ENTRYOPT = Symbol("entryOpt");
var WRITEENTRYCLASS = Symbol("writeEntryClass");
var WRITE = Symbol("write");
var ONDRAIN2 = Symbol("ondrain");
var Pack = class extends Minipass {
  opt;
  cwd;
  maxReadSize;
  preservePaths;
  strict;
  noPax;
  prefix;
  linkCache;
  statCache;
  file;
  portable;
  zip;
  readdirCache;
  noDirRecurse;
  follow;
  noMtime;
  mtime;
  filter;
  jobs;
  [WRITEENTRYCLASS];
  onWriteEntry;
  [QUEUE2];
  [JOBS] = 0;
  [PROCESSING] = false;
  [ENDED2] = false;
  constructor(opt = {}) {
    super();
    this.opt = opt;
    this.file = opt.file || "";
    this.cwd = opt.cwd || process.cwd();
    this.maxReadSize = opt.maxReadSize;
    this.preservePaths = !!opt.preservePaths;
    this.strict = !!opt.strict;
    this.noPax = !!opt.noPax;
    this.prefix = normalizeWindowsPath(opt.prefix || "");
    this.linkCache = opt.linkCache || /* @__PURE__ */ new Map();
    this.statCache = opt.statCache || /* @__PURE__ */ new Map();
    this.readdirCache = opt.readdirCache || /* @__PURE__ */ new Map();
    this.onWriteEntry = opt.onWriteEntry;
    this[WRITEENTRYCLASS] = WriteEntry;
    if (typeof opt.onwarn === "function") {
      this.on("warn", opt.onwarn);
    }
    this.portable = !!opt.portable;
    if (opt.gzip || opt.brotli) {
      if (opt.gzip && opt.brotli) {
        throw new TypeError("gzip and brotli are mutually exclusive");
      }
      if (opt.gzip) {
        if (typeof opt.gzip !== "object") {
          opt.gzip = {};
        }
        if (this.portable) {
          opt.gzip.portable = true;
        }
        this.zip = new Gzip(opt.gzip);
      }
      if (opt.brotli) {
        if (typeof opt.brotli !== "object") {
          opt.brotli = {};
        }
        this.zip = new BrotliCompress(opt.brotli);
      }
      if (!this.zip)
        throw new Error("impossible");
      const zip = this.zip;
      zip.on("data", (chunk) => super.write(chunk));
      zip.on("end", () => super.end());
      zip.on("drain", () => this[ONDRAIN2]());
      this.on("resume", () => zip.resume());
    } else {
      this.on("drain", this[ONDRAIN2]);
    }
    this.noDirRecurse = !!opt.noDirRecurse;
    this.follow = !!opt.follow;
    this.noMtime = !!opt.noMtime;
    if (opt.mtime)
      this.mtime = opt.mtime;
    this.filter = typeof opt.filter === "function" ? opt.filter : () => true;
    this[QUEUE2] = new Yallist();
    this[JOBS] = 0;
    this.jobs = Number(opt.jobs) || 4;
    this[PROCESSING] = false;
    this[ENDED2] = false;
  }
  [WRITE](chunk) {
    return super.write(chunk);
  }
  add(path9) {
    this.write(path9);
    return this;
  }
  end(path9, encoding, cb) {
    if (typeof path9 === "function") {
      cb = path9;
      path9 = void 0;
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (path9) {
      this.add(path9);
    }
    this[ENDED2] = true;
    this[PROCESS2]();
    if (cb)
      cb();
    return this;
  }
  write(path9) {
    if (this[ENDED2]) {
      throw new Error("write after end");
    }
    if (path9 instanceof ReadEntry) {
      this[ADDTARENTRY](path9);
    } else {
      this[ADDFSENTRY](path9);
    }
    return this.flowing;
  }
  [ADDTARENTRY](p) {
    const absolute = normalizeWindowsPath(import_path7.default.resolve(this.cwd, p.path));
    if (!this.filter(p.path, p)) {
      p.resume();
    } else {
      const job = new PackJob(p.path, absolute);
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job));
      job.entry.on("end", () => this[JOBDONE](job));
      this[JOBS] += 1;
      this[QUEUE2].push(job);
    }
    this[PROCESS2]();
  }
  [ADDFSENTRY](p) {
    const absolute = normalizeWindowsPath(import_path7.default.resolve(this.cwd, p));
    this[QUEUE2].push(new PackJob(p, absolute));
    this[PROCESS2]();
  }
  [STAT](job) {
    job.pending = true;
    this[JOBS] += 1;
    const stat2 = this.follow ? "stat" : "lstat";
    import_fs7.default[stat2](job.absolute, (er, stat3) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        this.emit("error", er);
      } else {
        this[ONSTAT](job, stat3);
      }
    });
  }
  [ONSTAT](job, stat2) {
    this.statCache.set(job.absolute, stat2);
    job.stat = stat2;
    if (!this.filter(job.path, stat2)) {
      job.ignore = true;
    }
    this[PROCESS2]();
  }
  [READDIR](job) {
    job.pending = true;
    this[JOBS] += 1;
    import_fs7.default.readdir(job.absolute, (er, entries) => {
      job.pending = false;
      this[JOBS] -= 1;
      if (er) {
        return this.emit("error", er);
      }
      this[ONREADDIR](job, entries);
    });
  }
  [ONREADDIR](job, entries) {
    this.readdirCache.set(job.absolute, entries);
    job.readdir = entries;
    this[PROCESS2]();
  }
  [PROCESS2]() {
    if (this[PROCESSING]) {
      return;
    }
    this[PROCESSING] = true;
    for (let w = this[QUEUE2].head; !!w && this[JOBS] < this.jobs; w = w.next) {
      this[PROCESSJOB](w.value);
      if (w.value.ignore) {
        const p = w.next;
        this[QUEUE2].removeNode(w);
        w.next = p;
      }
    }
    this[PROCESSING] = false;
    if (this[ENDED2] && !this[QUEUE2].length && this[JOBS] === 0) {
      if (this.zip) {
        this.zip.end(EOF2);
      } else {
        super.write(EOF2);
        super.end();
      }
    }
  }
  get [CURRENT]() {
    return this[QUEUE2] && this[QUEUE2].head && this[QUEUE2].head.value;
  }
  [JOBDONE](_job) {
    this[QUEUE2].shift();
    this[JOBS] -= 1;
    this[PROCESS2]();
  }
  [PROCESSJOB](job) {
    if (job.pending) {
      return;
    }
    if (job.entry) {
      if (job === this[CURRENT] && !job.piped) {
        this[PIPE](job);
      }
      return;
    }
    if (!job.stat) {
      const sc = this.statCache.get(job.absolute);
      if (sc) {
        this[ONSTAT](job, sc);
      } else {
        this[STAT](job);
      }
    }
    if (!job.stat) {
      return;
    }
    if (job.ignore) {
      return;
    }
    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      const rc = this.readdirCache.get(job.absolute);
      if (rc) {
        this[ONREADDIR](job, rc);
      } else {
        this[READDIR](job);
      }
      if (!job.readdir) {
        return;
      }
    }
    job.entry = this[ENTRY](job);
    if (!job.entry) {
      job.ignore = true;
      return;
    }
    if (job === this[CURRENT] && !job.piped) {
      this[PIPE](job);
    }
  }
  [ENTRYOPT](job) {
    return {
      onwarn: (code2, msg, data) => this.warn(code2, msg, data),
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime,
      prefix: this.prefix,
      onWriteEntry: this.onWriteEntry
    };
  }
  [ENTRY](job) {
    this[JOBS] += 1;
    try {
      const e = new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job));
      return e.on("end", () => this[JOBDONE](job)).on("error", (er) => this.emit("error", er));
    } catch (er) {
      this.emit("error", er);
    }
  }
  [ONDRAIN2]() {
    if (this[CURRENT] && this[CURRENT].entry) {
      this[CURRENT].entry.resume();
    }
  }
  // like .pipe() but using super, because our write() is special
  [PIPE](job) {
    job.piped = true;
    if (job.readdir) {
      job.readdir.forEach((entry) => {
        const p = job.path;
        const base = p === "./" ? "" : p.replace(/\/*$/, "/");
        this[ADDFSENTRY](base + entry);
      });
    }
    const source = job.entry;
    const zip = this.zip;
    if (!source)
      throw new Error("cannot pipe without source");
    if (zip) {
      source.on("data", (chunk) => {
        if (!zip.write(chunk)) {
          source.pause();
        }
      });
    } else {
      source.on("data", (chunk) => {
        if (!super.write(chunk)) {
          source.pause();
        }
      });
    }
  }
  pause() {
    if (this.zip) {
      this.zip.pause();
    }
    return super.pause();
  }
  warn(code2, message, data = {}) {
    warnMethod(this, code2, message, data);
  }
};
var PackSync = class extends Pack {
  sync = true;
  constructor(opt) {
    super(opt);
    this[WRITEENTRYCLASS] = WriteEntrySync;
  }
  // pause/resume are no-ops in sync streams.
  pause() {
  }
  resume() {
  }
  [STAT](job) {
    const stat2 = this.follow ? "statSync" : "lstatSync";
    this[ONSTAT](job, import_fs7.default[stat2](job.absolute));
  }
  [READDIR](job) {
    this[ONREADDIR](job, import_fs7.default.readdirSync(job.absolute));
  }
  // gotta get it all in this tick
  [PIPE](job) {
    const source = job.entry;
    const zip = this.zip;
    if (job.readdir) {
      job.readdir.forEach((entry) => {
        const p = job.path;
        const base = p === "./" ? "" : p.replace(/\/*$/, "/");
        this[ADDFSENTRY](base + entry);
      });
    }
    if (!source)
      throw new Error("Cannot pipe without source");
    if (zip) {
      source.on("data", (chunk) => {
        zip.write(chunk);
      });
    } else {
      source.on("data", (chunk) => {
        super[WRITE](chunk);
      });
    }
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/create.js
var createFileSync = (opt, files) => {
  const p = new PackSync(opt);
  const stream = new WriteStreamSync(opt.file, {
    mode: opt.mode || 438
  });
  p.pipe(stream);
  addFilesSync(p, files);
};
var createFile = (opt, files) => {
  const p = new Pack(opt);
  const stream = new WriteStream(opt.file, {
    mode: opt.mode || 438
  });
  p.pipe(stream);
  const promise = new Promise((res, rej) => {
    stream.on("error", rej);
    stream.on("close", res);
    p.on("error", rej);
  });
  addFilesAsync(p, files);
  return promise;
};
var addFilesSync = (p, files) => {
  files.forEach((file) => {
    if (file.charAt(0) === "@") {
      list({
        file: import_node_path4.default.resolve(p.cwd, file.slice(1)),
        sync: true,
        noResume: true,
        onReadEntry: (entry) => p.add(entry)
      });
    } else {
      p.add(file);
    }
  });
  p.end();
};
var addFilesAsync = async (p, files) => {
  for (let i = 0; i < files.length; i++) {
    const file = String(files[i]);
    if (file.charAt(0) === "@") {
      await list({
        file: import_node_path4.default.resolve(String(p.cwd), file.slice(1)),
        noResume: true,
        onReadEntry: (entry) => {
          p.add(entry);
        }
      });
    } else {
      p.add(file);
    }
  }
  p.end();
};
var createSync = (opt, files) => {
  const p = new PackSync(opt);
  addFilesSync(p, files);
  return p;
};
var createAsync = (opt, files) => {
  const p = new Pack(opt);
  addFilesAsync(p, files);
  return p;
};
var create = makeCommand(createFileSync, createFile, createSync, createAsync, (_opt, files) => {
  if (!files?.length) {
    throw new TypeError("no paths specified to add to archive");
  }
});

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/extract.js
var import_node_fs4 = __toESM(require("node:fs"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/unpack.js
var import_node_assert = __toESM(require("node:assert"), 1);
var import_node_crypto = require("node:crypto");
var import_node_fs3 = __toESM(require("node:fs"), 1);
var import_node_path8 = __toESM(require("node:path"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/get-write-flag.js
var import_fs8 = __toESM(require("fs"), 1);
var platform2 = process.env.__FAKE_PLATFORM__ || process.platform;
var isWindows = platform2 === "win32";
var { O_CREAT, O_TRUNC, O_WRONLY } = import_fs8.default.constants;
var UV_FS_O_FILEMAP = Number(process.env.__FAKE_FS_O_FILENAME__) || import_fs8.default.constants.UV_FS_O_FILEMAP || 0;
var fMapEnabled = isWindows && !!UV_FS_O_FILEMAP;
var fMapLimit = 512 * 1024;
var fMapFlag = UV_FS_O_FILEMAP | O_TRUNC | O_CREAT | O_WRONLY;
var getWriteFlag = !fMapEnabled ? () => "w" : (size) => size < fMapLimit ? fMapFlag : "w";

// node_modules/.pnpm/chownr@3.0.0/node_modules/chownr/dist/esm/index.js
var import_node_fs2 = __toESM(require("node:fs"), 1);
var import_node_path5 = __toESM(require("node:path"), 1);
var lchownSync = (path9, uid, gid) => {
  try {
    return import_node_fs2.default.lchownSync(path9, uid, gid);
  } catch (er) {
    if (er?.code !== "ENOENT")
      throw er;
  }
};
var chown = (cpath, uid, gid, cb) => {
  import_node_fs2.default.lchown(cpath, uid, gid, (er) => {
    cb(er && er?.code !== "ENOENT" ? er : null);
  });
};
var chownrKid = (p, child, uid, gid, cb) => {
  if (child.isDirectory()) {
    chownr(import_node_path5.default.resolve(p, child.name), uid, gid, (er) => {
      if (er)
        return cb(er);
      const cpath = import_node_path5.default.resolve(p, child.name);
      chown(cpath, uid, gid, cb);
    });
  } else {
    const cpath = import_node_path5.default.resolve(p, child.name);
    chown(cpath, uid, gid, cb);
  }
};
var chownr = (p, uid, gid, cb) => {
  import_node_fs2.default.readdir(p, { withFileTypes: true }, (er, children) => {
    if (er) {
      if (er.code === "ENOENT")
        return cb();
      else if (er.code !== "ENOTDIR" && er.code !== "ENOTSUP")
        return cb(er);
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb);
    let len = children.length;
    let errState = null;
    const then = (er2) => {
      if (errState)
        return;
      if (er2)
        return cb(errState = er2);
      if (--len === 0)
        return chown(p, uid, gid, cb);
    };
    for (const child of children) {
      chownrKid(p, child, uid, gid, then);
    }
  });
};
var chownrKidSync = (p, child, uid, gid) => {
  if (child.isDirectory())
    chownrSync(import_node_path5.default.resolve(p, child.name), uid, gid);
  lchownSync(import_node_path5.default.resolve(p, child.name), uid, gid);
};
var chownrSync = (p, uid, gid) => {
  let children;
  try {
    children = import_node_fs2.default.readdirSync(p, { withFileTypes: true });
  } catch (er) {
    const e = er;
    if (e?.code === "ENOENT")
      return;
    else if (e?.code === "ENOTDIR" || e?.code === "ENOTSUP")
      return lchownSync(p, uid, gid);
    else
      throw e;
  }
  for (const child of children) {
    chownrKidSync(p, child, uid, gid);
  }
  return lchownSync(p, uid, gid);
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/mkdir.js
var import_fs11 = __toESM(require("fs"), 1);

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/mkdirp-manual.js
var import_path8 = require("path");

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/opts-arg.js
var import_fs9 = require("fs");
var optsArg = (opts) => {
  if (!opts) {
    opts = { mode: 511 };
  } else if (typeof opts === "object") {
    opts = { mode: 511, ...opts };
  } else if (typeof opts === "number") {
    opts = { mode: opts };
  } else if (typeof opts === "string") {
    opts = { mode: parseInt(opts, 8) };
  } else {
    throw new TypeError("invalid options argument");
  }
  const resolved = opts;
  const optsFs = opts.fs || {};
  opts.mkdir = opts.mkdir || optsFs.mkdir || import_fs9.mkdir;
  opts.mkdirAsync = opts.mkdirAsync ? opts.mkdirAsync : async (path9, options) => {
    return new Promise((res, rej) => resolved.mkdir(path9, options, (er, made) => er ? rej(er) : res(made)));
  };
  opts.stat = opts.stat || optsFs.stat || import_fs9.stat;
  opts.statAsync = opts.statAsync ? opts.statAsync : async (path9) => new Promise((res, rej) => resolved.stat(path9, (err, stats) => err ? rej(err) : res(stats)));
  opts.statSync = opts.statSync || optsFs.statSync || import_fs9.statSync;
  opts.mkdirSync = opts.mkdirSync || optsFs.mkdirSync || import_fs9.mkdirSync;
  return resolved;
};

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/mkdirp-manual.js
var mkdirpManualSync = (path9, options, made) => {
  const parent = (0, import_path8.dirname)(path9);
  const opts = { ...optsArg(options), recursive: false };
  if (parent === path9) {
    try {
      return opts.mkdirSync(path9, opts);
    } catch (er) {
      const fer = er;
      if (fer && fer.code !== "EISDIR") {
        throw er;
      }
      return;
    }
  }
  try {
    opts.mkdirSync(path9, opts);
    return made || path9;
  } catch (er) {
    const fer = er;
    if (fer && fer.code === "ENOENT") {
      return mkdirpManualSync(path9, opts, mkdirpManualSync(parent, opts, made));
    }
    if (fer && fer.code !== "EEXIST" && fer && fer.code !== "EROFS") {
      throw er;
    }
    try {
      if (!opts.statSync(path9).isDirectory())
        throw er;
    } catch (_) {
      throw er;
    }
  }
};
var mkdirpManual = Object.assign(async (path9, options, made) => {
  const opts = optsArg(options);
  opts.recursive = false;
  const parent = (0, import_path8.dirname)(path9);
  if (parent === path9) {
    return opts.mkdirAsync(path9, opts).catch((er) => {
      const fer = er;
      if (fer && fer.code !== "EISDIR") {
        throw er;
      }
    });
  }
  return opts.mkdirAsync(path9, opts).then(() => made || path9, async (er) => {
    const fer = er;
    if (fer && fer.code === "ENOENT") {
      return mkdirpManual(parent, opts).then((made2) => mkdirpManual(path9, opts, made2));
    }
    if (fer && fer.code !== "EEXIST" && fer.code !== "EROFS") {
      throw er;
    }
    return opts.statAsync(path9).then((st) => {
      if (st.isDirectory()) {
        return made;
      } else {
        throw er;
      }
    }, () => {
      throw er;
    });
  });
}, { sync: mkdirpManualSync });

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/mkdirp-native.js
var import_path10 = require("path");

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/find-made.js
var import_path9 = require("path");
var findMade = async (opts, parent, path9) => {
  if (path9 === parent) {
    return;
  }
  return opts.statAsync(parent).then(
    (st) => st.isDirectory() ? path9 : void 0,
    // will fail later
    // will fail later
    (er) => {
      const fer = er;
      return fer && fer.code === "ENOENT" ? findMade(opts, (0, import_path9.dirname)(parent), parent) : void 0;
    }
  );
};
var findMadeSync = (opts, parent, path9) => {
  if (path9 === parent) {
    return void 0;
  }
  try {
    return opts.statSync(parent).isDirectory() ? path9 : void 0;
  } catch (er) {
    const fer = er;
    return fer && fer.code === "ENOENT" ? findMadeSync(opts, (0, import_path9.dirname)(parent), parent) : void 0;
  }
};

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/mkdirp-native.js
var mkdirpNativeSync = (path9, options) => {
  const opts = optsArg(options);
  opts.recursive = true;
  const parent = (0, import_path10.dirname)(path9);
  if (parent === path9) {
    return opts.mkdirSync(path9, opts);
  }
  const made = findMadeSync(opts, path9);
  try {
    opts.mkdirSync(path9, opts);
    return made;
  } catch (er) {
    const fer = er;
    if (fer && fer.code === "ENOENT") {
      return mkdirpManualSync(path9, opts);
    } else {
      throw er;
    }
  }
};
var mkdirpNative = Object.assign(async (path9, options) => {
  const opts = { ...optsArg(options), recursive: true };
  const parent = (0, import_path10.dirname)(path9);
  if (parent === path9) {
    return await opts.mkdirAsync(path9, opts);
  }
  return findMade(opts, path9).then((made) => opts.mkdirAsync(path9, opts).then((m) => made || m).catch((er) => {
    const fer = er;
    if (fer && fer.code === "ENOENT") {
      return mkdirpManual(path9, opts);
    } else {
      throw er;
    }
  }));
}, { sync: mkdirpNativeSync });

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/path-arg.js
var import_path11 = require("path");
var platform3 = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform;
var pathArg = (path9) => {
  if (/\0/.test(path9)) {
    throw Object.assign(new TypeError("path must be a string without null bytes"), {
      path: path9,
      code: "ERR_INVALID_ARG_VALUE"
    });
  }
  path9 = (0, import_path11.resolve)(path9);
  if (platform3 === "win32") {
    const badWinChars = /[*|"<>?:]/;
    const { root } = (0, import_path11.parse)(path9);
    if (badWinChars.test(path9.substring(root.length))) {
      throw Object.assign(new Error("Illegal characters in path."), {
        path: path9,
        code: "EINVAL"
      });
    }
  }
  return path9;
};

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/use-native.js
var import_fs10 = require("fs");
var version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version;
var versArr = version.replace(/^v/, "").split(".");
var hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12;
var useNativeSync = !hasNative ? () => false : (opts) => optsArg(opts).mkdirSync === import_fs10.mkdirSync;
var useNative = Object.assign(!hasNative ? () => false : (opts) => optsArg(opts).mkdir === import_fs10.mkdir, {
  sync: useNativeSync
});

// node_modules/.pnpm/mkdirp@3.0.1/node_modules/mkdirp/dist/mjs/index.js
var mkdirpSync = (path9, opts) => {
  path9 = pathArg(path9);
  const resolved = optsArg(opts);
  return useNativeSync(resolved) ? mkdirpNativeSync(path9, resolved) : mkdirpManualSync(path9, resolved);
};
var mkdirp = Object.assign(async (path9, opts) => {
  path9 = pathArg(path9);
  const resolved = optsArg(opts);
  return useNative(resolved) ? mkdirpNative(path9, resolved) : mkdirpManual(path9, resolved);
}, {
  mkdirpSync,
  mkdirpNative,
  mkdirpNativeSync,
  mkdirpManual,
  mkdirpManualSync,
  sync: mkdirpSync,
  native: mkdirpNative,
  nativeSync: mkdirpNativeSync,
  manual: mkdirpManual,
  manualSync: mkdirpManualSync,
  useNative,
  useNativeSync
});

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/mkdir.js
var import_node_path6 = __toESM(require("node:path"), 1);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/cwd-error.js
var CwdError = class extends Error {
  path;
  code;
  syscall = "chdir";
  constructor(path9, code2) {
    super(`${code2}: Cannot cd into '${path9}'`);
    this.path = path9;
    this.code = code2;
  }
  get name() {
    return "CwdError";
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/symlink-error.js
var SymlinkError = class extends Error {
  path;
  symlink;
  syscall = "symlink";
  code = "TAR_SYMLINK_ERROR";
  constructor(symlink, path9) {
    super("TAR_SYMLINK_ERROR: Cannot extract through symbolic link");
    this.symlink = symlink;
    this.path = path9;
  }
  get name() {
    return "SymlinkError";
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/mkdir.js
var cGet = (cache, key) => cache.get(normalizeWindowsPath(key));
var cSet = (cache, key, val) => cache.set(normalizeWindowsPath(key), val);
var checkCwd = (dir, cb) => {
  import_fs11.default.stat(dir, (er, st) => {
    if (er || !st.isDirectory()) {
      er = new CwdError(dir, er?.code || "ENOTDIR");
    }
    cb(er);
  });
};
var mkdir3 = (dir, opt, cb) => {
  dir = normalizeWindowsPath(dir);
  const umask = opt.umask ?? 18;
  const mode = opt.mode | 448;
  const needChmod = (mode & umask) !== 0;
  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === "number" && typeof gid === "number" && (uid !== opt.processUid || gid !== opt.processGid);
  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normalizeWindowsPath(opt.cwd);
  const done = (er, created) => {
    if (er) {
      cb(er);
    } else {
      cSet(cache, dir, true);
      if (created && doChown) {
        chownr(created, uid, gid, (er2) => done(er2));
      } else if (needChmod) {
        import_fs11.default.chmod(dir, mode, cb);
      } else {
        cb();
      }
    }
  };
  if (cache && cGet(cache, dir) === true) {
    return done();
  }
  if (dir === cwd) {
    return checkCwd(dir, done);
  }
  if (preserve) {
    return mkdirp(dir, { mode }).then(
      (made) => done(null, made ?? void 0),
      // oh, ts
      done
    );
  }
  const sub = normalizeWindowsPath(import_node_path6.default.relative(cwd, dir));
  const parts = sub.split("/");
  mkdir_(cwd, parts, mode, cache, unlink, cwd, void 0, done);
};
var mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length) {
    return cb(null, created);
  }
  const p = parts.shift();
  const part = normalizeWindowsPath(import_node_path6.default.resolve(base + "/" + p));
  if (cGet(cache, part)) {
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
  }
  import_fs11.default.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
};
var onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => (er) => {
  if (er) {
    import_fs11.default.lstat(part, (statEr, st) => {
      if (statEr) {
        statEr.path = statEr.path && normalizeWindowsPath(statEr.path);
        cb(statEr);
      } else if (st.isDirectory()) {
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
      } else if (unlink) {
        import_fs11.default.unlink(part, (er2) => {
          if (er2) {
            return cb(er2);
          }
          import_fs11.default.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
        });
      } else if (st.isSymbolicLink()) {
        return cb(new SymlinkError(part, part + "/" + parts.join("/")));
      } else {
        cb(er);
      }
    });
  } else {
    created = created || part;
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
  }
};
var checkCwdSync = (dir) => {
  let ok = false;
  let code2 = void 0;
  try {
    ok = import_fs11.default.statSync(dir).isDirectory();
  } catch (er) {
    code2 = er?.code;
  } finally {
    if (!ok) {
      throw new CwdError(dir, code2 ?? "ENOTDIR");
    }
  }
};
var mkdirSync3 = (dir, opt) => {
  dir = normalizeWindowsPath(dir);
  const umask = opt.umask ?? 18;
  const mode = opt.mode | 448;
  const needChmod = (mode & umask) !== 0;
  const uid = opt.uid;
  const gid = opt.gid;
  const doChown = typeof uid === "number" && typeof gid === "number" && (uid !== opt.processUid || gid !== opt.processGid);
  const preserve = opt.preserve;
  const unlink = opt.unlink;
  const cache = opt.cache;
  const cwd = normalizeWindowsPath(opt.cwd);
  const done = (created2) => {
    cSet(cache, dir, true);
    if (created2 && doChown) {
      chownrSync(created2, uid, gid);
    }
    if (needChmod) {
      import_fs11.default.chmodSync(dir, mode);
    }
  };
  if (cache && cGet(cache, dir) === true) {
    return done();
  }
  if (dir === cwd) {
    checkCwdSync(cwd);
    return done();
  }
  if (preserve) {
    return done(mkdirpSync(dir, mode) ?? void 0);
  }
  const sub = normalizeWindowsPath(import_node_path6.default.relative(cwd, dir));
  const parts = sub.split("/");
  let created = void 0;
  for (let p = parts.shift(), part = cwd; p && (part += "/" + p); p = parts.shift()) {
    part = normalizeWindowsPath(import_node_path6.default.resolve(part));
    if (cGet(cache, part)) {
      continue;
    }
    try {
      import_fs11.default.mkdirSync(part, mode);
      created = created || part;
      cSet(cache, part, true);
    } catch (er) {
      const st = import_fs11.default.lstatSync(part);
      if (st.isDirectory()) {
        cSet(cache, part, true);
        continue;
      } else if (unlink) {
        import_fs11.default.unlinkSync(part);
        import_fs11.default.mkdirSync(part, mode);
        created = created || part;
        cSet(cache, part, true);
        continue;
      } else if (st.isSymbolicLink()) {
        return new SymlinkError(part, part + "/" + parts.join("/"));
      }
    }
  }
  return done(created);
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/normalize-unicode.js
var normalizeCache = /* @__PURE__ */ Object.create(null);
var { hasOwnProperty } = Object.prototype;
var normalizeUnicode = (s) => {
  if (!hasOwnProperty.call(normalizeCache, s)) {
    normalizeCache[s] = s.normalize("NFD");
  }
  return normalizeCache[s];
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/path-reservations.js
var import_node_path7 = require("node:path");
var platform4 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
var isWindows2 = platform4 === "win32";
var getDirs = (path9) => {
  const dirs = path9.split("/").slice(0, -1).reduce((set, path10) => {
    const s = set[set.length - 1];
    if (s !== void 0) {
      path10 = (0, import_node_path7.join)(s, path10);
    }
    set.push(path10 || "/");
    return set;
  }, []);
  return dirs;
};
var PathReservations = class {
  // path => [function or Set]
  // A Set object means a directory reservation
  // A fn is a direct reservation on that path
  #queues = /* @__PURE__ */ new Map();
  // fn => {paths:[path,...], dirs:[path, ...]}
  #reservations = /* @__PURE__ */ new Map();
  // functions currently running
  #running = /* @__PURE__ */ new Set();
  reserve(paths, fn) {
    paths = isWindows2 ? ["win32 parallelization disabled"] : paths.map((p) => {
      return stripTrailingSlashes((0, import_node_path7.join)(normalizeUnicode(p))).toLowerCase();
    });
    const dirs = new Set(paths.map((path9) => getDirs(path9)).reduce((a, b) => a.concat(b)));
    this.#reservations.set(fn, { dirs, paths });
    for (const p of paths) {
      const q = this.#queues.get(p);
      if (!q) {
        this.#queues.set(p, [fn]);
      } else {
        q.push(fn);
      }
    }
    for (const dir of dirs) {
      const q = this.#queues.get(dir);
      if (!q) {
        this.#queues.set(dir, [/* @__PURE__ */ new Set([fn])]);
      } else {
        const l = q[q.length - 1];
        if (l instanceof Set) {
          l.add(fn);
        } else {
          q.push(/* @__PURE__ */ new Set([fn]));
        }
      }
    }
    return this.#run(fn);
  }
  // return the queues for each path the function cares about
  // fn => {paths, dirs}
  #getQueues(fn) {
    const res = this.#reservations.get(fn);
    if (!res) {
      throw new Error("function does not have any path reservations");
    }
    return {
      paths: res.paths.map((path9) => this.#queues.get(path9)),
      dirs: [...res.dirs].map((path9) => this.#queues.get(path9))
    };
  }
  // check if fn is first in line for all its paths, and is
  // included in the first set for all its dir queues
  check(fn) {
    const { paths, dirs } = this.#getQueues(fn);
    return paths.every((q) => q && q[0] === fn) && dirs.every((q) => q && q[0] instanceof Set && q[0].has(fn));
  }
  // run the function if it's first in line and not already running
  #run(fn) {
    if (this.#running.has(fn) || !this.check(fn)) {
      return false;
    }
    this.#running.add(fn);
    fn(() => this.#clear(fn));
    return true;
  }
  #clear(fn) {
    if (!this.#running.has(fn)) {
      return false;
    }
    const res = this.#reservations.get(fn);
    if (!res) {
      throw new Error("invalid reservation");
    }
    const { paths, dirs } = res;
    const next = /* @__PURE__ */ new Set();
    for (const path9 of paths) {
      const q = this.#queues.get(path9);
      if (!q || q?.[0] !== fn) {
        continue;
      }
      const q0 = q[1];
      if (!q0) {
        this.#queues.delete(path9);
        continue;
      }
      q.shift();
      if (typeof q0 === "function") {
        next.add(q0);
      } else {
        for (const f of q0) {
          next.add(f);
        }
      }
    }
    for (const dir of dirs) {
      const q = this.#queues.get(dir);
      const q0 = q?.[0];
      if (!q || !(q0 instanceof Set))
        continue;
      if (q0.size === 1 && q.length === 1) {
        this.#queues.delete(dir);
        continue;
      } else if (q0.size === 1) {
        q.shift();
        const n = q[0];
        if (typeof n === "function") {
          next.add(n);
        }
      } else {
        q0.delete(fn);
      }
    }
    this.#running.delete(fn);
    next.forEach((fn2) => this.#run(fn2));
    return true;
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/unpack.js
var ONENTRY = Symbol("onEntry");
var CHECKFS = Symbol("checkFs");
var CHECKFS2 = Symbol("checkFs2");
var PRUNECACHE = Symbol("pruneCache");
var ISREUSABLE = Symbol("isReusable");
var MAKEFS = Symbol("makeFs");
var FILE2 = Symbol("file");
var DIRECTORY2 = Symbol("directory");
var LINK = Symbol("link");
var SYMLINK2 = Symbol("symlink");
var HARDLINK2 = Symbol("hardlink");
var UNSUPPORTED = Symbol("unsupported");
var CHECKPATH = Symbol("checkPath");
var MKDIR = Symbol("mkdir");
var ONERROR = Symbol("onError");
var PENDING = Symbol("pending");
var PEND = Symbol("pend");
var UNPEND = Symbol("unpend");
var ENDED3 = Symbol("ended");
var MAYBECLOSE = Symbol("maybeClose");
var SKIP = Symbol("skip");
var DOCHOWN = Symbol("doChown");
var UID = Symbol("uid");
var GID = Symbol("gid");
var CHECKED_CWD = Symbol("checkedCwd");
var platform5 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
var isWindows3 = platform5 === "win32";
var DEFAULT_MAX_DEPTH = 1024;
var unlinkFile = (path9, cb) => {
  if (!isWindows3) {
    return import_node_fs3.default.unlink(path9, cb);
  }
  const name2 = path9 + ".DELETE." + (0, import_node_crypto.randomBytes)(16).toString("hex");
  import_node_fs3.default.rename(path9, name2, (er) => {
    if (er) {
      return cb(er);
    }
    import_node_fs3.default.unlink(name2, cb);
  });
};
var unlinkFileSync = (path9) => {
  if (!isWindows3) {
    return import_node_fs3.default.unlinkSync(path9);
  }
  const name2 = path9 + ".DELETE." + (0, import_node_crypto.randomBytes)(16).toString("hex");
  import_node_fs3.default.renameSync(path9, name2);
  import_node_fs3.default.unlinkSync(name2);
};
var uint32 = (a, b, c) => a !== void 0 && a === a >>> 0 ? a : b !== void 0 && b === b >>> 0 ? b : c;
var cacheKeyNormalize = (path9) => stripTrailingSlashes(normalizeWindowsPath(normalizeUnicode(path9))).toLowerCase();
var pruneCache = (cache, abs) => {
  abs = cacheKeyNormalize(abs);
  for (const path9 of cache.keys()) {
    const pnorm = cacheKeyNormalize(path9);
    if (pnorm === abs || pnorm.indexOf(abs + "/") === 0) {
      cache.delete(path9);
    }
  }
};
var dropCache = (cache) => {
  for (const key of cache.keys()) {
    cache.delete(key);
  }
};
var Unpack = class extends Parser3 {
  [ENDED3] = false;
  [CHECKED_CWD] = false;
  [PENDING] = 0;
  reservations = new PathReservations();
  transform;
  writable = true;
  readable = false;
  dirCache;
  uid;
  gid;
  setOwner;
  preserveOwner;
  processGid;
  processUid;
  maxDepth;
  forceChown;
  win32;
  newer;
  keep;
  noMtime;
  preservePaths;
  unlink;
  cwd;
  strip;
  processUmask;
  umask;
  dmode;
  fmode;
  chmod;
  constructor(opt = {}) {
    opt.ondone = () => {
      this[ENDED3] = true;
      this[MAYBECLOSE]();
    };
    super(opt);
    this.transform = opt.transform;
    this.dirCache = opt.dirCache || /* @__PURE__ */ new Map();
    this.chmod = !!opt.chmod;
    if (typeof opt.uid === "number" || typeof opt.gid === "number") {
      if (typeof opt.uid !== "number" || typeof opt.gid !== "number") {
        throw new TypeError("cannot set owner without number uid and gid");
      }
      if (opt.preserveOwner) {
        throw new TypeError("cannot preserve owner in archive and also set owner explicitly");
      }
      this.uid = opt.uid;
      this.gid = opt.gid;
      this.setOwner = true;
    } else {
      this.uid = void 0;
      this.gid = void 0;
      this.setOwner = false;
    }
    if (opt.preserveOwner === void 0 && typeof opt.uid !== "number") {
      this.preserveOwner = !!(process.getuid && process.getuid() === 0);
    } else {
      this.preserveOwner = !!opt.preserveOwner;
    }
    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ? process.getuid() : void 0;
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ? process.getgid() : void 0;
    this.maxDepth = typeof opt.maxDepth === "number" ? opt.maxDepth : DEFAULT_MAX_DEPTH;
    this.forceChown = opt.forceChown === true;
    this.win32 = !!opt.win32 || isWindows3;
    this.newer = !!opt.newer;
    this.keep = !!opt.keep;
    this.noMtime = !!opt.noMtime;
    this.preservePaths = !!opt.preservePaths;
    this.unlink = !!opt.unlink;
    this.cwd = normalizeWindowsPath(import_node_path8.default.resolve(opt.cwd || process.cwd()));
    this.strip = Number(opt.strip) || 0;
    this.processUmask = !this.chmod ? 0 : typeof opt.processUmask === "number" ? opt.processUmask : process.umask();
    this.umask = typeof opt.umask === "number" ? opt.umask : this.processUmask;
    this.dmode = opt.dmode || 511 & ~this.umask;
    this.fmode = opt.fmode || 438 & ~this.umask;
    this.on("entry", (entry) => this[ONENTRY](entry));
  }
  // a bad or damaged archive is a warning for Parser, but an error
  // when extracting.  Mark those errors as unrecoverable, because
  // the Unpack contract cannot be met.
  warn(code2, msg, data = {}) {
    if (code2 === "TAR_BAD_ARCHIVE" || code2 === "TAR_ABORT") {
      data.recoverable = false;
    }
    return super.warn(code2, msg, data);
  }
  [MAYBECLOSE]() {
    if (this[ENDED3] && this[PENDING] === 0) {
      this.emit("prefinish");
      this.emit("finish");
      this.emit("end");
    }
  }
  [CHECKPATH](entry) {
    const p = normalizeWindowsPath(entry.path);
    const parts = p.split("/");
    if (this.strip) {
      if (parts.length < this.strip) {
        return false;
      }
      if (entry.type === "Link") {
        const linkparts = normalizeWindowsPath(String(entry.linkpath)).split("/");
        if (linkparts.length >= this.strip) {
          entry.linkpath = linkparts.slice(this.strip).join("/");
        } else {
          return false;
        }
      }
      parts.splice(0, this.strip);
      entry.path = parts.join("/");
    }
    if (isFinite(this.maxDepth) && parts.length > this.maxDepth) {
      this.warn("TAR_ENTRY_ERROR", "path excessively deep", {
        entry,
        path: p,
        depth: parts.length,
        maxDepth: this.maxDepth
      });
      return false;
    }
    if (!this.preservePaths) {
      if (parts.includes("..") || /* c8 ignore next */
      isWindows3 && /^[a-z]:\.\.$/i.test(parts[0] ?? "")) {
        this.warn("TAR_ENTRY_ERROR", `path contains '..'`, {
          entry,
          path: p
        });
        return false;
      }
      const [root, stripped] = stripAbsolutePath(p);
      if (root) {
        entry.path = String(stripped);
        this.warn("TAR_ENTRY_INFO", `stripping ${root} from absolute path`, {
          entry,
          path: p
        });
      }
    }
    if (import_node_path8.default.isAbsolute(entry.path)) {
      entry.absolute = normalizeWindowsPath(import_node_path8.default.resolve(entry.path));
    } else {
      entry.absolute = normalizeWindowsPath(import_node_path8.default.resolve(this.cwd, entry.path));
    }
    if (!this.preservePaths && typeof entry.absolute === "string" && entry.absolute.indexOf(this.cwd + "/") !== 0 && entry.absolute !== this.cwd) {
      this.warn("TAR_ENTRY_ERROR", "path escaped extraction target", {
        entry,
        path: normalizeWindowsPath(entry.path),
        resolvedPath: entry.absolute,
        cwd: this.cwd
      });
      return false;
    }
    if (entry.absolute === this.cwd && entry.type !== "Directory" && entry.type !== "GNUDumpDir") {
      return false;
    }
    if (this.win32) {
      const { root: aRoot } = import_node_path8.default.win32.parse(String(entry.absolute));
      entry.absolute = aRoot + encode2(String(entry.absolute).slice(aRoot.length));
      const { root: pRoot } = import_node_path8.default.win32.parse(entry.path);
      entry.path = pRoot + encode2(entry.path.slice(pRoot.length));
    }
    return true;
  }
  [ONENTRY](entry) {
    if (!this[CHECKPATH](entry)) {
      return entry.resume();
    }
    import_node_assert.default.equal(typeof entry.absolute, "string");
    switch (entry.type) {
      case "Directory":
      case "GNUDumpDir":
        if (entry.mode) {
          entry.mode = entry.mode | 448;
        }
      case "File":
      case "OldFile":
      case "ContiguousFile":
      case "Link":
      case "SymbolicLink":
        return this[CHECKFS](entry);
      case "CharacterDevice":
      case "BlockDevice":
      case "FIFO":
      default:
        return this[UNSUPPORTED](entry);
    }
  }
  [ONERROR](er, entry) {
    if (er.name === "CwdError") {
      this.emit("error", er);
    } else {
      this.warn("TAR_ENTRY_ERROR", er, { entry });
      this[UNPEND]();
      entry.resume();
    }
  }
  [MKDIR](dir, mode, cb) {
    mkdir3(normalizeWindowsPath(dir), {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode
    }, cb);
  }
  [DOCHOWN](entry) {
    return this.forceChown || this.preserveOwner && (typeof entry.uid === "number" && entry.uid !== this.processUid || typeof entry.gid === "number" && entry.gid !== this.processGid) || typeof this.uid === "number" && this.uid !== this.processUid || typeof this.gid === "number" && this.gid !== this.processGid;
  }
  [UID](entry) {
    return uint32(this.uid, entry.uid, this.processUid);
  }
  [GID](entry) {
    return uint32(this.gid, entry.gid, this.processGid);
  }
  [FILE2](entry, fullyDone) {
    const mode = typeof entry.mode === "number" ? entry.mode & 4095 : this.fmode;
    const stream = new WriteStream(String(entry.absolute), {
      // slight lie, but it can be numeric flags
      flags: getWriteFlag(entry.size),
      mode,
      autoClose: false
    });
    stream.on("error", (er) => {
      if (stream.fd) {
        import_node_fs3.default.close(stream.fd, () => {
        });
      }
      stream.write = () => true;
      this[ONERROR](er, entry);
      fullyDone();
    });
    let actions = 1;
    const done = (er) => {
      if (er) {
        if (stream.fd) {
          import_node_fs3.default.close(stream.fd, () => {
          });
        }
        this[ONERROR](er, entry);
        fullyDone();
        return;
      }
      if (--actions === 0) {
        if (stream.fd !== void 0) {
          import_node_fs3.default.close(stream.fd, (er2) => {
            if (er2) {
              this[ONERROR](er2, entry);
            } else {
              this[UNPEND]();
            }
            fullyDone();
          });
        }
      }
    };
    stream.on("finish", () => {
      const abs = String(entry.absolute);
      const fd = stream.fd;
      if (typeof fd === "number" && entry.mtime && !this.noMtime) {
        actions++;
        const atime = entry.atime || /* @__PURE__ */ new Date();
        const mtime = entry.mtime;
        import_node_fs3.default.futimes(fd, atime, mtime, (er) => er ? import_node_fs3.default.utimes(abs, atime, mtime, (er2) => done(er2 && er)) : done());
      }
      if (typeof fd === "number" && this[DOCHOWN](entry)) {
        actions++;
        const uid = this[UID](entry);
        const gid = this[GID](entry);
        if (typeof uid === "number" && typeof gid === "number") {
          import_node_fs3.default.fchown(fd, uid, gid, (er) => er ? import_node_fs3.default.chown(abs, uid, gid, (er2) => done(er2 && er)) : done());
        }
      }
      done();
    });
    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on("error", (er) => {
        this[ONERROR](er, entry);
        fullyDone();
      });
      entry.pipe(tx);
    }
    tx.pipe(stream);
  }
  [DIRECTORY2](entry, fullyDone) {
    const mode = typeof entry.mode === "number" ? entry.mode & 4095 : this.dmode;
    this[MKDIR](String(entry.absolute), mode, (er) => {
      if (er) {
        this[ONERROR](er, entry);
        fullyDone();
        return;
      }
      let actions = 1;
      const done = () => {
        if (--actions === 0) {
          fullyDone();
          this[UNPEND]();
          entry.resume();
        }
      };
      if (entry.mtime && !this.noMtime) {
        actions++;
        import_node_fs3.default.utimes(String(entry.absolute), entry.atime || /* @__PURE__ */ new Date(), entry.mtime, done);
      }
      if (this[DOCHOWN](entry)) {
        actions++;
        import_node_fs3.default.chown(String(entry.absolute), Number(this[UID](entry)), Number(this[GID](entry)), done);
      }
      done();
    });
  }
  [UNSUPPORTED](entry) {
    entry.unsupported = true;
    this.warn("TAR_ENTRY_UNSUPPORTED", `unsupported entry type: ${entry.type}`, { entry });
    entry.resume();
  }
  [SYMLINK2](entry, done) {
    this[LINK](entry, String(entry.linkpath), "symlink", done);
  }
  [HARDLINK2](entry, done) {
    const linkpath = normalizeWindowsPath(import_node_path8.default.resolve(this.cwd, String(entry.linkpath)));
    this[LINK](entry, linkpath, "link", done);
  }
  [PEND]() {
    this[PENDING]++;
  }
  [UNPEND]() {
    this[PENDING]--;
    this[MAYBECLOSE]();
  }
  [SKIP](entry) {
    this[UNPEND]();
    entry.resume();
  }
  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE](entry, st) {
    return entry.type === "File" && !this.unlink && st.isFile() && st.nlink <= 1 && !isWindows3;
  }
  // check if a thing is there, and if so, try to clobber it
  [CHECKFS](entry) {
    this[PEND]();
    const paths = [entry.path];
    if (entry.linkpath) {
      paths.push(entry.linkpath);
    }
    this.reservations.reserve(paths, (done) => this[CHECKFS2](entry, done));
  }
  [PRUNECACHE](entry) {
    if (entry.type === "SymbolicLink") {
      dropCache(this.dirCache);
    } else if (entry.type !== "Directory") {
      pruneCache(this.dirCache, String(entry.absolute));
    }
  }
  [CHECKFS2](entry, fullyDone) {
    this[PRUNECACHE](entry);
    const done = (er) => {
      this[PRUNECACHE](entry);
      fullyDone(er);
    };
    const checkCwd2 = () => {
      this[MKDIR](this.cwd, this.dmode, (er) => {
        if (er) {
          this[ONERROR](er, entry);
          done();
          return;
        }
        this[CHECKED_CWD] = true;
        start();
      });
    };
    const start = () => {
      if (entry.absolute !== this.cwd) {
        const parent = normalizeWindowsPath(import_node_path8.default.dirname(String(entry.absolute)));
        if (parent !== this.cwd) {
          return this[MKDIR](parent, this.dmode, (er) => {
            if (er) {
              this[ONERROR](er, entry);
              done();
              return;
            }
            afterMakeParent();
          });
        }
      }
      afterMakeParent();
    };
    const afterMakeParent = () => {
      import_node_fs3.default.lstat(String(entry.absolute), (lstatEr, st) => {
        if (st && (this.keep || /* c8 ignore next */
        this.newer && st.mtime > (entry.mtime ?? st.mtime))) {
          this[SKIP](entry);
          done();
          return;
        }
        if (lstatEr || this[ISREUSABLE](entry, st)) {
          return this[MAKEFS](null, entry, done);
        }
        if (st.isDirectory()) {
          if (entry.type === "Directory") {
            const needChmod = this.chmod && entry.mode && (st.mode & 4095) !== entry.mode;
            const afterChmod = (er) => this[MAKEFS](er ?? null, entry, done);
            if (!needChmod) {
              return afterChmod();
            }
            return import_node_fs3.default.chmod(String(entry.absolute), Number(entry.mode), afterChmod);
          }
          if (entry.absolute !== this.cwd) {
            return import_node_fs3.default.rmdir(String(entry.absolute), (er) => this[MAKEFS](er ?? null, entry, done));
          }
        }
        if (entry.absolute === this.cwd) {
          return this[MAKEFS](null, entry, done);
        }
        unlinkFile(String(entry.absolute), (er) => this[MAKEFS](er ?? null, entry, done));
      });
    };
    if (this[CHECKED_CWD]) {
      start();
    } else {
      checkCwd2();
    }
  }
  [MAKEFS](er, entry, done) {
    if (er) {
      this[ONERROR](er, entry);
      done();
      return;
    }
    switch (entry.type) {
      case "File":
      case "OldFile":
      case "ContiguousFile":
        return this[FILE2](entry, done);
      case "Link":
        return this[HARDLINK2](entry, done);
      case "SymbolicLink":
        return this[SYMLINK2](entry, done);
      case "Directory":
      case "GNUDumpDir":
        return this[DIRECTORY2](entry, done);
    }
  }
  [LINK](entry, linkpath, link, done) {
    import_node_fs3.default[link](linkpath, String(entry.absolute), (er) => {
      if (er) {
        this[ONERROR](er, entry);
      } else {
        this[UNPEND]();
        entry.resume();
      }
      done();
    });
  }
};
var callSync = (fn) => {
  try {
    return [null, fn()];
  } catch (er) {
    return [er, null];
  }
};
var UnpackSync = class extends Unpack {
  sync = true;
  [MAKEFS](er, entry) {
    return super[MAKEFS](er, entry, () => {
    });
  }
  [CHECKFS](entry) {
    this[PRUNECACHE](entry);
    if (!this[CHECKED_CWD]) {
      const er2 = this[MKDIR](this.cwd, this.dmode);
      if (er2) {
        return this[ONERROR](er2, entry);
      }
      this[CHECKED_CWD] = true;
    }
    if (entry.absolute !== this.cwd) {
      const parent = normalizeWindowsPath(import_node_path8.default.dirname(String(entry.absolute)));
      if (parent !== this.cwd) {
        const mkParent = this[MKDIR](parent, this.dmode);
        if (mkParent) {
          return this[ONERROR](mkParent, entry);
        }
      }
    }
    const [lstatEr, st] = callSync(() => import_node_fs3.default.lstatSync(String(entry.absolute)));
    if (st && (this.keep || /* c8 ignore next */
    this.newer && st.mtime > (entry.mtime ?? st.mtime))) {
      return this[SKIP](entry);
    }
    if (lstatEr || this[ISREUSABLE](entry, st)) {
      return this[MAKEFS](null, entry);
    }
    if (st.isDirectory()) {
      if (entry.type === "Directory") {
        const needChmod = this.chmod && entry.mode && (st.mode & 4095) !== entry.mode;
        const [er3] = needChmod ? callSync(() => {
          import_node_fs3.default.chmodSync(String(entry.absolute), Number(entry.mode));
        }) : [];
        return this[MAKEFS](er3, entry);
      }
      const [er2] = callSync(() => import_node_fs3.default.rmdirSync(String(entry.absolute)));
      this[MAKEFS](er2, entry);
    }
    const [er] = entry.absolute === this.cwd ? [] : callSync(() => unlinkFileSync(String(entry.absolute)));
    this[MAKEFS](er, entry);
  }
  [FILE2](entry, done) {
    const mode = typeof entry.mode === "number" ? entry.mode & 4095 : this.fmode;
    const oner = (er) => {
      let closeError;
      try {
        import_node_fs3.default.closeSync(fd);
      } catch (e) {
        closeError = e;
      }
      if (er || closeError) {
        this[ONERROR](er || closeError, entry);
      }
      done();
    };
    let fd;
    try {
      fd = import_node_fs3.default.openSync(String(entry.absolute), getWriteFlag(entry.size), mode);
    } catch (er) {
      return oner(er);
    }
    const tx = this.transform ? this.transform(entry) || entry : entry;
    if (tx !== entry) {
      tx.on("error", (er) => this[ONERROR](er, entry));
      entry.pipe(tx);
    }
    tx.on("data", (chunk) => {
      try {
        import_node_fs3.default.writeSync(fd, chunk, 0, chunk.length);
      } catch (er) {
        oner(er);
      }
    });
    tx.on("end", () => {
      let er = null;
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || /* @__PURE__ */ new Date();
        const mtime = entry.mtime;
        try {
          import_node_fs3.default.futimesSync(fd, atime, mtime);
        } catch (futimeser) {
          try {
            import_node_fs3.default.utimesSync(String(entry.absolute), atime, mtime);
          } catch (utimeser) {
            er = futimeser;
          }
        }
      }
      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry);
        const gid = this[GID](entry);
        try {
          import_node_fs3.default.fchownSync(fd, Number(uid), Number(gid));
        } catch (fchowner) {
          try {
            import_node_fs3.default.chownSync(String(entry.absolute), Number(uid), Number(gid));
          } catch (chowner) {
            er = er || fchowner;
          }
        }
      }
      oner(er);
    });
  }
  [DIRECTORY2](entry, done) {
    const mode = typeof entry.mode === "number" ? entry.mode & 4095 : this.dmode;
    const er = this[MKDIR](String(entry.absolute), mode);
    if (er) {
      this[ONERROR](er, entry);
      done();
      return;
    }
    if (entry.mtime && !this.noMtime) {
      try {
        import_node_fs3.default.utimesSync(String(entry.absolute), entry.atime || /* @__PURE__ */ new Date(), entry.mtime);
      } catch (er2) {
      }
    }
    if (this[DOCHOWN](entry)) {
      try {
        import_node_fs3.default.chownSync(String(entry.absolute), Number(this[UID](entry)), Number(this[GID](entry)));
      } catch (er2) {
      }
    }
    done();
    entry.resume();
  }
  [MKDIR](dir, mode) {
    try {
      return mkdirSync3(normalizeWindowsPath(dir), {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode
      });
    } catch (er) {
      return er;
    }
  }
  [LINK](entry, linkpath, link, done) {
    const ls = `${link}Sync`;
    try {
      import_node_fs3.default[ls](linkpath, String(entry.absolute));
      done();
      entry.resume();
    } catch (er) {
      return this[ONERROR](er, entry);
    }
  }
};

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/extract.js
var extractFileSync = (opt) => {
  const u = new UnpackSync(opt);
  const file = opt.file;
  const stat2 = import_node_fs4.default.statSync(file);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;
  const stream = new ReadStreamSync(file, {
    readSize,
    size: stat2.size
  });
  stream.pipe(u);
};
var extractFile = (opt, _) => {
  const u = new Unpack(opt);
  const readSize = opt.maxReadSize || 16 * 1024 * 1024;
  const file = opt.file;
  const p = new Promise((resolve6, reject) => {
    u.on("error", reject);
    u.on("close", resolve6);
    import_node_fs4.default.stat(file, (er, stat2) => {
      if (er) {
        reject(er);
      } else {
        const stream = new ReadStream(file, {
          readSize,
          size: stat2.size
        });
        stream.on("error", reject);
        stream.pipe(u);
      }
    });
  });
  return p;
};
var extract = makeCommand(extractFileSync, extractFile, (opt) => new UnpackSync(opt), (opt) => new Unpack(opt), (opt, files) => {
  if (files?.length)
    filesFilter(opt, files);
});

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/replace.js
var import_node_fs5 = __toESM(require("node:fs"), 1);
var import_node_path9 = __toESM(require("node:path"), 1);
var replaceSync = (opt, files) => {
  const p = new PackSync(opt);
  let threw = true;
  let fd;
  let position;
  try {
    try {
      fd = import_node_fs5.default.openSync(opt.file, "r+");
    } catch (er) {
      if (er?.code === "ENOENT") {
        fd = import_node_fs5.default.openSync(opt.file, "w+");
      } else {
        throw er;
      }
    }
    const st = import_node_fs5.default.fstatSync(fd);
    const headBuf = Buffer.alloc(512);
    POSITION: for (position = 0; position < st.size; position += 512) {
      for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
        bytes = import_node_fs5.default.readSync(fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos);
        if (position === 0 && headBuf[0] === 31 && headBuf[1] === 139) {
          throw new Error("cannot append to compressed archives");
        }
        if (!bytes) {
          break POSITION;
        }
      }
      const h = new Header(headBuf);
      if (!h.cksumValid) {
        break;
      }
      const entryBlockSize = 512 * Math.ceil((h.size || 0) / 512);
      if (position + entryBlockSize + 512 > st.size) {
        break;
      }
      position += entryBlockSize;
      if (opt.mtimeCache && h.mtime) {
        opt.mtimeCache.set(String(h.path), h.mtime);
      }
    }
    threw = false;
    streamSync(opt, p, position, fd, files);
  } finally {
    if (threw) {
      try {
        import_node_fs5.default.closeSync(fd);
      } catch (er) {
      }
    }
  }
};
var streamSync = (opt, p, position, fd, files) => {
  const stream = new WriteStreamSync(opt.file, {
    fd,
    start: position
  });
  p.pipe(stream);
  addFilesSync2(p, files);
};
var replaceAsync = (opt, files) => {
  files = Array.from(files);
  const p = new Pack(opt);
  const getPos = (fd, size, cb_) => {
    const cb = (er, pos2) => {
      if (er) {
        import_node_fs5.default.close(fd, (_) => cb_(er));
      } else {
        cb_(null, pos2);
      }
    };
    let position = 0;
    if (size === 0) {
      return cb(null, 0);
    }
    let bufPos = 0;
    const headBuf = Buffer.alloc(512);
    const onread = (er, bytes) => {
      if (er || typeof bytes === "undefined") {
        return cb(er);
      }
      bufPos += bytes;
      if (bufPos < 512 && bytes) {
        return import_node_fs5.default.read(fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos, onread);
      }
      if (position === 0 && headBuf[0] === 31 && headBuf[1] === 139) {
        return cb(new Error("cannot append to compressed archives"));
      }
      if (bufPos < 512) {
        return cb(null, position);
      }
      const h = new Header(headBuf);
      if (!h.cksumValid) {
        return cb(null, position);
      }
      const entryBlockSize = 512 * Math.ceil((h.size ?? 0) / 512);
      if (position + entryBlockSize + 512 > size) {
        return cb(null, position);
      }
      position += entryBlockSize + 512;
      if (position >= size) {
        return cb(null, position);
      }
      if (opt.mtimeCache && h.mtime) {
        opt.mtimeCache.set(String(h.path), h.mtime);
      }
      bufPos = 0;
      import_node_fs5.default.read(fd, headBuf, 0, 512, position, onread);
    };
    import_node_fs5.default.read(fd, headBuf, 0, 512, position, onread);
  };
  const promise = new Promise((resolve6, reject) => {
    p.on("error", reject);
    let flag = "r+";
    const onopen = (er, fd) => {
      if (er && er.code === "ENOENT" && flag === "r+") {
        flag = "w+";
        return import_node_fs5.default.open(opt.file, flag, onopen);
      }
      if (er || !fd) {
        return reject(er);
      }
      import_node_fs5.default.fstat(fd, (er2, st) => {
        if (er2) {
          return import_node_fs5.default.close(fd, () => reject(er2));
        }
        getPos(fd, st.size, (er3, position) => {
          if (er3) {
            return reject(er3);
          }
          const stream = new WriteStream(opt.file, {
            fd,
            start: position
          });
          p.pipe(stream);
          stream.on("error", reject);
          stream.on("close", resolve6);
          addFilesAsync2(p, files);
        });
      });
    };
    import_node_fs5.default.open(opt.file, flag, onopen);
  });
  return promise;
};
var addFilesSync2 = (p, files) => {
  files.forEach((file) => {
    if (file.charAt(0) === "@") {
      list({
        file: import_node_path9.default.resolve(p.cwd, file.slice(1)),
        sync: true,
        noResume: true,
        onReadEntry: (entry) => p.add(entry)
      });
    } else {
      p.add(file);
    }
  });
  p.end();
};
var addFilesAsync2 = async (p, files) => {
  for (let i = 0; i < files.length; i++) {
    const file = String(files[i]);
    if (file.charAt(0) === "@") {
      await list({
        file: import_node_path9.default.resolve(String(p.cwd), file.slice(1)),
        noResume: true,
        onReadEntry: (entry) => p.add(entry)
      });
    } else {
      p.add(file);
    }
  }
  p.end();
};
var replace = makeCommand(
  replaceSync,
  replaceAsync,
  /* c8 ignore start */
  () => {
    throw new TypeError("file is required");
  },
  () => {
    throw new TypeError("file is required");
  },
  /* c8 ignore stop */
  (opt, entries) => {
    if (!isFile(opt)) {
      throw new TypeError("file is required");
    }
    if (opt.gzip || opt.brotli || opt.file.endsWith(".br") || opt.file.endsWith(".tbr")) {
      throw new TypeError("cannot append to compressed archives");
    }
    if (!entries?.length) {
      throw new TypeError("no paths specified to add/replace");
    }
  }
);

// node_modules/.pnpm/tar@7.4.3/node_modules/tar/dist/esm/update.js
var update = makeCommand(replace.syncFile, replace.asyncFile, replace.syncNoFile, replace.asyncNoFile, (opt, entries = []) => {
  replace.validate?.(opt, entries);
  mtimeFilter(opt);
});
var mtimeFilter = (opt) => {
  const filter = opt.filter;
  if (!opt.mtimeCache) {
    opt.mtimeCache = /* @__PURE__ */ new Map();
  }
  opt.filter = filter ? (path9, stat2) => filter(path9, stat2) && !/* c8 ignore start */
  ((opt.mtimeCache?.get(path9) ?? stat2.mtime ?? 0) > (stat2.mtime ?? 0)) : (path9, stat2) => !/* c8 ignore start */
  ((opt.mtimeCache?.get(path9) ?? stat2.mtime ?? 0) > (stat2.mtime ?? 0));
};

// gh-pages/gh-pages.ts
async function deployPages(dir, config) {
  return new Promise((resolve6, reject) => {
    import_gh_pages.default.publish(dir, config, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve6();
      }
    });
  });
}
async function expandTarball(tarball) {
  const tempDir = import_path12.default.join(__dirname, "temp");
  await import_fs12.default.promises.mkdir(tempDir, { recursive: true });
  await extract({
    cwd: tempDir,
    file: tarball
  });
  return tempDir;
}
var isTarball = (file) => file.endsWith(".tar.gz") || file.endsWith(".tar") || file.endsWith(".tar.xz");
async function main(args) {
  const {
    srcDir,
    repo,
    branch,
    version: version_file,
    gh_user,
    gh_email,
    dest_dir
  } = args;
  const normalized_dest_dir = String(dest_dir);
  const version2 = await import_fs12.default.promises.readFile(version_file, "utf8");
  let cleanup = false;
  let upload_root = srcDir;
  if (isTarball(srcDir)) {
    cleanup = true;
    upload_root = await expandTarball(srcDir);
  }
  if (!normalized_dest_dir) {
    throw new Error("Unable to upload without a destination directory");
  }
  const config = {
    branch,
    repo: `https://@github.com/${repo}.git`,
    dest: normalized_dest_dir,
    dotFiles: true,
    add: false,
    verbose: false,
    message: `Deploying docs for ${version2}`,
    user: {
      name: gh_user,
      email: gh_email
    }
  };
  await deployPages(upload_root, config);
  if (cleanup) {
    await import_fs12.default.promises.rm(upload_root, { recursive: true });
  }
}
var parsed = yargs_default(hideBin(process.argv)).version(false).parse();
main(parsed).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

yargs-parser/build/lib/string-utils.js:
  (**
   * @license
   * Copyright (c) 2016, Contributors
   * SPDX-License-Identifier: ISC
   *)

yargs-parser/build/lib/tokenize-arg-string.js:
  (**
   * @license
   * Copyright (c) 2016, Contributors
   * SPDX-License-Identifier: ISC
   *)

yargs-parser/build/lib/yargs-parser-types.js:
  (**
   * @license
   * Copyright (c) 2016, Contributors
   * SPDX-License-Identifier: ISC
   *)

yargs-parser/build/lib/yargs-parser.js:
  (**
   * @license
   * Copyright (c) 2016, Contributors
   * SPDX-License-Identifier: ISC
   *)

yargs-parser/build/lib/index.js:
  (**
   * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
   * CJS and ESM environments.
   *
   * @license
   * Copyright (c) 2016, Contributors
   * SPDX-License-Identifier: ISC
   *)
*/
