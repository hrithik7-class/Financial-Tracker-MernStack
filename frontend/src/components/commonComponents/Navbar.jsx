import {  useDispatch } from 'react-redux';
import { logoutUser } from '../../feature/auth/authSlice';
import { Link ,useNavigate } from 'react-router-dom'
import { IoAnalytics } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
    toast.success('Logged out successfully');
  };


  return (
    <nav className="   py-4 md:px-7 px-4 left-0 w-full fixed top-0  bg-gray-900 bg-opacity-90
    backdrop-blur-md shadow-lg z-50 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto flex justify-between items-center ease-in-out duration-200">
        <div className="flex items-center justify-start w-1/3 ">
          <Link to="/" className=" flex space-x-2  font-bold text-white justify-center items-center ">
            <IoAnalytics className=' md:mt-2 sm:size-8 size-6 lg:size-10 text-emerald-500 ' />
            <span className=' text-xs lg:text-3xl  sm:text-xl text-emerald-500'>Financial Tracker</span>
          </Link>
        </div>

        <div className="flex justify-end  items-center font-semibold  lg:text-lg md:text:md text:sm w-2/3 ">
          <div className='flex gap-1  items-center'>
            <button onClick={handleLogout} className='text-lg  bg-emerald-600
             hover:bg-emerald-900 p-2  rounded-md text-white' >
              <span className=' flex items-center space-x-2 font-semibold '>
                  <p className='hidden sm:block'>Logout</p>
                  <IoLogInOutline className='text-xl text-center text-white' />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


