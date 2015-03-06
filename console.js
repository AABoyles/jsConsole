data = {}

inputeditor = ace.edit("origdata");
inputeditor.setTheme("ace/theme/github");
inputeditor.getSession().setMode("ace/mode/json");

jseditor = ace.edit("script");
jseditor.setTheme("ace/theme/github");
jseditor.getSession().setMode("ace/mode/javascript");

outeditor = ace.edit("outdata");
outeditor.setTheme("ace/theme/github");
outeditor.getSession().setMode("ace/mode/json");

$(function(){
  $("#origdata").change(function(){
    data = JSON.parse($(this).val());
  });

  $("#execute").click(function(){
    eval($("#script").val());
    $("outdata").val(output);
  });

});
