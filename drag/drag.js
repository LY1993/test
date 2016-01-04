window.onload = function(){
var oDiv=document.getElementsByTagName('div')[0];
console.log(oDiv);
	
	drag(oDiv);
	function drag(obj){
		var x,y;
		obj.onmousedown=function(ev){
		var ev = ev || window.event;
		 x = ev.clientX-obj.offsetLeft;
		 y = ev.clientY-obj.offsetTop;

		}
		document.onmousemove=function(ev){
		var ev = ev || window.event;
		obj.style.left= ev.clientX-x+'px';
		obj.style.top = ev.clientY-y+'px';
		}
		
		document.onmouseup=function(){
			document.onmousemove = null;
			document.onmouseup = null;
			drag(oDiv);
			}

	}
}