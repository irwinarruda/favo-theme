import type { Output, Variant } from '../palette';

export function ghostty(variant: Variant): Output {
  const lines = [
    ...variant.ansi.map((color, index) => `palette = ${index}=${color}`),
    `background = ${variant.background}`,
    `foreground = ${variant.foreground}`,
    `cursor-color = ${variant.accent}`,
    `cursor-text = ${variant.background}`,
    `selection-background = ${variant.selection}`,
    `selection-foreground = ${variant.foreground}`,
  ];
  return { path: `ghostty/favo-${variant.id}`, text: `${lines.join('\n')}\n` };
}
