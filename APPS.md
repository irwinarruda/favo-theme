# Favo for apps

Favo's editor themes put the color in the code and keep everything else quiet. An app works the other way around. Backgrounds, cards, borders and body text cover most of the screen, so they have to be calmer than an editor's, and honey has to be rare to mean anything. This page is how to build a website or an app with Favo.

<p align="center">
  <img src="assets/app-palette-dark.svg#gh-dark-mode-only" alt="The Favo app palette in dark mode: gray, sand and seven colors, twelve steps each" width="860">
  <img src="assets/app-palette-light.svg#gh-light-mode-only" alt="The Favo app palette in light mode: gray, sand and seven colors, twelve steps each" width="860">
</p>

## Quick start

1. Copy [`app/favo.css`](app/favo.css) into your project and load it before your own styles. With Tailwind v4, copy [`app/tailwind.css`](app/tailwind.css) too and import that one instead.
2. Style with the [tokens](#tokens), such as `--favo-surface`, `--favo-fg` and `--favo-primary`. Use a raw step only when no token fits.
3. Choose the mode and the neutral on `<html>`:

```html
<html data-theme="dark" data-neutral="gray">
```

`data-theme` is `dark` or `light`. Leave it out to follow the system. `data-neutral` is `gray`, the default, or `sand`.

```css
.card {
  background: var(--favo-surface);
  border: 1px solid var(--favo-line);
  color: var(--favo-fg);
}

.button {
  background: var(--favo-primary);
  color: var(--favo-on-primary);
}
```

With Tailwind, every token is a color: `bg-surface border-line text-fg`, and `bg-primary text-on-primary hover:bg-primary-hover`.

For anything that isn't CSS, such as a mobile app or a design tool, [`app/tokens.json`](app/tokens.json) holds every color in both modes and what each token points to.

## Two neutrals

**Gray** is the default. It has the same lightness and hue as the editor's backgrounds, with 15% of their color. Use it for apps, dashboards and anything people read for a long time.

Gray is also what the Favo Smoke and Favo Veil editor themes are built on.

**Sand** is the editor's own neutrals, honey and all, as in Favo Honey and Favo Wax. Use it when the brand should fill the screen, such as a landing page or a small tool.

Both share every lightness, so switching between them never changes contrast.

## Twelve steps

Every scale has the same twelve steps, and each step has the same job in dark and light. Learn the steps once and every color works the same way.

| Step | Gray and sand                                   | A color                                     |
| ---- | ----------------------------------------------- | ------------------------------------------- |
| 1    | Dark page, light card                           | Tinted page                                 |
| 2    | Dark card; light page, controls and hovered rows | Tinted card                                |
| 3    | Dark controls and hovered rows; light hover     | Soft background: badges, selected navigation |
| 4    | Dark hover; light pressed                       | Soft hover, light selection                 |
| 5    | Dark pressed                                    | Soft pressed, dark selection                |
| 6    | Separators                                      | Subtle border                               |
| 7    | Borders of cards and inputs                     | Border                                      |
| 8    | Strong borders                                  | Strong border                               |
| 9    | Placeholders and disabled text                  | Solid fill: buttons, chips                  |
| 10   | Solid gray, hovered                             | Solid fill, hovered                         |
| 11   | Secondary text                                  | Colored text and icons                      |
| 12   | Text                                            | High-contrast colored text                  |

A few things hold for every color:

- **Step 9 is the same in both modes,** and text on it is near-black, from `--favo-on-<color>`. Honey's step 9 is Favo's own `#F5A623`.
- **Step 11 is the code color.** In dark mode it is exactly the Favo Honey color for that role, so `honey-11` is the keyword color and `sky-11` the function color. In light mode it is the Favo Wax color, darkened only where it would not read on its own soft background.
- **Tinted steps share the neutrals' lightness,** so a badge sits on a card the way a gray chip would.

## Colors and their jobs

| Scale      | In code    | In an app                                                       |
| ---------- | ---------- | --------------------------------------------------------------- |
| `honey`    | keywords   | The brand: primary buttons, focus, selection, current navigation. Also warnings |
| `sky`      | functions  | Information and links                                           |
| `meadow`   | strings    | Success, and money coming in                                    |
| `coral`    | regex      | Danger and errors, and money going out                          |
| `mint`     | types      | Charts and tags                                                 |
| `lavender` | constants  | Charts and tags                                                 |
| `rose`     | parameters | Charts and tags                                                 |

## Tokens

Each token is a CSS variable, `--favo-<token>`, and a Tailwind color of the same name. The steps are of the current neutral unless a color is named.

| Token           | Dark       | Light      | Use                                              |
| --------------- | ---------- | ---------- | ------------------------------------------------ |
| `page`          | 1          | 2          | Behind everything                                |
| `surface`       | 2          | 1          | Cards, panels and the main content               |
| `raised`        | 3          | 2          | Inputs, secondary buttons, hovered rows          |
| `hover`         | 4          | 3          | Hovered controls                                 |
| `pressed`       | 5          | 4          | Pressed controls, selected rows                  |
| `overlay`       | 3          | 1          | Menus, popovers and dialogs, with a shadow       |
| `line-subtle`   | 6          | 6          | Separators inside a card                         |
| `line`          | 7          | 7          | Borders of cards and inputs                      |
| `line-strong`   | 8          | 8          | Hovered inputs, strong dividers                  |
| `fg`            | 12         | 12         | Text                                             |
| `fg-muted`      | 11         | 11         | Labels, dates and other secondary text           |
| `fg-faint`      | 9          | 9          | Placeholders and disabled text                   |
| `primary`       | honey 9    | honey 9    | Primary buttons                                  |
| `primary-hover` | honey 10   | honey 10   | Primary buttons, hovered                         |
| `on-primary`    | near-black | near-black | Text on a primary button                         |
| `primary-soft`  | honey 3    | honey 3    | Current navigation item, highlighted rows        |
| `primary-fg`    | honey 11   | honey 11   | Brand-colored text and icons                     |
| `focus`         | honey 9    | honey 11   | Focus rings                                      |
| `selection`     | honey 5    | honey 4    | Selected text                                    |

Each status, `success`, `warning`, `danger` and `info`, comes with five tokens. `success` is meadow, `warning` honey, `danger` coral and `info` sky.

| Token          | Step | Use                                   |
| -------------- | ---- | ------------------------------------- |
| `<status>`       | 11   | Status text and icons                 |
| `<status>-soft`  | 3    | Badge and banner backgrounds          |
| `<status>-line`  | 6    | Badge and banner borders              |
| `<status>-solid` | 9    | Solid alerts that must interrupt      |
| `on-<status>`    | near-black | Text on a solid alert           |

## Using color

1. **Neutrals carry the screen.** Most of what people see should be `page`, `surface`, `fg` and `fg-muted`. If a screen looks yellow, too much of it is honey.
2. **Keep honey to one thing per view:** the primary action, or where the reader is. Headings, bullets and decorative icons stay neutral.
3. **Primary buttons are honey with near-black text, in both modes.** White on honey doesn't reach readable contrast.
4. **Status color means something.** Use one status per element, and pair it with an icon or a word. Honey is both the brand and the warning color, and color alone fails readers who can't tell hues apart.
5. **Badges are soft:** `<status>-soft` behind, `<status>` for the text, `<status>-line` around. Solid fills are for the rare alert that must interrupt.
6. **Color a number only when its sign is the news.** A balance that went negative is `danger`. Amounts in a long list stay `fg`, and the sign does the talking.
7. **Higher is lighter in dark mode.** In light mode the card is the lightest thing, and the page sits one step below it.

## Contrast

`bun run check` measures these in both modes and with both neutrals, and fails if one breaks.

| Rule                                                                  | At least |
| --------------------------------------------------------------------- | -------- |
| `fg` on `page`, `surface`, `raised`, `hover`, `pressed` and `overlay` | 7:1      |
| `fg-muted` on `page`, `surface`, `raised`, `hover` and `overlay`      | 4.5:1    |
| `fg-faint` on `surface`                                               | 3:1      |
| `primary-fg` and each status on `page`, `surface` and its soft background | 4.5:1 |
| Text on `primary`, `primary-hover` and every solid status            | 4.5:1    |
| `focus` on `surface`                                                  | 3:1      |

## How the scales are made

Everything here is generated by [`src/interface.ts`](src/interface.ts) from [`palette.json`](palette.json), so a palette change reaches the app colors too. Change the generator, not the files in `app/`, then run `bun run build` and `bun run check`.

- **Gray and sand** take their lightness, hue and color from the editor's neutrals at steps 1, 2, 3, 6, 9, 11 and 12, and fill the steps between. Sand keeps the editor's exact colors there, and gray keeps 15% of their color.
- **Each color** takes its hue from its solid step. Steps 1 to 8 sit at the neutrals' lightness with a little more color each step. Step 9 is a solid at even lightness across all colors, and step 11 is the code color.
- **Secondary text and light step 11** are darkened just enough to pass the contrast rules above.
