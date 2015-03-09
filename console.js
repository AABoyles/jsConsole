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

  $("#execute").click(translate);
  $('input[name="prints"]').change(translate);

  $("#newscript").click(function(){
    jseditor.setValue("output = _(input);");
  });

  $("#newinput").click(function(){
    inputeditor.setValue("{}")
  });

});
