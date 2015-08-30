$(document).ready(function(){
	$('#executahome').click(function(){
  		$.ajax({
  		url:"index.php",
  			success:function(data){
			console.log("data: " + data);
  				$('.recebehome').html(data);
				$('.flip-container').hide();
				$('.page-sobre').hide();
				
  			} 		
  		});
  	});
  	
	$('#executasobre').click(function(){
		
  		$.ajax({
  		url:"pages/sobre.php",
		
  			success:function(data){
			console.log("data: " + data);
  				$('.recebesobre').html(data);
				
				$(".animationli").hide();	
				$(".animationli").show(1855);	
			
				
				$('.flip-container').hide();	
				$('#registerForm').hide();		
				
  			}
	
				
  		});
		
		
  	});
	
	
  	$('#executaAjax2').click(function(){
  		$.ajax({
  		url:"pages/contato.php",
  			success:function(data){
			console.log("data: " + data);
  				$('.recebeAjax').html(data);
				$('.flip-container').hide();
				$('.page-sobre').hide();
				
				
  			} 		
  		});
  	});

  			
	
	$('#executasobre2').click(function(){
		
  		$.ajax({
  		url:"pages/sobre.php",
		
  			success:function(data){
			console.log("data: " + data);
  				$('.recebesobre').html(data);
				
				$(".animationli").hide();	
				$(".animationli").show(1855);	
			
				
				$('.flip-container').hide();	
				$('#registerForm').hide();		
				
  			}
	
				
  		});
		
		
  	});
	
	
  	$('#executaAjax').click(function(){
  		$.ajax({
  		url:"pages/contato.php",
  			success:function(data){
			console.log("data: " + data);
  				$('.recebeAjax').html(data);
				$('.flip-container').hide();
				$('.page-sobre').hide();
				
				
  			} 		
  		});
  	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	

			
		 




});