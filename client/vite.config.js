import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Output to client/build so the Express server (which serves client/build)
// keeps working without any change. Dev server runs on 3000 and proxies the
// API + auth routes to the Node backend on 5001.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5001",
      "/auth": "http://localhost:5001",
    },
  },
});
