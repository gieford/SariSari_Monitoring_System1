import axios from 'axios'

export const addStore = (newStore,newAuth) => {
  return axios
    .post('/stores/register', {
      name: newStore.name,
      location: newStore.location,
      owner: newStore.owner,
      isdisabled: newStore.isdisabled,
      Authorization: newAuth.token,
      authId: newAuth.authId
    })
    .then(response => {
      //console.log(response.data.msg)
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const getAllStores = () => {
  return axios
    .post('/stores/getallstores', {
    })
    .then(response => {
        return response.data
    })
}

export const getAllEDStores = (store) => {
  return axios
    .post('/stores/getalledstores', {
      isdisabled: store.isdisabled
    })
    .then(response => {
        return response.data
    })
}

export const updateStoreStatus = (store,newAuth) => {
  return axios
    .put('/stores/updatestatus', {
          id: store.id,
          isdisabled: store.isdisabled,
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



/*
export const getstoreownersapplication = storeOwner => {
  return axios
    .post('applystoreowners/viewstoreownersapplication',{
      status:storeOwner.status
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
        localStorage.setItem('storeownersapplicationlists', JSON.stringify(response.data.storeownersapplicationlists))
      }else{
        //alert(response.data.msg)
      }
    })
}
*/

export const getAllStoreUsers = (user,adminAuth) => {
  return axios
    .post('/users/getallstoreusers',{
        storeId: user.storeId,
        Authorization: adminAuth.token,
        authId: adminAuth.authId
    })
    .then(response => {
      return response.data
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
      if(response.data.msg==="Updated"){
        console.log(' Updated')
        return response
      }else if(response.data.msg==="Incorrect Credentials"){
          console.log(response.data.msg==="Incorrect Email and Password.")
      }else if("Store does not exist"){
          console.log("Store does not exist");
      }else{
          console.log(response.data.msg)
      }
      return response
    })
    .catch(err => {
      console.log(err)
    })
}
