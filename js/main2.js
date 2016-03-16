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
  console.log(calcArgs);
}

function dirtyInput(calcArgs) {
  var byeArray = calcArgs.join("");
  helloStr += byeArray.replace(/\+|-|=|\u00F7|\x/g,"");
  $display.empty();
  calcArgs.length = 0;
}

function jsOperators(symbol) {
  if (symbol === 'x'){
    return '*';
  } else if (symbol === "\u00F7"){
    return '/';
  } else {
    operator = symbol;
    return operator;
  }
}

function operatorButtons() {
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

  // $operator.on('click', function(){
  //   console.log('test');
  //   var $getKey2 = "#" + (event.target).id;
  //   if ($getKey2.length < 2 ) {
  //     operator = calcArgs[calcArgs.length-1];
  //     dirtyInput(calcArgs);
  //     $display.append(operator);
  //     operator = jsOperators(operator);
  //     helloStr += operator;
  //   } else if ($getKey2 === "#cancel"){
  //     $display.empty();
  //     calcArgs.length = 0;
  //     helloStr = "";
  //   } else {
  //     dirtyInput(calcArgs);
  //     console.log(helloStr);
  //     var result = eval(helloStr);
  //     $display.append("=" + result);
  //     helloStr = "";
  //     display = true;
  //   }
  // });

  $operator.on('click', operatorButtons);


});
