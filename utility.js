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
        unusedItems = items.slice(0),
        usedCalorieSum = 0,
        usedProteinSum = 0,
        iterationCount = 0;

    if (proteinTarget <= 0) {
        proteinTarget = null;
    }

    while (iterationCount < config.iterationCount && difference(calorieTarget, usedCalorieSum) > margin && (!proteinTarget || usedProteinSum < proteinTarget)) {
        iterationCount++;

        if (usedCalorieSum < calorieTarget) {
            // move a random item from unusedItems to usedItems and update usedCalorieSum and usedProteinSum
            var item = unusedItems.splice(Math.floor(Math.random()*unusedItems.length), 1)[0];

            if (!item) {
                return null;
            }

            usedCalorieSum += item.calories;
            usedProteinSum += item.protein;

            usedItems.push(item);
        } else {
            // move a random item from usedItems to unusedItems and update usedCalorieSum and usedProteinSum
            var item = usedItems.splice(Math.floor(Math.random()*usedItems.length), 1)[0]

            usedCalorieSum -= item.calories;
            usedProteinSum -= item.protein;

            unusedItems.push(item);
        }
    }

    if (iterationCount >= config.iterationCount || usedItems.length === 0) {
        return null;
    }

    return usedItems;
};

var subsetSum = function(calorieTarget, proteinTarget, margin, source) {
    if (proteinTarget <= 0) {
        proteinTarget = null;
    }

    var items = shuffleArray(db({source: source}).get()),
    perms = [],
    depth = config.calorieMatchDepth,
    layer = 0,
    attempts = 0,
    sum,
    perm,
    ss = function(items) {
        var item = items.shift();

        if (item) {
            meetsCalorieRequirement = Math.abs(item.calories - calorieTarget) <= margin,
            meetsProteinRequirement = !proteinTarget || item.protein >= proteinTarget;

            if (meetsCalorieRequirement && meetsProteinRequirement) {
                return [item];
            }
        }

        for (i = 0; i < items.length; i++) {
            attempts = attempts + 1;

            if (attempts <= items.length * items.length) {
                if (layer === 0) {
                    perm = [items[0], items[i]];
                } else {
                    perm = perms.shift();
                    perm.push(items[0]);
                }

                calorieSum = 0,
                proteinSum = 0;

                for (j = 0; j < perm.length; j++){
                    calorieSum += perm[j].calories;
                    proteinSum += perm[j].protein;
                }

                perms.push(perm);

                meetsCalorieRequirement = Math.abs(calorieSum - calorieTarget) <= margin,
                meetsProteinRequirement = !proteinTarget || proteinSum >= proteinTarget;

                if (meetsCalorieRequirement && meetsProteinRequirement) {
                    if (isValid(perm)) {
                        return perm;
                    }
                }
            } else {
                if (layer < depth) {
                    attempts = 0;
                    layer = layer + 1;
                } else {
                    return null;
                }
            }
        }

        items.push(item);

        return ss(items);
    }

    return ss(items);
};

var compareCaloriesDesc = function (a,b) {
    if (a.calories < b.calories)
        return 1;
    if (a.calories > b.calories)
        return -1;

    return 0;
}

var partitionMeals = function(items, partitions) {
    var out = [],
        sums = [];

    for (i = 0; i < partitions; i++) {
        out[i] = [];
        sums[i] = 0;
    }

    items = items.sort(compareCaloriesDesc);

    $.each(items, function() {
        var minSum = Math.min.apply(null, sums),
            mealIndex = sums.indexOf(minSum);

        out[mealIndex].push(this);
        sums[mealIndex] += this.calories;
    });

    return shuffleArray(out);
};

var shuffleArray = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var getIndexIfObjWithOwnAttr = function(array, attr, value) {
    for (i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }

    return -1;
};
