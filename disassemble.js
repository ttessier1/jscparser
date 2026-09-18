const G1_prefix ={
    0xF0:"LOCK",
    0xF2:"REPNE",
    0xF3:"REP"
};
const G2_prefix={
    0x2E:"SEGCSOverride", // Branch not taken with Jcc
    0x36:"SEGSSOverride",
    0x3E:"SEGDSOverride", // Branch taken with Jcc
    0x26:"SEGESOverride",
    0x64:"SEGFSOverride",
    0x65:"SEGGSOverride"
};

const G3_prefix={
    0x66:"OperandSizeOverride"
};
const G4_prefix={
    0x67:"AddressSizeOverride"
};
const prefixBytes =[
    0x67,
    0xF0,
    0x66,
    0x2E,
    0x3E,
    0x26,
    0x64,
    0x65,
    0x36
];
const prefixCodes = [
    0x66,  // 
    0x67, //
    0xF2, //
    0xF3 //     
];

const rexPrefixes = [
    0x40,
    0x41,
    0x42,
    0x43,
    0x44,
    0x45,
    0x46,
    0x47,
    0x48,
    0x49,
    0x4A,
    0x4B,
    0x4C,
    0x4D,
    0x4E,
    0x4F
];

const eee_ctrl=
{
    0x00:"CR0",
    0x01:"Reserved1",
    0x02:"CR2",
    0x03:"CR3",
    0x04:"CR4",
    0x05:"Reserved2",
    0x06:"Reserved3",
    0x07:"Reserved4"
};

const eee_debug=
{
    0x00:"DR0",
    0x01:"DR1",
    0x02:"DR2",
    0x03:"DR3",
    0x04:"Reserved1",
    0x05:"Reserved2",
    0x06:"DR6",
    0x07:"DR7"
};

const ttt_Condition={
    0x0:"O Overflow",
    0x1:"NO No Overflow",
    0x2:"B,NAE Below,Not Above or Equal",
    0x3:"NB,AE Not Below,Aove or Equal",
    0x4:"E,Z Equal,Zero",
    0x5:"NE,NZ Not Equal,Not Zero",
    0x6:"BE,NA Below or Equal,Not Above",
    0x7:"NBE,A Not Below or Equal,Above",
    0x8:"S Sign",
    0x9:"NS Not Sign",
    0xA:"P,PE Parity,Parity Even",
    0xB:"NP,PO Not Parity,Parity Odd",
    0xC:"L,NGE Less Than,Not Greater Than or Equal",
    0xD:"NL,GE Not Less Than,Greater or Equal",
    0xE:"LE,NG Less Than or Equal, Not Greater Than",
    0xF:"NLE,G Not Less than or Equal,Greater Than"
};

const d_bit={
    0x0:"Source Reg,Dest ModR/M or SIB",
    0x1:"Source ModR/M or SIB,Dest Reg"
};

const ModRm ={
    0x0:"",
    0x1:"Reserved1",
    0x2:"",
    0x3:"Reserved2"
}

const sign_bit =
{
    0x0:"None",
    0x1:"Sign",
}

const w_bit_16 =
{
    0:8, // 8 bits
    1:16 // 16 or 32 bits depending on Operand size
};

const w_bit_32 =
{
    0:8, // 8 bits
    1:32 // 16 or 32 bits depending on Operand size
};

const CONST_no_w_reg_16 ={
    0x00:"AX",
    0x01:"CX",
    0x02:"DX",
    0x03:"BX",
    0x04:"SP",
    0x05:"BP",
    0x06:"SI",
    0x07:"DI"
};

const CONST_no_w_reg_32={
    0x00:"EAX",
    0x01:"ECX",
    0x02:"EDX",
    0x03:"EBX",
    0x04:"ESP",
    0x05:"EBP",
    0x06:"ESI",
    0x07:"EDI"
};

const CONST_no_w_reg_64={
    0x00:"RAX",
    0x01:"RCX",
    0x02:"RDX",
    0x03:"RBX",
    0x04:"RSP",
    0x05:"RBP",
    0x06:"RSI",
    0x07:"RDI"
};

const CONST_w_0_16_reg={
    0x00:"AL",
    0x01:"CL",
    0x02:"DL",
    0x03:"BL",
    0x04:"AH", // except when rex
    0x05:"CH",// except when rex
    0x06:"DH",// except when rex
    0x07:"BH"// except when rex
};

const CONST_w_1_16_reg={
    0x00:"AX",
    0x01:"CX",
    0x02:"DX",
    0x03:"BX",
    0x04:"SP",
    0x05:"BP",
    0x06:"SI",
    0x07:"DI"
};

const CONST_w_0_32_reg={
    0x00:"AL",
    0x01:"CL",
    0x02:"DL",
    0x03:"BL",
    0x04:"AH",// except when rex
    0x05:"CH",// except when rex
    0x06:"DH",// except when rex
    0x07:"BH"// except when rex
};

const CONST_w_1_32_reg={
    0x00:"EAX",
    0x01:"ECX",
    0x02:"EDX",
    0x03:"EBX",
    0x04:"ESP",
    0x05:"EBP",
    0x06:"ESI",
    0x07:"EDI"
};

const CONST_sreg2=
{
    0x00:"ES",
    0x01:"CS",
    0x02:"SS",
    0x03:"DS"
};

const CONST_sreg3={
    0x00:"ES",
    0x01:"CS",
    0x02:"SS",
    0x03:"DS",
    0x04:"FS",
    0x05:"GS",
    0x06:"Res1",
    0x07:"Res2"
};

const one_byte_ops_64bitmode=
{

};

const one_byte_ops_n64bitmode=
{
    0x37:"AAA", // AAA – ASCII Adjust after Addition
    0x3F:"AAS", // AAS – ASCII Adjust AL after Subtraction
    0x98:"CBW", // CBW – Convert Byte to Word
    0x99:"CDQ", // CDQ – Convert Doubleword to Qword
    0xF8:"CLC", // CLC – Clear Carry Flag
    0xFC:"CLD", // CLD – Clear Direction Flag
    0xFB:"CLI", // ClI - Clear Interrupt Flag
    0xF5:"CMC", // CMC – Complement Carry Flag
    0xA6:"", // CMPS/CMPSB/CMPSW/CMPSD 
    0xA7:"",
    0x99:"CWD", // CWD - Convert Word to Doubleword
    0x98:"CWDE", // CWDE – Convert Word to Doubleword
    0x27:"DAA", // DAA – Decimal Adjust AL after Addition
    0x2F:"DAS", // DAS – Decimal Adjust AL after Subtraction
    0xF4:"HLT",// HLT - Halt
    0x40:"INC AX", // INC AX or EAX if in 32 bit 0
    0x41:"INC CX", // INC CX or ECX if in 32 bit 1
    0x42:"INC DX", // INC DX or EDX if in 32 bit 2
    0x43:"INC BX", // INC BX or EBX if in 32 bit 3
    0x44:"INC SP", // INC SP or ESP if in 32 bit 4
    0x45:"INC BP", // INC BP or EBP if in 32 bit 4
    0x46:"INC SI", // INC SI or ESI if in 32 bit 4
    0x47:"INC DI", // INC DI or EDI if in 32 bit 4
    0x48:"DEC AX", // DEC AX or EAX if in 32 bit 0
    0x49:"DEC CX", // DEC CX or ECX if in 32 bit 1
    0x4A:"DEC DX", // DEC DX or EDX if in 32 bit 2
    0x4B:"DEC BX", // DEC BX or EBX if in 32 bit 3
    0x4C:"DEC SP", // DEC SP or ESP if in 32 bit 4
    0x4D:"DEC BP", // DEC BP or EBP if in 32 bit 5
    0x4E:"DEC SI", //  DEC SI or ESI if in 32 bit 6
    0x4F:"DEC DI", // DEC DI or EDI if in 32 bit 7
    0xEC:"IN", // IN – Input From Port w bit off
    0xED:"IN", // IN - Input From Port w bit on
    0x6C:"INS", // INS - input from DX port w bit off
    0x6D:"INS", // INS - Input from DX port w bit on
    0xCC:"INT", // INT – Single-Step Interrupt 3
    0xCE:"INTO", //  INTO – Interrupt 4 on Overflow
    0xCF:"IRET", // IRET/IRETD – Interrupt Return
    0x9F:"LAHF", // LAHF – Load Flags into AHRegister
    0xC9:"LEAVE", // Leave Procedure
    0xF0:"LOCK", // Lock Prefix
    0xAC:"LODS", // LODS/LODSB/LODSW/LODSD – Load String Operand
    0xAD:"LODS", // LODS/LODSB/LODSW/LODSD – Load String Operand
    0xA4:"MOVS",// MOVS/MOVSB/MOVSW/MOVSD – Move Data from String to String
    0xA5:"MOVS", // MOVS/MOVSB/MOVSW/MOVSD – Move Data from String to String
    0x90:"NOOP", // NOOP
    0xEE:"OUT", // OUT
    0xEF:"OUT", // OUT
    0x6E:"OUTS",// OUTS output to dx port
    0x6F:"OUTS",// OUTS output to dx port
    0x58:"POP AX",// POP - AX or EAX if in 32 bit 0
    0x59:"POP CX", // POP CX or ECX if in 32 bit 1
    0x5A:"POP DX", // POP DX or EDX if in 32 bit 2
    0x5B:"POP BX", // POP BX or EBX if in 32 bit 3
    0x5C:"POP SP", // POP SP or ESP if in 32 bit 4
    0x5D:"POP BP", // POP BP or EBP if in 32 bit 4
    0x5E:"POP SI", // POP SI or ESI if in 32 bit 4
    0x5F:"POP DI", // POP DI or EDI if in 32 bit 4
    0x07:"POP ES", // POP ES FRom the stack
    0x0F:"POP CS", // pop CS from the stack
    0x17:"POP SS", // pop SS from the stack
    0x1F:"POP DS", // pop DS from the stack
    0x61:"POPA",// POPA, POPAD pop all generatl registers
    0x9D:"POPF",// POPF, POPFS pop stack into flag register
    0x50:"PUSH AX",// POP - AX or EAX if in 32 bit 0
    0x51:"PUSH CX", // PUSH CX or ECX if in 32 bit 1
    0x52:"PUSH DX", // PUSH DX or EDX if in 32 bit 2
    0x53:"PUSH BX", // PUSH BX or EBX if in 32 bit 3
    0x54:"PUSH SP", // PUSH SP or ESP if in 32 bit 4
    0x55:"PUSH BP", // PUSH BP or EBP if in 32 bit 4
    0x56:"PUSH SI", // PUSH SI or ESI if in 32 bit 4
    0x57:"PUSH DI", // PUSH DI or EDI if in 32 bit 4
    0x06:"PUSH ES", // PUSH ES onto the stack
    0x0E:"PUSH CS",// PUSH CS onto the stack
    0x16:"PUSH SS",// PUSH SS onto the stack
    0x1E:"PUSH DS", // PUSH DS onto the stack
    0x60:"PUSHA", // PUSHA PUSHAD push all general registers onto the stack
    0x9C:"PUSHF", // PUSHD PUSHFD push all flags onto the stack
    0xC3:"RET", // RET same segment return
    0xCB:"RET", // RET different segment return
    0x9E:"SAHF", // SAHF – Store AH into Flags
    0xAA:"STOS", //  STOS/STOSB/STOSW/STOSD – Store String Data
    0xAB:"STOS", //  STOS/STOSB/STOSW/STOSD – Store String Data
    0xAE:"SCAS", // SCAS/SCASB/SCASW/SCASD –  – Scan String
    0xAF:"SCAS", // SCAS/SCASB/SCASW/SCASD –  – Scan String
    0xF9:"STC", // STC - Set Carry
    0xFD:"STD", // STD - Set Direction
    0xFB:"STI", // STI - Set Interrup

    0x9B:"WAIT",// WAIT
    0x99:"XCHG",// XCHG AX with AX
    0x91:"XCHG",// XCHG AX with CX
    0x92:"XCHG",// XCHG AX with DX
    0x93:"XCHG",// XCHG AX with BX
    0x94:"XCHG",// XCHG AX with"SP",
    0x95:"XCHG",// XCHG AX with"BP",
    0x96:"XCHG",// XCHG AX with"SI",
    0x97:"XCHG",// XCHG AX with"DI"
    0xD7:"XLAT",// XLAT or XLATB - lookup table
};

const two_byte_ops_64bitmode=
{

};

// first byte 0x0F
const two_byte_ops_n64bitmode=
{
    0x0F:{
        0x06:"CLTS",
        0xA2:"CPUID",
        0x08:"INVD",
        0x32:"RDMSR",
        0x33:"RDPMC",
        0x31:"RDTSC",
        0xAA:"RSM",
        0xFF:"UD1",
        0x09:"WBINVD",
        0x30:"WRMSR",
        mask10111001:"POP",
        mask10111000:"PUSH",
        mask11001111:"BSWAP",
    },
    0x10:{pneumonic:"MOV",secondByte:"ModRM"},
    0x11:{pneumonic:"MOV",secondByte:"ModRM"},
    0x62:{pneumonic:"ARPL",secondByte:"ModRM"},
    0x63:{pneumonic:"ARPL",secondByte:"ModRM"},
    0x8C:{pneumonic:"MOV",secondByte:"ModRM"},
    0x8D:{pneumonic:"LEA",secondByte:"ModRM"},
    0x8E:{pneumonic:"MOV",secondByte:"ModRM"},
    0x8F:{pneumonic:"POP",secondByte:"ModRM"},
    0x9A:{pneumonic:"CALL",secondByte:"Offset"},
    0xC2:{pneumonic:"RET",secondByte:"16bit displacement"},
    0xC4:{pneumonic:"LES",secondByte:"ModRM"},
    0xC5:{pneumonic:"LDS",secondByte:"ModRM"},
    0xCA:{pneumonic:"RET",secondByte:"16 bit displacement"},
    0xCD:{pneumonic:"INT",secondByte:"imm8"},
    0xD4:{pneumonic:"AAM",secondByte:"0x0A"},
    0xD5:{pneumonic:"AAD",secondByte:"0x0A"},
    0xE0:{pneumonic:"LOOPNZ",secondByte:"8 bit displacement"},
    0xE1:{pneumonic:"LOOPZ",secondByte:"8 bit displacement"},
    0xE2:{pneumonic:"LOOP",secondByte:"8 bit displacement"},
    0xE3:{pneumonic:"JCXZ",secondByte:"8 bit displacement"},
    0xE8:{pneumonic:"CALL",secondByte:"full displacement"},
    0xE9:{pneumonic:"JCXZ",secondByte:"full displacement"},
    0xEA:{pneumonic:"JMP",secondByte:"full offset"},
    0xEB:{pneumonic:"JCXZ",secondByte:"8 bit displacement"},
    0xF2:{pneumonic:"REPNE",secondByte:{0xA6:"CMPS",0xA7:"CMPS",0xAE:"SCAS",0xAF:"SCAS"}},
    0xF3:{pneumonic:"REP", secondByte:{0x6C:"INS0",0x6D:"INS1",0xAC:"LODS0",0xAD:"LODS1",0xA4:"MOVS0",0xA5:"MOVS1",0x6E:"OUTS0",0x6F:"OUTS1",0xAA:"STOS0",0xAB:"STOS1",0xA6:"CMPS0",0xA7:"COMS1",0xAE:"SCAS0",0xAF:"SCAS1"}},
    0xFF:{
        0xD0:"CALL",
        0xE0:"JCXZ",
        0xF0:"PUSH",
        mask010:"CALL",
        mask011:"CALL",
        mask100:"JCXZ",
        mask101:"JMP",
        mask110:"PUSH",
    }
};



// first byte 0x0F,0x38 or 0x0F,0x3A 
const three_byte_ops_n64bitmode={


};

const REX = {
    prefix:0x4,
    W:0x8,
    R:0x4,
    X:0x2,
    B:0x1
};

const test_code=[
    0x0e, // 0x00 push CS - should be address 0x0100 for com file
    0x1F, // 0x01 POP DS
    0xBA, // 0x02 MOV DX,[msg]
    0x0F, // 0x03 0x10E
    0x01, // 0x04 
    0xB4, // 0x05 MOV AX,09
    0x09, // 0x06
    0xCD, // 0x07 INT 21
    0x21, // 0x08 
    0xB8, // 0x09 MOV AX,0x4C01
    0x01, // 0x0A
    0x4C, // 0x0B
    0xCD, // 0x0C INT 21
    0x21, // 0x0D
    0xF4, // 0x0E Halt
    0x48, // 0x0F 'H' - 0x010E is the message location of Data Segment
    0x65, // 0x10 'e'
    0x6C, // 0x11 'l'
    0x6C, // 0x12 'l'
    0x6F, // 0x13 'o'
    0x20, // 0x14 ' '
    0x57, // 0x15 'W'
    0x6F, // 0x16 'o'
    0x72, // 0x17 'r'
    0x6C, // 0x18 'l'
    0x64, // 0x19 'd'
    0x21, // 0x1A '!'
    0x21, // 0x1B '!'
    0x0D, // 0x1C '\n'
    0x0D, // 0x1D '\n'
    0x0A, // 0x1E '\r'
    0x24 // 0x1F '$' 
];

const dissassembler = (function(){

    return {
        lockPrefix:false,
        repeatNEPrefix:false,
        repeatPrefix:false,
        operandPrefix:false, // size of operand
        addressPrefix:false, // size of address
        CSOverridePrefix:false,
        SSOverridePrefix:false,
        DSOverridePrefix:false,
        ESOverridePrefix:false,
        FSOverridePreficx:false,
        GSOverridePrefix:false,
        rexSpecified:false,
        Rex:{W:0,R:0,X:0,B:0},
        Vex:{R:0,X:0,B:0,mmm:0,W:0,vvvv:0,L:0,pp:0,leading:[],DestReg:"",GenPReg:"",VectorLength:0,prefixCode:0},
        EVex:{R:0,X:0,B:0,R1:0,mmm:0,W:0,vvvv:0,pp:0,z:0,L1:0,L:0,b:0,V1:0,aaa:0},
        
        clearFlags:function()
        {
            this.lockPrefix=false;
            this.repeatNEPrefix=false;
            this.repeatPrefix=false;
            this.operandPrefix=false; // size of operand
            this.addressPrefix=false; // size of address
            this.CSOverridePrefix=false;
            this.SSOverridePrefix=false;
            this.DSOverridePrefix=false;
            this.ESOverridePrefix=false;
            this.FSOverridePrefix=false;
            this.GSOverridePrefix=false;
            this.rexSpecified=false;
            this.Rex = {W : 0,R: 0,X: 0,B: 0};
            this.Vex = {R:0,X:0,B:0,mmm:0,W:0,vvvv:0,L:0,pp:0,leading:[],DestReg:"",GenPReg:"",VectorLength:0,prefixCode:0};
            this.EVex ={R:0,X:0,B:0,R1:0,mmm:0,W:0,vvvv:0,pp:0,z:0,L1:0,L:0,b:0,V1:0,aaa:0};
        },
        checkPrefix:function(buffer,index,is_x86_64)
        {
            while(true)
            {
                if(!this.findPrefix(buffer,index,is_x86_64))
                {
                    break;
                }
                else
                {
                    if(buffer[index]== 0xF0)
                    {
                        this.lockPrefix=true;
                    }
                    else if ( buffer[index] == 0xF2)
                    {
                        this.repeatNEPrefix = true;
                    }
                    else if (buffer[index] == 0xF3)
                    {
                        this.repeatPrefix = true;
                    }
                    else if (buffer[index] == 0x2E)
                    {
                        this.CSOverridePrefix = true;
                    }
                    else if ( buffer[index] == 0x36)
                    {
                        this.SSOverridePrefix = true;
                    }
                    else if ( buffer[index] == 0x3E)
                    {
                        this.DSOverridePrefix = true;
                    }
                    else if ( buffer[index] == 0x26)
                    {
                        this.ESOverridePrefix= true;
                    }
                    else if ( buffer[index] == 0x64)
                    {
                        this.FSOverridePrefix= true;
                    }
                    else if ( buffer[index] == 0x65)
                    {
                        this.GSOverridePrefix = true;
                    }
                    else if ( buffer[index] == 0x66)
                    {
                        this.operandPrefix = true;
                    }
                    else if ( buffer[index] == 0x67)
                    {
                        this.addressPrefix = true;
                    }
                }
                index++;
                if(index>=buffer.length-1)
                {
                    break;
                }
            }
            return index;
        },
        checkRex:function(buffer,index,is_x86_64)
        {
            if(is_x86_64 && highByte==4 && lowByte>=8)
            {
                this.Rex.W = (buffer[i]&0x08)>>3;
                this.Rex.R = (buffer[i]&0x04)>>2;
                this.Rex.X = (buffer[i]&0x02)>>1;
                this.Rex.B = (buffer[i]&0x01);
                this.rexSpecified = true;
                index++;
            }
            return index;
        },
        checkVex:function(buffer,index,highByte,lowByte,is_x86_64)
        {
            if(highByte == 0x0C && lowByte==0x05)
            {
                index++;
                // Vex
                if(this.operandPrefix)
                {
                     throw Error(["Invalid Vex:[",index,"] Operand Prefix"].join(""));

                }
                else if ( this.rexSpecified)
                {
                    throw Error(["Invalid Vex:[",index,"] Rex Prefix"].join(""));
                    // #UD - undefined 
                }
                else if ( this.lockPrefix)
                {
                    // #UD - undefined
                    throw Error(["Invalid Vex:[",index,"] Lock Prefix"].join(""));
                }
                else if (  this.repeatNEPrefix )
                {
                    throw Error(["Invalid Vex:[",index,"] Repeat NE Prefix"].join(""));
                    // #UD - undefined
                }
                else if (this.repeatPrefix)
                {
                    throw Error(["Invalid Vex:[",index,"] Repeat Prefix"].join(""));
                    // #UD - undefined
                }
                if(buffer[index]==0xC4) // 3 byte Vex
                {
                    index++;
                    Vex.R = (buffer[index] & 0x80)>>7;
                    Vex.X = (buffer[index]&0x40)>>6;
                    if(R == 1 && !is_x86_64)
                    {
                        // ok
                    }
                    else if ( Vex.X == 1 && is_x86_64)
                    {
                        // ok
                    }
                    else
                    {
                        console.log("Invalid Vex");
                    }
                    Vex.B = (buffer[index]&0x20)>>5;
                    Vex.mmm = buffer[index]&0x1F;
                    if(Vex.mmm == 0x00)
                    {
                        // #UD
                    }
                    else if ( Vex.mmm == 0x01)
                    {
                        Vex.leading = [0x0f];
                    }
                    else if (Vex.mmm == 0x02)
                    {
                        Vex.leading = [0x0f,0x38];
                    }
                    else if (Vex.mmm == 0x03)
                    {
                        Vex.leading = [0x0f,0x3A];
                    }
                    else 
                    {
                        // #UD
                    }
                    index++;
                    Vex.W = (buffer[index]&0x80)>>7;
                    Vex.vvvv = (buffer[index]&0x78)>>6;
                    if ( Vex.vvvv == 0x0 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM15/YMM15";
                        Vex.GenPReg = "R15/R15D";
                    }
                    else if ( Vex.vvvv == 0x1 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM14/YMM14";
                        Vex.GenPReg = "R14/R14D";
                    }
                    else if ( Vex.vvvv == 0x2 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM13/YMM13";
                        Vex.GenPReg = "R13/R13D";
                    }
                    else if ( Vex.vvvv == 0x3 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM12/YMM12";
                        Vex.GenPReg = "R12/R12D";
                    }
                    else if ( Vex.vvvv == 0x4 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM11/YMM11";
                        Vex.GenPReg = "R11/R11D";
                    }
                    else if ( Vex.vvvv == 0x5 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM10/YMM10";
                        Vex.GenPReg = "R10/R10D";
                    }
                    else if ( Vex.vvvv == 0x6 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM9/YMM9";
                        Vex.GenPReg = "R9/R9D";
                    }
                    else if ( Vex.vvvv == 0x7 && is_x86_64  )
                    {
                        Vex.DestReg = "XMM8/YMM8";
                        Vex.GenPReg = "R8/R8D";
                    }
                    else if ( Vex.vvvv == 0x8 )
                    {
                        Vex.DestReg = "XMM7/YMM7";
                        Vex.GenPReg = "RDI/EDI";
                    }
                    else if ( Vex.vvvv == 0x9 )
                    {
                        Vex.DestReg = "XMM6/YMM6";
                        Vex.GenPReg = "RSI/ESI";
                    }
                    else if ( Vex.vvvv == 0xA )
                    {
                        Vex.DestReg = "XMM5/YMM5";
                        Vex.GenPReg = "RBP/EBP";
                    }
                    else if ( Vex.vvvv == 0xB )
                    {
                        Vex.DestReg = "XMM4/YMM4";
                        Vex.GenPReg = "RSP/ESP";
                    }
                    else if ( Vex.vvvv == 0xC )
                    {
                        Vex.DestReg = "XMM3/YMM3";
                        Vex.GenPReg = "RBX/EBX";
                    }
                    else if ( Vex.vvvv == 0xD )
                    {
                        Vex.DestReg = "XMM2/YMM2";
                        Vex.GenPReg = "RDX/EDX";
                    }
                    else if ( Vex.vvvv == 0xE )
                    {
                        Vex.DestReg = "XMM1/YMM1";
                        Vex.GenPReg = "RCX/ECX";
                    }
                    else if ( Vex.vvvv == 0xF )
                    {
                        Vex.DestReg = "XMM0/YMM0";
                        Vex.GenPReg = "RAX/EAX";
                    }
                    Vex.L = (buffer[index]&0x04)>>2;
                    if(Vex.L == 0 )
                    {
                        Vex.VectorLength = 128;
                    }
                    else
                    {
                        Vex.VectorLength = 256;
                    }
                    Vex.pp = (buffer[index]&0x3);
                    if(Vex.pp == 0x00)
                    {
                        Vex.prefixCode = 0x00;
                    }
                    else if ( Vex.pp == 0x01)
                    {
                        Vex.prefixCode = 0x66;
                    }
                    else if ( Vex.pp == 0x02)
                    {
                        Vex.prefixCode = 0xF3;
                    }
                    else if ( Vex.pp == 0x03)
                    {
                        Vex.prefixCode = 0xF2;
                    }
                    index++;
                }
                else if (buffer[index] == 0xC5) // 2 byte Vex
                {
                    index++;
                    Vex.leading = [0x0f];
                    Vex.R = (buffer[index] & 0x80)>>7;
                    Vex.vvvv = (buffer[index]&0x78)>>6;
                    Vex.L = (buffer[index]&0x04)>>2;
                    if(Vex.L == 0 )
                    {
                        Vex.VectorLength = 128;
                    }
                    else
                    {
                        Vex.VectorLength = 256;
                    }
                    Vex.pp = (buffer[i]&0x3);
                    if(Vex.pp == 0x00)
                    {
                        Vex.prefixCode = 0x00;
                    }
                    else if ( Vex.pp == 0x01)
                    {
                        Vex.prefixCode = 0x66;
                    }
                    else if ( Vex.pp == 0x02)
                    {
                        Vex.prefixCode = 0xF3;
                    }
                    else if ( Vex.pp == 0x03)
                    {
                        Vex.prefixCode = 0xF2;
                    }
                    index++;
                }
                else
                {
                    // Not VEX
                }
            }
            return index;
        },
        checkEvex:function(buffer,index,highByte,lowByte,is_x86_64)
        {
            if(highByte == 0x06 && lowByte==0x02)
            {
                // Evex
                index++;
                if((buffer[index]&0x08)==0)
                {
                    this.EVex.R = (buffer[index] &0x80)>>7;
                    this.EVex.X = (buffer[index] & 0x40)>>6;
                    this.EVex.B = (buffer[index] & 0x20)>>5;
                    this.EVex.R1 = (buffer[index] & 0x10)>>4;
                    this.EVex.mmm = (buffer[index] & 0x7);
                    index++;
                    if((buffer[index]&0x04)==0x04)
                    {
                        this.EVex.W = (buffer[index]&0x80)>>7;
                        this.EVex.vvvv = (buffer[index]&0x78)>>3;
                        this.EVex.pp = (buffer[index]&0x3);
                        index++;
                        this.EVex.z = (buffer[index]&0x80)>>7;
                        this.EVex.L1 = (butter[index]&0x40)>>6;
                        this.EVex.L = (butter[index]&0x20)>>5;
                        this.EVex.b = (butter[index]&0x10)>>4;
                        this.EVex.V1 = (butter[index]&0x08)>>3;
                        this.EVex.aaa = (butter[index]&0x07);
                        index++;
                    }
                    else
                    {
                        throw Error(["Invalid Evex:[",index,"] Second Reserved not 1"].join(""));
                    }
                }else{
                    throw Error(["Invalid Evex:[",index,"] First Reserved not 0"].join(""));
                }
            }
            return index;
        },
        findPrefix:function(buffer,index,is_x86_64)
        {
            var prefixIndex=0;
            for(prefixIndex=0;prefixIndex<prefixBytes;prefixIndex++)
            {
                if(prefixBytes[prefixIndex] == buffer[index])
                {
                    return true;
                }
            }
            return false;
        },
        dissassemble:function(buffer,is_32,is_x86_64){
            var index=0;
            for(index =0; index<buffer.length;index++)
            {
                this.clearFlags();
                index = this.checkPrefix(buffer,index,is_x86_64);
                
                // Rex
                var highByte = (buffer[index]>>4) & 0x0F;
                var lowByte = (buffer[index]&0x0F);
                var reg = 0x00;
                var sreg2 = 0x00;
                var sreg3 = 0x00;
                
                var op1 = "NOP";
                var op2 = "NOP";
                var op3 = "NOP";
                var op4 = "NOP";
                var imm8=0x00;
                var imm16 = 0x00;
                var imm32 = 0x00;

                index = this.checkRex(buffer,index,is_x86_64);

                index = this.checkVex(buffer,index,highByte,lowByte,is_x86_64);
                
                index = this.checkEvex(buffer,index,highByte,lowByte,is_x86_64);

                
                
                if(is_x86_64)
                {
                    if(buffer[index] == 0x0F) // 2 or 3
                    {
                        i++;
                    }
                    else
                    {
                        if((buffer[index]>>4)==0x07)
                        {
                            // ttt
                        }
                        else if(one_byte_ops_64bitmode.hasOwnProperty(buffer[index]))
                        {
                            console.log("Opcode:",index,":",one_byte_ops_64bitmode[buffer[index]]);
                        }
                        else if(two_byte_ops_64bitmode.hasOwnProperty(buffer[i]))
                        {
                            console.log("Opcode:",index,":",two_byte_ops_64bitmode[buffer[index]]);
                        }
                        else
                        {
                            console.log("Unrecognized opcode[",buffer[index],"]");
                        }
                    }
                }
                else
                {
                    if(buffer[index] == 0x0F) // 2 or 3
                    {
                        i++;
                    }
                    else
                    {
                        if(highByte<0x02 && (lowByte&0x7)==0x7|| highByte<2 &&(lowByte&0x06)==0x06) // sreg
                        {
                            if ((lowByte&0x7)==0x7 ) // POP
                            {
                                op1 = "POP";
                            }
                            else if ( (lowByte&0x06)==0x06) // PUSH
                            {
                                op1 = "PUSH";
                            }
                            else
                            {
                                console.log("Invalid Code");
                            }
                            sreg2 = (buffer[index]&0x18)>>3;
                            if(CONST_sreg2.hasOwnProperty(sreg2))
                            {
                                console.log("Opcode:",index," ",op1,CONST_sreg2[sreg2]);
                            } 
                            else
                            {
                                console.log("Invalid");
                            }
                        }
                        else if(highByte==0x00)
                        {
                            console.log("Got Here");
                        }
                        else if (
                                (highByte==0x04 && (lowByte&0x08) == 0x08)|| // DEC
                                (highByte==0x04 && (lowByte&0x08) == 0x0)|| // INC
                                (highByte==0x09 && (lowByte&0x08)==0x0)|| // XCHG 
                                (highByte==0x0B) || // MOV
                                (highByte==0x05 && (lowByte&0x08)==0x08)||//POP
                                (highByte == 0x05 && (lowByte&0x08)==0x00)// PUSH
                        ) // reg
                        {
                            if(highByte==0x04 && (lowByte&0x08) == 0x08)// DEC
                            {
                                op1 = "DEC";
                                
                            }
                            else if(highByte==0x04 && (lowByte&0x08) == 0x0) // INC
                            {
                                op1 = "INC";
                            }
                            else if (highByte==0x09 && (lowByte&0x08)==0x0) // XCHG 
                            {
                                op1 = "XCHG";
                            }
                            else if ( highByte==0x0B) //MOV
                            {
                                op1 = "MOV";
                            }
                            else if(highByte==0x05 && (lowByte&0x08)==0x08)//POP
                            {
                                op1 = "POP";
                            }
                            else if(highByte == 0x05 && (lowByte&0x08)==0x00)// PUSH)
                            {
                                op1 = "PUSH";
                            }
                            if(op1!="MOV")
                            {
                                reg = (buffer[index]&0x07);
                                if(CONST_no_w_reg_16.hasOwnProperty(reg))
                                {
                                    console.log("Opcode:",index," ",op1,CONST_no_w_reg_16[reg]);
                                }
                                else
                                {
                                    console.log("Invalid");
                                }
                            }
                            else
                            {
                                reg = (buffer[index]&0x07);
                                if((buffer[index]&0x08)==0x08)
                                {
                                    index++;
                                    if(CONST_w_1_16_reg.hasOwnProperty(reg))
                                    {
                                        imm16 = (buffer[index])+(buffer[index+1]<<8);
                                        console.log("Opcode:",index," ",op1,CONST_w_1_16_reg[reg],"[",imm16.toString(16),"]");
                                        index++;
                                    }
                                    else
                                    {
                                        console.log("Invalid");
                                    }
                                }
                                else
                                {
                                    index++;
                                    if(CONST_w_0_16_reg.hasOwnProperty(reg))
                                    {
                                        imm8 = buffer[index];
                                        console.log("Opcode:",index," ",op1,CONST_w_0_16_reg[reg], " [",imm8.toString(16),"]");
                                    }
                                    else
                                    {
                                        console.log("Invalid");
                                    }
                                }
                            }
                        }
                        else if(one_byte_ops_n64bitmode.hasOwnProperty(buffer[index]))
                        {
                            console.log("Opcode:",index,":",one_byte_ops_n64bitmode[buffer[index]]);
                            if(one_byte_ops_n64bitmode[buffer[index]]=="HLT")
                            {
                                break;
                            }
                        }
                        else if(two_byte_ops_n64bitmode.hasOwnProperty(buffer[index]))
                        {
                            two_byte_opt = two_byte_ops_n64bitmode[buffer[index]];
                            if(two_byte_opt.hasOwnProperty("pneumonic"))
                            {
                                
                                switch(two_byte_opt["secondByte"])
                                {
                                    case "imm8":
                                        index++;
                                        imm8 = buffer[index].toString(16);
                                    break;
                                }
                                console.log("Opcode:",index,":",two_byte_opt["pneumonic"]," ",imm8);
                            }
                            else
                            {
                                
                                console.log("Opcode:",index,":",two_byte_ops_n64bitmode[buffer[index]]);
                            }
                            
                        }
                        else
                        {
                            console.log("Unrecognized opcode[0x"+buffer[index].toString("16")+"]");
                        }
                    }
                }
            }

        }
    };
})();

/*var d = dissassembler;
d.dissassemble(test_code,false,false);*/

module.exports = dissassembler;
