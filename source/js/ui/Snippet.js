Catalog.ui.Snippet = function(data) {
	this.data = data;
}

Catalog.ui.Snippet.prototype = {

	template: `<a class='snippet' href='./card/index.html'>
							<div class='snippet__sizes'>10litri</div>
							<div class='snippet__colors'>
								<ul class='snippet__colors-list'></ul>
							</div>
							<img class='snippet__img'>
							<span class='snippet__title'></span>
							<span class='snippet__price'></span>
						 </a>`,

	colorTemplate: `<li class='snippet__colors-item'></li>`,

	node: null,

	render: function(container) {
		this.node = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.node.querySelector('.snippet__title').textContent = this.data.title;
		this.node.querySelector('.snippet__price').textContent = this.data.price;
		this.node.querySelector('.snippet__img').setAttribute('src', this.data.img);

		if (this.data.colors) this.renderColor(this.data.colors);

		this.node.addEventListener('click', () => {
			this.addStorage(JSON.stringify(this.data));
		});

		container.appendChild(this.node);
	},

	renderColor: function(data) {
		for (var i = 0; i < data.length; i++) {
			var color = new DOMParser().parseFromString(this.colorTemplate, 'text/html').body.firstChild;
					color.style.backgroundColor = data[i];

			this.node.querySelector('.snippet__colors-list').appendChild(color);
		}
	},

	addStorage: function(data) {
		localStorage.setItem('snippet', data);
	}

}