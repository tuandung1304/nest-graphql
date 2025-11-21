import { Timestamp } from '@google-cloud/firestore';

export function convertTimestamps(obj: unknown) {
  if (!obj || typeof obj !== 'object') return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value: unknown = obj[key];

    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    } else if (typeof value === 'object') {
      result[key] = convertTimestamps(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
