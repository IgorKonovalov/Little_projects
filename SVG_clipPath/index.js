const sliderElem = document.getElementById('slider')
const thumbElem = document.getElementById('button')
const rangeElem = document.getElementById('range')

rangeElem.setAttribute('transform', `translate(-715)`)

thumbElem.onmousedown = e => {
  const thumbCoords = getCoords(thumbElem)
  const shiftX = e.pageX - thumbCoords.left
  const sliderCoords = getCoords(sliderElem)

  document.onmousemove = e => {
    let newLeft = e.pageX - shiftX - sliderCoords.left
    if (newLeft < -thumbCoords.width / 2) {
      newLeft = -thumbCoords.width / 2
    }
    const rightEdge =
      sliderElem.offsetWidth - thumbElem.offsetWidth + thumbCoords.width / 2
    if (newLeft > rightEdge) {
      newLeft = rightEdge
    }
    thumbElem.style.left = newLeft + 'px'
    rangeElem.setAttribute('transform', `translate(${newLeft - 700})`)
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null
  }
  return false
}

getCoords = elem => {
  const box = elem.getBoundingClientRect()
  return {
    width: box.width,
    height: box.height,
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  }
}
