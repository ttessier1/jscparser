const types = [
	"void",
	"char",
	"short",
	"int",
	"long",
	"double",
	"float"
];

const typeModifiers = [
	"signed",//
	"unsigned",//
	"short", //
	"long", // 
	"const",//
	"struct",//
	"enum", //
	"static"//
];

const operations = {
"=":1, // assignment
"+=":1,
"-=":1,
"*=":1,
"/=":1,
"%=":1,
">>=":1,
"<<=":1,
"&=":1,
"^=":1,
"|=":1,
"?":2,
":":2,
"||":3,
"&&":4,
"|":5,
"^":6,
"&":7,
"<":8,
">":8,
"<=":8,
">=":8,
"==":8,
"!=":8,
">>":9,
"<<":9,
"+":10,
"-":10,
"*":11,
"/":11,
"%":11,
".":13,
"->":13
};

const prefixedOps={
	"++":12, // prefixed ++
	"--":12, // prefixed --
	"!":12, // logical not
	"~":12, // bitwise not
	"&":12, // address of 
	"*":12, // dereference
	"+":12, // unary +
	"-":12, // unary -
	"sizeof":12,
};

const suffixOperations ={
	"++":13,
	"--":13,
};

const punctuators = [
"[",
"]",
"(",
")",
"{",
"}",
".",
"->",
"++",
"--",
"&",
"*",
"+",
"-",
"~",
"!",
"/",
"%",
"<<",
">>",
"<",
">",
"<=",
">=",
"==",
"!=",
"^",
"|",
"&&",
"||",
"?",
":",
";",
"...",
"=",
"*=",
"/=",
"%=",
"+=",
"-=",
"<<=",
">>=",
"&=",
"^=",
"|=",
",",
"#",
"##",
"<:",
">:",
"<%",
"%>",
"%:",
"%:%:"

];

const substitution_tokens ={
	"<:":"[",
	":>":"]",
	"<%":"{",
	"%>":"}",
	"%:":"#",
	"%:%:":"##"
};
const binary_operators =[
	"<<",
	">>",
	"&",
	"^",
	"|"
];
const unary_operators =[
	"&",
	"*",
	"+",
	"-",
	"~",
	"!"
];

const trigraphs= {
	"??=":"#",
	">>/":"\\",
	"??'":"^",
	"??(":"[",
	"??)":"]",
	"??!":"|",
	"??<":"{",
	"??>":"}",
	"??-":"~"
	
};

const escapeSequences = {
	"a":"\a",
	"b":"\b",
	"f":"\f",
	"n":"\n",
	"r":"\r",
	"t":"\t",
	"v":"\v"
};

const maxNestingLevelBlocks= 127;
const maxNestingLevelConditionals = 63;
const maxNestingLevelPointer = 12;
const maxNestingLevelParenthesisDeclarator = 63;
const maxNestingLevelParenthesisExpression = 63;
const maxSignificantInternalIdentifierCharacters = 63;
const maxSignificantExternalIdentifierCharacters = 31;
const maxExternalIdentifiersPerTranslationUnit = 4095;
const maxIdentifiersWithinScopeBlock = 511;
const maxMacroIdentifiersPerTranslationUnit = 4095;
const maxParametersPerFunctionDefinition = 127;
const maxArgumentsPerFunctionCall = 127;
const maxParametersPerMactro = 127;
const maxArgumentsPerMacroInvocation = 127;
const maxSourceLineSize = 4095;
const maxCharactersPerString = 4095;
const maxHostedObjectSize = 65535;
const maxIncludedNestingFiles = 15;
const maxSwitchCase = 1024;
const maxStructOrUnionMembers = 1023;
const maxEnumMembers = 1023;
const maxUnionNestingLevels = 63;

const CHAR_BIT = 8;
const SCHAR_MIN = -127;
const SCHAR_MAX = 127;
const UCHAR_MAX = 255;
const CHAR_MIN = 0;
const CHAR_MAX = 255;
const MB_LEN_MAX = 1;
const SHRT_MIN = -32767;
const SHRT_MAX = 32767;
const USHRT_MAX = 65535;
const INT_MIN = -32767;
const INT_MAX = 32767;
const UINT_MAX = 65535;
const LONG_MIN = -2147483647;
const LONG_MAX = 2147483647;
const ULONG_MAX = 4294967295;
const LLONG_MIN = -9223372036854775807;
const LLONG_MAX = 9223372036854775807;
const ULLONG_MAX = 18446744073709551615;

const FLT_DIG = 6;
const DBL_DIG = 10;
const LDBL_DIG = 10;
const FLT_RADIX = 2 ;
const FLT_MIN_10_EXP = -37;
const FLT_MAX_10_EXP = 37;
const DBL_MIN_10_EXP = -37;
const DBL_MAX_10_EXP = 37;
const LDBL_MIN_10_EXP = -37;
const LDBL_MAX_10_EXP = 37;
const FLT_EPSILON = 1E-5;
const DBL_EPSILON = 1E-9;
const LDBL_EPSILON = 1E-9;

const keywords =[
	"auto",
	"break",
	"case",
	"char",
	"const",
	"continue",
	"default",
	"do",
	"double",
	"else",
	"enum",
	"extern",
	"float",
	"for",
	"goto",
	"if",
	"inline",
	"int",
	"long",
	"register",
	"restrict",
	"return",
	"short",
	"signed",
	"sizeof",
	"static",
	"struct",
	"switch",
	"typedef",
	"union",
	"unsigned",
	"void",
	"volatile",
	"while",
	"_Bool",
	"_Complex",
	"_Imaginary"
];

const builtins = {
		"__FUNC__":"function-name",
		"__LINE__":"line_number",
		"__FILE__":"filename",
		"__DATE__":"filedate",
		"__TIME__":"filetime",
		"__DATETIME__":"filedatetime",
		"__VERSION__":"compiler version",
		"__BUILD__":"compiler build",
		
};

//const identifier = identifier_nondigit||identifier identifier_nondigit||identifier digit;
//const identifier_nondigit = nondigit||universal_character_name||implementation_defined_character;
//const nondigit = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// universal character names may not include anything lessthan 0xA0 except $@' and may not include D800 to DFFF
//const universal_character_name_ltA0 = "$@'";// not less than 0xA0 "^0x0024|0x0040|0x0060|0xD800-0xDFFF";
// universal character names may use \u0000 or \U00000000 to specify unicode characters up to 0x1FFFFF
//const digit= "0123456789";

const hexidecimalPrefix = "0x";
const octalPrefix = "0";
const unsignedSuffix = "u|U";
const longSuffix = "l|L";
const longlongSuffix = "ll|LL";

const characterConstant = '';

const parser = (function(){
	let file = {
		content:null,
		name:null,
		line:-1,
		lineCharacterPosition:-1,
		characterPosition:-1,
	};
	 
	return {
		lastCharacter:0,
		currentCharacter:0,
		nextCharacter:0,
		statements:[],
		keywords:[],
		typeNames:[],
		typeModifiers:[],
		operations:[],
		sortedOperations:[],
		tabCount:0,
		defineConstants:{},
		defines:[],
		EOF:false,
		types:[],
		initialize:function()
		{
			this.types=[];
			this.applyTypes();
			this.statements=[];
			this.keywords=[];
			this.typeNames=[];
			this.typeModifiers=[];
			this.operations=[];
			this.sortedOperations=[];
			this.tabCount=0;
			this.defineConstants={};
			this.defines=[];
			this.EOF = false;
			this.currentCharacter = undefined;
			this.nextCharacter = undefined ;
			this.lastCharacter=undefined;
			this.sortKeywords();
			this.sortTypes();
			this.sortTypeModifiers();
			this.sortOperations();
			this.statements = [];
		},
		sortKeywords:function()
		{
			//console.log("keywords:",keywords);
			this.keywords = keywords.sort(function(a,b){
				return b.length-a.length;
			});
			this.keywords = this.keywords.filter(element => element !== undefined);
			//console.log("sorted keywords:",this.keywords);
		},
		sortTypes:function()
		{
			//console.log("types:",types);
			this.typeNames = types.sort(function(a,b){
				return b.length-a.length;
			});
			this.typeNames = this.typeNames.filter(element => element !== undefined);
			//console.log("sorted types:",this.typeNames);
		},
		applyTypes:function()
		{
			for(var type in types)
			{
				if(!this.types.includes(types[type]))
				{
					this.types.push(types[type]);
				}
			}
			
		},
		sortTypeModifiers:function(){
			//console.log("modifiers:",typeModifiers);
			this.typeModifiers = typeModifiers.sort(function(a,b){
				return b.length-a.length;
			});
			this.typeModifiers = this.typeModifiers.filter(element => element !== undefined);
			//console.log("sorted modifiers:",this.typeModifiers);
		},
		sortOperations:function()
		{
			
			this.operations = operations;
			this.sortedOperations = Object.keys(operations);
			//console.log("operations:",this.sortedOperations);
			this.sortedOperations = this.sortedOperations.sort(function(a,b){
				return b.length-a.length;
			});
			this.sortedOperations = this.sortedOperations.filter(element=>element != undefined);
			//console.log("sorted operations:",this.sortedOperations);
		},
		parse:function(text,name)
		{
			file.content = text;
			file.name = name;
			file.characterPosition=0;
			this.currentCharacter = file.content[file.characterPosition];
			while(this.currentCharacter)
			{
				var position = file.characterPosition;
				
				this.skipBlanks();
				if(this.lookAhead("#")){
					//console.log("Doing PreProcessor Macro");
					this.ProcessPreProcessSymbols();
				}
				else if(this.lookAhead("struct")){
					//console.log("Found Struct");
					var statement = {type:"StructDefinition",member:[],pos:position};
					statement.name = this.readIdentifier();
					this.consume("{");
					
					while(this.definitionIncomming())
					{
						this.skipBlanks();
						var def = this.readDefinition();
						statement.member.push(def);
						this.consume(";");
					}
					this.consume("};");
					if(this.types.includes(statement.name))
					{
						this.unexpected("duplicate name:"+statement.name);
					}
					this.types.push(statement.name);
					this.sortTypes();
					this.statements.push(statement);
					
				}else if(this.lookAhead("enum")){
					var statement = {type:"EnumDefinition",member:[],pos:position};
					statement.name = this.readIdentifier();
					this.consume("{");
					this.skipBlanks();
					while(this.identifierIncoming())
					{
						this.skipBlanks();
						var def = this.readIdentifier();
						statement.member.push(def);
						if(!this.lookAhead(","))
						{
							break;
						}
					}
					this.consume("};");
					if(types.includes(statement.name))
					{
						this.unexpected("duplicate name:"+statement.name);
					}
					types.push(statement.name);
					this.sortTypes();
					this.statements.push(statement);
				}else if(this.lookAhead("typedef")){
					var def= readDefinition();
					def.type = "TypedefStatement";
					def.pos = position;
					if(types.includes(def.name))
					{
						this.unexpected("duplicate name:"+def.name);
					}
					types.push(def.name);
					this.sortTypes();
					this.statements.push(statement);
				}else if(this.definitionIncomming()){
					//console.log("Found Definition");
					var def = this.readDefinition();
					
					def.pos = position;
					if(this.lookAhead("(")){
						def.arguments = this.parseArgumentDefinitions();
						//console.log("Arguments:",def.arguments);
						if(this.lookAhead(";"))
						{
							//console.log("Function Declaration");
							def.type = "FunctionDeclaration";
						}else{
							//console.log("Function Body");
							this.skipBlanks();
							def.type = "FunctionDefinition";
							def.body = this.parseBody();
						}
						this.statements.push(def);
					}else{
						if(this.lookAhead("="))
						{
							def.value = parseExpression(";");
						}
						else
						{
							this.consume(";");
						}
						def.type = "GlobalVariableDeclaration";
						this.statements.push(def);
					}
					//console.log("Def:",def);
				}else{
					if(!this.EOF && this.currentCharacter != undefined)
					{
						this.unexpected("struct,enum,typedef,extern,FunctionDeclaration,VariableDeclaration");
					}
					else
					{
						return this.statements;
					}
				}
			}
			return this.statements;
		},
		isWS:function(theChar)
		{
			if(theChar==' '||theChar=='\t'||theChar=='\r'||theChar=='\n'||theChar=='\v'||theChar=='\h')
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		skipBlanks:function(){
			while(/[\s\n]/.test(this.currentCharacter))
			{
				this.next();
				//console.log("[Skip Blanks]Current Character:[",this.currentCharacter,"]");
				
			}
			
		},
		skipSpaces:function(includeSpaces){
			if(includeSpaces)
			{
				return;
			}
			if(/\s\n/.test(this.currentCharacter)){
				while(this.currentCharacter&&/\s\n/.test(this.currentCharacter))
				{
					if(this.currentCharacter=='\n'){
						this.gotoNextLine();
					}else if(this.currentCharacter=='\r'&&this.nextCharacter=='\n')
					{
						this.gotoNextCharacter();
						this.gotoNextLine();
					}
					
				}
				return true;
			}
			return false;
		},
		skipComments:function(includeComments){
			if(includeComments){
				return;
			}
			if(this.currentCharacter && this.currentCharacter== '/' && this.nextCharacter=='/')
			{
				while(currentCharacter!='\n')
				{
					this.gotoNextCharacter();
				}
				return true;
			}
			if(this.currentCharacter && this.currentCharacter== '/' && this.nextCharacter=='*')
			{
				while(this.currentCharacter!='*' && this.nextCharacter != '/')
				{
					if(this.currentCharacter=='\n')
					{
						gotoNextLine();
					}else if ( this.currentCharacter=='\r' && this.nextCharacter=='\n'){
						gotoNextCharacter();
						gotoNextLine();
					}
				}
				gotoNextCharacter();
				gotoNextCharacter();
				return true;
			}
			return false;
		},
		gotoNextLine:function(){
			file.line++;
			file.lineCharacterPosition=0;
			gotoNextCharacter();
		},
		gotoNextCharacter:function(){
			file.characterPosition++;
			if(file.characterPosition<file.content.length)
			{
				this.lastCharacter=this.currentCharacter;
				this.currentCharacter = file.content[file.characterPosition];
				if(file.characterPosition+1<file.content.length)
				{
					this.nextCharacter = file.content[file.characterPosition+1];
				}
				else
				{
					this.nextCharacter = undefined;
				}
			}
			else
			{
				this.currentCharacter=undefined;
			}
		},
		consume:function(str)
		{
			if(str)
			{
				for(index=0;index<str.length;index++)
				{
					if(this.currentCharacter!=str[index])
					{
						this.unexpected(str);
					}
					this.next();
				}
			}
			else
			{
				console.error("Can not consume null string at line :"+file.line+" pos:"+file.lineCharacterPosition+": abs pos:"+file.characterPosition);
				return false;
			}
			return true;
		},
		next:function(includeSpaces,includeComments){
			includeSpaces=includeSpaces|false;
			if(file.content!=null)
			{
				if(file.characterPosition<file.content.length)
				{
					//file.characterPosition++;
					//currentCharacter = file.content[file.characterPosition];
					if(file.line==-1)
					{ // make sure to start on line 1
						file.line++;
					}
					if(this.currentCharacter=='\r'&&this.nextCharacter=='\n')
					{
						file.lineCharacterPosition=0;
						file.line++;
						file.characterPosition++;
						file.characterPosition++;
					}
					else if(this.currentCharacter=='\n')
					{
						file.lineCharacterPosition=0;
						file.line++;
						file.characterPosition++;
					}
					else{
						file.characterPosition++;
						file.lineCharacterPosition++;
					}
					
					if(file.characterPosition>0)
					{
						this.lastCharacter = file.content[file.characterPosition-1]
					}
					else
					{
						this.lastCharacter = undefined;
					}
					if(file.characterPosition<file.content.length)
					{
						this.currentCharacter = file.content[file.characterPosition];
					}
					else
					{
						this.EOF = true;
						this.currentCharacter = undefined;
					}
					if((file.characterPosition+1)<file.content.length)
					{
						this.nextCharacter = file.content[file.characterPosition+1]
					}
					else
					{
						this.nextCharacter = undefined;
					}
					var skipped;
					//console.log("Character Set:[",this.lastCharacter,",",this.currentCharacter,",",this.NextCharacter,"] [",file.characterPosition,",",file.lineCharacterPosition,",",file.content.length,"]");
					do{
						skipped = this.skipComments(includeComments)||this.skipSpaces(includeSpaces);
						/*if(!includeSpaces && (
						file.characterPosition==0 ||
						this.lastCharacter =='\n') && this.currentCharacter=='#'
						)
						{
							this.consume('#'); // preprocessor Symbol
							// this could be a include statement
							// this could be a define statement
							// this could be a 
							var line = position.line = readNumber(true)-1;
							this.consume(" ");
							position.file = this.readString(true);
							while(this.currentCharacter!='\n')
							{
								this.next();
							}
							skipped = true;
						}*/
					}while(skipped);	
					
				}
				else
				{
					this.unexpected("File is EOF");
				}
			}
			else
			{
				this.unexpected("File Content is NULL");
			}
		},
		unexpected:function(str){
			var _currentCharacter = JSON.stringify(this.currentCharacter||"EOF");
			var msg = [
				file.name,
				":",
				file.line,
				": expecting ",
				JSON.stringify(str),
				" got ",
				_currentCharacter,
				" statement:",
				this.statements,
				" position:",
				file.characterPosition,
				" content:",
				file.content,
				" Last Character:[",
				this.returnString(this.lastCharacter),
				"] Current Character:[",
				this.returnString(this.currentCharacter),
				"] Next Character:[",
				this.returnString(this.nextCharacter),
				"]"].join("");
				
			throw new Error(msg);
		},
		lookAhead:function(str,keepBlanks){
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			if(str && str.length!=0)
			{
				//console.log(`string ${str} not empty in lookahead ${_characterPosition}`);
				for(var index=0;index<str.length;index++)
				{
					if(this.currentCharacter != str[index])
					{
						file.characterPosition=_characterPosition;
						file.lineCharacterPosition=_lineCharacterPosition;
						file.line = _line;
						this.currentCharacter=file.content[file.characterPosition];
						if(file.characterPosition>0){
							this.lastCharacter=file.content[file.characterPosition-1];
						}else{
							this.lastCharacter=undefined;
						}
						if(file.content.length>file.characterPosition+1)
						{
							this.nextCharacter = file.content[file.characterPosition+1];
						}
						else
						{
							this.nextCharacter=undefined;
						}
						//console.log(`${this.currentCharacter} != ${str[index]}`);
						return false;
					}
					//console.log(`${this.currentCharacter} == ${str[index]}`);
					this.next(true);
				}
				//console.log("At End Of WordTest");
				if(/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(str) && /[_a-zA-Z]/.test(this.currentCharacter))
				{
					file.characterPosition=_characterPosition;
					file.lineCharacterPosition=_lineCharacterPosition;
					file.line = _line;
					this.currentCharacter=file.content[file.characterPosition];
					if(file.characterPosition>0){
						this.lastCharacter=file.content[file.characterPosition-1];
					}else{
						this.lastCharacter=undefined;
					}
					if(file.content.length>file.characterPosition+1)
					{
						this.nextCharacter = file.content[file.characterPosition+1];
					}
					else
					{
						this.nextCharacter=undefined;
					}
					//console.log(`/^[_a-zA-Z][_a-zA-Z0-9]*$/ ${str} && /[_a-zA-Z]/ ${this.currentCharacter}`);
					return false;
				}
				//console.log("At End Of identifier Test");
				if(!keepBlanks)
				{
					//console.log("Skip Blanks");
					this.skipBlanks();
					//console.log("At End Of Skip Blanks Test");
				}
				//console.log("LookAhead:",str);
				return true;
			}
			else
			{
				this.unexpected("NULL or empty for lookahead");
			}
			//console.log("Wierd Spot");
		},
		definitionIncomming:function(){
			//console.log("Definition Incoming");
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			
			for(var index=0;index<this.typeModifiers.length;index++)
			{
				//console.log("Modifier:"+this.typeModifiers[index]);
				if(this.typeModifiers[index])
				{
					if(this.lookAhead(this.typeModifiers[index]))
					{
						//console.log("Found Type Modifier:"+this.typeModifiers[index]);
						file.characterPosition=_characterPosition;
						file.lineCharacterPosition=_lineCharacterPosition;
						file.line = _line;
						this.currentCharacter=file.content[file.characterPosition];
						if(file.characterPosition>0){
							this.lastCharacter=file.content[file.characterPosition-1];
						}else{
							this.lastCharacter=undefined;
						}
						if(file.content.length>file.characterPosition+1)
						{
							this.nextCharacter = file.content[file.characterPosition+1];
						}
						else
						{
							this.nextCharacter=undefined;
						}
						//console.log("Found");
						return true;
					}
				}else
				{
					console.error("ERROR: this.typeModifiers["+index+"] is NULL");
				}
			}
			//console.log("End of Modifiers");
			for(var index=0;index<this.typeNames.length;index++)
			{
				if(this.typeNames[index])
				{
					
					if(this.lookAhead(this.typeNames[index]))
					{
						//console.log("Found Type:"+this.typeNames[index]);
						file.characterPosition=_characterPosition;
						file.lineCharacterPosition=_lineCharacterPosition;
						file.line = _line;
						this.currentCharacter=file.content[file.characterPosition];
						if(file.characterPosition>0){
							this.lastCharacter=file.content[file.characterPosition-1];
						}else{
							this.lastCharacter=undefined;
						}
						if(file.content.length>file.characterPosition+1)
						{
							this.nextCharacter = file.content[file.characterPosition+1];
						}
						else
						{
							this.nextCharacter=undefined;
						}
						return true;
					}
					else
					{
						//console.log("Not Found:"+this.typeNames[index]+" Current Character:"+this.currentCharacter);
					}
				}
				else
				{
					console.error("ERROR: this.typeNames["+index+"] is NULL");
				}
			}
			//console.log("End of Types");
			return false;
		},
		readDefinition:function(nameless)
		{
			var name;
			var position = file.characterPosition;
			var def={
				type:'Type',
				modifier:[],
				pos: file.characterPosition
			};
			do{
				var read = false;
				for(var index=0;index < this.typeModifiers.length;index++)
				{
					if(this.lookAhead(this.typeModifiers[index]))
					{
						def.modifier.push(this.typeModifiers[index]);
						read=true;
					}
				}
			}while(read);
			
			for(var index = 0 ;index < this.typeNames.length;index++)
			{
				if(this.lookAhead(this.typeNames[index]))
				{
					def.name = this.typeNames[index].toString();
					while(this.lookAhead("*"))
					{
						def = {
							type:"Pointer",	
							target:def,
							pos:file.characterPosition
						};
					}
					if(!nameless)
					{
						name = this.readIdentifier();
					}
					while(this.lookAhead("["))
					{
						def = {
							type:"Pointer",
							target:def,
							pos:file.characterPosition
						};
						if(!lookAhead("]"))
						{
							def.length = this.parseExpression();
							this.consume("]");
						}
					}
					if(name){
						def = {
							type:"Definition",
							defType:def,
							name:name,
							pos:position
						}
					}
					return def;
				}
			}
			this.unexpected(typeNames.join(","));
		},
		identifierIncoming:function()
		{
			//console.log("Identifier Incoming:[",this.currentCharacter,"]");
			if(this.currentCharacter && /[A-Za-z_]/.test(this.currentCharacter))
			{
				
				return true;
			}
			else
			{
				//this.unexpected ("Not Identifier");
				return false;
			}
		},
		readIdentifier:function(keepBlanks)
		{
			var identifier = this.read(/[A-Za-z0-9_]/,"Identifier",/[A-Za-z_]/,keepBlanks);
			if(!keywords.includes(identifier))
			{
				return identifier;
			}
			else
			{
				this.unexpected("Can't use keyword as identifier:[",identifier,"]");
			}
		},
		read:function(reg,expected,startreg,keepBlanks){
			startreg = startreg||reg;
			if(!startreg.test(this.currentCharacter))
			{
				this.unexpected(expected);
			}
			var val = [this.currentCharacter];
			this.next(true);
			while(this.currentCharacter && reg.test(this.currentCharacter))
			{
				val.push(this.currentCharacter);
				this.next();
			}
			if(!keepBlanks)
			{
				this.skipBlanks();
			}
			//console.log("Read:[",val.join(""),"]");
			return val.join("");
		},
		parseArgumentDefinitions:function()
		{
			//console.log("parseArgumentDefinitions");
			var args = [];
			while(this.definitionIncomming())
			{
				args.push(this.readDefinition());
				if(this.lookAhead(")")){
					//console.log("Arguments:",args);
					//console.log("Found Early )");
					this.consume(")");
					return args;
				}
				this.consume(",");
				
			}
			//console.log("Found )");
			this.consume(")");
			return args;
		},
		parseSwitchBody:function(){
			var switchStatement={type:"SwitchStatement",conditions:[],pos:file.characterPosition};
			var conditions=[];
			var expressions=[];
			var conditionsBlock={type:"ConditionsBlock",body:[],conditions:[],pos:file.characterPosition};
			var expression={type:"CaseBody",body:[],pos:file.characterPosition};
			var body=[];
			var first=true;
			var foundDefault=false;
			
			this.consume("{");
			while(!(this.currentCharacter=='}'||this.currentCharacter==undefined))
			{
				var condition={};
				
				this.skipBlanks();
				if(this.lookAhead("case"))
				{
					if(!first)
					{
						if(conditionsBlock.body.length>0)
						{
							statement.conditions.push(conditionsBlock);
							conditionsBlock={type:"ConditionsBlock",body:[],conditions:[],pos:file.characterPosition};
						}
					}
					first=false;
					
					if(this.numberIncoming())
					{
						condition.type="Literal";
						condition.literalType = "Number";
						condition.value = this.readNumber();
						this.consume(":");
					}
					else if (this.currentCharacter=='\'')
					{
						condition.type="Literal";
						condition.literalType = "Character";
						condition.value =this.readCharacter();
						this.consume(":");
					}
					
					
					conditionsBlock.conditions.push(condition);
					//conditions.push(condition);
				}
				else if (this.lookAhead("default"))
				{
					foundDefault=true;
					if(!first)
					{
						if(conditionsBlock.body.length>0)
						{
							statement.conditions.push(conditionsBlock);
							conditionsBlock=undefined;
						}
					}
					this.consume(":");
					first=false;
					switchStatement.defaultCondition = {type:"DefaultCase",body:[],pos:file.characterPosition}; 
				}
				else if(this.lookAhead("break"))
				{
					if(conditionsBlock.body.length>0)
					{
						switchStatement.conditions.push(conditionsBlock);
						conditionsBlock={type:"ConditionsBlock",body:[],conditions:[],pos:file.characterPosition};
					}
					this.consume(";");
				}
				else
				{
					if(first)
					{
						this.unexpected("Expecting case Statement");
					}
					if(!foundDefault)
					{
						var theStatement = this.parseStatement();
						//console.log("Statement:[",theStatement,"]");
						conditionsBlock.body.push(theStatement);
					}
					else
					{
						
						var theStatement = this.parseStatement();
						//console.log("Statement:[",theStatement,"]");
						switchStatement.defaultCondition.body.push(theStatement);
					}
					
				}
				this.skipBlanks();
			}
			if(conditionsBlock.body.length>0 && conditionsBlock.conditions.length>0)
			{
				switchStatement.conditions.push(conditionsBlock);
			}
			this.consume("}");
			//console.log("statement:",switchStatement);
			return switchStatement;
		},
		parseBody:function(){
			var statements = [];
			this.consume("{");
			while(!(this.currentCharacter=="}"||this.currentCharacter==undefined))
			{
				this.skipBlanks();
				//console.log("Parsing Statement");
				var position = file.characterPosition;
				var statement = this.parseStatement();
				statements.push(statement);
				//console.log("Current Character:[",this.currentCharacter,"]");
				this.skipBlanks();
				//console.log("Current Character:"+this.currentCharacter);
			}
		//console.log("this.currentCharacter:[",this.currentCharacter,"]");
			//if(this.currentCharacter=="}")
			//{
				this.consume("}");
			//}
			//console.log("Statements:",statements);
			return statements;
		},
		parseStatement:function(){
			var position = file.characterPosition;
			if(this.lookAhead("return"))
			{
				return {
					type:"ReturnStatement",
					value:this.parseExpression(";"),
					pos: position
					
				};
			}else if (this.lookAhead("if")){
				//console.log("Parse If");
				this.consume("(");
				var statement = {type:"IfStatement",pos:position};
				statement.condition = this.parseExpression(")");
				this.skipBlanks();
				statement.body = this.parseBody();
				if(this.lookAhead("else"))
				{
					statement.else = this.parseBody();
				}
				return statement;
			}else if(this.lookAhead("switch")){
				var statement = {type:"SwitchStatement",pos:position};
				this.consume("(");
				if(!this.identifierIncoming)
				{
					unexpected("identifier");
				}
				else
				{
					statement.identifier=this.readIdentifier();
				}
				this.consume(")");
				statement.body=this.parseSwitchBody();
				return statement;
				
			}else if (this.lookAhead("while")){
				this.consume("(");
				return{
					type:"WhileStatement",
					condition:this.parseExpression(")"),
					body:this.parseBody(),
					pos:position
				};
			}else if (this.lookAhead("do")){
				var statement = {type:"DoWhileStatement",pos:position};
				statement.body = this.parseBody();
				this.consume("while");
				this.consume("(");
				statement.condition=this.parseExpression(")");
				this.consume(";");
				return statement;
			}else if ( this.lookAhead("for"))
			{
				var statement = {type:"ForStatement",pos:position};
				this.consume("(");
				statement.init = this.parseStatement();
				statement.condition = this.parseExpression(";");
				statement.step = this.parseExpression(")");
				statement.body = this.parseBody();
				return statement;
			}else if (this.definitionIncomming())
			{
				var def = this.readDefinition();
				if(this.lookAhead("="))
				{
					def.value = this.parseExpression(";");
				}
				else
				{
					this.consume(";");
				}
				def.type = "VariableDeclaration";
				def.pos= position;
				return def;
			}
			else
			{
				return {
					type:"ExpressionStatement",
					expression:this.parseExpression(";"),
					pos:position
					
				}
			}
		},
		parseExpression:function(end)
		{
			var unaryExpression = this.parseUnary();
			//console.log("Parse Unary:",unaryExpression);
			var expression = this.parseBinary(unaryExpression,0);
			//console.log("Expression:",expression);
			//console.log("Parse Binary:",expression);
			if(end)
			{
				this.consume(end);
			}
			return expression;
		},
		parseUnary:function(){
			var expression;
			var position = file.characterPosition;
			for(var prefixedOperation in prefixedOps)
			{
				//console.log("Prefixed Operation:",prefixedOperation);
				if(this.lookAhead(prefixedOperation)){
					return {
						type:"prefixedOperation",
						operator:prefixedOperation,
						value:this.parseUnary(),
						pos:position
					}
				}
			}
			if(this.lookAhead("(")){
				if(definitionIncomming())
				{
					expression = {
						type:"CastExpression",
						targetType:readDefinition(true),
					};
					this.consume(")");
					expression.value = this.parseUnary();
				}
				else
				{
					expression = this.parseExpression(")");
				}
				//console.log("Read Cast:",expression);
			}else if ( this.lookAhead("{")){
				var entries = [];
				while(this.currentCharacter)
				{
					entries.push(this.parseExpression());
					if(!LookAhead(","))
					{
						break;
					}
				}
				this.consume("}");
				expression= {
					type:"Literal",
					value:entries,
				};
				//console.log("Read Body:",expression);
			}
			else if (this.lookAhead("'"))
			{
				var val = this.currentCharacter.charCodeAt(0);
				if(this.currentCharacter == "\\")
				{
					val = this.readEscapeSequence().charCodeAt(0);
				}else{
					next(true,true);
				}
				this.consume("'");
				expression = {
					type:"Literal",
					source:"CharCode",
					value:val
				};
				//console.log("Read Character Literal:",expression);
			}
			else if ( this.stringIncoming())
			{
				expression = {
					type:"Literal",
					literalType:"String",
					value:this.readString()
				};
				//console.log("Read String:",expression);
			}
			else if ( this.numberIncoming())
			{
				var numberValue=this.readNumber(); 
				expression = {
					type:"Literal",
					literalType:"Number",
					value:{
						numberType:numberValue.numberType,
						value:numberValue.value,
					}
				};
				//console.log("Read Number:",expression);
			}
			else if(this.identifierIncoming())
			{
				val = this.readIdentifier();
				expression={
					type:"Identifier",
					value:val
				};
				//console.log("Read Identifier:[",expression,"]");
			}
			else
			{
				//console.log("Read identifier Wierd State");
				return;
			}
			if(this.lookAhead("["))
			{
				var index = this.parseExpression();
				this.consume("]");
				expression = {
					type:"IndexedExpression",
					value:expression,
					index:index,
				};
			}
			else if ( this.lookAhead("("))
			{
				var args = [];
				while(this.currentCharacter)
				{
					args.push(this.parseExpression());
					if(!this.lookAhead(","))
					{
						break;
					}
				}
				this.consume(")");
				expression = {
					type:"CallExpression",
					base:expression,
					arguments:args
				};
			}
			expression.pos = position;
			var suffixPosition= file.characterPosition;
			for( var suffixOperation in suffixOperations)
			{
				if(this.lookAhead(suffixOperation))
				{
					return {
						type:"SuffixExpression",
						operator:suffixOperation,
						value:expression,
						pos:suffixPosition
					};
				}
			}
			//console.log("Unary Expression:[",expression,"]");
			return expression;
		},
		readEscapeSequence:function()
		{
			if(this.currentCharacter=="x"){
				this.next(true,true);
				var val = 0;
				while(/[0-9A-Fa-f]/.test(this.currentCharacter))
				{
					val = (val<<4)+parseInt(this.currentCharacter,16);
					this.next(true,true);
				}
				return String.fromCharCode(val);
			}else if ( /[0-7]/.test(this.currentCharacter)){
				var val = 0 ;
				while( /[0-7]/.test(this.currentCharacter))
				{
					val = (val<<3)+parseInt(this.currentCharacter,16);
					this.next(true,true);
				}
				return String.fromCharCode(val);
			}else if( Object.keys(escapeSequences).includes(this.currentCharacter)){
				var escapeChar = escapeSequences[this.currentCharacter];
				this.next(true,true);
				return escapeChar;
			}
			this.unexpected("escape sequence:[",this.currentCharacter,"] escape characters[",this.escapeSequences,"]");
			
		},
		numberIncoming:function()
		{
			//console.log("Number Incoming:[",this.currentCharacter,"]");
			if(this.currentCharacter != undefined && /[0-9]/.test(this.currentCharacter))
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		readNumber:function(keepBlanks)
		{
			if(this.currentCharacter=='0' &&this.nextCharacter=='b')
			{
				var numberValue=this.readBinaryNumber(keepBlanks); 
				return { value:numberValue,"numberType":"base2Integer"};
			}
			else if ( this.currentCharacter=='0' && /[0-7]/.test(this.nextCharacter))
			{
				var numberValue=this.readOctalNumber(keepBlanks);
				return { value:numberValue,"numberType":"base8Integer"};
			}
			else if(this.currentCharacter =='0' && this.nextCharacter=='x')
			{
				var numberValue=this.readHexNumber(keepBlanks);
				return { value:numberValue,"numberType":"base16Integer"};
			}
			else
			{ 
				var _line=file.line;
				var _lineCharacterPosition=file.lineCharacterPosition;
				var _characterPosition = file.characterPosition;
				var decimalCount=0;
				while(this.currentCharacter&&/[0-9\.]/.test(this.currentCharacter))
				{
					this.next();
					if(this.currentCharacter=='.' && decimalCount==0)
					{
						decimalCount++;
					}
					else if(this.currentCharacter=='.' && decimalCount>0)
					{
						this.unexpected("Too many decimals");
					}
				}
				file.characterPosition=_characterPosition;
				file.lineCharacterPosition=_lineCharacterPosition;
				file.line = _line;
				this.currentCharacter=file.content[file.characterPosition];
				if(file.characterPosition>0){
					this.lastCharacter=file.content[file.characterPosition-1];
				}else{
					this.lastCharacter=undefined;
				}
				if(file.content.length>file.characterPosition+1)
				{
					this.nextCharacter = file.content[file.characterPosition+1];
				}
				else
				{
					this.nextCharacter=undefined;
				}
				if(decimalCount==0)
				{
					var numberValue = this.readBase10Number(keepBlanks);
					return { value:numberValue,"numberType":"base10Integer"};
				}
				else
				{
					//TODO: distinguish double from float
					//TODO: support scientific notation
					var numberValue = this.read(/[0-9\.]/,"Number",/[0-9]/,keepBlanks);
					return { value:parseFloat(numberValue),"numberType":"singleFloat"};
				}
				
			}
		},
		readOctalNumber:function(keepBlanks)
		{
			var val = this.read(/[0-7]/,"Number",/[0-7]/,keepBlanks);
			return parseInt(val,8);
		},
		readHexNumber:function(keepBlanks)
		{
			var val = this.read(/[0-9A-Fa-f]/,"Number",/[0-9A-Fa-f]/,keepBlanks);
			return parseInt(val,16);
		},
		readBinaryNumber:function(keepBlanks)
		{
			var val = this.read(/[0-1]/,"Number",/[0-1]/,keepBlanks);
			return parseInt(val,2);
		},
		readBase10Number:function(keepBlanks)
		{
			var val = this.read(/[0-9]/,"Number",/[0-9]/,keepBlanks);
			return parseInt(val,10);
		},
		stringIncoming:function()
		{
			return this.currentCharacter && this.currentCharacter == "\"";
		},
		readString:function(keepBlanks)
		{
			//console.log("Read String");
			var val = [];
			var stringCharacterCount=0;
			this.next(true,true);
			while(this.currentCharacter && this.currentCharacter != "\"")
			{
				
				if(this.currentCharacter =="\\")
				{
					this.next(true,true);
					val.push(this.readEscapeSequence());
				}else{
					val.push(this.currentCharacter);
					this.next(true,true);
				}
				stringCharacterCount++;
				if(stringCharacterCount>maxCharactersPerString)
				{
					this.unexpected("String length too long:"+stringCharacterCount.toString()+" "+maxCharactersPerString.toString());
				}
			}
			if(!this.lookAhead("\"",keepBlanks))
			{
				this.unexpected("\"");
			}
			//console.log("Read String:[",val.join(""),"]");
			return val.join("");
		},
		peekBinaryOperation:function(){
			//console.log("peekBinaryOperation");

			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			//console.log("Sorted Operations:",this.sortedOperations);
			for( var index = 0 ; index < this.sortedOperations.length ; index++ )
			{
				//console.log("Searching For LookAhead:",this.sortedOperations[index]," for: ",this.currentCharacter," ",this.nextCharacter);
				if(this.lookAhead(this.sortedOperations[index])){
					file.characterPosition=_characterPosition;
					file.lineCharacterPosition=_lineCharacterPosition;
					file.line = _line;
					this.currentCharacter=file.content[file.characterPosition];
					if(file.characterPosition>0){
						this.lastCharacter=file.content[file.characterPosition-1];
					}else{
						this.lastCharacter=undefined;
					}
					if(file.content.length>file.characterPosition+1)
					{
						this.nextCharacter = file.content[file.characterPosition+1];
					}
					else
					{
						this.nextCharacter=undefined;
					}
					//console.log("Found:"+this.sortedOperations[index]);
					return this.sortedOperations[index];
				}
			}
			return false;
		},
		parseBinary:function(left,minPrec){
			var lookAhead = this.peekBinaryOperation();
			while(lookAhead && this.operations[lookAhead]>= minPrec)
			{
				//console.log("LookAhead:",lookAhead);
				var operation = lookAhead;
				var position = file.characterPosition;
				this.consume (operation);
				var right = this.parseUnary();
				lookAhead = this.peekBinaryOperation();
				while(lookAhead && this.operations[lookAhead] > this.operations[operation])
				{
					right = this.parseBinary(right,this.operations[LookAhead]);
					lookAhead = this.peekBinaryOperation();
				}
				left = {
					type:"BinaryExpression",
					operator:operation,
					left:left,
					right:right,
					pos:position
				};
				
			}
			return left;
		},
		print:function(theExpression)
		{
			
			for(var statement in theExpression)
			{
				//console.log("Expression:",theExpression[statement]);
				if(theExpression[statement]!=undefined && theExpression[statement].type!=undefined)
				{
					switch(theExpression[statement].type){
						case "FunctionDefinition":
							this.printFunctionDefinition(theExpression[statement]);
						break;
						case "CallStatement":
							this.printCallStatement(theExpression[statement]);
						break;
						case "ExpressionStatement":
							this.printExpressionStatement(theExpression[statement]);
						break;
						case "ReturnStatement":
							this.printReturnStatement(theExpression[statement]);
						break;
						case "VariableDeclaration":
							this.printVariableDeclaration(theExpression[statement],true,true);
						break;
						case "PreProcessorExpression":
							this.printPreprocessorExpression(theExpression[statement]);
						break;
						case "StructDefinition":
							this.printStructDefinition(theExpression[statement]);
						break;
						case "EnumDefinition":
							this.printEnumDefinition(theExpression[statement]);
						break;
						case "BinaryExpression":
							this.printBinaryExpression(theExpression[statement]);
						break;
						case "SuffixExpression":
							this.printSuffixExpression(theExpression[statement]);
						break;
						case "ForStatement":
							process.stdout.write("for(");
							switch(theExpression[statement].init.type){
								case "VariableDeclaration":
									this.printVariableDeclaration(theExpression[statement].init);
								break;
								default:
									console.log("[print]Unhandled for loop init type:[",theExpression[statement].init.type,"]");
									
							}
							switch(theExpression[statement].condition.type)
							{
								case "BinaryExpression":
									this.printBinaryExpression(theExpression[statement].condition);
								break;
								default:
									console.log("[print]Unhandled for loop condition type:"+theExpression[statement].condition.type);
							}
							process.stdout.write(";");
							switch(theExpression[statement].step.type)
							{
								case "SuffixExpression":
									process.stdout.write(theExpression[statement].step.value.value.toString() +theExpression[statement].step.operator); 
								break;
							}
							process.stdout.write("){\n");
							this.tabCount++;
							//console.log(theExpression[statement]);
							this.print(theExpression[statement].body);
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}\n");
						break;
						case "SwitchStatement":
							this.printTabs();
							process.stdout.write("switch(");
							process.stdout.write(theExpression[statement].identifier);
							process.stdout.write("){\n");
							this.tabCount++;
							for(var caseStatementGroup in theExpression[statement].body.conditions)
							{
								for(var caseStatement in theExpression[statement].body.conditions[caseStatementGroup].conditions)
								{
									this.printTabs();
									process.stdout.write("case ");
									switch(theExpression[statement].body.conditions[caseStatementGroup].conditions[caseStatement].type)
									{
										case "Literal":
											//console.log(theExpression[statement].body.conditions[caseStatementGroup]);
											this.printLiteral(theExpression[statement].body.conditions[caseStatementGroup].conditions[caseStatement]);
											process.stdout.write(":\n");
											
											
										break;

										default:
											console.log("Unrecognized switch case literal");
									}
									
									//console.log(theExpression[statement].body.conditions[caseStatementGroup].conditions[caseStatement]);
								}
								this.tabCount++;
								this.print(theExpression[statement].body.conditions[caseStatementGroup].body);
								this.tabCount--;
								this.printTabs();
								//console.log("Group:"+caseStatementGroup);
								process.stdout.write("break;\n");
								
							}
							if(theExpression[statement].body.defaultCondition!=undefined)
							{
								this.printTabs();
								process.stdout.write("default:\n");
								
								this.tabCount++;
								this.print(theExpression[statement].body.defaultCondition.body);
								this.tabCount--;
								this.printTabs();
								process.stdout.write("break;\n");
							}
							
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}\n");
							
						break;
						case "IfStatement":
						//console.log(theExpression[statement]);
							this.printTabs();
							process.stdout.write("if(");
							switch(theExpression[statement].condition.type)
							{
								case "BinaryExpression":
									this.printBinaryExpression(theExpression[statement].condition);
								break;
								default:
									console.log("[print]Unhandled IfStatement type:",theExpression[statement].condition.type);
							}
							process.stdout.write("){\n");
							this.tabCount++;
							for(var index in theExpression[statement].body)
							{
								this.printTabs();
								
								this.print(theExpression[statement].body);
							}
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}\n");
						break;
						default:
							console.log("[print]Unhandled statement type:[",theExpression[statement],"]");
					}
				}
				else
				{
					console.log("[print]theExpression[statement].type is undefined:[",theExpression[statement],"]");
				}
			}
		},
		printBinaryExpression(theExpression){
			switch(theExpression.left.type)
			{
				case "Identifier":
					this.printIdentifier(theExpression.left);
				break;
				case "Literal":
				//console.log(theExpression.left.value);
					this.printLiteral(theExpression.left.value);
					//process.stdout.write(theExpression.left.value.toString());
				break;
				default:
					console.log("[printBinaryExpression]Unhandled left binary expression type:",theExpression.left.type);
			}
			process.stdout.write(" " + theExpression.operator+ " ");
			switch(theExpression.right.type)
			{
				case "Identifier":
					this.printIdentifier(theExpression.right);
				break;
				case "Literal":
					this.printLiteral(theExpression.right);
					//process.stdout.write(theExpression.right.value.toString());
				break;
				default:
					console.log("[printBinaryExpression]Unhandled right binary expression type:",theExpression.right.type);
			}
		},
		printSuffixExpression(theExpression){
			switch(theExpression.type)
			{
				case "Identifier":
					this.printIdentifier(theExpression.value);
				break;
			}
			process.stdout.write(theExpression.operator);
		},
		printIdentifier(theIdentifier){
			process.stdout.write(theIdentifier.value.toString());
		},
		printFunctionDefinition:function(functionDefinition)
		{
			for ( var modifier in functionDefinition.defType.modifier)
			{
				console.log("modifier:",functionDefinition.defType.modifier);
			}
			spaceBuffer = Buffer.from(" ",'utf8');
			openingParenthesisBuffer = Buffer.from("(",'utf8');
			closingParenthesisBuffer = Buffer.from(")",'utf8');
			buffer = Buffer.from(functionDefinition.defType.name, 'utf8');
			process.stdout.write(buffer.toString());
			process.stdout.write(spaceBuffer.toString());
			buffer = Buffer.from(functionDefinition.name, 'utf8');
			process.stdout.write(buffer.toString());
			process.stdout.write(openingParenthesisBuffer);
			for(var argument in functionDefinition.arguments)
			{
				switch(functionDefinition.arguments[argument].type)
				{
					case "Literal":
						this.printLiteral(functionDefinition.arguments[argument])
						//buffer = Buffer.from(functionDefinition.arguments[argument],"utf8");
						//process.stdout.write(buffer.toString());
					break;
					default:
						console.log("Unhandled argument type :",functionDefinition.arguments[argument]);
				}
			}
			process.stdout.write(closingParenthesisBuffer);
			process.stdout.write("{\n");
			this.tabCount++;
			this.print(functionDefinition.body);
			this.tabCount--;
			process.stdout.write("}\n");
			
		},
		printStructDefinition(structDefinition)
		{
			process.stdout.write("struct ");
			process.stdout.write(structDefinition.name);
			process.stdout.write("{\n");
			this.tabCount++;
			for(var structItem in structDefinition.member)
			{
				switch(structDefinition.member[structItem].type)
				{
					case "Definition":
						this.printTabs();
						switch(structDefinition.member[structItem].defType.type)
						{
							case "Type":
								for(var modifier in structDefinition.member[structItem].defType.modifier)
								{
									process.stdout.write(structDefinition.member[structItem].defType.modifier[modifier].toString()+" ");
								}
								process.stdout.write(structDefinition.member[structItem].defType.name.toString() + " ");
							break;
							case "Pointer":
								for(var modifier in structDefinition.member[structItem].defType.target.modifier)
								{
									process.stdout.write(structDefinition.member[structItem].defType.target.modifier[modifier].toString()+" ");
								}
								process.stdout.write(structDefinition.member[structItem].defType.target.name.toString() + " * ");
							break;
							default:
								console.log("Unhandled struct member type:",structDefinition.member[structItem].type);
						}
						process.stdout.write(structDefinition.member[structItem].name+";\n");
					break;
					default:
						console.log("Unhandled struct member type:",structDefinition.member[structItem].type);
				}
			}
			this.tabCount--;
			process.stdout.write("};\n\n");
		},
		printEnumDefinition(enumDefinition)
		{
			process.stdout.write("enum ");
			process.stdout.write(enumDefinition.name);
			process.stdout.write("{\n");
			this.tabCount++;
			for(var enumItem in enumDefinition.member)
			{
				this.printTabs();
				process.stdout.write(enumDefinition.member[enumItem].toString()+",\n");
			}
			this.tabCount--;
			process.stdout.write("};\n\n");
		},
		printReturnStatement:function(returnStatement)
		{
			//console.log("Return Statement:",returnStatement);
			this.printTabs();
			process.stdout.write("return ");
			if(returnStatement.value!=undefined)
			{
				switch(returnStatement.type){
					case "ReturnStatement":
						this.printLiteral(returnStatement.value);
					break;
					default:
						console.log("Unhandled return statement type:",returnStatement.type);
				}
			}
			process.stdout.write(";\n");
		},
		printExpressionStatement:function(expressionStatment)
		{
			switch(expressionStatment.expression.type)
			{
				case "CallExpression":
					this.printCallExpression(expressionStatment.expression.base,expressionStatment.expression.arguments);
				break;
				default:
					console.log("Unhandled expression type:",expressionStatment.expression.type);
					
			}
			//console.log("Expression Statement:",expressionStatment);
		},
		
		printLiteral:function(literal)
		{
			switch(literal.literalType)
			{
				case "Number":
					switch(literal.value.numberType)
					{
						case "base2Integer":
							process.stdout.write("0b");
							process.stdout.write(literal.value.value.toString(2));
						break;
						case "base8Integer":
							process.stdout.write("0");
							process.stdout.write(literal.value.value.toString(8));
						break;
						case "base10Integer":
							process.stdout.write(literal.value.value.toString(10));
						break;
						case "":
							process.stdout.write("0x");
							process.stdout.write(literal.value.value.toString(16));
						break;
						default:
						console.log(literal);
							console.log("Unhandled literal number type:",literal.value.numberType);
					}
					//process.stdout.write(literal.value.toString());
				break;
				case "String":
					this.printString(literal.value.toString());
					
				break;
				default:
					console.log("Unhandled literal type:",literal.literalType);
			}
		},
		printVariableDeclaration(declaration,printTabs,wantNewLine)
		{
			//console.log(declaration);
			if(printTabs){
				this.printTabs();
			}
			switch(declaration.defType.type)
			{
				case "Type":
					for ( var modifier in declaration.defType.modifier)
					{
						process.stdout.write(declaration.defType.modifier.toString()+" ");
					}
					process.stdout.write(declaration.defType.name+" ");
					process.stdout.write(declaration.name.toString()+" = ");
					switch(declaration.value.type)
					{
						case "Literal":
							this.printLiteral(declaration.value);
							
						break;
						default:
							console.log("Unhandled variable declaration type:",declaration.value.type);
					}
					process.stdout.write(";");
					if(wantNewLine)
					{
						process.stdout.write("\n");
					}
				break;
				default:
					console.log("Unhandled variable declaration type:",declaration.defType.type);
			}
		},
		printCallExpression(base,args)
		{
			this.printTabs();
			switch(base.type){
				case "Identifier":
					process.stdout.write(base.value.toString());
				break;
				default:
					console.log("Unhandled CallExpression type:",base.type);
			}
			process.stdout.write("(");
			for( arg in args)
			{
				switch(args[arg].type)
				{
					case "Literal":
						this.printLiteral(args[arg])
						//buffer = Buffer.from(functionDefinition.arguments[argument],"utf8");
						//process.stdout.write(buffer.toString());
					break;
					default:
						console.log("Unhandled argument type :",args[arg].type);
				}
			}
			process.stdout.write(");\n");
		},
		printTabs:function(){
			for(var index=0;index<this.tabCount;index++)
			{
				process.stdout.write("\t");
			}
		},
		returnString:function(str){
			var returnString= [];
			for(var index in str)
			{
				if(str[index]=='\a')
				{
					returnString.push("\\a");
				}
				else if ( str[index]=="\b")
				{
					returnString.push("\\b");
				}
				else if ( str[index]=="\f")
				{
					returnString.push("\\f");
				}
				else if(str[index]=='\n')
				{
					returnString.push("\\n");
				}
				else if(str[index]=='\r')
				{
					returnString.push("\\r");
				}
				else if(str[index]=='\t')
				{
					returnString.push("\\t");
				}
				else if(str[index]=='\v')
				{
					returnString.push("\\v");
				}
				
				else
				{
					returnString.push(str[index]);
				}
			}
			return returnString.join("");
		},
		printString:function(str){
			process.stdout.write("\"");
			for(var index in str)
			{
				if(str[index]=='\a')
				{
					process.stdout.write("\\a");
				}
				else if ( str[index]=="\b")
				{
					process.stdout.write("\\b");
				}
				else if ( str[index]=="\f")
				{
					process.stdout.write("\\f");
				}
				else if(str[index]=='\n')
				{
					process.stdout.write("\\n");
				}
				else if(str[index]=='\r')
				{
					process.stdout.write("\\r");
				}
				else if(str[index]=='\t')
				{
					process.stdout.write("\\t");
				}
				else if(str[index]=='\v')
				{
					process.stdout.write("\\v");
				}
				
				else
				{
					process.stdout.write(str[index]);
				}
			}
			process.stdout.write("\"");
		},
		printPreprocessorExpression(expression)
		{
			process.stdout.write("#");
			switch(expression.typedef.type)
			{
				case "include":
					process.stdout.write("include ");
					switch(expression.typedef.pathStyle){
						case "includeRelative":
							process.stdout.write("<");
							process.stdout.write(expression.typedef.path);
							process.stdout.write(">\n");
						break;
						case "localRelative":
							process.stdout.write("\"");
							process.stdout.write(expression.typedef.path);
							process.stdout.write("\"\n");
						break;
					}
				break;
				case "define":
					process.stdout.write("define ");
					process.stdout.write(expression.typedef.name.toString()+ " ");
					switch(expression.typedef.defineType)
					{
						case "straightDefine":
							process.stdout.write("\n");
						break;
						case "characterDefine":
							process.stdout.write("'"+this.returnString(expression.typedef.val)+"'\n");
						break;
						case "stringDefine":
							process.stdout.write("\""+this.returnString(expression.typedef.value)+"\"\n");
						break;
						case "base2IntegerDefine":
							process.stdout.write("0b"+expression.typedef.value.toString(2)+"\n");
						break;
						case "base8IntegerDefine":
							process.stdout.write("0"+expression.typedef.value.toString(8)+"\n");
						break;
						case "base10IntegerDefine":
							process.stdout.write(expression.typedef.value.toString(10)+"\n");
						break;
						case "base16IntegerDefine":
							process.stdout.write("0x"+expression.typedef.value.toString(16)+"\n");
						break;
						case "expressionDefine":
							
						break;
						default:
							console.log("Unhandled preprocessor typevalue type :",expression.typedef.defineType);
					}
				break;
				default:
					console.log("Unhandled preprocessor expression type :",expression.typedef.type);
			}
		},
		ProcessPreProcessSymbols:function(position)
		{
			var statement = {type:"PreProcessorExpression",pos:position};
			
			//console.log("Current Character:"+this.currentCharacter);
			if(this.lookAhead("include"))
			{
				if(this.lookAhead("\""))
				{
					path =[];
					statement.typedef = {type:"include",pathStyle:"localRelative"};
					// local include
					while(this.currentCharacter!="\"")
					{
						path.push(this.currentCharacter);
						this.next();
					}
					statement.typedef.path = path.join("");
					this.consume("\"");
					this.statements.push(statement);
				}
				else if ( this.lookAhead("<"))
				{
					path=[];
					statement.typedef = {type:"include",pathStyle:"includeRelative"};
					while(this.currentCharacter!=">")
					{
						path.push(this.currentCharacter);
						this.next();
					}
					statement.typedef.path = path.join("");
					this.consume(">");
					this.statements.push(statement);
				}
				else
				{
					this.unexpected("\" or < expected after include");
				}
			}
			else if(this.lookAhead("define"))
			{
				statement.typedef = {type:"define"};
				if(this.identifierIncoming())
				{
					statement.typedef.name=this.readIdentifier(true);
					if(this.currentCharacter == '\n' || (this.currentCharacter=='\r' && this.nextCharacter=='\n'))
					{
						statement.typedef.defineType="straightDefine";
						this.statements.push(statement);
						return;
					}
					this.skipBlanks();
					if ( this.lookAhead("\'"))
					{
						statement.typedef.defineType="characterDefine";
						if(this.lookAhead("\\"))
						{
							if(Object.keys(escapeSequences).includes(this.currentCharacter))
							{
								statement.typedef.value = escapeSequences[this.currentCharacter];
								this.next();
							}
							else
							{
								this.unexpected("Unrecognized escape sequence");
							}
						}
						else
						{
							statement.typedef.value = this.currentCharacter;
						}
						this.consume("\'");
						this.statements.push(statement);
					}
					else if (this.lookAhead("\""))
					{
						var val = [];
						statement.typedef.defineType="stringDefine";
						while(this.currentCharacter!="\"")
						{
							val.push(this.currentCharacter);
							this.next();
						}
						statement.typedef.value = val.join("");
						this.consume("\"");
						this.statements.push(statement);
					}
					else if (this.lookAhead("0b"))
					{
						statement.typedef.defineType="base2IntegerDefine";
						statement.typedef.value= this.readBinaryNumber();
						this.statements.push(statement);
					}
					else if (this.lookAhead("0x"))
					{
						statement.typedef.defineType="base16IntegerDefine";
						statement.typedef.value= this.readHexNumber();
						this.statements.push(statement);
					}
					else if (this.lookAhead("0"))
					{
						statement.typedef.defineType="base8IntegerDefine";
						statement.typedef.value= this.readOctalNumber();
						this.statements.push(statement);
					}
					else if(this.numberIncoming())
					{
						var numberValue= this.readNumber();
						statement.typedef.defineType="base10IntegerDefine";
						statement.typedef.value=numberValue.value;
						
						this.statements.push(statement);
					}
					else if(this.lookAhead("("))
					{
						// this is a potentially a function
						this.unexpected("Define Expressions Not Yet Implemented");
					}
					else
					{
						this.unexpected("Unknown define type");
					}
				}
			}
			else if(this.lookAhead("if"))
			{
				while(this.currentCharacter!="\n")
				{
					this.next();
				}
			}
			else if(this.lookAhead("elif"))
			{
				while(this.currentCharacter!="\n")
				{
					this.next();
				}
			}
			else if(this.lookAhead("else"))
			{
				
			}
			else if(this.lookAhead("endif"))
			{
				
			}
			else if(this.lookAhead("pragma"))
			{
				while(this.currentCharacter!="\n")
				{
					this.next();
				}
			}
			else{
				this.unexpected("#include #define #if #elif #else #endif #pragma");
			}
		}
	}
})();


parser.initialize();


module.exports = parser;
