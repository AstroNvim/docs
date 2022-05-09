/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Usage",
      items: ["usage/walkthrough", "usage/mappings"],
    },
    {
      type: "category",
      label: "Configuration",
      items: [
        "configuration/manage_user_config",
        "configuration/basic_configuration",
        "configuration/plugin_defaults",
        "configuration/config_options",
        "configuration/override_formats",
        "configuration/splitting_up",
      ],
    },
    {
      type: "category",
      label: "Recipes",
      items: [
        "recipes/black_belt",
        "recipes/colorscheme",
        "recipes/cmp",
        "recipes/snippets",
        "recipes/alpha",
        "recipes/globalstatus",
        "recipes/manual_lsp",
        "recipes/telescope_theme",
        "recipes/unattended_install",
      ],
    },
    "acknowledgements",
  ],
};
