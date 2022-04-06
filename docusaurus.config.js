// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AstroVim",
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
        title: "AstroVim",
        logo: {
          alt: "AstroVim Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "intro",
            label: "Get Started",
            position: "right",
          },
          {
            to: "usage/walkthrough",
            label: "Basic Usage",
            position: "right",
          },
          {
            to: "configuration/basic_configuration",
            label: "Configuration",
            position: "right",
          },
          {
            to: "recipes/black_belt",
            label: "Recipes",
            position: "right",
          },
          {
            href: "https://github.com/kabinspace/AstroVim",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["lua"],
      },
    }),
};

module.exports = config;
