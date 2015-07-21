(function(){
	'use strict';
	
	var defaults = {
		origin: '*',
		methods: 'GET,PUT,POST,DELETE,OPTIONS'
	};
	
	function isString(s) {
    return typeof s === 'string' || s instanceof String;
  }
	
	function configureAllowHeaders(options, req) {
		var headers = options.allowedHeaders || options.headers;
		
		if(!headers) {
			headers = req.headers['access-control-request-headers'];
		} else if (headers.join) {
			headers = headers.join(',');
		}
		
		if(headers && headers.length) {
			return {
				key: 'Access-Control-Allow-Headers',
				value: headers
			};
		}
		return null;
	}
	
	function configureAllowMethods(options) {
		var methods = options.methods || defaults.methods;
		if(methods.join) {
			methods = methods.join(',');
		}
		return {
			key: 'Access-Control-Allow-Methods',
			value: methods
		}
	}
	
	function configureAllowOrigin(options) {
		var origin = options.origin || defaults.origin;
		
		if(origin === '*') {
			return {
				key: 'Access-Control-Allow-Origin',
				value: '*'
			};
		} else {
			return {
				key: 'Access-Control-Allow-Origin',
				value: origin
			};
		} 
		
		return headers;		
	}
	
	function applyHeaders(headers, res) {
		for(var i=0, len=headers.length; i<len; i++) {
			res.set(headers[i].key, headers[i].value);
		}
	}
	
	
	function cors() {
		
		return function (req, res, next) {
			
			if(!req || !res || !next) 
				return ['error.args'];

			if(typeof(req)!=='object' || typeof(res)!=='object' || typeof(next)!=='function') 
				return ['error.inputs'];

			var headers = [];
		
			// CORS headers
			headers.push(configureAllowOrigin({ origin: '*' }));
			headers.push(configureAllowMethods({ methods: 'GET,PUT,POST,DELETE,OPTIONS'}));

			// Set custom headers for CORS
			headers.push(configureAllowHeaders({ headers: 'Content-type,Accept,X-Access-Token,X-Key'}, req));

			
			applyHeaders(headers, res);
			if (req.method == 'OPTIONS') {
					res.status(200).end();
			} else {
					next();
			}
		}
	}
	
	module.exports = cors;
}());
