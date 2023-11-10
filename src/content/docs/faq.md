---
id: faq
title: Frequently Asked Questions
---

Here are some common questions that users have and their answers!

## How do I add plugin X to my configuration?

AstroNvim provides a community-driven project called [AstroCommunity](https://github.com/AstroNvim/astrocommunity) to which every user is able to contribute plugin configurations. It is recommended to look there first since you can decide to either import a plugin specification if it's available or use it as a basis for your own customized specification.

If a plugin is missing feel free to contribute it using a pull request. Please just make sure to read through the [AstroCommunity Contribution Guidelines](https://github.com/AstroNvim/astrocommunity/blob/main/CONTRIBUTING.md) before contributing. Otherwise please refer to [this section](#how-do-i-customize-astronvim) and develop a general understanding for the specification of plugins.

## How do I customize AstroNvim?

AstroNvim offers the addition of plugin specs with zero abstraction thanks to the [`lazy.nvim`](https://www.github.com/folke/lazy.nvim) plugin manager. Please go through the entire `README.md` for `lazy.nvim` as this will help to build a general understanding for the configuration mechanisms, the available properties, and how to lazily load plugins. More details on customizing plugins in AstroNvim can be found on the [Custom Plugins page](/configuration/custom_plugins).

You can get a template configuration from [here!](https://github.com/AstroNvim/template) This should provide a solid starting point on which you can build your customized environment. Check out the pages for [Using these docs](/using_the_docs) and [Manageing User Configuration](/configuration/manage_user_config).

Lastly, please go through the rest of the documentation as most of the common customizations are already thoroughly explained.

## Why does AstroNvim not work?

Please follow the [Installation Guide](/#%EF%B8%8F-installation). Make sure that you're system meets all of the listed [Requirements](/#-requirements). Please be aware that some features, like folding, might be missing if you're not using the latest stable release of Neovim and/or AstroNvim. There's also no support for nightly Neovim so make sure to be running a stable version if you're experiencing issues.

## Why are my icons missing/broken?

The font in your terminal requires the correct glyphs (icons) so AstroNvim can display them. For that you can use a pre-patched font from [Nerd Fonts](https://www.nerdfonts.com/).

If you're already using a Nerd Font and face this issue it's very likely that your Nerd Font is outdated. Please verify that your Font is of Version 2.3+ and that you chose it in your terminal.

If your icons appear too small it's because you're using a Mono font. If a font ends with `mono` the icons will also be mono-spaced. [Video recommendation](https://youtu.be/mQdB_kHyZn8) on how to install a Nerd Font for a handful of popular terminals.

## Why am I getting `symbol not found` error on Mac OS Sonoma?

This was a bug in core Neovim not supporting Mac OS Sonoma. Most likely you have outdated [neovim](https://github.com/neovim/neovim), please update to atleast v0.9.4

## Why `<Leader>fw` is not working?

Make sure you have [ripgrep](https://github.com/BurntSushi/ripgrep) installed. For other missing feature please check [optional requirements section](/#-requirements) in the documentation

## Why is my code syntax is not highlighted?

Ensure that the correct treesitter parser is installed and running. You will see "TS" in the bottom right on the status line. If you do not, install it for the filetype you are using with `:TSInstall <filetype>`.

## What if I require further assistance with the customization of AstroNvim?

Feel free to join our [official community Discord server!](https://discord.astronvim.com) Before asking questions please make sure go through the following steps:

1. Read the server rules in the rules channel
2. Make sure to have read the documentation ([RTFM!](https://www.urbandictionary.com/define.php?term=RTFM))
3. Use the Discord search functions within the `#astronvim` channel & the `#help-forum` channel to see if your question has been answered before
4. If the above steps didn't help then please open a post in the `#help-forum` channel and wait for someone to respond
