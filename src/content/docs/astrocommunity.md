---
id: astrocommunity
title: AstroCommunity
---

[AstroCommunity](https://github.com/AstroNvim/astrocommunity) is a community driven repository that acts as essentially a marketplace for additional configuration pieces provided as `lazy.nvim` specifications similar to how VS Code extensions work. These pieces range from single plugins to entire collections for state of the art language support.

Check out the [AstroCommunity Repository](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity) to browse the available categories and plugins. The search feature in GitHub is also a great way to quickly see if a plugin you are looking for is available.

If any plugins you are looking for are not available we would greatly appreciate all contributions to add more entries to AstroCommunity! It is a great place to help other users easily add plugins and also make any necessary configuration changes to tightly integrate the plugin for AstroNvim.

:::note

The entries in AstroCommunity are fully driven and maintained by the AstroNvim community. The core AstroNvim maintainers do not actively develop and support them. If you encounter any issues please feel free to open issues and pull requests on the [AstroCommunity Repository](https://github.com/AstroNvim/astrocommunity)!

:::

## 🛠️ Usage

Similar to how AstroNvim is installed in your configuration, AstroCommunity is installed as a plugin and then each entry is included with an `import` statement. It is important that these imports happen after the main AstroNvim import and before the user's `plugins/` folder. This guarantees that the user modifications made on top of AstroCommunity will happen after all included specs are resolved. In the provided [AstroNvim Template](https://github.com/AstroNvim/template) these should go in the `lua/community.lua` file. Here is an example:

```lua title="lua/community.lua"
return {
  -- Add the community repository of plugin specifications
  "AstroNvim/astrocommunity",
  -- example of importing a plugin
  -- available plugins can be found at https://github.com/AstroNvim/astrocommunity
  { import = "astrocommunity.colorscheme.catppuccin" },
  -- example of importing an entire language pack
  -- these packs can set up things such as Treesitter, Language Servers, additional language specific plugins, and more!
  { import = "astrocommunity.pack.rust" },
  { import = "astrocommunity.pack.python" },
}
```
