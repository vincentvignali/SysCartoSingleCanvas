# Situation Frontend Canvas

A [React Flow](https://reactflow.dev)-based canvas for IT infrastructure visualization.

## Run locally

- `yarn install`
- `yarn dev`

The `/public` directory contains network JSON objects, these are loaded dynamically when the app starts.

## Building for production

- `yarn install`
- `yarn build`
- the static website is now available in the `/dist` folder.

## Embedding

Because of the React Flow dependency, the canvas is implemented in React. However, it is easy to embed the application in other frameworks using the [custom element wrapper included in the project](src/situation-canvas.tsx).

Using the wrapper script, setting up a canvas even on a static HTML page is just a few lines of code:

```html
<situation-canvas />

<script>
  document.querySelector("situation-canvas").canvasData = []; // Insert backend data here
</script>
```

> Note: to be mindful of performance, the custom element only takes HTML properties and renders once at the time that property is provided.

### Embedding in a vanilla javascript application

In the [index.html](index.html) file, simply comment the `src/main.tsx` script import and uncomment the `src/main-vanilla.ts` one. This implmenetation shows how developers can render the canvas on a regular HTML page with no frameworks.

### Embedding in a Vue.js application

Embedding into a Vue.js application is very similar to vanilla javascript:

```vue
<script>
export default {
  data() {
    return {
      canvasData: [], // Insert backend data here
    };
  },
};
</script>

<template>
  <!-- use the .prop modifier to make sure data is passed as a property -->
  <situation-canvas :canvasData.prop="canvasData" />
</template>
```

## Speaking with the backend (⚠️This demo works with a fake dataSet)

The repo embeds an auto-generated ts client (located at `src/client`) to ease the interaction with the backend. Below is an short example to fetch some data (obviously the API is richer).

```ts
import { DataApi, Configuration, Node, ExportApi, ReactFlow } from "../client";

const config = new Configuration({
  basePath: "<BACKEND-URL>", // http://127.0.0.1:8000
  headers: { "Content-Type": "application/json" },
  apiKey: "Api-Key <YOUR-API-KEY>", // Api-Key ErdxWd9w.H40z0d5YgSVoVroqcf0sF0ZK6BQlwevc
});

const dataAPI = new DataApi(config);
const exportAPI = new ExportApi(config);

dataAPI
  .dataNodeList()
  .then((response: Node[]) => {
    console.log(response);
  })
  .catch((reason: any) => {
    console.log(reason);
  });

exportAPI
  .exportReactFlowRetrieve()
  .then((response: ReactFlow) => {
    console.log(response);
  })
  .catch((reason: any) => {
    console.log(reason);
  });
```
