import { mix } from '../color';
import type { Output, Variant } from '../palette';

export function herdr(variant: Variant): Output {
  const colors = {
    accent: variant.accentText,
    panel_bg: variant.background,
    active_row_bg: variant.raised,
    selection_bg: variant.selection,
    surface0: variant.border,
    surface1: variant.faint,
    surface_dim: variant.background,
    overlay0: variant.faint,
    overlay1: variant.comment,
    text: variant.foreground,
    subtext0: mix(variant.foreground, variant.comment, 0.6),
    mauve: variant.param,
    green: variant.string,
    yellow: variant.warning,
    red: variant.regex,
    blue: variant.function,
    teal: variant.type,
    peach: variant.keyword,
  };
  const lines = Object.entries(colors).map(([key, color]) => `${key} = "${color}"`);
  return {
    path: `herdr/favo-${variant.id}.toml`,
    text: `[theme]\nauto_switch = false\n\n[theme.custom]\n${lines.join('\n')}\n`,
  };
}
