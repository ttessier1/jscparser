const parser = require('./cparser');

test('test skipBlanks', () => {
  const result = (() => {
    parser.setFile("\n\na","main.c");
	parser.skipBlanks();
	return parser.currentCharacter;
  })();
  expect(result).toBe("a");
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


