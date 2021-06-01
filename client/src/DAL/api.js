import * as axios from 'axios'

export let baseURL='http://localhost:8001/';
// export let baseURL='';

let instance=axios.create({
    baseURL:baseURL,
    headers:{
        "Authorization":'Bearer'+JSON.parse(localStorage.getItem('userData')).token
    }
})

export let fileURL=(destination,filename)=>{
    return `${baseURL}file/${destination}${filename}`
}

export let groupAPI={
    createGroup(reqData){
        return instance.post(`groups`,reqData).then(res => res.data)
    },
    getGroups(userId){
        return instance.get(`groups/${userId}`).then(res => res.data)
    },
    addUser(groupId,reqData){
        return instance.put(`group_add_user/${groupId}`,reqData).then(res => res.data)
    },
    deleteUser(userId,groupId){
        return instance.put(`group_delete_user/${userId}/${groupId}`).then(res => res.data)
    },
    renameGroup(groupId,reqData){
        return instance.put(`group_rename/${groupId}`,reqData).then(res => res.data)
    },
}
export let rolesAPI = {
    defineRole(user,group) {
        return instance.get(`role_define/${user}/${group}`)
        .then(response => response.data)
    },
    getAllRoles(group) {
        return instance.get(`roles_all/${group}`)
        .then(response => response.data)
    },
    getSimpleRoles(group) {
        return instance.get(`roles_simple/${group}`)
        .then(response => response.data)
    },
    changeRole(user,group,reqData) {
        return instance.put(`roles_update/${user}/${group}`,reqData)
        .then(response => response.data)
    },
}
export let chatAPI = {
    createChanel(groupId,reqData) {
        return instance.post(`chanels/${groupId}`,reqData).then(response => response.data)
    },
    getChanels(user,groupName,groupId) {
        return instance.get(`/chanels/${user}/${groupName}/${groupId}`).then(response => response.data)
    },
    // selectedChanel(user,groupName,groupId) {
    //     return instance.get(`/chanels/${user}/${groupName}/${groupId}`).then(response => response.data)
    // },
    invited_can_see(groupId,chanelId,reqData){
        return instance.put(`/invited_can_see/${groupId}/${chanelId}`,reqData).then(response => response.data)
    },
    renameChanel(groupId,chanelId,reqData){
        return instance.put(`/chanel_rename/${groupId}/${chanelId}`,reqData).then(response => response.data)
    },
}
export let messagesAPI = {
    sendMesage(chanelId,reqData) {
        return instance.post("/messages/"+chanelId, reqData).then(response => response.data)
    },
    getMessages(chanelId) {
        return instance.get("/messages/"+chanelId).then(response => response.data)
    },
}
export let SearchAPI = {
    getSearchPage(search,limit,skip) {
        return instance.get(`/search_all/${search}/${limit}/${limit*skip}`)
            .then(response => response.data)
    },
    getSearchList(search,userId) {
        return instance.get(`/search/${search}/${userId}`)
            .then(response => {debugger
               return response.data})
    },
}
export let rightsAPI = {
    addToList(grouplId,rightId,reqData) {
        return instance.put(`right/update/${grouplId}/${rightId}`,reqData)
        .then(response => response.data)
    },
    removeFromList(grouplId,rightId,reqData) {
        return instance.put(`right/remove_user/${grouplId}/${rightId}`,reqData)
        .then(response => response.data)
    },
}
export let frendshipAPI = {
    makeInvite(reqData) {
        return instance.post(`make_invite`,reqData)
        .then(response => response.data)
    },
    frendship(reqData,inviteId) {
        return instance.put(`frendship/${inviteId}`,reqData)
        .then(response => response.data)
    },
    friends(userId) {
        return instance.get(`friends/${userId}`)
        .then(response => response.data)
    },
    invites(userId) {
        return instance.get(`invites/${userId}`)
        .then(response => response.data)
    },
    waitings(userId) {
        return instance.get(`waitings/${userId}`)
        .then(response => response.data)
    },
}
// export let authAPI={
//     login(formData){
//         return instance.post('/login', { ...formData }).then(res => res.data)
//     },
//     register(registerData){
//         let formData = new FormData();
//         // for (let key in registerData) {
//         //     formData.append(key, registerData[key]);
//         // } 
//         formData.append("email", registerData.email);
//         formData.append("name", registerData.name);
//         formData.append("password", registerData.password);
//         formData.append("avatar", registerData.file);
//         debugger   
//         return instance.post('/register', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//         })
//         .then(res => res.data)
//     },
// }
