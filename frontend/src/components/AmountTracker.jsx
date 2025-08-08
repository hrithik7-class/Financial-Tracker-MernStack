import { useState, useEffect } from 'react';
import { IndianRupee,  Proportions } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, updateTransaction } from '../feature/finance/finance.Slice'; 
import AnimatedSection from './AnimatedSection';
import AnimatedSectionX from './AnimatedSectionX';

const AmountTracker = ({ editingTransaction, cancelEditing }) => {
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector(state => state.finance);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (!loading && !error) {
      setAmount('');
      setDescription('');
      setType('');
    }
  }, [loading, error]);

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description);
      setType(editingTransaction.type);
    } else {
      setAmount('');
      setDescription('');
      setType('');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !type) return;

    if (editingTransaction) {
      dispatch(updateTransaction({ id: editingTransaction._id, data: { amount: Number(amount), description, type } }))
        .then(() => cancelEditing());
    } else {
      dispatch(createTransaction({ amount: Number(amount), description, type }));
      setAmount('');
      setDescription('');
      setType('');
    }
  };

  const totalIncome = transactions ? transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, cur) => acc + cur.amount, 0) : 0;

  const totalExpense = transactions ? transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, cur) => acc + cur.amount, 0) : 0;

  const total = totalIncome - totalExpense;

  
  const disableExpenseOption = total <= 0 && (!editingTransaction || editingTransaction.type !== 'expense');

  return (
    <>
      <div className='md:w-2/3 w-full order-1 flex flex-col space-y-2 text-white rounded-lg shadow-md bg-gray-800 p-3'>
        <AnimatedSection className="sm:text-2xl text-xs font-bold mt-3">
          {editingTransaction ? 'Edit Transaction' : "Let's Start To Track Your Monetary"}
        </AnimatedSection>

        

        <form onSubmit={handleSubmit} className='space-y-5'>

          <AnimatedSection>
            <label htmlFor='amount' className='block md:text-sm text-xs font-medium text-gray-300 text-start'>Enter Amount</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <IndianRupee className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </div>
              <input
                id='amount'
                type="number"
                min="0"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm placeholder:text-xs'
                placeholder='Enter the amount'
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <label htmlFor='description' className='block md:text-sm text-xs font-medium text-gray-300 text-start'>Enter Amount Description</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Proportions className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </div>
              <input
                id='description'
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm placeholder:text-xs'
                placeholder='Description of amount'
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <label htmlFor='type' className='block md:text-sm text-xs font-medium text-gray-300 text-start'>Select Transaction Type</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <select
                id='type'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
              >
                <option value='' disabled>-- Select type --</option>
                <option value='income'>Income</option>
                <option value='expense' disabled={disableExpenseOption}>Expense</option>
              </select>
            </div>
          </AnimatedSection>

          <div className='flex justify-between items-center'>
            {editingTransaction && (
              <button
                type='button'
                onClick={cancelEditing}
                className='py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-500 transition text-white'
                disabled={loading}
              >
                Cancel
              </button>
            )}

            <button
              type='submit'
              className='ml-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? 'Saving...' : editingTransaction ? 'Update' : 'Save'}
            </button>
          </div>

        </form>
      </div>

      <div className='md:w-1/3 w-full order-2 flex flex-col space-y-4 text-white p-1'>
        <AnimatedSectionX className='w-full flex flex-col space-y-2 text-white rounded-lg shadow-md bg-gray-800 p-3'> 
          <h1 className="md:text-xl text:sm font-bold">Income</h1>
          <span className='w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-xs text-start text-green-300'>₹ {total.toFixed(2)}</span>
        </AnimatedSectionX>

        <AnimatedSectionX className='w-full flex flex-col space-y-2 text-white rounded-lg shadow-md bg-gray-800 p-3'>
          <h1 className="md:text-xl text:sm font-bold">Expense</h1>
          <span className='w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-xs text-start text-red-300'>₹ {totalExpense.toFixed(2)}</span>
        </AnimatedSectionX>
      </div>
    </>
  )
}

export default AmountTracker;
