---
id: mappings
title: Default Mappings
---

## General Mappings

| Action                      | Mappings               |
| --------------------------- | ---------------------- |
| Leader key                  | `Space`                |
| Escape key                  | `jj`, `jk`             |
| Resize up                   | `Ctrl + Up`            |
| Resize Down                 | `Ctrl + Down`          |
| Resize Left                 | `Ctrl + Left`          |
| Resize Right                | `Ctrl + Right`         |
| Up Window                   | `Ctrl + k`             |
| Down Window                 | `Ctrl + j`             |
| Left Window                 | `Ctrl + h`             |
| Right Window                | `Ctrl + l`             |
| Force Write                 | `Ctrl + s`             |
| Force Quit                  | `Ctrl + q`             |
| New File                    | `<leader> + fn`        |
| Close Buffer                | `<leader> + c`         |
| Next Tab (real vim tab)     | `]t`                   |
| Previous Tab (real vim tab) | `[t`                   |
| Comment                     | `<leader> + /`         |
| Horizontal Split            | `\`                    |
| Vertical Split              | <code>&#124;</code>    |

## Buffers

| Action                                                              | Mappings                        |
| ------------------------------------------------------------------- | ------------------------------- |
| Next Buffer                                                         | `Shift + l`                     |
| Previous Buffer                                                     | `Shift + h`                     |
| Move Buffer Right                                                   | `>b`                            |
| Move Buffer Left                                                    | `<b`                            |
| Navigate to buffer tab with interactive picker                      | `<leader> + bb`                 |
| Delete a buffer tab with interactive picker                         | `<leader> + bd`                 |
| Open a buffer tab in a new horizontal split with interactive picker | `<leader> + b\`                 |
| Open a buffer tab in a new vertical split with interactive picker   | <code><leader> + b&#124;</code> |

## Neo-Tree

| Action         | Mappings       |
| -------------- | -------------- |
| Neotree toggle | `<leader> + e` |
| Neotree focus  | `<leader> + o` |

## Dashboard Mappings

| Action           | Mappings       |
| ---------------- | -------------- |
| Dashboard (Home) | `<leader> + h` |

## Session Manager Mappings

| Action                         | Mappings        |
| ------------------------------ | --------------- |
| Save Session                   | `<leader> + Ss` |
| Last Session                   | `<leader> + Sl` |
| Delete Session                 | `<leader> + Sd` |
| Search Sessions                | `<leader> + Sf` |
| Load Current Directory Session | `<leader> + S.` |

## Package Management Mappings

| Action                    | Mappings        |
| ------------------------- | --------------- |
| AstroNvim Packages Update | `<leader> + pa` |
| AstroNvim Updater         | `<leader> + pA` |
| AstroNvim Changelog       | `<leader> + pl` |
| AstroNvim Version         | `<leader> + pv` |
| Mason Installer           | `<leader> + pm` |
| Mason Updater             | `<leader> + pM` |
| Packer Install            | `<leader> + pi` |
| Plugins Status            | `<leader> + ps` |
| Plugins Sync              | `<leader> + pS` |
| Plugins Check for Updates | `<leader> + pu` |
| Plugins Update            | `<leader> + pU` |

## LSP Mappings

| Action               | Mappings              |
| -------------------- | --------------------- |
| LSP Info             | `<leader> + li`       |
| Null-ls Info         | `<leader> + lI`       |
| Hover Document       | `Shift + k`           |
| Format Document      | `<leader> + lf`       |
| Symbols Outline      | `<leader> + lS`       |
| Line Diagnostics     | `gl`, `<leader> + ld` |
| All Diagnostics      | `<leader> + lD`       |
| Code Actions         | `<leader> + la`       |
| Signature Help       | `<leader> + lh`       |
| Rename               | `<leader> + lr`       |
| Document Symbols     | `<leader> + ls`       |
| Workspace Symbols    | `<leader> + lG`       |
| Diagnostic Next      | `]d`                  |
| Diagnostics Previous | `[d`                  |
| Declaration          | `gD`                  |
| Type Definition      | `gT`                  |
| Definition           | `gd`                  |
| Implementation       | `gI`                  |
| References           | `gr`                  |

## Debugger Mappings

| Action                  | Mappings                     |
| ----------------------- | ---------------------------- |
| Start/Continue Debugger | `<leader> + dc` or `<F5>`    |
| Pause Debugger          | `<leader> + dp` or `<F6>`    |
| Restart Debugger        | `<leader> + dr` or `<C-F5>`  |
| Close Debugger Session  | `<leader> + dq`              |
| Terminate Debugger      | `<leader> + dQ` or `<S-F5>`  |
| Toggle Breakpoint       | `<leader> + db` or `<F9>`    |
| Clear Breakpoints       | `<leader> + dB`              |
| Step Over               | `<leader> + do` or `<F10>`   |
| Step Into               | `<leader> + di` or `<F11>`   |
| Step Out                | `<leader> + dO` or `<S-F11>` |
| Toggle REPL             | `<leader> + dR`              |
| Toggle Debugger UI      | `<leader> + du`              |
| Debugger Hover          | `<leader> + dh`              |

## Telescope Mappings

| Action                            | Mappings                         |
| --------------------------------- | -------------------------------- |
| Live Grep                         | `<leader> + fw`                  |
| Live Grep (include hidden files)  | `<leader> + fW`                  |
| Git Status                        | `<leader> + gt`                  |
| Git Branches                      | `<leader> + gb`, `<leader> + sb` |
| Git Commits                       | `<leader> + gc`                  |
| Find files                        | `<leader> + ff`                  |
| Find files (include hidden files) | `<leader> + fF`                  |
| Buffers                           | `<leader> + fb`                  |
| Help Tags                         | `<leader> + fh`, `<leader> + sh` |
| Marks                             | `<leader> + fm`                  |
| Old Files                         | `<leader> + fo`                  |
| Man Pages                         | `<leader> + sm`                  |
| Notifications                     | `<leader> + sn`                  |
| Registers                         | `<leader> + sr`                  |
| Keymaps                           | `<leader> + sk`                  |
| Commands                          | `<leader> + sc`                  |
| LSP Symbols                       | `<leader> + ls`                  |
| LSP Workspace Symbols             | `<leader> + lG`                  |
| LSP References                    | `<leader> + lR`                  |
| LSP Diagnostics                   | `<leader> + lD`                  |

## Toggle Terminal Mappings

| Action                    | Mappings                         |
| ------------------------- | -------------------------------- |
| Toggle Terminal           | `F7`                             |
| Floating Terminal         | `<leader> + tf`                  |
| Horizontal Split Terminal | `<leader> + th`                  |
| Vertical Split Terminal   | `<leader> + tv`                  |
| LazyGit                   | `<leader> + tl`, `<leader> + gg` |
| Node                      | `<leader> + tn`                  |
| GDU                       | `<leader> + tu`                  |
| Btm                       | `<leader> + tt`                  |

## Git Mappings

| Action        | Mappings        |
| ------------- | --------------- |
| Next Hunk     | `<leader> + gj` |
| Previous Hunk | `<leader> + gk` |
| Blame Line    | `<leader> + gl` |
| Preview Hunk  | `<leader> + gp` |
| Reset Hunk    | `<leader> + gr` |
| Stage Hunk    | `<leader> + gs` |
| Unstage Hunk  | `<leader> + gu` |
| Git Diff      | `<leader> + gd` |

## UI Mappings

| Action                  | Mappings        |
| ----------------------- | --------------- |
| Toggle autopairs        | `<leader> + ua` |
| Toggle background       | `<leader> + ub` |
| Toggle autocompletion   | `<leader> + uc` |
| Toggle color highlights | `<leader> + uC` |
| Toggle diagnostics      | `<leader> + ud` |
| Toggle auto formatting  | `<leader> + uf` |
| Toggle signcolumn       | `<leader> + ug` |
| Change indent setting   | `<leader> + ui` |
| Toggle statusline       | `<leader> + ul` |
| Change line numbering   | `<leader> + un` |
| Toggle paste mode       | `<leader> + up` |
| Toggle spellcheck       | `<leader> + us` |
| Toggle conceal          | `<leader> + uS` |
| Toggle tabline          | `<leader> + ut` |
| Toggle URL highlight    | `<leader> + uu` |
| Toggle wrap             | `<leader> + uw` |
| Toggle syntax highlight | `<leader> + uy` |
