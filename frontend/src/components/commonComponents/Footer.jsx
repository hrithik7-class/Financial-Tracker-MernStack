import { Link } from 'react-router-dom';
import {  FaMapMarkerAlt } from 'react-icons/fa';
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useSelector } from 'react-redux';


function Footer() {
  const {user} = useSelector((state) => state.auth);
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10 mt-12">
        <div >
          <div to="/" className=" flex space-x-2  font-bold text-white ">
            <IoAnalytics className='mt-1 md:mt-2 md:size-8 size-4 text-emerald-400' />
            <span className=' text-sm md:text-3xl '>Financial Tracker</span>
          </div>
          <p className='text-sm md:text-xl mt-5 text-start'>A financial tracker is a tool that helps you monitor your 
            income and expenses in one place. It provides insights into your spending habits, helps you manage 
            your budget, and tracks your financial goals.</p>
            <div className='flex gap-3 mt-8'>
              <Link to="#" className='py-3 px-4 bg-white/10 rounded-md hover:bg-emerald-500 ease-linear duration-200'>
              <FaFacebook sm:size={25}  size={16}/>
              </Link>
              <Link to="#" className='py-3 px-4 bg-white/10 rounded-md hover:bg-emerald-500 ease-in-out duration-200'>
              <FaInstagram sm:size={25} size={16} />
              </Link>
              <Link to="#" className='py-3 px-4 bg-white/10 rounded-md hover:bg-emerald-500 ease-in-out duration-200'>
              <FaSquareXTwitter sm:size={25} size={16} />
              </Link>
              <Link to="#" className='py-3 px-4 bg-white/10 rounded-md hover:bg-emerald-500 ease-in-out duration-200'>
              <FaLinkedinIn sm:size={25}  size={16}/>
              </Link>
            </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-5">Platform</h3>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal">Executive Dashboard</Link></li>
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal">Advanced Analytics</Link></li>
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal ">Smooth Transaction</Link></li>
            <li><Link to="#" className="hover:text-emerald-400  sm:text-xl text-md font-normal">Transaction History</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-5">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal">Money view</Link></li>
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal">Simplifi by Quicken</Link></li>
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal ">NerdWallet</Link></li>
            <li><Link to="#" className="hover:text-emerald-400 sm:text-xl text-md font-normal">Financial Literacy Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-5">Contact</h3>
          <div className='flex  space-x-3 mb-2'>
            <MdOutlineMailLock className='sm:text-2xl text-md text-emerald-400' />
            <p className='sm:text-xl text-sm '>{user?.name}@gmail.com</p>
          </div>

          <div className='flex  space-x-3 mb-3 '>
            <IoCallOutline className='sm:text-2xl  text-emerald-400' />
            <p className='sm:text-xl text-sm'>+91 936990xxxx</p>
          </div>

          <div className='flex  space-x-3 '>
            <FaMapMarkerAlt className='sm:text-2xl  text-emerald-400' />
            <p className='sm:text-xl text-sm'>Navi Mumbai, India</p>
          </div>
        </div>

      </div>



      <div className="text-center text-lg mt-16">
        <p>&copy; 2025 Financial Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;