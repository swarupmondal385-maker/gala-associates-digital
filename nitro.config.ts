import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "vercel",
  srcDir: ".",
  rootDir: ".",
  scanDirs: [],
  imports: false,
  entry: "./dist/server/server.js",
  handlers: [
    {
      route: "/**",
      handler: "./dist/server/server.js",
    },
  ],
  publicAssets: [
    {
      baseURL: "/",
      dir: "./dist/client",
      fallthrough: true,
    },
    {
      baseURL: "/assets",
      dir: "./dist/server/assets",
      fallthrough: true,
    },
  ],
  output: {
    dir: ".vercel/output",
  },
});
