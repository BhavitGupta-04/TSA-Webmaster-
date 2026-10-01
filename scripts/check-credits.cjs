#!/usr/bin/env node
/**
 * Checks that the credits on /sources still match what the site actually uses.
 *
 *   node scripts/check-credits.cjs              → report only
 *   node scripts/check-credits.cjs --table      → also print the SOURCES.md icon table
 *
 * Exits 1 if anything is uncredited or credited but missing, so it can be wired
 * into CI later. Run it before submitting — an icon added in a hurry is the
 * easiest way for the credits page to quietly go out of date.
 */
const fs = require('fs');
const path = require('path');

const SOURCES = 'src/data/sources.ts';
const PHOTOS = 'src/data/photos.ts';
const PHOTO_DIR = 'public/photos';

const norm = (p) => p.split(path.sep).join('/');

function collectFiles(dir) {
  const found = [];
  (function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.tsx?$/.test(entry.name)) found.push(full);
    }
  })(dir);
  return found;
}

// --- Icons -----------------------------------------------------------------
const iconUsage = new Map();
for (const file of collectFiles('src')) {
  if (norm(file).endsWith(SOURCES)) continue;
  const src = fs.readFileSync(file, 'utf8');
  // [^}]* cannot cross a closing brace, so each match is one import block.
  for (const match of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*'lucide-react'/g)) {
    for (const raw of match[1].split(',')) {
      const name = raw.trim().replace(/^type\s+/, '');
      if (!name || name === 'LucideIcon') continue;
      if (!iconUsage.has(name)) iconUsage.set(name, new Set());
      iconUsage.get(name).add(norm(file));
    }
  }
}

const sourcesSrc = fs.readFileSync(SOURCES, 'utf8');
const cited = [...sourcesSrc.matchAll(/^ {2}\{ name: '([A-Za-z0-9]+)', slug: '([a-z0-9-]+)'/gm)];
const citedNames = new Set(cited.map((m) => m[1]));

const iconsUncredited = [...iconUsage.keys()].filter((name) => !citedNames.has(name)).sort();
const iconsUnused = [...citedNames].filter((name) => !iconUsage.has(name)).sort();

// --- Photographs -----------------------------------------------------------
const photosSrc = fs.readFileSync(PHOTOS, 'utf8');
const creditedPhotos = new Set([...photosSrc.matchAll(/^ {4}id: '([a-z0-9-]+)'/gm)].map((m) => m[1]));
const onDisk = new Set(
  fs.existsSync(PHOTO_DIR) ? fs.readdirSync(PHOTO_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((f) => f.replace(/\.[^.]+$/, '')) : []
);

const photosUncredited = [...onDisk].filter((id) => !creditedPhotos.has(id)).sort();
const photosMissing = [...creditedPhotos].filter((id) => !onDisk.has(id)).sort();

// --- Report ----------------------------------------------------------------
const problems = [];
const line = (label, list) => {
  if (list.length === 0) return;
  problems.push(`${label}: ${list.join(', ')}`);
};

line('Icons used but NOT credited', iconsUncredited);
line('Icons credited but no longer used', iconsUnused);
line('Photos on disk but NOT credited', photosUncredited);
line('Photos credited but missing from disk', photosMissing);

console.log(`Icons:  ${iconUsage.size} used, ${citedNames.size} credited`);
console.log(`Photos: ${onDisk.size} on disk, ${creditedPhotos.size} credited`);

if (process.argv.includes('--table')) {
  console.log('\n--- SOURCES.md icon table ---');
  console.log('| Icon name | Lucide page | Used in |');
  console.log('| --- | --- | --- |');
  for (const [, name, slug] of cited) {
    const used = [...(iconUsage.get(name) || [])].sort().map((f) => '`' + f + '`').join(', ');
    console.log(`| ${name} | https://lucide.dev/icons/${slug} | ${used || '—'} |`);
  }
}

if (problems.length > 0) {
  console.error('\nCredits are out of date:');
  for (const problem of problems) console.error(`  · ${problem}`);
  console.error('\nUpdate src/data/sources.ts or src/data/photos.ts, then re-run.');
  process.exit(1);
}

console.log('\nEverything on the site is credited, and every credit points at something real.');
