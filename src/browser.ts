import { AsyncDuckDB } from "@duckdb/duckdb-wasm";
import { AnalyticsBrowser } from "@segment/analytics-next";

// import { createDuckDB } from "./duckdb-browser";
// import { QueryResult } from "./types";
// import { prepareQuery } from "./queries";

class EvefanSDK {
  private analytics: AnalyticsBrowser;
  private db: AsyncDuckDB | null = null;
  private evefan: Record<string, any> | null = null;
  private writeKey: string;
  private evefanHost: string;

  constructor({
    evefanHost,
    writeKey,
  }: {
    evefanHost: string;
    writeKey: string;
  }) {
    this.evefanHost = evefanHost;
    this.writeKey = writeKey;
    this.analytics = AnalyticsBrowser.load(
      {
        cdnURL: evefanHost,
        writeKey,
      },
      {
        integrations: {
          "Segment.io": {
            apiHost: `${evefanHost}/v1`,
          },
        },
      }
    );
  }

  identify(event: string, properties?: Record<string, any>) {
    return this.analytics.identify(event, properties);
  }

  track(event: string, properties?: Record<string, any>) {
    return this.analytics.track(event, properties);
  }

  page(name: string, properties?: Record<string, any>) {
    return this.analytics.page(name, properties);
  }

  group(id: string, properties?: Record<string, any>) {
    return this.analytics.group(id, properties);
  }

  alias(newId: string, options?: { [key: string]: any }) {
    return this.analytics.alias(newId, options);
  }

  screen(name: string, properties?: Record<string, any>) {
    return this.analytics.screen(name, properties);
  }

  async query(sql: string): Promise<any> {
    // if (!this.db) {
    //   this.db = await createDuckDB();
    // }
    // const conn = await this.db.connect();

    // try {
    //   let result: QueryResult | any[];
    //   result = await conn.query(prepareQuery(sql));

    //   console.log({ result });
    //   return Array.isArray(result) ? result : result.toArray();
    // } finally {
    //   await conn.close();
    // }
    throw new Error("Query method is not supported in browser yet");
  }
}

export default EvefanSDK;
