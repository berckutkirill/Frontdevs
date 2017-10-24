Catalog.ui.Filter = function() { };

Catalog.ui.Filter.prototype = {

	/*template "FILTER MAIN"
	=======================*/
	template: `<div class='filter'>
							<div class='filter__controls'>
								<ul class='filter__controls-list'></ul>
							</div>
							<div class='filter__select'>
								<button class='filter__select-but button'>See all products</button>
							</div>
						 </div>`,

	/*template "FILTER ITEM"
	=======================*/
	filterTemplate: `<li class='filter__controls-item'>
										<label class='checkbox'>
											<input class='checkbox__input' type='checkbox'>
											<div class='checkbox__box'>
												<div class='checkbox__box-svg'>
													<svg class='svg svg-checked'>
														<path d="M234,187.343a1,1,0,0,0-.271-0.687l-1.316-1.374a0.909,0.909,0,0,0-1.316,0l-6.35,6.637-2.846-2.98a0.906,0.906,0,0,0-1.316,0l-1.316,1.374a1.006,1.006,0,0,0,0,1.374l3.5,3.656,1.317,1.374a0.906,0.906,0,0,0,1.316,0l1.317-1.374,7.007-7.313A1,1,0,0,0,234,187.343Z" transform="translate(-219 -185)"></path>
													</svg>
												</div>
											</div>
											<span class='checkbox__label'></span>
										</label> 
									 </li>`,

	/*arguments "ENTRY and DATA"
	===========================*/
	container: null,
	data: null,

	/*element "FILTER"
	=================*/
	node: null,

	/*entry "CATEGORYS"
	==================*/
	categoryEntry: null,

	/*timer "SLIDER"
	===============*/
	timer: null,

	/*all filters
	===================*/
	checkboxes: null,

	/*snippets in slide
	===================*/
	snippetCount: null,

	render: function(container, data) {
		this.node          = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.container     = container;
		this.categoryEntry = container.querySelector('.categories-container');
		this.data          = data;
		
		this.snippetCount = this.checkSnippetCount();

		this.renderItem(this.node, data);

		var sort = document.querySelectorAll('.sort__item');

		for (var i = 0; i < sort.length; i++) {
			sort[i].addEventListener('change', function(e) {
				this.sort(e.target.getAttribute('id'));
				this.renderSorting();
			}.bind(this));
		}

		window.addEventListener('resize', this.checkWidthWindow.bind(this));

		container.querySelector('.filter-container').appendChild(this.node);
	},

	renderItem: function(container, data) {
		var entry = container.querySelector('.filter__controls-list');

		for (var i = 0; i < data.category.length; i++) {
			var itemFilter = new DOMParser().parseFromString(this.filterTemplate, 'text/html').body.firstChild;

			itemFilter.querySelector('.checkbox__label').textContent = data.category[i].title;
			itemFilter.querySelector('.checkbox__input').setAttribute('data-category', data.category[i].title);
			itemFilter.querySelector('.checkbox__input').addEventListener('change', () => {
				this.changeCategory(this.checkboxes);
			});

			if (data.category[i].checked) {
				itemFilter.querySelector('.checkbox__input').checked = true;

				var category = new Catalog.ui.Category();
						category.render(this.categoryEntry, data.products[i], this.snippetCount);
			}

			entry.appendChild(itemFilter);
		}

		this.checkboxes = entry.querySelectorAll('.checkbox__input');

		container.querySelector('.filter__select-but').addEventListener('click', () => {
			this.selectAllCategory(entry.querySelectorAll('.checkbox__input'));
		});
	},

	selectAllCategory: function(list) {
		if (Array.prototype.every.call(list, (item) => item.checked)) return;

		this.categoryEntry.innerHTML = null;

		for (var i = 0; i < list.length; i++) {
			list[i].checked = true;

			var category = new Catalog.ui.Category(this.data.products[i], this.snippetCount);
					category.render(this.categoryEntry, this.data.products[i], this.snippetCount);
		}

	},

	changeCategory: function(list) {
		this.categoryEntry.innerHTML = null;

		for (var i = 0; i < list.length; i++) {
			if (list[i].checked) {
				var category = new Catalog.ui.Category();
						category.render(this.categoryEntry, this.data.products[i], this.snippetCount);
			} 
		}

	},

	checkSnippetCount: function() {
		var entryWidth   = this.categoryEntry.offsetWidth,
				snippetCount = entryWidth >= 1000 ? 3 : entryWidth >= 660 && entryWidth <= 1000 ? 2 : 1;

		return snippetCount;
	},

	checkWidthWindow: function(e) {
		this.timer = this.timer || setTimeout(() => {
			this.timer = null;

			var snippetCount = this.checkSnippetCount();

			if (snippetCount === this.snippetCount) return;

			this.snippetCount = snippetCount;

			// this.changeCategory(this.checkboxes);

			this.renderSorting();
		}, 150)
	},

	renderSorting: function() {
		for (var i = 0; i < this.checkboxes.length; i++) {
			if (this.checkboxes[i].checked) {
				var entry = this.categoryEntry.querySelector(`.category[data-category="${this.checkboxes[i].getAttribute('data-category')}"]`).querySelector('.category__main');
						entry.innerHTML = null;

				var slider = new Catalog.ui.Slider();
						slider.render(entry, this.data.products[i].items, this.snippetCount);
			} 
		}
	},

	sort: function(param) {
		var sortFunc;

		if (param === 'title') {
			sortFunc = function(a, b) {
				if (a.title > b.title) return 1;
				if (a.title < b.title) return -1;
				return 0;
			}
		} else if (param === 'price') {
			sortFunc = function(a, b) {
				return parseInt(a.price) - parseInt(b.price);
			}
		}

		for (var i = 0; i < this.data.products.length; i++) {
			this.data.products[i].items.sort(sortFunc);
		}

		// this.renderSorting();
	}
}