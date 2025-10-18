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
		console.log("File Position:[",parser.getFilePosition(),"]");
		return parser.currentCharacter;
	})();
	expect(result).toBe("2");
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


