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
let accumulatedMonth;          
let budgetDay;
let target;
let sumAmount;

let showTypeOf = function(data){
    return typeof data;
};

function getExpensesMonth(){
    sumAmount = amount1 + amount2;
    return sumAmount;
}

function getAccumulatedMonth(){
    accumulatedMonth = money - sumAmount;
    return accumulatedMonth;
}

function getTargetMonth(){
    target = mission / accumulatedMonth;
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

getExpensesMonth();
getAccumulatedMonth();
budgetDay = accumulatedMonth / 30;
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы в месяц составляют ' + getExpensesMonth() + ' тенге');
console.log(addExpenses.split(' , '));  
console.log(getTargetMonth());
console.log('Бюджет на один день составляет ' + Math.floor(budgetDay) + ' тенге');   
console.log(getStatusIncome());                                

