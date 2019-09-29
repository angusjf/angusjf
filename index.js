"use strict"

let ctx = null
let canvas = null
let mousePos = { x: 0, y: 0 }
let plant0 = 0
let plantHead = 0
let headX = 0, headY = 0
let cameraOffsetY = 0
let lockStatus = "free"

function init() {
    plant0 = {
        length: 0,
        maxLength: 10,
        angle: 0,
        velocity: 1,
        children: null
    }
    plantHead = plant0
}
init()

const backgroundColor = 'rgba(212, 206, 201, 255)'
const leafColor = 'rgba(255, 201, 181, 255)'
const stemColor = 'rgba(109, 100, 102, 255)'
const lineColor = 'rgba(179, 170, 172, 100)'

let liveT = 0.4 // only need to score liveT to live
let splitT = 0.4 // need to score 1 - splitT to split

window.onload = () => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    canvas.addEventListener('mousemove', evt => {
        mousePos = getMousePos(canvas, evt)
    }, false)
    mousePos.x = canvas.clientWidth / 1.5
    mousePos.y = canvas.clientHeight / 1.5
    window.requestAnimationFrame(loop)
}

function loop() {
    update()
    draw()
    window.requestAnimationFrame(loop)
}

function update() {
    updatePlant(plant0)

    plantHead.angle = lerp(plantHead.angle, safeatan2(headX - mousePos.x, headY - 0/*mousePos.y*/), 0.05)
}

function draw() {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawPlant(plant0, canvas.clientWidth / 2, canvas.clientHeight - 10 + cameraOffsetY)

    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.setLineDash([5, 15])
    ctx.moveTo(headX, headY)
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()
    ctx.setLineDash([])

    if (lockStatus === "triggered") {
            cameraOffsetY += 2.5
    }

    if (lockStatus === "free") {
        if (headY < canvas.clientHeight / 8) {
            lockStatus = "triggered"
            setTimeout(() => {
                lockStatus = "locked"
                setTimeout(() => {
                    lockStatus = "free"
                }, 1000)
            }, 1500)
        }
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

function generateRandomPlant() {
    return {
        length: 0,
        maxLength: newRandomMaxLength(),
        angle: newRandomAngle(),
        velocity: newRandomVelocity(),
        children: null
    }
}

function newRandomMaxLength() {
    return canvas.clientHeight / 10 * (1 + Math.random())
}

function newRandomAngle() {
    if (Math.random() > 0.5) {
        return 0.1745329252 + 0.6108652382 * Math.random()
    } else {
        return (0.1745329252 + 0.6108652382 * Math.random()) * -1
    }
}

function newRandomVelocity() {
    return 0.25 + Math.random() * 0.1
}

function updatePlant(plant) {
    if (plant.children == null) {
        plant.length += plant.velocity
        if (plant.length >= plant.maxLength) {
            let r = Math.random()
            if (r > (1 - splitT)) {
                splitT /= 1.5
                plant.children = [generateRandomPlant(), generateRandomPlant()]
                plant.children[0].angle = plant.angle
                if (plant == plantHead) {
                    plantHead = plant.children[0]
                }
            } else if (r > liveT) {
                plant.children = [generateRandomPlant()]
                if (plant == plantHead) {
                    plantHead = plant.children[0]
                }
            } else {
                if (plant != plantHead) {
                    splitT *= 1.7
                    plant.children = []
                }
            }
        }
    } else {
        plant.children.forEach(updatePlant)
    }
}

function drawPlant(plant, x, y) {
    ctx.strokeStyle = stemColor
    ctx.lineWidth = 3
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    let endx = x - plant.length * Math.sin(plant.angle)
    let endy = y - plant.length * Math.cos(plant.angle)
    if (plant == plantHead) {
        headX = endx
        headY = endy
    }
    ctx.lineTo(endx, endy)
    ctx.closePath()
    ctx.stroke()

    if (plant.children == null || plant.children.length == 0) {
        ctx.fillStyle = leafColor
        ctx.beginPath()
        ctx.arc(endx, endy, 5, 0, Math.PI * 2)
        ctx.fill()
    } else {
        ctx.fillStyle = stemColor
        ctx.beginPath()
        ctx.arc(endx, endy, 1.3, 0, Math.PI * 2)
        ctx.fill()
        plant.children.forEach(p => {
            drawPlant(p, endx, endy)
        })
    }
}

function safeatan2(a, b) {
    let ret = Math.atan2(a, b)
    return ret
}

function lerp(a, b, t) {
    return (1 - t) * a + b * t
}
