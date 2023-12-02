import Vue from 'vue'
import Router from 'vue-router'

const Show404 = () => import('./components/Show404.vue')
const PrintDeck = () => import('./components/spoiler/PrintDeck.vue')
const CardSpoiler = () => import('./components/spoiler/CardSpoiler.vue')
const CardDetailParent = () => import('./components/spoiler/CardDetailParent.vue')
const FullCardList = () => import('./components/spoiler/FullCardList.vue')
const EnableEdit = () => import('./components/editor/EnableEdit.vue')
const BuildCard = () => import('./components/builder/BuildCard.vue')
const RulesetGuide = () => import('./components/builder/RulesetGuide.vue')

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
      path: "/ruleset-guide/:id",
      name: "rulesetGuide",
      component: RulesetGuide,
      props: true
    },
    {
      path: '*',
      component: Show404
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
    },
    {
      // This is here for the benefit of SEO
      // To be honest, IDK if it will work
      path: '/card-list',
      name: 'cardList',
      component: FullCardList,
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
            offset: { x: 0, y: 63 }, // Probably a more elegant solution to this
            behavior: "smooth"
          })
        }, 300)
      });
    } else {
      return { x: 0, y: 0 }
    }
  }
})
