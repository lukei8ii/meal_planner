

var generateMeal = function() {
	var dataItems,
		target = parseInt($("#desiredCalories").val(), 10);

	// logic to create a meal based on the parameters goes here

	// start by just getting the first items that most closely satisfy the calorie limit
	dataItems = subset_sum(data, target);

	return dataItems;
}

var displayMeal = function(dataItems, mealContainer) {
	var calorieCount = 0,
		items = mealContainer.find("#items").empty(),
		summary = mealContainer.find("#summary");

	$.each(dataItems, function() {
		items.append("<li>" + this.name + " - " + this.calories + " calories</li>");
		calorieCount += this.calories;
	});

	summary.text("Your meal - " + calorieCount + " calories");

	mealContainer.show();
}

$(function() {
	var mealContainer = $("#meal");

	$("form").on("submit", function() {
		event.preventDefault();

		var dataItems = generateMeal();
		displayMeal(dataItems, mealContainer);
	});
});
