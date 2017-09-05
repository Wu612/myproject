

  $(function(){
			$("#header").load("head.html",function(){
				 $("#min-two").hide();
			});
			$("#footer").load("footer.html");
	      
	      		 $(".boost").hover(function(){
   	 	$(".amplify").show();
   	 	
   	 },function(){ $(".amplify").hide()})
   	
  
   	var maskWidth =$(".mask").width();
     var maskHeight=$(".mask").height();
   
   	$(".boost").mousemove(function(e){
   	 	var x=e.pageX-$(this).offset().left-maskWidth/2;
   	 	var y=e.pageY-$(this).offset().top-maskHeight/2;
   	 	
   	 	 x=x<0?0:x;
   	 	 y=y<0?0:y;
   	 	 
   	 	 var max_x=$(this).width()-maskWidth;
   	 	 
   	 	 var max_y=$(this).height()-maskHeight;
   	 	 
   	 	 x=x>max_x?max_x:x;
   	 	 y=y>max_y?max_y:y;
   	 	
   	 	 
   	    $(".mask").css("left",x+"px");
   	 	$(".mask").css("top",y+"px");
   	 
   	 	 var bigli_x=$(".first").width()/$(this).width();
   	 	 var bigli_y=$(".first").height()/$(this).height();
   	 	$(".amplify img").css("left",-x*bigli_x+"px");
   	 	$(".amplify img").css("top",-y*bigli_y+"px");
   	 	 
   	 	 })
   	
   	 	$.each($(".cion img:lt(2)"),function(i,old){
   	 		
   	 		$(".cion img:lt(2)").eq(i).hover(function(){
   	 		  $(".boost img:lt(2)").eq(i).show().siblings("img").hide();
   	 		  $(".amplify img").eq(i).show().siblings().hide();
   	 		  $(".cion img:lt(2)").eq(i).removeClass("before").siblings("img").addClass("before")
   	 		})
   	 	})
   	 
		$(".boost").delegate(".previous","click",function(){
			
				alert(1);
				$(".boost .post").hide();
		})
		 	
		
		$(window).scroll(function(){
			    
			if($(window).scrollTop()>=835){
			
				$("#message .status").css({"position":"fixed","top":0});
			}else{$("#message .status").css("position","relative")}
		})
})
   	  
   
   	
   	
   	
   	
   	
  

