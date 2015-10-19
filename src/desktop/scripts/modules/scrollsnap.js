define(['jquery', 'underscore', 'scrollevents'], function($, _, ScrollEvents) {

	var module = {
		
		init: function(options){
			var controller = new ScrollMagic.Controller();
			var $sectionNav = $('.section-nav');
			var $sectionNavLinks = $('.section-nav__link');
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

					$("html, body").stop();
		    		$("html, body").animate({scrollTop:  $snapTarget.offset().top}, 350, function(){
		    			snapInProgress = false;
		    		});

		    		$snapTarget = [];
				}
	         });

		  	for(var a =0; a < scrollSnapSections.length; ++a ){
		  		var section = scrollSnapSections[a];

				new ScrollMagic.Scene({
					triggerElement: section,
					triggerHook: 0.9
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
		}
	}

	return module;
});