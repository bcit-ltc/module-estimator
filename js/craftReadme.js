var config = require("../config.json");

module.exports = function(form) {
	return `
---
course info:
    school: ${getFullSchoolName(form.schoolValue)}
    program: ${form.program}
    title: ${form.courseTitle}
    code: ${form.subjectCode.toLowerCase() + "-" + form.courseNumber.toLowerCase()}

keywords: ${form.keywords.toLowerCase()}

production info:
    date: ${getDate()}
    subject matter expert: ${form.subjectExpert}
    instructional designer: ${form.instructionalDesigner}
---`;
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