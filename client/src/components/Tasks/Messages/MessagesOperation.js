import axios from 'axios'

export const getAllInboxMessages = (msg) => {
  return axios
    .post('/messages/getallinboxmessages', {
      userEmail: msg.userEmail
    })
    .then(response => {
        return response.data
    })
}



export const getAllSentboxMessages = (msg) => {
  return axios
    .post('/messages/getallsentboxmessages', {
      userEmail: msg.userEmail
    })
    .then(response => {
        return response.data
    })
}

export const getUnreadMessages = (msg) => {
  return axios
    .post('/messages/getunreadmessages', {
      userEmail: msg.userEmail,
      read: msg.read
    })
    .then(response => {
        return response.data
    })
}

export const getMsgInfo = (msgData) => {
  return axios
    .post('/messages/getmsginfo', {
      id: msgData.id
    })
    .then(response => {
      if(response){
        return response.data
      }else{
//        alert(response.data.msg)
      }
    })
}



export const updateRead = (msgData) => {
  return axios
    .put('/messages/updateread', {
      id: msgData.id,
      read: msgData.read,
    }).then(response => {
      if(response){
        //localStorage.setItem('authlists', JSON.stringify(response.data.authlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}

export const createMsg = newMsg => {
  return axios
    .post('/messages/create', {
      to: newMsg.to,
      to_role: newMsg.to_role,
      from: newMsg.from,
      content: newMsg.content,
      read: newMsg.read
    })
    .then(response => {
      return response.data
      //console.log(newUser.email+' Registered')
    })
}

export const getAllmessagesAdmin = (adminAuth) => {
  return axios
    .post('/products/viewallproducts', {
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const findUserEmail = user => {
  return axios
    .post('/users/finduseremail', {
        email: user.email
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      //console.log(err)
      console.log(err)
    })
}
