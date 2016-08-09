
define(function(require,exports,module){
	
	var base = {
		extend:function (obj1,obj2){
			for(var k in obj2){
				obj1[k] = obj2[k]
			}
		},
		angleToRad:function (angle){
			return Math.PI / 180 * angle
		},

		loadImg:function (obj,fn){
			var total = 0, count = 0;
			var resultObj = {}
			for(var k in obj){
				var img = new Image()
				img.addEventListener("load",function(){
					count++
					if(total === count){
						if(typeof fn === "function"){
							fn(resultObj)
						}
					}
				});
				img.src = obj[k]
				total++
				resultObj[k] = img
			}
		},
	}
	module.exports = base;

})