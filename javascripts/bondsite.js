(function() {
	var menuButton = document.getElementById('menu'),
		overlay = document.querySelector('div.overlay-container'),
	    masthead = $('#connect-header'),

		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay()
	{
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	function centerMasthead()
	{
		var mastheadHeight = masthead.height();
		masthead.css({"margin-top": ($(window).height()*0.05) + "px"});
		masthead.css({"height": ($(window).height()*0.95) + "px"});	
	};

	function resizeImages()
	{

		$('.wrapper > .imgcontainer').height($(window).width()*0.390625);
		$('.team').height($(window).width()*0.2734375);
	}

	function isElementInViewport (el)
	{
	    //special bonus for those using jQuery
	    if (el instanceof jQuery) {
	        el = el[0];
	    }

	    var rect = el.getBoundingClientRect();

	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	    );
	}

	function fireIfElementVisible()
	{
	    if (isElementInViewport($('.about')))
	       	removePrompt();
	    else if (isElementInViewport($('#connect-header')))
	       	enablePrompt();
	    else
	    	removePrompt();
	}

	function removePrompt()
	{
		$('.bottom-bar').fadeOut(200);
		$('#topbar').fadeTo(200,0.65);
	}

	function enablePrompt()
	{
		$('.bottom-bar').fadeIn(200);
		$('#topbar').fadeIn(200);
	}

	function smoothScroll()
	{
		$('a[href*=#]:not([href=#])').on('touchstart click', function(e) {
		    e.stopPropagation();
		    e.preventDefault();
		    console.log(e);
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
		    {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length)
		      {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
    		}
  		});
	}

	function init()
	{
		$('.lead').show('slide', {direction:'left', easing:'easeInOutQuart'}, 1200);
		smoothScroll();
		resizeImages();
		$(window).on('DOMContentLoaded load resize scroll', fireIfElementVisible); 
	}

	centerMasthead();

	$(window).resize(function(){
		centerMasthead();
	});

	menuButton.addEventListener('click', toggleOverlay );
	$('.overlay-close, nav ul li a').click(toggleOverlay);
	window.onresize = resizeImages;
	window.onload = init;
})();