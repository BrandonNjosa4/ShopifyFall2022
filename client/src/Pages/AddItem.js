import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {newItem, getAllLocations} from '../Context/Actions'
import Submit from '../Components/Submit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import { Menu } from '@headlessui/react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function AddItem() {
 const [item, setItem] = useState({name: '', price: '', quantity: '', location: '', notes: ''})
 const [locations, setLocations] = useState([]); 
 const [select, setSelect] = useState("---")

    let navigate = useNavigate()
    const notify = () => {
        toast.success('Item Successfully Created', {autoClose: 1750})
    }
    const notifyError = (msg) => {
        toast.error(msg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
    }

     const submitHandler = async (e) => {
        e.preventDefault()
        const response = await newItem(item)
        // if string received, error msg, notify
        if (typeof response === 'string' ) {
            return notifyError(response)
        }
        //navigate user to home 
        notify()  
       navigate(('/inventory'), {replace: true})
    }

    const set = (e, location) => {
      e.preventDefault()
      setSelect(location.name)
      setItem({...item, location:location._id})
    }

    useEffect(() => {
    const getLocations = async () => {
      const locationData = await getAllLocations()
      setLocations(locationData)
    }
    getLocations()
  }, [])

  return (
        <div className="flex justify-center h-full">
      <form className="flex justify-center flex-col mb-4" onSubmit={submitHandler}>

        <Link to="/inventory" className="flex flex-row items-center mb-4">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" className="flex justify-start mr-1"/>
        </Link>
        <label >Name</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setItem({...item, name:e.target.value})}/>
        <label >Stock</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setItem({...item, quantity:e.target.value})}/>
        <label >Price</label>
        <input type="input" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setItem({...item, price:e.target.value})}/>
        <label >Notes</label>
        <textarea type="paragraph_text" rows="10" className= "outline-none w-96 h-8 shadow-sm mb-2" onChange = {(e) => setItem({...item, notes:e.target.value})}/>
         <label >Location</label>
          <Menu as="div">
          <Menu.Button className="border border-gray-300 shadow-sm w-96 h-8 mb-4 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            {select}
            <FontAwesomeIcon icon={faChevronDown} className="ml-2"/>
          </Menu.Button>
          <Menu.Items className="rounded-md shadow-lg bg-white divide-y divide-gray-300 focus:outline-none w-11/12">
            {locations.map((location) => 
                <Menu.Item onClick={(e) => set(e,location)}>
                <div className="ml-2 flex flex-row items-center justify-between">
                  {location.name}
                  </div>
                </Menu.Item>
            )}
          </Menu.Items>

        </Menu>
        <div className= "flex justify-center">
        <Submit />
        </div>
      </form>
    </div>
  )
}

export default AddItem