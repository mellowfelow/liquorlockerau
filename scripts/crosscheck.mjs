import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('=== RUNNING PRE-SHIP CROSSCHECK VERIFICATION ===\n');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Site config check
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.js');
assert(fs.existsSync(siteConfigPath), 'src/config/site.js single source of truth exists');

// 2. Check agent-ready files
const publicDir = path.join(rootDir, 'public');
const wellKnownDir = path.join(publicDir, '.well-known');

assert(fs.existsSync(path.join(publicDir, 'robots.txt')), 'public/robots.txt exists');
assert(fs.existsSync(path.join(publicDir, 'llms.txt')), 'public/llms.txt exists');

const authMdPath = path.join(publicDir, 'auth.md');
assert(fs.existsSync(authMdPath), 'public/auth.md exists');
if (fs.existsSync(authMdPath)) {
  const authContent = fs.readFileSync(authMdPath, 'utf8');
  assert(authContent.trim().startsWith('# Auth.md'), 'auth.md starts with "# Auth.md"');
}

assert(fs.existsSync(path.join(wellKnownDir, 'api-catalog')), '.well-known/api-catalog exists');
assert(fs.existsSync(path.join(wellKnownDir, 'agent-skills', 'index.json')), '.well-known/agent-skills/index.json exists');
assert(fs.existsSync(path.join(wellKnownDir, 'mcp', 'server-card.json')), '.well-known/mcp/server-card.json exists');

const ucpPath = path.join(wellKnownDir, 'ucp');
assert(fs.existsSync(ucpPath), '.well-known/ucp exists');
if (fs.existsSync(ucpPath)) {
  try {
    const ucpData = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
    assert(ucpData.ucp === '1.0', '.well-known/ucp has "ucp":"1.0" property');
  } catch (e) {
    assert(false, '.well-known/ucp is valid JSON');
  }
}

assert(fs.existsSync(path.join(publicDir, 'js', 'webmcp.js')), 'public/js/webmcp.js exists');
assert(fs.existsSync(path.join(rootDir, 'vercel.json')), 'vercel.json exists at root');

console.log('\n===============================================');
if (failures === 0) {
  console.log('🎉 ALL CROSSCHECK CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error(`💥 CROSSCHECK FAILED WITH ${failures} ERRORS.`);
  process.exit(1);
}
