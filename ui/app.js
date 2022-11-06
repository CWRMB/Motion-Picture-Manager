const routes=[
    {path:'/pic_records',component:pic_data},
    {path:'/home',component:home},
    {redirect: to => {
        return {path:'/home',component:home}
    }
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')