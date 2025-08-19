import { IoAnalytics } from "react-icons/io5";
import { SiInternetarchive } from "react-icons/si";
import { useSelector } from 'react-redux';

import Navbar from "../components/commonComponents/Navbar";
import Footer from '../components/commonComponents/Footer'
import AmountTracker from '../components/AmountTracker';
import Transaction from '../components/Transaction';
import { useEffect, useState } from "react";
import AnimatedSection from "../components/AnimatedSection";

export const Dashboard = () => {

 const [editingTransaction, setEditingTransaction] = useState(null);

 const { user } = useSelector(state => state.auth);
 
 console.log(user);

 const displayName = user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User';



  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
  };

  return (
    <div>
      <Navbar />
      <main className="flex-grow container pt-28 mx-auto space-y-7 px-4 py-8 max-w-7xl">
        <div className=' flex flex-col space-y-6 text-center bg-black/20 
         shadow-md rounded-xl lg:p-12 p-6  justify-between items-center '>
          <AnimatedSection className='flex flex-wrap justify-center items-center gap-2 text-white  '>
            <div className="md:text-3xl text:md font-bold  ">Welcome To The</div>
              <IoAnalytics className=' md:mt-2 sm:size-8 size-6 lg:size-10 text-emerald-500 ' />
              <h1 className="md:text-3xl text:md font-bold ">Tracker {displayName} </h1> 
              
          </AnimatedSection>
          <AnimatedSection className="md:text-lg text-xs text-gray-400"> financial tracker is a tool that helps you
            monitor your income and expenses in one place. It provides insights into your
            spending habits, helps you manage your budget, and tracks your financial goals.
            By regularly logging transactions, you can make informed decisions to improve
            your financial wellness.</AnimatedSection>
        </div>

        <div className='flex flex-col md:flex-row md:space-x-5 space-y-2 text-center bg-black/20 
         shadow-md rounded-xl sm:p-10 p-3  justify-between items-center gap-10'>
          <AmountTracker     
          editingTransaction={editingTransaction}
          cancelEditing={cancelEditing}
          />
        </div>

        <div className='flex  flex-col text-center bg-black/20 
         shadow-md rounded-xl sm:p-10  p-3  gap-5'>
            <AnimatedSection className='gap-3 text-start flex justify-center items-center'>
               <div className='sm:text-3xl text-sm text-white  font-bold text-start'>Track Your Expenses</div>
               <SiInternetarchive className="sm:text-2xl text-white  font-bold" />
            </AnimatedSection>
              <Transaction 
              startEditing={startEditing}
              editingTransactionId={editingTransaction?._id}
              />
        </div>
      </main>
      <Footer />
    </div>
  )
}




  