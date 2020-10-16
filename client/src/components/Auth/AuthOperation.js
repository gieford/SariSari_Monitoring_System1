import axios from 'axios'

export const getAuthId = authData => {
  return axios
    .post('/auths/getauth', {
      name: authData.name
    })
    .then(response => {
      if(response){
        return response
      }else{
        alert(response.data.msg)
      }
    })
}

export const getAuthInfos = (authData,adminAuth) => {
  return axios
    .post('/auths/getauthinfos', {
      id: authData.id,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      if(response){
        return response.data
      }else{
//        alert(response.data.msg)
      }
    })
}

export const getAllAuths = (adminAuth) => {
  return axios
    .post('/auths/viewauths', {
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      if(response){
        //localStorage.setItem('authlists', JSON.stringify(response.data.authlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}

export const getSearchAuths = (searchAuthData,adminAuth) => {
  return axios
    .post('/auths/viewsearchauths', {
      searchAuthName: searchAuthData.searchAuthName,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      if(response){
        //localStorage.setItem('authlists', JSON.stringify(response.data.authlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}

export const addNewAuth = (newAuthData,adminAuth) => {
  return axios
    .post('/auths/register', {
      name: newAuthData.name,
      description: newAuthData.description,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    }).then(response => {
        return response.data
    })
}

export const modifiedAuth = (modifiedAuth,adminAuth) => {
  return axios
    .put('/auths/update', {
      id: modifiedAuth.id,
      name: modifiedAuth.name,
      description: modifiedAuth.description,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    }).then(response => {
      if(response){
        //localStorage.setItem('authlists', JSON.stringify(response.data.authlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}


export const deleteAuth = (existAuth,adminAuth) => {
  return axios
    .delete('/auths/remove',{
      data: {
        id: existAuth.id,
        Authorization: adminAuth.token,
        authId: adminAuth.authId
      }
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
