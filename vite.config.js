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
      // Chromeでは公開ウェブサイトからプライベートネットワークエンドポイントへの直接アクセスをする場合、
      // `Access-Control-Request-Private-Network: true` と `Access-Control-Allow-Private-Network: true` ヘッダを追加する
      // 必要がある。
      // ref. https://developer.chrome.com/blog/private-network-access-preflight
      // ref2. https://github.com/vitejs/vite/discussions/7134#discussioncomment-3422554
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Request-Private-Network", "true");
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          res.setHeader("Access-Control-Allow-Origin", "*");
          next();
        });
      },
    },
  ],
};
