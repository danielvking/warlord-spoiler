import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faCheck,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faFileArrowUp,
  faFileCsv,
  faFolderOpen,
  faHammer,
  faInfoCircle,
  faMinusSquare,
  faPlusSquare,
  faPrint,
  faSave,
  faSignOutAlt,
  faShare
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faCheck)
library.add(faExclamationTriangle)
library.add(faExternalLinkAlt)
library.add(faEye)
library.add(faFolderOpen)
library.add(faFileArrowUp)
library.add(faFileCsv)
library.add(faHammer)
library.add(faInfoCircle)
library.add(faMinusSquare)
library.add(faPlusSquare)
library.add(faPrint)
library.add(faSave)
library.add(faSignOutAlt)
library.add(faShare)

Vue.component('font-awesome-icon', FontAwesomeIcon)