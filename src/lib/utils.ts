// Simple classnames helper compatible with logical && patterns
// Usage: cn("base", condition && "class")
export function cn(
    ...classes: Array<string | number | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}
