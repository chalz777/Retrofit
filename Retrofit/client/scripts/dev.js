import { spawn } from 'child_process';
import { commands } from './commands';
for (const command of commands)
    spawn('npx', [...command.split(' ').slice(1), '--watch', '--ignore-watch', 'dist'], { stdio: 'inherit' });
//# sourceMappingURL=dev.js.map