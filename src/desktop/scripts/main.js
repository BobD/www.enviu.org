requirejs.config({
   paths: {
   	 jquery: 'vendors/jquery/jquery.min',
   	 domReady: 'modules/helpers/domready',
   	 text: 'modules/helpers/text',
     underscore: 'vendors/underscore/underscore-min',
     section: 'modules/sections/section',
     fastclick: 'vendors/fastclick',
     slick: 'vendors/slick.min',
  }
});

require([
	'!domReady',
	'jquery',
	'section',
	'fastclick',
	'slick'
	], function(domReady, $, section, FastClick) {

		$('html').removeClass('no-js').addClass('js');

		section.init({
			$container: $('body')
		});

		FastClick.attach(document.body);

	  	$('.slick-leaderboard').slick({
	  		autoplay: true,
	  		pauseOnHover: true,
	  		autoplaySpeed: 5000
	  	});

	  	$('.slick-caroussel').slick({
		  	lazyLoad: 'ondemand',
		  	slidesToShow: 4,
		  	slidesToScroll: 1,
		  	responsive: [
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1
			      }
			    }
			  ]
	  	});
	}
);