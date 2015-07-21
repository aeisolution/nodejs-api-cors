var chai = require('chai'),
		expect = chai.expect,
		cors = require('../lib/cors');

describe('api CORS', function() {
	it('will return error.args if it has less than 3 params', function() {
		var retVal = ['error.args'];
		
		expect(cors()).to.be.deep.equal(retVal);
		expect(cors('one')).to.be.deep.equal(retVal);
		expect(cors('one', 'two')).to.be.deep.equal(retVal);		
		expect(cors('one', 'two', 'three')).to.not.be.equal(retVal);		
	});
	
	it('will return error.params the 3 params are not object', function() {
		var retVal = ['error.inputs'];
		
		expect(cors('one', 	'two', 	'three')).to.be.deep.equal(retVal);
		expect(cors({}, 		'two', 	'three')).to.be.deep.equal(retVal);
		expect(cors('one', 	{}, 		'three')).to.be.deep.equal(retVal);
		expect(cors('one', 	'two', 	{})).to.be.deep.equal(retVal);
		
		expect(cors({}, 		{}, 		'three')).to.be.deep.equal(retVal);
		expect(cors({}, 		'two',	{})).to.be.deep.equal(retVal);
		expect(cors('one', 	{}, 		{})).to.be.deep.equal(retVal);
		expect(cors({}, 	{}, 		{})).to.be.deep.equal(retVal);
		
		expect(cors({}, 	{}, 		function(){ return true; })).to.not.be.equal(retVal);		
	});

});