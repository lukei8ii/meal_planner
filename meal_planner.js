var generateMeal = function(calorieTarget, proteinTarget) {
	var dataItems = subsetSum(db().get(), calorieTarget, proteinTarget);

	return dataItems;
};

var formatDuplicates = function(items) {
	var uniqueItems = [];

	$.each(items, function(i, el){
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
	var splitItems = partitionMeals(dataItems, numberOfMeals),
		totalCalories = 0,
		totalProtein = 0,
		totalFat = 0,
		totalCarbs = 0;

	for (i = 0; i < numberOfMeals; i++) {
		var calorieCount = splitItems[i].length > 1 ? splitItems[i].reduce(function(prev, curr) {
				return (prev.calories || prev) + curr.calories;
			}) : splitItems[i][0].calories,
			meal = { id: i + 1, calories: calorieCount, items: formatDuplicates(splitItems[i]) },
			rendered = Mustache.render(template, meal);

		mealsContainer.append(rendered);
		totalCalories += calorieCount;
	}

	$.each(dataItems, function() {
		totalProtein += this.protein;
		totalFat += this.fat;
		totalCarbs += this.carbs;
	});

	summary.children("#totalCalories").text(totalCalories);
	summary.children("#totalProtein").text(totalProtein);
	summary.children("#totalFat").text(totalFat);
	summary.children("#totalCarbs").text(totalCarbs);
	summary.show();

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
		desiredCalories = $("#desiredCalories"),
		desiredProtein = $("#desiredProtein"),
		numberOfMeals = $("#numberOfMeals"),
		alert = $(".alert-danger");

	form.on("submit", function(event) {
		var calorieTarget = parseInt(desiredCalories.val(), 10),
			proteinTarget = parseInt(desiredProtein.val(), 10) || null,
			dataItems = generateMeal(calorieTarget, proteinTarget),
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
