<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs10 offset-xs1>
        <v-card xs12 flat>
          <div>
            <vue-p5 @setup="setup" @draw="draw"></vue-p5>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
class Cloud {
  constructor(sketch, x, y, size) {
    this.sketch = sketch
    this.x = x
    this.y = y
    this.size = size
    this.speed = this.sketch.random(1, 2)
    this.update()
  }
  update() {
    this.x += this.speed
    this.checkEdges()
    this.show()
  }
  checkEdges() {
    if (this.x > (this.sketch.windowWidth / 12) * 10 + 120) {
      this.x = -120
    }
  }
  show() {
    this.sketch.fill(255)
    this.sketch.stroke(240)

    // this.sketch.push()
    this.sketch.push()
    this.sketch.arc(
      this.x,
      this.y,
      25 * this.size,
      20 * this.size,
      this.sketch.PI + this.sketch.TWO_PI,
      this.sketch.TWO_PI
    )
    this.sketch.arc(
      this.x + 10,
      this.y,
      25 * this.size,
      45 * this.size,
      this.sketch.PI + this.sketch.TWO_PI,
      this.sketch.TWO_PI
    )
    this.sketch.arc(
      this.x + 25,
      this.y,
      25 * this.size,
      35 * this.size,
      this.sketch.PI + this.sketch.TWO_PI,
      this.sketch.TWO_PI
    )
    this.sketch.arc(
      this.x + 40,
      this.y,
      30 * this.size,
      20 * this.size,
      this.sketch.PI + this.sketch.TWO_PI,
      this.sketch.TWO_PI
    )
    this.sketch.pop()
  }
}

import VueP5 from "vue-p5";

export default {
  name: "home",
  components: {
    "vue-p5": VueP5
  },
  data: () => ({
    clouds: []
  }),
  methods: {
    // preload(sketch) {
    //     var clouds = []
    // },
    setup(sketch) {
      sketch.createCanvas((sketch.windowWidth / 12) * 10, sketch.windowHeight);
      // THIS CHANGES FOR TEMP
      sketch.background(62, 182, 234);

      // CLOUD
      for (let i = 0; i < 30; i++) {
        let x = sketch.random(0, sketch.windowWidth);
        let y = sketch.random(120, 200);
        let size = sketch.random(2, 6);
        this.clouds.push(new Cloud(sketch, x, y, size));
      }
    //   // THIS CHANGES FOR SOIL MOISTURE
    //   // DIRT
    //   sketch.fill(137, 75, 42);
    //   sketch.rect(
    //     0,
    //     sketch.windowHeight * 0.666666,
    //     (sketch.windowWidth / 12) * 10,
    //     sketch.windowHeight * 0.333333
    //   )
    //   // GRASS
    //   sketch.fill(69, 133, 15);
    //   sketch.rect(
    //     0,
    //     sketch.windowHeight * 0.666666,
    //     (sketch.windowWidth / 12) * 10,
    //     10
    //   )
    },
    draw(sketch) {
      let tp = 1 // Between 0-1
      let ph = 0.5 // Between 0-1
      let sm = 0.8 // Between 0-1

      // THIS CHANGES FOR TEMP
      // BLUE - R: 120-0 G: 160-116 B: 200-255
      // RED - R: 200-255 G: 140-54 B: 120-0
      if (tp <= 0.5){
            sketch.background(180 - (180*2*tp), 180 - (100*2*tp), 180)
      }
      else if (tp > 0.5){
            let tpinv = tp - 0.5
            sketch.background(230, 230 - (50*2*tpinv), 230 - (230*2*tpinv))
      }

      // THIS CHANGES FOR PRESSURE AND HUMIDITY
      for (let i = 0; i < 30 * ph; i++) {
        this.clouds[i].update()
      }

      sketch.stroke(0)
      // THIS CHANGES FOR SOIL MOISTURE
      // DIRT
      sketch.fill(2 * 60 - (30 * sm), 60 - (30 * sm), 20)
      sketch.rect(
        0,
        sketch.windowHeight * 0.666666,
        (sketch.windowWidth / 12) * 10,
        sketch.windowHeight * 0.333333
      )

      // GRASS
      sketch.fill(69, 133, 15)
      sketch.rect(
        0,
        sketch.windowHeight * 0.666666,
        (sketch.windowWidth / 12) * 10,
        10
      )
    },
    setGradient(sketch, x, y, w, h, c1, c2, axis) {
      sketch.noFill()
      if (axis == "Y") {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = sketch.map(i, y, y + h, 0, 1)
          let c = sketch.lerpColor(c1, c2, inter)
          sketch.stroke(c)
          sketch.line(x, i, x + w, i)
        }
      } else if (axis == "X") {
        // Left to right gradient
        for (let j = x; j <= x + w; j++) {
          let inter2 = sketch.map(j, x, x + w, 0, 1)
          let d = sketch.lerpColor(c1, c2, inter2)
          sketch.stroke(d)
          sketch.line(j, y, j, y + h)
        }
      }
    }
  }
}
</script>
