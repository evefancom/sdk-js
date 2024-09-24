# Evefan SDK for JavaScript

Evefan SDK to manage events and query information.

## Installation

Install the SDK using npm:

```
npm install @evefan/sdk-js
```

## API Reference

### `EvefanSDK(writeKey, workerUrl)`

Creates a new instance of the Evefan SDK.

- `workerUrl`: URL of the Evefan worker
- `writeKey`: Your Evefan write key

### `evefan.query(sqlQuery)`

Executes a SQL query against your Evefan data.

- `sqlQuery`: SQL query string

Returns a Promise that resolves with the query results.

## Code Snippet for Node.js

Note: Our module is an ESM module, so you need to use `import` instead of `require` and in your `package.json` you need to set `"type": "module"`

Here's a standalone code snippet you can use as a starting point:

```js
import Evefan from "@evefan/sdk-js";

const ef = new Evefan({ evefanHost, writeKey });

// Track Data
ef.track({
  userId: "019mr8mf4r",
  event: "Item Purchased",
  properties: {
    revenue: 39.95,
    shippingMethod: "2-day",
  },
});

// Query Data
const result = await ef.query("SELECT * FROM evefan limit 5;");
```

## License

MIT

## Support

For issues and feature requests, please [open an issue](https://github.com/your-repo/sdk-js/issues) on GitHub.
