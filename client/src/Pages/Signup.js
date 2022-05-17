import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {signupUser} from '../Context/Actions'
import { useNavigate, useLocation, Link} from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function SignUp() {
    const [userData, setUserData] = useState({name: '', email: '', password: ''})
    const userRef = useRef();

    const navigate = useNavigate()

    const location = useLocation()
    const cameFrom = location.state?.from?.pathname || '/inventory'

      const notify = (msg) => {
      toast.error(msg, {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }
    

    const submitHandler = async (e) => {
        e.preventDefault()
        const user = await signupUser(userData)
        // if string received, error msg, notify
        if (typeof user === 'string' ) {
          console.log(user)
            return notify(user)      
        }
        //navigate user to home or to the prev page requested 
        if (JSON.parse(localStorage.getItem("userInfo"))) 
        {
            navigate(cameFrom, {replace: true})
        }
    }

      useEffect(() => {
        if (JSON.parse(localStorage.getItem("userInfo"))) {
                navigate('/inventory', {replace: true})
        }
        userRef.current.focus();
    }, [])

  return (
    <div className="flex justify-center h-full">
      <form className="flex justify-center flex-col" onSubmit= {submitHandler}>
        <label>Name</label>
        <input type="text" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange={(e) => setUserData({...userData, name:e.target.value})} ref={userRef}/>
        <label >E-Mail</label>
        <input type="email" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange={(e) => setUserData({...userData, email:e.target.value})}/>
        <label >Password</label>
        <input type="password" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange={(e) => setUserData({...userData, password:e.target.value})}/>
        <button className="bg-blue-900 mt-2  w-full
        hover:opacity-95 hover:shadow-sm text-white font-bold rounded-md" 
        >
        Sign Up
        </button>
        <Link to= "/" className="mt-2 underline hover:text-slate-600 flex justify-center">
          Login here
        </Link> 
          </form>
    </div>
  )
}

export default SignUp