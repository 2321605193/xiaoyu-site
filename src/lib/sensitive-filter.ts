const SENSITIVE_PATTERNS = [
  /FanJun/gi,
  /fanjun/gi,
  /范[俊军君]/g,
  /\b[\w.-]+@[\w.-]+\.\w{2,}\b/, // email
  /1[3-9]\d{9}/, // phone
  /token[:\s=]+\S+/gi,
  /key[:\s=]+\S+/gi,
  /password[:\s=]+\S+/gi,
  /secret[:\s=]+\S+/gi,
  /ssh[-_]?key/gi,
  /private[-_]?key/gi,
];

export function isSensitive(text: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(text));
}

export function filterSensitiveEntries<T extends { content: string }>(
  entries: T[]
): T[] {
  return entries.filter((entry) => !isSensitive(entry.content));
}
