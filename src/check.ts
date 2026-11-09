import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { contrast, distance } from './color';
import { Hues, Modes, Neutrals, Semantic, Status, mixed, resolve } from './interface';
import { outputs } from './outputs';
import { CodeRoles, Variants } from './palette';

const Root = join(import.meta.dir, '..');
const Floors = {
  honey: { code: 7, comment: 4.5, selection: 4.5 },
  wax: { code: 4.5, comment: 4, selection: 3.5 },
};
const SeparationFloor = 0.1;
const failures: string[] = [];

function expect(label: string, value: number, floor: number) {
  const isPassing = value >= floor;
  console.log(`  ${isPassing ? 'ok  ' : 'FAIL'} ${label}: ${value.toFixed(2)} (at least ${floor})`);
  if (!isPassing) failures.push(label);
}

for (const variant of Variants) {
  const floors = variant.appearance === 'dark' ? Floors.honey : Floors.wax;
  const colors = CodeRoles.map((role) => ({ role, hex: variant[role] }));
  const weakest = (surface: string) => Math.min(...colors.map(({ hex }) => contrast(hex, surface)));
  const pairs = colors.flatMap((first, index) => colors.slice(index + 1).map((second) => distance(first.hex, second.hex)));
  console.log(variant.name);
  expect('weakest code color on background', weakest(variant.background), floors.code);
  expect('comment on background', contrast(variant.comment, variant.background), floors.comment);
  expect('weakest code color on selection', weakest(variant.selection), floors.selection);
  expect('closest two code colors', Math.min(...pairs), SeparationFloor);
}

const InterfaceFloors = { text: 7, reading: 7, muted: 4.5, faint: 3, signal: 4.5, onSolid: 4.5, focus: 3, control: 3 };

for (const mode of Modes) {
  for (const flavor of Neutrals) {
    const token = (name: string) => resolve(Semantic[name]?.[mode] ?? '', mode, flavor);
    const weakest = (text: string, surfaces: string[]) =>
      Math.min(...surfaces.map((surface) => contrast(token(text), token(surface))));
    const states = ['page', 'surface', 'raised', 'hover', 'overlay'];
    console.log(`App palette, ${mode}, ${flavor}`);
    expect('text on every surface', weakest('fg', [...states, 'pressed']), InterfaceFloors.text);
    expect('muted text on every surface', weakest('fg-muted', states), InterfaceFloors.muted);
    expect('faint text on surface', weakest('fg-faint', ['surface']), InterfaceFloors.faint);
    const reading = mixed('fg-reading', mode, flavor);
    expect('reading text on every surface', Math.min(...states.map((surface) => contrast(reading, token(surface)))), InterfaceFloors.reading);
    const step = (name: string, index: number) => resolve(`${name}-${index}`, mode, flavor);
    expect(
      'colored text on every surface and its soft background',
      Math.min(
        ...Hues.flatMap(({ name }) =>
          [...states.map(token), step(name, 3)].map((surface) => contrast(step(name, 11), surface)),
        ),
      ),
      InterfaceFloors.signal,
    );
    expect('control borders on page, surface and raised', weakest('line-control', ['page', 'surface', 'raised']), InterfaceFloors.control);
    expect(
      'text on solid fills',
      Math.min(
        weakest('on-primary', ['primary', 'primary-hover']),
        ...Object.keys(Status).map((status) => weakest(`on-${status}`, [`${status}-solid`])),
      ),
      InterfaceFloors.onSolid,
    );
    expect('focus ring on surface', weakest('focus', ['surface']), InterfaceFloors.focus);
  }
}

for (const { path, text } of outputs()) {
  if (readFileSync(join(Root, path), 'utf8') !== text) failures.push(`${path} is stale, run bun run build`);
}

if (failures.length > 0) {
  console.error(`\nFailed:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
