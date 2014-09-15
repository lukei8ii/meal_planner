var generateMealPlan = function(mealCount, calorieTarget, proteinTarget) {
	var averageMealCals = Math.round(calorieTarget / mealCount),
		averageMealProtein = Math.round(proteinTarget / mealCount),
		sources = Object.keys(RawItemData),
		selectedSources = [],
		items = [],
		nutritionSummary = { calories: 0, protein: 0, fat: 0, carbs: 0 },
		nutrition = { summary: nutritionSummary, meals: [] },
		meal;

	// choose some meal sources
	for (i = 0; i < mealCount; i++) {
		selectedSources[i] = sources[Math.floor(Math.random()*sources.length)];
	}

	// choose items for the meals
	for (i = 0; i < mealCount - 1; i++) {
		var nutritionMeal = { calories: 0, protein: 0, fat: 0, carbs: 0 };

		meal = randomizedSubsetSum(db({source: selectedSources[i]}).get(),
			averageMealCals,
			averageMealProtein,
			config.mealCalculatorMargin);

		if (meal) {
			$.each(meal, function() {
				nutritionMeal.calories += this.calories;
				nutritionMeal.protein += this.protein;
				nutritionMeal.fat += this.fat;
				nutritionMeal.carbs += this.carbs;
			});

			nutritionSummary.calories += nutritionMeal.calories;
			nutritionSummary.protein += nutritionMeal.protein;
			nutritionSummary.fat += nutritionMeal.fat;
			nutritionSummary.carbs += nutritionMeal.carbs;

			items.push(meal);
			nutrition.meals.push(nutritionMeal);
		} else {
			return null;
		}
	}

	var nutritionMeal = { calories: 0, protein: 0, fat: 0, carbs: 0 };

	// choose items for the last meal using a more precise margin
	meal = randomizedSubsetSum(db({source: selectedSources[i]}).get(),
		calorieTarget - nutritionSummary.calories,
		proteinTarget - nutritionSummary.protein,
		config.mealCalculatorMarginLast);

	if (meal) {
		$.each(meal, function() {
			nutritionMeal.calories += this.calories;
			nutritionMeal.protein += this.protein;
			nutritionMeal.fat += this.fat;
			nutritionMeal.carbs += this.carbs;
		});

		nutritionSummary.calories += nutritionMeal.calories;
		nutritionSummary.protein += nutritionMeal.protein;
		nutritionSummary.fat += nutritionMeal.fat;
		nutritionSummary.carbs += nutritionMeal.carbs;

		items.push(meal);
		nutrition.meals.push(nutritionMeal);
	} else {
		return null;
	}

	return { items: items, nutrition: nutrition};
};

var formatDuplicates = function(items) {
	var uniqueItems = [];

	$.each(items, function(i, el){
	    if ($.inArray(el, uniqueItems) === -1) {
			delete el.count;
			uniqueItems.push(el);
		} else {
			var dupeIndex = getIndexOfObjWithOwnAttr(uniqueItems, "name", el.name);

			if (uniqueItems[dupeIndex].count) {
				uniqueItems[dupeIndex].count++;
			} else {
				uniqueItems[dupeIndex].count = 2;
			}
		}
	});

	return uniqueItems;
};

// update this to reflect new items array structure
var displayMeal = function(plan, template, mealsContainer, summary) {
	var totals = { calories: 0, protein: 0, fat: 0, carbs: 0 },
		items = plan.items,
		mealNutrition = plan.nutrition.meals,
		nutritionSummary = plan.nutrition.summary;

	for (i = 0; i < items.length; i++) {
		meal = { id: i + 1, source: items[i][0].source, nutrition: mealNutrition[i], items: formatDuplicates(items[i]) };
		rendered = Mustache.render(template, meal);

		mealsContainer.append(rendered);
	}

	summary.children("#totalCalories").text(nutritionSummary.calories);
	summary.children("#totalProtein").text(nutritionSummary.protein);
	summary.children("#totalFat").text(nutritionSummary.fat);
	summary.children("#totalCarbs").text(nutritionSummary.carbs);
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
		event.preventDefault();

		var calorieTarget = parseInt(desiredCalories.val(), 10),
			proteinTarget = parseInt(desiredProtein.val(), 10) || null,
			mealCount = parseInt(numberOfMeals.val(), 10),
			plan = generateMealPlan(mealCount, calorieTarget, proteinTarget),
			retries = 0;

		if (!plan) {
			while (!plan && retries < config.mealGenerationRetry) {
				retries++;

				plan = generateMealPlan(mealCount, calorieTarget, proteinTarget);
			}
		}

		resetResults(alert, mealsContainer, summary);

		if (!plan) {
			$(".alert-danger").show();
		} else {
			displayMeal(plan, template, mealsContainer, summary);
		}
	});

	numberOfMeals.on("change", function() {
		var mealCount = parseInt($(this).val(), 10);

		form.find("button").text("Generate Meal" + (mealCount > 1 ? "s" : ""));
	});
});
