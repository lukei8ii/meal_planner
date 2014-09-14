var db = TAFFY();

if (RawItemData) {
	$.each(RawItemData, function(source, items) {
		// add the source to each item
		$.each(items, function() {
			this.source = source;
		});

		db.insert(items);
	});
}
