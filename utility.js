var subsetSum = function(items, target) {
    items = shuffleArray(items);

    var perms = [],
    margin = config.calorieMatchMargin,
    depth = config.calorieMatchDepth,
    duplicateThreshold = config.duplicateThreshold,
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
                    if (i > 0 || items[0].calories <= duplicateThreshold) {
                        perm = [items[0], items[i]];
                    } else {
                        continue;
                    }
                } else {
                    perm = perms.shift();
                    perm.push(items[0]);
                }

                sum = 0;

                for (j = 0; j < perm.length; j++){
                    sum += perm[j].calories;
                }

                perms.push(perm);

                if (Math.abs(sum - target) <= margin) {

                    return perm;
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

var splitArray = function(a, n) {
    var len = a.length,out = [], i = 0;

    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i + size));
        i += size;
    }

    return out;
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
