import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.astronvim.com",
  integrations: [
    starlight({
      title: "AstroNvim",
      description: "The documentation website for AstroNvim.",
      favicon: "/astronvim.svg",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "https://astronvim.com/logo/astronvim.svg",
            size: "image/svg+xml",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "https://astronvim.com/logo/favicon.ico",
            size: "any",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "https://astronvim.com/logo/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/manifest.webmanifest",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://plausible.mehalter.com/js/script.js",
            defer: true,
            "data-domain": "docs.astronvim.com",
          },
        },
      ],
      logo: {
        src: "./src/assets/astronvim.svg",
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      social: {
        mastodon: "https://hachyderm.io/@AstroNvim",
        "x.com": "https://x.com/AstroNvim",
        discord: "https://discord.astronvim.com",
        github: "https://git.astronvim.com/AstroNvim",
        // reddit: "https://www.reddit.com/r/AstroNvim",
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
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      lastUpdated: true,
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
