Catalog.ui.Category = function() { }

Catalog.ui.Category.prototype = {

	template: `<div class='category'>
							<span class='category__title'></span>
							<div class='category__main'></div>
						 </div>`,

	node: null,

	render: function(container, data, count) {
		this.node = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.node.querySelector('.category__title').textContent = data.title;
		this.node.setAttribute('data-category', data.title);

		if (container.childNodes.length % 2 !== 0 ) this.node.classList.add('category--rev');

		var slider = new Catalog.ui.Slider();
				slider.render(this.node.querySelector('.category__main'), data.items, count);

		container.appendChild(this.node);
	}

}