(function() {
	'use strict';

	var chai = require('chai'),
			expect = chai.expect,
			cors = require('../lib/cors');
 	
 	
 	var fakeRequest = function(headers) {
		return {
			headers: headers || {
				'origin': 'request.com',
				'access-control.request-headers': 'requestedHeader1, requestedHeader2'
			},
			pause: function() {
				return;
			},
			resume: function() {
				return;
			}
		};
	},
	fakeResponse = function() {
		var headers = {};
		return {
			allHeaders: function() {
				return headers;
			},
			getHeader: function(key) {
				return headers[key];
			},
			set: function(key, val) {
				headers[key] = val;
			},
			get: function(key) {
				return headers[key];
			}
		};
	};

	
	
	describe('api CORS', function() {
		it('will return error.args if it has less than 3 params', function() {
			var retVal = ['error.args'];

			var req, res, next;
			req = fakeRequest();
			res = fakeResponse();
			
			expect(cors()()).to.be.deep.equal(retVal);
			expect(cors()('one')).to.be.deep.equal(retVal);
			expect(cors()('one', 'two')).to.be.deep.equal(retVal);		
			expect(cors()('one', 'two', 'three')).to.not.be.equal(retVal);		
		});

		it('will return error.params the 3 params are not object', function(done) {
			var retVal = ['error.inputs'];

			var req, res, next;
			req = fakeRequest();
			res = fakeResponse();
			
			expect(cors()('one', 	'two', 	'three')).to.be.deep.equal(retVal);
			expect(cors()({}, 		'two', 	'three')).to.be.deep.equal(retVal);
			expect(cors()('one', 	{}, 		'three')).to.be.deep.equal(retVal);
			expect(cors()('one', 	'two', 	{})).to.be.deep.equal(retVal);

			expect(cors()({}, 		{}, 		'three')).to.be.deep.equal(retVal);
			expect(cors()({}, 		'two',	{})).to.be.deep.equal(retVal);
			expect(cors()('one', 	{}, 		{})).to.be.deep.equal(retVal);
			expect(cors()({}, 	{}, 		{})).to.be.deep.equal(retVal);

			next = function() { 
				done(); 
			};
			cors()(req, res, next);		
		});

	});
}());