import axios from 'axios';
//GET-API
export const getAdminMensdataAPI=async()=>{
 let res = await axios.get('https://classic-world.onrender.com/MensData');
 return res.data;
}

export const getAdminWomensdataAPI=async()=>{
    let res = await axios.get('https://classic-world.onrender.com/WomensData');
    return res.data;
}

export const getAdminKidsdataAPI=async()=>{
    let res = await axios.get('https://classic-world.onrender.com/ChildrensData');
    return res.data;
}

export const getUsersListAPI=async()=>{
    let res = await axios.get('https://classic-world.onrender.com/UsersList');
    return res.data;
}

export const getAdminDataAPI=async()=>{
    let res = await axios.get('https://classic-world.onrender.com/AdminData');
    return res.data;
}

//POST-API
export const postAdminMensdataAPI=async(mensProduct)=>{
let res = await axios.post('https://classic-world.onrender.com/MensData',mensProduct);
return res.data;
}

export const postAdminWomensdataAPI=async(womensProduct)=>{
    let res = await axios.post('https://classic-world.onrender.com/WomensData',womensProduct);
    return res.data;
}

export const postAdminKidsdataAPI=async(kidsProduct)=>{
    let res = await axios.delete('https://classic-world.onrender.com/ChildrensData',kidsProduct);
    return res.data;
}

//UPDATE-FUNCTION
export const updateAdminMensdataAPI=async(id,newPrice,newDiscount,newSrikePrice)=>{
    let res = await axios.patch(`https://classic-world.onrender.com/MensData/${id}`,{
        discounted_price:newPrice,
        discount:newDiscount,
        strike_price:newSrikePrice
    });
    return res.data;
    }

export const updateAdminWomensdataAPI=async(id,newPrice,newDiscount,newSrikePrice)=>{
    let res = await axios.patch(`https://classic-world.onrender.com/WomensData/${id}`,{
        discounted_price:newPrice,
        discount:newDiscount,
        strike_price:newSrikePrice
    });
    return res.data;
    }

export const updateAdminKidsdataAPI=async(id,newPrice,newDiscount,newSrikePrice)=>{
    let res = await axios.patch(`https://classic-world.onrender.com/ChildrensData/${id}`,{
        discounted_price:newPrice,
        discount:newDiscount,
        strike_price:newSrikePrice
    });
    return res.data;
    }    

export const updateAdminNameAPI=async(data)=>{
    let res = await axios.patch('https://classic-world.onrender.com/AdminData',{name:data});
    return res.data;
    }

export const updateAdminEmailAPI=async(data)=>{
    let res = await axios.patch('https://classic-world.onrender.com/AdminData',{email:data});
    return res.data;
    }
        
export const updateAdminContactAPI=async(data)=>{
    let res = await axios.patch('https://classic-world.onrender.com/AdminData',{contact:data});
    return res.data;
    }
    
export const updateAdminPasswordAPI=async(data)=>{
    let res = await axios.patch('https://classic-world.onrender.com/AdminData',{password:data});
    return res.data;
    }
        

//DELETE-FUNCTION
export const deleteAdminMensdataAPI=async(id)=>{
    let res = await axios.delete(`https://classic-world.onrender.com/MensData/${id}`);
    return res.data;
    }

export const deleteAdminWomensdataAPI=async(id)=>{
    let res = await axios.delete(`https://classic-world.onrender.com/WomensData/${id}`);
    return res.data;
    }

export const deleteAdminKidsdataAPI=async(id)=>{
    let res = await axios.delete(`https://classic-world.onrender.com/ChildrensData/${id}`);
    return res.data;
    }   
    
export const deleteUsersListdataAPI=async(id)=>{
    let res = await axios.delete(`https://classic-world.onrender.com/UsersList/${id}`);
    return res.data;
    }       

    