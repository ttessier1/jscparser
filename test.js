const { Buffer } = require('node:buffer');
const { stdin, stdout } = require('node:process');
const path = require('node:path/win32');
const fs = require('fs');

function clearModuleCache(modulePath) {
  const resolvedPath = require.resolve(modulePath);
  if (require.cache[resolvedPath]) {
    delete require.cache[resolvedPath];
  }
}


process.stdout.setDefaultEncoding('utf-8');

const directoryPath = path.join(__dirname, 'test');

if ( process.argv.length < 1)
{
	console.error("Invalid Exe\n");
}
else if (process.argv.length === 1) {
	

	fs.readdir(directoryPath, (err, files) => {
	  if (err) {
		return console.error('Unable to scan directory:', err);
	  }
	  files.forEach(file => {
		
		fs.readFile(path.join(directoryPath,file), 'utf8', (err, data) => {
			clearModuleCache("./cparser");
			parser = require("./cparser");
			if (err) {
				console.error("Error reading file:", err);
				return;
			}
			console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
			console.log(path.join(directoryPath,file));
			console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
			console.log("################################################################################");
			console.log("File content:", data);
			console.log("################################################################################");
			console.log("********************************************************************************");
			console.log("Before Parse:");
			console.log("Type of File Data:[",typeof(data),"] Length:[",data.length,"]");
			parser = require("./cparser");
			statements = parser.parse(data,file);
			console.log("After Parse:");
			console.log("********************************************************************************");
			console.log("--------------------------------------------------------------------------------");
			parser.print(statements);
			
			console.log("--------------------------------------------------------------------------------");
			
		});
		
	  });
	});
}else
{
	for ( var index = 1 ; index <process.argv.length;index++)
	{
		if(process.argv[index]=="--filter")
		{
			if(index < process.argv.length-1)
			{
				index++;
				filter = process.argv[index];
			}
		}
	}
	fs.readdir(directoryPath, (err, files) => {
	  if (err) {
		return console.error('Unable to scan directory:', err);
	  }
	  files.forEach(file => {
		if(file == filter)
		{
			fs.readFile(path.join(directoryPath,file), 'utf8', (err, data) => {
				clearModuleCache("./cparser");
				parser = require("./cparser");
				if (err) {
					console.error("Error reading file:", err);
					return;
				}
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				console.log(path.join(directoryPath,file));
				console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				console.log("################################################################################");
				console.log("File content:", data);
				console.log("################################################################################");
				console.log("********************************************************************************");
				console.log("Before Parse:");
				console.log("Type of File Data:[",typeof(data),"] Length:[",data.length,"]");
				parser = require("./cparser");
				statements = parser.parse(data,file);
				console.log("After Parse:");
				console.log("********************************************************************************");
				console.log("--------------------------------------------------------------------------------");
				parser.print(statements);
				
				console.log("--------------------------------------------------------------------------------");
				
			});
		}
		
	  });
	});
}
