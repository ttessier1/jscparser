const path = require('node:path/win32');
const disassembler = require('./disassemble.js');
const fs = require('fs');

const PROCESSOR_TYPES ={
	IMAGE_FILE_MACHINE_UNKNOWN: 0x0,
	IMAGE_FILE_MACHINE_ALPHA: 0x184,
	IMAGE_FILE_MACHINE_ALPHA64: 0x284,
	IMAGE_FILE_MACHINE_AM33: 0x1d3,
	IMAGE_FILE_MACHINE_AMD64: 0x8664,
	IMAGE_FILE_MACHINE_ARM: 0x1c0,
	IMAGE_FILE_MACHINE_ARM64: 0xaa64,
	IMAGE_FILE_MACHINE_ARM64EC: 0xA641,
	IMAGE_FILE_MACHINE_ARM64X: 0xA64E,
	IMAGE_FILE_MACHINE_ARMNT: 0x1c4,
	IMAGE_FILE_MACHINE_AXP64: 0x284,
	IMAGE_FILE_MACHINE_EBC: 0xebc,
	IMAGE_FILE_MACHINE_I386: 0x14c,
	IMAGE_FILE_MACHINE_IA64: 0x200,
	IMAGE_FILE_MACHINE_LOONGARCH32: 0x6232,
	IMAGE_FILE_MACHINE_LOONGARCH64: 0x6264,
	IMAGE_FILE_MACHINE_M32R: 0x9041,
	IMAGE_FILE_MACHINE_MIPS16: 0x266,
	IMAGE_FILE_MACHINE_MIPSFPU: 0x366,
	IMAGE_FILE_MACHINE_MIPSFPU16: 0x466,
	IMAGE_FILE_MACHINE_POWERPC: 0x1f0,
	IMAGE_FILE_MACHINE_POWERPCFP: 0x1f1,
	IMAGE_FILE_MACHINE_R3000BE: 0x160,
	IMAGE_FILE_MACHINE_R3000: 0x162,
	IMAGE_FILE_MACHINE_R4000: 0x166,
	IMAGE_FILE_MACHINE_R10000: 0x168,
	IMAGE_FILE_MACHINE_RISCV32: 0x5032,
	IMAGE_FILE_MACHINE_RISCV64: 0x5064,
	IMAGE_FILE_MACHINE_RISCV128: 0x5128,
	IMAGE_FILE_MACHINE_SH3: 0x1a2,
	IMAGE_FILE_MACHINE_SH3DSP: 0x1a3,
	IMAGE_FILE_MACHINE_SH4: 0x1a6,
	IMAGE_FILE_MACHINE_SH5: 0x1a8,
	IMAGE_FILE_MACHINE_THUMB: 0x1c2,
	IMAGE_FILE_MACHINE_WCEMIPSV2: 0x169
};

const COFF_CHARACTERISTICS = {
	IMAGE_FILE_RELOCS_STRIPPED: 0x0001,
	IMAGE_FILE_EXECUTABLE_IMAGE: 0x0002,
	IMAGE_FILE_LINE_NUMS_STRIPPED: 0x0004,
	IMAGE_FILE_LOCAL_SYMS_STRIPPED: 0x0008,
	IMAGE_FILE_AGGRESSIVE_WS_TRIM: 0x0010,
	IMAGE_FILE_LARGE_ADDRESS_AWARE: 0x0020,
	IMAGE_FILE_LARGE_LARGE_ADDRESS_AWARE: 0x0040,
	IMAGE_FILE_BYTES_REVERSED_LO: 0x0080,
	IMAGE_FILE_32BIT_MACHINE: 0x0100,
	IMAGE_FILE_DEBUG_STRIPPED: 0x0200,
	IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP: 0x0400,
	IMAGE_FILE_NET_RUN_FROM_SWAP: 0x0800,
	IMAGE_FILE_SYSTEM: 0x1000,
	IMAGE_FILE_DLL: 0x2000,
	IMAGE_FILE_UP_SYSTEM_ONLY: 0x4000,
	IMAGE_FILE_BYTES_REVERSED_HI: 0x8000
};

const COFF_SECTION_CHARACTERISTICS = {
	RESERVED1:0x00000000,
	RESERVED2:0x00000001,
	RESERVED3:0x00000002,
	RESERVED4:0x00000004,
	IMAGE_SCN_TYPE_NO_PAD:0x00000008,
	RESERVED5:0x00000010,
	IMAGE_SCN_CNT_CODE:0x00000020,
	IMAGE_SCN_CNT_INITIALIZED_DATA:0x00000040,
	IMAGE_SCN_CNT_UNINITIALIZED_DATA:0x00000080,
	IMAGE_SCN_LNK_OTHER:0x00000100,
	IMAGE_SCN_LNK_INFO:0x00000200,
	RESERVED6:0x00000400,
	IMAGE_SCN_LNK_REMOVE:0x00000800,
	IMAGE_SCN_LNK_COMDAT:0x00001000,
	IMAGE_SCN_GPREL:0x00008000,
	IMAGE_SCN_MEM_PURGEABLE:0x00020000,
	IMAGE_SCN_MEM_16BIT:0x00020000,
	IMAGE_SCN_MEM_LOCKED:0x00040000,
	IMAGE_SCN_MEM_PRELOAD:0x00080000,
	IMAGE_SCN_ALIGN_1BYTES:    0x00100000,
	IMAGE_SCN_ALIGN_2BYTES:    0x00200000,
	IMAGE_SCN_ALIGN_4BYTES:    0x00300000,
	IMAGE_SCN_ALIGN_8BYTES:    0x00400000,
	IMAGE_SCN_ALIGN_16BYTES:   0x00500000,
	IMAGE_SCN_ALIGN_32BYTES:   0x00600000,
	IMAGE_SCN_ALIGN_64BYTES:   0x00700000,
	IMAGE_SCN_ALIGN_128BYTES:  0x00800000,
	IMAGE_SCN_ALIGN_256BYTES:  0x00900000,
	IMAGE_SCN_ALIGN_512BYTES:  0x00A00000,
	IMAGE_SCN_ALIGN_1024BYTES: 0x00B00000,
	IMAGE_SCN_ALIGN_2048BYTES: 0x00C00000,
	IMAGE_SCN_ALIGN_4096BYTES: 0x00D00000,
	IMAGE_SCN_ALIGN_8192BYTES: 0x00E00000,
	IMAGE_SCN_LNK_NRELOC_OVFL:0x01000000,
	IMAGE_SCN_MEM_DISCARDABLE:0x02000000,
	IMAGE_SCN_MEM_NOT_CACHED:0x04000000,
	IMAGE_SCN_MEM_NOT_PAGED:0x08000000,
	IMAGE_SCN_MEM_SHARED:0x10000000,
	IMAGE_SCN_MEM_EXECUTE:0x20000000,
	IMAGE_SCN_MEM_READ:0x40000000,
	IMAGE_SCN_MEM_WRITE:0x80000000,
};

const MASK_ALIGNMENT = 0x00F00000;
var sections = [];

fs.readFile("stub.obj", (err, data) => {
	 if (err) {
		console.error('Error reading file:', err);
		return;
	}
	console.log("File Length:",data.length);
	let first_index = 0 ;
	let first_loop = true;
	let fileType = "Unknown";
	let state = "readHeader";
	for(first_index=0;first_index<data.length;first_index++)
	{
		var type = data[first_index];
		var processorType = (data[first_index+1]<<8)+data[first_index];
		var checksumcalc = 0 ;
		checksumcalc += data[first_index];
		checksumcalc = checksumcalc % 256;
		var length = (data[first_index+2]<<8)+data[first_index+1];
		checksumcalc += data[first_index+1];
		checksumcalc = checksumcalc % 256;
		checksumcalc += data[first_index+2];
		checksumcalc = checksumcalc % 256;
		var subindex=0;
		var name=[];
		console.log("Index: [",first_index,"]Type:[",type.toString(16),"] Length:[",length,"] ProcessorType:[",processorType.toString(16),"]");
		if((first_loop && (type == 0x80 || type==0x82))||!first_loop && fileType=="OBJ16")
		{
			first_index+= 3;
			console.log("Detected OBJ16 file");
			fileType = "OBJ16";
			first_loop = false;
			switch(type)
			{
				case 31:
					while(true)
					{
						name = [];
						code = [];
						length = data[first_index];
						first_index++;
						if(length<=0 || length==undefined)
						{
							first_index+= length;
							break;
						}
						containsNonPrint=false;
						for(index=first_index;index<first_index+length&& index<data.length;index++)
						{
							if(data[index]!=undefined)
							{
								if(data[index]==0x0a || data[index]==0x0d || data[index]==0x07||
									data[index]>0x20 && data[index]<0x7f)
								{
									code.push(data[index]);
									name.push(String.fromCharCode(data[index]));
								}
								else
								{
									code.push(data[index].toString(16));
									name.push(String.fromCharCode(data[index]));
									containsNonPrint=true;
								}
							}
							else
							{
								console.log("Undefined data at index:",index);
								break;
							}
						}
						first_index+= length;
						if(containsNonPrint)
						{
							console.log("Length:",length," Name:",code.join(" "));
						}
						else
						{
							console.log("Length:",length," Name:",name.join(""));
						}
						
					}

				break;
				case 128: // tmodule
					for(subindex=first_index;subindex<(first_index+(length-1));subindex++)
					{
						name.push(String.fromCharCode(data[subindex]));
						checksumcalc += data[subindex];
						checksumcalc = checksumcalc%256;
					}
					console.log("Name:",name.join(""));
					
				break;
				case '\x88': // COMMENT -- comment

				break;
				case '\x8C': // EXTDEF -- external references

				break;
				case '\x90': // PUBDEF -- Identifies external symbols in this module
				case '\x91': // PUBDEF -- Identifies external symbols in this module

				break;
				case '\x98': // SEGDEF -- Identifies segments
				case '\x99': // SEGDEF -- Identifies segments
					
				break;
				case '\x9A': // GRPDEF - (9Ah) Identifies groups of segments, for example MS-DOS DGROUP

				break;
				case '\x9C': // FIXUPP - (9Ch/9Dh) Fixup or relocation records
				case '\x9D': // FIXUPP - (9Ch/9Dh) Fixup or relocation records

				break;
				case '\xA0': // LEDATA - (A0h/A1h) Contains text of a code or data section
				case '\xA1': // LEDATA - (A0h/A1h) Contains text of a code or data section
					
				break;
				case '\xB0': // COMDEF - (B0h) Uninitialized common data

				break;
				case '\xC2': // COMDAT - (C2h/C3h) Initialized common data
				case '\xC3': // COMDAT - (C2h/C3h) Initialized common data

				break;
				case '\x8A': //MODEND - (8Ah/8Bh) Indicates end of module
				case '\x8B': //MODEND - (8Ah/8Bh) Indicates end of module

				break;
				default:
					console.log("Unrecognized data type:[",type,"]");
			}
			first_index+= length;
			var checksum = data[first_index-1]; 
			console.log("CheckSum:[",checksum,"] [",checksumcalc,"]");
		}
		else if ( first_loop || fileType =="OBJ32")
		{
			
			if(first_loop)
			{
				first=false;
				state = "readHeader";
				fileType="OBJ32";
				console.log("Detected OBJ32 file");
			}
			if(state == "readHeader" )
			{
				switch(processorType)
				{
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_UNKNOWN:
						console.log("Unknown processor type");
					break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_AM33:
						console.log("AMD 33 processor type");
					break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_AMD64:
						console.log("AMD x64 processor type");
					break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_ARM: 
						console.log("ARM little endian");
					break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_ARM64:
						console.log("ARM64 little endian");
					break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_ARM64EC:
						console.log("ARM64EC little endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_ARM64X:
						console.log("ARM64X little endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_ARMNT:
						console.log("ARM Thumb-2 little endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_AXP64:
						console.log("AXP64");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_EBC:
						console.log("EFI byte code");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_I386:
						console.log("Intel 386 or later processors and compatible processors");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_IA64:
						console.log("Intel Itanium processor family");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_LOONGARCH32:
						console.log("LongArch 32-bit processor");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_LOONGARCH64:
						console.log("LongArch 64-bit processor");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_M32R:
						console.log("Mitsubishi M32R little endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_MIPS16:
						console.log("MIPS16");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_MIPSFPU:
						console.log("MIPS with FPU");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_MIPSFPU16:
						console.log("MIPS16 with FPU");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_POWERPC:
						console.log("Power PC little endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_POWERPCFP:
						console.log("Power PC with floating point support");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_R3000BE:
						console.log("R3000Big Endian");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_R3000:
						console.log("R3000");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_R4000:
						console.log("R4000");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_R10000:
						console.log("R10000");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_RISCV32:
						console.log("RISCV32");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_RISCV64:
						console.log("RISCV64");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_RISCV128:
						console.log("RISCV128");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_SH3:
						console.log("SH3");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_SH3DSP:
						console.log("SH3DSP");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_SH4:
						console.log("SH4");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_SH5:
						console.log("SH5");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_THUMB:
						console.log("THUMB");
						break;
					case PROCESSOR_TYPES.IMAGE_FILE_MACHINE_WCEMIPSV2:
						console.log("WCEMIPSV2");
						break;
					default:
						console.log("Unrecognized processor type:[",processorType.toString(16),"]");
				}
				first_index += 2; // skip to NumberOfSections
				let numberOfSections = (data[first_index+1]<<8)+data[first_index];
				console.log("NumberOfSections:",numberOfSections);
				first_index += 2; // skip to TimeDateStamp
				let datetimeStamp = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];

				console.log("Date Timestamp:",datetimeStamp," Date:",new Date(datetimeStamp*1000).toUTCString());
				first_index += 4;
				let offsetToSymbolTable = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
				console.log("Offset to Symbol Table:",offsetToSymbolTable.toString(16));
				first_index += 4;
				let numberOfSymbols = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
				console.log("Number of Symbols:",numberOfSymbols);
				first_index += 4;
				let sizeOfOptionalHeader = (data[first_index+1]<<8)+data[first_index];
				console.log("Size of Optional Header:",sizeOfOptionalHeader.toString(16));
				first_index += 2;
				let characteristics = (data[first_index+1]<<8)+data[first_index];
				console.log("Characteristics:",characteristics.toString(16));
				first_index += 2;

				if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_RELOCS_STRIPPED)
				{
					console.log("\tRelocation info stripped from file.");
				}
				if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_EXECUTABLE_IMAGE)
				{
					console.log("\tFile is executable.");
				}
				if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_LINE_NUMS_STRIPPED)
				{
					console.log("\tLine number info stripped from file.");
				}
				if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_LOCAL_SYMS_STRIPPED)
				{
					console.log("\tLocal symbol info stripped from file.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_AGGRESSIVE_WS_TRIM)
				{
					console.log("\tAggressively trim working set.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_LARGE_ADDRESS_AWARE)
				{
					console.log("\tApp can handle >2GB addresses.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_LARGE_LARGE_ADDRESS_AWARE)
				{
					console.log("\tApp can handle >4GB addresses.");
				} if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_BYTES_REVERSED_LO)
				{
					console.log("\tBytes of machine word are reversed.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_32BIT_MACHINE)
				{
					console.log("\t32-bit word machine.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_DEBUG_STRIPPED)
				{
					console.log("\tDebug info stripped from file.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_REMOVABLE_RUN_FROM_SWAP)
				{
					console.log("\tIf Image is on removable media, copy and run from the swap file.");
				}
				 if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_NET_RUN_FROM_SWAP)
				{
					console.log("\tIf Image is on Net, copy and run from the swap file.");
				}
				 if(characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_SYSTEM)
				{
					console.log("\tSystem file.");
				}
				 if ( characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_DLL)
				{
					console.log("\tFile is a DLL.");
				}
				 if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_UP_SYSTEM_ONLY)
				{
					console.log("\tFile should only be run on a uniprocessor machine.");
				}
				 if (characteristics & COFF_CHARACTERISTICS.IMAGE_FILE_BYTES_REVERSED_HI)
				{
					console.log("\tBytes of machine word are reversed.");
				}

				console.log("Reading Optional Header:",first_index.toString(16));

				if(sizeOfOptionalHeader>0)
				{
					for(let optIndex=0;optIndex<sizeOfOptionalHeader;)
					{
						switch(optIndex)
						{
							case 0: // imageBase
								let imageBase = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
								console.log("Image Base:",imageBase.toString(16));
							break;
							case 4: // sectionAlignment
								let sectionAlignment = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
								console.log("Section Alignment:",sectionAlignment.toString(16));
							break;
							case 8: // fileAlignment
								let fileAlignment = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
								console.log("File Alignment:",fileAlignment.toString(16));
							break;
							case 12: // majorOperatingSystemVersion, minorOperatingSystemVersion
								let majorOperatingSystemVersion = (data[first_index+1]<<8)+data[first_index];
								let minorOperatingSystemVersion = (data[first_index+3]<<8)+data[first_index+2];
								console.log("OS Version:",majorOperatingSystemVersion.toString(16),"."+minorOperatingSystemVersion.toString(16));
							break;
						}
						first_index+=4;
						optIndex+=4;
					}
				}

				console.log("Reading Section Headers:",first_index.toString(16));
				// read Section Headers:
				let sectionIndex = 0 ;
				let section= {};
				while(sectionIndex<numberOfSections)
				{
					console.log("");
					section = {};
					console.log("Reading Section Header ",sectionIndex+1," at ",first_index.toString(16));
					let sectionName = [];
					for(subindex = 0 ; subindex <8; subindex++)
					{
						sectionName.push(data[first_index+subindex]==0?"":String.fromCharCode(data[first_index+subindex]));
					}
					section.sectionName = sectionName.join("");
					console.log("Section Name:",section.sectionName);
					first_index+=8;
					section.virtualSize = (data[first_index+7]<<24)+(data[first_index+6]<<16)+(data[first_index+5]<<8)+data[first_index+4];
					console.log("Virtual Size:",section.virtualSize.toString(16));
					first_index+=4;
					section.virtualAddres = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Virtual Address:",section.virtualAddres.toString(16));
					first_index+=4;
					section.sizeOfRawData = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Size of Raw Data:",section.sizeOfRawData.toString(16));
					first_index+=4;
					section.pointerToRawData = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Pointer to Raw Data:",section.pointerToRawData.toString(16));
					first_index+=4;
					section.pointerToRelocations = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Pointer to Relocations:",section.pointerToRelocations.toString(16));
					first_index+=4;
					section.pointerToLineNumbers = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Pointer to Line Numbers:",section.pointerToLineNumbers.toString(16));
					first_index+=4;
					section.numberOfRelocations = (data[first_index+1]<<8)+data[first_index];
					console.log("Number of Relocations:",section.numberOfRelocations);
					first_index+=2;
					section.numberOfLineNumbers = (data[first_index+1]<<8)+data[first_index];
					console.log("Number of Line Numbers:",section.numberOfLineNumbers);
					first_index+=2;
					section.characteristics = (data[first_index+3]<<24)+(data[first_index+2]<<16)+(data[first_index+1]<<8)+data[first_index];
					console.log("Characteristics:",section.characteristics.toString(16));
					first_index+=4;	
					sectionIndex++;
					sections.push(section);
					if(
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED1) == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED2) == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED3) == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED4) == 0 &&	
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED5) == 0 &&	
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED6) == 0 &&
						//section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_PURGEABLE == 0 &&
						//section.characteristics & IMAGE_SCN_MEM_16BIT == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_LOCKED) == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_PRELOAD) == 0 &&
						(section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_OTHER) == 0
					)
					{
						if(section.characteristics &COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_TYPE_NO_PAD)
						{
							console.log("\tSection is not padded to the next boundary.");
						}
						if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_CNT_CODE)
						{
							console.log("\tSection is executable.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_CNT_INITIALIZED_DATA)
						{
							console.log("\tSection contains initialized data.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_CNT_UNINITIALIZED_DATA)
						{
							console.log("\tSection contains initialized data.");
						} 
						if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_INFO)
						{
							console.log("\tSection contains comments or other information.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_REMOVE)
						{
							console.log("\tSection contains information not to be in final image.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_COMDAT)
						{
							console.log("\tSection contains comdata data");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_GPREL)
						{
							console.log("\tSection contains global pointer data");
						}
						if(section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_16BIT )
						{
							console.log("\tSection contains 16-bit code.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_1BYTES)
						{
							console.log("\tSection aligned by 1 byte.");
						}
						 if ((section.characteristics &MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_2BYTES)
						{
							console.log("\tSection aligned by 2 byte.");
						}
						 if ((section.characteristics &MASK_ALIGNMENT) ==  COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_4BYTES)
						{
							console.log("\tSection aligned by 4 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_8BYTES)
						{
							console.log("\tSection aligned by 8 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_16BYTES)
						{
							console.log("\tSection aligned by 16 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_32BYTES)
						{
							console.log("\tSection aligned by 32 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_64BYTES)
						{
							console.log("\tSection aligned by 64 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_128BYTES)
						{
							console.log("\tSection aligned by 128 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_256BYTES)
						{
							console.log("\tSection aligned by 256 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) ==  COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_512BYTES)
						{
							console.log("\tSection aligned by 512 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) ==  COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_1024BYTES)
						{
							console.log("\tSection aligned by 1024 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) ==  COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_2048BYTES)
						{
							console.log("\tSection aligned by 2048 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) == COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_4096BYTES)
						{
							console.log("\tSection aligned by 4096 byte.");
						}
						 if ((section.characteristics & MASK_ALIGNMENT) ==  COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_ALIGN_8192BYTES)
						{
							console.log("\tSection aligned by 8192 byte.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_NRELOC_OVFL)
						{
							console.log("\tSection contains extended relocations.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_DISCARDABLE)
						{
							console.log("\tSection can be discarded as needed.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_NOT_CACHED)
						{
							console.log("\tSection can not be cached.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_NOT_PAGED)
						{
							console.log("\tSection can not be paged.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_SHARED)
						{
							console.log("\tSection can not be shared.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_EXECUTE)
						{
							console.log("\tSection can executed as code.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_READ)
						{
							console.log("\tSection can read.");
						}
						 if (section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_WRITE)
						{
							console.log("\tSection can written.");
						}
					}
					else
					{
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED1) !=0)
						{
							console.log("\tReserved1 bit is set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED2) != 0)
						{
							console.log("\tReserved2 bit is set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED3) != 0)
						{
							console.log("\tReserved3 bit is set.");	
						} 
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED4) !=0)
						{
							console.log("\tReserved4 bit is set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED5) != 0 )
						{
							console.log("\tReserved5 bit is set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.RESERVED6) != 0)
						{
							console.log("\tReserved6 bit is set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_PURGEABLE) != 0)
						{
							console.log("\tSection is purgeable set .");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_16BIT) != 0)
						{
							console.log("\tSection is 16 bit set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_LOCKED) != 0)
						{
							console.log("\tSection is locked set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_MEM_PRELOAD) != 0)
						{
							console.log("\tSection is preloaded set.");
						}
						if((section.characteristics & COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_LNK_OTHER) != 0)
						{
							console.log("\tSection has other link type set.");
						}
					}

				}

				console.log("Reading Section :",first_index.toString(16));
				for(subindex = 0 ; subindex<sections.length;subindex++)
				{
					if(sections[subindex].sizeOfRawData>0){
						console.log("Reading Section Data for ",sections[subindex].sectionName," at ",sections[subindex].pointerToRawData.toString(16));
						let sectionData = [];
						for(let dataIndex=0;dataIndex<sections[subindex].sizeOfRawData;dataIndex++)
						{
							sectionData.push(data[sections[subindex].pointerToRawData+dataIndex].toString(16));
						}
						if(sections[subindex].characteristics&COFF_SECTION_CHARACTERISTICS.IMAGE_SCN_CNT_CODE)
						{
							disassembler.dissassemble(sectionData,false,false);
						}
						console.log("Section Data:",sectionData);
					}
					if(sections[subindex].numberOfRelocations>0)
					{
						console.log("Reading Relocation Data for ",sections[subindex].sectionName," at ",sections[subindex].pointerToRelocations.toString(16));
						let relocationData = [];
						for(let relocIndex=0;relocIndex<sections[subindex].numberOfRelocations*10;relocIndex++)
						{
							relocationData.push(data[sections[subindex].pointerToRelocations+relocIndex]);
						}	
						console.log("Relocation Data:",relocationData);
					}
				}
				state = "readSections";
	
				process.exit(0);
			}
			else
			{

			}
		}

	}
	console.log('Binary data:', data); // `data` is a Buffer
});
