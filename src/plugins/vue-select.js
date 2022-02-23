import Vue from 'vue'

import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

VSelect.props.appendToBody.default = true;
VSelect.props.calculatePosition.default = function (dropdownList, component, {width, top, left}) {
  dropdownList.style.position = "static";
  dropdownList.style.marginTop = top;
  dropdownList.style.marginLeft = left;
  dropdownList.style.width = width;
}

Vue.component('v-select', VSelect)