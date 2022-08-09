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

			console.log(tag)
			console.log(doclet)
			
			examplePath = tag?.value
			
			if(!examplePath) {
				return;
			}

			examplePath = path.normalize(examplePath.trim())
			
			if(path.isAbsolute(examplePath)) {
				example = readFileSync(examplePath, "utf8")
				
			} else {
				example = readFileSync(path.join(doclet.meta.path, examplePath), "utf8")
			}
			
			doclet.examples.push(example);
		}
	});
};
