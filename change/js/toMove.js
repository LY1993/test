//获取样式属性值
function getStyle(obj,attr,endfn){
	if(obj.currentStyle) //IE6
	{
		var result=obj.currentStyle[attr];	
	}
	else
	{
		var result=getComputedStyle(obj,false)[attr];	//其它浏览器
	}	
	return result;
}
function startMove(obj,json,endfn)//obj为对象,json为值对形式对象，如：{width: 200,height: 520,...},endfn为对话执行完后的回调函数
{
	clearInterval(obj.timer); //避免累计执行动画，每次清楚原有定时器
	obj.timer=setInterval(function(){
		var moveStop=true; //初始化状态，如果到了就为ture，如果没到就为false,先假定它到目标了，在下面在判断没到就再赋值false;
		for(var attr in json ) //遍历json对象，取的各属性值
		{	
			var cur=0;
			if(attr=='opacity') //特殊处理：当属性为opacity时执行条件语句代码块，如果不是，就忽略，执行else代码块
			{
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);	//获取属性值
			}
			else
			{
				cur=parseInt(getStyle(obj,attr));	//获取属性值
			}
			var speed=(json[attr]-cur)/6; //目标值减去当前到达值，即为差值。6为随意给定的值，控制速度为匀速运动
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(cur!=json[attr]) //当前值是否到达目标值，如果没到则继续执行以内代码块
				{
					moveStop=false; //不断的给它false,直上面条件成立到达目标后跳过这里，即就变为了全局变量ture
				}
				if(attr=='opacity') //特殊处理：当属性为opacity时执行条件语句代码块，如果不是，就忽略，执行else代码块
				{
					obj.style.filter='alpha(opacity='+(cur+speed)+')'; //低版本IE以下写法
					obj.style.opacity=(cur+speed)/100; //当前到达值加速度（距离）
				}
				else
				{
					obj.style[attr]=parseInt(getStyle(obj,attr))+speed+"px"; //当前到达值加速度（距离）
				}
		}
		if(moveStop) //当它保持true状态了
		{
			clearInterval(obj.timer); //停止运动
			if(endfn)endfn(); //如果给了参数，就执行这个函数
		}
	},30);	
}

//请自定义js名称