import Vue from 'vue'

import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

VSelect.props.appendToBody.default = true;
VSelect.props.calculatePosition.default = function (dropdownList, component, {width, top, left}) {
  dropdownList.style.position = "static";
  dropdownList.style.marginTop = top;
  dropdownList.style.marginLeft = left;
  dropdownList.style.alignSelf = "start";
  dropdownList.style.width = width;

  let topNum = +top.substring(0, top.length - 2);

  // Adjust when it resizes
  let height = component.$refs.toggle.getBoundingClientRect().height;
  let listener = function () {
    component.$nextTick(() => {
      let newHeight = component.$refs.toggle.getBoundingClientRect().height;
      if (newHeight !== height) {
        dropdownList.style.marginTop = topNum + newHeight - height + "px";
      }
    })
  }
  component.$on("input", listener);
  return () => component.$off("input", listener);
}

Vue.component('v-select', VSelect)