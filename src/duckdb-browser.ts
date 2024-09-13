import * as duckdb from "@duckdb/duckdb-wasm";
import { AsyncDuckDB } from "@duckdb/duckdb-wasm";

export async function createDuckDB(): Promise<AsyncDuckDB> {
  const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
  const response = await fetch(bundle.mainWorker!, { mode: "cors" });
  const scriptContent = await response.text();
  const blob = new Blob([scriptContent], { type: "application/javascript" });
  const worker_url = URL.createObjectURL(blob);
  const worker = new Worker(worker_url);
  const logger = new duckdb.ConsoleLogger();
  const db = new AsyncDuckDB(logger, worker);

  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

  return db;
}
