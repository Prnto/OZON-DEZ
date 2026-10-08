import { execSync } from 'node:child_process';
import fs from 'node:fs';

try {
	console.log('1. Setting up temporary index...');
	process.env.GIT_INDEX_FILE = 'temp-gh-pages-index';
	if (fs.existsSync('temp-gh-pages-index')) fs.unlinkSync('temp-gh-pages-index');

	console.log('2. Staging build folder...');
	execSync('git --work-tree=build add -A', { stdio: 'inherit' });

	console.log('3. Writing tree...');
	const tree = execSync('git write-tree').toString().trim();
	console.log('Tree:', tree);

	console.log('4. Creating commit...');
	const commit = execSync(`git commit-tree ${tree} -m "Deploy static site to gh-pages"`).toString().trim();
	console.log('Commit:', commit);

	if (fs.existsSync('temp-gh-pages-index')) fs.unlinkSync('temp-gh-pages-index');

	console.log('5. Pushing to origin gh-pages...');
	execSync(`git push origin ${commit}:refs/heads/gh-pages --force`, { stdio: 'inherit' });

	console.log('✅ Successfully pushed to origin gh-pages!');
} catch (err) {
	console.error('Error:', err.message);
	if (fs.existsSync('temp-gh-pages-index')) fs.unlinkSync('temp-gh-pages-index');
	process.exit(1);
}
