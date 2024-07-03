export const normalizeString = (str: string) =>
  typeof str === "string" ? str.normalize("NFKC") : str;