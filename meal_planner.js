var generateMeal = function() {
	var dataItems,
		target = parseInt($("#desiredCalories").val(), 10);

	// logic to create a meal based on the parameters goes here

	// start by just getting the first items that most closely satisfy the calorie limit
	dataItems = subsetSum(data, target);

	return dataItems;
};

var formatDuplicates = function(dataItems) {
	var uniqueItems = [];

	$.each(dataItems, function(i, el){
	    if ($.inArray(el, uniqueItems) === -1) {
			delete el.count;
			uniqueItems.push(el);
		} else {
			var dupeIndex = getIndexIfObjWithOwnAttr(uniqueItems, "name", el.name);

			if (uniqueItems[dupeIndex].count) {
				uniqueItems[dupeIndex].count++;
			} else {
				uniqueItems[dupeIndex].count = 2;
			}
		}
	});

	return uniqueItems;
};

var displayMeal = function(dataItems, template, numberOfMeals, mealsContainer, summary) {
	var splitItems = splitArray(dataItems, numberOfMeals),
		totalCalories = 0;

	for (i = 0; i < numberOfMeals; i++) {
		var calorieCount = splitItems[i].length > 1 ? splitItems[i].reduce(function(prev, curr) {
				return (prev.calories || prev) + curr.calories;
			}) : splitItems[i][0].calories,
			meal = { id: i + 1, calories: calorieCount, items: formatDuplicates(splitItems[i]) },
			rendered = Mustache.render(template, meal);

		mealsContainer.append(rendered);
		totalCalories += calorieCount;
	}

	if (numberOfMeals > 1) {
		summary.children("#totalCalories").text(totalCalories);
		summary.show();
	} else {
		summary.hide();
	}

	mealsContainer.show();
};

var resetResults = function(alert, mealsContainer, summary) {
	alert.hide();
	summary.hide();
	mealsContainer.empty();
};

$(function() {
	var mealsContainer = $("#meals"),
		template = $("#mealTemplate").html(),
		form = $("form"),
		summary = $("#summary"),
		numberOfMeals = $("#numberOfMeals"),
		alert = $(".alert-danger");

	form.on("submit", function(event) {
		var dataItems = generateMeal(),
			mealCount = parseInt(numberOfMeals.val(), 10);

		resetResults(alert, mealsContainer, summary);

		if (!dataItems || dataItems.length < mealCount) {
			$(".alert-danger").show();
		} else {
			displayMeal(dataItems, template, mealCount, mealsContainer, summary);
		}

		event.preventDefault();
	});

	numberOfMeals.on("change", function() {
		var mealCount = parseInt($(this).val(), 10);

		form.find("button").text("Generate Meal" + (mealCount > 1 ? "s" : ""));
	});
});
