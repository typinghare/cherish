import util from 'util'
import fs from 'fs'
import path from 'node:path'
import * as os from 'os'

/**
 * Converts an object into printable string.
 * @param object The object to convert.
 */
export function objectToString(object: object): string {
    return util.inspect(object, { colors: true })
}

/**
 * Parses a filepath.
 * @param filepath The filepath to parse.
 * @private
 */
export function parseFilepath(filepath: string): string {
    if (filepath.startsWith('~')) {
        filepath = path.join(os.homedir(), filepath.substring(1))
    }

    return filepath
}

/**
 * Creates a directory if it does not exist.
 * @param dirname The directory name.
 * @private
 */
export function createDir(dirname: string): void {
    if (fs.existsSync(dirname) && fs.statSync(dirname).isDirectory()) {
        return
    }

    createDir(path.dirname(dirname))

    fs.mkdirSync(dirname)
}

export function addTrailingNewline(string: string): string {
    return string.endsWith('\n') ? string : string + '\n'
}
