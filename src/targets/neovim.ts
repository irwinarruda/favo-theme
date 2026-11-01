import { tints } from '../color';
import type { Output } from '../palette';
import { Variants } from '../palette';

function table(variant: (typeof Variants)[number]) {
  const { ansi, appearance, name, ...colors } = variant;
  const entries = Object.entries({ ...colors, ...tints(variant) }).filter(([key]) => key !== 'id');
  const lines = entries.map(([key, value]) => `    ${key === 'function' ? 'func' : key} = "${value}",`);
  const palette = ansi.map((color) => `"${color}"`).join(', ');
  return `  ${variant.id} = {\n    name = "${name}",\n    appearance = "${appearance}",\n${lines.join('\n')}\n    ansi = { ${palette} },\n  },`;
}

export function neovim(): Output {
  return {
    path: 'lua/favo/palette.lua',
    text: `return {\n${Variants.map(table).join('\n')}\n}\n`,
  };
}
