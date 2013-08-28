/**
 * @author Anthony Chansavang / http://github.com/achansavang
 */

function Animation(actor){
	this.actor = actor;
	this.prop = new Object();
	this.times = new Array();
	this.is_running = false;
};

Animation.prototype = {
	constructor: Animation,

	addKeyframe: function(time, properties) {
		for(var i in properties) {
			if(this.prop[time] === undefined) 
				this.prop[time] = new Object();

			for(var key in properties) {
				this.prop[time][key] = properties[key];

				// binary search for inserting time
				var left = 0, 
					right = this.times.length-1,
					mid = Math.floor((this.times.length-1)/2);
				var insert = true;
				while(right >= left) {
					mid = left + Math.floor((right-left)/2);
					var elm = this.times[mid];
					if(time > elm) {
						left = mid+1;
					}
					else if(time < elm) {
						right = mid-1;
					}
					else {
						// value already exists
						insert = false;
						break;
					}
				}
				if(insert)
					this.times.splice(Math.max(0,right<mid?mid:left), 0, time);			
			}
		}
	},

	run: function(user_callback) {
		var _this = this;
		var i = 0;

		function callback() {
			i++;
			if(_this.times[i] !== undefined)
				_this.actor.animate( _this.prop[_this.times[i]], _this.times[i+1], callback );
			else
			{
				this.is_running = false;
				if(user_callback !== undefined) user_callback(_this);
			}
		};

		this.is_running = true;
		this.actor.animate( this.prop[this.times[0]], this.times[1], callback );
	},
};