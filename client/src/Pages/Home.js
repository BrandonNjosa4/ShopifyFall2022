import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {getAllItems, deleteItem, getAllLocations} from '../Context/Actions'
import Logout from '../Components/Logout'
import AddItem from '../Components/AddItem'
import AddLocation from '../Components/AddLocation'
import  {Menu}  from "@headlessui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {ToastContainer, toast} from 'react-toastify'

function Home() {
    const [items, setItems] = useState([]); 
    const [locations, setLocations] = useState([]); 
    let navigate = useNavigate()
    
    const notify = () => {
      toast.success('Item Successfully Deleted', {autoClose: 1500})
    }
    const notifyError = (msg) => {
      toast.error(msg, {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
    }
    
    const delItem = async (e, itemId) => {
      e.preventDefault()
      if (window.confirm('Are you sure you wish to delete this item?'))
      {
        const response = await deleteItem(itemId)
        // if string received, error msg, notify
        if (typeof response === 'string' ) {
          return notifyError(response)
        }
          const data = await getAllItems()
          setItems(data);
          return notify()
      }
    }
    const viewPage = (e,item) => {
        e.preventDefault()
        navigate(`/ViewItem/${item._id}`)
    }
      const changeLocation = (e, location) => {
      e.preventDefault();
      navigate(`/inventory/${location.name}/${location._id}`)
    }
    
    useEffect(() => {
      const getItems = async () => {
          const data = await getAllItems()
          setItems(data); 
      }
      getItems()
  }, [setItems])

  useEffect(() => {
    const getLocations = async () => {
      const locationData = await getAllLocations()
      setLocations(locationData)
    }
    getLocations()
  }, [])

  return   (
        <div className="flex flex-row">
           <ToastContainer />
          <Menu as="div" className="w-1/6 m-2">
          <AddLocation/>
          <Menu.Button className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            Total Inventory
            <FontAwesomeIcon icon={faChevronDown} className="ml-2"/>
          </Menu.Button>
          <Menu.Items className="rounded-md shadow-lg bg-white divide-y divide-gray-300 focus:outline-none w-11/12">
              <Menu.Item>
                <Link to="/" className="ml-2 flex flex-row items-center justify-between">
                  Total Inventory
                </Link>        
              </Menu.Item>
              {locations.length ? (
            locations.map((location) => 
                <Menu.Item key={location._id}>
                <div onClick={(e) => changeLocation(e, location)} className="ml-2 flex flex-row items-center justify-between">
                  {location.name}
                  <div>
                  <Link to={`/editLocation/${location._id}`} >
                <FontAwesomeIcon icon={faEdit} className="mr-2"/>
                  </Link>
                </div>
                </div>
                </Menu.Item>
            )) :
            null}
          </Menu.Items>

        </Menu>

        <div className=" w-full h-screen mt-20">
          <AddItem/>
        <table className="table-fixed mt-2 w-full">
          <thead>
            <tr>
              <th className="border border-slate-500 bg-blue-900 text-white">Name</th>
              <th className="border border-slate-500 bg-blue-900 text-white">Stock</th>
              <th className="border border-slate-500 bg-blue-900 text-white">Price</th>
              <th className="border border-slate-500 bg-blue-900 text-white">Notes</th>
              <th className="border border-slate-500 bg-blue-900 text-white">Location</th>
              <th className="border border-slate-500 bg-blue-900 text-white">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
            items.map((item) =>
            <tr className="hover:bg-white hover:shadow-sm" key={item._id} onClick={(e) => viewPage(e, item)}>
              <td className="text-ellipsis overflow-hidden ...">{item.name}</td>
              <td>
              {item.quantity}
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.notes}</td>
              <td className="text-ellipsis overflow-hidden ...">{item.locationName}</td>
              <td className="flex justify-center" onClick = {(e) => e.stopPropagation()}>
                <Link to={`/editItem/${item._id}`}>
                <FontAwesomeIcon icon={faEdit} className="ml-2"/>
                </Link>
                <Link to='#'>
                <FontAwesomeIcon icon={faTrashCan} className="ml-2" 
                onClick = {(e) => delItem(e, item._id)}/>
                </Link>
                </td>
            </tr>))
            : null }
          </tbody>
          </table>
          </div>
      <Logout/>
        </div>
      
      );
}

export default Home