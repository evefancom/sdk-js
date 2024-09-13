# Evefan SDK for JavaScript

Evefan SDK to manage events and query information

## Installation

Install the SDK using npm:

```
npm install @evefan/sdk-js
```

## API Reference

### `EvefanSDK(writeKey, workerUrl)`

Creates a new instance of the Evefan SDK.

- `writeKey`: Your Evefan write key
- `workerUrl`: URL of the Evefan worker

### `evefan.query(sqlQuery)`

Executes a SQL query against your Evefan data.

- `sqlQuery`: SQL query string

Returns a Promise that resolves with the query results.

## Code Snippet for Node.js

Here's a standalone code snippet you can use as a starting point:

```
const EvefanSDK = require("@evefan/sdk-js").default;

async function testEvefanSDK() {
  const evefan = new EvefanSDK("<write-key>", "<evefan-worker-url>");
  const event = {
    userId: "019mr8mf4r",
    event: "Item Purchased",
    properties: {
      revenue: 39.95,
      shippingMethod: "2-day",
    },
  };
  try {
    const result = await evefan.query("SELECT * FROM evefan limit 5;");
    console.log("Query result:", result);
  } catch (error) {
    console.error("Query error:", error);
  }
}

testEvefanSDK().catch(console.error);
```

## License

MIT

## Support

For issues and feature requests, please [open an issue](https://github.com/your-repo/sdk-js/issues) on GitHub.
