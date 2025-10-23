(function() {
	var selectedSchool = null;

	// School dropdown functionality
	$("#schoolSelect").on("change", function() {
		selectedSchool = $(this).val();
		updateReadme();
	});

	// Form change handler
	$("#moduleForm").on("change input", function(e) {
		e.preventDefault();
		updateReadme();
	});

	function updateReadme() {
		var formData = {
			schoolValue: selectedSchool,
			program: $("#program").val(),
			courseTitle: $("#courseTitle").val(),
			subjectCode: $("#subjectCode").val(),
			courseNumber: $("#courseNumber").val(),
			keywords: $("#keywords").val(),
			subjectExpert: $("#subjectExpert").val(),
			instructionalDesigner: $("#instructionalDesigner").val()
		};

		// Check if we have enough data to generate the readme
		if (formData.schoolValue && formData.program && formData.courseTitle && 
			formData.subjectCode && formData.courseNumber) {
			
			try {
				var readme = craftReadme(formData);
				$("#readme-code").text(readme);
			} catch (error) {
				console.error("Error generating readme:", error);
				// Fallback to basic format if craftReadme fails
				var br = "\n";
				var readme = "";
				readme += "---" + br;
				readme += "course info:" + br;
				readme += "    school: " + (formData.schoolValue || "") + br;
				readme += "    program: " + (formData.program || "") + br;
				readme += "    title: " + (formData.courseTitle || "") + br;
				readme += "    code: " + (formData.subjectCode || "").toLowerCase() + "-" + (formData.courseNumber || "").toLowerCase() + br;
				
				// Add keywords only if provided
				if (formData.keywords && formData.keywords.trim()) {
					readme += "" + br;
					readme += "keywords: " + formData.keywords.toLowerCase() + br;
				}
				
				readme += "" + br;
				readme += "production info:" + br;
				readme += "    date: " + getDate() + br;
				
				// Add subject matter expert only if provided
				if (formData.subjectExpert && formData.subjectExpert.trim()) {
					readme += "    subject matter expert: " + formData.subjectExpert + br;
				}
				
				// Add instructional designer only if provided
				if (formData.instructionalDesigner && formData.instructionalDesigner.trim()) {
					readme += "    instructional designer: " + formData.instructionalDesigner + br;
				}
				
				readme += "---";
				$("#readme-code").text(readme);
			}
		} else {
			// Show template when form is incomplete
			var br = "\n";
			var readme = "";
			readme += "---" + br;
			readme += "course info:" + br;
			readme += "    school: " + (formData.schoolValue || "") + br;
			readme += "    program: " + (formData.program || "") + br;
			readme += "    title: " + (formData.courseTitle || "") + br;
			readme += "    code: " + (formData.subjectCode || "").toLowerCase() + "-" + (formData.courseNumber || "").toLowerCase() + br;
			
			// Add keywords only if provided
			if (formData.keywords && formData.keywords.trim()) {
				readme += "" + br;
				readme += "keywords: " + formData.keywords.toLowerCase() + br;
			}
			
			readme += "" + br;
			readme += "production info:" + br;
			readme += "    date: " + getDate() + br;
			
			// Add subject matter expert only if provided
			if (formData.subjectExpert && formData.subjectExpert.trim()) {
				readme += "    subject matter expert: " + formData.subjectExpert + br;
			}
			
			// Add instructional designer only if provided
			if (formData.instructionalDesigner && formData.instructionalDesigner.trim()) {
				readme += "    instructional designer: " + formData.instructionalDesigner + br;
			}
			
			readme += "---";
			$("#readme-code").text(readme);
		}
	}

	function getDate() {
		var d = new Date();
		var year = d.getFullYear();
		var month = doubleDigits(d.getMonth() + 1); // getMonth() returns 0-11
		var day = doubleDigits(d.getDate());
		return `${year}-${month}-${day}`;

		function doubleDigits(digit) {
			if (digit <= 9) {
				return "0" + digit;
			}
			return digit;
		}
	}

	function formatKeywords(string) {
		if (!string) return "";
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
	}

	function conditionalLowerCase(string) {
		var word = string
		if(word.toUpperCase() !== word) {
			word = word.toLowerCase();
		}
		return word;
	}
}());