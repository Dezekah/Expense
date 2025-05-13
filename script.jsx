// Selecting correct elements from HTML
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

// Variables to store amounts
let incomeTotal = 0;
let expenseTotal = 0;

// Function to add income
function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    // Add transaction to table
    addTransaction(description, amount, 'Income');

    // Update totals
    incomeTotal += amount;
    updateSummary();

    // Clear inputs
    incomeDescription.value = '';
    incomeAmount.value = '';
}

// Function to add expense
function addExpense() {
    const description = expenseDescription.value.trim();
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    // Add transaction to table
    addTransaction(description, amount, category);

    // Update totals
    expenseTotal += amount;
    updateSummary();

    // Clear inputs
    expenseDescription.value = '';
    expenseAmount.value = '';
}

// Function to add transactions to the table
function addTransaction(description, amount, type) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${description}</td>
        <td>${type === 'Income' ? '-' : type}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionHistory.appendChild(row);

    // Add event listener to delete button
    row.querySelector('.delete-btn').addEventListener('click', function () {
        row.remove();

        // Update totals based on type
        if (type === 'Income') {
            incomeTotal -= amount;
        } else {
            expenseTotal -= amount;
        }

        updateSummary();
    });
}

// Function to update summary
function updateSummary() {
    totalIncome.textContent = incomeTotal.toFixed(2);
    totalExpenses.textContent = expenseTotal.toFixed(2);
    balance.textContent = (incomeTotal - expenseTotal).toFixed(2);
}

// Function to clear all transactions
function clearAll() {
    transactionHistory.innerHTML = '';
    incomeTotal = 0;
    expenseTotal = 0;
    updateSummary();
}