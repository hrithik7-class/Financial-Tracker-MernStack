import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
    <div className='flex flex-col  font-bold text-center mt-32 mx-auto'>
        <h1 className="sm:text-3xl text-sm">404 Error Page NOt Found</h1>
        <p className="sm:text-xl text-xs mt-2">Sorry, the page you are looking for does not exist</p> 
        <button className="mt-5">
          <Link to='/' className='text-emerald-500 hover:text-emerald-600
           bg-white rounded-lg p-2'>Go back to Home</Link>
        </button>
        </div>
    </>
  ) 
}
export default NotFound