/*
* @Author: wine
* @Date:   2018-01-19 11:17:40
* @Last Modified by:   wine
* @Last Modified time: 2018-01-20 16:54:12
*/
var weather;
var city;
//请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}

})
//请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){	
		city=obj.data;
		console.log(obj.data);
	}
})	
//渲染数据
function updata(){
	//渲染城市
	var city_Name=document.getElementsByClassName("header")[0];
	city_Name.innerHTML=weather.city_name;
	//渲染当前气温
	var Wendu=document.getElementsByClassName("wendu")[0];
	Wendu.innerHTML=weather.current_temperature+"℃";
	//渲染当前天气；
	var tianqi=document.getElementsByClassName("tianqi")[0];
	tianqi.innerHTML=weather.current_condition;
	//渲染当前空气质量
	var quality_level=document.getElementById("quality_level");
	quality_level.innerHTML=weather.quality_level;
	//渲染今天的最高温
	var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	//渲染今天的最低温
	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;
	//今天图片
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	//console.log(dat_weather_icon_id)
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
	//渲染明天的最高温
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	//渲染明天的最低温
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	//明天图片
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	//console.log(dat_weather_icon_id)
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;
	//实时天气
	for(var i in weather.hourly_forecast){
		//创建父元素div
		var now =document.createElement("div");
		//给父元素div加样式
		now.className="now";
		// console.log(now)

		//获取now的父元素
		var nowp=document.getElementById("now");
		// console.log(nowp)
		//把now插入到父元素中
		nowp.appendChild(now);

		var now_time=document.createElement("h2");
		now_time.className="now_time";
		now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
		now.appendChild(now_time);

		var now_pic=document.createElement("div");
		now_pic.className="now_pic";
		now_pic.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
		now.appendChild(now_pic);

		var now_tem=document.createElement("h3");
		now_tem.className="now_tem";
		now_tem.innerHTML=weather.hourly_forecast[i].temperature+"°";		
		now.appendChild(now_tem);

	}
	for(var j in weather.forecast_list){
		var recent=document.createElement("div");
		recent.className="recent";
		var rece=document.getElementById("box");
		rece.appendChild(recent);
		// console.log(weather.forecast_list[j].date.substring(5,7));
		// console.log(weather.forecast_list[j].date.substring(8));

		var recent_time=document.createElement("div");
		recent_time.className="recent_time";
		recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
		recent.appendChild(recent_time);

		// var month=document.createElement("span");
		// month.className="month";
		// month.innerHTML=console.log(weather.forecast_list[j].date.substring(5,7));
		// recent_time.appendChild(month);

		// var day=document.createElement("span");
		// day.className="day";
		// day.innerHTML=console.log(weather.forecast_list[j].date.substring(8));
		// recent_time.appendChild(day);

		var recent_wea=document.createElement("h2");
		recent_wea.className="recent_wea";
		recent_wea.innerHTML=weather.forecast_list[j].condition;
		recent.appendChild(recent_wea);

		var recent_pic=document.createElement("div");
		recent_pic.className="recent_pic";
		recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
		recent.appendChild(recent_pic);

		var recent_hight=document.createElement("h3");
		recent_hight.className="recent_hight";
		recent_hight.innerHTML=weather.forecast_list[j].high_temperature;
		recent.appendChild(recent_hight);

		var recent_low=document.createElement("h4");
		recent_low.className="recent_low";
		recent_low.innerHTML=weather.forecast_list[j].low_temperature;
		recent.appendChild(recent_low);

		var recent_wind=document.createElement("h5");
		recent_wind.className="recent_wind";
		recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
		recent.appendChild(recent_wind);

		var recent_level=document.createElement("h6");
		recent_level.className="recent_wind";
		recent_level.innerHTML=weather.forecast_list[j].wind_level;
		recent.appendChild(recent_level);

	}
	//
	var header=document.getElementsByClassName("header")[0];
	var city_box=document.getElementsByClassName("city_box")[0];
	// console.log(header,city_box)
	header.onclick=function(){
		city_box.style="display:block";
	}
	//渲染城市
	for(var k in city){
		console.log(k);

		var cityp=document.getElementById("city");
		var title=document.createElement("h1");
		title.className="title";
		title.innerHTML=k;
		cityp.appendChild(title);
		var con=document.createElement("div");
		con.className="con";
		for (var y in city[k]) {
			// console.log(y);
			var son=document.createElement("div");
			son.className="son";
			son.innerHTML=y;
			con.appendChild(son);

		}
		cityp.appendChild(con);

	}
}
//查找各个城市天气信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		//console.log(weather);
		updata();
		$(".city_box").css({"display":"none"});
		}

	})
}
//当页面加载完成执行代码
window.onload=function(){
	updata();
	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})
	//当input获取焦点button变确认
	//focus获取焦点  
	//html获取或改变焦点内容
	$(".text").on("focus",function(){
		$(".button").html("确认");
	})

	var button=document.getElementsByClassName("button")[0];
	console.log(button);

	button.onclick=function(){
		console.log(1);
		//获取button中的内容
		var btn=this.innerHTML;
		console.log(button);
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none";
			//console.log(1);
		}
		else{
			var str=document.getElementsByClassName("text")[0].value;
			//console.log(str);
			for(var i in city){
				if(i==str){
					AJAX(str);
					return;
				}
				else{
					for(var j in city[i]){
						if(j==str){
							AJAX(str);
							return;
						}
					}
				}
			}
			alert("没有该城市的气象信息")
		}
	}
}