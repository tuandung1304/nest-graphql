export function encodeCursor(docId: string, createdAt?: Date | string): string {
  const payload = {
    last_id: docId,
    last_value: createdAt ? new Date(createdAt).toISOString() : null,
  };
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString('base64');
}

export function decodeCursor(cursor: string) {
  const json = Buffer.from(cursor, 'base64').toString('utf8');
  return JSON.parse(json) as {
    last_id: string;
    last_value: string | null;
  };
}
