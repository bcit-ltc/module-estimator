// Browser-compatible version of craftReadme
var config = {
  "schoolNames": {
    "business": "School of Business",
    "computing": "School of Computing and Academic Studies",
    "construction": "School of Construction and the Environment",
    "energy": "School of Energy",
    "health": "School of Health Sciences",
    "transportation": "School of Transportation"
  }
};

function craftReadme(form) {
	var readme = `---
course info:
    school: ${getFullSchoolName(form.schoolValue)}
    program: ${form.program}
    title: ${form.courseTitle}
    code: ${form.subjectCode.toLowerCase() + "-" + form.courseNumber.toLowerCase()}`;

	// Add keywords only if provided
	if (form.keywords && form.keywords.trim()) {
		readme += `\n\nkeywords: ${form.keywords.toLowerCase()}`;
	}

	readme += `\n\nproduction info:
    date: ${getDate()}`;

	// Add subject matter expert only if provided
	if (form.subjectExpert && form.subjectExpert.trim()) {
		readme += `\n    subject matter expert: ${form.subjectExpert}`;
	}

	// Add instructional designer only if provided
	if (form.instructionalDesigner && form.instructionalDesigner.trim()) {
		readme += `\n    instructional designer: ${form.instructionalDesigner}`;
	}

	readme += `\n---`;
	return readme;
}
function getDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = doubleDigits(d.getMonth());
	var day = doubleDigits(d.getDate());


	return `${year}-${month}-${day}`;

	function doubleDigits(digit) {
		if (digit <= 9) {
			return "0" + digit;
		}
		return digit;
	};
};
function getFullSchoolName(name) {
	return config.schoolNames[name.toLowerCase()];
};