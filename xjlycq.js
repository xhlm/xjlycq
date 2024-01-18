var PicSetPath= ".\\pic\\";
PicSetList={
	"D1":"dragon1.png",	
	"D2":"dragon2.png",
	"D3":"dragon3.png",
	"D4":"dragon4.png",
	"Dp":"dragon_pig.png"
};
PicSetListLength = Object.keys(PicSetList).length;
ps = gEcls("picset")[0];
cd = gEcls("countdown")[0];
pvis = 0; // 要显示的图片序号 in PicSetList
cd_n = 60;  // 倒计时时间 /s

(function(){	
	// 初始化网页图片
	for(let i in PicSetList) {
		ps.innerHTML += ('<div id="'+i+'"><img src="'+PicSetPath+PicSetList[i]+'"></img>');
	}
	
	var handler; //鼠标按压事件定时器句柄ID,每次重置后会自动+1
	var time = 0; //鼠标按压计时
	// var handler_old=-1; // 记录已处理旧ID
	// var mdownTS,mupTS; //按下、弹起时间戳
	ps.onmouseup = function(event){
		// console.log(event);
		if(event.button!=0){return;} //非右键
		if(time>=500){ //需按压超过大于500ms
			clearInterval(handler);
			removeClass(ps,"mdown");
			time = 0; //重置按压时间
			Countdown(); //开始倒计时
		}
		// if(handler_old>=handler){return;} // 已处理
		// handler_old = handler;
		// mupTS = event.timeStamp;
		// console.log(handler_old+"!!!"+handler+" "+(mupTS-mdownTS));
	}
	//添加picset长按鼠标事件
	ps.onmousedown = function(event){
		// console.log(event);
		if(event.button!=0){return;} //非右键
		if(time!=0){return;} //按压中
		OffCountdown(); //关闭倒计时
		
		addClass(ps,"mdown");
		// 开始计时
		// mdownTS = event.timeStamp;
		handler = setInterval(function(){
			removeClass(ps.childNodes[pvis],"vis");			
			pvis = Math.floor(Math.random()*PicSetListLength); //随机数
			addClass(ps.childNodes[pvis],"vis");
			
			time+=50;
			// console.log(time);   
			if(time>=3000){
				// ps.onmouseup(new MouseEvent);
				var mupevt = new MouseEvent("mouseup",{
					"button" : 0,					
				});
				ps.dispatchEvent(mupevt);
				// clearInterval(handler);
			}
		},50)
	}

})();

var cd_hd; // 倒计时定时器句柄
function Countdown(){ //倒数n秒
	var cd_i = cd_n;
	// if((cd_hd!=null)||(cd.innerHTML!=0)){
		// OffCountdown();
	// }
	cd_hd = setInterval(function(){
			// removeClass(ps.childNodes[pvis],"picvis");			
			// pvis = Math.floor(Math.random()*PicSetListLength); //随机数
			cd.innerHTML=cd_i;
			addClass(cd,"vis");
			cd_i-=1;
			if(cd_i<0){
				OffCountdown();
			}						
		},1000)
}
function OffCountdown(){
	removeClass(cd,"vis");
	clearInterval(cd_hd);
}

function gEid(id){
	return document.getElementById(id);
}
function gEcls(cls){
	return document.getElementsByClassName(cls);
}
function gEq(qs){
	return document.querySelector(qs);
}

function hasClass(obj, cls) {
	return (obj.className+"").match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, '');
	}
}