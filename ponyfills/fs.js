var fs
if (typeof Deno !== 'undefined') {
    var [
        fs,
        globImport,
    ] = await Promise.all([
        import("node:fs").then(fs=>({...fs.default})),
        import("./helpers/glob.js"),
    ])
    let { glob, globSync, globPromise } = globImport
    fs.glob = glob
    fs.globSync = globSync
    fs.promises.glob = globPromise
} else if (typeof global !== 'undefined') {
    fs = require('node:fs')
}

const {
    Dir,
    Dirent,
    F_OK,
    O_APPEND,
    O_CREAT,
    O_DIRECTORY,
    O_DSYNC,
    O_EXCL,
    O_NOCTTY,
    O_NOFOLLOW,
    O_NONBLOCK,
    O_RDONLY,
    O_RDWR,
    O_SYMLINK,
    O_SYNC,
    O_TRUNC,
    O_WRONLY,
    R_OK,
    ReadStream,
    Stats,
    W_OK,
    WriteStream,
    X_OK,
    _toUnixTimestamp,
    access,
    accessSync,
    appendFile,
    appendFileSync,
    chmod,
    chmodSync,
    chown,
    chownSync,
    close,
    closeSync,
    constants,
    copyFile,
    copyFileSync,
    cp,
    cpSync,
    createReadStream,
    createWriteStream,
    exists,
    existsSync,
    fdatasync,
    fdatasyncSync,
    fstat,
    fstatSync,
    fsync,
    fsyncSync,
    ftruncate,
    ftruncateSync,
    futimes,
    futimesSync,
    glob,
    globSync,
    link,
    linkSync,
    lstat,
    lstatSync,
    lutimes,
    lutimesSync,
    mkdir,
    mkdirSync,
    mkdtemp,
    mkdtempSync,
    open,
    openSync,
    opendir,
    opendirSync,
    read,
    readFile,
    readFileSync,
    readSync,
    readdir,
    readdirSync,
    readlink,
    readlinkSync,
    readv,
    readvSync,
    realpath,
    realpathSync,
    rename,
    renameSync,
    rm,
    rmSync,
    rmdir,
    rmdirSync,
    stat,
    statSync,
    statfs,
    statfsSync,
    symlink,
    symlinkSync,
    truncate,
    truncateSync,
    unlink,
    unlinkSync,
    unwatchFile,
    utimes,
    utimesSync,
    watch,
    watchFile,
    write,
    writeFile,
    writeFileSync,
    writeSync,
    writev,
    writevSync,
} = fs

export default fs

export {
    Dir,
    Dirent,
    F_OK,
    O_APPEND,
    O_CREAT,
    O_DIRECTORY,
    O_DSYNC,
    O_EXCL,
    O_NOCTTY,
    O_NOFOLLOW,
    O_NONBLOCK,
    O_RDONLY,
    O_RDWR,
    O_SYMLINK,
    O_SYNC,
    O_TRUNC,
    O_WRONLY,
    R_OK,
    ReadStream,
    Stats,
    W_OK,
    WriteStream,
    X_OK,
    _toUnixTimestamp,
    access,
    accessSync,
    appendFile,
    appendFileSync,
    chmod,
    chmodSync,
    chown,
    chownSync,
    close,
    closeSync,
    constants,
    copyFile,
    copyFileSync,
    cp,
    cpSync,
    createReadStream,
    createWriteStream,
    exists,
    existsSync,
    fdatasync,
    fdatasyncSync,
    fstat,
    fstatSync,
    fsync,
    fsyncSync,
    ftruncate,
    ftruncateSync,
    futimes,
    futimesSync,
    glob,
    globSync,
    link,
    linkSync,
    lstat,
    lstatSync,
    lutimes,
    lutimesSync,
    mkdir,
    mkdirSync,
    mkdtemp,
    mkdtempSync,
    open,
    openSync,
    opendir,
    opendirSync,
    read,
    readFile,
    readFileSync,
    readSync,
    readdir,
    readdirSync,
    readlink,
    readlinkSync,
    readv,
    readvSync,
    realpath,
    realpathSync,
    rename,
    renameSync,
    rm,
    rmSync,
    rmdir,
    rmdirSync,
    stat,
    statSync,
    statfs,
    statfsSync,
    symlink,
    symlinkSync,
    truncate,
    truncateSync,
    unlink,
    unlinkSync,
    unwatchFile,
    utimes,
    utimesSync,
    watch,
    watchFile,
    write,
    writeFile,
    writeFileSync,
    writeSync,
    writev,
    writevSync,
}