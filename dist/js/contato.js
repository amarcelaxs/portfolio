$(document).ready(function(){
$("#registerForm").validate({      
        // Define as regras
        

        rules:{
            name:{
                // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true, minlength: 2
              },
            email:{
                // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true, minlength: 2
           
            },                   
          },
       // Define as mensagens de erro para cada regra
        messages:{
            name:{
                required: "Enter your name",
               

            },
             email:{
                required: "Enter your email",               
            },
          } 		
         
         
     });

  $("#submit").click(function(){
 
  if ($("#registerForm").valid()) {

    $.post("../../mensagem.php", $("#registerForm").serialize(), function(data) {
         $("#datamensagem").html(data);
               alert('Obrigado! entraremos em contato.');  

	      });
      $('#registerForm').each (function(){
    	this.reset();
            });


  }
  else{
	alert('Campo vazio');
         return false;
	}

    
  });

  
}); 