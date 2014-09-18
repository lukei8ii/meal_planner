var Validation = {
	isInCalorieMargin: function(calories, target, margin) {
		return Utility.difference(calories, target) <= margin;
	},

	isAboveProteinMinimum: function(protein, target) {
		return !target || protein >= target;
	},

	isComboComplete: function(items) {
		if (items.length === 0 || items[0].source !== "Muscle Maker Grill") {
			return true;
		}

		var combos = [],
			wraps = $.grep(items, function(item, i) {
			return ( item.category === "Muscle Maker Wraps" );
		});

		if (wraps.length > 0) {
			combos = $.grep(items, function(item, i) {
				return ( item.combo === "Muscle Maker Wraps" );
			});

			if (combos.length !== wraps.length) {
				return false;
			}
		}

		return true;
	},

	areDuplicatesUnderThreshold: function(items) {
		if (items.length === 0) {
			return true;
		}

		var uniqueItems = [],
			isValid = true;

		$.each(items, function(i, el){
			if ($.inArray(el, uniqueItems) === -1) {
				uniqueItems.push(el);
			} else {
				if (el.calories > config.duplicateThreshold) {
					isValid = false;
					return false;
				}
			}
		});

		return isValid;
	},

	isValid: function(items, calorieSum, calorieTarget, calorieMargin, proteinSum, proteinTarget) {
		return this.isInCalorieMargin(calorieSum, calorieTarget, calorieMargin)
			&& this.isAboveProteinMinimum(proteinSum, proteinTarget)
			&& this.areDuplicatesUnderThreshold(items)
			&& this.isComboComplete(items);
	}
};
