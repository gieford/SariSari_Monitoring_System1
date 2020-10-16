const UserAuth = require('../../models/UserAuths')

function authenticate(userId, authId){
  var is_cond=false;
  return UserAuth.findOne({
    where: {
      userId: userId,
      authId: authId  //1 for add prodcuts
    }
  }).then(userauth=>{
    if(userauth){
      is_cond = true
    }else{
      is_cond = false
    }
    return is_cond
  })//find one user auth
  .catch(err=>{
    is_cond = false
    return is_cond
  })
//  return null
}

module.exports = {authenticate}
