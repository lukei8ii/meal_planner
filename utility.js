var subset_sum = function(items, target) {
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

                if (Math.abs(sum - target) <= margin){
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

var splitArray = function (a, n) {
    var len = a.length,out = [], i = 0;

    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i + size));
        i += size;
    }

    return out;
}
