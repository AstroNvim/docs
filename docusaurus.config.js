// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const oneDarkTheme = {
  plain: {
    backgroundColor: "#1e222a",
    color: "#abb2bf",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#777d86",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: [
        "number",
        "boolean",
        "entity",
        "url",
        "unit",
        "statement",
        "at-rule",
        "placeholder",
      ],
      style: {
        color: "#d19a66",
      },
    },
    {
      types: ["string", "regex"],
      style: {
        color: "#98c379",
      },
    },
    {
      types: ["operator", "keyword", "control", "directive"],
      style: {
        color: "#c678dd",
      },
    },
    {
      types: ["property", "function"],
      style: {
        color: "#e5c07b",
      },
    },
    {
      types: [
        "tag",
        "tag-id",
        "selector",
        "atrule-id",
        "attr-name",
        "attr-value",
        "variable",
      ],
      style: {
        color: "#e06c75",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AstroNvim",
  tagline:
    "An aesthetic and feature-rich neovim config that is extensible and easy to use with a great set of plugins",
  url: "https://astronvim.github.io",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "AstroNvim", // Usually your GitHub org/user name.
  projectName: "astronvim.github.io", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "AstroNvim",
        logo: {
          alt: "AstroNvim Logo",
          src: "img/logo/astronvim.svg",
        },
        items: [
          {
            to: "/",
            label: "Get Started",
            position: "right",
          },
          {
            to: "usage/walkthrough",
            label: "Basic Usage",
            position: "right",
          },
          {
            to: "configuration/manage_user_config",
            label: "Configuration",
            position: "right",
          },
          {
            to: "recipes/black_belt",
            label: "Recipes",
            position: "right",
          },
          {
            href: "https://github.com/AstroNvim/AstroNvim",
            position: "right",
          },
        ],
      },
      prism: {
        theme: oneDarkTheme,
        darkTheme: oneDarkTheme,
        additionalLanguages: ["lua"],
      },
      colorMode: {
        defaultMode: "dark",
      },
    }),
};

module.exports = config;
