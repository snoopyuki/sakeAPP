const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/flavor-tags",
    createProxyMiddleware({
      target: "https://muro.sakenowa.com/sakenowa-data",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/brand-flavor-tags",
    createProxyMiddleware({
      target: "https://muro.sakenowa.com/sakenowa-data/",
      changeOrigin: true,
    })
  );
};
