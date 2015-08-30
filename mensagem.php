<?php

//iniciando a session
session_start();

//1 �~@~S Definios Para quem vai ser enviado o email
$para = "amarcelaxs@onclouds.besaba.com";

//2 - resgatar o nome digitado no formulário e  grava na variavel $nome

$nome=$_POST['nome'];
$_SESSION['nome']=$nome;

$email=$_POST['email'];
$_SESSION['email']=$email;

$msg=$_POST['msg'];
$_SESSION['msg']=$msg;


//4 Agora definimos a  mensagem que vai ser enviado no e-mail
$assunto = "Email de contato";
//$mensagem="segue abaixo as informa��es para a autoriza��o de acesso.";<br>


$mensagem ="<br><br><strong>First name :</strong>".$nome;
$mensagem .="<br><br><strong>E-mail :</strong>".$email;
$mensagem .="<br><br><strong>Mensagem :</strong>".$msg;


    
//5 �~@~S agora inserimos as codificações corretas e  tudo mais. 
$headers =  "Content-Type:text/html; charset=UTF-8\n";
$headers .= "From:  onclouds.besaba.com<amarcelaxs@onclouds.besaba.com>\n"; //Vai ser //mostrado que  o email partiu deste email e seguido do nome
$headers .= "X-Sender:  <ana.marcela@linea.gov.br\n"; //email do servidor //que enviou
$headers .= "X-Mailer: PHP v".phpversion()."\n";
$headers .= "X-IP:  ".$_SERVER['REMOTE_ADDR']."\n";
$headers .= "Return-Path:  <amarcelaxs@onclouds.besaba.com>\n"; //caso a msg //seja respondida vai para  este email.
$headers .= "MIME-Version: 1.0\n";
                                   
mail($para, $assunto, $mensagem, $headers)//função que faz o envio do email. 


?>