import axios from 'axios'

export const addRoleAuth = (newroleauthData,adminAuth) => {
  return axios
    .post('roleauths/register', {
      roleauthId: newroleauthData.roleauthId,
      role: newroleauthData.role,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const getRoleAuth = (roleauthData,adminAuth) => {
  return axios
    .post('roleauths/getroleauths', {
      role: roleauthData.role,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}


export const getAuthsNotInRAuths = (userData,adminAuth) => {
  return axios
    .post('/auths/notpresentinroleauths', {
      role: userData.role,
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

export const getSearchRoleAuths = (userData,searchAuthData,adminAuth) => {
  return axios
    .post('/auths/viewsearchnotpresentroleauths', {
      role: userData.role,
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

export const getAllRoleAuths = (userData,adminAuth) => {
  return axios
    .post('/roleauths/roleauthinfos', {
      role: userData.role,
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

export const deleteRoleAuth = (existRoleAuth,adminAuth) => {
  return axios
    .delete('/roleauths/remove',{
      data: {
        roleauthId: existRoleAuth.authId,
        role: existRoleAuth.role,
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
