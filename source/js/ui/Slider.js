Catalog.ui.Slider = function() { }

Catalog.ui.Slider.prototype = {

	template: `<div class='slider'>
							<div class='slider__head'></div>
							<div class='slider__main'>
								<ul class='slider__list'></ul>
							</div>
						 </div>`,

	headTemplate: `<div class='slider__head-aside'>
											<div class='slider__pages'>
												<span class='slider__pages-page'>1</span>
												<span class='slider__pages-sl'>/</span>
												<span class='slider__pages-allpage'></span>
											</div>
											<div class='slider__controls'>
												<div class='slider__controls-item prev'>
													<svg class='svg svg-arrow-1' viewBox="0 0 10.031 12">
														<path transform="translate(-102 -1025)" d="M111.856,1027.04a0.4,0.4,0,0,0,0-.67l-1.611-1.24a0.773,0.773,0,0,0-.873,0l-7.2,5.53a0.4,0.4,0,0,0,0,.67l7.2,5.52a0.74,0.74,0,0,0,.873,0l1.611-1.23a0.4,0.4,0,0,0,0-.67l-5.152-3.96Z"></path>
													</svg>
												</div>
												<div class='slider__controls-item next'>
													<svg class='svg svg-arrow-1' viewBox="0 0 10.031 12">
														<path transform="translate(-102 -1025)" d="M111.856,1027.04a0.4,0.4,0,0,0,0-.67l-1.611-1.24a0.773,0.773,0,0,0-.873,0l-7.2,5.53a0.4,0.4,0,0,0,0,.67l7.2,5.52a0.74,0.74,0,0,0,.873,0l1.611-1.23a0.4,0.4,0,0,0,0-.67l-5.152-3.96Z"></path>
													</svg>
												</div>
											</div>
										</div>`,

	slideTemplate: `<li class='slider__item'></li>`,

	node: null,

	/* count Slides
	===============*/
	slideCount: null,

	/* count Snippet
	================*/
	snippetCount: null,

	/* nodes all Slides
	===================*/
	slides: null,

	/* active Slide
	===============*/
	active: 1,

	/* next show Slide
	==================*/
	next: null,

	/* node active Slide
	===============*/
	nodeActiveSlide: null,

	/* move value
	=============*/
	move: false,

	render: function(container, data, count) {
		this.node = new DOMParser().parseFromString(this.template, 'text/html').body.firstChild;
		this.snippetCount = count;

		this.renderHead(data.length);
		this.renderSlides(data);

		this.slides = this.node.querySelectorAll('.slider__item');

		container.appendChild(this.node);
	},

	renderHead: function(length) {
		this.slideCount = Math.ceil(length / this.snippetCount);

		if (this.slideCount === 1) return;
		
		var head = new DOMParser().parseFromString(this.headTemplate, 'text/html').body.firstChild;
				head.querySelector('.slider__pages-allpage').textContent = this.slideCount;

				head.querySelector('.slider__controls-item.next').addEventListener('click', this.nextSlide.bind(this));
				head.querySelector('.slider__controls-item.prev').addEventListener('click', this.prevSlide.bind(this));

		this.nodeActiveSlide = head.querySelector('.slider__pages-page');

		this.node.querySelector('.slider__head').appendChild(head);
	},

	renderSlides: function(data) {
		for (var i = 0; i < this.slideCount; i++) {
			var slide = new DOMParser().parseFromString(this.slideTemplate, 'text/html').body.firstChild;
			
			if (this.snippetCount === 3) slide.style.justifyContent = 'space-between'; 
			if (i === 0) slide.classList.add('active');

			for (var j = 0; j < this.snippetCount; j++) {
				var index = j + i * this.snippetCount;

				if (index >= data.length) return;

				var snippet = new Catalog.ui.Snippet(data[index]);
						snippet.render(slide);

				this.node.querySelector('.slider__list').appendChild(slide);
			}	
		}
	},

	moveEnd: function() {
		this.slides[this.next - 1].classList.add(direct);
		this.slides[this.active - 1].classList.add(direct);
	},

	moveStart: function(direct) {
		this.slides[this.next - 1].classList.add(direct);
		this.slides[this.active - 1].classList.add(direct);

		setTimeout(() => {
			this.slides[this.next - 1].classList.remove(direct);
			this.slides[this.next - 1].classList.add('active');

			this.slides[this.active - 1].classList.remove(direct);
			this.slides[this.active - 1].classList.remove('active');

			this.active = this.next;

			this.move = false;
		}, 1000);
	},

	nextSlide: function() {
		if(this.move) return;

		this.move = true;

		this.next = this.active + 1 <= this.slideCount ? this.active + 1 : 1;	

		this.moveStart('next');
		this.nodeActiveSlide.textContent = this.next;
	},

	prevSlide: function() {
		if(this.move) return;

		this.move = true;

		this.next = this.active - 1 >= 1 ? this.active - 1 : this.slideCount;

		this.moveStart('prev');
		this.nodeActiveSlide.textContent = this.next;
	}

}