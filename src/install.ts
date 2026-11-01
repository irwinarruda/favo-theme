import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

const Root = join(import.meta.dir, '..');
const Folders = {
  ghostty: '.config/ghostty/themes',
  herdr: '.config/herdr/themes',
  opencode: '.config/opencode/themes',
  t3code: '.t3/userdata/themes',
  'zed/themes': '.config/zed/themes',
};

for (const [source, destination] of Object.entries(Folders)) {
  const folder = join(homedir(), destination);
  if (!existsSync(dirname(folder))) continue;
  mkdirSync(folder, { recursive: true });
  for (const file of readdirSync(join(Root, source))) {
    rmSync(join(folder, file), { force: true });
    copyFileSync(join(Root, source, file), join(folder, file));
    console.log(`installed ${destination}/${file}`);
  }
}
