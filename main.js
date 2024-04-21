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

globalThis.Deno = globalThis.Deno
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

export const internal               = Deno.internal
export const resources              = Deno.resources
export const close                  = Deno.close
export const metrics                = Deno.metrics
export const Process                = Deno.Process
export const run                    = Deno.run
export const isatty                 = Deno.isatty
export const writeFileSync          = Deno.writeFileSync
export const writeFile              = Deno.writeFile
export const writeTextFileSync      = Deno.writeTextFileSync
export const writeTextFile          = Deno.writeTextFile
export const readTextFile           = Deno.readTextFile
export const readTextFileSync       = Deno.readTextFileSync
export const readFile               = Deno.readFile
export const readFileSync           = Deno.readFileSync
export const watchFs                = Deno.watchFs
export const chmodSync              = Deno.chmodSync
export const chmod                  = Deno.chmod
export const chown                  = Deno.chown
export const chownSync              = Deno.chownSync
export const copyFileSync           = Deno.copyFileSync
export const cwd                    = Deno.cwd
export const makeTempDirSync        = Deno.makeTempDirSync
export const makeTempDir            = Deno.makeTempDir
export const makeTempFileSync       = Deno.makeTempFileSync
export const makeTempFile           = Deno.makeTempFile
export const memoryUsage            = Deno.memoryUsage
export const mkdirSync              = Deno.mkdirSync
export const mkdir                  = Deno.mkdir
export const chdir                  = Deno.chdir
export const copyFile               = Deno.copyFile
export const readDirSync            = Deno.readDirSync
export const readDir                = Deno.readDir
export const readLinkSync           = Deno.readLinkSync
export const readLink               = Deno.readLink
export const realPathSync           = Deno.realPathSync
export const realPath               = Deno.realPath
export const removeSync             = Deno.removeSync
export const remove                 = Deno.remove
export const renameSync             = Deno.renameSync
export const rename                 = Deno.rename
export const version                = Deno.version
export const build                  = Deno.build
export const statSync               = Deno.statSync
export const lstatSync              = Deno.lstatSync
export const stat                   = Deno.stat
export const lstat                  = Deno.lstat
export const truncateSync           = Deno.truncateSync
export const truncate               = Deno.truncate
export const ftruncateSync          = Deno.ftruncateSync
export const ftruncate              = Deno.ftruncate
export const futime                 = Deno.futime
export const futimeSync             = Deno.futimeSync
export const errors                 = Deno.errors
export const inspect                = Deno.inspect
export const env                    = Deno.env
export const exit                   = Deno.exit
export const execPath               = Deno.execPath
export const Buffer                 = Deno.Buffer
export const readAll                = Deno.readAll
export const readAllSync            = Deno.readAllSync
export const writeAll               = Deno.writeAll
export const writeAllSync           = Deno.writeAllSync
export const copy                   = Deno.copy
export const iter                   = Deno.iter
export const iterSync               = Deno.iterSync
export const SeekMode               = Deno.SeekMode
export const read                   = Deno.read
export const readSync               = Deno.readSync
export const write                  = Deno.write
export const writeSync              = Deno.writeSync
export const File                   = Deno.File
export const FsFile                 = Deno.FsFile
export const open                   = Deno.open
export const openSync               = Deno.openSync
export const create                 = Deno.create
export const createSync             = Deno.createSync
export const stdin                  = Deno.stdin
export const stdout                 = Deno.stdout
export const stderr                 = Deno.stderr
export const seek                   = Deno.seek
export const seekSync               = Deno.seekSync
export const connect                = Deno.connect
export const listen                 = Deno.listen
export const loadavg                = Deno.loadavg
export const connectTls             = Deno.connectTls
export const listenTls              = Deno.listenTls
export const startTls               = Deno.startTls
export const shutdown               = Deno.shutdown
export const fstatSync              = Deno.fstatSync
export const fstat                  = Deno.fstat
export const fsyncSync              = Deno.fsyncSync
export const fsync                  = Deno.fsync
export const fdatasyncSync          = Deno.fdatasyncSync
export const fdatasync              = Deno.fdatasync
export const symlink                = Deno.symlink
export const symlinkSync            = Deno.symlinkSync
export const link                   = Deno.link
export const linkSync               = Deno.linkSync
export const permissions            = Deno.permissions
export const Permissions            = Deno.Permissions
export const PermissionStatus       = Deno.PermissionStatus
export const serveHttp              = Deno.serveHttp
export const serve                  = Deno.serve
export const resolveDns             = Deno.resolveDns
export const upgradeWebSocket       = Deno.upgradeWebSocket
export const utime                  = Deno.utime
export const utimeSync              = Deno.utimeSync
export const kill                   = Deno.kill
export const addSignalListener      = Deno.addSignalListener
export const removeSignalListener   = Deno.removeSignalListener
export const refTimer               = Deno.refTimer
export const unrefTimer             = Deno.unrefTimer
export const osRelease              = Deno.osRelease
export const osUptime               = Deno.osUptime
export const hostname               = Deno.hostname
export const systemMemoryInfo       = Deno.systemMemoryInfo
export const networkInterfaces      = Deno.networkInterfaces
export const consoleSize            = Deno.consoleSize
export const gid                    = Deno.gid
export const uid                    = Deno.uid
export const Command                = Deno.Command
export const ChildProcess           = Deno.ChildProcess
export const test                   = Deno.test
export const bench                  = Deno.bench
export const pid                    = Deno.pid
export const ppid                   = Deno.ppid
export const noColor                = Deno.noColor
export const args                   = Deno.args
export const mainModule             = Deno.mainModule