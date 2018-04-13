(function() {
	$("#moduleForm").on("change input", function(e) {
		e.preventDefault();
		var moduleTitle = $("#moduleTitle").val();
		var moduleKeywords = $("#moduleKeywords").val();

		var br = "\n";
		var readme = "";
		readme += "---" + br;
		readme += "title: " + moduleTitle + br;
		readme += "keywords: [" + formatKeywords(moduleKeywords) + "]" + br;
		readme += "---";

		$(this).find("pre").text(readme);

	});

	function formatKeywords(string) {
		var keywords = string.split(",");
		for(var i = 0; i < keywords.length; i++) {
			var words = keywords[i].split(" ");
			for(var j = 0; j <words.length; j++) {
				words[j] = conditionalLowerCase(words[j]);
			}
			keywords[i] = $.trim(words.join(" "));
			if(keywords[i].length === 0) {
				keywords.splice(i,1);
				i--;
			} else {
				keywords[i] = keywords[i];
			}
		}
		return keywords.join(", ");

	};

	function conditionalLowerCase(string) {
		var word = string
		if(word.toUpperCase() !== word) {
			word = word.toLowerCase();
		}
		return word;
	};
}());