var input = "{}", output = "{}";

$(function(){
  
  var inputeditor = CodeMirror($("#input")[0],{
    value: input,
    mode:  "javascript",
    lineNumbers: true
  });
  inputeditor.on("change", function(e){
    translate();
  });

  var jseditor = CodeMirror($("#modifier")[0],{
    value: "output = _(input).map(function(val){\n  return val;\n});",
    mode:  "javascript",
    lineNumbers: true
  });
  jseditor.on("change", function(e){
    translate();
  });

  var outputeditor = CodeMirror($("#output")[0],{
    value: output,
    mode:  "javascript",
    lineNumbers: true,
    readOnly: true
  });

  var translate = function(){
    input = JSON.parse(inputeditor.getValue());
    eval(jseditor.getValue());
    var pretty = $('input[name="prints"]:checked').attr("id") == "pretty" ? 2 : 0;
    outputeditor.setValue(JSON.stringify(output, null, pretty));
  };

  $("#newinput").click(function(){
    inputeditor.setValue("{}");
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

  $("#saveinput").mousedown(function(){
    this.href="data:text;charset=utf8,"+inputeditor.getValue();
    this.download="input.json";
  });

  $("#newscript").click(function(){
    jseditor.setValue("output = _(input);");
    $("#origdata-file")[0].value = ""
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

  $("#saveoutput").mousedown(function(){
    this.href="data:text;charset=utf8,"+outputeditor.getValue();
    this.download="output.json";
  });

  $('input[name="prints"]').change(translate);

});

