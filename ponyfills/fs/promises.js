var fs
if (typeof Deno !== 'undefined') {
    var [
        fs,
        { globPromise },
    ] = await Promise.all([
        import("node:fs/promises").then(fs=>({...fs.default})),
        import("../helpers/glob.js"),
    ])
    fs.glob = globPromise
} else if (typeof global !== 'undefined') {
    fs = require('node:fs/promises')
}

const {
    access,
    constants,
    copyFile,
    cp,
    open,
    opendir,
    rename,
    truncate,
    rm,
    rmdir,
    mkdir,
    readdir,
    readlink,
    symlink,
    lstat,
    stat,
    statfs,
    fstat,
    link,
    unlink,
    chmod,
    lchown,
    chown,
    utimes,
    lutimes,
    realpath,
    mkdtemp,
    writeFile,
    appendFile,
    readFile,
    watch,
    glob,
} = fs

export default fs

export {
    access,
    constants,
    copyFile,
    cp,
    open,
    opendir,
    rename,
    truncate,
    rm,
    rmdir,
    mkdir,
    readdir,
    readlink,
    symlink,
    lstat,
    stat,
    statfs,
    fstat,
    link,
    unlink,
    chmod,
    lchown,
    chown,
    utimes,
    lutimes,
    realpath,
    mkdtemp,
    writeFile,
    appendFile,
    readFile,
    watch,
    glob,
}