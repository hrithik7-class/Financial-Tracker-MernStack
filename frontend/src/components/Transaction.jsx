import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import ConfirmCard from '../components/ConfirmCard'; 
import { deleteTransaction as deleteTransactionThunk } from '../feature/finance/finance.Slice'; 
import AnimatedSection from './AnimatedSection';
import AnimatedSectionX from './AnimatedSectionX';

const Transaction = ({ startEditing, editingTransactionId }) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector(state => state.finance);

  const [deleteStep, setDeleteStep] = useState(0); 
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteStep(1);
  };

  const handleCancel = () => {
    setDeleteStep(0);
    setSelectedId(null);
  };

  const handleFirstConfirm = () => {
    setDeleteStep(2);
  };

  const handleFinalDelete = () => {
    dispatch(deleteTransactionThunk(selectedId));
    setDeleteStep(0);
    setSelectedId(null);
  };

  const handleUpdate = (transaction) => {
    if (startEditing) {
      startEditing(transaction);
    }
  };

  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-white py-8">No transactions found.</p>;
  }
   
  return (
    <>
      {transactions.map(tx => {
        const isIncome = tx.type === 'income';

        const isEditingThis = editingTransactionId === tx._id;
        const isAnyEditing = !!editingTransactionId;

        return (
          <AnimatedSection
            key={tx._id}
            className={`flex sm:flex-row flex-col sm:justify-between sm:items-center items-start
              ${isIncome ? 'bg-[#d1fae5] text-[#065f46]' : 'bg-[#fee2e2] text-[#b91c1c]'} 
              shadow-md rounded-md p-2 sm:gap-5 gap-3`}
          >
            <h3 className="text-md font-bold">₹ {tx.amount}{isIncome ? "+" : "-"}</h3>
            <span className="sm:text-md text-xs text-start">{tx.description}</span>
            <div className="text-lg font-semibold flex gap-3">
              <span className="sm:text-md text-sm font-bold">{isIncome ? 'Income' : 'Expense'}</span>
              {isIncome 
                ? <GiReceiveMoney className="sm:text-2xl text-lg text-emerald-800 font-bold" /> 
                : <GiPayMoney className="sm:text-2xl text-lg text-red-600 font-bold" />}
            </div>
            <span className="sm:text-sm text-xs  font-bold">{tx.date}</span>
            <div className="sm:text-lg text-xs font-semibold  flex gap-3">
              
              <AnimatedSectionX>
                <button
                onClick={() => handleDeleteClick(tx._id)}
                className="sm:text-sm text-xs text-white  font-bold bg-[#991b1b] p-1 rounded-md"
                disabled={isAnyEditing} 
              >
                Delete
              </button>
              </AnimatedSectionX>
              
              <AnimatedSectionX>
                <button
                onClick={() => handleUpdate(tx)}
                className={`sm:text-sm text-xs font-bold p-1 rounded-md ${isEditingThis ? 'bg-gray-600 text-white' : 'bg-green-800 text-white'}`}
                disabled={isAnyEditing && !isEditingThis} 
              >
                {isEditingThis ? 'Editing' : 'Update'}
              </button>
              </AnimatedSectionX>
              
            </div>
          </AnimatedSection>
        );
      })}

      {deleteStep === 1 && (
        <ConfirmCard
          title="Confirm Deletion"
          message="Do you really want to delete this transaction?"
          onCancel={handleCancel}
          onConfirm={handleFirstConfirm}
          confirmText="Next"
        />
      )}

      {deleteStep === 2 && (
        <ConfirmCard
          title="Are you sure?"
          message="This action is irreversible. Please confirm Delete."
          onCancel={handleCancel}
          onConfirm={handleFinalDelete}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default Transaction;
