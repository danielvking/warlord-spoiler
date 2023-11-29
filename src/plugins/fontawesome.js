import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faCheck,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faFolderOpen,
  faHammer,
  faInfoCircle,
  faMinusSquare,
  faPlusSquare,
  faPrint,
  faSave,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faCheck)
library.add(faExclamationTriangle)
library.add(faExternalLinkAlt)
library.add(faEye)
library.add(faHammer)
library.add(faInfoCircle)
library.add(faFolderOpen)
library.add(faMinusSquare)
library.add(faPlusSquare)
library.add(faPrint)
library.add(faSave)
library.add(faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)