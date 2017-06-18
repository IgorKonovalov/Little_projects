spinWheel = () => {
  rotate = new TweenMax.to('#spinningWheel', 2, {
    rotation: '360',
    transformOrigin: '50% 50%',
    ease: Linear.easeNone,
    repeat: -1,
  }).timeScale(0)

  rotate.play()
  TweenLite.to(rotate, 1, {timeScale: 1})
}

spinWheel()
