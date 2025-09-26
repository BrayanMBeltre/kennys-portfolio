import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
    redirects: {
    "/portfolio": {
      status: 302,
      destination: "https://www.figma.com/deck/3LVtaaODfk7NuuoMMJxxYI/Kenny-Beltre-s-Portfolio?node-id=1-2495&viewport=-6753%2C-138%2C0.76&t=YpCfOBNok5ukzM4i-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
    },
  }
});
