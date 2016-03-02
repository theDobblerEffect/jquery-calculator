var $document = $(document);
var $span = $('span');
var calcArgs = [];
var $display = $('#screen');
var $operator = $('.operator');
var helloStr = "";
var operator = " ";
var display = false;


function memory(target){
  calcArgs.push(target.text());
}

function dirtyInput(calcArgs) {
  var byeArray = calcArgs.join();
  for (var i = 0; i < byeArray.length-1; i++) {
    if (i%2 === 0){
      helloStr += byeArray[i];
    }
  }
  $display.empty();
  calcArgs.length = 0;
}

function jsOperators(symbol) {
  if (symbol === 'x'){
    return '*';
  } else if (symbol === '+'){
    return symbol;
  } else if (symbol === '-'){
    return symbol;
  } else {
    return '/';
  }
}


$document.ready(function(){

  $span.on('click', function(){
    if (display === true){
      $display.empty();
      display = false;
    }
    var $getKey = $(event.target);
    memory($getKey);
    $display.append(calcArgs[calcArgs.length-1]);
  });

  $operator.on('click', function(){
    var $getKey2 = "#" + (event.target).id;
    if ($getKey2.length < 2 ) {
      operator = calcArgs[calcArgs.length-1];
      dirtyInput(calcArgs);
      $display.append(operator);
      operator = jsOperators(operator);
      helloStr += operator;
    } else if ($getKey2 === "#cancel"){
      $display.empty();
      calcArgs.length = 0;
      helloStr = "";
    } else {
      dirtyInput(calcArgs);
      var result = eval(helloStr);
      $display.append("=" + result);
      helloStr = "";
      display = true;
    }
  });
});
