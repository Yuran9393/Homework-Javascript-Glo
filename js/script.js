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
let appData={
    income :{},
    addIncome : [],
    cachIncome:0,
    expenses : {},
    addExpenses : [],
    deposit:false,
    mission : 1000000,
    period : 12,  
    budget:money,
    percentDeposit:0,
    moneyDeposit:0,
    budgetDay:0,
    budgetMonth:0,
    expensesMonth:0,
    getBudget : function (){
                appData.budgetMonth = appData.budget - appData.expensesMonth;
                appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    asking: function(){
        if (confirm ( 'Есть ли у Вас дополнительный зароботок?')){
            let itemIncome;
            do {
                 itemIncome = +prompt('Какой у Вас есть дополнительный заработок?');
              } while ( !isNaN(itemIncome) );
                let cachIncome;
            do {        
                cachIncome = +prompt('Сколько в месяц вы зарабатываете на нём?');
                } while ( isNaN(cachIncome));
                appData.income[itemIncome] = cachIncome;
            }

            let addExpenses;
            do {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');  
            } while(!isNaN(addExpenses));
                appData.addExpenses=addExpenses;
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
                    for (let i = 0; i < 2; i++){
                        let expenses,amount;
                        do {
                            expenses = prompt('Введите обязательную статью расходов');
                        } while (!isNaN(expenses));
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
        },

    getTargetMonth:function (){
            appData.getTargetMonth = appData.mission / appData.budgetMonth;
            appData.getTargetMonth = Math.ceil(appData.getTargetMonth);
            if (appData.getTargetMonth < 0 ){
                return 'Цель будет не достигнута'; 
            }
            return 'Цель будет достигнута за ' + appData.getTargetMonth + ' месяцев';
        },
        
    getStatusIncome : function(){
            if (appData.budgetDay >= 12000) {
                return 'У вас высокий уровень дохода';
            } else if (appData.budgetDay > 6000 && appData.budgetDay < 12000) {
                return'У вас средний уровень дохода';
            } else if (appData.budgetDay <= 6000 && appData.budgetDay >= 0) {
                return'К сожалению у вас уровень дохода ниже среднего';
            } else if (appData.budgetDay < 0){
                return'Что то пошло не так';
            }
        },

        getInfoDeposit: function(){
            if (appData.deposit){
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?');
                }
                while(isNaN(appData.percentDeposit));
                do{
                    appData.moneyDeposit = +prompt('Какая сумма заложена?');
                }
                while(isNaN(appData.moneyDeposit));
            }
        },

        calcSavedMoney: function(){
            return this.budgetMonth * appData.period;
        }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

console.log( appData.addExpenses.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(', ') + ' ');
console.log('Расходы в месяц составляют: ' + appData.expensesMonth + ' тенге');
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth) + ' месяцев');
console.log(appData.getStatusIncome()); 

for (let key in appData){
    console.log('Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}


