'use strict';
let money = 230000;
let income = 'Работа в такси';
let addExpenses = 'Коммуналка, автомобиль, детский сад, интернет'.toLowerCase();
let deposit = true;
let mission = 3000000;
let period = 12;                         
let budgetDay;
let expenses1;
let expenses2;
let amount1;
let amount2;
let budgetMonth;
let target;

money=+prompt('Ваш месячный доход');
addExpenses=prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit=!!prompt('Есть ли у вас депозит в банке?');
expenses1=prompt('Введите обязательную статью расходов?');
amount1=+prompt('Во сколько это обойдется?');
expenses2=prompt('Введите обязательную статью расходов?');
amount2=+prompt('Во сколько это обойдется?');

budgetMonth= money - ( amount1 + amount2 );
target= mission / budgetMonth;
budgetDay= budgetMonth / 30;

// Рассчёт в тенге 1Р = 5,84тенге
if (budgetDay >= 12000) {
    console.log('У вас высокий уровень дохода');
}
if (budgetDay > 6000 && budgetDay < 12000) {
    console.log('У вас средний уровень дохода');
}
if (budgetDay <= 6000 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
if (budgetDay < 0){
    console.log('Что то пошло не так');
}

console.log( typeof(money), typeof(income), typeof(deposit) );
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' тенге');
console.log(addExpenses.split(' , '));                          //разбиваем строку на массив
console.log('Бюджет на месяц составляет ' + budgetMonth + ' тенге');
console.log('Бюджет на один день составляет ' + Math.floor(budgetDay) + ' тенге');              
console.log('Цель будет достигнута за ' + Math.ceil(target) + ' месяцев');

