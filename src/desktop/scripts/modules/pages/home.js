define(['jquery', 'underscore'], function($, _) {

	var module = {
		init: function(options){
			var $sectionNav = $('.section-nav');
			var $sectionNavLinks = $('.section-nav__link');
			var controller = new ScrollMagic.Controller();

			module.$container = options.$container;

		  	$(window).on('hashchange', function(e) {
		  		var hash = location.hash;
		  		var $target = $(hash);
		  		$sectionNav.find('.active').removeClass('active');
		  		$sectionNav.find('a[href="' + hash + '"]').parent().addClass('active');
			});

			$(window).trigger('hashchange');

		  	$('.scrolldown--effect').click(function(e){
		  		e.preventDefault();

		  		var hash = $(this).attr('href')
		  		var $target = $(hash);

		  		if ($target.length){
		  		 	$('html,body').animate({
	          			scrollTop: $target.offset().top
	        		}, 250, function(){
	        			window.location.hash = hash;
	        		});
		  		}
		  	});


		  	for(var a =0; a < $sectionNavLinks.length; ++a ){
		  		var $link = $($sectionNavLinks[a]);
		  		var hash = $link.attr('href');
		  		var section = $(hash);

		  // 		if(section.length > 0){
		  // 							new ScrollMagic.Scene({
				// 	triggerElement: section,
				// 	triggerHook: 1
			 //    })
			 //    .on("enter", function (event) {
			 //    	console.log('enter section', event.target.triggerElement());
				// })
				// .on("leave", function (event) {
				// })
			 //    .addTo(controller);
		  // 		}

		  	}
		}
	}

	return module;
});