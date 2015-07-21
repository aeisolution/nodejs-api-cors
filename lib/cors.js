(function(){
	"use strict";
	
	function cors(req, res, next) {
		if(!req || !res || !next) 
			return ['error.args'];

		if(typeof(req)!=='object' || typeof(res)!=='object' || typeof(next)!=='function') 
			return ['error.inputs'];
	
		return 0;
	}
	
	module.exports = cors;
}());
