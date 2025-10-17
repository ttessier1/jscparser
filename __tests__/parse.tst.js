const parser = require('../cparser');

test('test basic parse', () => {
  expect(parser.parse("void main(){}","main.c")).toStrictEqual([{"arguments": [], "body": [], "defType": {"modifier": [], "name": "void", "pos": 0, "type": "Type"}, "name": "main", "pos": 0, "type": "FunctionDefinition"}]);
});