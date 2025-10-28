import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import fs from "fs"

import { createHtmlPlugin } from "vite-plugin-html"
import {
  GROOM_FULLNAME,
  BRIDE_FULLNAME,
  WEDDING_DATE,
  LOCATION,
  WEDDING_DATE_FORMAT,
} from "./src/const"

const distFolder = "build"

// ✅ GitHub Pages용 base 경로를 명시적으로 지정
const base = "/260711-main/"

// https://vite.dev/config/
export default defineConfig({
  base, // 👈 여기에도 연결됨
  plugins: [
    react(),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          GROOM_FULLNAME,
          BRIDE_FULLNAME,
          DESCRIPTION: `${WEDDING_DATE.format(WEDDING_DATE_FORMAT)} ${LOCATION}`,
        },
      },
    }),
    {
      name: "manifest-inject",
      writeBundle() {
        const content = fs.readFileSync("public/manifest.json", "utf-8")
        const processed = content
          .replace(/<%= GROOM_FULLNAME %>/g, GROOM_FULLNAME)
          .replace(/<%= BRIDE_FULLNAME %>/g, BRIDE_FULLNAME)
        fs.writeFileSync(`${distFolder}/manifest.json`, processed)
      },
    },
  ],
  server: { port: 3000 },
  build: { outDir: distFolder },
})
