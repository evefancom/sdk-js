import { Database } from "duckdb-async";

export async function createDuckDB(
  writeKey: string,
  host: string
): Promise<Database> {
  const db = await Database.create(":memory:");
  if (host.includes("://")) {
    host = host.split("://")[1];
  }

  // Execute the CREATE SECRET statement
  await db.exec(`
    INSTALL httpfs;
    LOAD httpfs;
    CREATE OR REPLACE SECRET s3secret (
      TYPE S3,
      ENDPOINT '${host}/s3',
      SESSION_TOKEN '${writeKey}',
      KEY_ID 'keyid',
      URL_STYLE 'path'
    );
    set force_download = true;
  `);

  return db;
}
