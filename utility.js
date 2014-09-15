var isValid = function(items) {
    return isComboComplete(items);
        // && areDuplicatesUnderThreshold(items);
};

var isComboComplete = function(items) {
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
};

var areDuplicatesUnderThreshold = function(items) {
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
};

var difference = function (a, b) { return Math.abs(a - b) };

var randomizedSubsetSum = function(items, calorieTarget, proteinTarget, margin) {
    var usedItems = [],
        allItems = items.slice(0),
        usedCalorieSum = 0,
        usedProteinSum = 0,
        iterationCount = 0;

    if (proteinTarget <= 0) {
        proteinTarget = null;
    }

    while (iterationCount < config.iterationCount && difference(calorieTarget, usedCalorieSum) > margin && (!proteinTarget || usedProteinSum < proteinTarget)) {
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
};

var getIndexOfObjWithOwnAttr = function(array, attr, value) {
    for (i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }

    return -1;
};
