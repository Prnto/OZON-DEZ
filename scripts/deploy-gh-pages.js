import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

try {
	console.log('1. Setting up temporary index...');
	const indexPath = path.resolve('.git', 'temp_gh_index');
	if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);

	console.log('2. Staging build folder...');
	const env = { ...process.env, GIT_INDEX_FILE: indexPath };
	execSync('git add -f --all .', { cwd: path.resolve('build'), env, stdio: 'inherit' });

	console.log('3. Writing tree...');
	const rawTree = execSync('git write-tree', { env }).toString().trim();
	const ls = execSync(`git ls-tree ${rawTree}`, { env }).toString().trim();
	let tree = rawTree;
	const match = ls.match(/040000 tree ([a-f0-9]+)\tbuild/);
	if (match) {
		tree = match[1];
	}
	console.log('Final Tree:', tree);

	console.log('4. Creating commit...');
	const commit = execSync(`git commit-tree ${tree} -m "Deploy static site to gh-pages"`).toString().trim();
	console.log('Commit:', commit);

	if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);

	console.log('5. Pushing to origin gh-pages...');
	execSync(`git push origin ${commit}:refs/heads/gh-pages --force`, { stdio: 'inherit' });

	console.log('✅ Successfully pushed to origin gh-pages!');
} catch (err) {
	console.error('Error:', err.message);
	const indexPath = path.resolve('.git', 'temp_gh_index');
	if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);
	process.exit(1);
}
