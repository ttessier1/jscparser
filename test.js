const { Buffer } = require('node:buffer');
const { stdin, stdout } = require('node:process');
const path = require('node:path/win32');
const fs = require('fs');
const parser = require("./cparser");

function clearModuleCache(modulePath) {
  const resolvedPath = require.resolve(modulePath);
  if (require.cache[resolvedPath]) {
    delete require.cache[resolvedPath];
  }
}

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
		clearModuleCache("./cparser");
		var parser2 = require("./cparser");
		if (err) {
		console.error("Error reading file:", err);
		return;
		}
		console.log("File content:", data);
		const statements = parser2.parse(data,file);
		parser2.print(statements);
		console.log("After Parse:");
	});
	
  });
});