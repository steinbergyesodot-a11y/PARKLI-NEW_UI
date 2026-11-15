export function formatGameDate(value: string) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}