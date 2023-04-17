

interface ConstantsType {
    APP_PATHS: {
        [key: string]: {
            path: string
            isAuth: boolean
        }
    }
    EXTERNAL_PATHS: {
        [key: string]: string
    }
    SETTING_KEYS: {
        [key: string]: string
    }
}

declare global {
    const CONFIG: {
        API_HOST: string;
    }
}

const Constants: ConstantsType = {
    APP_PATHS: {
        // APP
        HOME: {
            path: '/',
            isAuth: false
        },
        PROJECT: {
            path: '/project/[id]',
            isAuth: true
        },
        NEW_DB: {
            path: '/project/[id]/newdb',
            isAuth: true
        },
        DB: {
            path: '/db/[id]',
            isAuth: true
        },
        LOGOUT: {
            path: '/logout',
            isAuth: true
        },
        // SETTINGS
        SETTINGS: {
            path: '/settings',
            isAuth: true
        },
        SETTINGS_ABOUT: {
            path: '/settings/about',
            isAuth: true
        },
        SETTINGS_SUPPORT: {
            path: '/settings/support',
            isAuth: true
        },
        SETTINGS_GENERAL: {
            path: '/settings/general',
            isAuth: true
        },
        SETTINGS_ADVANCED: {
            path: '/settings/advanced',
            isAuth: true
        },
    },
    EXTERNAL_PATHS: {
        OFFICIAL_WEBSITE: "https://slashbase.com",
        DISCORD_COMMUNITY: "https://discord.gg/U6fXgm3FAX",
        REPORT_BUGS: "https://github.com/slashbaseide/slashbase/issues",
        CHANGELOG: "https://slashbase.com/updates",
        SUPPORT_MAIL: "mailto:slashbaseide@gmail.com",
    },
    SETTING_KEYS: {
        APP_ID: "APP_ID",
        TELEMETRY_ENABLED: "TELEMETRY_ENABLED",
        LOGS_EXPIRE: "LOGS_EXPIRE",
    },
}

export default Constants

export const GetAPIConfig = function () {
    let API_HOST = String("http://localhost:3000")
    return {
        API_HOST: API_HOST,
        API_URL: API_HOST + "/api/v1"
    }
}