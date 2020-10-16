import axios from 'axios'

export const orderCreate = (newOrder) => {
  return axios
    .post('/orders/create', {
      userId: newOrder.userId,
      fullName: newOrder.fullName,
      address: newOrder.address,
      contact: newOrder.contact,
      storeId: newOrder.storeId,
      status: newOrder.status,
      totalprice: newOrder.totalprice
    })
    .then(response => {
        return response.data
    })
}


export const orderProductsCreate = (newOrderProducts) => {
  return axios
    .post('/orderproducts/create', {
      orderId: newOrderProducts.orderId,
      storeId: newOrderProducts.storeId,
      productId: newOrderProducts.productId,
      count: newOrderProducts.count,
      price: newOrderProducts.price,
      isAvailable: newOrderProducts.isAvailable
    })
    .then(response => {
        return response.data
    })
}

export const getAllOrderData = (user) => {
  return axios
    .post('/orders/getorderdata', {
      userId: user.userId
    })
    .then(response => {
        return response.data
    })
}


export const getAllStoreOrders = (storeData,adminAuth) => {
  return axios
    .post('/orders/getstoreordersdata', {
      storeId: storeData.storeId,
      status: storeData.status,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}


export const getAllOrderProductData = (order) => {
  return axios
    .post('/orderproducts/getorderproductdata', {
      orderId: order.orderId
    })
    .then(response => {
        return response.data
    })
}


export const orderUpdateStatAndProcess = (order,adminAuth) => {
  return axios
    .put('/orders/updatestatandprocess', {
      id: order.orderId,
      status: order.status,
      storeuserIdProcess: order.storeuserIdProcess,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}


export const orderUpdateStatAndDeliver = (order,adminAuth) => {
  return axios
    .put('/orders/updatestatanddeliver', {
      id: order.orderId,
      status: order.status,
      storeuserIdDeliver: order.storeuserIdDeliver,
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}


export const orderUpdateStat = (order) => {
  return axios
    .put('/orders/updatestat', {
      id: order.orderId,
      status: order.status,
      userId: order.userId,
      Authorization: order.token
    })
    .then(response => {
        return response.data
    })
}
