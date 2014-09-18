var Utility = {
    difference: function(a, b) {
        return Math.abs(a - b);
    },

    getIndexOfObjWithOwnAttr: function(array, attr, value) {
        for (i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
                return i;
            }
        }

        return -1;
    },

    formatDuplicates: function(items) {
        if (items.length < 2) {
            return items;
        }

        var uniqueItems = [],
            self = this;

        $.each(items, function(index, el){
            if ($.inArray(el, uniqueItems) === -1) {
                delete el.count;
                uniqueItems.push(el);
            } else {
                var dupeIndex = self.getIndexOfObjWithOwnAttr(uniqueItems, "name", el.name);

                if (uniqueItems[dupeIndex].count) {
                    uniqueItems[dupeIndex].count++;
                } else {
                    uniqueItems[dupeIndex].count = 2;
                }
            }
        });

        return uniqueItems;
    }
};
