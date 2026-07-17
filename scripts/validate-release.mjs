import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const tag = process.env.GITHUB_REF_NAME;
const ref = process.env.GITHUB_REF;
const commit = process.env.GITHUB_SHA;
const numericIdentifier = '(?:0|[1-9]\\d*)';
const nonNumericIdentifier = '(?:\\d*[A-Za-z-][0-9A-Za-z-]*)';
const prereleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
const buildIdentifier = '[0-9A-Za-z-]+';
const semverPattern = new RegExp(
    `^${numericIdentifier}\\.${numericIdentifier}\\.${numericIdentifier}` +
        `(?:-${prereleaseIdentifier}(?:\\.${prereleaseIdentifier})*)?` +
        `(?:\\+${buildIdentifier}(?:\\.${buildIdentifier})*)?$`,
);

if (manifest.name !== 'sdk-node-apis-efi') {
    throw new Error(`Unexpected package name: ${manifest.name}`);
}

if (typeof tag !== 'string' || !semverPattern.test(tag)) {
    throw new Error(`Release tag must be a SemVer without a v prefix: ${tag ?? '<missing>'}`);
}

if (ref !== `refs/tags/${tag}`) {
    throw new Error(`Release must run from refs/tags/${tag}; received ${ref ?? '<missing>'}`);
}

if (manifest.version !== tag) {
    throw new Error(`Tag ${tag} does not match package version ${manifest.version}`);
}

if (typeof commit !== 'string' || commit.length === 0) {
    throw new Error('GITHUB_SHA is required');
}

const ancestry = spawnSync('git', ['merge-base', '--is-ancestor', commit, 'origin/master'], {
    cwd: projectRoot,
    stdio: 'inherit',
});

if (ancestry.error) {
    throw ancestry.error;
}

if (ancestry.status !== 0) {
    throw new Error(`Release commit ${commit} does not belong to origin/master`);
}

console.log(`${manifest.name}@${manifest.version} is ready for publishing`);
