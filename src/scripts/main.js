require('../style/main.scss');
window.onload = function() {}
console.log('boom');
/*

1) baisc logic for the calculator done - functions

2) need to get the calcualtor returning results - done  

3) need to get the saved results and add to an object - done

4) need to display saved maths on the dom - displayed on dom, i need to add a delete button - displayed data as added - done 

5) i need at function that removes from object - savedAnswers then removes from the dom; - done

6) i need click event on data display to put maths into the display -done  

7) css and media queries for desktop , tablet and mobile  done

*/
let inputs        = document.getElementsByTagName("input");
let display       = document.getElementsByClassName("display")[0];
let firstNum  = "";
let secondNum = "";
let operator      = null;
let log           = "";
let answer;
let itemNum=0;
let savedAnswers = {};
let arrayElements  = [];

console.log(inputs)
for( let i=0; i<inputs.length; i++ ) {
  inputs[i].addEventListener("click", run);  
}

const add = (firstNum, secondNum) => parseFloat(firstNum) + parseFloat(secondNum)  

const subtract = (firstNum, secondNum) => parseFloat(firstNum) - parseFloat(secondNum)

const multiply = (firstNum, secondNum) => parseFloat(firstNum) * parseFloat(secondNum)

const divide = ( firstNum , secondNum) => parseFloat(firstNum) / parseFloat(secondNum)

function calculate(firstNum, secondNum, operator){
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "/":
      return divide(firstNum, secondNum);
    case "x":
      return multiply(firstNum, secondNum);
  }
}

const firstNumberEmpty = (firstNum) => firstNum === "";


const secondNumberEmpty = (secondNum) => secondNum === "";


const operatorEmpty = (operator)  => operator === null;


const anyOperator = (btn) => btn === "-" || btn === "+" || btn === "/" || btn === "x";


const operatorExceptMinus = (btn) => btn === "+" || btn === "/" || btn === "x";


const equals = (btn) => btn === "=";


const decimal = (btn) => btn === ".";



const negativeNumber = (firstNum, secondNum) => firstNum === "-" || secondNum === "-";


const blank = (firstNum, secondNum, operator) => firstNumberEmpty(firstNum) && secondNumberEmpty(secondNum) && operatorEmpty(operator);


const complete = (firstNum, secondNum, operator) => !firstNumberEmpty(firstNum) && !secondNumberEmpty(secondNum) && !operatorEmpty(operator);


const clearForm = (btn, firstNum, secondNum, operator) => btn == "c" || (equals(btn) && blank(firstNum, secondNum, operator)) || (equals(btn) && (secondNumberEmpty(secondNum) || operatorEmpty(operator)));


const readyToCalculate = (btn, firstNum, secondNum, operator) => equals(btn) && complete(firstNum, secondNum, operator);


const operatorAfterMinus = (btn, firstNum, secondNum) => negativeNumber(firstNum, secondNum) && anyOperator(btn);


const allowChainingOperations = (btn, firstNum, secondNum, operator) => anyOperator(btn) && !firstNumberEmpty(firstNum) && !secondNumberEmpty(secondNum);


const operatorAfterOperator = (btn, firstNum, secondNum, operator) => operatorExceptMinus(btn) && !secondNumberEmpty(secondNum) && !operatorEmpty(operator);


const allowNegativeFirstNumber = (btn, firstNum) => btn === "-" && firstNumberEmpty(firstNum);


const allowNegativeSecondNumber = (btn, operator, secondNum) => btn === "-" && !operatorEmpty(operator) && secondNumberEmpty(secondNum);


const setFirstNumber = (operator) => operatorEmpty(operator);


const setSecondNumber = (firstNum, operator) => !firstNumberEmpty(firstNum) && !operatorEmpty(operator);

// the value doesn't clear after calculation
function run(){

   let btn = this.value;
   console.log(btn)
  if (clearForm(btn, firstNum, secondNum, operator)) {
    firstNum  = "";
    secondNum = "";
    operator      = null;
    answer        = undefined;
    display.value = "";

  } else if (readyToCalculate(btn, firstNum, secondNum, operator)) {
    if (answer === undefined) {
      answer = calculate(firstNum, secondNum, operator);
    } else {
      answer = calculate(answer, secondNum, operator);
    }
    display.value = answer;

  } else if (operatorAfterMinus(btn, firstNum, secondNum, operator)) {
    firstNum = "";
    secondNum = "";
    operator = null;
    answer = undefined;
    display.value = "ERROR";

  } else if (allowChainingOperations(btn, firstNum, secondNum, operator)) {
    firstNum = calculate(firstNum, secondNum, operator);
    operator = btn;
    secondNum = "";
    display.value = firstNum;
  } else if (operatorAfterOperator(btn, firstNum, secondNum, operator)) {
    operator = btn;

  } else if (allowNegativeFirstNumber(btn, firstNum)) {
    firstNum += btn;
    display.value = firstNum;

  } else if (allowNegativeSecondNumber(btn, operator, secondNum)) {
    secondNum += btn;
    display.value = secondNum;
  
  } else if (anyOperator(btn)) {
    operator = btn;


  } else if (setFirstNumber(operator)) {
    firstNum += btn;
    display.value = firstNum;

  } else if (setSecondNumber(firstNum, operator)) {
    secondNum += btn;
    display.value = secondNum;

  }
}

/// remove jquery - use vanilla .on() could become .addEventListener

$('#saveResults').on('click', function() {
  //alert('clicked!');
  saveResult()
});
function saveResult(){
     console.log('result needs to be saved')
     alert('booom');
      let savedResult = display.value
     // the problem heres is if you add the same name it replaces saveresult it the object - i need to fix this bug 
     if(display.value){
        let nameOfCalculation =  prompt("please name the calculation?");
        //console.log(nameOfCalculation)
        savedAnswers[nameOfCalculation] = { maths: savedResult , date: new Date()}
        //console.log(savedAnswers)
        var NameKeys = Object.keys(savedAnswers)
       // console.log(NameKeys)
     }
     display.value ="";
  function addToDom(object){
    var str =""
     for (var p in object){
        str += `<div><p>${p}: ${object[p].date}</p></div>`;
     }
     return str;
  }
  $('#savedResults').html(addToDom(savedAnswers));


let deleteButton = $('<input type="button" value="delete" class="delete"/>')
let displayButton = $('<input type="button" value="display" class="result"/>')
$('section div').append(deleteButton)
$('section div').append(displayButton)

     $('section').find('div').each(function( i){
        // var key = (key)
       var num = (i)
       $(this).data('index', num).addClass("class-" + num)
         
   });

    $('.delete').bind('click', function(index) {
      console.log('clicked!', $(this).parent().data('index'), typeof $(this).parent().data('index'));
       var index = $(this).parent().data('index')
        console.log(index)
        // console.log(arrayElements.index(this))
        // var index = arrayElements.index(this);
        $(this).parent().remove()
        event.stopPropagation()
          // i need to link the object.keys to the click event 
          // because the the new elements are assign in the 
        deleteResult(savedAnswers , index , NameKeys )

       console.log(savedAnswers , NameKeys)
     });



    // function to display savedAnswer on display.value - i neeed to reference the object -jquery click event - click event on div -then

    $('.result').bind('click', function(index) {
      console.log('clicked!', $(this).parent().data('index'), typeof $(this).parent().data('index'));
       var index = $(this).parent().data('index')
        console.log(index)
        console.log('boom')
       displayResult (savedAnswers, index , NameKeys)

       
     }); 
}

function displayResult (savedAnswers, index, NameKeys){
      console.log(NameKeys[index])

      let mathKeys = NameKeys[index]
      console.log(savedAnswers[mathKeys])

       console.log(savedAnswers[mathKeys].maths)
       display.value = savedAnswers[mathKeys].maths;
}

function deleteResult(savedAnswers,  index ,NameKeys){
    console.log('stuff deleted from the dom.....not from the ')
    //console.log(savedAnswers , NameKeys);
    // problems basically the last prop in the object isn't getting deleted;
    console.log(NameKeys[index])

    let objectKey = NameKeys[index]
    console.log(NameKeys[index] + "name of the key selected to delete")  

    console.log(savedAnswers + " " + 'savedAnswers object ')
    delete savedAnswers[objectKey];

    console.log(savedAnswers + ' object after delete')

    NameKeys.pop(index);

    console.log(NameKeys);

    return savedAnswers;
}




  
