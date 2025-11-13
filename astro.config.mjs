import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoom from "starlight-image-zoom";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

import tailwindcss from "@tailwindcss/vite";

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
      title: "AstroNvim Documentation",
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
            async: true,
            src: "https://plausible.mehalter.com/js/pa-xb_-Rd2uWvmUJ1Ceqa3Gn.js",
          },
        },
        {
          tag: "script",
          content:
            "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}}; plausible.init()",
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
        starlightLinksValidator(),
        starlightImageZoom(),
      ],
      expressiveCode: {
        plugins: [pluginCollapsibleSections()],
      },
      customCss: [
        // Fonts
        "@fontsource-variable/inter",
        "@fontsource-variable/jetbrains-mono",
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      social: [
        {
          icon: "mastodon",
          label: "Mastodon",
          href: "https://hachyderm.io/@AstroNvim",
        },
        {
          icon: "x.com",
          label: "X",
          href: "https://x.com/AstroNvim",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.astronvim.com",
        },
        {
          icon: "reddit",
          label: "Reddit",
          href: "https://www.reddit.com/r/AstroNvim",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://git.astronvim.com/AstroNvim",
        },
      ],
      sidebar: [
        {
          label: "🚀 Getting Started",
          link: "/",
          translations: {},
        },
        {
          label: "📦 AstroCommunity",
          link: "/astrocommunity",
          translations: {},
        },
        {
          label: "⌨️ Mappings",
          link: "/mappings",
          translations: {},
        },
        {
          label: "📝 Using This Documentation",
          link: "/using_the_docs",
          translations: {},
        },
        {
          label: "🔧 Configuration",
          collapsed: true,
          autogenerate: { directory: "configuration" },
          translations: {},
        },
        {
          label: "🍳 Recipes",
          collapsed: true,
          autogenerate: { directory: "recipes" },
          translations: {},
        },
        {
          label: "📔 Reference",
          collapsed: true,
          autogenerate: { directory: "reference" },
          translations: {},
        },
        {
          label: "⭐ Acknowledgements",
          link: "/acknowledgements",

          translations: {},
        },
        {
          label: "👪 Code of Conduct",
          link: "/code_of_conduct",
          translations: {},
        },
        {
          label: "❓ FAQ",
          link: "/faq",
          translations: {},
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/AstroNvim/docs/edit/main/",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
