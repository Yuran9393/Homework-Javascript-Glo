'use strict';
let money = 230000;
let income = 'Работа в такси';
let addExpenses = 'Коммуналка, автомобиль, детский сад, интернет'.toLowerCase();
let deposit = true;
let mission = 3000000;
let period = 12;                            //Бюджет за 1 день

console.log( typeof(money), typeof(income), typeof(deposit) );
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' тенге');
console.log(addExpenses.split(' , '));              //разбиваем строку на массив

let budgetDay= money / 30;
console.log(budgetDay.toFixed(0) + ' тенге');                 //количество символов после запятой