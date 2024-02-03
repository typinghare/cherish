/**
 * Core constants.
 */
export const Constants = {
    // Configuration levels
    CONF_LEVEL: {
        DEFAULT: 'DEFAULT',
        CONVENTION: 'CONVENTION',
        USER: 'USER',
    } as const,

    // Default configuration
    CONF_DEFAULT: {
        userConfig: '~/.cherish/config.json',
        plugins: ['BasePlugin'] as string[],
        database: '~/.cherish/default/',
        serverListeningPort: 9385,
    } as const,
} as const
