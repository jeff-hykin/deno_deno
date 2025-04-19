// 
// 
// polyfills for glob.ts
// 
// 

    // 
    // this section is just for validateObject, validateString, validateStringArray, hideStackFrames
    // 
        type GenericFunction = (...args: any[]) => any;

        /** This function removes unnecessary frames from Node.js core errors. */
        function hideStackFrames<T extends GenericFunction = GenericFunction>(
            fn: T,
        ): T {
            // We rename the functions that will be hidden to cut off the stacktrace
            // at the outermost one.
            const hidden = "__node_internal_" + fn.name;
            Object.defineProperty(fn, "name", { value: hidden });

            return fn;
        }

        /**
         * @param {unknown} value
         * @param {string} name
         * @param {{
         *   allowArray?: boolean,
         *   allowFunction?: boolean,
         *   nullable?: boolean
         * }} [options]
         */
        const validateObject = hideStackFrames((value, name, options) => {
            const useDefaultOptions = options == null;
            const allowArray = useDefaultOptions ? false : options.allowArray;
            const allowFunction = useDefaultOptions ? false : options.allowFunction;
            const nullable = useDefaultOptions ? false : options.nullable;
            if (
                (!nullable && value === null) ||
                (!allowArray && Array.isArray(value)) ||
                (typeof value !== "object" && (
                    !allowFunction || typeof value !== "function"
                ))
            ) {
                throw new Error(name, "Object", value);
            }
        });

        /**
         * @param {unknown} value
         * @param {string} name
         */
        function validateString(value, name) {
            if (typeof value !== "string") {
                throw new Error(name, "string", value);
                // throw new codes.ERR_INVALID_ARG_TYPE(name, "string", value);
            }
        }


        /**
         * @param {unknown} value
         * @param {string} name
         */
        const validateArray = hideStackFrames(
            (value, name, minLength = 0) => {
                if (!Array.isArray(value)) {
                    throw new Error(name, "Array", value);
                //   throw new codes.ERR_INVALID_ARG_TYPE(name, "Array", value);
                }
                if (value.length < minLength) {
                    const reason = `must be longer than ${minLength}`;
                    throw new Error(name, value, reason);
                //   throw new codes.ERR_INVALID_ARG_VALUE(name, value, reason);
                }
            },
        );

        /**
         * @callback validateStringArray
         * @param {*} value
         * @param {string} name
         * @returns {asserts value is string[]}
         */

        /** @type {validateStringArray} */
        const validateStringArray = hideStackFrames((value, name) => {
            validateArray(value, name);
            for (let i = 0; i < value.length; ++i) {
                // Don't use validateString here for performance reasons, as
                // we would generate intermediate strings for the name.
                if (typeof value[i] !== "string") {
                    throw new Error(`${name}[${i}]`, "string", value[i]);
                //   throw new codes.ERR_INVALID_ARG_TYPE(`${name}[${i}]`, "string", value[i]);
                }
            }
        });


    // 
    // this section is just to get DirentFromStats
    // 
        const fsConstants = {
            UV_FS_SYMLINK_DIR: 1,
            UV_FS_SYMLINK_JUNCTION: 2,
            O_RDONLY: 0,
            O_WRONLY: 1,
            O_RDWR: 2,
            UV_DIRENT_UNKNOWN: 0,
            UV_DIRENT_FILE: 1,
            UV_DIRENT_DIR: 2,
            UV_DIRENT_LINK: 3,
            UV_DIRENT_FIFO: 4,
            UV_DIRENT_SOCKET: 5,
            UV_DIRENT_CHAR: 6,
            UV_DIRENT_BLOCK: 7,
            S_IFMT: 61440,
            S_IFREG: 32768,
            S_IFDIR: 16384,
            S_IFCHR: 8192,
            S_IFBLK: 24576,
            S_IFIFO: 4096,
            S_IFLNK: 40960,
            S_IFSOCK: 49152,
            O_CREAT: 512,
            O_EXCL: 2048,
            UV_FS_O_FILEMAP: 0,
            O_NOCTTY: 131072,
            O_TRUNC: 1024,
            O_APPEND: 8,
            O_DIRECTORY: 1048576,
            O_NOFOLLOW: 256,
            O_SYNC: 128,
            O_DSYNC: 4194304,
            O_SYMLINK: 2097152,
            O_NONBLOCK: 4,
            S_IRWXU: 448,
            S_IRUSR: 256,
            S_IWUSR: 128,
            S_IXUSR: 64,
            S_IRWXG: 56,
            S_IRGRP: 32,
            S_IWGRP: 16,
            S_IXGRP: 8,
            S_IRWXO: 7,
            S_IROTH: 4,
            S_IWOTH: 2,
            S_IXOTH: 1,
            F_OK: 0,
            R_OK: 4,
            W_OK: 2,
            X_OK: 1,
            UV_FS_COPYFILE_EXCL: 1,
            COPYFILE_EXCL: 1,
            UV_FS_COPYFILE_FICLONE: 2,
            COPYFILE_FICLONE: 2,
            UV_FS_COPYFILE_FICLONE_FORCE: 4,
            COPYFILE_FICLONE_FORCE: 4,
        }
        const kType = Symbol("type");
        const kStats = Symbol("stats");
        class Dirent {
            constructor(name, type, path) {
                this.name = name;
                this.parentPath = path;
                this[kType] = type;
            }

            isDirectory() {
                return this[kType] === fsConstants.UV_DIRENT_DIR;
            }

            isFile() {
                return this[kType] === fsConstants.UV_DIRENT_FILE;
            }

            isBlockDevice() {
                return this[kType] === fsConstants.UV_DIRENT_BLOCK;
            }

            isCharacterDevice() {
                return this[kType] === fsConstants.UV_DIRENT_CHAR;
            }

            isSymbolicLink() {
                return this[kType] === fsConstants.UV_DIRENT_LINK;
            }

            isFIFO() {
                return this[kType] === fsConstants.UV_DIRENT_FIFO;
            }

            isSocket() {
                return this[kType] === fsConstants.UV_DIRENT_SOCKET;
            }
        }

        class DirentFromStats extends Dirent {
            constructor(name, stats, path) {
                super(name, null, path);
                this[kStats] = stats;
            }
        }

        for (const name of Reflect.ownKeys(Dirent.prototype)) {
            if (name === "constructor") {
                continue;
            }
            DirentFromStats.prototype[name] = function () {
                return this[kStats][name]();
            };
        }

    // 
    // this section is just to get ERR_INVALID_ARG_TYPE: 
    // import {
    //    ERR_INVALID_ARG_TYPE,
    //    hideStackFrames,
    // } from "ext:deno_node/internal/errors.ts";
    // 
        import { inspect } from "node:util";

        class NodeErrorAbstraction extends Error {
            code: string;

            constructor(name: string, code: string, message: string) {
                super(message);
                this.code = code;
                this.name = name;
                this.stack = this.stack &&
                    `${name} [${this.code}]${this.stack.slice(this.name.length)}`;
            }

            override toString() {
                return `${this.name} [${this.code}]: ${this.message}`;
            }
        }

        class NodeTypeError extends NodeErrorAbstraction implements TypeError {
            constructor(code: string, message: string) {
                super(TypeError.prototype.name, code, message);
                Object.setPrototypeOf(this, TypeError.prototype);
                this.toString = function () {
                    return `${this.name} [${this.code}]: ${this.message}`;
                };
            }
        }

        function createInvalidArgType(
            name: string,
            expected: string | string[],
        ): string {
            // https://github.com/nodejs/node/blob/f3eb224/lib/internal/errors.js#L1037-L1087
            expected = Array.isArray(expected) ? expected : [expected];
            let msg = "The ";
            if (name.endsWith(" argument")) {
                // For cases like 'first argument'
                msg += `${name} `;
            } else {
                const type = name.includes(".") ? "property" : "argument";
                msg += `"${name}" ${type} `;
            }
            msg += "must be ";

            const types = [];
            const instances = [];
            const other = [];
            for (const value of expected) {
                if (kTypes.includes(value)) {
                    types.push(value.toLocaleLowerCase());
                } else if (classRegExp.test(value)) {
                    instances.push(value);
                } else {
                    other.push(value);
                }
            }

            // Special handle `object` in case other instances are allowed to outline
            // the differences between each other.
            if (instances.length > 0) {
                const pos = types.indexOf("object");
                if (pos !== -1) {
                    types.splice(pos, 1);
                    instances.push("Object");
                }
            }

            if (types.length > 0) {
                if (types.length > 2) {
                    const last = types.pop();
                    msg += `one of type ${types.join(", ")}, or ${last}`;
                } else if (types.length === 2) {
                    msg += `one of type ${types[0]} or ${types[1]}`;
                } else {
                    msg += `of type ${types[0]}`;
                }
                if (instances.length > 0 || other.length > 0) {
                    msg += " or ";
                }
            }

            if (instances.length > 0) {
                if (instances.length > 2) {
                    const last = instances.pop();
                    msg += `an instance of ${instances.join(", ")}, or ${last}`;
                } else {
                    msg += `an instance of ${instances[0]}`;
                    if (instances.length === 2) {
                        msg += ` or ${instances[1]}`;
                    }
                }
                if (other.length > 0) {
                    msg += " or ";
                }
            }

            if (other.length > 0) {
                if (other.length > 2) {
                    const last = other.pop();
                    msg += `one of ${other.join(", ")}, or ${last}`;
                } else if (other.length === 2) {
                    msg += `one of ${other[0]} or ${other[1]}`;
                } else {
                    if (other[0].toLowerCase() !== other[0]) {
                        msg += "an ";
                    }
                    msg += `${other[0]}`;
                }
            }

            return msg;
        }

        function invalidArgTypeHelper(input: any) {
            if (input == null) {
                return ` Received ${input}`;
            }
            if (typeof input === "function" && input.name) {
                return ` Received function ${input.name}`;
            }
            if (typeof input === "object") {
                if (input.constructor && input.constructor.name) {
                    return ` Received an instance of ${input.constructor.name}`;
                }
                return ` Received ${inspect(input, { depth: -1 })}`;
            }
            let inspected = inspect(input, { colors: false });
            if (inspected.length > 25) {
                inspected = `${inspected.slice(0, 25)}...`;
            }
            return ` Received type ${typeof input} (${inspected})`;
        }

        class NodeRangeError extends NodeErrorAbstraction {
            constructor(code: string, message: string) {
                super(RangeError.prototype.name, code, message);
                Object.setPrototypeOf(this, RangeError.prototype);
                this.toString = function () {
                    return `${this.name} [${this.code}]: ${this.message}`;
                };
            }
        }

        class ERR_INVALID_ARG_TYPE_RANGE extends NodeRangeError {
            constructor(name: string, expected: string | string[], actual: unknown) {
                const msg = createInvalidArgType(name, expected);

                super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
            }
        }

        class ERR_INVALID_ARG_TYPE extends NodeTypeError {
            constructor(name: string, expected: string | string[], actual: unknown) {
                const msg = createInvalidArgType(name, expected);
                super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
            }

            static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
        }

    // 
    // 
    // modified imports for glob.ts
    // 
    // 

        // import { validateObject, validateString, validateStringArray } from "ext:deno_node/internal/validators.mjs";
        // import { isWindows, isMacOS } from "node:util/os";
        const isWindows = globalThis.Deno?.build?.os === "windows";
        const isMacOS = globalThis.Deno?.build?.os === "darwin";
        // import { kEmptyObject } from "node:util";
        const kEmptyObject = Object.freeze(Object.create(null))

        import { readdirSync, lstatSync } from "node:fs";
        import { readdir, lstat } from "node:fs/promises";
        import { join, resolve, basename, isAbsolute, dirname } from "node:path";
        // import { DirentFromStats } from "ext:node/polyfills/internal/fs/utils.mjs"

        // import {
        // //   ERR_INVALID_ARG_TYPE,
        // //   hideStackFrames,
        // } from "ext:deno_node/internal/errors.ts";

        import assert from "node:assert"
        // import minimatch from "npm:minimatch"
        // import {minimatch} from "https://esm.sh/minimatch@10.0.1" 
        import {minimatch} from "https://esm.sh/minimatch@9.0.5" // based on deno 2.2.11's version

// 
// 
// types for glob.ts
//
// 

    // import type Dirent from "ext:deno_node/_fs/_fs_dirent.ts";
    // import type { ErrnoException } from "ext:deno_node/_global.d.ts";

    interface GlobOptionsBase {
        /**
         * Current working directory.
         * @default process.cwd()
         */
        cwd?: string | undefined;
        /**
         * `true` if the glob should return paths as `Dirent`s, `false` otherwise.
         * @default false
         * @since v22.2.0
         */
        withFileTypes?: boolean | undefined;
        /**
         * Function to filter out files/directories. Return true to exclude the item, false to include it.
         */
        exclude?: ((fileName: any) => boolean) | undefined;
    }
    export interface GlobOptionsWithFileTypes extends GlobOptionsBase {
        exclude?: ((fileName: Dirent) => boolean) | undefined;
        withFileTypes: true;
    }
    export interface GlobOptionsWithoutFileTypes extends GlobOptionsBase {
        exclude?: ((fileName: string) => boolean) | undefined;
        withFileTypes?: false | undefined;
    }
    export interface GlobOptions extends GlobOptionsBase {
        exclude?: ((fileName: Dirent | string) => boolean) | undefined;
    }

    export type GlobOptionsU = GlobOptionsWithFileTypes | GlobOptionsWithoutFileTypes | GlobOptions;

    export type GlobCallback<Args extends unknown[]> = (e: ErrnoException | null, ...args: Args) => unknown;

// 
// 
// actual start of glob.ts
// 
// 
const nop = () => {};

// primordials are normally imported, this is a shim for userland
const primordials = {
    ArrayFrom: (...args) => Array.from(...args),
    ArrayIsArray: (thisArg) => Array.isArray(thisArg),
    ArrayPrototypeAt: (thisArg, ...args) => Array.prototype.at.apply(thisArg, args),
    ArrayPrototypeMap: (thisArg, ...args) => Array.prototype.map.apply(thisArg, args),
    ArrayPrototypePop: (thisArg, ...args) => Array.prototype.pop.apply(thisArg, args),
    ArrayPrototypePush: (thisArg, ...args) => Array.prototype.push.apply(thisArg, args),
    ArrayPrototypeSome: (thisArg, ...args) => Array.prototype.some.apply(thisArg, args),
    ArrayPrototypeReduce: (thisArg, ...args) => Array.prototype.reduce.apply(thisArg, args),
    ArrayPrototypeConcat: (thisArg, ...args) => Array.prototype.concat.apply(thisArg, args),
    Promise: globalThis.Promise,
    PromisePrototypeThen: (thisArg, ...args) => Promise.prototype.then.apply(thisArg, args),
    StringPrototypeEndsWith: (thisArg, ...args) => String.prototype.endsWith.apply(thisArg, args),
    SafeMap: Map,
    SafeSet: Set,
    ReflectApply: (cb, thisArg, args) => Reflect.apply(cb, thisArg, args),
}

const {
    ArrayFrom, 
    ArrayIsArray, 
    ArrayPrototypeAt, 
    // ArrayPrototypeFlatMap, 
    ArrayPrototypeMap, 
    ArrayPrototypePop, 
    ArrayPrototypePush, 
    ArrayPrototypeSome,
    ArrayPrototypeReduce,
    ArrayPrototypeConcat,
    Promise, 
    PromisePrototypeThen, 
    SafeMap, 
    SafeSet, 
    StringPrototypeEndsWith,
    ReflectApply,
} = primordials

// polyfill ArrayPrototypeFlatMap since it seems to be missing on the deno side
    function _flattenArray(arr, depth=1) {
        if (depth == 0) {
            return ArrayPrototypeConcat(arr)
        }
        return ArrayPrototypeReduce(arr, (flatArray, current) => {
            if (ArrayIsArray(current)) {
                return ArrayPrototypeConcat(flatArray, _flattenArray(current, depth-1));
            } else {
                return ArrayPrototypeConcat(flatArray, current);
            }
        }, []);
    }
    function ArrayPrototypeFlatMap(arr, func, thisArg = undefined) {
        return _flattenArray(ArrayPrototypeMap(arr, func, thisArg))
    }

// not lazy anymore
function lazyMinimatch() {
    return minimatch
}

/**
 * @param {string} path
 * @returns {Promise<DirentFromStats|null>}
 */
async function getDirent(path) {
    let stat
    try {
        stat = await lstat(path)
    } catch (err) {
        return null
    }
    return new DirentFromStats(basename(path), stat, dirname(path))
}

/**
 * @param {string} path
 * @returns {DirentFromStats|null}
 */
function getDirentSync(path) {
    const stat = lstatSync(path, { throwIfNoEntry: false })
    if (stat === undefined) {
        return null
    }
    return new DirentFromStats(basename(path), stat, dirname(path))
}

/**
 * @callback validateStringArrayOrFunction
 * @param {*} value
 * @param {string} name
 */
const validateStringArrayOrFunction = hideStackFrames((value, name) => {
    if (ArrayIsArray(value)) {
        for (let i = 0; i < value.length; ++i) {
            if (typeof value[i] !== "string") {
                throw new ERR_INVALID_ARG_TYPE(`${name}[${i}]`, "string", value[i])
            }
        }
        return
    }
    if (typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, ["string[]", "function"], value)
    }
})

/**
 * @param {string} pattern
 * @param {options} options
 * @returns {Minimatch}
 */
function createMatcher(pattern, options = kEmptyObject) {
    const opts = {
        __proto__: null,
        nocase: isWindows || isMacOS,
        windowsPathsNoEscape: true,
        nonegate: true,
        nocomment: true,
        optimizationLevel: 2,
        platform: process.platform,
        nocaseMagicOnly: true,
        ...options,
    }
    return new (lazyMinimatch().Minimatch)(pattern, opts)
}

class Cache {
    #cache = new SafeMap()
    #statsCache = new SafeMap()
    #readdirCache = new SafeMap()

    stat(path) {
        const cached = this.#statsCache.get(path)
        if (cached) {
            return cached
        }
        const promise = getDirent(path)
        this.#statsCache.set(path, promise)
        return promise
    }
    statSync(path) {
        const cached = this.#statsCache.get(path)
        // Do not return a promise from a sync function.
        if (cached && !(cached instanceof Promise)) {
            return cached
        }
        const val = getDirentSync(path)
        this.#statsCache.set(path, val)
        return val
    }
    addToStatCache(path, val) {
        this.#statsCache.set(path, val)
    }
    async readdir(path) {
        const cached = this.#readdirCache.get(path)
        if (cached) {
            return cached
        }
        const promise = PromisePrototypeThen(readdir(path, { __proto__: null, withFileTypes: true }), null, () => null)
        this.#readdirCache.set(path, promise)
        return promise
    }
    readdirSync(path) {
        const cached = this.#readdirCache.get(path)
        if (cached) {
            return cached
        }
        let val
        try {
            val = readdirSync(path, { __proto__: null, withFileTypes: true })
        } catch {
            val = []
        }
        this.#readdirCache.set(path, val)
        return val
    }
    add(path, pattern) {
        let cache = this.#cache.get(path)
        if (!cache) {
            cache = new SafeSet()
            this.#cache.set(path, cache)
        }
        const originalSize = cache.size
        pattern.indexes.forEach((index) => cache.add(pattern.cacheKey(index)))
        return cache.size !== originalSize + pattern.indexes.size
    }
    seen(path, pattern, index) {
        return this.#cache.get(path)?.has(pattern.cacheKey(index))
    }
}

class Pattern {
    #pattern
    #globStrings
    indexes
    symlinks
    last

    constructor(pattern, globStrings, indexes, symlinks) {
        this.#pattern = pattern
        this.#globStrings = globStrings
        this.indexes = indexes
        this.symlinks = symlinks
        this.last = pattern.length - 1
    }

    isLast(isDirectory) {
        return this.indexes.has(this.last) || (this.at(-1) === "" && isDirectory && this.indexes.has(this.last - 1) && this.at(-2) === lazyMinimatch().GLOBSTAR)
    }
    isFirst() {
        return this.indexes.has(0)
    }
    get hasSeenSymlinks() {
        return ArrayPrototypeSome(ArrayFrom(this.indexes), (i) => !this.symlinks.has(i))
    }
    at(index) {
        return ArrayPrototypeAt(this.#pattern, index)
    }
    child(indexes, symlinks = new SafeSet()) {
        return new Pattern(this.#pattern, this.#globStrings, indexes, symlinks)
    }
    test(index, path) {
        if (index > this.#pattern.length) {
            return false
        }
        const pattern = this.#pattern[index]
        if (pattern === lazyMinimatch().GLOBSTAR) {
            return true
        }
        if (typeof pattern === "string") {
            return pattern === path
        }
        if (typeof pattern?.test === "function") {
            return pattern.test(path)
        }
        return false
    }

    cacheKey(index) {
        let key = ""
        for (let i = index; i < this.#globStrings.length; i++) {
            key += this.#globStrings[i]
            if (i !== this.#globStrings.length - 1) {
                key += "/"
            }
        }
        return key
    }
}

class ResultSet extends SafeSet {
    #root = "."
    #isExcluded = () => false
    constructor(i=undefined) {
        super(i)
    } // eslint-disable-line no-useless-constructor

    setup(root, isExcludedFn) {
        this.#root = root
        this.#isExcluded = isExcludedFn
    }

    add(value) {
        if (this.#isExcluded(resolve(this.#root, value))) {
            return false
        }
        super.add(value)
        return true
    }
}

export class Glob {
    #root
    #exclude
    #cache = new Cache()
    #results = new ResultSet()
    #queue = []
    #subpatterns = new SafeMap()
    #patterns
    #withFileTypes
    #isExcluded = () => false
    constructor(pattern, options = kEmptyObject) {
        validateObject(options, "options")
        const { exclude, cwd, withFileTypes } = options
        this.#root = cwd ?? "."
        this.#withFileTypes = !!withFileTypes
        if (exclude != null) {
            validateStringArrayOrFunction(exclude, "options.exclude")
            if (ArrayIsArray(exclude)) {
                assert(typeof this.#root === "string")
                // Convert the path part of exclude patterns to absolute paths for
                // consistent comparison before instantiating matchers.
                const matchers = exclude.map((pattern) => resolve(this.#root, pattern)).map((pattern) => createMatcher(pattern))
                this.#isExcluded = (value) => matchers.some((matcher) => matcher.match(value))
                this.#results.setup(this.#root, this.#isExcluded)
            } else {
                this.#exclude = exclude
            }
        }
        let patterns
        if (typeof pattern === "object") {
            validateStringArray(pattern, "patterns")
            patterns = pattern
        } else {
            validateString(pattern, "patterns")
            patterns = [pattern]
        }
        this.matchers = ArrayPrototypeMap(patterns, (pattern) => createMatcher(pattern))
        this.#patterns = ArrayPrototypeFlatMap(
            this.matchers,
            (matcher) => ArrayPrototypeMap(
                matcher.set,
                (pattern, i) => new Pattern(pattern, matcher.globParts[i], new SafeSet().add(0), new SafeSet())
            )
        )
    }

    globSync() {
        ArrayPrototypePush(this.#queue, { __proto__: null, path: ".", patterns: this.#patterns })
        while (this.#queue.length > 0) {
            const item = ArrayPrototypePop(this.#queue)
            for (let i = 0; i < item.patterns.length; i++) {
                this.#addSubpatterns(item.path, item.patterns[i])
            }
            this.#subpatterns.forEach((patterns, path) => ArrayPrototypePush(this.#queue, { __proto__: null, path, patterns }))
            this.#subpatterns.clear()
        }
        return ArrayFrom(this.#results, this.#withFileTypes ? (path) => this.#cache.statSync(isAbsolute(path) ? path : join(this.#root, path)) : undefined)
    }
    #addSubpattern(path, pattern) {
        if (this.#isExcluded(path)) {
            return
        }
        const fullpath = resolve(this.#root, path)

        // If path is a directory, add trailing slash and test patterns again.
        if (this.#isExcluded(`${fullpath}/`) && this.#cache.statSync(fullpath).isDirectory()) {
            return
        }

        if (this.#exclude) {
            if (this.#withFileTypes) {
                const stat = this.#cache.statSync(path)
                if (stat !== null) {
                    if (this.#exclude(stat)) {
                        return
                    }
                }
            } else if (this.#exclude(path)) {
                return
            }
        }
        if (!this.#subpatterns.has(path)) {
            this.#subpatterns.set(path, [pattern])
        } else {
            ArrayPrototypePush(this.#subpatterns.get(path), pattern)
        }
    }
    #addSubpatterns(path, pattern) {
        const seen = this.#cache.add(path, pattern)
        if (seen) {
            return
        }
        const fullpath = resolve(this.#root, path)
        const stat = this.#cache.statSync(fullpath)
        const last = pattern.last
        const isDirectory = stat?.isDirectory() || (stat?.isSymbolicLink() && pattern.hasSeenSymlinks)
        const isLast = pattern.isLast(isDirectory)
        const isFirst = pattern.isFirst()

        if (this.#isExcluded(fullpath)) {
            return
        }
        if (isFirst && isWindows && typeof pattern.at(0) === "string" && StringPrototypeEndsWith(pattern.at(0), ":")) {
            // Absolute path, go to root
            this.#addSubpattern(`${pattern.at(0)}\\`, pattern.child(new SafeSet().add(1)))
            return
        }
        if (isFirst && pattern.at(0) === "") {
            // Absolute path, go to root
            this.#addSubpattern("/", pattern.child(new SafeSet().add(1)))
            return
        }
        if (isFirst && pattern.at(0) === "..") {
            // Start with .., go to parent
            this.#addSubpattern("../", pattern.child(new SafeSet().add(1)))
            return
        }
        if (isFirst && pattern.at(0) === ".") {
            // Start with ., proceed
            this.#addSubpattern(".", pattern.child(new SafeSet().add(1)))
            return
        }

        if (isLast && typeof pattern.at(-1) === "string") {
            // Add result if it exists
            const p = pattern.at(-1)
            const stat = this.#cache.statSync(join(fullpath, p))
            if (stat && (p || isDirectory)) {
                this.#results.add(join(path, p))
            }
            if (pattern.indexes.size === 1 && pattern.indexes.has(last)) {
                return
            }
        } else if (isLast && pattern.at(-1) === lazyMinimatch().GLOBSTAR && (path !== "." || pattern.at(0) === "." || (last === 0 && stat))) {
            // If pattern ends with **, add to results
            // if path is ".", add it only if pattern starts with "." or pattern is exactly "**"
            this.#results.add(path)
        }

        if (!isDirectory) {
            return
        }

        let children
        const firstPattern = pattern.indexes.size === 1 && pattern.at(pattern.indexes.values().next().value)
        if (typeof firstPattern === "string") {
            const stat = this.#cache.statSync(join(fullpath, firstPattern))
            if (stat) {
                stat.name = firstPattern
                children = [stat]
            } else {
                return
            }
        } else {
            children = this.#cache.readdirSync(fullpath)
        }

        for (let i = 0; i < children.length; i++) {
            const entry = children[i]
            const entryPath = join(path, entry.name)
            this.#cache.addToStatCache(join(fullpath, entry.name), entry)

            const subPatterns = new SafeSet()
            const nSymlinks = new SafeSet()
            for (const index of pattern.indexes) {
                // For each child, check potential patterns
                if (this.#cache.seen(entryPath, pattern, index) || this.#cache.seen(entryPath, pattern, index + 1)) {
                    return
                }
                const current = pattern.at(index)
                const nextIndex = index + 1
                const next = pattern.at(nextIndex)
                const fromSymlink = pattern.symlinks.has(index)

                if (current === lazyMinimatch().GLOBSTAR) {
                    if (entry.name[0] === "." || (this.#exclude && this.#exclude(this.#withFileTypes ? entry : entry.name))) {
                        continue
                    }
                    if (!fromSymlink && entry.isDirectory()) {
                        // If directory, add ** to its potential patterns
                        subPatterns.add(index)
                    } else if (!fromSymlink && index === last) {
                        // If ** is last, add to results
                        this.#results.add(entryPath)
                    }

                    // Any pattern after ** is also a potential pattern
                    // so we can already test it here
                    const nextMatches = pattern.test(nextIndex, entry.name)
                    if (nextMatches && nextIndex === last && !isLast) {
                        // If next pattern is the last one, add to results
                        this.#results.add(entryPath)
                    } else if (nextMatches && entry.isDirectory()) {
                        // Pattern matched, meaning two patterns forward
                        // are also potential patterns
                        // e.g **/b/c when entry is a/b - add c to potential patterns
                        subPatterns.add(index + 2)
                    }
                    if ((nextMatches || pattern.at(0) === ".") && (entry.isDirectory() || entry.isSymbolicLink()) && !fromSymlink) {
                        // If pattern after ** matches, or pattern starts with "."
                        // and entry is a directory or symlink, add to potential patterns
                        subPatterns.add(nextIndex)
                    }

                    if (entry.isSymbolicLink()) {
                        nSymlinks.add(index)
                    }

                    if (next === ".." && entry.isDirectory()) {
                        // In case pattern is "**/..",
                        // both parent and current directory should be added to the queue
                        // if this is the last pattern, add to results instead
                        const parent = join(path, "..")
                        if (nextIndex < last) {
                            if (!this.#subpatterns.has(path) && !this.#cache.seen(path, pattern, nextIndex + 1)) {
                                this.#subpatterns.set(path, [pattern.child(new SafeSet().add(nextIndex + 1))])
                            }
                            if (!this.#subpatterns.has(parent) && !this.#cache.seen(parent, pattern, nextIndex + 1)) {
                                this.#subpatterns.set(parent, [pattern.child(new SafeSet().add(nextIndex + 1))])
                            }
                        } else {
                            if (!this.#cache.seen(path, pattern, nextIndex)) {
                                this.#cache.add(path, pattern.child(new SafeSet().add(nextIndex)))
                                this.#results.add(path)
                            }
                            if (!this.#cache.seen(path, pattern, nextIndex) || !this.#cache.seen(parent, pattern, nextIndex)) {
                                this.#cache.add(parent, pattern.child(new SafeSet().add(nextIndex)))
                                this.#results.add(parent)
                            }
                        }
                    }
                }
                if (typeof current === "string") {
                    if (pattern.test(index, entry.name) && index !== last) {
                        // If current pattern matches entry name
                        // the next pattern is a potential pattern
                        subPatterns.add(nextIndex)
                    } else if (current === "." && pattern.test(nextIndex, entry.name)) {
                        // If current pattern is ".", proceed to test next pattern
                        if (nextIndex === last) {
                            this.#results.add(entryPath)
                        } else {
                            subPatterns.add(nextIndex + 1)
                        }
                    }
                }
                if (typeof current === "object" && pattern.test(index, entry.name)) {
                    // If current pattern is a regex that matches entry name (e.g *.js)
                    // add next pattern to potential patterns, or to results if it's the last pattern
                    if (index === last) {
                        this.#results.add(entryPath)
                    } else if (entry.isDirectory()) {
                        subPatterns.add(nextIndex)
                    }
                }
            }
            if (subPatterns.size > 0) {
                // If there are potential patterns, add to queue
                this.#addSubpattern(entryPath, pattern.child(subPatterns, nSymlinks))
            }
        }
    }

    async *glob() {
        ArrayPrototypePush(this.#queue, { __proto__: null, path: ".", patterns: this.#patterns })
        while (this.#queue.length > 0) {
            const item = ArrayPrototypePop(this.#queue)
            for (let i = 0; i < item.patterns.length; i++) {
                yield* this.#iterateSubpatterns(item.path, item.patterns[i])
            }
            this.#subpatterns.forEach((patterns, path) => ArrayPrototypePush(this.#queue, { __proto__: null, path, patterns }))
            this.#subpatterns.clear()
        }
    }
    async *#iterateSubpatterns(path, pattern) {
        const seen = this.#cache.add(path, pattern)
        if (seen) {
            return
        }
        const fullpath = resolve(this.#root, path)
        const stat = await this.#cache.stat(fullpath)
        const last = pattern.last
        const isDirectory = stat?.isDirectory() || (stat?.isSymbolicLink() && pattern.hasSeenSymlinks)
        const isLast = pattern.isLast(isDirectory)
        const isFirst = pattern.isFirst()
        
        if (this.#isExcluded(fullpath)) {
            return
        }
        if (isFirst && isWindows && typeof pattern.at(0) === "string" && StringPrototypeEndsWith(pattern.at(0), ":")) {
            // Absolute path, go to root
            this.#addSubpattern(`${pattern.at(0)}\\`, pattern.child(new SafeSet().add(1)))
            return
        }
        
        if (isFirst && pattern.at(0) === "") {
            // Absolute path, go to root
            this.#addSubpattern("/", pattern.child(new SafeSet().add(1)))
            return
        }
        if (isFirst && pattern.at(0) === "..") {
            // Start with .., go to parent
            this.#addSubpattern("../", pattern.child(new SafeSet().add(1)))
            return
        }
        if (isFirst && pattern.at(0) === ".") {
            // Start with ., proceed
            this.#addSubpattern(".", pattern.child(new SafeSet().add(1)))
            return
        }

        if (isLast && typeof pattern.at(-1) === "string") {
            // Add result if it exists
            const p = pattern.at(-1)
            const stat = await this.#cache.stat(join(fullpath, p))
            if (stat && (p || isDirectory)) {
                const result = join(path, p)
                if (!this.#results.has(result)) {
                    if (this.#results.add(result)) {
                        yield this.#withFileTypes ? stat : result
                    }
                }
            }
            if (pattern.indexes.size === 1 && pattern.indexes.has(last)) {
                return
            }
        } else if (isLast && pattern.at(-1) === lazyMinimatch().GLOBSTAR && (path !== "." || pattern.at(0) === "." || (last === 0 && stat))) {
            // If pattern ends with **, add to results
            // if path is ".", add it only if pattern starts with "." or pattern is exactly "**"
            if (!this.#results.has(path)) {
                if (this.#results.add(path)) {
                    yield this.#withFileTypes ? stat : path
                }
            }
        }
        
        if (!isDirectory) {
            return
        }

        let children
        const firstPattern = pattern.indexes.size === 1 && pattern.at(pattern.indexes.values().next().value)
        if (typeof firstPattern === "string") {
            const stat = await this.#cache.stat(join(fullpath, firstPattern))
            if (stat) {
                stat.name = firstPattern
                children = [stat]
            } else {
                return
            }
        } else {
            children = await this.#cache.readdir(fullpath)
        }

        for (let i = 0; i < children.length; i++) {
            const entry = children[i]
            const entryPath = join(path, entry.name)
            this.#cache.addToStatCache(join(fullpath, entry.name), entry)

            const subPatterns = new SafeSet()
            const nSymlinks = new SafeSet()
            for (const index of pattern.indexes) {
                // For each child, check potential patterns
                if (this.#cache.seen(entryPath, pattern, index) || this.#cache.seen(entryPath, pattern, index + 1)) {
                    return
                }
                const current = pattern.at(index)
                const nextIndex = index + 1
                const next = pattern.at(nextIndex)
                const fromSymlink = pattern.symlinks.has(index)

                if (current === lazyMinimatch().GLOBSTAR) {
                    if (entry.name[0] === "." || (this.#exclude && this.#exclude(this.#withFileTypes ? entry : entry.name))) {
                        continue
                    }
                    if (!fromSymlink && entry.isDirectory()) {
                        // If directory, add ** to its potential patterns
                        subPatterns.add(index)
                    } else if (!fromSymlink && index === last) {
                        // If ** is last, add to results
                        if (!this.#results.has(entryPath)) {
                            if (this.#results.add(entryPath)) {
                                yield this.#withFileTypes ? entry : entryPath
                            }
                        }
                    }

                    // Any pattern after ** is also a potential pattern
                    // so we can already test it here
                    const nextMatches = pattern.test(nextIndex, entry.name)
                    if (nextMatches && nextIndex === last && !isLast) {
                        // If next pattern is the last one, add to results
                        if (!this.#results.has(entryPath)) {
                            if (this.#results.add(entryPath)) {
                                yield this.#withFileTypes ? entry : entryPath
                            }
                        }
                    } else if (nextMatches && entry.isDirectory()) {
                        // Pattern matched, meaning two patterns forward
                        // are also potential patterns
                        // e.g **/b/c when entry is a/b - add c to potential patterns
                        subPatterns.add(index + 2)
                    }
                    if ((nextMatches || pattern.at(0) === ".") && (entry.isDirectory() || entry.isSymbolicLink()) && !fromSymlink) {
                        // If pattern after ** matches, or pattern starts with "."
                        // and entry is a directory or symlink, add to potential patterns
                        subPatterns.add(nextIndex)
                    }

                    if (entry.isSymbolicLink()) {
                        nSymlinks.add(index)
                    }

                    if (next === ".." && entry.isDirectory()) {
                        // In case pattern is "**/..",
                        // both parent and current directory should be added to the queue
                        // if this is the last pattern, add to results instead
                        const parent = join(path, "..")
                        if (nextIndex < last) {
                            if (!this.#subpatterns.has(path) && !this.#cache.seen(path, pattern, nextIndex + 1)) {
                                this.#subpatterns.set(path, [pattern.child(new SafeSet().add(nextIndex + 1))])
                            }
                            if (!this.#subpatterns.has(parent) && !this.#cache.seen(parent, pattern, nextIndex + 1)) {
                                this.#subpatterns.set(parent, [pattern.child(new SafeSet().add(nextIndex + 1))])
                            }
                        } else {
                            if (!this.#cache.seen(path, pattern, nextIndex)) {
                                this.#cache.add(path, pattern.child(new SafeSet().add(nextIndex)))
                                if (!this.#results.has(path)) {
                                    if (this.#results.add(path)) {
                                        yield this.#withFileTypes ? this.#cache.statSync(fullpath) : path
                                    }
                                }
                            }
                            if (!this.#cache.seen(path, pattern, nextIndex) || !this.#cache.seen(parent, pattern, nextIndex)) {
                                this.#cache.add(parent, pattern.child(new SafeSet().add(nextIndex)))
                                if (!this.#results.has(parent)) {
                                    if (this.#results.add(parent)) {
                                        yield this.#withFileTypes ? this.#cache.statSync(join(this.#root, parent)) : parent
                                    }
                                }
                            }
                        }
                    }
                }
                if (typeof current === "string") {
                    if (pattern.test(index, entry.name) && index !== last) {
                        // If current pattern matches entry name
                        // the next pattern is a potential pattern
                        subPatterns.add(nextIndex)
                    } else if (current === "." && pattern.test(nextIndex, entry.name)) {
                        // If current pattern is ".", proceed to test next pattern
                        if (nextIndex === last) {
                            if (!this.#results.has(entryPath)) {
                                if (this.#results.add(entryPath)) {
                                    yield this.#withFileTypes ? entry : entryPath
                                }
                            }
                        } else {
                            subPatterns.add(nextIndex + 1)
                        }
                    }
                }
                if (typeof current === "object" && pattern.test(index, entry.name)) {
                    // If current pattern is a regex that matches entry name (e.g *.js)
                    // add next pattern to potential patterns, or to results if it's the last pattern
                    if (index === last) {
                        if (!this.#results.has(entryPath)) {
                            if (this.#results.add(entryPath)) {
                                yield this.#withFileTypes ? entry : entryPath
                            }
                        }
                    } else if (entry.isDirectory()) {
                        subPatterns.add(nextIndex)
                    }
                }
            }
            if (subPatterns.size > 0) {
                // If there are potential patterns, add to queue
                this.#addSubpattern(entryPath, pattern.child(subPatterns, nSymlinks))
            }
        }
    }
}

/**
 * Check if a path matches a glob pattern
 * @param {string} path the path to check
 * @param {string} pattern the glob pattern to match
 * @param {boolean} windows whether the path is on a Windows system, defaults to `isWindows`
 * @returns {boolean}
 */
export function matchGlobPattern(path, pattern, windows = isWindows) {
    validateString(path, "path")
    validateString(pattern, "pattern")
    return lazyMinimatch().minimatch(path, pattern, {
        kEmptyObject,
        nocase: isMacOS || isWindows,
        windowsPathsNoEscape: true,
        nonegate: true,
        nocomment: true,
        optimizationLevel: 2,
        platform: windows ? "win32" : "posix",
        nocaseMagicOnly: true,
    })
}

export default {
    Glob,
    matchGlobPattern,
}

// 
// extra
// 

// normally-imported helper on the nodejs side
function makeCallback(cb) {
    return (...args) => ReflectApply(cb, this, args);
}

// good-enough ponyfill of ArrayPrototypeFromAsync
function ArrayPrototypeFromAsync(asyncIterator) {
    // NOTE: I think I can't use "for await" in bootstrapping,
    // so I use a recursive promise based approach
    let resolve, reject
    const promise = new Promise((_resolve, _reject)=>{
        resolve = _resolve
        reject = _reject
    })
    
    // recursively grab next
    const results = []
    const callNext = ()=>{
        let nextPromise
        try {
            nextPromise = asyncIterator.next()
        } catch (error) {
            reject(error)
            return
        }
        
        if (nextPromise == null) {
            reject(Error(`When iterating over an async iterator, the .next() returned null/undefined`))
            return
        }

        if (!(typeof nextPromise.then == 'function')) {
            const {value, done} = nextPromise
            if (done) {
                resolve(results)
            } else {
                results.push(value)
                callNext()
            }
            return
        }

        nextPromise.catch(reject)
        nextPromise.then(({value, done})=>{
            if (done) {
                resolve(results)
            } else {
                results.push(value)
                callNext()
            }
        })
    }
    try {
        callNext()
    } catch (error) {
        reject(error)
    }
    return promise
}

export function globSync(pattern: string | string[]): string[];
export function globSync(pattern: string | string[], options: GlobOptionsWithFileTypes): Dirent[];
export function globSync(pattern: string | string[], options: GlobOptionsWithoutFileTypes): string[];
export function globSync(pattern: string | string[], options: GlobOptions): Dirent[] | string[];
export function globSync(pattern: string | string[], options: GlobOptionsU = {}): Dirent[] | string[] {
    return new Glob(pattern, options).globSync();
}

/**
 * Retrieves the files matching the specified pattern.
 */
export function glob(pattern: string | string[], callback: GlobCallback<[string[]]>): void;
export function glob(pattern: string | string[], options: GlobOptionsWithFileTypes, callback: GlobCallback<[Dirent[]]>): void;
export function glob(pattern: string | string[], options: GlobOptionsWithoutFileTypes, callback: GlobCallback<[string[]]>): void;
export function glob(pattern: string | string[], options: GlobOptions, callback: GlobCallback<[Dirent[] | string[]]>): void;
export function glob(
	pattern: string | string[],
	options: GlobOptionsU | GlobCallback<[string[]]>,
	callback: GlobCallback<[Dirent[]]> | GlobCallback<[string[]]> = nop
): void {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  callback = makeCallback(callback);

  // from NodeJS: TODO: Use iterator helpers when available
  (async () => {
    try {
      const res = await ArrayPrototypeFromAsync(new Glob(pattern, options).glob());
      callback(null, res);
    } catch (err) {
      callback(err);
    }
  })();
}

export function globPromise(pattern: string | string[]): Promise<Dirent[] | string[]>;
export function globPromise(pattern: string | string[], options: GlobOptionsWithFileTypes): Promise<Dirent[] | string[]>;
export function globPromise(pattern: string | string[], options: GlobOptionsWithoutFileTypes): Promise<Dirent[] | string[]>;
export function globPromise(pattern: string | string[], options: GlobOptions): Promise<Dirent[] | string[]>;
export function globPromise(
	pattern: string | string[],
	options: GlobOptionsU,
): Promise<Dirent[] | string[]> {
    return new Promise((resolve: CallableFunction, reject: CallableFunction)=>{
        glob(pattern, options, (err: ErrnoException | null, files: Dirent[] | string[]) => {
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })
}