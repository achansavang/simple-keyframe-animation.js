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
			if(this.prop[time] === undefined) this.prop[time] = new Object();
			// var data = JSON.parse(properties);
			for(var key in properties) {
				this.prop[time][key] = properties[key];
				this.times.push(time);	// TODO sort insert
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