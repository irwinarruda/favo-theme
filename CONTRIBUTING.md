# Contributing

New ports and fixes are welcome. [SPEC.md](SPEC.md) is the theme, so most changes start there.

## Setup

You need [Bun](https://bun.sh). There are no dependencies to install.

```sh
bun run build            # writes every generated file from palette.json
bun run check            # checks contrast, separation and that generated files are current
bun run install-themes   # copies the Ghostty, Zed, OpenCode, T3 Code and Herdr files into your home folder, and installs the VS Code and Cursor extension
```

## What is generated

`palette.json` is the source of truth. Everything in `ghostty/`, `herdr/`, `opencode/`, `t3code/`, `vim/colors/`, `vscode/themes/` and `zed/themes/`, plus `lua/favo/palette.lua` and `assets/palette-*.svg`, comes out of `src/targets/`. Edit the target, not the output.

The Neovim theme is the exception: the files in `colors/` and `lua/` are written by hand, and only the palette table is generated.

## Adding a port

1. Add a target in `src/targets/` and list it in `src/outputs.ts`, or hand-write the files if the app needs real code.
2. Follow "Writing a port" in [SPEC.md](SPEC.md).
3. Add an install section to the README.
4. Run `bun run build` and `bun run check`.

## Keep it original

Please write ports from the spec and from the app's own public docs. Don't copy from, or adapt, the files of another theme, even an open source one, and never from a paid or proprietary one. Token and group names are fine to use: they belong to the app. The list of which color goes where comes from this spec.

If you change a color, `bun run check` has to stay green. The contrast rules are the reason this theme exists.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org).
