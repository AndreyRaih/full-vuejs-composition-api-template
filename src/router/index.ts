import Vue from 'vue'
import Router, { RouterOptions } from 'vue-router'
Vue.use(Router)

const HomePage = () => import('../pages/Home.vue')
const CompositionApiPage = () => import('../pages/CompositionApi.vue')
const CompositionApiPageBase = () => import('../pages/CompositionApi/Base.vue')
const CompositionApiPageVuex = () => import('../pages/CompositionApi/Vuex.vue')
const CompositionApiPageTypescript = () => import('../pages/CompositionApi/Typescript.vue')
export function createRouter (): Router {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      { path: '/home', component: HomePage },
      { path: '/compositionApi', component: CompositionApiPage, children: [
        { path:'', component: CompositionApiPageBase },
        { path:'vuex', component: CompositionApiPageVuex },
        { path: 'typescript', component: CompositionApiPageTypescript }
      ]},
      { path: '/', redirect: '/home' }
    ]
  } as RouterOptions)
}
