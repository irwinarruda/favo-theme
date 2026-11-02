const tag = process.argv[2];
const { version: extensionVersion } = await Bun.file('vscode/package.json').json();
const { version: zedVersion } = Bun.TOML.parse(await Bun.file('zed/extension.toml').text()) as { version: string };

if (tag !== `v${extensionVersion}` || tag !== `v${zedVersion}`) {
  console.error(`Tag ${tag} needs vscode/package.json (${extensionVersion}) and zed/extension.toml (${zedVersion}) to match it.`);
  process.exit(1);
}
console.log(`${tag} matches vscode/package.json and zed/extension.toml`);
