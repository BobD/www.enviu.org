requirejs.config({
   paths: {
   	 jquery: 'vendors/jquery/jquery.min',
   	 domReady: 'modules/helpers/domready',
   	 text: 'modules/helpers/text',
     underscore: 'vendors/underscore/underscore-min',
     routes: 'modules/routes',
     section: 'modules/sections/section'
  }
});

require([
	'!domReady',
	'jquery',
	'routes',
	'section'
	], function(domReady, $, routes, section) {
		$('html').removeClass('no-js').addClass('js');

		section.init({
			$container: $('body')
		});

		routes.init({});

	}
);