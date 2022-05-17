import axios from 'axios'

//login user 
    export const loginUser = async (email, password) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const {data} = await axios.post(
                '/api/login',
                {
                    email, password
                },
                config
            )
            localStorage.setItem('userInfo', JSON.stringify(data));        
            return data
            
        } catch (error) {
        return ((error.response.data.msg))
        }
    }

    //signup user 
    export const signupUser = async (userData) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const {data} = await axios.post('/api/register', {
                name: userData.name,
                email: userData.email,
                password: userData.password
            }, config)
            localStorage.setItem('userInfo', JSON.stringify(data));            
            return data

        } catch (err) {
            return (err.response.data.msg)  
        }
    }

//get all items
export const getAllItems = async () => {
    try{
        const data = await axios.get(`/inventory/api/items`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).authToken,
                }
            })
        return (data.data.items)     
    } catch (error) {
        return(error.response.data)
    }
}


//get single item 
export const getItem = async (itemId) => {
        try{
            const data = await axios.get(`/inventory/api/${itemId}`, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
                    }
                })
            return (data.data.item)
        } catch (error) {
            return (error.response.data)
        }
    }

    //post new item 
    export const newItem = async (item) => { 
        try
        {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
                }
            }
            const response = await axios.post('/inventory/api/add-item', {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                notes: item.notes,
                locationId: item.location
            }, config)
            return response
        } catch (error) {
            return (error.response.data.msg)
        }
    }

    //update item 
export const updateItem = async (item, itemId) => {
        try
         {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
                }
            }
            await axios.put(`/inventory/api/${itemId}`, {
                name: item.name, 
                quantity: item.quantity, 
                price: item.price,
                locationId: item.location,
                notes: item.notes
            }, config)
            return 
        } catch (error) {
            return (error.response.data.msg)
        }
    }

//delete item 
export const deleteItem  = async (itemId) => {
    try{
        await axios.delete(`/inventory/api/${itemId}`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
            } 
        })
        return
    }  
    catch (err){
        return (err.response)
    }
}

//create location
export const createLocation = async (location) => {
    try {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
            }
        }
        const response = await axios.post('/location/api/add-location', {
            name: location.name,
            address: location.address,
            phone: location.phone,
        }, config)
            return response
    }
    catch(err) {
        return (err.response)
    }
}

//get all locations
export const getAllLocations = async () => {
    try{
        const data = await axios.get(`/location/api/locations`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).authToken,
                }
            })
        return (data.data.locations)     
    } catch (error) {
        return(error.response.data)
    }
}

//get location items

export const getLocationItems = async (locationId) => {
    try{
        const data = await axios.get(`/location/api/items/${locationId}`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).authToken,
                }
            })
        return (data.data.items)     
    } catch (error) {
        return(error.response.data)
    }
}

//get all locations
export const getLocation = async (locationId) => {
    try{
        const data = await axios.get(`/location/api/${locationId}`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).authToken,
                }
            })
        return (data.data.location)     
    } catch (error) {
        return(error.response.data)
    }
}

    //update location 
export const updateLocation = async (location, locationId) => {
        try
         {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
                }
            }
            await axios.put(`/location/api/${locationId}`, {
                name: location.name,
                address: location.address,
                phone: location.phone,
            }, config)
            return 
        } catch (error) {
            return (error.response.data.msg)
        }
    }

    //delete location 
export const deleteLocation = async (locationId) => {
    try{
        await axios.delete(`/location/api/${locationId}`, {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("userInfo")).authToken,
            } 
        })
        return
    }  
    catch (err){
        return (err.response)
    }
}
