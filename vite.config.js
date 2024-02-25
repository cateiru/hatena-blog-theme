import autoprefixer from "autoprefixer";

export default {
  build: {
    rollupOptions: {
      input: ["scss/boilerplate.scss"],
      output: {
        assetFileNames: ({ name }) => name,
      },
    },
    outDir: "build",
    cssMinify: false,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Request-Private-Network", "true");
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          next();
        });
      },
    },
  ],
};
