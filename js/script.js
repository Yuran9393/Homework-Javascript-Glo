'use strict';
const btnStart = document.getElementById('start');
const btnIncomeAdd = document.getElementsByTagName('button')[0];
const btnExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalIncome = document.querySelector('.additional_income');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');

let isNumber = function(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
},
appData={
    income :{},
    addIncome : [],
    expenses : {},
    addExpenses : [],
    deposit:false,
    budget:0,
    percentDeposit:0,
    moneyDeposit:0,
    incomeMonth:0,
    budgetDay:0,
    budgetMonth:0,
    expensesMonth:0,
    getAddEpenses:function(){
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome:function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    start:function() {

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getIncomeMonth();
        appData.getExpensesMonth();
        appData.getAddEpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult:function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.calcPeriod();
        });   
    },
    getBudget : function (){
                appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
                appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth = +appData.expensesMonth + appData.expenses[key];
            }
        },
    getIncomeMonth: function(){   
              for (let key in appData.income){
                  appData.incomeMonth += appData.income[key];
              }
        } ,
    getTargetMonth:function (){
           return targetAmount.value / appData.budgetMonth;
        },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
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
        },
    addExpensesBlock: function(){
           let cloneExpensesItem = expensesItems[0].cloneNode(true);
           expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
           expensesItems = document.querySelectorAll('.expenses-items');
           if(expensesItems.length === 3){
               btnExpensesAdd.style.display = 'none';
           }
        },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd );
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            btnIncomeAdd.style.display = 'none';
        }
        },
    getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] =+cashExpenses;
                }
            });
        },
    getIncome:function(){
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cachIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cachIncome !== ''){
                    appData.income[itemIncome] = +cachIncome;
                }
            });      

        },
    btnBlock: function(){
            if ( salaryAmount.value === '' ){
                btnStart.disabled = true;
            } else {
                btnStart.disabled = false;
            }
          }
    };

    salaryAmount.addEventListener('input', appData.btnBlock);
    btnStart.addEventListener ('click', appData.start); 
    btnExpensesAdd.addEventListener('click', appData.addExpensesBlock);
    btnIncomeAdd.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', function(){
    periodAmount.textContent=periodSelect.value;
    });
    appData.btnBlock();




