import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },

        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },

            updatePost(state, post) {
                const index = state.loadedPosts.findIndex(item => item.id === post.id)
                if (index > -1) {
                    state.loadedPosts[index] = post
                }
            },

            addPost(state, post) {
                state.loadedPosts.push(post)
            },

            setToken(state, token) {
                state.token = token
            },

            logout(state) {
                state.token = null

                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiration')

                if (process.client) {
                    Cookie.remove('token')
                    Cookie.remove('tokenExpiration')
                }
            }
        },

        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.get(`/posts.json`)
                    .then(res => {
                        const posts = []
                        for (const key in res.data) {
                            posts.push({ ...res.data[key], id: key })
                        }

                        vuexContext.commit('setPosts', posts)
                    })
                    .catch(e => console.log(e))
            },

            // setPosts(vuexContext, posts) {
            //     vuexContext.commit('setPosts', posts)
            // }

            addPost(vueContext, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                return this.$axios.$post(`/posts.json?auth=${vueContext.state.token}`, createdPost)
                    .then(data => vueContext.commit('addPost', {
                        ...createdPost,
                        id: data.name
                    }))
                    .catch(e => console.log(e))
            },

            updatePost(vueContext, post) {
                return this.$axios.$put(`/posts/${post.id}.json?auth=${vueContext.state.token}`, post)
                    .then(res => {
                        vueContext.commit('updatePost', post)
                    })
                    .catch(e => console.log(e))
            },

            authenticateUser(vueContext, authData) {
                let authUrl = authData.isLogin
                    ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                    : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

                return this.$axios.$post(`${authUrl}${process.env.fbAPIKey}`, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }).then(res => {
                    vueContext.commit('setToken', res.idToken)
                    
                    localStorage.setItem('token', res.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + +res.expiresIn * 1000)
                    Cookie.set('token', res.idToken)
                    Cookie.set('tokenExpiration', new Date().getTime() + +res.expiresIn * 1000)

                    // adding a call to our serverMiddlware api
                    return this.$axios.$post('http://localhost/3000/api/track-data', {
                        data: 'Authenticated!'
                    })
                }).catch(e => console.log(e))
            },

            initAuth(vueContext, req) {
                let token,
                    tokenExpiration;
                    
                // server case
                if (req) {
                    if (!req.headers.cookie) {
                        return
                    }
                    const cookie = req.headers.cookie
                    console.log("cookie from server=", cookie);
                    token = cookie.split(";").find(item => item.trim().startsWith("token=")).split("=")[1]
                    tokenExpiration = cookie.split(";").find(item => item.trim().startsWith("tokenExpiration=")).split("=")[1]
                }
                // client case
                else {
                    token = localStorage.getItem('token')
                    tokenExpiration = localStorage.getItem('tokenExpiration')
                }

                if (new Date().getTime() > +tokenExpiration || !token) {
                    vueContext.commit('logout')
                    return
                }

                vueContext.commit('setToken', token)
            },

            logout(vueContext) {
                return new Promise((resolve, reject) => {
                    vueContext.commit('logout')
                    resolve()
                })
            }
        },

        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },

            loadedPost(state, getters) {
                return postId => {
                    return getters.loadedPosts.find(post => post.id === postId)
                }
            },

            isAuthenticated(state) {
                return state.token 
            }
        }
    })
}

export default createStore