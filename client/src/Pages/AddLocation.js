import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import {createLocation} from '../Context/Actions'
import Submit from '../Components/Submit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'

function AddLocation() {
 const [location, setLocation] = useState({name: '', address: '', phone: ''})

    let navigate = useNavigate()
    const notify = () => {
        toast.success('Location Successfully Created', {autoClose: 1750})
    }
    const notifyError = (msg) => {
        toast.error(msg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
    }


     const submitHandler = async (e) => {
        e.preventDefault()
        const response = await createLocation(location)
        console.log(response)
        // if string received, error msg, notify
        if (typeof response.data.msg === 'string' ) {
            return notifyError(response.data.msg)
        }
        //navigate user to home 
        notify()  
       navigate(('/inventory'), {replace: true})
    }

  return (
    <div className="flex justify-center h-full">
      <form className="flex justify-center flex-col mb-4" onSubmit={submitHandler}>
        <Link to="/inventory" className="flex flex-row items-center mb-4">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" className="flex justify-start mr-1"/>
        </Link>
        <label >Location Name</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setLocation({...location, name:e.target.value})}/>
        <label >Address</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setLocation({...location, address:e.target.value})}/>
        <label >Phone Number</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setLocation({...location, phone:e.target.value})}/>
        <div className= "flex justify-center">
        <Submit />
        </div>
      </form>
    </div>
  )
}

export default AddLocation