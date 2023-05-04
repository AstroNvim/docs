# FAQ

<!--toc:start-->

- [How do I customize AstroNvim?](#how-do-i-customize-astronvim)
- [How do I add plugin X to my configuration?](#how-do-i-add-plugin-x-to-my-configuration)

  <!--toc:end-->

## How do I customize AstroNvim?

AstroNvim offers the addition of plugin specs with zero abstraction thanks to the [lazy.nvim](https://www.github.com/folke/lazy.nvim) plugin manager. Please go through the entire README.md for lazy.nvim as this will help this will help to build a general understanding for the configuration mechanism, the available properties and how to lazily load plugins.

You can get a starter configuration from [here!](https://github.com/AstroNvim/user_example) This should provide a solid starting point on which you can build your customized environment. You have two options on where to place your user configuration: Either clone the user directory to `~/.config/nvim/lua` or `~/.config/astronvim/lua`.

Lastly, please go through the rest of the docs as most of the common customizations are already thoroughly explained.

## How do I add plugin X to my configuration?

AstroNvim provides a community-driven project called [Astrocommunity](https://github.com/AstroNvim/astrocommunity) to which every user is able to contribute a minimal plugin configuration. It is recommended to look there first since you can decide to either import a plugin spec if it's available or use it as a basis for your customized spec.

If a plugin is missing feel free to contribute it. Otherwise please refer to [this section](#how-do-i-customize-astronvim) and develop a general understanding for the specification of plugins.
