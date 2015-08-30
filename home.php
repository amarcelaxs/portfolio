
<div id="fullpage">
    <div class="section" id="section0">
    </div>
    <div class="section" id="section1">

    </div>
    <div class="section" id="section3">

    </div>
</div>
<div class="section" id="section4">
    <form class="form-horizontal" action="enviar.php" method="post">
        <fieldset>
            <div class="row">
                <div class="col-xs-6">
                    <!-- Form Name -->
                    <legend>Send a email</legend>
                    <!-- Text input-->
                    <div class="control-group" style="margin-left:2%;margin-bottom:10%;">
                        <label class="control-label" for="name" style="font-size:100%;margin-left: -89%;padding-bottom: 3%;">Name</label>
                        <div class="controls">
                            <input id="name" name="name" placeholder="" class="form-control" required="" type="text" style="width:540px;display:inline;">
                        </div>
                    </div>
                    <!-- Text input-->
                    <div class="control-group" style="margin-left:2%;margin-bottom:10%;">
                        <label class="control-label" for="email" style="margin-left: -89%;padding-bottom: 3%;">Email</label>
                        <div class="controls">
                            <input id="email" name="email" placeholder="" class="form-control" required=""
                                   type="text" style="width:540px;display:inline;">
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <!-- Textarea -->
                    <div class="control-group" style="margin: 15.4% 60% 0.2%;">
                        <label class="control-label" for="msg" style="padding-bottom:3%;">Mensagem</label>
                        <div class="controls" draggable="true">
                    <textarea id="msg" name="msg" class="form-control" required="" type="text"
                              style="width:600px;height:150px;display:inline;"></textarea>
                        </div>
                    </div>
                    <!-- Button -->
                    <div class="control-group" style="display:inline">
                        <label class="control-label" for="enviar"></label>
                        <div class="controls" style="margin-left:60%;">
                            <button id="enviar" name="enviar" class="btn btn-primary">Send</button>
                            <button id="cancelar" name="cancelar" class="btn btn-primary"
                                    style="display:inline-block;" type="reset" draggable="true">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</div>


