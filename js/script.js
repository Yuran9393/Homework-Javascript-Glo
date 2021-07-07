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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalIncome = document.querySelector('.additional_income');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');
let isNumber = function(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
};
class AppData {
    constructor(){
        this.income ={};
        this.addIncome  = [];
        this.expenses  = {};
        this.addExpenses =  [];
        this.deposit= false;
        this.budget=0;
        this.percentDeposit=0;
        this.moneyDeposit=0;
        this.incomeMonth=0;
        this.budgetDay=0;
        this.budgetMonth=0;
        this.expensesMonth=0;
}
    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getAddEpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
}
    getAddEpenses(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
}
    getAddIncome(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
}
    cancel() {
        for(let i = 0; i < inputAll.length; i++){
            inputAll[i].disabled = false;
            inputAll[i].value = '';

        }
        for(let i = 1; i < incomeItems.length; i++){
            incomeItems[i].remove();
        }
        incomeItems[0].children[0].value = '';
        incomeItems[0].children[1].value = '';
        for(let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
        }
        expensesItems[0].children[0].value = '';
        expensesItems[0].children[1].value = '';
        
        btnIncomeAdd.disabled = false;
        btnExpensesAdd.disabled = false;
        depositCheck.disabled = false;
        btnStart.style.display='block';
        btnCancel.style.display='none';
        btnIncomeAdd.style.display = 'block';
        btnExpensesAdd.disabled = 'block';
        periodAmount.textContent = '1';
        periodSelect.value = '1';
}
    showResult(){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = _this.calcPeriod();
        });   
}
getInfoDeposit(){
    if (this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
        }
}
    getBudget(){
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
}
    getExpensesMonth(){
        for (let key in this.expenses) {
            this.expensesMonth = +this.expensesMonth + this.expenses[key];
            }
}
    getIncomeMonth(){   
        for (let key in this.income){
                this.incomeMonth += this.income[key];
            }
}
    getTargetMonth (){
        return targetAmount.value / this.budgetMonth;
}
    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
}
    getStatusIncome(){
        if (this.budgetDay >= 12000) {
                return 'У вас высокий уровень дохода';
            } else if (this.budgetDay > 6000 && this.budgetDay < 12000) {
                return'У вас средний уровень дохода';
            } else if (this.budgetDay <= 6000 && this.budgetDay >= 0) {
                return'К сожалению у вас уровень дохода ниже среднего';
            } else if (this.budgetDay < 0){
                return'Что то пошло не так';
            }
}

    calcSavedMoney(){
        return this.budgetMonth * this.period;
}
    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            btnExpensesAdd.style.display = 'none';
        }
}
    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomeAdd );
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            btnIncomeAdd.style.display = 'none';
        }
}
    getExpenses(){
        const _this = this;
        expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    _this.expenses[itemExpenses] =+cashExpenses;
                }
        });
}
    getIncome(){
        const _this = this;
        incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cachIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cachIncome !== ''){
                    _this.income[itemIncome] = +cachIncome;
                }
        });      
}
    btnBlock(){
        if ( salaryAmount.value === '' ){
                btnStart.disabled = true;
            } else {
                btnStart.disabled = false;
            }
}
    percentNew(){
        if(depositPercent.value < 0 || depositPercent.value > 100) {
            alert ('Введите корректное значение в поле проценты');
            btnStart.disabled = true;   
        } else {
            btnStart.disabled = false;
        }
    }
    chancgePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other'){
        depositPercent.style.display = 'inline-block';
    } else {
        depositPercent.style.display = 'none';
}
    }
    depositHandler(){
        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.chancgePercent);
        } else{
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.chancgePercent);
        }

    }
    EventListeners(){
        const _this = this;
        salaryAmount.addEventListener('input',()=>{
            this.btnBlock();
        });
        btnStart.addEventListener ('click', ()=>{
            this.start();
        }); 
        btnExpensesAdd.addEventListener('click', ()=>{
            this.addExpensesBlock();
        });
        btnIncomeAdd.addEventListener('click',()=>{
             this.addIncomeBlock();
            });
        periodSelect.addEventListener('input', ()=>{
        periodAmount.textContent=periodSelect.value;
        });
        _this.btnBlock();
        btnCancel.addEventListener('click', ()=>{
            this.cancel();
        });
        btnStart.addEventListener ('click', ()=>{
            for(let i = 0; i < inputAll.length; i++){
                inputAll[i].setAttribute('disabled','disabled');
        }
            btnIncomeAdd.disabled = true;
            btnExpensesAdd.disabled = true;
            depositCheck.disabled = true;
            btnStart.style.display='none';
            btnCancel.style.display='block';
            
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input',()=>{
             this.percentNew();
        });

    }
}
const appData = new AppData();
appData.EventListeners();




     




