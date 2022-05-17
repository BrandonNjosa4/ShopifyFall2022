import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddLocation() {
  return (
        <div className = "m-1">
            <Link to='/addLocation' className="flex flex-row items-center">
                <FontAwesomeIcon icon={faPlus} className="ml-2"/>
                <p>Add Location</p>
            </Link>
        </div>

  )
}

export default AddLocation