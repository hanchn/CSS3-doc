(function(){
	//setLoding();
	anmt5();
})();
/* 做图片预加载 */
document.addEventListener('touchstart', function(e) {
	e.preventDefault();
});
function setLoding(){
	var logoText = document.querySelector('.logoText');
	var data = [];
	var nub = 0;
	for(var s in imgData) {
		//console.log(imgData[s]);
		data = data.concat(imgData[s]);
	}
	for(var i = 0; i < data.length; i++){
		var img = new Image();
		img.src = data[i];
		img.onload = function(){
			nub++;
			//console.log(Math.floor(nub/data.length*100));
			logoText.innerHTML = "已加载 "+(Math.floor(nub/data.length*100))+"%";
			if(nub == data.length){
				//图片加载完成之后，要做的事情
				anmt();
			}
		};
	}
}
/* 隐藏loding动画，开始让logo2显示出来 */
function anmt(){
	var view = document.querySelector('#view');
	var logo1 = document.querySelector('#logo1');
	var logo2 = document.createElement("div");
	var logo3 = document.createElement("div");
	var img = new Image();
	var img2 = new Image();
	img.src = imgData.logo[0];
	img2.src = imgData.logo[1];
	logo2.id = "logo2";
	logo3.id = "logo3";
	logo3.className = logo2.className = "logoImg";
	logo2.appendChild(img);
	logo3.appendChild(img2);
	css(logo2,"opacity",0);
	css(logo3,"opacity",0);
	css(logo2,"translateZ",-1000);
	css(logo3,"translateZ",-1000);	
	view.appendChild(logo2);
	view.appendChild(logo3);	
	MTween({
		el: logo1,
		target: {opacity:0},
		time: 1000,
		type: "easeOut",
		callBack: function(){
			view.removeChild(logo1);
			css(logo2,"opacity",100);
			MTween({
				el: logo2,
				target: {translateZ:0},
				time: 300,
				type: "easeBoth",
				callBack:anmt2
			});
		}
	});
}
/* 隐藏logo2，开始让logo3显示出来 */
function anmt2(){
	var view = document.querySelector('#view');
	var logo2 = document.querySelector('#logo2');
	var logo3 = document.querySelector('#logo3');
	setTimeout(function(){
		MTween({
			el: logo2,
			target: {translateZ:-1000},
			time: 800,
			type: "linear",
			callBack: function(){
				view.removeChild(logo2);
				css(logo3,"opacity",100);
				setTimeout(function(){
					MTween({
						el: logo3,
						target: {translateZ:0},
						time: 300,
						type: "easeBoth",
						callBack: anmt3
					});
				},300);
			}
		});
	},2000);
}
/* 隐藏logo3，显示小的爆炸效果 */
function anmt3(){
	var view = document.querySelector('#view');
	var logo3 = document.querySelector('#logo3');
	setTimeout(function(){
		MTween({
			el: logo3,
			target: {translateZ:-2000},
			time: 2000,
			type: "easeIn",
			callBack: function(){
				view.removeChild(logo3);
				//开始添加爆照效果
				anmt4();
			}
		});
	},1000);
}
/* logo4的生成*/
function anmt4(){
	var view = document.querySelector('#view');
	var logo4 = document.createElement("div");
	var logoIcos = document.createElement("div");
	var logo4Img = new Image();
	var iconsLength = 27;
	logo4.id = "logo4";
	logo4Img.id = "logo4Img";
	logoIcos.id = "logoIcos";
	logo4Img.src = imgData.logo[2];
	css(logo4,"translateZ",-2000);
	for(var i = 0; i < iconsLength; i++){
		var span = document.createElement("span");
		var xR = 20+Math.round(Math.random()*240);
		var xDeg = Math.round(Math.random()*360)//(360/9)*(i%9);
		var yR = 10+Math.round(Math.random()*240);
		var yDeg = Math.round(Math.random()*360)//(360/9)*(i%9);
		css(span,"rotateY",xDeg);
		css(span,"translateZ",xR);
		css(span,"rotateX",yDeg);
		css(span,"translateY",yR);
		span.style.backgroundImage = "url("+imgData.logoIco[i%imgData.logoIco.length]+")";
		logoIcos.appendChild(span);
	}
	logo4.appendChild(logoIcos);
	logo4.appendChild(logo4Img);
	view.appendChild(logo4);
	MTween({
		el: logo4,
		target: {translateZ: 0},
		time: 500,
		type: "easeOutStrong",
		callBack:function(){
			setTimeout(function(){
				MTween({
					el: logo4,
					target: {translateZ: -1000,scale:20},
					time: 3000,
					type: "linear",
					callBack: function(){
						view.removeChild(logo4);
						anmt5();
					}
				});
			},100);
		}
	});
}
/* 主体开始入场 */
function anmt5(){
	var tZ = document.querySelector('#tZ');
	css(tZ,"translateZ",-2000);
	anmt7();
	anmt6();
	MTween({
		el:tZ,
		target: {translateZ:200},
		time: 3600,
		type: "easeBoth"
	});
}
/* 生成主体的背景圆柱,圆柱入场 */
function anmt6(){
	var panoBg = document.querySelector('#panoBg');
	var width = 129;
	var deg = 360/imgData.bg.length;
	var R = parseInt(Math.tan((180-deg)/2*Math.PI/180)*(width/2)) - 1;
	var startDeg = 180;
	css(panoBg,"rotateY",-695);
	for(var i = 0; i < imgData.bg.length; i++){
		var span = document.createElement("span");
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		span.style.backgroundImage = "url("+imgData.bg[i]+")";
		span.style.display = "none";
		panoBg.appendChild(span);
		startDeg -= deg;
	}
	var nub = 0;
	var timer = setInterval(function(){
		panoBg.children[nub].style.display = "block";
		nub++;
		if(nub >= panoBg.children.length){
			clearInterval(timer);
		}
	},3600/2/20);
	MTween({
		el: panoBg,
		target: {rotateY:25},
		time: 3600,
		type: "linear",
		callBack:setDarg
	});
}
/*添加云朵及云朵入场*/
function anmt7(){
	var cloud = document.querySelector('#cloud');
	css(cloud,"translateZ",-400);
	for(var i = 0; i < 9; i++){
		var span = document.createElement("span");
		span.style.backgroundImage = "url("+imgData.cloud[i%3]+")";
		var R = 200+(Math.random()*150);
		var deg = (360/9)*i;
		var x = Math.sin(deg*Math.PI/180)*R;
		var z = Math.cos(deg*Math.PI/180)*R;
		var y = (Math.random()-.5)*200
		css(span,"translateX",x);
		css(span,"translateZ",z);
		css(span,"translateY",y);
		span.style.display = "none";
		cloud.appendChild(span);
	}
	var nub = 0;
	var timer = setInterval(function(){
		cloud.children[nub].style.display = "block";
		nub++;
		if(nub >= cloud.children.length){
			clearInterval(timer);
		}
	},50);
	MTween({
		el:cloud,
		target: {rotateY:540},
		time: 3500,
		type: "easeIn",
		callIn:function(){
			var deg = -css(cloud,"rotateY");
			for(var i = 0; i < cloud.children.length; i++){
				css(cloud.children[i],"rotateY",deg);
			}
		},
		callBack:function(){
			cloud.parentNode.removeChild(cloud);
			bgShow();
		}
	});
}
function setDarg(){
	var panoBg = document.querySelector('#panoBg');
	var tZ = document.querySelector('#tZ');
	var startPoint = {x:0,y:0};
	var panoBgDeg = {x:0,y:0};
	var scale ={x:129/18,y:1170/80} 
	var startZ = css(tZ,"translateZ");
	var lastDeg = {x:0,y:0};
	var lastDis = {x:0,y:0};
	document.addEventListener('touchstart', function(e) {
		startPoint.x = e.changedTouches[0].pageX;
		startPoint.y = e.changedTouches[0].pageY;
		panoBgDeg.x = css(panoBg,"rotateY");
		panoBgDeg.y = css(panoBg,"rotateX");
	});
	document.addEventListener('touchmove', function(e) {
		var nowDeg = {}
		var nowPoint = {};
		nowPoint.x = e.changedTouches[0].pageX;
		nowPoint.y = e.changedTouches[0].pageY;
		var dis = {}
		dis.x = nowPoint.x - startPoint.x;
		dis.y = nowPoint.y - startPoint.y;
		var disDeg = {};
		//console.log(dis.x,scale.x);
		disDeg.x = -(dis.x/scale.x);
		disDeg.y = dis.y/scale.y;
		nowDeg.y =	panoBgDeg.y + disDeg.y;
		nowDeg.x = panoBgDeg.x + disDeg.x;
		if(disDeg.y > 40){
			disDeg.y = 40;
		 } else if(disDeg.y < -40) {
		 	disDeg.y = -40;
		 }
		lastDis.x =  nowDeg.x - lastDeg.x;
		lastDeg.x = nowDeg.x;
		lastDis.y =  disDeg.y - lastDeg.y;
		lastDeg.y = disDeg.y;
		css(panoBg,"rotateX",disDeg.y);
		css(panoBg,"rotateY",nowDeg.x);
		if(Math.abs(dis.x) > 300){
			dis.x = 300;
		}
		css(tZ,"translateZ",startZ - Math.abs(dis.x));
	}); 
	document.addEventListener('touchend', function(e) {
		var nowDeg = {x:css(panoBg,"rotateY"),y:css(panoBg,"rotateX")};
		console.log(lastDis.x);
		var disDeg = {x:lastDis.x*10,y:lastDis.y*10};
		MTween({
			el:tZ,
			target:{translateZ:startZ},
			time: 800,
			type: "easeOut"
		});
		MTween({
			el:panoBg,
			target:{rotateY:nowDeg.x + disDeg.x},
			time: 800,
			type: "easeOut"
		});
	}); 
}
function bgShow(){
	var pageBg = document.querySelector('#pageBg');
	MTween({
		el:pageBg,
		target:{opacity:100},
		time: 1000,
		type:"easeBoth"
	});
}
