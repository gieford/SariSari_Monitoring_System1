import axios from 'axios'

export const register = (newProduct,newAuth) => {
  return axios
    .post('/products/register', {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      count: newProduct.count,
      Authorization: newAuth.token,
      authId: newAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const registermodifiedstoreproduct = (newProduct,newAuth) => {
  return axios
    .post('/storeproducts/registermodified', {
      productId: newProduct.productId,
      storeId: newProduct.storeId,
      price: newProduct.price,
      count: newProduct.count,
      Authorization: newAuth.token,
      authId: newAuth.authId
    })
    .then(response => {
      return response.data
    })
}

export const deleteStoreProduct = (eProduct,newAuth) => {
  return axios
    .delete('/storeproducts/remove',{
      data: {
        productId: eProduct.productId,
        storeId: eProduct.storeId,
        Authorization: newAuth.token,
        authId: newAuth.authId
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateStoreProduct = (eProduct,newAuth) => {
  return axios
    .put('/storeproducts/update', {
      productId: eProduct.productId,
      storeId: eProduct.storeId,
      price: eProduct.price,
      count: eProduct.count,
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


export const getSearchProducts = (searchProductData) => {
  return axios
    .post('/products/viewsearchproducts', {
      searchProductName: searchProductData.searchProductName
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

export const getSearchStoreProducts = (searchProductData) => {
  return axios
    .post('/storeproducts/viewsearchstoreproducts', {
      searchProductName: searchProductData.searchProductName,
      storeId: searchProductData.storeId
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


export const getproducts = () => {
  return axios
    .get('/products/viewproducts')
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}


export const getAllProductsnotInStoreProducts = (storeData) => {
  return axios
    .post('/products/getproductnotinstoreproducts', {
      storeId: storeData.storeId
    })
    .then(response => {
      if(response){
        return response.data
      }else{
//        alert(response.data.msg)
      }
    })
}


export const getAllStoreProducts = (storeData) => {
  return axios
    .post('/storeproducts/getallstoreproduct', {
      storeId: storeData.storeId
    })
    .then(response => {
      if(response){
        return response.data
      }else{
//        alert(response.data.msg)
      }
    })
}

export const getProductInfos = (productData,adminAuth) => {
  return axios
    .post('/products/getproductinfos', {
      id: productData.id,
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

export const getAllProducts = (adminAuth) => {
  return axios
    .post('/products/viewallproducts', {
      Authorization: adminAuth.token,
      authId: adminAuth.authId
    })
    .then(response => {
        return response.data
    })
}

export const getAllProductsWOLogin = () => {
  return axios
    .post('/products/viewallproductswologin', {
    })
    .then(response => {
        return response.data
    })
}

export const getStoreProductInfosAndDescription = (store,product) => {
  return axios
    .post('/products/getOnestoreproductinfosanddesc',{
      productId: product.productId,
      storeId: store.storeId
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}

// return store product top, products info sub
export const getstoreproductlist = (store) => {
  return axios
    .post('/storeproducts/getstoreproductlist',{
      storeId: store.storeId
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}

export const getstoreproductlist2 = (store) => {
  return axios
    .post('/products/getManystoreproductinfosanddesc',{
      storeId: store.storeId
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}




export const getproductInfoOnly = (product) => {
  return axios
    .post('/products/getproductinfoWOauths',{
      id: product.productId
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}


export const getstoreproductInfo = product => {
  return axios
    .post('/storeproducts/getstoreproductinfo',{
      productId:product.id
    })
    .then(response => {
      if(response){
      //  console.log(response.data.productlists)
//        localStorage.setItem('productlists', JSON.stringify(response.data.productlists))
        return response.data
      }else{
        //alert(response.data.msg)
      }
    })
}


export const deleteProduct = (product,newAuth) => {
  return axios
    .delete('/products/remove',{
      data: {
        id: product.id,
        Authorization: newAuth.token,
        authId: newAuth.authId
      }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateProduct = (product,newAuth) => {
  return axios
    .put('/products/update', {
          id: product.id,
          name: product.name,
          description: product.description,
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
