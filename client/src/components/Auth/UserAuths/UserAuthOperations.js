import axios from 'axios'

export const addUserAuth = (newauthData,adminAuth) => {
  return axios
    .post('userauths/register', {
      newauthId: newauthData.newauthId,
      newuserId: newauthData.newuserId,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const deleteUserAuth = (existUserAuth,adminAuth) => {
  return axios
    .delete('/userauths/remove',{
      data: {
        existuserId: existUserAuth.existuserId,
        existauthId: existUserAuth.existauthId,
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

export const deleteUserAuth1_5 = (existUserAuth,adminAuth) => {
  return axios
    .delete('/userauths/remove1_5',{
      data: {
        existuserId: existUserAuth.existuserId,
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

export const deleteUserAuth2 = (existUserAuth) => {
  return axios
    .delete('/userauths/remove2',{
      data: {
        existuserId: existUserAuth.existuserId,
      }
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAllUserAuths = (userData,adminAuth) => {
  return axios
    .post('/userauths/userauthinfos', {
      userId: userData.userId,
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

export const getAuthsNotInUAuths = (userData,adminAuth) => {
  return axios
    .post('/auths/notpresentinuserauths', {
      userId: userData.userId,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      if(response){
        //localStorage.setItem('authlists', JSON.stringify(response.data.authlists))
        return response.data
      }else{
        //alert(response.data.msg)
        return null
      }
    })
}

export const getSearchUserAuths = (userData,searchAuthData,adminAuth) => {
  return axios
    .post('/auths/viewsearchnotpresentuserauths', {
      userId: userData.userId,
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


export const searchUser = (userData,adminAuth) => {
  return axios
    .post('users/searchuser', {
        id: userData.id,
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
