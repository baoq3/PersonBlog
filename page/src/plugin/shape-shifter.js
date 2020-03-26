/*
 * Shape Shifter
 * A canvas experiment
 */

'use strict'

function Point (args) {
  return {
    x: args.x,
    y: args.y,
    z: args.z,
    a: args.a,
    h: args.h
  }
}

var S = {
  init: function (initValue, bodyValue, shapeShifterValue) {
    var action = window.location.href
    var i = action.indexOf('?a=')
    Point({
      x: 1,
      y: 1,
      z: 1,
      a: 1,
      h: 1
    })
    this.Drawing.init(initValue)
    this.ShapeBuilder.init()
    this.UI.init()
    document.querySelector(bodyValue).classList.add('body--ready')

    if (i !== -1) {
      this.UI.simulate(decodeURI(action).substring(i + 3))
    } else {
      // console.log(_this.shapeShifterValues)
      this.UI.simulate(shapeShifterValue)
    }
    this.Drawing.loop(() => {
      this.Shape.render()
    })
  }
}
var Sdr = S
S.Drawing = (function () {
  var canvas
  var context
  var renderFn
  var requestFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }

  return {
    init: function (el) {
      canvas = document.querySelector(el)
      context = canvas.getContext('2d')
      this.adjustCanvas()
      window.addEventListener('resize', function () {
        Sdr.Drawing.adjustCanvas()
      })
    },

    loop: function (fn) {
      renderFn = !renderFn ? fn : renderFn
      this.clearFrame()
      renderFn()
      requestFrame.call(window, this.loop.bind(this))
    },

    adjustCanvas: function () {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    },

    clearFrame: function () {
      context.clearRect(0, 0, canvas.width, canvas.height)
    },

    getArea: function () {
      return { w: canvas.width, h: canvas.height }
    },

    drawCircle: function (p, c) {
      context.fillStyle = c.render()
      context.beginPath()
      context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
    }
  }
})()

function Color (r, g, b, a) {
  this.r = r
  this.g = g
  this.b = b
  this.a = a
}

Color.prototype = {
  render: function () {
    return (
      'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'
    )
  }
}

var Su = S

S.UI = (function () {
  var interval
  var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints
  var currentAction
  var resizeTimer
  var time
  var maxShapeSize = 30
  var sequence = []
  var cmd = '#'

  function formatTime (date) {
    var h = date.getHours()
    var m = date.getMinutes()

    m = m < 10 ? '0' + m : m
    return h + ':' + m
  }

  function getValue (value) {
    return value && value.split(' ')[1]
  }

  function getAction (value) {
    value = value && value.split(' ')[0]
    return value && value[0] === cmd && value.substring(1)
  }

  function timedAction (fn, delay, max, reverse) {
    clearInterval(interval)
    currentAction = reverse ? max : 1
    fn(currentAction)

    if (
      !max ||
      (!reverse && currentAction < max) ||
      (reverse && currentAction > 0)
    ) {
      interval = setInterval(function () {
        currentAction = reverse ? currentAction - 1 : currentAction + 1
        fn(currentAction)

        if (
          (!reverse && max && currentAction === max) ||
          (reverse && currentAction === 0)
        ) {
          clearInterval(interval)
        }
      }, delay)
    }
  }

  function reset (destroy) {
    clearInterval(interval)
    sequence = []
    time = null

    if (destroy) {
      Su.Shape.switchShape(S.ShapeBuilder.letter(''))
    }
  }

  function performAction (value) {
    var action, current

    // overlay.classList.remove('overlay--visible');
    sequence =
      typeof value === 'object'
        ? value
        : sequence.concat(value.split('|'))
    // console.log(S)
    timedAction(
      function () {
        current = sequence.shift()
        action = getAction(current)
        value = getValue(current)
        switch (action) {
          case 'countdown':
            value = parseInt(value, 10) || 10
            value = value > 0 ? value : 10

            timedAction(
              function (index) {
                if (index === 0) {
                  if (sequence.length === 0) {
                    Su.Shape.switchShape(Su.ShapeBuilder.letter(''))
                  } else {
                    performAction(sequence)
                  }
                } else {
                  Su.Shape.switchShape(Su.ShapeBuilder.letter(index), true)
                }
              },
              1000,
              value,
              true
            )
            break

          case 'rectangle':
            value = value && value.split('x')
            value =
              value && value.length === 2
                ? value
                : [maxShapeSize, maxShapeSize / 2]

            Su.Shape.switchShape(
              Su.ShapeBuilder.rectangle(
                Math.min(maxShapeSize, parseInt(value[0], 10)),
                Math.min(maxShapeSize, parseInt(value[1], 10))
              )
            )
            break

          case 'circle':
            value = parseInt(value, 10) || maxShapeSize
            value = Math.min(value, maxShapeSize)
            Su.Shape.switchShape(Su.ShapeBuilder.circle(value))
            break

          case 'time':
            var t = formatTime(new Date())

            if (sequence.length > 0) {
              Su.Shape.switchShape(Su.ShapeBuilder.letter(t))
            } else {
              timedAction(function () {
                t = formatTime(new Date())
                if (t !== time) {
                  time = t
                  Su.Shape.switchShape(Su.ShapeBuilder.letter(time))
                }
              }, 1000)
            }
            break

          case 'icon':
            Su.ShapeBuilder.imageFile(
              'font-awesome/' + value + '.png',
              function (obj) {
                Su.Shape.switchShape(obj)
              }
            )
            break

          default:
            Su.Shape.switchShape(
              Su.ShapeBuilder.letter(
                current[0] === cmd ? 'What?' : current
              )
            )
        }
      },
      2000,
      sequence.length
    )
  }

  function bindEvents () {
    document.body.addEventListener('keydown', function (e) {
      // input.focus();

      if (e.keyCode === 13) {
        reset()
        performAction('')
      }
    })

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        Su.Shape.shuffleIdle()
        reset(true)
      }, 500)
    })
  }

  return {
    init: function () {
      bindEvents()

      if (isTouch) {
        document.body.classList.add('touch')
      }

      // S.UI.Tabs.init();
    },

    simulate: function (action) {
      performAction(action)
    }
  }
})()

function Dot (x, y) {
  this.p = Point({
    x: x,
    y: y,
    z: 5,
    a: 1,
    h: 0
  })

  this.e = 0.07
  S = true

  this.c = new Color(255, 255, 255, this.p.a)

  this.t = this.clone()
  this.q = []
}

var Sd = S

Dot.prototype = {
  clone: function () {
    return Point({
      x: this.x,
      y: this.y,
      z: this.z,
      a: this.a,
      h: this.h
    })
  },

  _draw: function () {
    this.c.a = this.p.a
    Sd.Drawing.drawCircle(this.p, this.c)
  },

  _moveTowards: function (n) {
    var details = this.distanceTo(n, true)
    var dx = details[0]
    var dy = details[1]
    var d = details[2]
    var e = this.e * d

    if (this.p.h === -1) {
      this.p.x = n.x
      this.p.y = n.y
      return true
    }

    if (d > 1) {
      this.p.x -= dx / d * e
      this.p.y -= dy / d * e
    } else {
      if (this.p.h > 0) {
        this.p.h--
      } else {
        return true
      }
    }

    return false
  },

  _update: function () {
    var p, d

    if (this._moveTowards(this.t)) {
      p = this.q.shift()

      if (p) {
        this.t.x = p.x || this.p.x
        this.t.y = p.y || this.p.y
        this.t.z = p.z || this.p.z
        this.t.a = p.a || this.p.a
        this.p.h = p.h || 0
      } else {
        if (S) {
          this.p.x -= Math.sin(Math.random() * 3.142)
          this.p.y -= Math.sin(Math.random() * 3.142)
        } else {
          this.move(
            Point({
              x: this.p.x + Math.random() * 50 - 25,
              y: this.p.y + Math.random() * 50 - 25
            })
          )
        }
      }
    }

    d = this.p.a - this.t.a
    this.p.a = Math.max(0.1, this.p.a - d * 0.05)
    d = this.p.z - this.t.z
    this.p.z = Math.max(1, this.p.z - d * 0.05)
  },

  distanceTo: function (n, details) {
    var dx = this.p.x - n.x
    var dy = this.p.y - n.y
    var d = Math.sqrt(dx * dx + dy * dy)

    return details ? [dx, dy, d] : d
  },

  move: function (p, avoidStatic) {
    if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
      this.q.push(p)
    }
  },

  render: function () {
    this._update()
    this._draw()
  }
}

S.ShapeBuilder = (function () {
  var gap = 13
  var shapeCanvas = document.createElement('canvas')
  var shapeContext = shapeCanvas.getContext('2d')
  var fontSize = 500
  var fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif'

  function fit () {
    shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap
    shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap
    shapeContext.fillStyle = 'red'
    shapeContext.textBaseline = 'middle'
    shapeContext.textAlign = 'center'
  }

  function processCanvas () {
    var pixels = shapeContext.getImageData(
      0,
      0,
      shapeCanvas.width,
      shapeCanvas.height
    ).data
    var dots = []
    var x = 0
    var y = 0
    var fx = shapeCanvas.width
    var fy = shapeCanvas.height
    var w = 0
    var h = 0

    for (var p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        dots.push(
          Point({
            x: x,
            y: y
          })
        )
        w = x > w ? x : w
        h = y > h ? y : h
        fx = x < fx ? x : fx
        fy = y < fy ? y : fy
      }

      x += gap
      if (x >= shapeCanvas.width) {
        x = 0
        y += gap
        p += gap * 4 * shapeCanvas.width
      }
    }

    return { dots: dots, w: w + fx, h: h + fy }
  }

  function setFontSize (S) {
    shapeContext.font = 'bold ' + S + 'px ' + fontFamily
  }

  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  return {
    init: function () {
      fit()
      window.addEventListener('resize', fit)
    },

    imageFile: function (url, callback) {
      var image = new Image()
      // console.log(S)
      var a = S.Drawing.getArea()

      image.onload = function () {
        shapeContext.clearRect(
          0,
          0,
          shapeCanvas.width,
          shapeCanvas.height
        )
        shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6)
        callback(processCanvas())
      }

      image.onerror = function () {
        callback(S.ShapeBuilder.letter('What?'))
      }

      image.src = url
    },

    circle: function (d) {
      var r = Math.max(0, d) / 2
      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
      shapeContext.beginPath()
      shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false)
      shapeContext.fill()
      shapeContext.closePath()

      return processCanvas()
    },

    letter: function (l) {
      S = 0

      setFontSize(fontSize)
      S = Math.min(
        fontSize,
        shapeCanvas.width /
          shapeContext.measureText(l).width *
          0.8 *
          fontSize,
        shapeCanvas.height /
          fontSize *
          (isNumber(l) ? 1 : 0.45) *
          fontSize
      )
      setFontSize(S)

      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
      shapeContext.fillText(
        l,
        shapeCanvas.width / 2,
        shapeCanvas.height / 2
      )

      return processCanvas()
    },

    rectangle: function (w, h) {
      var dots = []
      var width = gap * w
      var height = gap * h

      for (var y = 0; y < height; y += gap) {
        for (var x = 0; x < width; x += gap) {
          dots.push(
            Point({
              x: x,
              y: y
            })
          )
        }
      }

      return { dots: dots, w: width, h: height }
    }
  }
})()

S.Shape = (function () {
  var dots = []
  var width = 0
  var height = 0
  var cx = 0
  var cy = 0
  var Sx = S
  function compensate () {
    // console.log(Sx.Drawing)
    var a = Sx.Drawing.getArea()

    cx = a.w / 2 - width / 2
    cy = a.h / 2 - height / 2
  }

  return {
    shuffleIdle: function () {
      // console.log(S.Drawing)
      var a = Sd.Drawing.getArea()

      for (var d = 0; d < dots.length; d++) {
        if (!dots[d].S) {
          dots[d].move({
            x: Math.random() * a.w,
            y: Math.random() * a.h
          })
        }
      }
    },

    switchShape: function (n, fast) {
      var size
      // console.log(Sx)
      // console.log(Sx.Drawing)
      var a = Sx.Drawing.getArea()
      var d = 0
      var i = 0

      width = n.w
      height = n.h

      compensate()
      if (n.dots.length > dots.length) {
        size = n.dots.length - dots.length
        for (d = 1; d <= size; d++) {
          dots.push(new Dot(a.w / 2, a.h / 2))
        }
      }

      d = 0

      while (n.dots.length > 0) {
        i = Math.floor(Math.random() * n.dots.length)
        dots[d].e = fast ? 0.25 : dots[d].S ? 0.14 : 0.11

        if (dots[d].S) {
          dots[d].move(
            Point({
              z: Math.random() * 20 + 10,
              a: Math.random(),
              h: 18
            })
          )
        } else {
          dots[d].move(
            Point({
              z: Math.random() * 5 + 5,
              h: fast ? 18 : 30
            })
          )
        }

        dots[d].S = true
        dots[d].move(
          Point({
            x: n.dots[i].x + cx,
            y: n.dots[i].y + cy,
            a: 1,
            z: 5,
            h: 0
          })
        )

        n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1))
        d++
      }

      for (i = d; i < dots.length; i++) {
        if (dots[i].S) {
          dots[i].move(
            Point({
              z: Math.random() * 20 + 10,
              a: Math.random(),
              h: 20
            })
          )

          dots[i].S = false
          dots[i].e = 0.04
          dots[i].move(
            Point({
              x: Math.random() * a.w,
              y: Math.random() * a.h,
              a: 0.3,
              z: Math.random() * 4,
              h: 0
            })
          )
        }
      }
    },

    render: function () {
      for (var d = 0; d < dots.length; d++) {
        dots[d].render()
      }
    }
  }
})()

export default S
