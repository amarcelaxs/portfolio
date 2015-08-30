<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bootstrap 101 Template</title>
	<!--script type="text/javascript" src="dist/js/jquery_1_11_1.js"></script-->
    <!-- Bootstrap -->
    <link href="dist/css/bootstrap.css" rel="stylesheet"/>
     <link href="dist/css/style.css" rel="stylesheet"/>
	 <link href="owl-carousel/owl.carousel.css" rel="stylesheet"/> 
	 <!--script type="text/javascript" src="dist/js/jquery_1_11_1.js"></script-->
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>


</head>
<body>
			<form id="registerForm" role="form" class="form-horizontal"  action="mensagem.php" method="post">
            
                        <label class="col-sm-2 control-label" for="nome">Nome:</label>
                        <div class="col-sm-10">
                            <input id="nome" name="nome" type="text" placeholder="" class="form-control" required value="" >
                        </div>
                   
                 
                        <label class="col-sm-2 control-label" for="email">email:</label>
                        <div class="col-sm-10">
                            <input id="email" name="email" type="text" placeholder="" class="form-control" required value="" >
                        </div>
                   
                   
                        <label class="col-sm-2 control-label" class="form-control"  for="mensagem">Mensagem:</label>
                         <div class="col-sm-10">
                           <textarea rows="4" id="msg" name="msg"  class="form-control" cols="50" style="width:300px;" required value="">
							
							</textarea>
                        </div>
               
                  
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10">
                            <div style="width: 600px;">
                                <button id="submit" name="submit" class="btn ">Submit</button>
								
                                <!--button id="cancelRegistrationForm" class="btn btn-inverse" >Cancel</button-->
                            </div>
							<div style="width: 600px;">
                                <button id="submit" name="submit" class="btn" type="reset" style="margin-top:-50px;margin-left: -300px;">Cancel</button>
								
                                <!--button id="cancelRegistrationForm" class="btn btn-inverse" >Cancel</button-->
                            </div>
                        </div>
              

</form>

<!--div id="datamensagem"></div-->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

<!-- Include all compiled plugins (below), or include individual files as needed -->

<!--script src="dist/js/nationality.js"></script-->

<!--script src="dist/js/validate.js"></script>
<script src="dist/js/contato.js"></script-->

</body>
</html>











