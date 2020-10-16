import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role
    })
    .then(response => {
      return response.data
      //console.log(newUser.email+' Registered')
    })
}


export const registerStoreUser = (newUser,adminAuth) => {
  return axios
    .post('/users/registerstoreuser', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      storeId: newUser.storeId,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const modifyStoreUser = (newUser,adminAuth) => {
  return axios
    .put('/users/modifystoreuser', {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
      storeId: newUser.storeId,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const resetStoreUserPass = (user,adminAuth) => {
  return axios
    .put('/users/resetstoreuserpass', {
      id: user.id,
      storeId: user.storeId,
      password: user.password,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const login = user => {
  return axios
    .post('/users/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      //console.log(err)
      console.log(err)
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
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const update = user => {
  return axios
    .put('/users/update', {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          newpassword: user.newpassword

    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateuserrole = (user,newAuth) => {
  return axios
    .put('/users/updateuserrole', {
          email: user.email,
          role: user.role,
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

export const updatestoreuserBelongs = (user,newAuth) => {
  return axios
    .put('/users/adminupdateuserstoreid', {
          id: user.id,
          storeId: user.storeId,
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

export const getUserInfos = (userData,adminAuth) => {
  return axios
    .post('/users/searchuser', {
      id: userData.id,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}
