import React from 'react'
import {getItem} from '../Context/Actions'
import { Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ViewItem() {
    const [item, setItem] = useState({name: '', price: '', quantity: '', location: '', notes: ''})

    const params = useParams()

      useEffect(() => {
        const getSingleItem = async () => {
            const data = await getItem(params.itemId);
            setItem(data);
        }
        getSingleItem()
    }, [])

  return (
       <div className="flex justify-center h-full">
         <ToastContainer />
      <form className="flex justify-center flex-col mb-4">
        <Link to="/inventory" className="flex flex-row items-center mb-4">
          <FontAwesomeIcon icon={faArrowLeft} size="xl" className="flex justify-start mr-1"/>
        </Link>
        <div className="flex flex-row">
        <label>Name:&nbsp;</label>
        <p></p>{item.name}<p/>
        </div>
        <div className="flex flex-row">
        <label>Stock:&nbsp;</label>
        <p>{item.quantity}</p>
        </div>
         <div className="flex flex-row">
        <label>Price:&nbsp;</label>
        <p>${parseFloat(item.price).toFixed(2)}</p>
         </div>
         <div className="flex flex-row">
        <label>Location:&nbsp;</label>
        <p>{item.locationName}</p>
         </div>
         <div className="flex flex-row">
        <label>Notes:&nbsp;</label>
        <p>{item.notes}</p>
         </div>
      </form>
    </div>
  )
}

export default ViewItem