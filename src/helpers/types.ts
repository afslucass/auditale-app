export const mapValueToEnumKey = (value: string, keys: any) =>
  (Object.keys(keys) as any[]).find((key: string) => keys[key] === value);
