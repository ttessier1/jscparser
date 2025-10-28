const path = require('node:path/win32');
const fs = require('fs');
const { it } = require('node:test');

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
	"a":String.fromCharCode(7), // alarm
	"b":"\b", // backspace
	"f":"\f", // form feed
	"n":"\n", // new line
	"r":"\r", // carriage return
	"t":"\t", // horizontal tab
	"v":"\v" // vertical tab
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

let coff_file = {
	Machine:0x0000,
	NumberOfSection:0x0000,
	TimeDateStamp:0x00000000,
	PointerToSymbolTable:0x0000000,
	NumberOfSymbols:0x00000000,
	SizeOfOptionalHeader:0x0000,
	Characteristics:0x0000
};

let image_file_type = {
	IMAGE_FILE_MACHINE_UNKNOWN:     0x0000,
	IMAGE_FILE_MACHINE_ALPHA:       0x0184,
	IMAGE_FILE_MACHINE_ALPHA64:     0x0284,
	IMAGE_FILE_MACHINE_AM33:        0x01d3,
	IMAGE_FILE_MACHINE_AMD64:       0x8664,
	IMAGE_FILE_MACHINE_ARM:         0x01c0,
	IMAGE_FILE_MACHINE_ARM64:       0xaa64,
	IMAGE_FILE_MACHINE_ARM64EC:     0xA641,
	IMAGE_FILE_MACHINE_ARM64X:      0xA64E,
	IMAGE_FILE_MACHINE_ARMNT:       0x01c4,
	IMAGE_FILE_MACHINE_AXP64:       0x0284,
	IMAGE_FILE_MACHINE_EBC:         0x0Ebc,
	IMAGE_FILE_MACHINE_I386:        0x014c,
	IMAGE_FILE_MACHINE_IA64:        0x0200,
	IMAGE_FILE_MACHINE_LOONGARCH32: 0x6232,
	IMAGE_FILE_MACHINE_LOONGARCH64: 0x6264,
	IMAGE_FILE_MACHINE_M32R:        0x9041,
	IMAGE_FILE_MACHINE_MIPS16:      0x0266,
	IMAGE_FILE_MACHINE_MIPSFPU:     0x0366,
	IMAGE_FILE_MACHINE_MIPSFPU16:   0x0466,
	IMAGE_FILE_MACHINE_POWERPC:     0x01F0,
	IMAGE_FILE_MACHINE_POWERPCFP:   0x01F1,
	IMAGE_FILE_MACHINE_R3000BE:     0x0160,
	IMAGE_FILE_MACHINE_R3000:       0x0162,
	IMAGE_FILE_MACHINE_R4000:		0x0166,
	IMAGE_FILE_MACHINE_R10000:      0x0168,
	IMAGE_FILE_MACHINE_RISCV32:     0x5032,
	IMAGE_FILE_MACHINE_RISCV64:     0x5064,
	IMAGE_FILE_MACHINE_RISCV128:    0x5128,
	IMAGE_FILE_MACHINE_SH3:         0x01a2,
	IMAGE_FILE_MACHINE_SH3DSP:      0x01a3,
	IMAGE_FILE_MACHINE_SH4:         0x01a6,
	IMAGE_FILE_MACHINE_SH5:         0x01a8,
	IMAGE_FILE_MACHINE_THUMB:       0x01c2,
	IMAGE_FILE_MACHINE_WCEMIPSV2:   0x0169,
};

let characteristics = {
	IMAGE_FILE_RELOCS_STRIPPED:         0x0001,
	IMAGE_FILE_EXECUTABLE_IMAGE:        0x0002,
	IMAGE_FILE_LINE_NUMS_STRIPPED:      0x0004,
	IMAGE_FILE_LOCAL_SYMS_STRIPPED:     0x0008,
	IMAGE_FILE_AGGRESSIVE_WS_TRIM:      0x0010,
	IMAGE_FILE_LARGE_ADDRESS_AWARE:     0x0020,
	IMAGE_FLAG_UNUSED:                  0x0040,
	IMAGE_FILE_BYTES_REVERSED_LO:       0x0080,
	IMAGE_FILE_32BIT_MACHINE:           0x0100,
	IMAGE_FILE_DEBUG_STRIPPED:          0x0200,
	IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP: 0x0400,
	IMAGE_FILE_NET_RUN_FROM_SWAP:       0x0800,
	IMAGE_FILE_SYSTEM:                  0x1000,
	IMAGE_FILE_DLL:                     0x2000,
	IMAGE_FILE_UP_SYSTEM_ONLY:          0x4000,
	IMAGE_FILE_BYTES_REVERSED_HI:       0x8000,
};

let OptionalHeaderStandar = {
	Magic: 0x0000, // 0x10B PE32 bit executable 0x107 ROM 0x20B PE32+
	MajorLinkerVersion:0x00,
	MinorLinkerVersion:0x00,
	SizeOfCode:0x00000000,
	SizeOfInitializedData:0x00000000,
	SizeOfUnInitializedData:0x00000000,
	AddressOfentryPoint:0x00000000,
	BaseOfCode:0x00000000,
	BaseOfData:0x00000000, // PE32 only
};

let OptionalWindowsSpecificPE32 = {
	ImageBase: 0x00000000,
	SetionAlignment:0x00000000,
	FileAlignment:0x00000000,
	MajorOperatingSystemVersion:0x0000,
	MinorOperatingSystemVersion:0x0000,
	MajorImageVersion:0x0000,
	MinorImageVersion:0x0000,
	MajorSubsystemVersion:0x0000,
	MinorSubsystemVersion:0x0000,
	Win32VersionValue:0x00000000,
	SizeOfImage:0x00000000,
	SizeOfHeaders:0x00000000,
	CheckSum:0x00000000,
	SubSystem:0x0000,
	DllCharacteristics:0x0000,
	SizeOfStackReserve:0x00000000,
	SizeOfStackCommit:0x00000000,
	SizeOfHeapReserve:0x00000000,
	SizeOfHeapCommit:0x00000000,
	LoaderFlags:0x00000000,
	NumberOfRvaAndSizes:0x00000000,

	ExportTable:0x0000000000000000,
	ImportTable:0x0000000000000000,
	ResourceTable:0x0000000000000000,
	Exceptiontable:0x0000000000000000,
	CertificateTable:0x0000000000000000,
	BaseRelocationTable:0x0000000000000000,
	DebugTable:0x0000000000000000,
	ArchitectureTable:0x0000000000000000,
	GlobalPtrTable:0x0000000000000000,
	TlsTable:0x0000000000000000,
	LoadConfigTable:0x0000000000000000,
	BoundImporTable:0x0000000000000000,
	IATTable:0x0000000000000000,
	DelayImportDescriptor:0x0000000000000000,
	CLRRuntime:0x0000000000000000,
	Reserved:0x0000000000000000

};

let OptionalWindowsSpecificPE32Plus = {
	ImageBase: 0x0000000000000000,
	SetionAlignment:0x00000000,
	FileAlignment:0x00000000,
	MajorOperatingSystemVersion:0x0000,
	MinorOperatingSystemVersion:0x0000,
	MajorImageVersion:0x0000,
	MinorImageVersion:0x0000,
	MajorSubsystemVersion:0x0000,
	MinorSubsystemVersion:0x0000,
	Win32VersionValue:0x00000000,
	SizeOfImage:0x00000000,
	SizeOfHeaders:0x00000000,
	CheckSum:0x00000000,
	SubSystem:0x0000,
	DllCharacteristics:0x0000,
	SizeOfStackReserve:0x0000000000000000,
	SizeOfStackCommit:0x0000000000000000,
	SizeOfHeapReserve:0x0000000000000000,
	SizeOfHeapCommit:0x0000000000000000,
	LoaderFlags:0x00000000,
	NumberOfRvaAndSizes:0x00000000,

	ExportTable:0x0000000000000000,
	ImportTable:0x0000000000000000,
	ResourceTable:0x0000000000000000,
	Exceptiontable:0x0000000000000000,
	CertificateTable:0x0000000000000000,
	BaseRelocationTable:0x0000000000000000,
	DebugTable:0x0000000000000000,
	ArchitectureTable:0x0000000000000000,
	GlobalPtrTable:0x0000000000000000,
	TlsTable:0x0000000000000000,
	LoadConfigTable:0x0000000000000000,
	BoundImporTable:0x0000000000000000,
	IATTable:0x0000000000000000,
	DelayImportDescriptor:0x0000000000000000,
	CLRRuntime:0x0000000000000000,
	Reserved:0x0000000000000000
};

let WindowsSubSystem = {
IMAGE_SUBSYSTEM_UNKNOWN:0,
IMAGE_SUBSYSTEM_NATIVE:1,
IMAGE_SUBSYSTEM_WINDOWS_GUI:2,
IMAGE_SUBSYSTEM_WINDOWS_CUI:3,
IMAGE_SUBSYSTEM_OS2_CUI:5,
IMAGE_SUBSYSTEM_POSIX_CUI:7,
IMAGE_SUBSYSTEM_NATIVE_WINDOWS:8,
IMAGE_SUBSYSTEM_WINDOWS_CE_GUI:9,
IMAGE_SUBSYSTEM_EFI_APPLICATION:10,
IMAGE_SUBSYSTEM_EFI_BOOT_SERVICE_DRIVER:11,
IMAGE_SUBSYSTEM_EFI_RUNTIME_DRIVER:12,
IMAGE_SUBSYSTEM_EFI_ROM:13,
IMAGE_SUBSYSTEM_XBOX:14,
IMAGE_SUBSYSTEM_WINDOWS_BOOT_APPLICATION:16
};

let DosCharacteristics ={
Reserver1:                                      0x0001,
Reserved2:                                      0x0002,
Reserver3:                                      0x0004,
Reserved4:                                      0x0008,
IMAGE_DLLCHARACTERISTICS_HIGH_ENTROPY_VA:       0x0020,
IMAGE_DLLCHARACTERISTICS_DYNAMIC_BASE:          0x0040,
IMAGE_DLLCHARACTERISTICS_FORCE_INTEGRITY:       0x0080,
IMAGE_DLLCHARACTERISTICS_NX_COMPAT:             0x0100,
IMAGE_DLLCHARACTERISTICS_NO_ISOLATION:          0x0200,
IMAGE_DLLCHARACTERISTICS_NO_SEH:                0x0400,
IMAGE_DLLCHARACTERISTICS_NO_BIND:               0x0800,
IMAGE_DLLCHARACTERISTICS_APPCONTAINER:          0x1000,
IMAGE_DLLCHARACTERISTICS_WDM_DRIVER:            0x2000,
IMAGE_DLLCHARACTERISTICS_GUARD_CF:              0x4000,
IMAGE_DLLCHARACTERISTICS_TERMINAL_SERVER_AWARE: 0x8000,
};

let DataDirectory = {
VirtualAddress:   0x00000000,
Size:             0x00000000,
};

let SectionTable = {
	Name: 0x00000000,
	VirtualSize:0x00000000,
	VirtualAddress:0x00000000,
	SizeOfRawData:0x00000000,
	PointerToRawData:0x00000000,
	PointerToRelocations:0x00000000,
	PointerToLineNumbers:0x00000000,
	NumberOfRelocations:0x0000,
	NumberOfLineNumbers:0x0000,
	Characteristics:0x00000000,
};

let SectionFlags = {
Reserved1:0x00000000,
Reserved2:0x00000001,
Reserved3:0x00000002,
Reserved4:0x00000004,
IMAGE_SCN_TYPE_NO_PAD:0x00000008,
Reserved5:0x00000010,
IMAGE_SCN_CNT_CODE:0x00000020, //The section contains executable code.
IMAGE_SCN_CNT_INITIALIZED_DATA:0x00000040,//The section contains initialized data.
IMAGE_SCN_CNT_UNINITIALIZED_DATA:0x00000080,// The section contains uninitialized data.
IMAGE_SCN_LNK_OTHER:0x00000100,//Reserved for future use.
IMAGE_SCN_LNK_INFO:0x00000200,//The section contains comments or other information. The .drectve section has this type. This is valid for object files only.
Reserved6:0x00000400,//Reserved for future use.
IMAGE_SCN_LNK_REMOVE:0x00000800,//The section will not become part of the image. This is valid only for object files.
IMAGE_SCN_LNK_COMDAT:0x00001000,//The section contains COMDAT data. For more information, see COMDAT Sections (Object Only). This is valid only for object files.
IMAGE_SCN_GPREL:0x00008000,//The section contains data referenced through the global pointer (GP).
IMAGE_SCN_MEM_PURGEABLE:0x00020000,//Reserved for future use.
IMAGE_SCN_MEM_16BIT:0x00020000,//Reserved for future use.
IMAGE_SCN_MEM_LOCKED:0x00040000,//Reserved for future use.
IMAGE_SCN_MEM_PRELOAD:0x00080000,//Reserved for future use.
IMAGE_SCN_ALIGN_1BYTES:0x00100000,//Align data on a 1-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_2BYTES:0x00200000,//Align data on a 2-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_4BYTES:0x00300000,//Align data on a 4-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_8BYTES:0x00400000,//Align data on an 8-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_16BYTES:0x00500000,//Align data on a 16-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_32BYTES:0x00600000,//Align data on a 32-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_64BYTES:0x00700000,//Align data on a 64-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_128BYTES:0x00800000,//Align data on a 128-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_256BYTES:0x00900000,//Align data on a 256-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_512BYTES:0x00A00000,//Align data on a 512-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_1024BYTES:0x00B00000,//Align data on a 1024-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_2048BYTES:0x00C00000,//Align data on a 2048-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_4096BYTES:0x00D00000,//Align data on a 4096-byte boundary. Valid only for object files.
IMAGE_SCN_ALIGN_8192BYTES:0x00E00000,//Align data on an 8192-byte boundary. Valid only for object files.
IMAGE_SCN_LNK_NRELOC_OVFL:0x01000000,//The section contains extended relocations.
IMAGE_SCN_MEM_DISCARDABLE:0x02000000,//The section can be discarded as needed.
IMAGE_SCN_MEM_NOT_CACHED:0x04000000,//The section cannot be cached.
IMAGE_SCN_MEM_NOT_PAGED:0x08000000,//The section is not pageable.
IMAGE_SCN_MEM_SHARED:0x10000000,//The section can be shared in memory.
IMAGE_SCN_MEM_EXECUTE:0x20000000,//The section can be executed as code.
IMAGE_SCN_MEM_READ:0x40000000,//The section can be read.
IMAGE_SCN_MEM_WRITE:0x80000000,//The section can be written to.
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
		includePaths:[],
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
		poundIfLevel:0,
		poundIfData:{},
		relativePath:"./",
		fileStack:[],// save file context until done parsing 3s then restore the file context
		setRelativePath:function(path)
		{
			this.relativePath=path;
		},
		addIncludePath:function(path)
		{
			this.includePaths.push(path);
		},
		setFile:process.env.NODE_ENV === 'test'? function(text,name)
		{
			file.content = text;
			file.name = name;
			file.characterPosition=0;
			this.lastCharacter = undefined;
			if(file.content.length>0)
			{
				this.currentCharacter = file.content[file.characterPosition];
			}
			else
			{
				this.currentCharacter = undefined;
			}
			if(file.content.length>1)
			{
				this.nextCharacter = file.content[file.characterPosition+1];
			}
			else
			{
				this.nextCharacter = undefined;
			}
		}:undefined,
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
			this.poundIfLevel=0;
			this.poundIfData={};
		},
		sortKeywords:function()
		{
			
			this.keywords = keywords.sort(function(a,b){
				return b.length-a.length;
			});
			this.keywords = this.keywords.filter(element => element !== undefined);
			
		},
		sortTypes:function()
		{
			
			this.typeNames = types.sort(function(a,b){
				return b.length-a.length;
			});
			this.typeNames = this.typeNames.filter(element => element !== undefined);
			
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
			
			this.typeModifiers = typeModifiers.sort(function(a,b){
				return b.length-a.length;
			});
			this.typeModifiers = this.typeModifiers.filter(element => element !== undefined);
			
		},
		sortOperations:function()
		{
			
			this.operations = operations;
			this.sortedOperations = Object.keys(operations);
			
			this.sortedOperations = this.sortedOperations.sort(function(a,b){
				return b.length-a.length;
			});
			this.sortedOperations = this.sortedOperations.filter(element=>element != undefined);
			
		},
		parse:function(text,name)
		{
			file.content = text;
			file.name = name;
			file.characterPosition=0;
			this.lastCharacter = undefined;
			this.currentCharacter = file.content[file.characterPosition];
			if(file.content.length>1)
			{
				this.nextCharacter = file.content[file.characterPosition+1];
			}
			else
			{
				this.nextCharacter = undefined;
			}
			this.statements = this.internalParse();
			return this.statements;
		},
		internalParse:function(){
			var internalStatements = [];
			while(this.currentCharacter!=undefined)
			{
				var position = file.characterPosition;
				
				this.skipBlanks();
				if(this.lookAhead("#")){
					
					var result = this.ProcessPreProcessSymbols();
					internalStatements.push(...result.statements);
					if(result.return)
					{
						return internalStatements;
					}
				}else if(this.lookAhead("union")){
					var statement = {type:"UnionDefinition",memberNames:[],typeNames:[],member:[],pos:position};
					statement.name = this.readIdentifier();
					this.consume("{");
					while(this.definitionIncomming())
					{
						if(statement.member.length<=maxStructOrUnionMembers)
						{
							this.skipBlanks();
							var def = this.readDefinition();
							var typeName = def.defType.modifier.length>0?def.defType.modifier.join(" ")+" "+def.defType.name:def.defType.name;
							if(
								 
								!statement.typeNames.includes(def.name)
								//&& !statement.memberNames.includes(def.name) 
							)
							{
								statement.typeNames.push(typeName);
								statement.memberNames.push(def.name);
								statement.member.push(def);
							}
							else
							{
								this.unexpected(`Union Members must have unique names and types:[${def.name}] [${typeName}]`);
							}
							this.consume(";");
						}
						else
						{
							this.unexpected(`${maxStructOrUnionMembers} Union elements maximum - length:[${statement.member.length}]`);
						}
					}
					this.consume("};");
					if(this.types.includes(statement.name))
					{
						this.unexpected("duplicate name:"+statement.name);
					}
					this.types.push(statement.name);
					this.sortTypes();
					internalStatements.push(statement);
				}else if(this.lookAhead("struct")){
					var statement = {type:"StructDefinition",memberNames:[],member:[],pos:position};
					statement.name = this.readIdentifier();
					this.consume("{");
					
					while(this.definitionIncomming())
					{
						if(statement.member.length<=maxStructOrUnionMembers)
						{
							this.skipBlanks();
							var def = this.readDefinition();
							if(!statement.memberNames.includes(def.name))
							{
								statement.memberNames.push(def.name);
								statement.member.push(def);
							}
							else
							{
								this.unexpected(`duplicate struct item:[${def}]`);
							}
							this.consume(";");
						}
						else
						{
							this.unexpected(`${maxStructOrUnionMembers} Struct elements maximum - length:[${statement.member.length}]`);
						}
					}
					this.consume("};");
					if(this.types.includes(statement.name))
					{
						this.unexpected(["duplicate name:[",statement.name,"]"].join(""));
					}
					this.types.push(statement.name);
					this.sortTypes();
					internalStatements.push(statement);
					
				}else if(this.lookAhead("enum")){
					var statement = {type:"EnumDefinition",member:[],pos:position};
					statement.name = this.readIdentifier();
					this.consume("{");
					this.skipBlanks();
					while(this.identifierIncoming())
					{
						if(statement.member.length<=maxEnumMembers)
						{
							this.skipBlanks();
							var def = this.readIdentifier();
							if(!statement.member.includes(def))
							{
								statement.member.push(def);
							}
							else
							{
								this.unexpected(`duplicate enumeration value:[${def}]`);
							}
							if(!this.lookAhead(","))
							{
								break;
							}
						}
						else
						{
							this.unexpected(`${maxEnumMembers} enum elements maximum - length:[${statement.member.length}]`);
						}
					}
					this.consume("};");
					if(types.includes(statement.name))
					{
						this.unexpected("duplicate name:"+statement.name);
					}
					types.push(statement.name);
					this.sortTypes();
					internalStatements.push(statement);
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
					internalStatements.push(statement);
				}else if(this.definitionIncomming()){
					
					var def = this.readDefinition();
					
					def.pos = position;
					if(this.lookAhead("(")){
						def.arguments = this.parseArgumentDefinitions();
						
						if(this.lookAhead(";"))
						{
							
							def.type = "FunctionDeclaration";
						}else{
							
							this.skipBlanks();
							def.type = "FunctionDefinition";
							def.body = this.parseBody();
						}
						internalStatements.push(def);
					}else{
						if(this.lookAhead("="))
						{
							def.value = this.parseExpression(";");
						}
						else
						{
							this.consume(";");
						}
						def.type = "GlobalVariableDeclaration";
						internalStatements.push(def);
						this.globalVariableCount++;
						if(this.globalVariableCount>maxIdentifiersWithinScopeBlock)
						{
							this.unexpected("Too many globals");
						}
					}
					
				}else{
					if(!this.EOF && this.currentCharacter != undefined)
					{
						this.unexpected("struct,enum,typedef,extern,FunctionDeclaration,VariableDeclaration");
					}
					else
					{
						return internalStatements;
					}
				}
			}
			return internalStatements
		},
		skipBlanks:function(){
			while(/[\s\n]/.test(this.currentCharacter))
			{
				this.next(true);
			}
		},
		getLastCharacter:function()
		{
			return this.lastCharacter;
		},
		getCurrentCharacter:function()
		{
			return this.currentCharacter;
		},
		getNextCharacter:function()
		{
			return this.nextCharacter;
		},
		getFilePosition:function(){
			return file.characterPosition;
		},
		skipSpaces:function(includeSpaces){
			if(includeSpaces===true)
			{
				return false;
			}
			if(/[\s\n]/.test(this.currentCharacter)){
				while(this.currentCharacter&&/[\s\n]/.test(this.currentCharacter))
				{
					if(this.currentCharacter=='\n'){
						this.gotoNextLine();
					}else if(this.currentCharacter=='\r'&&this.nextCharacter=='\n')
					{
						this.gotoNextCharacter();
						this.gotoNextLine();
					}
					else
					{
						file.characterPosition++;
					}
					if(file.characterPosition>0)
					{
						this.lastCharacter = file.content[file.characterPosition-1];
					}
					else
					{
						this.lastCharacter = undefined;
					}
					
					if(file.content.length>file.characterPosition)
					{
						this.currentCharacter = file.content[file.characterPosition];
					}
					else
					{
						this.currentCharacter = undefined;
					}
					if(file.content.length>file.characterPosition+1)
					{
						this.nextCharacter = file.content[file.characterPosition+1];
					}
					else
					{
						this.nextCharacter = undefined;
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
				while(this.currentCharacter!='\n')
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
			this.gotoNextCharacter();
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
			includeSpaces=includeSpaces||false;
			if(file.content!=null)
			{
				if(file.characterPosition<file.content.length)
				{
					if(file.line==-1)
					{
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
					do{
						skipped = this.skipComments(includeComments)||this.skipSpaces(includeSpaces);
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
			// Find the line up to the character position
			var index=file.characterPosition;
			
			while(file.content[index]!='\n' && index>0)
			{
				index--;
			}
			console.log("Index:",index," position:",file.characterPosition," diff:",file.characterPosition-index);
			console.log("Line:",file.content.substr(index,(file.characterPosition-index+1)));
			for(;index<file.characterPosition;index++)
			{
				
				if(file.content[index]=='\t')
				{
					process.stdout.write("-------");
				}
				else
				{
					process.stdout.write("-");
				}
			}
			process.stdout.write("^\n");
			//
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
		getNextIdentifier()
		{
			var returnString= "";
			var first = true;
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			while(
				(first && /[A-Za-z_]/.test(this.currentCharacter))
				||/[A-Za-z0-9_]/.test(this.currentCharacter)
			)
			{
				first = false;
				returnString += this.currentCharacter;
				this.next();
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
			return returnString();
		},
		lookAhead:function(str,keepBlanks){
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			if(str && str.length!=0)
			{
				
				for(var index=0;index<str.length;index++)
				{
					if(this.currentCharacter != str[index])
					{
						if ( str == "endif" && this.currentCharacter!=str[index])
						{
							console.log("Endif is not Endif:[",index,"] [",str,"] [",str[index],"] [",this.lastCharacter,"][",this.currentCharacter,"] [",this.nextCharacter,"]");
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
						
						return false;
					}
					else
					{
						
					}
					this.next(true);
				}
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
					console.log("Return Because Identifier Matched");
					return false;
				}
				
				if(!keepBlanks)
				{
					
					this.skipBlanks();
					
				}
				
				return true;
			}
			else
			{
				this.unexpected("NULL or empty for lookahead");
			}
			
		},
		preprocessorLookAhead(str,keepBlanks)
		{
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			if(str && str.length!=0)
			{
				
				for(var index=0;index<str.length;index++)
				{
					if(this.currentCharacter != str[index])
					{
						if ( str == "endif" && this.currentCharacter!=str[index])
						{
							console.log("Endif is not Endif:[",index,"] [",str,"] [",str[index],"] [",this.lastCharacter,"][",this.currentCharacter,"] [",this.nextCharacter,"]");
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
						
						return false;
					}
					else
					{
						
					}
					this.next(true);
				}
				if(!keepBlanks)
				{
					
					this.skipBlanks();
					
				}
				
				return true;
			}
			else
			{
				this.unexpected("NULL or empty for lookahead");
			}
		},
		definitionIncomming:function(){
			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			for(var index=0;index<this.typeModifiers.length;index++)
			{
				
				if(this.typeModifiers[index])
				{
					if(this.lookAhead(this.typeModifiers[index]))
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
						
						return true;
					}
				}else
				{
					console.error("ERROR: this.typeModifiers["+index+"] is NULL");
				}
			}
			
			for(var index=0;index<this.typeNames.length;index++)
			{
				if(this.typeNames[index] != undefined)
				{
					if(this.lookAhead(this.typeNames[index]))
					{
						
						file.characterPosition=_characterPosition;
						file.lineCharacterPosition=_lineCharacterPosition;
						file.line = _line;
						if(file.characterPosition>0){
							this.lastCharacter=file.content[file.characterPosition-1];
						}else{
							this.lastCharacter=undefined;
						}
						this.currentCharacter=file.content[file.characterPosition];
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
						
					}
				}
				else
				{
					console.error("ERROR: this.typeNames["+index+"] is undefined");
				}
			}
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
			var foundModifier=false;
			var lastModifier="";
			var modifierCount=0;
			var foundType = false;
			var typeCount=0;
			var nextIdentifier="";
			do{
				var read = false;
				for(var index=0;index < this.typeModifiers.length;index++)
				{
					if(this.lookAhead(this.typeModifiers[index]))
					{
						if(this.typeModifiers[index] != lastModifier)
						{
							lastModifier = this.typeModifiers[index];
							def.modifier.push(this.typeModifiers[index]);
							read=true;
							foundModifier=true;
							modifierCount++;
						}
						else
						{
							def.name= this.typeModifiers[index];
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
				}
			}while(read);
			for(var index = 0 ;index < this.typeNames.length;index++)
			{
				if(this.lookAhead(this.typeNames[index]))
				{
					foundType=true;
					typeCount++;
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
			if(foundModifier&&!foundType) // NOTE: foundType is not necessarily needed here if we return above
			{
				if(foundModifier)
				{
					
					if(def.modifier.length>0 && this.typeNames.includes(lastModifier))
					{
						def.name=lastModifier;
						def.modifier=def.modifier.slice(0,def.modifier.length-1);
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
					else
					{
						this.unexpected(this.typeNames.join(","));
					}
				}
				else
				{
					this.unexpected(this.typeNames.join(","));
				}
			}
			this.unexpected(this.typeNames.join(","));
		},
		identifierIncoming:function()
		{
			
			if(this.currentCharacter && /[A-Za-z_]/.test(this.currentCharacter))
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		readIdentifier:function(keepBlanks)
		{
			var identifier = this.read(/[a-zA-Z0-9_]/,"Identifier",/[a-zA-Z_]/,keepBlanks);
			if(!keywords.includes(identifier))
			{
				return identifier;
			}
			else
			{
				
				this.unexpected("identifier:[",identifier,"]");
			}
		},
		read:function(reg,expected,startreg,keepBlanks){
			startreg = startreg||reg;
			if(!startreg.test(this.currentCharacter))
			{
				this.unexpected(expected);
			}
			//var val = [this.currentCharacter];
			//this.next(true);
			var val=[];
			while(this.currentCharacter && reg.test(this.currentCharacter))
			{
				val.push(this.currentCharacter);
				this.next(true);
			}
			if(!keepBlanks)
			{
				this.skipBlanks();
			}
			return val.join("");
		},
		parseArgumentDefinitions:function()
		{
			
			var args = [];
			while(this.definitionIncomming())
			{
				args.push(this.readDefinition());
				if(this.lookAhead(")")){
					//this.consume(")");
					return args;
				}
				this.consume(",");
				this.skipBlanks();
			}
			
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
			var caseCount=0;
			this.consume("{");
			
			while(!(this.currentCharacter=='}'||this.currentCharacter==undefined))
			{
				var condition={};
				
				this.skipBlanks();
				if(this.lookAhead("case"))
				{
					caseCount++;
					if(caseCount>maxSwitchCase)
					{
						this.unexpected("Too many case statements");
					}
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
						
						conditionsBlock.body.push(theStatement);
					}
					else
					{
						
						var theStatement = this.parseStatement();
						
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
			
			return switchStatement;
		},
		parseBody:function(){
			var statements = [];
			this.skipBlanks();
			this.consume("{");
			while(!(this.currentCharacter=="}"||this.currentCharacter==undefined))
			{
				this.skipBlanks();
				
				var position = file.characterPosition;
				var statement = this.parseStatement();
				statements.push(statement);
				
				this.skipBlanks();
				
			}
		
			this.consume("}");
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
			
			var expression = this.parseBinary(unaryExpression,0);
			
			
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
				if(this.definitionIncomming())
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
				
			}
			else if (this.lookAhead("'"))
			{
				var val = this.currentCharacter.charCodeAt(0);
				var isEscape = false;
				if(this.currentCharacter == "\\")
				{
					
					isEscape=true;
					this.next();
					val = this.readEscapeSequence().charCodeAt(0);
					
				}else{
					this.next(true,true);
				}
				this.consume("'");
				expression = {
					type:"Literal",
					literalType:"Char",
					source:"CharCode",
					isEscape:isEscape,
					value:val
				};
				
			}
			else if ( this.stringIncoming())
			{
				expression = {
					type:"Literal",
					literalType:"String",
					value:this.readString()
				};
				
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
				
			}
			else if(this.identifierIncoming())
			{
				val = this.readIdentifier();
				expression={
					type:"Identifier",
					value:val
				};
				
			}
			else
			{
				
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
			
			return expression;
		},
		readEscapeSequence:function()
		{
			if(this.currentCharacter=="x"){
				this.next(true,true);
				var val = 0;
				var charCount=0;
				while(/[0-9A-Fa-f]/.test(this.currentCharacter)&& charCount<=2)
				{
					val = ((val<<4)+parseInt(this.currentCharacter,16));
					this.next(true,true);
					charCount++;
				}
				
				if(charCount!=2)
				{
					this.unexpected("Hex character with count not 2");
				}
				return String.fromCharCode(val);
			}else if ( /[0-7]/.test(this.currentCharacter)){
				var val = 0 ;
				var charCount=0;
				while( /[0-7]/.test(this.currentCharacter)&&charCount<=3)
				{
					val = ((val<<3)+parseInt(this.currentCharacter,8));
					if(val<=255)
					{
						this.next(true,true);
						charCount++;
					}
					else
					{
						this.unexpected("Octal character values may only be up to 255");
					}
				}
				if(charCount!=3)
				{
					this.unexpected(["Octal character with count not 3",charCount].join(""));
				}
				return String.fromCharCode(val);
			}else if( /u/.test(this.currentCharacter)){
				var val = 0 ;
				var charCount=0;
				this.next();
				while( /[0-9a-fA-F]/.test(this.currentCharacter)&&charCount<=4)
				{
					val = ((val<<4)+parseInt(this.currentCharacter,16));
					this.next(true,true);
					charCount++;
				}
				if(!/^.$/u.test(String.fromCharCode(val)))
				{
					this.unexpected(["Invalid Unicode code point:[",val,"]"].join(""));
				}
				if(charCount !==4)
				{
					this.unexpected("Unicode escape with count not 4 characters");
				}
				return String.fromCharCode(val);
			}else if( /U/.test(this.currentCharacter)){
				var val = 0 ;
				var charCount=0;
				this.next();
				while( /[0-9a-fA-F]/.test(this.currentCharacter)&&charCount<=8)
				{
					val = ((val<<4)+parseInt(this.currentCharacter,16));
					this.next(true,true);
					charCount++;
				}
				if(!/^.$/u.test(String.fromCharCode(val)))
				{
					this.unexpected(["Invalid Unicode code point:[",val,"]"].join(""));
				}
				if(charCount !==8)
				{
					this.unexpected(["Unicode escape with count not 8 characters:[",charCount,"]"].join(""));
				}
				return String.fromCharCode(val);
			}else if( Object.keys(escapeSequences).includes(this.currentCharacter)){
				var escapeChar = escapeSequences[this.currentCharacter];
				this.next(true,true);
				return escapeChar;
			}
			this.unexpected(["escape sequence:[",this.currentCharacter,"] escape characters[",this.escapeSequences,"]"].join(""));
			
		},
		numberIncoming:function()
		{
			
			if(this.currentCharacter != undefined && /[0-9]/.test(this.currentCharacter))
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		getMinRepresentable(numberValue)
		{
			if(numberValue >0)
			{
				if(numberValue <= SCHAR_MIN )
				{
					return "int8_t";
				}
				else if ( numberValue <=UCHAR_MAX )
				{
					return "uint8_t";
				}
				else if( numberValue <=SHRT_MAX)
				{
					return "int16_t";
				}
				else if(numberValue<=USHRT_MAX)
				{
					return "uint16_t";
				}
				else if(numberValue<=LONG_MAX)
				{
					return "int32_t";
				}
				else if(numberValue<=ULONG_MAX)
				{
					return "uint32_t";
				}
				else if(numberValue<=LLONG_MAX)
				{
					return "int64_t";
				}
				else if(numberValue<=ULLONG_MAX)
				{
					return "uint64_t";
				}
			}
			else
			{
				if(numberValue>=SCHAR_MIN)
				{
					return "int8_t";
				}
				else if (numberValue>=SHRT_MIN)
				{
					return "int16_t";
				}
				else if(numberValue>=LONG_MIN)
				{
					return "int32_t";
				}
				else if(numberValue>=LLONG_MIN)
				{
					return "int64_t";
				}
			}
		},
		readNumber:function(keepBlanks)
		{
			if(this.currentCharacter=='0' &&this.nextCharacter=='b')
			{
				this.next();
				this.next();
				var numberValue=this.readBinaryNumber(keepBlanks); 
				
				return { value:numberValue,"numberType":"base2Integer","minRepresentable":this.getMinRepresentable(numberValue)};
			}
			else if ( this.currentCharacter=='0' && /[0-7]/.test(this.nextCharacter))
			{
				this.next();
				var numberValue=this.readOctalNumber(keepBlanks);
				return { value:numberValue,"numberType":"base8Integer","minRepresentable":this.getMinRepresentable(numberValue)};
			}
			else if(this.currentCharacter =='0' && this.nextCharacter=='x')
			{
				this.next();
				this.next();
				var numberValue=this.readHexNumber(keepBlanks);
				return { value:numberValue,"numberType":"base16Integer","minRepresentable":this.getMinRepresentable(numberValue)};
			}
			else
			{ 
				var _line=file.line;
				var _lineCharacterPosition=file.lineCharacterPosition;
				var _characterPosition = file.characterPosition;
				var decimalCount=0;
				var exponentCount=0;
				while(this.currentCharacter&&/[0-9\.e]/.test(this.currentCharacter))
				{
					
					if(this.currentCharacter=='.' && decimalCount==0 && exponentCount==0)
					{
						decimalCount++;
					}
					else if(this.currentCharacter=='.' && decimalCount>0 && exponentCount==0)
					{
						this.unexpected("Too many decimals");
					}
					else if(this.currentCharacter=='.' && exponentCount>0)
					{
						this.unexpected("unexpected Number");
					}
					if(this.currentCharacter=='e' && exponentCount==0)
					{
						exponentCount++;
					}
					else if(this.currentCharacter=='e' && exponentCount>0)
					{
						this.unexpected("Too many exponent specifiers");
					}
					this.next();
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
					return { value:numberValue,"numberType":"base10Integer","minRepresentable":this.getMinRepresentable(numberValue)};
				}
				else
				{
					
					var numberValue = this.read(/[0-9\.e]/,"Number",/[0-9e]/,keepBlanks);
					var numberDef = { value:parseFloat(numberValue),"numberType":"doubleFloat"};
					if(this.currentCharacter=='f')
					{
						this.consume("f");
						numberDef.numberType='singleFloat';
					}
					return numberDef;
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
					this.unexpected(["String length too long:[",stringCharacterCount.toString()," ",maxCharactersPerString.toString(),"]"].join(""));
				}
			}
			if(!this.lookAhead("\"",keepBlanks))
			{
				this.unexpected("\"");
			}
			
			return val.join("");
		},
		peekBinaryOperation:function(){
			

			var _line=file.line;
			var _lineCharacterPosition=file.lineCharacterPosition;
			var _characterPosition = file.characterPosition;
			
			for( var index = 0 ; index < this.sortedOperations.length ; index++ )
			{
				
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
					
					return this.sortedOperations[index];
				}
			}
			return false;
		},
		parseBinary:function(left,minPrec){
			var lookAhead = this.peekBinaryOperation();
			while(lookAhead && this.operations[lookAhead]>= minPrec)
			{
				
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
				this.printTabs();
				if(theExpression[statement]!=undefined && theExpression[statement].type!=undefined)
				{
					switch(theExpression[statement].type){
						case "FunctionDefinition":
							this.printFunctionDefinition(theExpression[statement]);
						break;
						case "ExpressionStatement":
							this.printExpressionStatement(theExpression[statement]);
						break;
						case "ReturnStatement":
							this.printReturnStatement(theExpression[statement]);
						break;
						case "VariableDeclaration":
							this.printVariableDeclaration(theExpression[statement],false,true);
						break;
						case "PreProcessorExpression":
							this.printPreprocessorExpression(theExpression[statement]);
						break;
						case "StructDefinition":
							this.printStructDefinition(theExpression[statement]);
						break;
						case "UnionDefinition":
							this.printUnionDefinition(theExpression[statement]);
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
							if(theExpression[statement].init.type && theExpression[statement].init.expression!=undefined||
							theExpression[statement].init.type=="VariableDeclaration"
							)
							{
								switch(theExpression[statement].init.type){
									case "VariableDeclaration":
										this.printVariableDeclaration(theExpression[statement].init);
									break;
									case "ExpressionStatement":
										this.printExpressionStatement(theExpression[statement].init);
									break;
									default:
										console.log("[print]Unhandled for loop init type:[",theExpression[statement].init.type,"]");
										
								}
							}
							else
							{

							}
							process.stdout.write(";");
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
							
							this.print(theExpression[statement].body);
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}\n");
						break;
						case "SwitchStatement":
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
											
											this.printLiteral(theExpression[statement].body.conditions[caseStatementGroup].conditions[caseStatement]);
											process.stdout.write(":\n");
											
											
										break;

										default:
											console.log("Unrecognized switch case literal");
									}
									
									
								}
								this.tabCount++;
								this.print(theExpression[statement].body.conditions[caseStatementGroup].body);
								this.tabCount--;
								this.printTabs();
								
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
						case "GlobalVariableDeclaration":
						
							for(modifier in theExpression[statement].defType.modifier)
							{
								process.stdout.write(theExpression[statement].defType.modifier[modifier]+" ");
							}
							process.stdout.write(theExpression[statement].defType.name + " ");
							process.stdout.write(theExpression[statement].name + " ");
							if(theExpression[statement].value != undefined)
							{
								process.stdout.write(" = ");
								this.printLiteral(theExpression[statement].value);
								process.stdout.write(";\n");
							}
							else
							{
								process.stdout.write(";\n");
							}
						break;
						case "WhileStatement":
							process.stdout.write("while(");
							switch(theExpression[statement].condition.type){
								case "BinaryExpression":
									switch(theExpression[statement].condition.left.type){
										case "Identifier":
											this.printIdentifier(theExpression[statement].condition.left);
										break;
										default:
									console.log("Unhandled while statement left condition type[",theExpression[statement].condition.left.type,"]");
									}
									process.stdout.write(theExpression[statement].condition.operator);
									switch(theExpression[statement].condition.right.type){
										case "Literal":
											this.printLiteral(theExpression[statement].condition.right);
										break;
										default:
											console.log("Unhandled while statement right condition type:[",theExpression[statement].condition.left.type,"]");
									}
								break;
								default:
									console.log("Unhandled While Statement condition type:[",theExpression[statement].condition.type,"]");
							}
							process.stdout.write("){\n");
							this.tabCount++;
							this.print(theExpression[statement].body);
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}\n");
							
						
						break;
						case "DoWhileStatement":
							process.stdout.write("do{\n");
							
							this.tabCount++;
							this.print(theExpression[statement].body);
							this.tabCount--;
							this.printTabs();
							process.stdout.write("}while(");
							switch(theExpression[statement].condition.type){
								case "BinaryExpression":
									switch(theExpression[statement].condition.left.type){
										case "Identifier":
											this.printIdentifier(theExpression[statement].condition.left);
										break;
										default:
									console.log("Unhandled while statement left condition type[",theExpression[statement].condition.left.type,"]");
									}
									process.stdout.write(theExpression[statement].condition.operator);
									switch(theExpression[statement].condition.right.type){
										case "Literal":
											this.printLiteral(theExpression[statement].condition.right);
										break;
										default:
											console.log("Unhandled while statement right condition type:[",theExpression[statement].condition.left.type,"]");
									}
								break;
								default:
									console.log("Unhandled While Statement condition type:[",theExpression[statement].condition.type,"]");
							}
							process.stdout.write(");\n");
							
							
						
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
				
					this.printLiteral(theExpression.left.value);
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
			process.stdout.write(";\n");
		},
		printIdentifier(theIdentifier){
			process.stdout.write(theIdentifier.value.toString());
		},
		printFunctionDefinition:function(functionDefinition)
		{
			spaceBuffer = Buffer.from(" ",'utf8');
			openingParenthesisBuffer = Buffer.from("(",'utf8');
			closingParenthesisBuffer = Buffer.from(")",'utf8');
			buffer = Buffer.from(functionDefinition.defType.name, 'utf8');
			process.stdout.write(buffer.toString());
			process.stdout.write(spaceBuffer.toString());
			buffer = Buffer.from(functionDefinition.name, 'utf8');
			process.stdout.write(buffer.toString());
			process.stdout.write(openingParenthesisBuffer);
			var argumentString = "";
			var argumentStrings = [];
			for(var argument in functionDefinition.arguments)
			{
				switch(functionDefinition.arguments[argument].type.trim())
				{
					case "Literal":
						this.printLiteral(functionDefinition.arguments[argument]);
					break;
					case "Definition":
						switch(functionDefinition.arguments[argument].defType.type.trim())
						{
							case "Type":
								for(var modifier in functionDefinition.arguments[argument].defType.modifier)
								{
									argumentString += functionDefinition.arguments[argument].defType.modifier[modifier] + " ";
								}
								argumentString += functionDefinition.arguments[argument].defType.name + " ";
								argumentString += functionDefinition.arguments[argument].name;
								argumentStrings.push(argumentString);
								argumentString = "";
							break;
							case "Pointer":
								for(var modifier in functionDefinition.arguments[argument].defType.target.modifier)
								{
									argumentString += functionDefinition.arguments[argument].defType.target.modifier[modifier] + " ";
								}
								argumentString += functionDefinition.arguments[argument].defType.target.target.name;
								argumentString += this.printPointer(functionDefinition.arguments[argument],true);
								argumentString += functionDefinition.arguments[argument].name;
								argumentStrings.push(argumentString);
								argumentString = "";
							break;
							default:
								console.log("Unhandled Definition Type:[",functionDefinition.arguments[argument].defType.type.trim(),"]");
						}
					break;
					default:
						console.log("Unhandled argument type :[",functionDefinition.arguments[argument].type.trim(),"]");
				}
			}
			
			process.stdout.write(argumentStrings.join(","));
			process.stdout.write(closingParenthesisBuffer);
			process.stdout.write("{\n");
			this.tabCount++;
			this.print(functionDefinition.body);
			this.tabCount--;
			process.stdout.write("}\n");
			
		},
		printUnionDefinition(unionDefinition)
		{
			process.stdout.write("union ");
			process.stdout.write(unionDefinition.name);
			process.stdout.write("{\n");
			this.tabCount++;
			for(var structItem in unionDefinition.member)
			{
				switch(unionDefinition.member[structItem].type)
				{
					case "Definition":
						this.printTabs();
						switch(unionDefinition.member[structItem].defType.type)
						{
							case "Type":
								for(var modifier in unionDefinition.member[structItem].defType.modifier)
								{
									process.stdout.write(unionDefinition.member[structItem].defType.modifier[modifier].toString()+" ");
								}
								process.stdout.write(unionDefinition.member[structItem].defType.name.toString() + " ");
							break;
							case "Pointer":
								process.stdout.write(unionDefinition.member[structItem].name+"");
								process.stdout.write(this.printPointer(unionDefinition.member[structItem].defType.target,true));
							break;	
							default:
								console.log("Unhandled union member type:",unionDefinition.member[structItem].type);
						}
						process.stdout.write(unionDefinition.member[structItem].name+";\n");
					break;
					default:
						console.log("Unhandled union member type:",unionDefinition.member[structItem].type);
				}
			}
			this.tabCount--;
			process.stdout.write("};\n\n");
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
								process.stdout.write(structDefinition.member[structItem].name+"");
								process.stdout.write(this.printPointer(structDefinition.member[structItem].defType.target,true));
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
		printPointer:function(pointerDefinition,returnString)
		{
			//console.log("PrintPointer:[",pointerDefinition,"]");
			var stringContent="";
			if(pointerDefinition.defType!=undefined)
			{
				switch(pointerDefinition.defType.type)
				{
					case "Type":
						if(pointerDefinition.target.modifier!=undefined)
						{
							for(var modifier in pointerDefinition.target.modifier)
							{
								stringContent += pointerDefinition.target.modifier[modifier]+" ";
							}
						}
						stringContent += "*";
					break;
					case "Pointer":
						if(pointerDefinition.defType.target.modifier!=undefined)
						{
							for(var modifier in pointerDefinition.defType.target.modifier)
							{
								stringContent += pointerDefinition.defType.target.modifier[modifier]+" ";
							}
						}
						stringContent += "*";
						stringContent += this.printPointer(pointerDefinition.defType.target,returnString);
					break;
				}
			}else if(pointerDefinition.target!= undefined)
			{
				switch(pointerDefinition.target.type)
				{
					case "Type":
						if(pointerDefinition.target.modifier!=undefined)
						{
							for(var modifier in pointerDefinition.target.modifier)
							{
								stringContent += pointerDefinition.target.modifier[modifier]+" ";
							}
						}
						stringContent += "*";
					break;
					case "Pointer":
						if(pointerDefinition.defType.target.modifier!=undefined)
						{
							for(var modifier in pointerDefinition.defType.target.modifier)
							{
								stringContent += pointerDefinition.defType.target.modifier[modifier]+" ";
							}
						}
						stringContent += "*";
						stringContent += this.printPointer(pointerDefinition.defType.target,returnString);
					break;
				}
			}
			if(returnString){
				return stringContent;
			}
			else
			{
				process.stdout.write(stringContent);
				return stringContent;
			}
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
				case "SuffixExpression":
					switch(expressionStatment.expression.value.type)
					{
						case "Identifier":

							this.printIdentifier(expressionStatment.expression.value);
							process.stdout.write(expressionStatment.expression.operator+";\n");
						break;
						default:
							console.log("Unhandled expression value type:[",expressionStatment.expression.value.type,"]");
					}
					break;
				case "BinaryExpression":
					this.printBinaryExpression(expressionStatment.expression);
				break;
				default:
					console.log("Unhandled expression type:",expressionStatment.expression.type);
					
			}
			
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
						case "base16Integer":
							process.stdout.write("0x");
							process.stdout.write(literal.value.value.toString(16));
						break;
						case "singleFloat":
							process.stdout.write(literal.value.value.toString()+"f");
						break;
						case "doubleFloat":
							process.stdout.write(literal.value.value.toString());
						break;
						default:
							console.log("Unhandled literal number type:",literal.value.numberType);
					}
				break;
				case "Char":
					
					process.stdout.write("'"+this.returnString(String.fromCharCode(literal.value))+"'");
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
					if(declaration.value!=undefined)
					{
						switch(declaration.value.type)
						{
							case "Literal":
								this.printLiteral(declaration.value);
								
							break;
							default:
								console.log("Unhandled variable declaration type:",declaration.value.type);
						}
					}
					
					if(wantNewLine)
					{
						process.stdout.write(";\n");
					}
				break;
				default:
					console.log("Unhandled variable declaration type:",declaration.defType.type);
			}
		},
		printCallExpression(base,args)
		{
			//this.printTabs();
			switch(base.type){
				case "Identifier":
					process.stdout.write(base.value.toString());
				break;
				default:
					console.log("Unhandled CallExpression type:",base.type);
			}
			process.stdout.write("(");
			if(args != undefined)
			{
				for( arg in args)
				{
					if(args[arg]!=undefined)
					{
						console.log("Args:",args[arg]);
						switch(args[arg].type)
						{
							case "Literal":
								this.printLiteral(args[arg])
							break;
							case "Definition":
								switch(args[arg].defType.type)
								{
									case "Type":
										for(var modifier in args[arg].defType.modifier)
										{
											process.stdout.write(args[arg].defType.modifier[modifier] + " ");
										}
										process.stdout.write(args[arg].defType.name + " ");
										process.stdout.write("");
									break;
									case "Pointer":
									console.log("Print Pointer");
										this.printPointer(args[arg]);
										//console.log("Pointer:",args[arg].defType);
									break;
									default:
										console.log("Unhandled argument deftype type :",args[arg].defType.type);
								}
							break;
							default:
								console.log("Unhandled argument type :",args[arg].type);
						}
					}
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
			var statements = [];
			if(this.preprocessorLookAhead("include"))
			{
				if(this.lookAhead("\""))
				{
					var filepath =[];
					statement.typedef = {type:"include",pathStyle:"localRelative"};
					while(this.currentCharacter!="\"")
					{
						filepath.push(this.currentCharacter);
						this.next();
					}
					statement.typedef.path = filepath.join("");
					this.consume("\"");
					
					const directoryPath = this.relativePath
					statements.push(statement);
					
					this.fileStack.push({file:file,currentCharacter:this.currentCharacter,nextCharacter:this.nextCharacter,lastCharacter:this.lastCharacter});
					file={};
					file.line==-1;
					file.characterPosition=-1;
					file.lineCharacterPosition=-1;
					
					fs.readFile(path.join(directoryPath,filepath.join("")), 'utf8', (err, data) => {
						statement.body=this.parse(data,filepath.join(""));
					});
					statements.push(statement);
					save = this.fileStack.pop();
					file = save.file;
					this.currentCharacter = save.currentCharacter;
					this.nextCharacter = save.nextCharacter;
					this.lastCharacter = save.lastCharacter;
				}
				else if ( this.lookAhead("<"))
				{
					var includePath=[];
					var includeFileName="";
					var actualIncludePath="";
					statement.typedef = {type:"include",pathStyle:"includeRelative"};
					while(this.currentCharacter!=">")
					{
						includePath.push(this.currentCharacter);
						this.next();
					}
					includeFileName = includePath.join("");
					statement.typedef.path = includePath.join("");
					this.consume(">");
					const directoryPath = this.relativePath
					statements.push(statement);
					var continueSearch = true;
					/* Here we must find the file we are looking for*/
					for (includeFile in this.includePaths)
					{
						if (fs.existsSync(this.includePaths[includeFile])) {
							files = fs.readdirSync(this.includePaths[includeFile]);
							for( index in files)
							{
								if(files[index]==includeFileName)
								{
									continueSearch=false;
									actualIncludePath = path.join(this.includePaths[includeFile],includeFileName);
									break;
								}
								else
								{
									//console.log("file:",files[index],"!=",includeFileName);
								}
							}
							//console.log("After Read Directory");
							if(!continueSearch)
							{
								break;
							}
						}
						else{
							console.log("Path NOT Exists");
						}
					}
					if(!continueSearch)
					{
						
					}
					else
					{
						this.unexpected(["Can't find include file:[",includeFileName,"]"].join(""));
					}

					this.fileStack.push({file:file,currentCharacter:this.currentCharacter,nextCharacter:this.nextCharacter,lastCharacter:this.lastCharacter});
					file={};
					file.line==-1;
					file.characterPosition=-1;
					file.lineCharacterPosition=-1;
					
					fs.readFile(actualIncludePath, 'utf8', (err, data) => {
						statement.body=this.parse(data,actualIncludePath);
					});
					statements.push(statement);
					save = this.fileStack.pop();
					file = save.file;
					this.currentCharacter = save.currentCharacter;
					this.nextCharacter = save.nextCharacter;
					this.lastCharacter = save.lastCharacter;
				}
				else
				{
					this.unexpected("\" or < expected after include");
				}
			}
			else if(this.preprocessorLookAhead("define"))
			{
				statement.typedef = {type:"define"};
				if(this.identifierIncoming())
				{
					statement.typedef.name=this.readIdentifier(true);
					if(this.currentCharacter == '\n' || (this.currentCharacter=='\r' && this.nextCharacter=='\n'))
					{
						statement.typedef.defineType="straightDefine";
						statements.push(statement);
						return{"return":false,statements:statements};
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
						statements.push(statement);
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
						statements.push(statement);
					}
					else if (this.lookAhead("0b"))
					{
						statement.typedef.defineType="base2IntegerDefine";
						statement.typedef.value= this.readBinaryNumber();
						statements.push(statement);
					}
					else if (this.lookAhead("0x"))
					{
						statement.typedef.defineType="base16IntegerDefine";
						statement.typedef.value= this.readHexNumber();
						statements.push(statement);
					}
					else if (this.lookAhead("0"))
					{
						statement.typedef.defineType="base8IntegerDefine";
						statement.typedef.value= this.readOctalNumber();
						statements.push(statement);
					}
					else if(this.numberIncoming())
					{
						var numberValue= this.readNumber();
						statement.typedef.defineType="base10IntegerDefine";
						statement.typedef.value=numberValue.value;
						
						statements.push(statement);
					}
					else if(this.lookAhead("("))
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
						var expression = this.parseExpression();

						console.log("Args:",args);
						console.log("Expression:",expression);
						
					}
					else
					{
						this.unexpected("Unknown define type");
					}
				}
			}
			else if(this.preprocessorLookAhead("if"))
			{
				this.poundIfLevel++;
				var number=0;
				var invertResult=false;
				if(this.lookAhead("!"))
				{
					invertResult=true;
				}
				if(this.numberIncoming())
				{
					number = this.readNumber();
					if(number.numberType=="base10Integer" && number.value == 0 && !invertResult)
					{
						// Skipping Code
						var statements = this.internalParse();
						this.poundIfData[poundIfLevel]=0;
						return { "return" :false,statements:[]};
					}
					else
					{
						// Include Code
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=1;
						return { "return" :false,statements:statements};
					}
					console.log("Number:[",number,"]");
				}
				else if (this.lookAhead("defined"))
				{
					var defineVar = "";
					if(this.lookAhead("("))
					{
						if(this.identifierIncoming())
						{
							defineVar = this.readIdentifier();
						}
						this.consume(")");
					}
					else
					{
						if(this.identifierIncoming())
						{
							defineVar = this.readIdentifier();
						}
					}
					if(this.defines.includes(defineVar)&& !invertResult)
					{
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=1;
						return { "return" :false,statements:statements};
					}
					else
					{
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=0;
						return { "return" :false,statements:[]};
					}
				}
				else
				{
					this.unexpected("Number or Defined");
				}

			}
			else if(this.preprocessorLookAhead("elif"))
			{
				this.poundIfLevel++;
				var number=0;
				var invertResult=false;
				if(this.lookAhead("!"))
				{
					invertResult=true;
				}
				if(this.numberIncoming())
				{
					number = this.readNumber();
					if(number.numberType=="base10Integer" && number.value == 0 && !invertResult)
					{
						// Skipping Code
						var statements = this.internalParse();
						this.poundIfData[poundIfLevel]=0;
						return { "return" :false,statements:[]};
					}
					else
					{
						// Include Code
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=1;
						return { "return" :false,statements:statements};
					}
					console.log("Number:[",number,"]");
				}
				else if (this.lookAhead("defined"))
				{
					var defineVar = "";
					if(this.lookAhead("("))
					{
						if(this.identifierIncoming())
						{
							defineVar = this.readIdentifier();
						}
						this.consume(")");
					}
					else
					{
						if(this.identifierIncoming())
						{
							defineVar = this.readIdentifier();
						}
					}
					if(this.defines.includes(defineVar)&& !invertResult)
					{
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=1;
						return { "return" :false,statements:statements};
					}
					else
					{
						var statements = this.internalParse();
						this.poundIfData[this.poundIfLevel]=0;
						return { "return" :false,statements:[]};
					}
				}
				else
				{
					this.unexpected("Number or Defined");
				}
			}
			else if(this.preprocessorLookAhead("else"))
			{
				this.consume("\n");
				var statements = this.internalParse();
				if(this.poundIfData[poundIfLevel]==0)
				{
					this.poundIfData[poundIfLevel]=1;
					return { "return" :false,statements:statements};
				}
				else
				{
					this.unexpected("#elif evalutes to true along with other ");
				}
				// all other cases if not filled go here
			}
			
			else if(this.preprocessorLookAhead("pragma"))
			{
				if(this.lookAhead("alloc_text"))
				{

				}
				else if(this.lookAhead("auto_inline"))
				{
					if(this.lookAhead("on"))
					{
						// auto inline is on
					}
					else if(this.lookAhead("off"))
					{
						// auto inline is off
					}
					else
					{
						this.unexpected("on or off expected after auto_inline");
					}
				}
				else if(this.lookAhead("bss_seg"))
				{
					// add compiler details to the object file
				}
				else if(this.lookAhead("check_stack"))
				{

				}
				else if(this.lookAhead("code_seg"))
				{

				}
				else if(this.lookAhead("comment"))
				{
					this.consume("(");
					if(this.lookAhead("compiler"))
					{
						// Add compiler name and version to object file
					}
					else if ( this.lookAhead("lib"))
					{
						var lib= [];
						this.consume("\"");
						while(!this.currentCharacter=='\"')
						{
							lib.push(this.currentCharacter);
							this.next();
						}
						this.consume("\"");
					}
					else if(this.lookAhead("linker"))
					{
						this.consume("\"");
						this.consume("/");
						if(this.lookAhead("defaultlib"))
						{
							
						}
						else if ( this.lookAhead("export"))
						{

						}
						else if ( this.lookAhead("include"))
						{

						}
						else if ( this.lookAhead("manifestdependency"))
						{

						}
						else if ( this.lookAhead("merge"))
						{

						}
						else if ( this.lookAhead("section"))
						{

						}
						this.consume("\"");
					}
					else if(this.lookAhead("user"))
					{

					}
					this.consume(")");
				}
				else if(this.lookAhead("component"))
				{

				}
				else if (this.lookAhead("conform"))
				{
					
				}
				else if (this.lookAhead("const_seg"))
				{
					
				}
				else if (this.lookAhead("data_seg"))
				{
					
				}
				else if (this.lookAhead("deprecated"))
				{
					
				}
				else if (this.lookAhead("detect_mismatch"))
				{
					
				}
				else if(this.lookAhead("execution_character_set"))
				{

				}
				else if(this.lookAhead("fenv_access"))
				{

				}
				else if(this.lookAhead("float_control"))
				{

				}
				else if(this.lookAhead("fp_contract"))
				{

				}
				else if(this.lookAhead("function"))
				{

				}
				else if(this.lookAhead("hdrstop"))
				{

				}
				else if(this.lookAhead("include_alias"))
				{

				}
				else if(this.lookAhead("init_seg"))
				{

				}
				else if(this.lookAhead("inline_depth"))
				{

				}
				else if(this.lookAhead("inline_recursion"))
				{

				}
				else if(this.lookAhead("intrinsic"))
				{

				}
				else if(this.lookAhead("loop"))
				{

				}
				else if(this.lookAhead("make_public"))
				{

				}
				else if(this.lookAhead("managed"))
				{

				}
				else if(this.lookAhead("unmanaged"))
				{

				}
				else if(this.lookAhead("message"))
				{

				}
				else if(this.lookAhead("omp"))
				{

				}
				else if(this.lookAhead("optimize"))
				{

				}
				else if(this.lookAhead("pack"))
				{

				}
				else if(this.lookAhead("pointers_to_members"))
				{

				}
				else if(this.lookAhead("pop_macro"))
				{

				}
				else if(this.lookAhead("push_macro"))
				{

				}
				else if(this.lookAhead("region"))
				{

				}
				else if(this.lookAhead("end_region"))
				{
					
				}
				else if(this.lookAhead("runtime_checks "))
				{

				}
				else if(this.lookAhead("section"))
				{

				}
				else if(this.lookAhead("setlocale"))
				{

				}
				else if(this.lookAhead("strict_gs_check"))
				{

				}
				else if(this.lookAhead("system_header"))
				{

				}
				else if(this.lookAhead("vtordisp"))
				{

				}
				else if(this.lookAhead("warning"))
				{
					console.log("Pragma Warning:",)
				}
			}
			else if(this.preprocessorLookAhead("error"))
			{
				var errorString = [];
				if(this.lookAhead("\""))
				{
					while(this.currentCharacter&&this.currentCharacter!="\""&&this.currentCharacter!='\n')
					{
						errorString.push(this.currentCharacter);
						this.next();
					}
					if(this.currentCharacter==undefined ||this.currentCharacter=='\n'){
						this.unexpected("\"");
					}
					this.consume("\"");
					
					throw new Error(["CompileError:[",errorString.join(""),"]"].join(""));
				}
				else
				{
					this.unexpected("Quotes String");
				}
			}
			else if(this.preprocessorLookAhead("endif"))
			{
				console.log("Inside EndIf Current Character[",this.currentCharacter,"] NextCharacter:[",this.nextCharacter,"] lastCharacter:[",this.lastCharacter,"]");
				this.characterPosition
				this.poundIfData[this.poundIfLevel]=undefined;
				this.poundIfLevel--;
				return { "return":true,statements:[]};
			}
			else{
				this.unexpected(["#include #define #if #elif #else #endif #pragma #error",]);
			}
			return { "return" :false,statements:statements};
		}
	}
})();


parser.initialize();


module.exports = parser;
