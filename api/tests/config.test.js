const config = require('../src/config.js');

test('db should be mongo', () => {
	expect(config.db).toBeTruthy();
	expect(config.db.dialect).toEqual('mongodb');
});
