'use strict';
let money = +prompt('Ваш месячный доход');
let income = 'Работа в такси';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase();
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 3000000;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let period = 12;         
let budgetMonth = money - ( amount1 + amount2 );                
let budgetDay = budgetMonth / 30;
let target = mission / budgetMonth;

// Рассчёт в тенге 1Р = 5,84тенге
if (budgetDay >= 12000) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 6000 && budgetDay < 12000) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 6000 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0){
    console.log('Что то пошло не так');
}

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' тенге');
console.log(addExpenses.split(' , '));                                          //разбиваем строку на массив
console.log('Бюджет на месяц составляет ' + budgetMonth + ' тенге');
console.log('Бюджет на один день составляет ' + Math.floor(budgetDay) + ' тенге');              
console.log('Цель будет достигнута за ' + Math.ceil(target) + ' месяцев');

