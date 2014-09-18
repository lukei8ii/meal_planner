var displayMeal = function(plan, template, resultsContainer) {
	var totals = { calories: 0, protein: 0, fat: 0, carbs: 0 },
		meals = plan.meals,
		mealNutrition = plan.nutrition.meals,
		results = plan.nutrition.summary,
		rendered;

	results.meals = [];

	$.each(meals, function(mealIndex) {
		var meal = { id: mealIndex + 1, source: this[0].source, nutrition: mealNutrition[mealIndex], items: Utility.formatDuplicates(this) };

		results.meals.push(meal);
	});

	rendered = Mustache.render(template, results);
	resultsContainer.append(rendered);

	drawChart($("#chart_div")[0], results);
};

var resetResults = function(alert, resultsContainer) {
	alert.hide();
	resultsContainer.empty();
};

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

var drawChart = function(container, results) {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	data.addRows([
		["Protein " + results.protein + "g", results.protein],
		["Fat " + results.fat + "g", results.fat],
		["Carbs " + results.carbs + "g", results.carbs]
	]);

	// Set chart options
	var options = {
		width: 258,
		height: 258,
		legend: { position: "none" },
		pieSliceText: "label",
		pieSliceTextStyle: { fontSize: 16 },
		chartArea: { left: 0, top: 0, width: "100%", height: "100%" }
	};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(container);
	chart.draw(data, options);
};

$(function() {
	var resultsContainer = $(".results"),
		template = $("#template").html(),
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
			displayMeal(plan, template, resultsContainer);
		}
	});

	desiredMeals.on("change", setCookie);
	desiredCalories.on("change", setCookie);
	desiredProtein.on("change", setCookie);
});
