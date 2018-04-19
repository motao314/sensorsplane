function cssTransform(el, attr, val) {
	if(!el.transform){
		el.transform = {}
	}
	if(typeof val == "undefined"){
		if(typeof el.transform[attr] == "undefined"){
			switch(attr) {
				case "scale":
				case "scaleX":
				case "scaleY":
					el.transform[attr] = 100;
					break;
				default:
					el.transform[attr] = 0;	
			}
		}
		return el.transform[attr];
	} else {
		var transformVal = "";
		el.transform[attr] = Number(val);
		for(var s in el.transform){
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					transformVal += " "+s+"("+el.transform[s]+"deg)";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					transformVal += " "+s+"("+el.transform[s]+"px)";
					break;
				case "scale":
				case "scaleX":
				case "scaleY":
					transformVal += " "+s+"("+el.transform[s]/100+")";
					break;
			}
		}
		el.style.WebkitTransform = el.style.transform = transformVal;
	}
}
function css(element, attr , val){
	if(attr == "rotate" || attr == "rotateX" 
	|| attr == "rotateY" ||attr == "rotateZ" 
	|| attr == "scale" || attr == "scaleX"
	|| attr == "scaleY" || attr == "skewX"
	|| attr == "skewY" || attr == "translateX"
	|| attr == "translateY" || attr == "translateZ" ){
		return cssTransform(element, attr, val);
	}
	if(arguments.length == 2){
		var val = getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} 
	if(attr == "opacity") {
		element.style.opacity= val/100;
	} else {
		element.style[attr]= val + "px";	
	}
}
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
	                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	        var id = window.setTimeout(function() {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
	    	clearTimeout(id);
		};
	}
}());