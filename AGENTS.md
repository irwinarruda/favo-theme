# favo-theme

Favo is a warm theme with four variants, Favo Honey and Favo Smoke (dark) and Favo Wax and Favo Veil (light), ported to Neovim, Vim, VS Code, Cursor, Zed, Ghostty, OpenCode, T3 Code and Herdr. One palette and one spec generate almost everything, and there are no dependencies to install.

## Commands

Use Bun `1.3.14`.

- `bun run build` writes every generated file from `palette.json`.
- `bun run check` checks contrast, separation and that generated files are current. CI runs it on every pull request, and every release runs it first.
- `bun run check:release-version vX.Y.Z` checks that both version files match a tag.
- `bun run release:notes vX.Y.Z` prints a version's section of `CHANGELOG.md`.
- `bun run install-themes` copies the theme files into your home folder and installs the extension with `code` and `cursor`. It changes your real setup, so only run it when asked.

## Where things live

- `SPEC.md` is the theme. `palette.json` is the one source of truth for colors.
- `src/targets/` generates `app/`, `ghostty/`, `herdr/`, `opencode/`, `t3code/`, `vim/colors/`, `vscode/themes/` and `zed/themes/`, plus `lua/favo/palette.lua` and `assets/*palette*.svg`. Edit the target, never the output.
- `APPS.md` is the guideline for websites and apps. Its scales and tokens come from `src/interface.ts`. Smoke and Veil are made in `src/palette.ts` from Honey and Wax with that gray, so every port gets them by looping over `Variants`.
- `lua/` and `colors/` are the hand-written Neovim theme. Only the palette table is generated, so a token change there is manual.
- `vscode/package.json`, `vscode/README.md` and `zed/extension.toml` are hand-written.
- `assets/logo*.svg` and `assets/mark*.svg` are copies of [irwin-ui](https://github.com/irwinarruda/irwin-ui)'s `brand/favo/`, where every mark of the family is generated. Never edit or redraw them here: change the mark in irwin-ui and copy it. `vscode/icon.png` is `mark.svg` rendered at 512 px.
- Favo is one of the themes of irwin-ui, Irwin Arruda's design system, and a product of its own. Standards that hold for every theme live there: how color is used, type, the brand marks and patterns. Keep here only what is Favo's own, and keep it complete without that repository.

## Changing the theme

1. If a rule changes, change `SPEC.md` first. It decides which color goes where for every port.
2. Change `palette.json`, or the targets and hand-written ports the change touches.
3. Run `bun run build`, then `bun run check`, and commit the generated files in the same commit as the change.
4. Add the change to `CHANGELOG.md` in that same commit, as below.
5. Open a pull request, then release it. A change someone using Favo would notice is not done at the merge, it is done when the release is live.

## Releasing

Set the new version in both `vscode/package.json` and `zed/extension.toml`, turn `## [Unreleased]` in `CHANGELOG.md` into `## [X.Y.Z] - YYYY-MM-DD` under a new empty `## [Unreleased]`, update the compare links at its bottom, and land that on `main`. Then push a `vX.Y.Z` tag on the commit that landed, which a rebase merge gives a new hash. That changelog section becomes the description of the GitHub Release, `release:notes` fails the release when the section is missing or empty, and `check:release-version` fails it when either version disagrees with the tag.

`.github/workflows/release.yml` runs on the tag. It checks contrast and generated files, packages the extension, creates the GitHub Release with the `.vsix` attached, then publishes that same file to the VS Code Marketplace and to Open VSX, which is where Cursor gets its extensions. Nothing is published by hand. The Marketplace needs no secret, because it trusts `release.yml` by name through a Trusted Publishing policy on the publisher page, so renaming that file breaks publishing.

Use a patch for fixes, a minor for a new port or a change to how Favo looks, and a major only if a port stops working the way it did. The VS Code extension is the only port with a registry. Every other port is files in this repo, so the release is their version too.

To re-run a failed release, use `gh workflow run release.yml --ref vX.Y.Z -f tag=vX.Y.Z`. A published GitHub Release stays as it is, and a store that already has the version skips it. That skip counts as a success, so a green run alone proves nothing: confirm the new version is on the VS Code Marketplace and on Open VSX before calling a release done. Cursor runs its own scan before it lists a release, and that can take much longer.

## Working agreements

- ALWAYS update `CHANGELOG.md` in the same commit as any change someone using Favo would notice: a color, a token, a new port, a fix or an install step. Add one plain-language line under `## [Unreleased]`, in `Added`, `Changed`, `Fixed` or `Removed`, written for users, not about the code. Refactors, tests, CI and internal docs need no entry.
- Commits follow Conventional Commits.
- No merge commits. Bring a branch up to date with `git rebase`, and land a pull request by rebase.
- Write ports from `SPEC.md` and the app's public docs, never from another theme's files. Token and scope names belong to the app, and which color goes where comes from the spec.
- Check VS Code scopes against the grammars that ship with the app, because scope lists in other themes go stale.
- VS Code's current find match is `selection` with an `accent` border, not the spec's `fill` with `onFill`, on purpose. `editor.findMatchForeground` and `editor.findMatchHighlightForeground` were swapped through VS Code 1.144 and still are in Cursor, and no pair of values reads well under both. Keep it until Cursor has the fix.
- `faint` is deliberately low contrast. Use it only for text a reader can safely ignore.
- Do not say a change works until you watched it in the real app. `bun run check` covers the palette, not how a port renders.
