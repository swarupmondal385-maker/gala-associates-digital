import { createApp } from "vinxi";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
    }),
  ],
});