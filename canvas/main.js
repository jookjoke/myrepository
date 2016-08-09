define(funtion(require,exports,module){

	var baseObj = require('./base');

	var canvas = document.getElementById("cans");
	var ctx = canvas.getContext("2d");
	var bird,sky,land,pipe;
	var flyBird={
		"birds":"./images/birds.png",
		"pipeUp":"./images/pipeUp.png",
		"pipeDown":"./images/pipeDown.png",
		"land":"./images/land.png",
		"sky":"./images/sky.png"
	}

	console.log(baseObj);

	baseObj.loadImg(flyBird,function(obj){
		bird = init(obj["birds"],10,10,52,48);
		var skyArr = [];
		for (var i = 0; i < 2; i++) {
			sky = initSky(obj["sky"],obj["sky"].width * i);
			skyArr.push(sky);
		}

		var length = Math.ceil(canvas.width / obj["land"].width)+1
		var landArr = [];
		for (var i = 0; i < length; i++) {
			land = initLand(obj["land"],obj["land"].width * i,canvas.height - obj["land"].height);
			landArr.push(land);
		}

		var pipeArr = [];
		for (var i = 0; i < 5; i++) {
			pipe = initPipe(obj["pipeDown"],obj["pipeUp"],200+((obj["pipeDown"].width - 2)* 4 * i));
			pipeArr.push(pipe);	
		}
		

		var timer = setInterval(function(){

			
			if(ctx.isPointInPath(bird.x + bird.width/2,bird.y + bird.height/2)){
				clearInterval(timer);
			}
			ctx.beginPath();
			ctx.clearRect(0,0,canvas.width,canvas.height);
			for (var i = 0; i < skyArr.length; i++) {
				skyArr[i].draw(ctx);
				skyArr[i].update();
			}

			
			for (var i = 0; i < pipeArr.length; i++) {
				pipeArr[i].draw(ctx);
				pipeArr[i].update();
			}
			for (var i = 0; i < landArr.length; i++) {
				landArr[i].draw(ctx);
				landArr[i].update();
			}
			bird.draw(ctx);
			bird.update();
		},15)
		
	})
	
	canvas.addEventListener("click",function(){
		bird.speed = -2;
	})
});