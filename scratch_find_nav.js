import fs from 'fs';
const content = fs.readFileSync('cakebites-react/src/main.jsx', 'utf8');
const lines = content.split('\n');
const results = [];
lines.forEach((line, i) => {
  if (line.includes('navigateTo') || line.includes('setCurrentPage') || line.includes('currentPage')) {
    results.push((i+1) + ': ' + line.trim().slice(0, 120));
  }
});
// Write to file
fs.writeFileSync('scratch_nav_lines.txt', results.slice(0, 60).join('\n'), 'utf8');
console.log('Done, lines found:', results.length);
