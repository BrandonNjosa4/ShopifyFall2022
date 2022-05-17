import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddItem() {
    return (
        //START ADD ITEM
            <div >
                <Link to='/additem' className="flex flex-row items-center">
                   <FontAwesomeIcon icon={faPlus} className="ml-2"/>
                   <p>Add Item</p>
                </Link>
            </div>

        //END ADD ITEM
    )
}

export default AddItem
