<p align="center">
  <img src="assets/logo-dark.svg#gh-dark-mode-only" alt="favo" width="300">
  <img src="assets/logo-light.svg#gh-light-mode-only" alt="favo" width="300">
</p>

<h3 align="center">A warm theme with the contrast to read code all day.<br>Honey and Smoke for the dark, Wax and Veil for the light.</h3>

<p align="center">
  <a href="https://github.com/irwinarruda/favo-theme/actions/workflows/check.yml"><img src="https://img.shields.io/github/actions/workflow/status/irwinarruda/favo-theme/check.yml?branch=main&label=contrast%20check&labelColor=14110B" alt="Contrast check status"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F5A623?labelColor=14110B" alt="MIT license"></a>
  <img src="https://img.shields.io/badge/Neovim%20%C2%B7%20Vim%20%C2%B7%20VS%20Code%20%C2%B7%20Cursor%20%C2%B7%20Zed%20%C2%B7%20Ghostty%20%C2%B7%20OpenCode%20%C2%B7%20T3%20Code%20%C2%B7%20Herdr-F3E7CF?labelColor=14110B" alt="Neovim, Vim, VS Code, Cursor, Zed, Ghostty, OpenCode, T3 Code and Herdr">
</p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#why-favo">Why Favo</a> ·
  <a href="SPEC.md">The spec</a> ·
  <a href="APPS.md">For apps</a> ·
  <a href="CREDITS.md">Credits</a>
</p>

<p align="center">
  <img src="assets/preview-honey.png#gh-dark-mode-only" alt="TypeScript code in Favo Honey, with honey keywords, sky functions, mint types and meadow strings on a near-black background" width="820">
  <img src="assets/preview-wax.png#gh-light-mode-only" alt="TypeScript code in Favo Wax, with the same color roles on a warm cream background" width="820">
</p>

<p align="center">
  <img src="assets/palette-honey.svg#gh-dark-mode-only" alt="Favo Honey code colors" width="820">
  <img src="assets/palette-wax.svg#gh-light-mode-only" alt="Favo Wax code colors" width="820">
</p>

Favo is the honeycomb. This theme started as the look of [favo](https://github.com/irwinarruda/favo-cli), and grew into a theme for everything around it: your editor, your terminal and your coding agents. Switch GitHub between dark and light to see both variants.

## Why Favo

**Two moods, one set of code colors.** Favo Honey and Favo Wax wrap your code in honey, the way the hive does. Favo Smoke and Favo Veil are the beekeeper's side: the smoke that calms a hive and the veil worn to work it. They keep every code color on a calm gray, with honey only where it means something.

| Variant        | Mode  | Surfaces                 |
| -------------- | ----- | ------------------------ |
| **Favo Honey** | dark  | Honey-tinted             |
| **Favo Wax**   | light | Honey-tinted             |
| **Favo Smoke** | dark  | Calm gray                |
| **Favo Veil**  | light | Calm gray                |

**Honey leads.** Keywords carry the honey color, so a file has a shape before you read a word of it.

**Each color has one job.** Sky is what runs, mint is the shape of data, meadow is text, lavender is a fixed value, rose is what was passed in, and coral is a pattern or a problem. Variables and properties stay in the plain text color, so color marks structure rather than everything.

**Tags and components never blur.** In JSX, `<div>` is honey and `<LoginCard>` is mint italic, so you can see what is markup and what is yours.

**Italic means "from somewhere else".** Parameters, type parameters, attributes and components are italic, because they arrive from outside the line you are reading.

**Contrast is a contract, not a feeling.** These numbers are checked on every commit:

|                                      | Honey  | Smoke  | Wax    | Veil   |
| ------------------------------------ | ------ | ------ | ------ | ------ |
| Weakest code color on the background | 7.11:1 | 7.12:1 | 4.63:1 | 4.63:1 |
| Comments on the background           | 6.29:1 | 6.32:1 | 4.12:1 | 5.49:1 |
| Weakest code color on a selection    | 4.96:1 | 5.35:1 | 3.85:1 | 3.63:1 |
| Closest two code colors (OKLab)      | 0.12   | 0.12   | 0.10   | 0.10   |

Honey and Smoke clear WCAG AAA, and Wax and Veil clear AA, for all code. Everything else is in [SPEC.md](SPEC.md): every color, every token rule and every interface rule, written so you can port Favo to anything.

## Install

Clone this repository for any app below that copies files, or run `bun run install-themes` from a clone to copy the Ghostty, Zed, OpenCode, T3 Code and Herdr files and install the VS Code and Cursor extension at once.

### Neovim

Written in Lua from scratch, and tested on Neovim 0.12. With [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "irwinarruda/favo-theme",
  name = "favo",
  lazy = false,
  priority = 1000,
  config = function()
    require("favo").setup({ transparent = false, italics = true })
    vim.cmd.colorscheme("favo-honey")
  end,
}
```

Use `favo-wax`, `favo-smoke` or `favo-veil` for the other variants. It covers tree-sitter, LSP semantic tokens, diagnostics and popular plugins: gitsigns, Telescope, nvim-cmp, blink.cmp, which-key, noice, nvim-notify, indent-blankline, rainbow-delimiters, neo-tree, nvim-tree, Trouble, nvim-dap, lazy.nvim, mason, alpha-nvim and fzf-lua.

For lualine, set `theme = "favo"`.

### Vim

With [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'irwinarruda/favo-theme', { 'rtp': 'vim' }

set termguicolors
colorscheme favo-honey
```

The other variants are `favo-wax`, `favo-smoke` and `favo-veil`.

Without a plugin manager, copy `vim/colors/*.vim` to `~/.vim/colors/`. Colors are approximated in 256-color terminals, so use `termguicolors` when you can.

### VS Code and Cursor

In VS Code, search for **Favo** in Extensions, install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=irwinarruda.favo-theme), or run:

```sh
code --install-extension irwinarruda.favo-theme
```

Cursor gets its extensions from [Open VSX](https://open-vsx.org/extension/irwinarruda/favo-theme) and scans each one before listing it, so Favo can take a while to reach its search. To install it now, download the `.vsix` from the [latest release](https://github.com/irwinarruda/favo-theme/releases/latest), then run:

```sh
cursor --install-extension favo-theme-*.vsix
```

Then pick a Favo variant with `Preferences: Color Theme`.

It covers language server highlighting, rainbow brackets, diffs, the terminal and the whole interface. In `settings.json`, the theme ids are `favo-honey`, `favo-wax`, `favo-smoke` and `favo-veil`.

### Zed

Copy [`zed/themes/favo.json`](zed/themes/favo.json) to `~/.config/zed/themes/`, then pick a Favo variant from the theme selector.

For the full effect, add [`zed/semantic-tokens.jsonc`](zed/semantic-tokens.jsonc) to your Zed settings. It turns on language server highlighting and maps it to Favo, including read-only variables, which a Zed theme can't do alone.

### Ghostty

Copy the files in `ghostty/` to `~/.config/ghostty/themes/`, then set one in your config, or a pair that follows your system:

```
theme = light:favo-wax,dark:favo-honey
theme = light:favo-veil,dark:favo-smoke
```

### OpenCode

Copy `opencode/*.json` to `~/.config/opencode/themes/`, then run `/theme` to pick one.

### T3 Code

Copy `t3code/*.json` to `~/.t3/userdata/themes/`, then run `t3 theme set favo-honey`. These have to be real files, because T3 Code ignores symlinks there.

### Herdr

Paste the contents of `herdr/favo-honey.toml`, or another variant's file, into `~/.config/herdr/config.toml`, replacing any `[theme]` section, then run `herdr server reload-config`.

### favo

Honey and Wax are built in. Smoke and Veil come with the next release of favo:

```sh
favo theme honey
favo theme wax
favo theme smoke
favo theme veil
```

## Apps and websites

Favo has a palette for websites and apps too: a calm gray, twelve steps for every Favo color, and tokens with one job each, ready as CSS, Tailwind and JSON. [APPS.md](APPS.md) has it all.

Favo is one of the themes of [irwin-ui](https://github.com/irwinarruda/irwin-ui), the design system behind [irwinarruda.com](https://www.irwinarruda.com) and The Chatbot. Type, brand marks and patterns live there. Favo stays complete by itself: [SPEC.md](SPEC.md) and [APPS.md](APPS.md) are all you need to use it.

## Port it

Favo is one [`palette.json`](palette.json) and one [spec](SPEC.md). If your favorite app is missing, the spec has everything you need, and [CONTRIBUTING.md](CONTRIBUTING.md) explains how to add it here.

## Credits

Favo is inspired by how [Dracula](https://draculatheme.com) handles contrast and syntax highlighting, especially in TypeScript projects. The full story, including Favo's closest relatives, is in [CREDITS.md](CREDITS.md).

## License

[MIT](LICENSE)
