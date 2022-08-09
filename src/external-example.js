const readFileSync = require("fs").readFileSync;
const path = require('path');
const logger = require('jsdoc/util/logger');

exports.defineTags = function(dictionary) {
	dictionary.defineTag("externalExample", {
		mustHaveValue: true,
		isNamespace: false,
		canHaveType: false,
		defaultValue: [],
		onTagged: function(doclet, tag) {

 			if (!doclet.examples) {
 				doclet.examples = [];
 			}

			let example = ""
			examplePath = tag?.value
			
			if(!examplePath) {
				return;
			}

			examplePath = path.normalize(examplePath.trim())
			
			if(path.isAbsolute(examplePath)) {
				try {
					example = readFileSync(examplePath, "utf8")	
				} catch(e) {
					logger.error('@externalExample: ' + e)
					return
				}
				
				
				
			} else {
				try {
					example = readFileSync(path.join(doclet.meta.path, examplePath), "utf8")
				} catch(e) {
					logger.error('@externalExample: ' + e)
					return
				}
					
			}
			
			if(example!="") {
				doclet.examples.push(example);	
			}
			
		}
	});
};
