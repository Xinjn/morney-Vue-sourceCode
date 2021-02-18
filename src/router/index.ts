import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFund from '@/views/NotFund.vue'
import EditLabel from '../views/EditLabel.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/money'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/labels',
    name: 'Labels',
    component: Labels
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/labels/edit',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFund
  }
]

const router = new VueRouter({
  routes
})

export default router
