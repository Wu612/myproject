

$(function(){
			$("#header").load("head.html");
			$("#footer").load("footer.html");
			var arr=data.wine;
			 var sun="";
			 
			$.each(arr, function(i,old) {
				var x=arr[i].piece;
				var y=x.split(".");
				if(y[0].length>=3){
					var z=y[0].substr(2);
					var hh=y[0].substr(0,2);
				}else{
					z="";
					hh=y[0];
				}
			 sun+='<dl id="'+arr[i].id+'"><dt><img src="image/QQ截图20170710201120.png" /><span>还乘</span><span class="time day">1</span>' 
		  +'<span>天</span><span class="time hour">00</span><span>时</span><span class="time minutes">54</span><span>分</span></dt>'
		  +'<dd><img src="'+arr[i].src+'" /></dd><dd class="word"><a>'+arr[i].detail+'</a><p>'+arr[i].Edetail+'</p>'
		  +'<div>抢购价：<span>￥'+hh+'<span class="upper">'+z+'</span>.0</span></div> </dd> </dl>'
		  
			});
				$(".image3:eq(0)").append(sun);
				
			var ten="";
			var info=data.strong;
		  $.each(info,function(i,old){
		  	   var x=info[i].piece;
		  	   var y=x.split(".");
		  	   if(y[0].length>=3){
		  	   	 var z=y[0].substr(2,1);
		  	   	 var s=y[0].substr(0,2);
		  	   }else{s=y[0];z='';}
		  	ten+='<dl><dt><img src="'+info[i].src+'" /></dt><dd><a>'+info[i].detail+'</a></dd>'
			  +'<dd><span>'+info[i].Edetail+'</span></dd><dd><span>'+info[i].product+'</span></dd>'
			  +'<dd><span>'+info[i].breed+'</span></dd><dd><span>'+info[i].appraise+'</span></dd>'
			  +'<dd class="most"><span>￥'+s+'<span class="upper">'+z+'</span>.0</span></dd>'
			 +'</dl>'
			 
		  });  $(".table1").append(ten);
		  
		  $("#Image").find("img").hover(function(){
		  	$(this).animate({left:-100},500);
		  },function(){
		  	 $(this).animate({left:0},500);
		  })
		  
		  
		  
		
		var uls=document.getElementById('lunbo');
		
		var lis=uls.children;
		onewidth=lis[0].offsetWidth;
		
		uls.style.width=onewidth*10+"px";
		var list=document.getElementById("-small").children;
		var imgs=uls.getElementsByTagName("img");
		var k="";
		for(var j=0;j<list.length;j++){
//			lis[j].style.width=document.innerWidth;
			imgs[j].style.width=onewidth;
			list[j].index=j;
			list[j].onmouseover=function(){
				k=this.index;
				move();
			}
		}
		var timer=setInterval(function(){
			k++;
			move();
		},3000)
		function move(){
		  if(k>9){k=0};
		  if(k<0){k=9};
		  for(var i=0;i<list.length;i++){
		  	list[i].className="";
		  	}
		  list[k].className="active";
		  uls.style.left=-k*onewidth+"px";
		}
		
	  
	  
	  	 function count_down(year,months,date,element){
	  	 	 
	  	 	var nowTime=new Date()
	  	 	var endTime=new Date(year,months-1,date);
	  	 	
	  	 	difTime=endTime.getTime()-nowTime.getTime();
	  	    
	  	    
	  	    var days=Math.floor(difTime/1000/60/60/24);
	  	    var hours=Math.floor(difTime/1000/60/60%24);
	  	    var minutes=Math.floor(difTime/1000/60%60);
	  	    var second=Math.floor(difTime/1000%60);
	  	    console.log($(".image3 dl dt span:eq(1)"))
	  	    		$(".image3 dl dt .minutes").html(second);
	  	      		$(".image3 dl dt .day").html(days);
	  	      		$(".image3 dl dt .hour").html(hours);
		  	 }
	  
		setInterval(function(){
			count_down(2017,7,16);
		},1000)
		
		
		$("dl").click(function(){
		 window.location.href="detail.html"
		})
  });