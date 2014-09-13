var isValid = function(items) {
    return isComboComplete(items)
        && areDuplicatesUnderThreshold(items);
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

var subsetSum = function(items, calorieTarget) {
    items = shuffleArray(items);

    var perms = [],
    margin = config.calorieMatchMargin,
    depth = config.calorieMatchDepth,
    layer = 0,
    attempts = 0,
    sum,
    perm,
    ss = function(items) {
        var item = items.shift();

        for (i = 0; i < items.length; i++) {
            attempts = attempts + 1;

            if (attempts <= items.length * items.length) {
                if (layer === 0) {
                    perm = [items[0], items[i]];
                } else {
                    perm = perms.shift();
                    perm.push(items[0]);
                }

                sum = 0;

                for (j = 0; j < perm.length; j++){
                    sum += perm[j].calories;
                }

                perms.push(perm);

                if (Math.abs(sum - calorieTarget) <= margin) {
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
}
