function CustomEvent() {
  let listeners = []

  return {
    addListener(func) {
      listeners.push(func)
    },
    removeListener(func) {
      let index = listeners.indexOf(func)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    },
    raiseEvent() {
      listeners.forEach(x => {
        x(...arguments)
      })
    }
  }
}

export default CustomEvent