export default (role, rolesArr,res)=>{
    if (rolesArr.some(item=>item==role)){
        return true
    }else{
        return false
    }
}