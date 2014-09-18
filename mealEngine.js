var MealEngine = {
	getMeals: function(calorieTarget, proteinTarget, mealTarget) {
		var averageMealCals = Math.round(calorieTarget / mealTarget),
			averageMealProtein = Math.round(proteinTarget / mealTarget),
			sources = Object.keys(RawItemData),
			selectedSources = [],
			meals = [],
			nutritionSummary = { calories: 0, protein: 0, fat: 0, carbs: 0 },
			nutrition = { summary: nutritionSummary, meals: [] },
			meal;

		// choose some meal sources
		for (i = 0; i < mealTarget; i++) {
			selectedSources[i] = sources[Math.floor(Math.random()*sources.length)];
		}

		// choose items for the meals
		for (i = 0; i < mealTarget; i++) {
			var nutritionMeal = { calories: 0, protein: 0, fat: 0, carbs: 0 },
				calorieTargetMeal,
				proteinTargetMeal,
				marginMeal;

			if (i < mealTarget -1) {
				calorieTargetMeal = averageMealCals;
				proteinTargetMeal = averageMealProtein;
				marginMeal = config.mealCalculatorMargin;
			} else {
				calorieTargetMeal = calorieTarget - nutritionSummary.calories;
				proteinTargetMeal = proteinTarget - nutritionSummary.protein;
				marginMeal = config.mealCalculatorMarginLast;
			}

			meal = this.getMeal(db({source: selectedSources[i]}).get(),
				calorieTargetMeal,
				proteinTargetMeal,
				marginMeal);

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

				meals.push(meal);
				nutrition.meals.push(nutritionMeal);
			} else {
				return null;
			}
		}

		return { meals: meals, nutrition: nutrition};
	},

	getMeal: function(items, calorieTarget, proteinTarget, margin) {
		var usedItems = [],
			allItems = items.slice(0),
			usedCalorieSum = 0,
			usedProteinSum = 0,
			iterationCount = 0;

		if (proteinTarget <= 0) {
			proteinTarget = null;
		}

		while (iterationCount < config.iterationCount && !Validation.isValid(usedItems, usedCalorieSum, calorieTarget, margin, usedProteinSum, proteinTarget)) {
			iterationCount++;

			if (usedCalorieSum < calorieTarget) {
				var item = allItems[Math.floor(Math.random()*allItems.length)];

				if (!item) {
					return null;
				}

				usedCalorieSum += item.calories;
				usedProteinSum += item.protein;

				usedItems.push(item);
			} else {
				var item = usedItems.splice(Math.floor(Math.random()*usedItems.length), 1)[0];

				usedCalorieSum -= item.calories;
				usedProteinSum -= item.protein;
			}
		}

		if (iterationCount >= config.iterationCount || usedItems.length === 0) {
			return null;
		}

		return usedItems;
	}
};
