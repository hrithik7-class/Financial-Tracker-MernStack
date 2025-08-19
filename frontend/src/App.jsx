import { Routes, Route , Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import { Toaster } from "react-hot-toast"

import { Dashboard } from "./pages/Dashboard"
import { LoginPage } from "./pages/LoginPage"
import { SignUpPage } from "./pages/SignupPage"
import { Loading } from "./components/Loading"
import NotFound from "./pages/NotFound"

import { fetchProfile } from './feature//auth/authSlice';
import { fetchTransactions } from './feature/finance/finance.Slice';


function App() {

  const { user,loading ,isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch() 
   
    useEffect(() => {
    dispatch(fetchProfile()).then(() => {
      dispatch(fetchTransactions());
    });
  }, [dispatch]);

  if (loading && !user && isAuthenticated ) return <Loading />;
  
  return (
    <> 
      <div className=" min-h-screen text-white bg-gray-900 relative overflow-hidden">
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2  -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]'
            />
          </div>
        </div>    
        <div className='z-50  relative'>     
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
        <Toaster/>
      </div>
    </>
  )
}
export default App
