import Home from '../views/Home.vue'; // 注意这里的路径，有原来的./开头改为../，因为此时views文件夹在routes.ts文件所在文件夹的上一级

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];
