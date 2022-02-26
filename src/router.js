import Vue from 'vue'
import Router from 'vue-router'

const PrintDeck = () => import('@/components/spoiler/PrintDeck.vue')
const CardSpoiler = () => import('@/components/spoiler/CardSpoiler.vue')
const CardDetailParent = () => import('@/components/spoiler/CardDetailParent.vue')
const PageNotFound = () => import('@/components/PageNotFound.vue')
const EnableEdit = () => import('@/components/editor/EnableEdit.vue')
const BuildCard = () => import('@/components/builder/BuildCard.vue')
const RulesetGuide = () => import('@/components/builder/RulesetGuide.vue')

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
    }
  }
})
