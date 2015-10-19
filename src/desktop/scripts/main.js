requirejs.config({
   paths: {
   	 jquery: 'vendors/jquery/jquery.min',
   	 domReady: 'vendors/domready',
     underscore: 'vendors/underscore/underscore-min',
     fastclick: 'vendors/fastclick',
     slick: 'vendors/slick.min',
     slideout: 'vendors/slideout.min',
     scrollevents: 'vendors/scrollevents'
  }
});

require([
	'!domReady',
	'jquery',
	'fastclick',
	'slideout',
	'slick',
	], function(domReady, $, FastClick, Slideout) {
		var isMobile = $('body').hasClass('main--is-mobile');

		$('html').removeClass('no-js').addClass('js');
		FastClick.attach(document.body);

		$('.search-open').on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('main--searchbar');
		});


	  	$('.slick-leaderboard').slick({
	  		autoplay: true,
	  		pauseOnHover: true,
	  		autoplaySpeed: 5000
	  	});

	  	// Generate the breakpoints for the carrousel
	  	var startWidth = 600;
	  	var itemWidth = 300;
	  	var responsive = [];

	  	for(var a = 0; a < 20; ++a){
	  		responsive.push({
		      breakpoint: 600 + (a * itemWidth),
		      settings: {
		        slidesToShow: a + 1
		      }
	  		});
	  	}

	  	$('.slick-caroussel').slick({
		  	lazyLoad: 'ondemand',
		  	slidesToShow: 4,
		  	slidesToScroll: 1,
		  	responsive: responsive
	  	});

	  	if(isMobile){
			// See Mobile menu, see https://mango.github.io/slideout/
	  		var slideout = new Slideout({
		    	'panel': document.getElementById('slideout-panel'),
		    	'menu': document.getElementById('slideout-menu'),
		    	'padding': 256,
		    	'tolerance': 70,
		    	'side': 'right'
		  	});

		    $('.slideout-toggle').on('click', function(e) {
		    	e.preventDefault();
		        slideout.toggle();

		        $(this).find('.icon').toggleClass('fa-bars');
		        $(this).find('.icon').toggleClass('fa-times');
		    });

		}else{
			$('a[href="#off-canvas"], a[href="#off-canvas-up"]').on('click', function(e){
				e.preventDefault();
				$('body').toggleClass('main--off-canvas');
			});

			if($('.main').hasClass('main--home')){
				require(['modules/effects'], function (effects) {
					effects.init();				
				});

				require(['modules/scrollsnap'], function (scrollSnap) {
					scrollSnap.init();				
				});
			}
		}
	}
);