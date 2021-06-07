'use strict';
let  money,
isNumber = function(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
},
start = function() {
    do {
        money = +prompt('Ваш месячный доход');
    }
    while(!isNumber(money));};
    start();
let amount,
appData={
    income :{},
    addIncome : [],
    expenses : {},
    addExpenses : [],
    deposit:false,
    mission : 1000000,
    period : 12,  
    budget:money,
    budgetDay:0,
    budgetMonth:0,
    expensesMonth:0,
    asking: function(){
                let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                appData.addExpenses=addExpenses.toLowerCase().split(' , ');
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
                    for (let i = 0; i < 2; i++){
                        let expenses;
                        expenses = prompt('Введите обязательную статью расходов');
                        do {
                            amount = +prompt('Во сколько это обойдется?');
                    }   while (!isNumber(amount));
                    appData.expenses[expenses] =+amount;
            }
        },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
            }
            return appData.expensesMonth;
        }
    };
   

appData.getBudget = function (){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
    return appData.budgetMonth;
};

appData.getTargetMonth = function (){
    appData.getTargetMonth = appData.mission / appData.budgetMonth;
    if (appData.getTargetMonth < 0 ){
        return 'Цель будет не достигнута'; 
    }
    return 'Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth) + ' месяцев';
};

appData.getStatusIncome = function(){
    if (appData.budgetDay >= 12000) {
        return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay > 6000 && appData.budgetDay < 12000) {
        return'У вас средний уровень дохода';
    } else if (appData.budgetDay <= 6000 && appData.budgetDay >= 0) {
        return'К сожалению у вас уровень дохода ниже среднего';
    } else if (appData.budgetDay < 0){
        return'Что то пошло не так';
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
                              

console.log('Расходы в месяц составляют: ' + appData.expensesMonth);
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth) + ' месяцев');
console.log(appData.getStatusIncome()); 
for (let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}