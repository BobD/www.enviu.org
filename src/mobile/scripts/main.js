requirejs.config({
   paths: {
   	 zepto: 'vendors/zepto.min',
   	 domReady: 'modules/helpers/domready',
   	 text: 'modules/helpers/text',
     underscore: 'vendors/underscore/underscore-min',
     section: 'modules/sections/section',
     fastclick: 'vendors/fastclick'
  },
    shim: {
        'zepto' : {
        	exports: '$'
        }
    },
});

require([
	'!domReady',
	'zepto',
	'section',
	'fastclick'
	], function(domReady, $, section, FastClick) {

	$('html').removeClass('no-js').addClass('js');

	section.init({
		$container: $('body')
	});

	FastClick.attach(document.body);
});