import Vue from 'vue'
import Router from 'vue-router'

const PrintDeck = () => import('@/components/PrintDeck.vue')
const CardSpoiler = () => import('@/components/CardSpoiler.vue')
const CardDetailParent = () => import('@/components/CardDetailParent.vue')
const PageNotFound = () => import('@/components/PageNotFound.vue')
const EnableEdit = () => import('@/components/EnableEdit.vue')
const BuildCard = () => import('@/components/BuildCard.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/print-deck',
      name: 'printDeck',
      component: PrintDeck
    },
    {
      path: "/edit",
      component: EnableEdit
    },
    {
      path: "/build-card",
      component: BuildCard
    },
    {
      path: '*',
      component: PageNotFound
    },
    {
      path: '/',
      component: CardSpoiler,
      children: [
        {
          path: '/',
          name: 'searchPage'
        },
        {
          path: 'card-detail',
          name: 'cardDetailPage',
          component: CardDetailParent,
          props: (route) => ({ card: route.query.card })
        }
      ]
    }
  ]
})
