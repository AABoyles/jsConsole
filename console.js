var input = "[]", script = "output = _(input).map(function(val){\n  return val;\n});", output = "[]";

$(function(){

  if(Cookies.get("input")){
    input = Cookies.get("input");
  }
  
  var inputeditor = CodeMirror($("#input")[0],{
    value: input,
    mode:  "javascript",
    lineNumbers: true
  });
  inputeditor.on("change", function(e){
    Cookies.set("input", inputeditor.getValue());
    if(_.isJSON(inputeditor.getValue())){
      translate();
    }
  });

  if(Cookies.get("script")){
    script = Cookies.get("script");
  }

  var jseditor = CodeMirror($("#modifier")[0],{
    value: script,
    mode:  "javascript",
    lineNumbers: true
  });
  jseditor.on("change", function(e){
    Cookies.set("script", jseditor.getValue());
    translate();
  });

  var outputeditor = CodeMirror($("#output")[0],{
    value: output,
    mode:  "javascript",
    lineNumbers: true,
    readOnly: true
  });

  var translate = function(){
    try {
      input = JSON.parse(inputeditor.getValue());
      try {
        eval(jseditor.getValue());
      } catch(e) {} finally {
        var pretty = $('input[name="prints"]:checked').attr("id") == "pretty" ? 2 : 0;
        outputeditor.setValue(JSON.stringify(output, null, pretty));
      }
    } catch(e) {}
  };

  $("#new-input").click(function(){
    inputeditor.setValue("[]");
  });
  
  $("#load-input").click(function(){
    $("#input-file").click();
  });

  $("#input-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        inputeditor.setValue(evt.target.result);
      }
    }
    reader.readAsText(file);
  });

  $("#save-input").mousedown(function(){
    this.href="data:text;charset=utf8,"+encodeURIComponent(inputeditor.getValue());
    this.download="input.json";
  });
  
  $("#beautify-input").click(function(){
    var inp = JSON.parse(inputeditor.getValue());
    inputeditor.setValue(JSON.stringify(inp, null, 2));
  });

  $("#shorten-input").click(function(){
    var inp = JSON.parse(inputeditor.getValue());
    inputeditor.setValue(JSON.stringify(inp));
  });

  $("#new-script").click(function(){
    jseditor.setValue(script);
  });
  
  $("#load-script").click(function(){
    $("#script-file").click();
  });

  $("#script-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        jseditor.setValue(evt.target.result);
      }
    }
    reader.readAsText(file);
  });

  $("#save-script").mousedown(function(){
    this.href="data:text;charset=utf8,"+encodeURIComponent(jseditor.getValue());
    this.download="edit.js";
  });

  $("#save-output").mousedown(function(){
    this.href="data:text;charset=utf8,"+encodeURIComponent(outputeditor.getValue());
    this.download="output.json";
  });

  $('input[name="prints"]').change(translate);

  translate();

});
