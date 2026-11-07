# Credits

Favo was designed by [Irwin Arruda](https://github.com/irwinarruda) with [Claude](https://claude.com). The palette, code and documents in this repository are original work, released under the [MIT License](LICENSE).

## Inspiration

**[Dracula](https://draculatheme.com)**, created by Zeno Rocha and carried by its contributors, is why Favo exists. Favo takes its inspiration from how Dracula handles contrast and syntax highlighting, especially in TypeScript projects.

## What Favo brought

Three things here are Favo's own:

- **The color roles.** Honey leads as the keyword color on a near-black warm background, with sky functions, mint types, meadow strings, lavender constants, rose parameters and coral patterns.
- **Wax, tuned rather than inverted.** The light variant keeps the same roles, with each color chosen again for a warm cream background.
- **A contract you can check.** Contrast and separation are written down as rules, and a script fails the build when a color breaks one.

## Built on

- The Honey and Wax themes and the logo from [favo](https://github.com/irwinarruda/favo-cli).
- The contrast formula from [WCAG 2.1](https://www.w3.org/TR/WCAG21/).
- [OKLab](https://bottosson.github.io/posts/oklab/), by Björn Ottosson, for measuring how different two colors look.
- The public documentation and schemas of each app: the help pages of [Neovim](https://neovim.io/doc/) and [Vim](https://www.vim.org/docs.php), the plugins listed in the README, and the theme docs of [VS Code](https://code.visualstudio.com/api/references/theme-color), [Zed](https://zed.dev/docs/extensions/themes), [Ghostty](https://ghostty.org/docs/features/theme), [OpenCode](https://opencode.ai/docs/themes/) and [Herdr](https://herdr.dev). Each port was written from these and from [SPEC.md](SPEC.md).
- [Radix Colors](https://www.radix-ui.com/colors), for the idea of a twelve-step scale where each step has one job. The app palette in [APPS.md](APPS.md) follows that structure with its own colors.
- [Dracula for Visual Studio Code](https://github.com/dracula/visual-studio-code), as a checklist of which TextMate scopes a theme should cover. The scopes were checked against the grammars that ship with VS Code, and which color goes where comes from [SPEC.md](SPEC.md).

## Neighbors

Warm dark themes with amber accents are a family, and Favo has relatives. We measured it against the 819 themes that ship with [Ghostty](https://ghostty.org), comparing each color by how different it looks.

For Honey, the closest is [Ayu](https://github.com/ayu-theme), then [Warm Burnout](https://github.com/felipefdl/warm-burnout). For Wax, the closest are Analyzed Light, HN Classic and Warm Burnout Light.

We found these after the palette was made, so they are neighbors rather than sources. They are good company, and worth a look if Favo is close to what you want but not quite it.
