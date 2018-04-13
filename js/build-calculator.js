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
			label: "Dropbox folders",
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
