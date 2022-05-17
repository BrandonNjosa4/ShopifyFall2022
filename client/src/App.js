import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import AddLocation from './Pages/AddLocation'
import EditLocation from './Pages/EditLocation'
import AddItem from './Pages/AddItem'
import EditItem from './Pages/EditItem'
import ViewItem from './Pages/ViewItem'
import LocationInventory from './Pages/LocationInventory'
import RequireAuth from './Components/RequireAuth'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="h-screen bg-slate-200"> 
    <ToastContainer />   
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<RequireAuth />}>
          <Route path='/inventory' element={<Home/>}/>
          <Route path='/addLocation' element={<AddLocation/>}/>
          <Route path='/editLocation/:locationId' element={<EditLocation/> }/>
          <Route path='/addItem' element={<AddItem/>}/>
          <Route path='/EditItem/:itemId' element={<EditItem/>}/>
          <Route path='/ViewItem/:itemId' element={<ViewItem/>}/>
          <Route path='/inventory/:locationName/:locationId' element={<LocationInventory/>}/>
        </Route>
        <Route path='*' element={<Login/>}/>   
      </Routes>
    </Router>
    </div>
  );
}

export default App;

