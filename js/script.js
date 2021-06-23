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
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const incomeAmount = document.querySelector('.income-amount');
const incomeInput = document.getElementsByTagName('input');
const btnCancel = document.getElementById('cancel');
const incomeTitle = document.querySelector('.income-title');
const inputAll = document.getElementsByTagName('input');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalIncome = document.querySelector('.additional_income');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');
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
        console.log(this);
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
    cancel:function() {
        for(let i = 0; i < inputAll.length; i++){
            inputAll[i].disabled = false;
            inputAll[i].value = '';

        }
        for(let i = 1; i < incomeItems.length; i++){
            incomeItems[i].remove();
        }
        for(let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
        }
        btnIncomeAdd.disabled = false;
        btnExpensesAdd.disabled = false;
        depositCheck.disabled = false;
        btnStart.style.display='block';
        btnCancel.style.display='none';
        btnIncomeAdd.style.display = 'block';
        btnExpensesAdd.disabled = 'block';
        periodAmount.textContent = '1';
        periodSelect.value = '1';
    },
    showResult:function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = this.calcPeriod();
        });   
    },
    getBudget : function (){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            this.expensesMonth = +this.expensesMonth + this.expenses[key];
            }
        },
    getIncomeMonth: function(){   
        for (let key in appData.income){
                this.incomeMonth += this.income[key];
              }
        } ,
    getTargetMonth:function (){
        return targetAmount.value / this.budgetMonth;
        },
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    getStatusIncome : function(){
        if (this.budgetDay >= 12000) {
                return 'У вас высокий уровень дохода';
            } else if (this.budgetDay > 6000 && this.budgetDay < 12000) {
                return'У вас средний уровень дохода';
            } else if (this.budgetDay <= 6000 && this.budgetDay >= 0) {
                return'К сожалению у вас уровень дохода ниже среднего';
            } else if (this.budgetDay < 0){
                return'Что то пошло не так';
            }
        },
    getInfoDeposit: function(){
        if (this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            }
            while(isNaN(this.percentDeposit));
             do{
                this.moneyDeposit = +prompt('Какая сумма заложена?');
            }
            while(isNaN(this.moneyDeposit));
            }
        },
    calcSavedMoney: function(){
        return this.budgetMonth * this.period;
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
    btnCancel.addEventListener('click', appData.cancel);

    btnStart.addEventListener ('click', function(){
        for(let i = 0; i < inputAll.length; i++){
            inputAll[i].setAttribute('disabled','disabled');
        }
        btnIncomeAdd.disabled = true;
        btnExpensesAdd.disabled = true;
        depositCheck.disabled = true;
        btnStart.style.display='none';
        btnCancel.style.display='block';
    });


