var input = "{}", output = "{}", report = function(error){};

$(function(){
  jseditor = ace.edit("script");
  jseditor.setTheme("ace/theme/github");
  jseditor.getSession().setMode("ace/mode/javascript");

  inputeditor = ace.edit("origdata");
  inputeditor.setTheme("ace/theme/github");
  inputeditor.getSession().setMode("ace/mode/json");

  outeditor = ace.edit("outdata");
  outeditor.setTheme("ace/theme/github");
  outeditor.getSession().setMode("ace/mode/json");
  outeditor.setReadOnly(true);

  var translate = function(){
    input = JSON.parse(inputeditor.getValue());
    eval(jseditor.getValue());
    var pretty = $('input[name="prints"]:checked').attr("id") == "pretty" ? 2 : 0;
    outeditor.setValue(JSON.stringify(output, null, pretty));
    $('#output > ul > li > a:last').tab('show');
  };

  $("#loadscript").click(function(){
    if($(this).hasClass("active")){
      $("#script-file").parent().fadeOut();
    } else {
      $("#script-file").parent().fadeIn();
    }
  });

  $("#script-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        jseditor.setValue(evt.target.result);
        $("#script-file").parent().fadeOut();
        $("#loadscript").removeClass("active");
      }
    }
    reader.readAsText(file);
  });

  $("#savescript").mousedown(function(){
    this.href="data:text;charset=utf8,"+jseditor.getValue();
    this.download="edit.js";
  });

  $("#execute").click(translate);

  $("#loadinput").click(function(){
    if($(this).hasClass("active")){
      $("#origdata-file").parent().fadeOut();
    } else {
      $("#origdata-file").parent().fadeIn();
    }
  });

  $("#origdata-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        inputeditor.setValue(evt.target.result);
        $("#origdata-file").parent().fadeOut();
        $("#loadinput").removeClass("active");
      }
    }
    reader.readAsText(file);
  });

  $("#newscript").click(function(){
    jseditor.setValue("output = _(input);");
    $("#origdata-file")[0].value = ""
  });

  $("#newinput").click(function(){
    inputeditor.setValue("{}");
  });

  $("#saveinput").mousedown(function(){
    this.href="data:text;charset=utf8,"+inputeditor.getValue();
    this.download="input.json";
  });

  $("#saveoutput").mousedown(function(){
    this.href="data:text;charset=utf8,"+outeditor.getValue();
    this.download="output.json";
  });

  $('input[name="prints"]').change(translate);

});

