export function isValidKey<T>(key: string | number | symbol, obj: T): key is keyof T {
    return typeof obj === "object" && key in obj;
}