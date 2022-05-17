import React from 'react'
import { useNavigate} from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/')
    localStorage.removeItem('userInfo')
  }

  return (
        <div className="w-1/12 m-2 mr-6">
          
        <button onClick={handleSubmit} className="bg-blue-900  w-full
        hover:opacity-95 hover:shadow-sm text-white font-bold rounded-md" //onClick={handleSubmit}
        >
        Logout
        </button>
        </div>
  )
}

export default Logout