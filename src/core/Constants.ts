import path from 'node:path'

/**
 * This files stores all app-related constants
 *
 * [Alias Table]
 * CONF         Configuration
 * DIR          Directory
 * DB           Database
 */

// User directory
export const USER_DIR = '~/.cherish/' as const

// Convention Configuration filepath
export const CONF_CONVENTION = path.join(USER_DIR, 'convention.json')

// Configuration levels
export const CONF_LEVEL = {
    DEFAULT: 'DEFAULT',
    CONVENTION: 'CONVENTION',
    USER: 'USER',
} as const

// Default configuration
export const CONF_DEFAULT = {
    'config.user': path.join(USER_DIR, 'config.json'),
    'server.host': '127.0.0.1',
    'server.port': 31299,
    'plugin.list': ['BasePlugin', 'TimePlugin', 'ConfigPlugin'] as string[],
    'database.path': path.join(USER_DIR, 'db.json'),
}
