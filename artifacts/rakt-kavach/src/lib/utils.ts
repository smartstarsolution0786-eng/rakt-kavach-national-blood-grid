export function cn(...inputs: Array<string | false | null | undefined | Record<string, boolean>>) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      return Object.entries(input)
        .filter(([, enabled]) => enabled)
        .map(([name]) => name);
    })
    .join(" ");
}
