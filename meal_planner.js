var generateMeal = function() {
	var dataItems,
		target = parseInt($("#desiredCalories").val(), 10);

	// logic to create a meal based on the parameters goes here

	// start by just getting the first items that most closely satisfy the calorie limit
	dataItems = subset_sum(data, target);

	return dataItems;
}

var displayMeal = function(dataItems, template, numberOfMeals, mealsContainer) {
	var splitItems = splitArray(dataItems, numberOfMeals),
		totalCalories = 0;

	mealsContainer.empty();

	for (i = 0; i < numberOfMeals; i++) {
		var calorieCount = splitItems[i].length > 1 ? splitItems[i].reduce(function(prev, curr) {
				return (prev.calories || prev) + curr.calories;
			}) : splitItems[i][0].calories,
			meal = { id: i + 1, calories: calorieCount, items: splitItems[i] },
			rendered = Mustache.render(template, meal);

		mealsContainer.append(rendered);
		totalCalories += calorieCount;
	}

	if (numberOfMeals > 1) {
		$("#totalCalories").text(totalCalories);
		$("#summary").show();
	} else {
		$("#summary").hide();
	}

	mealsContainer.show();
}

$(function() {
	var mealsContainer = $("#meals"),
		template = $("#mealTemplate").html(),
		form = $("form"),
		numberOfMeals = $("#numberOfMeals");

	form.on("submit", function(event) {
		var dataItems = generateMeal(),
			mealCount = parseInt(numberOfMeals.val(), 10);

		displayMeal(dataItems, template, mealCount, mealsContainer);

		event.preventDefault();
	});

	numberOfMeals.on("change", function() {
		var mealCount = parseInt($(this).val(), 10);

		form.find("button").text("Generate Meal" + (mealCount > 1 ? "s" : ""));
	});
});
