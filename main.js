// Copyright 2020 the Denoify authors. All rights reserved. MIT License.

// 1.42.1
// const keys = ["internal", "resources", "close", "metrics", "Process", "run", "isatty", "writeFileSync", "writeFile", "writeTextFileSync", "writeTextFile", "readTextFile", "readTextFileSync", "readFile", "readFileSync", "watchFs", "chmodSync", "chmod", "chown", "chownSync", "copyFileSync", "cwd", "makeTempDirSync", "makeTempDir", "makeTempFileSync", "makeTempFile", "memoryUsage", "mkdirSync", "mkdir", "chdir", "copyFile", "readDirSync", "readDir", "readLinkSync", "readLink", "realPathSync", "realPath", "removeSync", "remove", "renameSync", "rename", "version", "build", "statSync", "lstatSync", "stat", "lstat", "truncateSync", "truncate", "ftruncateSync", "ftruncate", "futime", "futimeSync", "errors", "inspect", "env", "exit", "execPath", "Buffer", "readAll", "readAllSync", "writeAll", "writeAllSync", "copy", "iter", "iterSync", "SeekMode", "read", "readSync", "write", "writeSync", "File", "FsFile", "open", "openSync", "create", "createSync", "stdin", "stdout", "stderr", "seek", "seekSync", "connect", "listen", "loadavg", "connectTls", "listenTls", "startTls", "shutdown", "fstatSync", "fstat", "fsyncSync", "fsync", "fdatasyncSync", "fdatasync", "symlink", "symlinkSync", "link", "linkSync", "permissions", "Permissions", "PermissionStatus", "serveHttp", "serve", "resolveDns", "upgradeWebSocket", "utime", "utimeSync", "kill", "addSignalListener", "removeSignalListener", "refTimer", "unrefTimer", "osRelease", "osUptime", "hostname", "systemMemoryInfo", "networkInterfaces", "consoleSize", "gid", "uid", "Command", "ChildProcess", "test", "bench", "pid", "ppid", "noColor", "args", "mainModule"]
// const functionKeys = ["resources", "close", "metrics", "Process", "run", "isatty", "writeFileSync", "writeFile", "writeTextFileSync", "writeTextFile", "readTextFile", "readTextFileSync", "readFile", "readFileSync", "watchFs", "chmodSync", "chmod", "chown", "chownSync", "copyFileSync", "cwd", "makeTempDirSync", "makeTempDir", "makeTempFileSync", "makeTempFile", "memoryUsage", "mkdirSync", "mkdir", "chdir", "copyFile", "readDirSync", "readDir", "readLinkSync", "readLink", "realPathSync", "realPath", "removeSync", "remove", "renameSync", "rename", "statSync", "lstatSync", "stat", "lstat", "truncateSync", "truncate", "ftruncateSync", "ftruncate", "futime", "futimeSync", "inspect", "exit", "execPath", "Buffer", "readAll", "readAllSync", "writeAll", "writeAllSync", "copy", "iter", "iterSync", "read", "readSync", "write", "writeSync", "File", "FsFile", "open", "openSync", "create", "createSync", "seek", "seekSync", "connect", "listen", "loadavg", "connectTls", "listenTls", "startTls", "shutdown", "fstatSync", "fstat", "fsyncSync", "fsync", "fdatasyncSync", "fdatasync", "symlink", "symlinkSync", "link", "linkSync", "Permissions", "PermissionStatus", "serveHttp", "serve", "resolveDns", "upgradeWebSocket", "utime", "utimeSync", "kill", "addSignalListener", "removeSignalListener", "refTimer", "unrefTimer", "osRelease", "osUptime", "hostname", "systemMemoryInfo", "networkInterfaces", "consoleSize", "gid", "uid", "Command", "ChildProcess", "test", "bench"]
// const nonFunctionKeys = ["internal", "version", "build", "errors", "env", "SeekMode", "stdin", "stdout", "stderr", "permissions", "pid", "ppid", "noColor", "args", "mainModule"]

const fakeEnv = {
    HOME: "/fake/home",
    SHELL: "sh",
    PWD: "/fake/pwd",
}
class NotFound extends Error {}
class PermissionDenied extends Error {}
class ConnectionRefused extends Error {}
class ConnectionReset extends Error {}
class ConnectionAborted extends Error {}
class NotConnected extends Error {}
class AddrInUse extends Error {}
class AddrNotAvailable extends Error {}
class BrokenPipe extends Error {}
class AlreadyExists extends Error {}
class InvalidData extends Error {}
class TimedOut extends Error {}
class Interrupted extends Error {}
class WriteZero extends Error {}
class WouldBlock extends Error {}
class UnexpectedEof extends Error {}
class BadResource extends Error {}
class Http extends Error {}
class Busy extends Error {}
class NotSupported extends Error {}
class FilesystemLoop extends Error {}
class IsADirectory extends Error {}
class NetworkUnreachable extends Error {}
class NotADirectory extends Error {}

class PermissionStatus {
    constructor(public state: "granted" | "denied" | "prompt") {}
}
class Permissions {
    async query(){
        return Promise.resolve(new PermissionStatus("granted"))
    }

    async revoke(){
        return Promise.resolve(new PermissionStatus("granted"))
    }

    async request(){
        return Promise.resolve(new PermissionStatus("granted"))
    }
}
class Stdin {
    static rid = 0
    constructor() {
        this._inputs = []
        this.isClosed = false
    }
    isTerminal() {
        return false
    }
    read(v) {
        return Promise.resolve(new Uint8Array())
    }
    readSync(v) {}
    setRaw(v) {
        this._inputs.push(v)
    }
    close() {
        this.isClosed = true
    }
    readable() {
        if (globalThis.ReadableStream && !this.isClosed) {
            return new ReadableStream()
        }
    }
}
class Stdout {
    static rid = 1
    constructor() {
        this._inputs = []
    }
    write(v) {
        this._inputs.push(v)
        return Promise.resolve(v.length)
    }
    writeSync(v) {
        this._inputs.push(v)
        return v.length
    }
    close() {
        this.isClosed = true
    }
    writable() {
        if (globalThis.WritableStream && !this.isClosed) {
            return new WritableStream()
        }
    }
}
class Stderr {
    static rid = 2
    constructor() {
        this._inputs = []
    }
    write(v) {
        this._inputs.push(v)
        return Promise.resolve(v.length)
    }
    writeSync(v) {
        this._inputs.push(v)
        return v.length
    }
    close() {
        this.isClosed = true
    }
    writable() {
        if (globalThis.WritableStream && !this.isClosed) {
            return new WritableStream()
        }
    }
}

export default globalThis.Deno
    ? globalThis.Deno
    : {
        mainModule: "file:///fake/$deno$repl.ts",
        internal: Symbol("Deno.internal"),
        version: { deno: "1.42.1", v8: "12.3.219.9", typescript: "5.4.3" },
        noColor: true,
        args: [],
        build: {
            target: "aarch64-apple-darwin",
            arch: "aarch64",
            os: "darwin",
            vendor: "apple",
            env: undefined, // <- thats actually natively true
        },
        pid: 3,
        ppid: 2,
        env: {
            get(_) {
                return fakeEnv[_]
            },
            set(_, __) {
                fakeEnv[_] = __
            },
        },
        errors: {
            NotFound,
            PermissionDenied,
            ConnectionRefused,
            ConnectionReset,
            ConnectionAborted,
            NotConnected,
            AddrInUse,
            AddrNotAvailable,
            BrokenPipe,
            AlreadyExists,
            InvalidData,
            TimedOut,
            Interrupted,
            WriteZero,
            WouldBlock,
            UnexpectedEof,
            BadResource,
            Http,
            Busy,
            NotSupported,
            FilesystemLoop,
            IsADirectory,
            NetworkUnreachable,
            NotADirectory,
        },
        SeekMode: {
            0: "Start",
            1: "Current",
            2: "End",
            Start: 0,
            Current: 1,
            End: 2,
        },
        stdin: new Stdin(),
        stdout: new Stdout(),
        stderr: new Stderr(),
        permissions: new Permissions(),
        resources() {},
        close() {},
        metrics() {},
        Process() {},
        run() {},
        isatty() {},
        writeFileSync() {},
        writeFile() {},
        writeTextFileSync() {},
        writeTextFile() {},
        readTextFile() {},
        readTextFileSync() {},
        readFile() {},
        readFileSync() {},
        watchFs() {},
        chmodSync() {},
        chmod() {},
        chown() {},
        chownSync() {},
        copyFileSync() {},
        cwd() { return fakeEnv["PWD"] },
        makeTempDirSync() {},
        makeTempDir() {},
        makeTempFileSync() {},
        makeTempFile() {},
        memoryUsage() {},
        mkdirSync() {},
        mkdir() {},
        chdir() {},
        copyFile() {},
        readDirSync() {},
        readDir() {},
        readLinkSync() {},
        readLink() {},
        realPathSync() {},
        realPath() {},
        removeSync() {},
        remove() {},
        renameSync() {},
        rename() {},
        statSync() {},
        lstatSync() {},
        stat() {},
        lstat() {},
        truncateSync() {},
        truncate() {},
        ftruncateSync() {},
        ftruncate() {},
        futime() {},
        futimeSync() {},
        inspect() {},
        exit() { throw Error(`Deno.exit() is not supported, so I'll just throw an error`) },
        execPath() {},
        Buffer() {},
        readAll() {},
        readAllSync() {},
        writeAll() {},
        writeAllSync() {},
        copy() {},
        iter() {},
        iterSync() {},
        read() {},
        readSync() {},
        write() {},
        writeSync() {},
        File() {},
        FsFile() {},
        open() {},
        openSync() {},
        create() {},
        createSync() {},
        seek() {},
        seekSync() {},
        connect() {},
        listen() {},
        loadavg() {},
        connectTls() {},
        listenTls() {},
        startTls() {},
        shutdown() {},
        fstatSync() {},
        fstat() {},
        fsyncSync() {},
        fsync() {},
        fdatasyncSync() {},
        fdatasync() {},
        symlink() {},
        symlinkSync() {},
        link() {},
        linkSync() {},
        Permissions() {},
        PermissionStatus() {},
        serveHttp() {},
        serve() {},
        resolveDns() {},
        upgradeWebSocket() {},
        utime() {},
        utimeSync() {},
        kill() {},
        addSignalListener() {},
        removeSignalListener() {},
        refTimer() {},
        unrefTimer() {},
        osRelease() { return "fake" },
        osUptime() {},
        hostname() { return "fake" },
        systemMemoryInfo() {
            total: 17179869184,
            free: 77104,
            available: 3279456,
            buffers: 0,
            cached: 0,
            swapTotal: 18253611008,
            swapFree: 878313472
        },
        networkInterfaces() { return [] },
        consoleSize() {
            return { columns: 120, rows: 20 }
        },
        gid() { return 20 },
        uid() { return 501},
        Command() {},
        ChildProcess() {},
        test() {},
        bench() {},
    }