import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const Root = join(import.meta.dir, '..');
const Folders = {
  ghostty: '.config/ghostty/themes',
  herdr: '.config/herdr/themes',
  opencode: '.config/opencode/themes',
  t3code: '.t3/userdata/themes',
  'zed/themes': '.config/zed/themes',
};
const Editors = ['code', 'cursor'];
const Extension = join(tmpdir(), 'favo-theme.vsix');

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

const editors = Editors.filter((editor) => Bun.which(editor));
if (editors.length > 0) {
  const packaged = Bun.spawnSync(['bunx', '@vscode/vsce', 'package', '--no-dependencies', '--out', Extension], {
    cwd: join(Root, 'vscode'),
  });
  if (!packaged.success) throw new Error(`could not package the extension:\n${packaged.stderr.toString()}`);
  for (const editor of editors) {
    const { success } = Bun.spawnSync([editor, '--install-extension', Extension, '--force']);
    console.log(`${success ? 'installed the extension in' : 'could not install the extension in'} ${editor}`);
  }
}
