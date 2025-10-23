(function () {
	// NOTE: Each of the keys in timeEstimates maps to an input id in the HTML form.  To expand the form
	var timeEstimates = {
		wordCleanup: {
			label: "minutes Word cleanup time",
			unitCost: 1,
			fixedCost: 0
		},
		pages: {
			label: "Pages",
			unitCost: 2,
			fixedCost: 5
		},
		discussions: {
			label: "Discussion topics",
			unitCost: 5,
			fixedCost: 5
		},
		assignments: {
			label: "Assignment folders",
			unitCost: 5,
			fixedCost: 5
		},
		embeds: {
			label: "Custom iframe embeds",
			unitCost: 20,
			fixedCost: 10
		},
		quizzes: {
			label: "Quizzes",
			unitCost: 35,
			fixedCost: 10
		},
		otherTime: {
			label: "minutes for other D2L tools",
			unitCost: 1,
			fixedCost: 0
		}
	};
	$("#inflator").on("change input", function () {
		$("#inflator-display").text($(this).val() + "%");
	});

	// Add comprehensive input validation to only allow numbers
	$("#leftSide input[type='number']").on("keypress", function (e) {
		// Allow: backspace, delete, tab, escape, enter
		if ([8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
			// Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
			(e.keyCode === 65 && e.ctrlKey === true) ||
			(e.keyCode === 67 && e.ctrlKey === true) ||
			(e.keyCode === 86 && e.ctrlKey === true) ||
			(e.keyCode === 88 && e.ctrlKey === true)) {
			return;
		}
		// Only allow digits 0-9 (both main keyboard and numpad)
		if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

	// Additional input event handler to catch any characters that might slip through
	$("#leftSide input[type='number']").on("input", function (e) {
		var value = this.value;
		// Remove any non-digit characters
		var cleanValue = value.replace(/[^0-9]/g, '');
		if (value !== cleanValue) {
			this.value = cleanValue;
		}
	});

	// Prevent non-numeric characters on paste
	$("#leftSide input[type='number']").on("paste", function (e) {
		e.preventDefault();
		var pasteData = e.originalEvent.clipboardData.getData('text');
		// Only allow numeric characters
		var cleanData = pasteData.replace(/[^0-9]/g, '');
		if (cleanData) {
			this.value = cleanData;
		}
	});

	// Ensure values stay within min bounds and are integers
	$("#leftSide input[type='number']").on("blur", function () {
		var $this = $(this);
		var value = parseInt($this.val());
		var min = parseInt($this.attr('min')) || 0;
		
		if (isNaN(value) || value < min) {
			$this.val(min);
		} else {
			$this.val(Math.floor(value)); // Ensure integer values
		}
	});

	$("#leftSide").on("change input", function () {
		var buildTime = calculateBuildTime();
		updateDisplay(buildTime);
	});

	$("button[type='reset']").on("click", function () {
		$("#buildTimeValue").html("&nbsp;");
		$("#timeSummary").html("");
		$("#inflator-display").text("0%");
	});


	function calculateBuildTime() {
		var total = 0;
		var br = "\n";
		var subTotal = 0;
		var summary = "";
		var inflator = (1 + ($("#inflator").val() / 100));
		summary += "Number |                 Item  | Time " + br;
		summary += ":-----:|----------------------:|:-----" + br;

		for (var key in timeEstimates) {
			var unitTotal = 0;
			var number = getNumberOf(key);
			if (timeEstimates[key].unitCost) {
				unitTotal += (number * timeEstimates[key].unitCost);
			}
			if (number > 0 && timeEstimates[key].fixedCost) {
				unitTotal += timeEstimates[key].fixedCost;
			}
			if (unitTotal > 0) {
				summary += number + " | " + timeEstimates[key].label + " | " + formatedTime(unitTotal) + br;
			}
			//$("input[name='" + key + "']").attr("title",formatedTime(subTotal * inflator));
			//total += unitTotal;
			subTotal += unitTotal;
		}

		total = subTotal * inflator;
		if (total < 0) {
			total = 0;
		}
		summary += "       | **SubTotal**         | " + formatedTime(subTotal) + br;
		summary += "       | Inflator x            | " + $("#inflator").val() + " % " + br;
		summary += "       | **Total**            | " + formatedTime(total) + br;
		if (total > 0) {
			updateSummary(summary);
		}
		return total;
	};

	function getNumberOf(key) {
		var $item = $("input[name='" + key + "']");
		if ($item.is(":checked")) {
			return 1;
		}
		var value = $item.val();
		if (value === "" || isNaN(parseInt(value))) {
			return 0;
		}
		return parseInt(value);
	};

	function formatedTime(buildTime) {
		if (isNaN(buildTime)) {
			buildTime = 0;
		}
		var h = parseInt(buildTime / 60);
		var m = getMinutes(buildTime);
		if (h === 0) {
			return m + " min";
		}
		return h + " hr " + m + " min";
	};

	function getMinutes(minutes) {
		var m = minutes % 60;
		m = roundToFixed(m, 2);

		return m;
	}

	function roundToFixed(number, fixed) {
		var fixedPlus = number.toFixed(fixed + 1);
		var lastDigit = Number(fixedPlus.charAt(fixedPlus.length - 1));

		if (lastDigit < 5) {
			return Number(number.toFixed(fixed)).toString();
		} else {
			var divisor = Math.pow(10, fixed);
			return ((parseInt(number * divisor) + 1) / divisor).toString();
		}
	}

	function roundToNearest(number, nearest) {
		var n = number / nearest;
		if (number % nearest >= nearest / 2) {
			return Math.ceil(n) * nearest;
		}
		return Math.flor(n) * nearest;
	}

	function updateDisplay(buildTime) {
		$("#buildTimeValue").text(formatedTime(buildTime));
	}

	function updateSummary(summary) {
		$("#timeSummary").html(summary);
	};
}());
