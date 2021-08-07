import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFund from '@/views/NotFund.vue'
import EditLabel from '../views/EditLabel.vue';
import Account from '../views/Account.vue';
import EditAccount from '../views/EditAccount.vue';
import CreateAccount from '../views/CreateAccount.vue';
import MoneyEdit from '../views/MoneyEdit.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/Labels'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/money/edit/:id',
    name: 'moneyedit',
    component: MoneyEdit
  },
  {
    path: '/labels',
    name: 'labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/account/edit/:id',
    component: EditAccount
  },
  {
    path: '/createAccount',
    component: CreateAccount
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
