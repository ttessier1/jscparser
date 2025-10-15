const { Buffer } = require('node:buffer');
const { stdin, stdout } = require('node:process');
const path = require('node:path/win32');
const fs = require('fs');
const parser = require("./cparser");
//console.log("IsTty(stdin):",process.stdin.isTTY);
//console.log("IsTty(stdout):",process.stdout.isTTY);
process.stdout.setDefaultEncoding('utf-8');

const directoryPath = path.join(__dirname, 'test');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }
  files.forEach(file => {
    console.log(path.join(directoryPath,file));
	fs.readFile(path.join(directoryPath,file), 'utf8', (err, data) => {
		if (err) {
		console.error("Error reading file:", err);
		return;
		}
		console.log("File content:", data);
		const statements = parser.parse(data,file);
		console.log(statements);
		parser.print(statements);
		console.log("After Parse:");
	});
	
  });
});