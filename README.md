simple-keyframe-animation.js
============================

A simple class to help manage keyframe animation with jQuery.

Example
--------
	var div = $('#example')
	var anim = new Animation(div);

	anim.addKeyframe(0, {opacity: 1});
	anim.addKeyframe(200, {opacity: 0});
	anim.addKeyframe(500, {opacity: 1});

	div.click(function() {
		anim.run( function(a) {
			// animation complete
		} );
	});