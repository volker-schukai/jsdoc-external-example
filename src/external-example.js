const readFileSync = require("fs").readFileSync;
const path = require('path');

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
					console.error(e)
				}
				
				
				
			} else {
				try {
					example = readFileSync(path.join(doclet.meta.path, examplePath), "utf8")
				} catch(e) {
					console.error(e)
				}
					
			}
			
			if(example!="") {
				doclet.examples.push(example);	
			}
			
		}
	});
};
