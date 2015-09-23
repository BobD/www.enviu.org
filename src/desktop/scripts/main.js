requirejs.config({
   paths: {
   	 jquery: 'vendors/jquery/jquery.min',
   	 domReady: 'modules/helpers/domready',
   	 text: 'modules/helpers/text',
     underscore: 'vendors/underscore/underscore-min',
     home: 'modules/pages/home',
     fastclick: 'vendors/fastclick',
     slick: 'vendors/slick.min'
  }
});

require([
	'!domReady',
	'jquery',
	'home',
	'fastclick',
	'slick'
	], function(domReady, $, home, FastClick) {
		$('html').removeClass('no-js').addClass('js');

		home.init({
			$container: $('body')
		});

		FastClick.attach(document.body);

		$('.search-open').on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('main--searchbar');
		});

		$('a[href="#off-canvas"], a[href="#off-canvas-up"]').on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('main--off-canvas');
		});

	  	$('.slick-leaderboard').slick({
	  		autoplay: true,
	  		pauseOnHover: true,
	  		autoplaySpeed: 5000
	  	});

	  	// Refer to  scss/helpers/_variables.scss for the breakpoint values
	  	$('.slick-caroussel').slick({
		  	lazyLoad: 'ondemand',
		  	slidesToShow: 4,
		  	slidesToScroll: 1,
		  	responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 3
			      }
			    },
			   	{
			      breakpoint: 900,
			      settings: {
			        slidesToShow: 2
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1
			      }
			    }
			  ]
	  	});

	  	var controller = new ScrollMagic.Controller();
	  	var effectSections = $('.scroll--effect');
	  	var section;

	  	for(var a =0; a < effectSections.length; ++a ){
	  		section = effectSections[a];

	  		$(section).css({
	  			top: 150,
	  			opacity: 0.5
	  		});

			new ScrollMagic.Scene({
				triggerElement: section,
				triggerHook: 1
		    })
		    .on("enter", function (event) {
		    	animateSectionIn($(event.target.triggerElement()));
			})
			.on("leave", function (event) {
				animateSectionOut($(event.target.triggerElement()));
			})
		    .addTo(controller);
	  	}

	  	function animateSectionIn($section){
		    $section.animate({
		    	top: 0,
		    	opacity: 1
		    });
	  	}

	  	function animateSectionOut($section){
		    $section.animate({
				top: 100,
	  			opacity: 0
		    });
	  	}

	}
);