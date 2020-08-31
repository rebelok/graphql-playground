require('dotenv').config();

const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const registerServices = require('@workpop/graphql-proxy').default;

const types = require('./schema.js');

const { API_KEY, API_URL, PORT } = process.env;

const SERVICE_CONFIG = {
  APPSYNC: {
    address: API_URL,
    typeDefs: types,
  },
};

const app = express();
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

registerServices({
  SERVICE_CONFIG,
  server: app,
  masterTypeDefs: types,
  customHeaders: {
    'x-api-key': API_KEY,
    JiveHost: JIVE_HOST,
  },
  enableGrqphiQL: true,
}).then(() => {
  app.listen(PORT || 4000, () =>
    console.log(
      `Running playground proxy on http://localhost:${PORT || 4000}/playground`
    )
  );
});
