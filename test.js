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

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }
  files.forEach(file => {
    
	fs.readFile(path.join(directoryPath,file), 'utf8', (err, data) => {
		clearModuleCache("./cparser");
		parser = require("./cparser");
		//console.log(parser);
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


//const statements_test2 = parser.parse("\n#include <stdio.h>\n#include \"test.h\"\n#define TEST\n#define TEST_STRING \"test\"\n#define TEST_CHAR '\\n'\n#define TEST_NUMBER_INT 1234\n\n#define TEST_NUMBER_HEX 0x12FF\n\n#define TEST_NUMBER_OCT 0123\n\n#define TEST_NUMBER_BIN 0b01010101\nstruct st_test{int a;char*b;};enum e_one{this,that,the_other};\nint main(){\n\tint index=0;\n\tif(index==0){\n\t\tfor(int loop_index=0;loop_index<10;loop_index++){\n\t\t\tswitch(loop_index){\n\t\t\t\tcase 0:\n\t\t\t\tcase 2:\n\t\t\t\tcase 4:\n\t\t\t\tcase 6:\n\t\t\t\tcase 8:\n\t\t\t\t\tprintf(\"Hello World!\\n\");\n\t\t\t\tbreak;\n\t\t\t\tcase 1:\n\t\t\t\tcase 3:\n\t\t\t\tcase 5:\n\t\t\t\tcase 7:\n\t\t\t\t\tprintf(\"\\n\");\n\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\tprintf(\"Undefined\");\n\t\t\t}\n\t\t}\n\t}\n\treturn 0;\n}\n","main.c");
//console.log("Before Print");
//parser.print(statements_test2);
//console.log("After Print");