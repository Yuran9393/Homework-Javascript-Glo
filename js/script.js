'use strict';
let money;
let income = 'Работа в такси';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase();
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 3000000;
let period = 12;         
let accumulatedMonth;          
let budgetDay;
let target;
let sumAmount;
let expenses=[];
let sum=0;
let count;
// Проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
};
//Доход за месяц
let start = function() {
    do {
        money = +prompt('Ваш месячный доход');
    }
    while(!isNumber(money));};

let showTypeOf = function(data){
    return typeof data;
};
//Обязательные расходы
let getExpensesMonth = function(){
    for (let i = 0; i < 2; i++){
            expenses[i] = prompt('Введите обязательную статью расходов');
            do {
                count = +prompt('Во сколько это обойдется?'); 
            } while (!isNumber(count));
            sum = +sum + count;             
    }
    return sum;
};
let expensesAmount = getExpensesMonth();
//Доход-расход
function getAccumulatedMonth(){
    accumulatedMonth = money - expensesAmount;
    return accumulatedMonth;
}
//Цель
function getTargetMonth(){
    target = mission / accumulatedMonth;
    if (target < 0 ){
        return 'Цель будет не достигнута'; 
    }
    return 'Цель будет достигнута за ' + Math.ceil(target) + ' месяцев';
}

let getStatusIncome = function(){
    if (budgetDay >= 12000) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay > 6000 && budgetDay < 12000) {
        return'У вас средний уровень дохода';
    } else if (budgetDay <= 6000 && budgetDay >= 0) {
        return'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0){
        return'Что то пошло не так';
    }
};

start();
getAccumulatedMonth();
budgetDay = accumulatedMonth / 30;
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы в месяц составляют ' + expensesAmount + ' тенге');
console.log(addExpenses.split(' , '));  
console.log(getTargetMonth());
console.log('Бюджет на один день составляет ' + Math.floor(budgetDay) + ' тенге');   
console.log(getStatusIncome());                                

