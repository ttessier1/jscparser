const parser = require('./cparser');
test('test skipBlanks with no leading spaces', () => {
  const result = (() => {
    parser.setFile("a","main.c");
	parser.skipBlanks(false);
	return parser.currentCharacter;
  })();
  expect(result).toBe("a");
});

test('test skipBlanks with leeding spaces', () => {
  const result = (() => {
    parser.setFile("    a","main.c");
	parser.skipBlanks(false);
	return parser.currentCharacter;
  })();
  expect(result).toBe("a");
});

test('test skipBlanks with carriage return line feed', () => {
  const result = (() => {
    parser.setFile("\r\n\r\na","main.c");
	parser.skipBlanks(false);
	return parser.currentCharacter;
  })();
  expect(result).toBe("a");
});

test('test lookAhead', () => {
	const result = (() => {
		parser.setFile("#if\n","main.c");
		return parser.lookAhead("#if");
	})();
	expect(result).toBe(true);
});

test('test consume', () => {
	const result = (() => {
		parser.setFile("#if 1","main.c");
		parser.consume("#if");
		parser.skipBlanks();
		return parser.currentCharacter;
	})();
	expect(result).toBe("1");
});

test('test skipSpaces with no space',() => {
	const result = (() => {
		parser.setFile("12","main.c");
		parser.next();
		parser.skipSpaces();
		return parser.currentCharacter;
	})();
	expect(result).toBe("2");
});

test('test skipSpaces keepSpaces set to true with space',() => {
	const result = (() => {
		parser.setFile("1  2","main.c");
		parser.next(true);
		parser.skipSpaces(true);
		return parser.currentCharacter;
	})();
	expect(result).toBe(" ");
});

test('test skipSpaces keepSpaces set to false with space',() => {
	const result = (() => {
		parser.setFile("1  2","main.c");
		parser.next(false);
		parser.skipSpaces(false);
		return parser.currentCharacter;
	})();
	expect(result).toBe("2");
});

test('test parseNumber 32bit binary 0',() => {
	const result = (() => {
		parser.setFile("0b00000000000000000000000000000000");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "int8_t","numberType": "base2Integer","value": 0});
});

test('test parseNumber 32 bit binary 1',() => {
	const result = (() => {
		parser.setFile("0b11111111111111111111111111111111");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "uint32_t","numberType": "base2Integer","value": 4294967295});
});

test('test parseNumber 32bit octal 0',() => {
	const result = (() => {
		parser.setFile("00");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "int8_t","numberType": "base8Integer","value": 0});
});

test('test parseNumber 32 bit octal 0123',() => {
	const result = (() => {
		parser.setFile("0123");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "uint8_t","numberType": "base8Integer","value": 83});
});

test('test parseNumber 32bit hex 0',() => {
	const result = (() => {
		parser.setFile("0x00000000");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "int8_t","numberType": "base16Integer","value": 0});
});

test('test parseNumber 32 bit hex 0xFEDCBA98',() => {
	const result = (() => {
		parser.setFile("0xFEDCBA98");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "uint32_t","numberType": "base16Integer","value": 4275878552});
});

test('test parseNumber 32bit dec 0',() => {
	const result = (() => {
		parser.setFile("0");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "int8_t","numberType": "base10Integer","value": 0});
});

test('test parseNumber 32 bit dec 987654321',() => {
	const result = (() => {
		parser.setFile("987654321");
		return parser.readNumber();
	})();
	expect(result).toStrictEqual({"minRepresentable": "int32_t","numberType": "base10Integer","value": 987654321});
});

test('test parseString "test\\a\\b\\r\\n\\t"',() =>{
	const result = (() => {
		parser.setFile("\"test\\a\\b\\r\\n\\t\"","main.c");
		return parser.readString();
	})();
	expect(result).toStrictEqual("test\a\b\r\n\t");
});

test('test returnString "test\\a\\b\\r\\n\\t"',() =>{
	const result = (() => {
		return parser.returnString("test\a\b\r\n\t");
	})();
	expect(result).toStrictEqual("test\\a\\b\\r\\n\\t");
});

test('test parsing enumeration enum e_one{one_value};',() =>{
	const result = (() => {
		parser.setFile("enum e_one{one_value};","main.c");
		return parser.internalParse();
	})();
	expect(result).toStrictEqual([{"member": ["one_value"], "name": "e_one", "pos": 0, "type": "EnumDefinition"}]);
});

test('test parsing enumeration enum e_two{one_value};',() =>{
	const result = (() => {
		var stringContent="enum e_two{e1_v,e2_v,e3_v,e4_v,e5_v,e6_v,e7_v,e8_v,e9_v,\n";
		stringContent += "e10_v,e11_v,e12_v,e13_v,e14_v,e15_v,e16_v,e17_v,e18_v,e19_v,\n";
		stringContent += "e20_v,e21_v,e22_v,e23_v,e24_v,e25_v,e26_v,e27_v,e28_v,e29_v,\n";
		stringContent += "e30_v,e31_v,e32_v,e33_v,e34_v,e35_v,e36_v,e37_v,e38_v,e39_v,\n";
		stringContent += "e40_v,e41_v,e42_v,e43_v,e44_v,e45_v,e46_v,e47_v,e48_v,e49_v,\n";
		stringContent += "e50_v,e51_v,e52_v,e53_v,e54_v,e55_v,e56_v,e57_v,e58_v,e59_v,\n";
		stringContent += "e60_v,e61_v,e62_v,e63_v,e64_v,e65_v,e66_v,e67_v,e68_v,e69_v,\n";
		stringContent += "e70_v,e71_v,e72_v,e73_v,e74_v,e75_v,e76_v,e77_v,e78_v,e79_v,\n";
		stringContent += "e80_v,e81_v,e82_v,e83_v,e84_v,e85_v,e86_v,e87_v,e88_v,e89_v,\n";
		stringContent += "e90_v,e91_v,e92_v,e93_v,e94_v,e95_v,e96_v,e97_v,e98_v,e99_v,\n";
		stringContent += "e100_v,e101_v,e102_v,e103_v,e104_v,e105_v,e106_v,e107_v,e108_v,e109_v,\n";
		stringContent += "e110_v,e111_v,e112_v,e113_v,e114_v,e115_v,e116_v,e117_v,e118_v,e119_v,\n";
		stringContent += "e120_v,e121_v,e122_v,e123_v,e124_v,e125_v,e126_v,e127_v,e128_v,e129_v,\n";
		stringContent += "e130_v,e131_v,e132_v,e133_v,e134_v,e135_v,e136_v,e137_v,e138_v,e139_v,\n";
		stringContent += "e140_v,e141_v,e142_v,e143_v,e144_v,e145_v,e146_v,e147_v,e148_v,e149_v,\n";
		stringContent += "e150_v,e151_v,e152_v,e153_v,e154_v,e155_v,e156_v,e157_v,e158_v,e159_v,\n";
		stringContent += "e160_v,e161_v,e162_v,e163_v,e164_v,e165_v,e166_v,e167_v,e168_v,e169_v,\n";
		stringContent += "e170_v,e171_v,e172_v,e173_v,e174_v,e175_v,e176_v,e177_v,e178_v,e179_v,\n";
		stringContent += "e180_v,e181_v,e182_v,e183_v,e184_v,e185_v,e186_v,e187_v,e188_v,e189_v,\n";
		stringContent += "e190_v,e191_v,e192_v,e193_v,e194_v,e195_v,e196_v,e197_v,e198_v,e199_v,\n";
		stringContent += "e200_v,e201_v,e202_v,e203_v,e204_v,e205_v,e206_v,e207_v,e208_v,e209_v,\n";
		stringContent += "e210_v,e211_v,e212_v,e213_v,e214_v,e215_v,e216_v,e217_v,e218_v,e219_v,\n";
		stringContent += "e220_v,e221_v,e222_v,e223_v,e224_v,e225_v,e226_v,e227_v,e228_v,e229_v,\n";
		stringContent += "e230_v,e231_v,e232_v,e233_v,e234_v,e235_v,e236_v,e237_v,e238_v,e239_v,\n";
		stringContent += "e240_v,e241_v,e242_v,e243_v,e244_v,e245_v,e246_v,e247_v,e248_v,e249_v,\n";
		stringContent += "e250_v,e251_v,e252_v,e253_v,e254_v,e255_v,e256_v,e257_v,e258_v,e259_v,\n";
		stringContent += "e260_v,e261_v,e262_v,e263_v,e264_v,e265_v,e266_v,e267_v,e268_v,e269_v,\n";
		stringContent += "e270_v,e271_v,e272_v,e273_v,e274_v,e275_v,e276_v,e277_v,e278_v,e279_v,\n";
		stringContent += "e280_v,e281_v,e282_v,e283_v,e284_v,e285_v,e286_v,e287_v,e288_v,e289_v,\n";
		stringContent += "e290_v,e291_v,e292_v,e293_v,e294_v,e295_v,e296_v,e297_v,e298_v,e299_v,\n";
		stringContent += "e300_v,e301_v,e302_v,e303_v,e304_v,e305_v,e306_v,e307_v,e308_v,e309_v,\n";
		stringContent += "e310_v,e311_v,e312_v,e313_v,e314_v,e315_v,e316_v,e317_v,e318_v,e319_v,\n";
		stringContent += "e320_v,e321_v,e322_v,e323_v,e324_v,e325_v,e326_v,e327_v,e328_v,e329_v,\n";
		stringContent += "e330_v,e331_v,e332_v,e333_v,e334_v,e335_v,e336_v,e337_v,e338_v,e339_v,\n";
		stringContent += "e340_v,e341_v,e342_v,e343_v,e344_v,e345_v,e346_v,e347_v,e348_v,e349_v,\n";
		stringContent += "e350_v,e351_v,e352_v,e353_v,e354_v,e355_v,e356_v,e357_v,e358_v,e359_v,\n";
		stringContent += "e360_v,e361_v,e362_v,e363_v,e364_v,e365_v,e366_v,e367_v,e368_v,e369_v,\n";
		stringContent += "e370_v,e371_v,e372_v,e373_v,e374_v,e375_v,e376_v,e377_v,e378_v,e379_v,\n";
		stringContent += "e380_v,e381_v,e382_v,e383_v,e384_v,e385_v,e386_v,e387_v,e388_v,e389_v,\n";
		stringContent += "e390_v,e391_v,e392_v,e393_v,e394_v,e395_v,e396_v,e397_v,e398_v,e399_v,\n";
		stringContent += "e400_v,e401_v,e402_v,e403_v,e404_v,e405_v,e406_v,e407_v,e408_v,e409_v,\n";
		stringContent += "e410_v,e411_v,e412_v,e413_v,e414_v,e415_v,e416_v,e417_v,e418_v,e419_v,\n";
		stringContent += "e420_v,e421_v,e422_v,e423_v,e424_v,e425_v,e426_v,e427_v,e428_v,e429_v,\n";
		stringContent += "e430_v,e431_v,e432_v,e433_v,e434_v,e435_v,e436_v,e437_v,e438_v,e439_v,\n";
		stringContent += "e440_v,e441_v,e442_v,e443_v,e444_v,e445_v,e446_v,e447_v,e448_v,e449_v,\n";
		stringContent += "e450_v,e451_v,e452_v,e453_v,e454_v,e455_v,e456_v,e457_v,e458_v,e459_v,\n";
		stringContent += "e460_v,e461_v,e462_v,e463_v,e464_v,e465_v,e466_v,e467_v,e468_v,e469_v,\n";
		stringContent += "e470_v,e471_v,e472_v,e473_v,e474_v,e475_v,e476_v,e477_v,e478_v,e479_v,\n";
		stringContent += "e480_v,e481_v,e482_v,e483_v,e484_v,e485_v,e486_v,e487_v,e488_v,e489_v,\n";
		stringContent += "e490_v,e491_v,e492_v,e493_v,e494_v,e495_v,e496_v,e497_v,e498_v,e499_v,\n";
		stringContent += "e500_v,e501_v,e502_v,e503_v,e504_v,e505_v,e506_v,e507_v,e508_v,e509_v,\n";
		stringContent += "e510_v,e511_v,e512_v,e513_v,e514_v,e515_v,e516_v,e517_v,e518_v,e519_v,\n";
		stringContent += "e520_v,e521_v,e522_v,e523_v,e524_v,e525_v,e526_v,e527_v,e528_v,e529_v,\n";
		stringContent += "e530_v,e531_v,e532_v,e533_v,e534_v,e535_v,e536_v,e537_v,e538_v,e539_v,\n";
		stringContent += "e540_v,e541_v,e542_v,e543_v,e544_v,e545_v,e546_v,e547_v,e548_v,e549_v,\n";
		stringContent += "e550_v,e551_v,e552_v,e553_v,e554_v,e555_v,e556_v,e557_v,e558_v,e559_v,\n";
		stringContent += "e560_v,e561_v,e562_v,e563_v,e564_v,e565_v,e566_v,e567_v,e568_v,e569_v,\n";
		stringContent += "e570_v,e571_v,e572_v,e573_v,e574_v,e575_v,e576_v,e577_v,e578_v,e579_v,\n";
		stringContent += "e580_v,e581_v,e582_v,e583_v,e584_v,e585_v,e586_v,e587_v,e588_v,e589_v,\n";
		stringContent += "e590_v,e591_v,e592_v,e593_v,e594_v,e595_v,e596_v,e597_v,e598_v,e599_v,\n";
		stringContent += "e600_v,e601_v,e602_v,e603_v,e604_v,e605_v,e606_v,e607_v,e608_v,e609_v,\n";
		stringContent += "e610_v,e611_v,e612_v,e613_v,e614_v,e615_v,e616_v,e617_v,e618_v,e619_v,\n";
		stringContent += "e620_v,e621_v,e622_v,e623_v,e624_v,e625_v,e626_v,e627_v,e628_v,e629_v,\n";
		stringContent += "e630_v,e631_v,e632_v,e633_v,e634_v,e635_v,e636_v,e637_v,e638_v,e639_v,\n";
		stringContent += "e640_v,e641_v,e642_v,e643_v,e644_v,e645_v,e646_v,e647_v,e648_v,e649_v,\n";
		stringContent += "e650_v,e651_v,e652_v,e653_v,e654_v,e655_v,e656_v,e657_v,e658_v,e659_v,\n";
		stringContent += "e660_v,e661_v,e662_v,e663_v,e664_v,e665_v,e666_v,e667_v,e668_v,e669_v,\n";
		stringContent += "e670_v,e671_v,e672_v,e673_v,e674_v,e675_v,e676_v,e677_v,e678_v,e679_v,\n";
		stringContent += "e680_v,e681_v,e682_v,e683_v,e684_v,e685_v,e686_v,e687_v,e688_v,e689_v,\n";
		stringContent += "e690_v,e691_v,e692_v,e693_v,e694_v,e695_v,e696_v,e697_v,e698_v,e699_v,\n";
		stringContent += "e700_v,e701_v,e702_v,e703_v,e704_v,e705_v,e706_v,e707_v,e708_v,e709_v,\n";
		stringContent += "e710_v,e711_v,e712_v,e713_v,e714_v,e715_v,e716_v,e717_v,e718_v,e719_v,\n";
		stringContent += "e720_v,e721_v,e722_v,e723_v,e724_v,e725_v,e726_v,e727_v,e728_v,e729_v,\n";
		stringContent += "e730_v,e731_v,e732_v,e733_v,e734_v,e735_v,e736_v,e737_v,e738_v,e739_v,\n";
		stringContent += "e740_v,e741_v,e742_v,e743_v,e744_v,e745_v,e746_v,e747_v,e748_v,e749_v,\n";
		stringContent += "e750_v,e751_v,e752_v,e753_v,e754_v,e755_v,e756_v,e757_v,e758_v,e759_v,\n";
		stringContent += "e760_v,e761_v,e762_v,e763_v,e764_v,e765_v,e766_v,e767_v,e768_v,e769_v,\n";
		stringContent += "e770_v,e771_v,e772_v,e773_v,e774_v,e775_v,e776_v,e777_v,e778_v,e779_v,\n";
		stringContent += "e780_v,e781_v,e782_v,e783_v,e784_v,e785_v,e786_v,e787_v,e788_v,e789_v,\n";
		stringContent += "e790_v,e791_v,e792_v,e793_v,e794_v,e795_v,e796_v,e797_v,e798_v,e799_v,\n";
		stringContent += "e800_v,e801_v,e802_v,e803_v,e804_v,e805_v,e806_v,e807_v,e808_v,e809_v,\n";
		stringContent += "e810_v,e811_v,e812_v,e813_v,e814_v,e815_v,e816_v,e817_v,e818_v,e819_v,\n";
		stringContent += "e820_v,e821_v,e822_v,e823_v,e824_v,e825_v,e826_v,e827_v,e828_v,e829_v,\n";
		stringContent += "e830_v,e831_v,e832_v,e833_v,e834_v,e835_v,e836_v,e837_v,e838_v,e839_v,\n";
		stringContent += "e840_v,e841_v,e842_v,e843_v,e844_v,e845_v,e846_v,e847_v,e848_v,e849_v,\n";
		stringContent += "e850_v,e851_v,e852_v,e853_v,e854_v,e855_v,e856_v,e857_v,e858_v,e859_v,\n";
		stringContent += "e860_v,e861_v,e862_v,e863_v,e864_v,e865_v,e866_v,e867_v,e868_v,e869_v,\n";
		stringContent += "e870_v,e871_v,e872_v,e873_v,e874_v,e875_v,e876_v,e877_v,e878_v,e879_v,\n";
		stringContent += "e880_v,e881_v,e882_v,e883_v,e884_v,e885_v,e886_v,e887_v,e888_v,e889_v,\n";
		stringContent += "e890_v,e891_v,e892_v,e893_v,e894_v,e895_v,e896_v,e897_v,e898_v,e899_v,\n";
		stringContent += "e900_v,e901_v,e902_v,e903_v,e904_v,e905_v,e906_v,e907_v,e908_v,e909_v,\n";
		stringContent += "e910_v,e911_v,e912_v,e913_v,e914_v,e915_v,e916_v,e917_v,e918_v,e919_v,\n";
		stringContent += "e920_v,e921_v,e922_v,e923_v,e924_v,e925_v,e926_v,e927_v,e928_v,e929_v,\n";
		stringContent += "e930_v,e931_v,e932_v,e933_v,e934_v,e935_v,e936_v,e937_v,e938_v,e939_v,\n";
		stringContent += "e940_v,e941_v,e942_v,e943_v,e944_v,e945_v,e946_v,e947_v,e948_v,e949_v,\n";
		stringContent += "e950_v,e951_v,e952_v,e953_v,e954_v,e955_v,e956_v,e957_v,e958_v,e959_v,\n";
		stringContent += "e960_v,e961_v,e962_v,e963_v,e964_v,e965_v,e966_v,e967_v,e968_v,e969_v,\n";
		stringContent += "e970_v,e971_v,e972_v,e973_v,e974_v,e975_v,e976_v,e977_v,e978_v,e979_v,\n";
		stringContent += "e980_v,e981_v,e982_v,e983_v,e984_v,e985_v,e986_v,e987_v,e988_v,e989_v,\n";
		stringContent += "e990_v,e991_v,e992_v,e993_v,e994_v,e995_v,e996_v,e997_v,e998_v,e999_v,\n";
		stringContent += "e1000_v,e1001_v,e1002_v,e1003_v,e1004_v,e1005_v,e1006_v,e1007_v,e1008_v,e1009_v,\n";
		stringContent += "e1010_v,e1011_v,e1012_v,e1013_v,e1014_v,e1015_v,e1016_v,e1017_v,e1018_v,e1019_v,\n";
		stringContent += "e1020_v,e1021_v,e1022_v,e1023_v,e1024_v};";
		parser.setFile(stringContent,"main.c");
		return parser.internalParse();
	})();
	expect(result).toStrictEqual([{
		"member":[
		"e1_v","e2_v","e3_v","e4_v","e5_v","e6_v","e7_v","e8_v","e9_v",
		"e10_v","e11_v","e12_v","e13_v","e14_v","e15_v","e16_v","e17_v","e18_v","e19_v",
		"e20_v","e21_v","e22_v","e23_v","e24_v","e25_v","e26_v","e27_v","e28_v","e29_v",
		"e30_v","e31_v","e32_v","e33_v","e34_v","e35_v","e36_v","e37_v","e38_v","e39_v",
		"e40_v","e41_v","e42_v","e43_v","e44_v","e45_v","e46_v","e47_v","e48_v","e49_v",
		"e50_v","e51_v","e52_v","e53_v","e54_v","e55_v","e56_v","e57_v","e58_v","e59_v",
		"e60_v","e61_v","e62_v","e63_v","e64_v","e65_v","e66_v","e67_v","e68_v","e69_v",
		"e70_v","e71_v","e72_v","e73_v","e74_v","e75_v","e76_v","e77_v","e78_v","e79_v",
		"e80_v","e81_v","e82_v","e83_v","e84_v","e85_v","e86_v","e87_v","e88_v","e89_v",
		"e90_v","e91_v","e92_v","e93_v","e94_v","e95_v","e96_v","e97_v","e98_v","e99_v",
		"e100_v","e101_v","e102_v","e103_v","e104_v","e105_v","e106_v","e107_v","e108_v","e109_v",
		"e110_v","e111_v","e112_v","e113_v","e114_v","e115_v","e116_v","e117_v","e118_v","e119_v",
		"e120_v","e121_v","e122_v","e123_v","e124_v","e125_v","e126_v","e127_v","e128_v","e129_v",
		"e130_v","e131_v","e132_v","e133_v","e134_v","e135_v","e136_v","e137_v","e138_v","e139_v",
		"e140_v","e141_v","e142_v","e143_v","e144_v","e145_v","e146_v","e147_v","e148_v","e149_v",
		"e150_v","e151_v","e152_v","e153_v","e154_v","e155_v","e156_v","e157_v","e158_v","e159_v",
		"e160_v","e161_v","e162_v","e163_v","e164_v","e165_v","e166_v","e167_v","e168_v","e169_v",
		"e170_v","e171_v","e172_v","e173_v","e174_v","e175_v","e176_v","e177_v","e178_v","e179_v",
		"e180_v","e181_v","e182_v","e183_v","e184_v","e185_v","e186_v","e187_v","e188_v","e189_v",
		"e190_v","e191_v","e192_v","e193_v","e194_v","e195_v","e196_v","e197_v","e198_v","e199_v",
		"e200_v","e201_v","e202_v","e203_v","e204_v","e205_v","e206_v","e207_v","e208_v","e209_v",
		"e210_v","e211_v","e212_v","e213_v","e214_v","e215_v","e216_v","e217_v","e218_v","e219_v",
		"e220_v","e221_v","e222_v","e223_v","e224_v","e225_v","e226_v","e227_v","e228_v","e229_v",
		"e230_v","e231_v","e232_v","e233_v","e234_v","e235_v","e236_v","e237_v","e238_v","e239_v",
		"e240_v","e241_v","e242_v","e243_v","e244_v","e245_v","e246_v","e247_v","e248_v","e249_v",
		"e250_v","e251_v","e252_v","e253_v","e254_v","e255_v","e256_v","e257_v","e258_v","e259_v",
		"e260_v","e261_v","e262_v","e263_v","e264_v","e265_v","e266_v","e267_v","e268_v","e269_v",
		"e270_v","e271_v","e272_v","e273_v","e274_v","e275_v","e276_v","e277_v","e278_v","e279_v",
		"e280_v","e281_v","e282_v","e283_v","e284_v","e285_v","e286_v","e287_v","e288_v","e289_v",
		"e290_v","e291_v","e292_v","e293_v","e294_v","e295_v","e296_v","e297_v","e298_v","e299_v",
		"e300_v","e301_v","e302_v","e303_v","e304_v","e305_v","e306_v","e307_v","e308_v","e309_v",
		"e310_v","e311_v","e312_v","e313_v","e314_v","e315_v","e316_v","e317_v","e318_v","e319_v",
		"e320_v","e321_v","e322_v","e323_v","e324_v","e325_v","e326_v","e327_v","e328_v","e329_v",
		"e330_v","e331_v","e332_v","e333_v","e334_v","e335_v","e336_v","e337_v","e338_v","e339_v",
		"e340_v","e341_v","e342_v","e343_v","e344_v","e345_v","e346_v","e347_v","e348_v","e349_v",
		"e350_v","e351_v","e352_v","e353_v","e354_v","e355_v","e356_v","e357_v","e358_v","e359_v",
		"e360_v","e361_v","e362_v","e363_v","e364_v","e365_v","e366_v","e367_v","e368_v","e369_v",
		"e370_v","e371_v","e372_v","e373_v","e374_v","e375_v","e376_v","e377_v","e378_v","e379_v",
		"e380_v","e381_v","e382_v","e383_v","e384_v","e385_v","e386_v","e387_v","e388_v","e389_v",
		"e390_v","e391_v","e392_v","e393_v","e394_v","e395_v","e396_v","e397_v","e398_v","e399_v",
		"e400_v","e401_v","e402_v","e403_v","e404_v","e405_v","e406_v","e407_v","e408_v","e409_v",
		"e410_v","e411_v","e412_v","e413_v","e414_v","e415_v","e416_v","e417_v","e418_v","e419_v",
		"e420_v","e421_v","e422_v","e423_v","e424_v","e425_v","e426_v","e427_v","e428_v","e429_v",
		"e430_v","e431_v","e432_v","e433_v","e434_v","e435_v","e436_v","e437_v","e438_v","e439_v",
		"e440_v","e441_v","e442_v","e443_v","e444_v","e445_v","e446_v","e447_v","e448_v","e449_v",
		"e450_v","e451_v","e452_v","e453_v","e454_v","e455_v","e456_v","e457_v","e458_v","e459_v",
		"e460_v","e461_v","e462_v","e463_v","e464_v","e465_v","e466_v","e467_v","e468_v","e469_v",
		"e470_v","e471_v","e472_v","e473_v","e474_v","e475_v","e476_v","e477_v","e478_v","e479_v",
		"e480_v","e481_v","e482_v","e483_v","e484_v","e485_v","e486_v","e487_v","e488_v","e489_v",
		"e490_v","e491_v","e492_v","e493_v","e494_v","e495_v","e496_v","e497_v","e498_v","e499_v",
		"e500_v","e501_v","e502_v","e503_v","e504_v","e505_v","e506_v","e507_v","e508_v","e509_v",
		"e510_v","e511_v","e512_v","e513_v","e514_v","e515_v","e516_v","e517_v","e518_v","e519_v",
		"e520_v","e521_v","e522_v","e523_v","e524_v","e525_v","e526_v","e527_v","e528_v","e529_v",
		"e530_v","e531_v","e532_v","e533_v","e534_v","e535_v","e536_v","e537_v","e538_v","e539_v",
		"e540_v","e541_v","e542_v","e543_v","e544_v","e545_v","e546_v","e547_v","e548_v","e549_v",
		"e550_v","e551_v","e552_v","e553_v","e554_v","e555_v","e556_v","e557_v","e558_v","e559_v",
		"e560_v","e561_v","e562_v","e563_v","e564_v","e565_v","e566_v","e567_v","e568_v","e569_v",
		"e570_v","e571_v","e572_v","e573_v","e574_v","e575_v","e576_v","e577_v","e578_v","e579_v",
		"e580_v","e581_v","e582_v","e583_v","e584_v","e585_v","e586_v","e587_v","e588_v","e589_v",
		"e590_v","e591_v","e592_v","e593_v","e594_v","e595_v","e596_v","e597_v","e598_v","e599_v",
		"e600_v","e601_v","e602_v","e603_v","e604_v","e605_v","e606_v","e607_v","e608_v","e609_v",
		"e610_v","e611_v","e612_v","e613_v","e614_v","e615_v","e616_v","e617_v","e618_v","e619_v",
		"e620_v","e621_v","e622_v","e623_v","e624_v","e625_v","e626_v","e627_v","e628_v","e629_v",
		"e630_v","e631_v","e632_v","e633_v","e634_v","e635_v","e636_v","e637_v","e638_v","e639_v",
		"e640_v","e641_v","e642_v","e643_v","e644_v","e645_v","e646_v","e647_v","e648_v","e649_v",
		"e650_v","e651_v","e652_v","e653_v","e654_v","e655_v","e656_v","e657_v","e658_v","e659_v",
		"e660_v","e661_v","e662_v","e663_v","e664_v","e665_v","e666_v","e667_v","e668_v","e669_v",
		"e670_v","e671_v","e672_v","e673_v","e674_v","e675_v","e676_v","e677_v","e678_v","e679_v",
		"e680_v","e681_v","e682_v","e683_v","e684_v","e685_v","e686_v","e687_v","e688_v","e689_v",
		"e690_v","e691_v","e692_v","e693_v","e694_v","e695_v","e696_v","e697_v","e698_v","e699_v",
		"e700_v","e701_v","e702_v","e703_v","e704_v","e705_v","e706_v","e707_v","e708_v","e709_v",
		"e710_v","e711_v","e712_v","e713_v","e714_v","e715_v","e716_v","e717_v","e718_v","e719_v",
		"e720_v","e721_v","e722_v","e723_v","e724_v","e725_v","e726_v","e727_v","e728_v","e729_v",
		"e730_v","e731_v","e732_v","e733_v","e734_v","e735_v","e736_v","e737_v","e738_v","e739_v",
		"e740_v","e741_v","e742_v","e743_v","e744_v","e745_v","e746_v","e747_v","e748_v","e749_v",
		"e750_v","e751_v","e752_v","e753_v","e754_v","e755_v","e756_v","e757_v","e758_v","e759_v",
		"e760_v","e761_v","e762_v","e763_v","e764_v","e765_v","e766_v","e767_v","e768_v","e769_v",
		"e770_v","e771_v","e772_v","e773_v","e774_v","e775_v","e776_v","e777_v","e778_v","e779_v",
		"e780_v","e781_v","e782_v","e783_v","e784_v","e785_v","e786_v","e787_v","e788_v","e789_v",
		"e790_v","e791_v","e792_v","e793_v","e794_v","e795_v","e796_v","e797_v","e798_v","e799_v",
		"e800_v","e801_v","e802_v","e803_v","e804_v","e805_v","e806_v","e807_v","e808_v","e809_v",
		"e810_v","e811_v","e812_v","e813_v","e814_v","e815_v","e816_v","e817_v","e818_v","e819_v",
		"e820_v","e821_v","e822_v","e823_v","e824_v","e825_v","e826_v","e827_v","e828_v","e829_v",
		"e830_v","e831_v","e832_v","e833_v","e834_v","e835_v","e836_v","e837_v","e838_v","e839_v",
		"e840_v","e841_v","e842_v","e843_v","e844_v","e845_v","e846_v","e847_v","e848_v","e849_v",
		"e850_v","e851_v","e852_v","e853_v","e854_v","e855_v","e856_v","e857_v","e858_v","e859_v",
		"e860_v","e861_v","e862_v","e863_v","e864_v","e865_v","e866_v","e867_v","e868_v","e869_v",
		"e870_v","e871_v","e872_v","e873_v","e874_v","e875_v","e876_v","e877_v","e878_v","e879_v",
		"e880_v","e881_v","e882_v","e883_v","e884_v","e885_v","e886_v","e887_v","e888_v","e889_v",
		"e890_v","e891_v","e892_v","e893_v","e894_v","e895_v","e896_v","e897_v","e898_v","e899_v",
		"e900_v","e901_v","e902_v","e903_v","e904_v","e905_v","e906_v","e907_v","e908_v","e909_v",
		"e910_v","e911_v","e912_v","e913_v","e914_v","e915_v","e916_v","e917_v","e918_v","e919_v",
		"e920_v","e921_v","e922_v","e923_v","e924_v","e925_v","e926_v","e927_v","e928_v","e929_v",
		"e930_v","e931_v","e932_v","e933_v","e934_v","e935_v","e936_v","e937_v","e938_v","e939_v",
		"e940_v","e941_v","e942_v","e943_v","e944_v","e945_v","e946_v","e947_v","e948_v","e949_v",
		"e950_v","e951_v","e952_v","e953_v","e954_v","e955_v","e956_v","e957_v","e958_v","e959_v",
		"e960_v","e961_v","e962_v","e963_v","e964_v","e965_v","e966_v","e967_v","e968_v","e969_v",
		"e970_v","e971_v","e972_v","e973_v","e974_v","e975_v","e976_v","e977_v","e978_v","e979_v",
		"e980_v","e981_v","e982_v","e983_v","e984_v","e985_v","e986_v","e987_v","e988_v","e989_v",
		"e990_v","e991_v","e992_v","e993_v","e994_v","e995_v","e996_v","e997_v","e998_v","e999_v",
		"e1000_v","e1001_v","e1002_v","e1003_v","e1004_v","e1005_v","e1006_v","e1007_v","e1008_v","e1009_v",
		"e1010_v","e1011_v","e1012_v","e1013_v","e1014_v","e1015_v","e1016_v","e1017_v","e1018_v","e1019_v",
		"e1020_v","e1021_v","e1022_v","e1023_v","e1024_v"],
		"name": "e_two",
		"pos": 0,
		"type": "EnumDefinition",
		},
	]);
});

test('test basic parse', () => {
  expect(parser.parse("void main(){}","main.c")).toStrictEqual([{"arguments": [], "body": [], "defType": {"modifier": [], "name": "void", "pos": 0, "type": "Type"}, "name": "main", "pos": 0, "type": "FunctionDefinition"}]);
});

test('test basic with return',()=>{
	expect(parser.parse("void main(){return;}")).toStrictEqual([{"arguments":[],"body":[],"body":[{"pos": 12,"type": "ReturnStatement","value": undefined}],"defType":{"modifier":[],"name": "void","pos": 0,"type": "Type"},"name": "main","pos": 0,"type": "FunctionDefinition"}]);
});

test('test basic with return',()=>{
	expect(parser.parse("void main(){return;}")).toStrictEqual([{"arguments":[],"body":[],"body":[{"pos": 12,"type": "ReturnStatement","value": undefined}],"defType":{"modifier":[],"name": "void","pos": 0,"type": "Type"},"name": "main","pos": 0,"type": "FunctionDefinition"}]);
});

test('test basic with return',()=>{
	expect(parser.parse("void main(){return;}")).toStrictEqual([{"arguments":[],"body":[],"body":[{"pos": 12,"type": "ReturnStatement","value": undefined}],"defType":{"modifier":[],"name": "void","pos": 0,"type": "Type"},"name": "main","pos": 0,"type": "FunctionDefinition"}]);
});


