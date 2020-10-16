import axios from 'axios'

export const getAllUsers = (adminAuth) => {
  return axios
    .post('/users/viewusers', {
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const getSearchUsers = (searchUserData,adminAuth) => {
  return axios
    .post('/users/viewsearchusers', {
      searchUserName: searchUserData.searchUserName,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}



export const registerUser = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role
    })
    .then(response => {
      //console.log(response.data.msg)
      return response.data
      //console.log(newUser.email+' Registered')
    })
}


export const admindeleteUser = (existAuth,adminAuth) => {
  return axios
    .delete('/users/adminremove',{
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


export const adminmodifiedUser = (modifiedAuth,adminAuth) => {
  return axios
    .put('/users/adminupdate', {
      id: modifiedAuth.id,
      email: modifiedAuth.email,
      password: modifiedAuth.password,
      role: modifiedAuth.role,
      storeId: modifiedAuth.storeId,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    }).then(response => {
        return response.data
    })
}


export const getRoleAuths = (roleData,adminAuth) => {
  return axios
    .post('/roleauths/getroleauths', {
      role: roleData.role,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}
