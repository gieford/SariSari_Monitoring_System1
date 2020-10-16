import jwt_decode from 'jwt-decode'


export const isJWTExpires = (myjwt) => {

  if(jwt_decode(myjwt).exp <= Date.now()/1000){
    return true;
  }else{
    return false;
  }
}
