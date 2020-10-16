import axios from 'axios'

export const registerstoreowner = newStoreOwner => {
  return axios
    .post('/applystoreowners/register', {
      storename: newStoreOwner.storename,
      owner_name: newStoreOwner.owner_name,
      email: newStoreOwner.email,
      location: newStoreOwner.location,
      status: newStoreOwner.status
    })
    .then(response => {
      //console.log(response.data.msg)
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const getstoreownersapps = (storeOwner,adminAuth) => {
  return axios
    .post('/applystoreowners/viewstoreownersapplication',{
      status:storeOwner.status,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {

      return response.data
    })
}

export const getstoreowner = (storeOwner,adminAuth) => {
  return axios
    .post('/applystoreowners/getstoreownersapplication',{
      id:storeOwner.id,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}


export const remove1 = user => {
  return axios
    .delete('/users/remove',{
      data: {
        email: user.email,
        password: user.password
      }
    })
    .then(response => {
      if(response.data.msg==="Deleted"){
        alert(user.email+' Deleted!')
        console.log(user.email+' Deleted')
        return response
      }else if(response.data.msg==="Incorrect Credentials"){
          alert("Incorrect Email and Password.")
          console.log(response.data.msg==="Incorrect Email and Password.")
      }else if("StoreOwner does not exist"){
          alert("StoreOwner does not exist");
          console.log("StoreOwner does not exist");
      }else{
          alert(response.data.msg)
      }

    })
    .catch(err => {
      console.log(err)
    })
}

export const updatestoreownerapp = (storeowner,newAuth) => {
  return axios
    .put('/applystoreowners/update', {
          id: storeowner.id,
          status: storeowner.status,
          Authorization: newAuth.token,
          authId: newAuth.authId
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
