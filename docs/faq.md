---
id: faq
title: Frequently Asked Questions
---

## Why does AstroNvim not work?

Please follow the Installation guide. Make sure that you're using nvim version 0.8+ with `nvim --version`. Please be aware that some features, like folding, are missing if you're not on version 0.9+. There's also no support for nightly nvim so make sure to be running a stable version of nvim if you're experiencing issues.

## Why are my icons missing/broken?

The font that in your terminal requires the correct glyphs (icons) so AstroNvim can display them. For that you can use a pre-patched font from [Nerd Fonts](https://www.nerdfonts.com/).

If you're already using a Nerd Font and face this issue it's very likely that your Nerd Font is outdated. Please verify that your Font is of Version 2.3+ and that you chose it in your terminal.

If your icons appear too small it's because you're using a Mono font. If a font ends with `mono` the icons will also be mono-spaced. [Video recommendation](https://youtu.be/mQdB_kHyZn8) on how to install a Nerd Font for a handful of popular terminals.

## How do I customize AstroNvim?

AstroNvim offers the addition of plugin specs with zero abstraction thanks to the [lazy.nvim](https://www.github.com/folke/lazy.nvim) plugin manager. Please go through the entire README.md for lazy.nvim as this will help this will help to build a general understanding for the configuration mechanism, the available properties and how to lazily load plugins.

You can get a starter configuration from [here!](https://github.com/AstroNvim/user_example) This should provide a solid starting point on which you can build your customized environment. You have two options on where to place your user configuration: Either clone the user directory to `~/.config/nvim/lua` or `~/.config/astronvim/lua`. A one-liner for the latter: `mkdir -p ~/.config/astronvim/lua && git clone --depth 1 git@github.com:AstroNvim/user_example.git ~/.config/astronvim/lua`

Lastly, please go through the rest of the docs as most of the common customizations are already thoroughly explained.

## How do I add plugin X to my configuration?

AstroNvim provides a community-driven project called [Astrocommunity](https://github.com/AstroNvim/astrocommunity) to which every user is able to contribute a minimal plugin configuration. It is recommended to look there first since you can decide to either import a plugin spec if it's available or use it as a basis for your customized spec.

If a plugin is missing feel free to contribute it. Otherwise please refer to [this section](#how-do-i-customize-astronvim) and develop a general understanding for the specification of plugins.

## What if I require further assistance with the customization of AstroNvim?

Feel free to join our [community discord!](https://discord.gg/astronvim) Before asking questions please make sure go through the following steps:

1. Read the server rules in the rules channel
2. Make sure to have read the documentation ([RTFM!](https://www.urbandictionary.com/define.php?term=RTFM))
3. Use the discord search functions within the astronvim channel & the help-forum to see if your question has been answered before
4. If the above steps didn't help then please open a post in the help-forum channel and wait for someone to respond
