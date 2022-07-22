---
id: config_mechanism
title: Configuration Mechanism
---

Configuration mechanism of AstroNvim uses a wrapper function
`astronvim.user_plugin_opts` when setting default values in the upstream
source.

This wrapper function is designed to check user configuration settings.  If
user configuration exists, it overrides or extends the upstream default values.

Running `rg user_plugin_opts` at the root of the source tree should reveal many
occurrences of `astronvim.user_plugin_opts` calls in the source.  Those are
good code point to start reading the source code.

### How user configuration of AstroNvim works

Let us describe tersely how `astronvim.user_plugin_opts` function works in
order to understand how user configuration of AstroNvim works.

The `astronvim.user_plugin_opts(module, default, extend, prefix)` is defined in
`lua/core/utils/init.lua`.  Since it is usually called without 4th-argument, it
is essentially as follows:

```lua
function astronvim.user_plugin_opts(module, default, extend)
  if extend == nil then extend = true end  -- default value is true
  default = default or {}                  -- default value is {}
  local user_settings = load_module_file("user" .. "." .. module)
  if user_settings == nil then user_settings = user_setting_table(module) end
  if user_settings ~= nil then default = func_or_extend(user_settings, default, extend) end
  return default
end
```

Let's consider a case when this is called as `user_settings("MODULE", DEFAULT, EXTEND)`.

* If module named `user.MODULE` doesn't exist, then set `user_settings` using `user.init.lua` module while looking for `"MODULE"` in this module.
  * This is the single user configuration case with the `user/init.lua` file as discussed before.
* If module named `user.MODULE` exists, then set `user_settings` using `user.MODULE` module.
  * This is the [Splitting Up Configuration](/configuration/splitting_up) case.  The specified `"MODULE"` corresponds to each split configuration file.
* If neither module named `user.MODULE` nor `user.init.lua` exists, then leave `user_settings` unset.
  * This is the no user configuration case.
* If `user_settings` isn't set, the original upstream `DEFAULT` is returned and used by AstroNvim.
* If `user_settings` is set, the upstream `DEFAULT` is updated by `user_settings`.  Update method depends on the `EXTEND` value.



