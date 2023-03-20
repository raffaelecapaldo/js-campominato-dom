//FUNZIONE PER GENERARE NUMERO CASUALE TRA VAL MIN E MAX (valore massimo incluso)

function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//FUNZIONE PER SOMMARE DUE NUMERI
function addNumbers (num1, num2) {
  return parseInt(num1+num2);
}

//FUNZIONE PER CONTROLARE SE UN NUMERO É PARI O DISPARI
function oddOrEven(num) {
  if (num % 2 === 0) {
    return "even";
  }
  else {
    return "odd";
  }
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}