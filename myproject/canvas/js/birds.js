define(function(require,exports,module){
	var baseObj = require('./base');

	var resultObj = {};
	/*
		小鸟
	*/
	resultObj.Bird = init;
	function Bird(x,y,width,height){
		if(!Bird.Success){
			throw new Error("错误");
		}
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.index = 0;
		this.speed = 1;
		this.speedPlus = 0.1;
	}
	function init(dom,x,y,width,height){
		Bird.img = dom;
		Bird.IMG_WIDTH = dom.width / 3;
		Bird.IMG_HEIGHT = dom.height;
		Bird.Success = true;

		return new Bird(x,y,width,height);
	}

	baseObj.extend(Bird.prototype,{
		draw:function(canvas){
			canvas.save();
			var pointX = this.x + this.width/2;
			var pointY = this.y + this.height/2;
			canvas.translate(pointX,pointY);
			var angle = (this.speed * 5);
			var angle = angle >= 30 ? 30 :angle;
			canvas.rotate(baseObj.angleToRad(angle));

			canvas.drawImage(Bird.img,this.index * this.width,0,Bird.IMG_WIDTH,Bird.IMG_HEIGHT,
					-this.width/2,-this.height/2,this.width,this.height);
			canvas.restore();
		},
		update:function(){

			this.index = ++this.index % 3;
			this.y += this.speed;
			this.speed += this.speedPlus;
		}
	});
	/*
		天空
	*/
	resultObj.Sky = initSky;
	function Sky(x,y){
		if(!Sky.Success){
			throw new Error("错误");
		}
		this.x = x || 0;
		this.y = y || 0;
		this.speed = -3;
		this.speedPlus = -0.00;
	}

	function initSky(dom,x,y){
		Sky.sky = dom;
		Sky.WIDTH = dom.width;
		Sky.Success = true;
		return new Sky(x,y);
	}

	baseObj.extend(Sky.prototype,{
		draw:function(canvas){
			canvas.drawImage(Sky.sky,this.x,this.y);
		},
		update:function(){
			this.x += this.speed;
			this.speed += this.speedPlus;
			if(this.x <= - Sky.WIDTH){
				this.x = this.x + Sky.WIDTH * 2;
			}
		}
	});


	/*
		大地
	*/
	resultObj.Land = initLand;
	function Land(x,y){
		if(!Land.Success){
			throw new Error("错误");
		}
		this.x = x || 0;
		this.y = y || 0;
		this.speed = -3;
		this.speedPlus = -0.00;
	}

	function initLand(dom,x,y){
		Land.img = dom;
		Land.WIDTH = dom.width;
		Land.Success = true;
		return new Land(x,y);
	}
	baseObj.extend(Land.prototype,{
		draw:function(canvas){
			canvas.drawImage(Land.img,this.x,this.y);
		},
		update:function(){
			this.x += this.speed;
			this.speed += this.speedPlus;
			if(this.x <= - Land.WIDTH){
				this.x += Land.WIDTH * 4;
			}
		}
	});

	/*
		管道
	*/
	resultObj.Pipe = initPipe;
	function Pipe(x){
		if(!Pipe.Success){
			throw new Error("错误");
		}
		this.x = x || 100;
		this.random = Math.random() * 300 + 80;
		this.y_down = - this.random;
		this.y_up =  (Pipe.HEIGHT - this.random) + 120;

		this.width = Pipe.WIDTH;
		this.height = Pipe.HEIGHT;

		this.speed = -3;
		this.speedPlus = -0.00;
	}

	function initPipe(domDown,domUp,x){
		Pipe.img_down = domDown;
		Pipe.img_up = domUp;

		Pipe.WIDTH = domDown.width;
		Pipe.HEIGHT = domDown.height
		Pipe.Success = true;
		return new Pipe(x);
	}
	baseObj.extend(Pipe.prototype,{
		draw:function(canvas){
			this.drawPipePath(canvas);
			canvas.drawImage(Pipe.img_down,this.x,this.y_down,this.width,this.height);
			canvas.drawImage(Pipe.img_up,this.x,this.y_up,this.width,this.height);
			
		},
		drawPipePath:function(canvas){

			canvas.rect(this.x,this.y_down,this.width,this.height);
			canvas.rect(this.x,this.y_up,this.width,this.height);
		},
		update:function(){
			this.x += this.speed;
			this.speed += this.speedPlus;
			
			if(this.x <= - Pipe.WIDTH){
				this.x += ((Pipe.WIDTH - 2) * 4) * 5;

				this.random = Math.random() * 300 + 80;
				this.y_down = - this.random;
				this.y_up =  (Pipe.HEIGHT - this.random) + 120;
			}
		}
	});

	module.exports = resultObj;
});