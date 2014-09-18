var displayMeal = function(plan, summaryTemplate, mealTemplate, resultsContainer) {
	var totals = { calories: 0, protein: 0, fat: 0, carbs: 0 },
		meals = plan.meals,
		mealNutrition = plan.nutrition.meals,
		summary = plan.nutrition.summary;

	resultsContainer.append(Mustache.render(summaryTemplate, summary));

	$.each(meals, function(mealIndex) {
		var meal = { id: mealIndex + 1, source: this[0].source, nutrition: mealNutrition[mealIndex], items: Utility.formatDuplicates(this) },
			rendered = Mustache.render(mealTemplate, meal);

		resultsContainer.append(rendered);
	});
};

var resetResults = function(alert, resultsContainer) {
	alert.hide();
	resultsContainer.empty();
};

$(function() {
	var resultsContainer = $(".results"),
		summaryTemplate = $("#summaryTemplate").html(),
		mealTemplate = $("#mealTemplate").html(),
		desiredCalories = $("#desiredCalories"),
		desiredProtein = $("#desiredProtein"),
		desiredMeals = $("#desiredMeals"),
		alert = $(".main-form + .alert-danger"),
		cookie = $.cookie(),
		setCookie = function() {
			$.cookie("calories", desiredCalories.val());
			$.cookie("meals", desiredMeals.val());
			$.cookie("protein", desiredProtein.val());
		},
		getCookie = function() {
			if (Object.keys(cookie).length > 0) {
				desiredCalories.val(cookie.calories);
				desiredMeals.val(cookie.meals);
				desiredProtein.val(cookie.protein);
			}
		};

	getCookie();

	$("form").on("submit", function(event) {
		event.preventDefault();

		var calorieTarget = parseInt(desiredCalories.val(), 10),
			proteinTarget = parseInt(desiredProtein.val(), 10) || null,
			mealTarget = parseInt(desiredMeals.val(), 10),
			tries = 0,
			plan;

		while (!plan && tries < config.mealGenerationRetry) {
			tries++;
			plan = MealEngine.getMeals(calorieTarget, proteinTarget, mealTarget);
		}

		resetResults(alert, resultsContainer);

		if (!plan) {
			alert.show();
		} else {
			displayMeal(plan, summaryTemplate, mealTemplate, resultsContainer);
		}
	});

	desiredMeals.on("change", setCookie);
	desiredCalories.on("change", setCookie);
	desiredProtein.on("change", setCookie);
});
