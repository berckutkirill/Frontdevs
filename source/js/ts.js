Catalog = {};

Catalog.ui = {};





Catalog.ui.prodSection = function(data) {
	this.data = data;
}

Catalog.ui.prodSection.prototype = {

	template:  `<div class='catalog'></div>`,

	templateItem:  `<section class='product-section'>
										<span class='product-section__title'></span>
										<div class='product-section__main'></div>
									</section>`,

	// templateName:  `<span class='product-section__title'></span>`,

	el: null,

	renderTo: function(container) {
		this.el = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.renderItem(this.data);

		container.appendChild(this.el);
	},

	renderItem: function(data) {
		for (var i = 0; i < data.length; i++) {
			var category = new DOMParser().parseFromString(this.templateItem, 'text/html').body.firstChild;
					category.querySelector('.product-section__title').textContent = data[i].category;

			if (i % 2 !== 0) category.classList.add('product-section--rev');

			this.el.appendChild(category);
		}
	}

	// renderName: function(value) {
	// 	var title = new DOMParser().parseFromString(this.templateItem, 'text/html').body.firstChild;
	// 			title.textContent = value;

	// 	this.el.document.querySelector('.product-section__head');
	// }
}





Catalog.ui.NavPanel = function(data) {
	this.data = data;
};

Catalog.ui.NavPanel.prototype = {

	template:   `<div class='filter'>
								<div class='filter__controls'>
									<ul class='filter__controls-list'></ul>
								</div>
								<div class='filter__select'>
									<button class='filter__select-but button'>See all products</button>
								</div>
							</div>`,

	itemsTemplate:  `<li class='filter__controls-item'>
										<label class='checkbox'>
											<input class='checkbox__input' type='checkbox'>
											<div class='checkbox__box'>
												<div class='checkbox__box-svg'>
													<svg class='svg svg-checked'>
														<use xlink:href='./svg/sprite.svg#checked'></use>
													</svg>
												</div>
											</div>
											<span class='checkbox__label'></span>
										</label> 
									</li>`,

	el: null,

	renderTo: function(container) {
		this.el = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.renderCategory(this.data);

		// this.el.querySelector('.filter__select-but').addEventListener('click', function() {
		// 	this.selectAll(this.el.querySelectorAll('.checkbox__input'));
		// }.bind(this));

		container.appendChild(this.el);
	},

	renderCategory: function(content) {
		var parent = this.el.querySelector('.filter__controls-list');

		for (var i = 0; i < content.length; i++) {
			var category = new DOMParser().parseFromString(this.itemsTemplate, 'text/html').body.firstChild;
					category.querySelector('.checkbox__label').textContent = content[i];

			parent.appendChild(category);
		}
	}

	// selectAll: function(arr) {
	// 	for (var i = 0; i < arr.length; i++) {
	// 		arr[i].checked = true;
	// 	}
	// }
}