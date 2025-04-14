import React, { useState } from 'react';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('description'); // Default sort by description

  // Handle form submission
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (description && amount && category) {
      const newExpense = { description, amount, category };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort expenses based on selected criteria
  const sortedExpenses = filteredExpenses.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  // Handle delete expense
  const handleDelete = (index) => {
    setExpenses(expenses.filter((expense, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Expense Tracker</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by description or category"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full"
      />
      
      {/* Form for Adding Expenses */}
      <form onSubmit={handleAddExpense} className="mb-4">
        <div className="flex space-x-4 mb-2">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Expense</button>
      </form>

      {/* Sorting Options */}
      <div className="mb-4">
        <button onClick={() => setSortBy('description')} className="mr-2 bg-gray-300 p-2">Sort by Description</button>
        <button onClick={() => setSortBy('category')} className="bg-gray-300 p-2">Sort by Category</button>
      </div>

      {/* Expense Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{expense.description}</td>
              <td className="p-2">{expense.amount}</td>
              <td className="p-2">{expense.category}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
