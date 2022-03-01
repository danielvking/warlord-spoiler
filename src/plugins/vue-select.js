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

  let origRect = component.$refs.toggle.getBoundingClientRect();

  // Adjust when it resizes
  let height = origRect.height;
  let inputListener = function () {
    component.$nextTick(() => {
      let newHeight = component.$refs.toggle.getBoundingClientRect().height;
      if (newHeight !== height) {
        dropdownList.style.marginTop = topNum + newHeight - height + "px";
      }
    })
  }
  component.$on("input", inputListener);
  // Blur element on window resize
  let x = origRect.x;
  let windowListener = function () {
    if (component.searchEl === document.activeElement) {
      let newX = component.$refs.toggle.getBoundingClientRect().x;
      if (Math.abs(newX - x) > 1) {
        component.searchEl.blur();
      }
    }
  }
  window.addEventListener("resize", windowListener);

  return () => {
    component.$off("input", inputListener);
    window.removeEventListener("resize", windowListener);
  }
}

Vue.component('v-select', VSelect)