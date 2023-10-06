import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://astrodocs-v2.vercel.app",
  integrations: [
    starlight({
      title: "AstroNvim",
      logo: {
        src: "./src/assets/logo/astronvim.svg",
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      social: {
        github: "https://github.com/AstroNvim/AstroNvim",
        // reddit: "https://www.reddit.com/r/AstroNvim/",
        discord: "https://discord.astronvim.com",
        twitter: "https://twitter.com/AstroNvim",
        mastodon: "https://hachyderm.io/@AstroNvim",
      },
      sidebar: [
        {
          label: "Getting started",
          link: "/",
          collapsed: true,
        },
        {
          label: "Basic Usage",
          collapsed: true,
          autogenerate: {
            directory: "basic-usage",
          },
        },
        {
          label: "Configuration",
          collapsed: true,
          autogenerate: {
            directory: "Configuration",
          },
        },
        {
          label: "Recipes",
          collapsed: true,
          autogenerate: {
            directory: "Recipes",
          },
        },
        {
          label: "Acknowledgements",
          link: "/acknowledgements",
          collapsed: true,
        },
        {
          label: "Code of Conduct",
          collapsed: true,
          link: "/code_of_conduct",
        },
        {
          label: "Frequently asked questions",
          collapsed: true,
          link: "/faq",
        },
        {
          label: "Core Lua API Documentation",
          link: "https://api.astronvim.com",
        },
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
