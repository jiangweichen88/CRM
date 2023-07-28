import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'Workspace', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/contact-page',
    component: Layout,
    redirect: '/contact-page/voice',
    name: 'Contact-Center',
    alwaysShow: true,
    meta: {
      title: 'Contact Center',
      icon: 'a-ContactCenter'
    },
    children: [
      {
        path: 'voice',
        component: () => import('@/views/contact-page/voice'),
        name: 'voice',
        meta: { title: 'Voice' }
      },
      {
        path: 'Livechat',
        component: () => import('@/views/contact-page/Livechat/index'),
        name: 'Livechat',
        meta: { title: 'Livechat' }
      },
      // {
      //   path: 'Livechat',
      //   component: () => import('@/views/error-page/404'),
      //   name: 'Livechat',
      //   meta: { title: 'Livechat' }
      // },
      {
        path: 'email',
        component: () => import('@/views/error-page/404'),
        name: 'email',
        meta: { title: 'Email', noCache: true }
      },
      {
        path: 'histroy',
        component: () => import('@/views/error-page/404'),
        name: 'histroy',
        meta: { title: 'Histroy', noCache: true }
      }
      // {
      //   path: 'live-chat',
      //   component: () => import('@/views/error-page/404'),
      //   name: 'live-chat',
      //   meta: { title: 'Livechat', noCache: true }
      // },
      // {
      //   path: 'whats-app',
      //   component: () => import('@/views/error-page/404'),
      //   name: 'whats-app',
      //   meta: { title: 'WhatsApp', noCache: true }
      // }
    ]
  },
  {
    path: '/custom-page',
    component: Layout,
    redirect: '/custom-page/all-customers',
    name: 'Customer',
    alwaysShow: true,
    meta: {
      title: 'Customer',
      icon: 'Customer'
    },
    children: [
      {
        path: 'all-customers',
        component: () => import('@/views/custom-page/all-customers'),
        name: 'all-customers',
        meta: { title: 'Customers', noCache: true }
      },
      {
        path: 'companies',
        component: () => import('@/views/error-page/404'),
        name: 'companies',
        meta: { title: 'Companies', noCache: true }
      }
    ]
  },
  {
    path: '/tickets-page',
    component: Layout,
    redirect: '/tickets-page/all-customers',
    name: 'Tickets',
    alwaysShow: true,
    meta: {
      title: 'Tickets',
      icon: 'Tickets'
    },
    children: [
      {
        path: 'all-tickets',
        component: () => import('@/views/tickets-page/all-tickets'),
        name: 'all-tickets',
        meta: { title: 'All Tickets', noCache: true }
      },
      {
        path: 'my-tickets',
        component: () => import('@/views/tickets-page/my-tickets'),
        name: 'my-tickets',
        meta: { title: 'My Tickets', noCache: true }
      }
    ]
  },
  {
    path: '/knowledge',
    component: Layout,
    redirect: '/knowledge-tree/discover',
    name: 'Knowledge',
    alwaysShow: true,
    meta: {
      title: 'Knowledge',
      icon: 'Knowledge'
    },
    children: [
      {
        path: 'discover',
        component: () => import('@/views/knowledge-tree/discover'),
        name: 'discover',
        meta: { title: 'Discover', noCache: true }
      },
      {
        path: 'tree',
        component: () => import('@/views/knowledge-tree/tree'),
        name: 'tree',
        meta: { title: 'Tree', noCache: true }
      },
      {
        path: 'management',
        component: () => import('@/views/knowledge-tree/management'),
        name: 'management',
        meta: { title: 'Management', noCache: true }
      }
    ]
  },
  {
    path: '/robot',
    component: Layout,
    redirect: '/tickets-page/all-customers',
    name: 'Robot',
    alwaysShow: true,
    meta: {
      title: 'Robot',
      icon: 'Robot'
    },
    children: [
      {
        path: 'robot',
        component: () => import('@/views/error-page/404'),
        name: 'robot',
        meta: { title: 'Robot', noCache: true }
      }
    ]
  },
  {
    path: '/sales-center',
    component: Layout,
    redirect: '/tickets-page/all-customers',
    name: 'Sales-Center',
    alwaysShow: true,
    meta: {
      title: 'Sales Center',
      icon: 'a-AISales'
    },
    children: [
      {
        path: 'deals',
        component: () => import('@/views/error-page/404'),
        name: 'deals',
        meta: { title: 'Deals', noCache: true }
      },
      {
        path: 'forecast',
        component: () => import('@/views/error-page/404'),
        name: 'forecast',
        meta: { title: 'Forecast', noCache: true }
      },
      {
        path: 'templates',
        component: () => import('@/views/error-page/404'),
        name: 'templates',
        meta: { title: 'Templates', noCache: true }
      }
    ]
  },
  {
    path: '/operation-center',
    component: Layout,
    redirect: '/tickets-page/all-customers',
    name: 'Operation-Center',
    alwaysShow: true,
    meta: {
      title: 'Operation Center',
      icon: 'a-OperationCenter'
    },
    children: [
      {
        path: 'business-forms',
        component: () => import('@/views/error-page/404'),
        name: 'business-forms',
        meta: { title: 'Business Forms', noCache: true }
      },
      {
        path: 'data-monitor',
        component: () => import('@/views/error-page/404'),
        name: 'data-monitor',
        meta: { title: 'Data Monitor', noCache: true }
      },
      {
        path: 'business-analysis',
        component: () => import('@/views/error-page/404'),
        name: 'business-analysis',
        meta: { title: 'Business Analysis', noCache: true }
      },
      {
        path: 'business-label',
        component: () => import('@/views/error-page/404'),
        name: 'business-label',
        meta: { title: 'Business Label', noCache: true }
      }
    ]
  },
  {
    path: '/setup',
    component: Layout,
    redirect: '/tickets-page/all-customers',
    name: 'Setup',
    alwaysShow: true,
    meta: {
      title: 'Setup',
      icon: 'a-SetUp'
    },
    children: [
      {
        path: 'information',
        component: () => import('@/views/error-page/404'),
        name: 'information',
        meta: { title: 'Information', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show the root menu
//     name: 'Permission',
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'page',
//         component: () => import('@/views/permission/page'),
//         name: 'PagePermission',
//         meta: {
//           title: 'pagePermission',
//           roles: ['admin'] // or you can only set roles in sub nav
//         }
//       },
//       {
//         path: 'directive',
//         component: () => import('@/views/permission/directive'),
//         name: 'DirectivePermission',
//         meta: {
//           title: 'directivePermission'
//           // if do not set roles, means: this page does not require permission
//         }
//       },
//       {
//         path: 'role',
//         component: () => import('@/views/permission/role'),
//         name: 'RolePermission',
//         meta: {
//           title: 'rolePermission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/icons/index'),
//         name: 'Icons',
//         meta: { title: 'icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },

//   /** when your routing map is too long, you can split it into small modules **/
//   componentsRouter,
//   chartsRouter,
//   nestedRouter,
//   tableRouter,

//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'example',
//       icon: 'el-icon-s-help'
//     },
//     children: [
//       {
//         path: 'create',
//         component: () => import('@/views/example/create'),
//         name: 'CreateArticle',
//         meta: { title: 'createArticle', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: () => import('@/views/example/edit'),
//         name: 'EditArticle',
//         meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: () => import('@/views/example/list'),
//         name: 'ArticleList',
//         meta: { title: 'articleList', icon: 'list' }
//       }
//     ]
//   },

//   {
//     path: '/tab',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/tab/index'),
//         name: 'Tab',
//         meta: { title: 'tab', icon: 'tab' }
//       }
//     ]
//   },

//   {
//     path: '/error',
//     component: Layout,
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'errorPages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: () => import('@/views/error-page/401'),
//         name: 'Page401',
//         meta: { title: 'page401', noCache: true }
//       },
//       {
//         path: '404',
//         component: () => import('@/views/error-page/404'),
//         name: 'Page404',
//         meta: { title: 'page404', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/error-log',
//     component: Layout,
//     children: [
//       {
//         path: 'log',
//         component: () => import('@/views/error-log/index'),
//         name: 'ErrorLog',
//         meta: { title: 'errorLog', icon: 'bug' }
//       }
//     ]
//   },

//   {
//     path: '/excel',
//     component: Layout,
//     redirect: '/excel/export-excel',
//     name: 'Excel',
//     meta: {
//       title: 'excel',
//       icon: 'excel'
//     },
//     children: [
//       {
//         path: 'export-excel',
//         component: () => import('@/views/excel/export-excel'),
//         name: 'ExportExcel',
//         meta: { title: 'exportExcel' }
//       },
//       {
//         path: 'export-selected-excel',
//         component: () => import('@/views/excel/select-excel'),
//         name: 'SelectExcel',
//         meta: { title: 'selectExcel' }
//       },
//       {
//         path: 'export-merge-header',
//         component: () => import('@/views/excel/merge-header'),
//         name: 'MergeHeader',
//         meta: { title: 'mergeHeader' }
//       },
//       {
//         path: 'upload-excel',
//         component: () => import('@/views/excel/upload-excel'),
//         name: 'UploadExcel',
//         meta: { title: 'uploadExcel' }
//       }
//     ]
//   },

//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     alwaysShow: true,
//     name: 'Zip',
//     meta: { title: 'zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: () => import('@/views/zip/index'),
//         name: 'ExportZip',
//         meta: { title: 'exportZip' }
//       }
//     ]
//   },

//   {
//     path: '/pdf',
//     component: Layout,
//     redirect: '/pdf/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/pdf/index'),
//         name: 'PDF',
//         meta: { title: 'pdf', icon: 'pdf' }
//       }
//     ]
//   },
//   {
//     path: '/pdf/download',
//     component: () => import('@/views/pdf/download'),
//     hidden: true
//   },

//   {
//     path: '/theme',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/theme/index'),
//         name: 'Theme',
//         meta: { title: 'theme', icon: 'theme' }
//       }
//     ]
//   },

//   {
//     path: '/clipboard',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/clipboard/index'),
//         name: 'ClipboardDemo',
//         meta: { title: 'clipboardDemo', icon: 'clipboard' }
//       }
//     ]
//   },

//   {
//     path: '/i18n',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/i18n-demo/index'),
//         name: 'I18n',
//         meta: { title: 'i18n', icon: 'international' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'externalLink', icon: 'link' }
//       }
//     ]
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
