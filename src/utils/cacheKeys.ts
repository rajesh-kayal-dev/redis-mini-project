export const CACHE_KEYS = {
    USERS_ALL: "users:all",
    USER_SINGLE: (id: string) => `user:${id}`, // Using a function for dynamic IDs
};
