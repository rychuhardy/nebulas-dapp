'use strict';

var ExpensivoContract = function () {

    LocalConnectionStorage.defineMapProperty(this, 'expensesMap');

};

ExpensivoContract.prototype = {
    init: function () {

    },

    addExpense: function (date, amount, title, notes, category) {
        if(Blockchain.transaction.value != 0) {
            throw new Error('Don\'t send money');
        }

        var userId = Blockchain.transaction.from;

        var currentExpenses = this.expensesMap.get(userId);
        if(!currentExpenses) {
            currentExpenses = [];
        }
        currentExpenses.push({date, amount, title, notes, category});
        this.expensesMap.put(userId, currentExpenses);



    },

    getTotalCost: function() {
        var userId = Blockchain.transaction.from;

        var currentExpenses = this.expensesMap.get(userId);
        if (!currentExpenses) {
            return 0;
        }

        var cost = currentExpenses.reduce(function(prev, curr){
            return prev + curr.amount;
        }, 0);
 
        return cost;
    },

    getAllExpenses: function(userId) {
        if(userId === undefined) {
            userId = Blockchain.transaction.from;
        }

        var result = this.expensesMap.get(userId);
        if (result === undefined) {
            result = [];
        }
        return result;
    }

};

module.exports = ExpensivoContract;
