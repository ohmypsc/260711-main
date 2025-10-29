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

// ✅ GitHub Pages용 base 경로
const base = "/260711-main/"

export default defineConfig({
  base,
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

  // ✅ Supabase 환경변수 직접 주입 (GitHub Actions 빌드 대응)
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify("https://wwotrjuzpcbwlhhlyqxv.supabase.co"),
    "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3b3RyanV6cGNid2xoaGx5cXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDY3NzgsImV4cCI6MjA3NzIyMjc3OH0.mOCukDJioOQemoV9hiVLMuFYezF1nf3CsZyE5KlpIbo")
  },

  server: { port: 3000 },
  build: { outDir: distFolder },
})
