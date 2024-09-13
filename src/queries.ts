export function prepareQuery(sql: string): string {
  return sql.replace(/FROM\s+evefan/gi, "FROM 's3://evefan/**/*.parquet'");
}
