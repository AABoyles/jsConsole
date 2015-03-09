var input = "{}", output = "{}", report = function(error){};

$(function(){
  inputeditor = ace.edit("origdata");
  inputeditor.setTheme("ace/theme/github");
  inputeditor.getSession().setMode("ace/mode/json");

  jseditor = ace.edit("script");
  jseditor.setTheme("ace/theme/github");
  jseditor.getSession().setMode("ace/mode/javascript");

  outeditor = ace.edit("outdata");
  outeditor.setTheme("ace/theme/github");
  outeditor.getSession().setMode("ace/mode/json");
  outeditor.setReadOnly(true);

  $("#execute").click(function(){
    input = JSON.parse(inputeditor.getValue());
    eval(jseditor.getValue());
    outeditor.setValue(JSON.stringify(output));
    $('#output > ul > li > a:last').tab('show');
  });
});

