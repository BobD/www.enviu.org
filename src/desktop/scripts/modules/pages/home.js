define(['jquery', 'underscore'], function($, _) {

	var module = {
		init: function(options){
			var $sectionNav = $('.section-nav');
			var $sectionNavLinks = $('.section-nav__link');
			var controller = new ScrollMagic.Controller();

			module.$container = options.$container;

		  	if(!$('body').hasClass('main--is-mobile')){
				var controller = new ScrollMagic.Controller();
				var $sectionNav = $('.section-nav');
			  	var scrollSnapSections = $('.section--scroll-snap');
			  	var $snapTarget = [];
			  	var snapInProgress = false;

			  	$('.leaderboard__scrolldown-link, .section-nav a').on('click', function(e){
			  		e.preventDefault();

			  		$snapTarget = $($(this).attr('href'));
			  		$(window).trigger('scrollstop');
			  	});


				$(window).bind('scrollstart', function(){
					if(!snapInProgress){
						$("html, body").stop();
					}
		         });

				$(window).bind('scrollstop', function(){
					if(!snapInProgress && $snapTarget.length != 0){
						snapInProgress = true;

			    		$("html, body").stop().animate({ scrollTop:  $snapTarget.offset().top }, 500, function(){
			    			snapInProgress = false;
			    		});

			    		$snapTarget = [];
					}
		         });

			  	for(var a =0; a < scrollSnapSections.length; ++a ){
			  		var section = scrollSnapSections[a];

					new ScrollMagic.Scene({
						triggerElement: section,
						triggerHook: 1
				    })
				    .on("enter", function (event) {
				    	$snapTarget = $(event.target.triggerElement());
						$sectionNav.find('.active').removeClass('active');
						$sectionNav.find('[href="#' + $snapTarget.attr('id') + '"]').parent().addClass('active');
					})
				    .addTo(controller);

				    new ScrollMagic.Scene({
						triggerElement: section,
						triggerHook: 0.1
				    })
					.on("leave", function (event) {
						$snapTarget = $(event.target.triggerElement()).prev();

						if($snapTarget.length == 0){
							$snapTarget = $('html');
						};

						$sectionNav.find('.active').removeClass('active');
						$sectionNav.find('[href="#' + $snapTarget.attr('id') + '"]').parent().addClass('active');
					})
				    .addTo(controller);
			  	}


			  // 	var effectSections = $('.section--scroll-effect');
			  // 	var section;

			  // 	for(var a =0; a < effectSections.length; ++a ){
			  // 		section = effectSections[a];

			  // 		$(section).css({
			  // 			top: 150,
			  // 			opacity: 0.5
			  // 		});

					// new ScrollMagic.Scene({
					// 	triggerElement: section,
					// 	triggerHook: 1
				 //    })
				 //    .on("enter", function (event) {
				 //    	animateSectionIn($(event.target.triggerElement()));
					// })
					// .on("leave", function (event) {
					// 	animateSectionOut($(event.target.triggerElement()));
					// })
				 //    .addTo(controller);
			  // 	}

			  // 	function animateSectionIn($section){
				 //    $section.animate({
				 //    	top: 0,
				 //    	opacity: 1
				 //    });
			  // 	}

			  // 	function animateSectionOut($section){
				 //    $section.animate({
					// 	top: 100,
			  // 			opacity: 0
				 //    });
			  // 	}	
		  	}
		}
	}

	return module;
});