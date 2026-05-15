// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import og from "astro-og";

import annotate from "astro-annotate";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://kennymbeltre.com",
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["kenny.brayanmbeltre.com"],
      // disable cache on dev
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  },
  integrations: [
    og(),
    annotate(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],
  redirects: {
    "/portfolio": {
      status: 302,
      destination:
        "https://www.figma.com/deck/3LVtaaODfk7NuuoMMJxxYI/Kenny-Beltre-s-Portfolio?node-id=1-2495&viewport=-6753%2C-138%2C0.76&t=YpCfOBNok5ukzM4i-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    },
    "/skills": {
      status: 302,
      destination: "https://flask-gush-46635396.figma.site/skills",
    },
  },
});
