// Compatibility entry point. See PORTAL.md for optional Python rendering dependencies.
import { spawn } from 'node:child_process';
const child = spawn('python', ['scripts/render-full-lessons.py'], { windowsHide: true, stdio: 'inherit' });
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
