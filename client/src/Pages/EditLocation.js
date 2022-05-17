import React from 'react'
import Submit from '../Components/Submit'
import { Link , useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {updateLocation, getLocation, deleteLocation} from '../Context/Actions'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function EditLocation() {
 const [location, setLocation] = useState({name: '', address: '', phone: ''})
   const params = useParams()
   const navigate = useNavigate()
const notify = () => {
    toast.success('Location Successfully Updated', {autoClose: 1750})
  }
const notify2 = () => {
    toast.success('Location Successfully Deleted', {autoClose: 1750})
  }

const notifyError = (msg) => {
    toast.error(msg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
  }

 const submitHandler = async (e) => {
    e.preventDefault()
    const response = await updateLocation(location, params.locationId);
    if (typeof response === 'string' ) {
      return notifyError(response)
    }
        notify()
        navigate('/inventory') 
  }

      const delItem = async (e) => {
      e.preventDefault()
      if (window.confirm('Are you sure you wish to delete this Location? it will delete all corresponding items.'))
      {
        const response = await deleteLocation(params.locationId)
        //if string received, error msg, notify
        if (typeof response === 'string' ) {
          return notifyError(response)
        }
          notify2()
          navigate('/inventory') 
      }
    }

    useEffect(() => {
        const getLocationData = async () => {
            const data = await getLocation(params.locationId);
            setLocation(data);
        }
        getLocationData()
    }, [])


  return (
    <div className="flex justify-center h-full">
      <form className="flex justify-center flex-col mb-4" onSubmit = {submitHandler}>
        <Link to="/inventory" className="flex flex-row items-center mb-4">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" className="flex justify-start mr-1"/>
        </Link>
        <label >Location Name</label>
        <input type="input" value={location.name} onChange = {(e) => setLocation({...location, name:e.target.value})} className= "outline-none w-96 h-8 shadow-sm mb-2"/>
        <label >Address</label>
        <input type="input" value={location.address} onChange = {(e) => setLocation({...location, address:e.target.value})} className= "outline-none w-96 h-8 shadow-sm mb-2"/>
        <label >Phone Number</label>
        <input type="input" value={location.phone} onChange = {(e) => setLocation({...location, phone:e.target.value})} className= "outline-none w-96 h-8 shadow-sm mb-2"/>
        <div className= "flex justify-center">
        <Submit/>
        <Link to='#'>
        <FontAwesomeIcon icon={faTrashCan} className="ml-2" 
          onClick = {(e) => delItem(e, location._id)}/>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditLocation