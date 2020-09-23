/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    //自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录生成的默认路由表规则
      routes.splice(0)

      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                name: 'home',
                path: '',
                component: resolve(__dirname, 'pages/home/')
              },
              {
                name: 'login',
                path: '/login',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                name: 'register',
                path: '/register',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                name: 'profile',
                path: '/profile/:username',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                name: 'setting',
                path: '/setting',
                component: resolve(__dirname, 'pages/setting/')
              },
              {
                name: 'editor',
                path: '/editor/:slug?',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                name: 'article',
                path: '/article/:slug',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ]
      )
    }
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],
  
  server: {
    host: '0.0.0.0',
    port: '3000'
  }
}
