import Vue from 'vue'

import {
  ButtonPlugin,
  FormCheckboxPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  InputGroupPlugin,
  LayoutPlugin,
  PaginationPlugin,
  PopoverPlugin,
  SidebarPlugin,
  SpinnerPlugin,
  TablePlugin,
  ToastPlugin
} from 'bootstrap-vue'
import '../scss/bootstrapConfig.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ButtonPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormRadioPlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(InputGroupPlugin)
Vue.use(LayoutPlugin)
Vue.use(PaginationPlugin)
Vue.use(PopoverPlugin)
Vue.use(SidebarPlugin)
Vue.use(SpinnerPlugin)
Vue.use(TablePlugin)
Vue.use(ToastPlugin)
