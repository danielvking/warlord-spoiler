import { createRouter, createWebHistory } from 'vue-router'

const Show404 = () => import('./components/Show404.vue')
const PrintDeck = () => import('./components/spoiler/PrintDeck.vue')
const CardSpoiler = () => import('./components/spoiler/CardSpoiler.vue')
const CardDetailParent = () => import('./components/spoiler/CardDetailParent.vue')
const FullCardList = () => import('./components/spoiler/FullCardList.vue')
const EnableEdit = () => import('./components/editor/EnableEdit.vue')
const BuildCard = () => import('./components/builder/BuildCard.vue')
const RulesetGuide = () => import('./components/builder/RulesetGuide.vue')

let searchScrollTop = 0

const router = createRouter({
  history: createWebHistory(),
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
      path: '/:pathMatch(.*)*',
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
      //
      // vue-router 4 serialises a query the form-urlencoded way, so spaces in a
      // card name come out as "+" where vue-router 3 emitted "%20". Both forms
      // resolve, so links indexed under the old shape still work, but the
      // canonical URL this route advertises changed for most of the catalogue.
      path: '/card-list',
      name: 'cardList',
      component: FullCardList,
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: 63, // Probably a more elegant solution to this
            behavior: "smooth"
          })
        }, 300)
      });
    }
    // Only the browser back button gets a savedPosition. The "Return to
    // search" link is a forward push, so it falls back to what we captured.
    if (to.name === 'searchPage') {
      let top = savedPosition ? savedPosition.top : searchScrollTop
      return { left: 0, top: top || 0, behavior: "instant" }
    }
    return { left: 0, top: 0, behavior: "instant" }
  }
})

// Where the search results were when you last left them. scrollBehavior runs
// after the DOM has updated, too late to read it there.
router.beforeEach((to, from) => {
  if (from.name === 'searchPage' && to.name !== 'searchPage') {
    searchScrollTop = window.scrollY
  }
})

export default router
