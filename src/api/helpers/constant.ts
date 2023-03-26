export const CONSTANT_MESSAGES = {
    DELETE_SUCCESSFULLY: "DELETE SUCCESSFULLY",
    DELETE_FAILED: "DELETE FAILED",
    UPDATE_FAILED: "UPDATE FAILED",
    UPDATE_SUCCESSFULLY: "UPDATE SUCCESSFULLY",
    USER_NOT_FOUND: "USER NOT FOUND",
    INVALID_PASSWORD: "INVALID PASSWORD",
    NOT_ALLOWED: "YOU ARE NOT ALLOWED",
    INVALID_TOKEN: "INVALID TOKEN PROVIDED",
    EXPIRED_TOKEN: "EXPIRED TOKEN PROVIDED",
    TOKEN_NOT_PROVIDED: "TOKEN NOT PROVIDED",
    DATA_NOT_FOUND: "DATA_NOT_FOUND",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS"
};


export const PAGINATION_DATA = {
    DEFAULT_PAGE_INDEX: 1,
    DEFAULT_PAGE_SIZE: 6
};


export const REDIS_VARIABLES = {
    SONG_ID: "SONGID:",
    USER_ID: "USERID:",
    RECENT_SONGS: "RECENTSONGS:",
    MAC_ADDRESS: "MACADDRESS:",
    MAX_LENGTH_LIST_SONGS: 10,
    EXPIRED_TIME_RECENT_SONGS: 60 * 60 * 24 * 30,
    EXPIRED_TIME_ELEMENT_CHART: 2 * 24 * 60 * 60,
    RESET_TIME_LISTEN_AGAIN: 60 * 2,
    HASHES_VIEW_SONGS: "HASHESVIEWSONGS",
    FORMAT_TIME: "HH:00:00-DD/MM/YYYY",
    STEP_TIME: 2,
    NUMBER_SONG_IN_CHART: 3,
    VIEWS_UPDATE_MINUTES: 15
};