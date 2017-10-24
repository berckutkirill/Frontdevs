Catalog.ui.Card = function() { }

Catalog.ui.Card.prototype = {

	template: `<div class="card">
							<div class="card__tovar">
								<img class="card__tovar-img"/>
							</div>
							<div class="card__desc">
								<ul class="card__desc-list">
									<li class="card__desc-item card__desc-price"></li>
									<ul class="card__desc-item card__desc-colors"></ul>
									<li class="card__desc-item card__desc-sizes"></li>
								</ul>
								<ul class="card__desc-list">
									<li class="card__desc-item">price</li>
									<li class="card__desc-item">colors</li>
									<li class="card__desc-item">sizes</li>
								</ul>
							</div>
						 </div>`,

	templateColor: `<li class="card__desc-color"></li>`,

	render: function(container, data) {
		var node = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
				node.querySelector('.card__tovar-img').setAttribute('src', '.' + data.img);
				node.querySelector('.card__desc-price').textContent = data.price;
				node.querySelector('.card__desc-sizes').textContent = data.sizes.toString();

				document.querySelector('.tovar__title-value').textContent = data.title;

				if (data.colors) this.renderColor(node.querySelector('.card__desc-colors'), data.colors);

				container.appendChild(node);
	},

	renderColor: function(container, data) {
		for (var i = 0; i < data.length; i++) {
			var color = new DOMParser().parseFromString(this.templateColor, 'text/html').body.firstChild;
					color.style.backgroundColor = data[i];

					container.appendChild(color);
		}
	}

}