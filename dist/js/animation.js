$(document).ready(function() {

		$("#css").animate({left: '30px',opacity:"003",bottom:"10%"},6000);
		$("#css").animate({left:'100px',opacity:"003",top:"40%"},6005);
		$("#css").animate({left:'130px',opacity:"003",top:"60%"},6050);
		$("#css").animate({left:'80px',opacity:"003",top:"40%"},5000);
		$("#css").animate({left:'30px',opacity:"003",top:"8%"},5094);
		$("#css").animate({left:'60px',opacity:"003",top:"15%"},6003);
		$("#css").animate({left:'200px',opacity:"003",top:"30%"},6008);
		$("#css").animate({left:'100px',opacity:"003",top:"60%"},6010);
		$("#css").animate({left:'30px',opacity:"003",top:"80%"},6004);
		$("#css").animate({left:'30px',opacity:"003",top:"30%"},60002);
	
	
		$("#jquery").animate({left: '700px',opacity:"003",top:"30%"}, 5090);
        $("#jquery").animate({left: '750px',opacity:"003",top:"50%"},5080);
        $("#jquery").animate({left: '900px',opacity:"003",top:"60%"},5099);
		$("#jquery").animate({left: '950px',opacity:"003",top:"35%"},5097);
		$("#jquery").animate({left: '100px',opacity:"003",top:"85%"},6003);
		$("#jquery").animate({left: '500px',opacity:"003",top:"55%"},5099);
		$("#jquery").animate({left: '800px',opacity:"003",top:"75%"},5089);
		$("#jquery").animate({left: '950px',opacity:"003",top:"50%"},5080);		   
		$("#jquery").animate({left: '800px',opacity:"003",top:"75%"},5095);
		$("#jquery").animate({left: '800px',opacity:"003",top:"45%"},5098);
		$("#jquery").animate({left: '900px',opacity:"003",top:"45%"},50966);
		   
		$("#php").animate({left: '800px',opacity:"003",top:"55%"},6090);
		$("#php").animate({left: '900px',opacity:"003",top:"45%"},6000);           
		$("#php").animate({left: '950px',opacity:"003",top:"55%"},6066);           
		$("#php").animate({left: '990px',opacity:"003",top:"45%"}, 5097);          
		$("#php").animate({left: '900px',opacity:"003",top:"15%"}, 6087);          
		$("#php").animate({left: '920px',opacity:"003",top:"10%"}, 1070);   
		$("#php").animate({left: '1200px',opacity:"003",top:"50%"},5600);   
		$("#php").animate({left: '950px',opacity:"003",top:"37%"}, 5079);   
		$("#php").animate({left: '960px',opacity:"003",top:"50%"}, 5095);     
		$("#php").animate({left: '920px',opacity:"003",top:"55%"}, 5099);
        
 
 
		$("firstPage").click(function(){
			$("#css").animate({left: '30px',opacity:"003",bottom:"10%"},1000);
			$("#css").animate({left:'100px',opacity:"003",top:"40%"},1000);
			$("#css").animate({left:'130px',opacity:"003",top:"60%"},1000);
			$("#css").animate({left:'80px',opacity:"003",top:"40%"},1000);
			$("#css").animate({left:'30px',opacity:"003",top:"8%"},1000);
			$("#css").animate({left:'60px',opacity:"003",top:"15%"},1000);
			$("#css").animate({left:'200px',opacity:"003",top:"30%"},1000);
			$("#css").animate({left:'100px',opacity:"003",top:"60%"},1000);
			$("#css").animate({left:'30px',opacity:"003",top:"80%"},1000);
			$("#css").animate({left:'30px',opacity:"003",top:"30%"},1000);
		
		
			$("#jquery").animate({left: '700px',opacity:"003",top:"30%"}, 1000);
			$("#jquery").animate({left: '750px',opacity:"003",top:"50%"},1000);
			$("#jquery").animate({left: '900px',opacity:"003",top:"60%"},1000);
			$("#jquery").animate({left: '950px',opacity:"003",top:"35%"},1000);
			$("#jquery").animate({left: '100px',opacity:"003",top:"85%"},1000);
			$("#jquery").animate({left: '500px',opacity:"003",top:"55%"},1000);
			$("#jquery").animate({left: '800px',opacity:"003",top:"75%"},1000);
			$("#jquery").animate({left: '950px',opacity:"003",top:"55%"},1000);		   
			$("#jquery").animate({left: '800px',opacity:"003",top:"75%"},1000);
			$("#jquery").animate({left: '800px',opacity:"003",top:"45%"},1000);
			$("#jquery").animate({left: '900px',opacity:"003",top:"45%"},1000);
			   
			$("#php").animate({left: '800px',opacity:"003",top:"55%"},1000);
			$("#php").animate({left: '900px',opacity:"003",top:"45%"},1000);           
			$("#php").animate({left: '950px',opacity:"003",top:"55%"},1000);           
			$("#php").animate({left: '990px',opacity:"003",top:"45%"}, 1000);          
			$("#php").animate({left: '900px',opacity:"003",top:"15%"}, 1000);          
			$("#php").animate({left: '920px',opacity:"003",top:"10%"}, 1000);   
			$("#php").animate({left: '1200px',opacity:"003",top:"50%"}, 1000);   
			$("#php").animate({left: '950px',opacity:"003",top:"40%"}, 1000);   
			$("#php").animate({left: '900px',opacity:"003",top:"50%"}, 1000);     
			$("#php").animate({left: '920px',opacity:"003",top:"55%"}, 1000);
			
		
		});
    
    
		/*
		animation page about

        */
        $(".php-text").css("left","-100%");
				$(".javascript-text").css("left","-80%");
				$(".jquery-text").css("left","-100%");
				$(".html5-text").css("left","-80%");
				$(".php-text").animate({left: 200}, 1600, function(){
						$(this).animate({left:120},800);
				});
				setTimeout(function(){
					
					$(".javascript-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},500);
				
				setTimeout(function(){
					
					$(".jquery-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},590);
				setTimeout(function(){
					
					$(".html5-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},700);
				
		$(".bootstrap-text").css("right","-100%");
				$(".git-text").css("right","-80%");
				$(".mysql-text").css("right","-100%");
				$(".uml-text").css("right","-80%");
				$(".bootstrap-text").animate({right: 200}, 1600, function(){
						$(this).animate({right:120},800);
				});
				setTimeout(function(){
					
					$(".git-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},480);
				
				setTimeout(function(){
					
					$(".mysql-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},600);
				setTimeout(function(){
					
					$(".uml-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},705);
	//animation page about  
    

	$("#about").click(function(){
				
				
				
				$(".php-text").css("left","-100%");
				$(".javascript-text").css("left","-80%");
				$(".jquery-text").css("left","-100%");
				$(".html5-text").css("left","-80%");
				$(".php-text").animate({left: 200}, 1600, function(){
						$(this).animate({left:120},800);
				});
				setTimeout(function(){
					
					$(".javascript-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},500);
				
				setTimeout(function(){
					
					$(".jquery-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},600);
				setTimeout(function(){
					
					$(".html5-text").animate({left: 200}, 1600, function(){
							$(this).animate({left:120},800);
					});
				},700);
				
				$(".bootstrap-text").css("right","-100%");
				$(".git-text").css("right","-80%");
				$(".mysql-text").css("right","-100%");
				$(".uml-text").css("right","-80%");
				$(".bootstrap-text").animate({right: 200}, 1600, function(){
						$(this).animate({right:120},800);
				});
				setTimeout(function(){
					
					$(".git-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},480);
				
				setTimeout(function(){
					
					$(".mysql-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},600);
				setTimeout(function(){
					
					$(".uml-text").animate({right: 200}, 1600, function(){
							$(this).animate({right:120},800);
					});
				},705);

					
			});
			
		//musica
			 $('#musica').width(244);
			   $('#musica').mouseover(function()
			   {
				  $(this).css("cursor","pointer");
				
				  $(this).animate({width: "300px"}, 'slow');
			   });
		   
			$('#musica').mouseout(function()
			  {   
				  $(this).animate({width: "244px"}, 'slow');
			   });
			   
		//design   
			    $('#design').width(244);
			   $('#design').mouseover(function()
			   {
				  $(this).css("cursor","pointer");
				
				  $(this).animate({width: "300px"}, 'slow');
			   });
		   
			$('#design').mouseout(function()
			  {   
				  $(this).animate({width: "244px"}, 'slow');
			   });
			   
		//desenvolvimento	   
			    $('#desenvolvimento').width(244);
			   $('#desenvolvimento').mouseover(function()
			   {
				  $(this).css("cursor","pointer");
				 
				  $(this).animate({width: "300px"}, 'slow');
			   });
		   
			$('#desenvolvimento').mouseout(function()
			  {   
				  $(this).animate({width: "244px"}, 'slow');
			   });
			   
		//games	   
			    $('#games').width(244);
			   $('#games').mouseover(function()
			   {
				  $(this).css("cursor","pointer");
				
				  $(this).animate({width: "300px"}, 'slow');
			   });
		   
			$('#games').mouseout(function()
			  {   
				  $(this).animate({width: "244px"}, 'slow');
			   });
   

			
});