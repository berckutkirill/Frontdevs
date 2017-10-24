Catalog.ui.Viewport = function() { };

Catalog.ui.Viewport.prototype = {

	render: function(container, data) {
		
		var filter = new Catalog.ui.Filter();
				filter.render(container, data);
	}

}