import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { contrast, distance } from './color';
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
  const floors = variant.id === 'honey' ? Floors.honey : Floors.wax;
  const colors = CodeRoles.map((role) => ({ role, hex: variant[role] }));
  const weakest = (surface: string) => Math.min(...colors.map(({ hex }) => contrast(hex, surface)));
  const pairs = colors.flatMap((first, index) => colors.slice(index + 1).map((second) => distance(first.hex, second.hex)));
  console.log(variant.name);
  expect('weakest code color on background', weakest(variant.background), floors.code);
  expect('comment on background', contrast(variant.comment, variant.background), floors.comment);
  expect('weakest code color on selection', weakest(variant.selection), floors.selection);
  expect('closest two code colors', Math.min(...pairs), SeparationFloor);
}

for (const { path, text } of outputs()) {
  if (readFileSync(join(Root, path), 'utf8') !== text) failures.push(`${path} is stale, run bun run build`);
}

if (failures.length > 0) {
  console.error(`\nFailed:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
