import type { Output, Variant } from '../palette';

const Roles = ['keyword', 'function', 'type', 'string', 'constant', 'param', 'regex'] as const;
const Width = 130;
const Height = 110;

export function swatches(variant: Variant): Output {
  const blocks = Roles.map((role, index) => {
    const x = index * Width;
    const label = `font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="${variant.background}"`;
    return [
      `<rect x="${x}" width="${Width}" height="${Height}" fill="${variant[role]}"/>`,
      `<text x="${x + 14}" y="${Height - 34}" font-size="15" font-weight="600" ${label}>${role}</text>`,
      `<text x="${x + 14}" y="${Height - 14}" font-size="13" ${label}>${variant[role]}</text>`,
    ].join('');
  });
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Width * Roles.length} ${Height}" role="img" aria-label="${variant.name} code colors">`,
    `<title>${variant.name} code colors</title>`,
    '<clipPath id="round"><rect width="100%" height="100%" rx="14"/></clipPath>',
    `<g clip-path="url(#round)">${blocks.join('')}</g>`,
    '</svg>',
  ];
  return { path: `assets/palette-${variant.id}.svg`, text: `${svg.join('\n')}\n` };
}
