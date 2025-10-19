const util = require('util');

 
const parser = require('./cparser');
    var code = "#include <stdlib.h>\n"+
        "#include <stdio.h>\n"+
        "int main(){\n"+
        "\tprint(\"Hello World\");\n"+
        "\treturn ;\n"+
        "}";
    var statements = parser.parse(code,"main.c");
    // print the ast back into c code which may or may not exactly match the original due to spacing differences with the pretty printer

console.log(util.inspect(statements, { showHidden: false, depth: null, colors: true }));

    parser.print(statements); 