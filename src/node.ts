import {
  AliasParams,
  Analytics,
  GroupParams,
  IdentifyParams,
  PageParams,
  TrackParams,
} from "@segment/analytics-node";

import { Database } from "duckdb-async";

import { createDuckDB } from "./duckdb-node";
import { QueryResult } from "./types";
import { prepareQuery } from "./queries";

class EvefanSDK {
  private analytics: Analytics;
  private db: Database | null = null;
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
    this.analytics = new Analytics({
      host: evefanHost,
      writeKey,
    });
  }

  identify(event: IdentifyParams) {
    return this.analytics.identify(event);
  }

  track(event: TrackParams) {
    return this.analytics.track(event);
  }

  page(event: PageParams) {
    return this.analytics.page(event);
  }

  group(event: GroupParams) {
    return this.analytics.group(event);
  }

  alias(event: AliasParams) {
    return this.analytics.alias(event);
  }

  screen(event: PageParams) {
    return this.analytics.screen(event);
  }

  async query(sql: string): Promise<any> {
    if (!this.db) {
      this.db = await createDuckDB(this.writeKey, this.evefanHost);
    }
    const conn = await this.db.connect();

    try {
      let result: QueryResult | any[];
      result = await conn.all(prepareQuery(sql));

      console.log({ result });
      return result;
    } finally {
      await conn.close();
    }
  }
}

export = EvefanSDK;
