define(['jquery', 'underscore'], function($, _) {

	var module = {

		init: function(options){
			var controller = new ScrollMagic.Controller();
			var sections = $('.section');
			var $section;

			_.each(sections, function(section){
				$section = $(section);
				$section.addClass('section--with-effect');

				new ScrollMagic.Scene({
					triggerElement: section,
					triggerHook: 0.1
			    })
			    .on("enter", function (event) {
			    	$section = $(event.target.triggerElement());
			    	$section.toggleClass('intro', true);
			    	$section.toggleClass('outro', false);
				})
			    .addTo(controller);

			 //    new ScrollMagic.Scene({
				// 	triggerElement: section,
				// 	triggerHook: 0.9
			 //    })
				// .on("leave", function (event) {
				// 	$section = $(event.target.triggerElement());
				// 	$section.toggleClass('intro', false);
			 //    	$section.toggleClass('outro', true);
				// })
			 //    .addTo(controller);
			})
		}

	}

	return module;
});