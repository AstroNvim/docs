import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import tailwind from "@astrojs/tailwind";

const locales = {
  root: {
    label: "English",
    lang: "en", // lang is required for root locales
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://docs.astronvim.com",
  defaultLocale: "root",
  locales,
  integrations: [
    starlight({
      title: "AstroNvim Docs",
      description: "The documentation website for AstroNvim.",
      favicon: "/astronvim.svg",
      head: [
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#feeeee",
            media: "(prefers-color-scheme: light)",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#1a1d23",
            media: "(prefers-color-scheme: dark)",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://astronvim.com/logo/banner.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:site",
            content: "@AstroNvim",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:creator",
            content: "@AstroNvim",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://astronvim.com/logo/banner.png",
          },
        },
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
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://JXZNTZ86UN-dsn.algolia.net",
            crossorigin: true,
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
      plugins: [
        starlightDocSearch({
          appId: "JXZNTZ86UN",
          apiKey: "96faee2ebdaf4a8a66d0f810c635bfec",
          indexName: "astronvim",
        }),
      ],
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      social: {
        mastodon: "https://hachyderm.io/@AstroNvim",
        "x.com": "https://x.com/AstroNvim",
        discord: "https://discord.astronvim.com",
        reddit: "https://www.reddit.com/r/AstroNvim",
        github: "https://git.astronvim.com/AstroNvim",
      },
      sidebar: [
        {
          label: "Getting Started",
          link: "/",
          collapsed: true,
          translations: {},
        },
        {
          label: "Mappings",
          link: "/mappings",
          collapsed: true,
          translations: {},
        },
        {
          label: "Using These Docs",
          link: "/using_the_docs",
          collapsed: true,
          translations: {},
        },
        {
          label: "Configuration",
          collapsed: true,
          autogenerate: { directory: "configuration" },
          translations: {},
        },
        {
          label: "Recipes",
          collapsed: true,
          autogenerate: { directory: "recipes" },
          translations: {},
        },
        {
          label: "Reference",
          collapsed: true,
          autogenerate: { directory: "reference" },
          translations: {},
        },
        {
          label: "Acknowledgements",
          link: "/acknowledgements",
          collapsed: true,

          translations: {},
        },
        {
          label: "Code of Conduct",
          collapsed: true,
          link: "/code_of_conduct",
          translations: {},
        },
        {
          label: "Frequently Asked Questions",
          collapsed: true,
          link: "/faq",
          translations: {},
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/AstroNvim/docs/edit/main/",
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
