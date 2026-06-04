const fs = require('fs');
const path = require('path');

const key = process.env.BREVO_API_KEY || '';
const content = `const CONFIG = {
  BREVO_API_KEY: '${key}'
};`;

fs.writeFileSync(path.join(__dirname, 'config.js'), content, 'utf8');
console.log('Successfully generated config.js');
