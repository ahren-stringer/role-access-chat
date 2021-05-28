import * as axios from 'axios'

export let baseURL='http://localhost:8001/';
// export let baseURL='';

let instance=axios.create({
    baseURL:baseURL,
})

export let imgURL=(destination,filename)=>{
    return `${baseURL}publication_image/${destination}${filename}`
}

export let blogAPI={
    setPosts(limit,skip){
        return instance.get(`posts/all/${limit}/${limit*skip}`).then(res => res.data)
    },
    setCategoryPosts(category,limit,skip){
        return instance.get(`posts/categories/${category}/${limit}/${limit*skip}`).then(res => res.data)
    },
    getSinglePost(postName){
        return instance.get(`single_post/${postName}`).then(res => res.data)
    }
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

export let comentsAPI = {
    sendComent(formData, post,userId ) {
        debugger
        return instance.post(`/coment`,{...formData, author: userId, post})
            .then(response => response.data)
    },

    getComents(postId,limit,skip) {
        return instance.get(`/coments/some/${postId}/${limit}/${skip}`)
            .then(response => {debugger
                return response.data})
    },
}

export let authAPI={
    login(formData){
        return instance.post('/login', { ...formData }).then(res => res.data)
    },
    register(registerData){
        let formData = new FormData();
        // for (let key in registerData) {
        //     formData.append(key, registerData[key]);
        // } 
        formData.append("email", registerData.email);
        formData.append("name", registerData.name);
        formData.append("password", registerData.password);
        formData.append("avatar", registerData.file);
        debugger   
        return instance.post('/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => res.data)
    },
}
export let publicationAPI = {
    setImg(file,date) {
        const formData = new FormData();
        formData.append('myfile', file);
        formData.append('date', date);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return instance.post("/images", formData, config).then(response => response.data)
    },
    sendPost(file,title,content,arr,userId,subtitle,contentText) {
    const formData = new FormData();
        formData.append('myfile', file);
        formData.append('title',title);
        formData.append('content', content);
        formData.append('categories',arr)
        formData.append('userId', userId)
        formData.append('subtitle', subtitle)
        // formData.append('text', contentText)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return instance.post("/posts", formData, config).then(response => response.data)
    },
    getCategories() {
        return instance.get(`category`)
        .then(response => response.data)
    },
}
export let imagesAPI = {
    deleteImg(filename) {
        return instance.delete(`image/${filename}`)
        .then(response => response.data)
    },
    deleteAllImages(date) {
        return instance.delete(`images/${date}`)
        .then(response => response.data)
    },
}
export let homeAPI = {
    getCategories() {
        return instance.get(`category/random`)
        .then(response => response.data)
    },
    getPosts() {
        return instance.get(`posts_latests`)
        .then(response => response.data)
    },
}
export let categoriesAPI = {
    getCategories() {
        return instance.get(`category`)
        .then(response => response.data)
    },
    getSomeCategories() {
        return instance.get(`category/some`)
        .then(response => response.data)
    },
}
export let profileAPI={
    getProfile(userId){
        return instance.get(`user/`+userId).then(res => res.data)
    },
    getPosts(id){
        return instance.get(`posts/author/${id}`)
        .then(res => res.data)
    },
}
export let chanelsAPI={
    getUsers(){
        return instance.get(`users`).then(res => res.data)
    },
    getUser(name){
        return instance.get(`user/${name}`).then(res => res.data)
    },
    getPosts(name){
        return instance.get(`chanel_posts/${name}`).then(res => res.data)
    },
}
