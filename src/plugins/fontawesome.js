import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faMinusSquare,
  faPlusSquare,
  faPrint,
  faFolderOpen,
  faSave,
  faCheck,
  faEye,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faMinusSquare)
library.add(faPlusSquare)
library.add(faPrint)
library.add(faFolderOpen)
library.add(faSave)
library.add(faCheck)
library.add(faEye)
library.add(faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)