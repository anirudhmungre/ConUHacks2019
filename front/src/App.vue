<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher floating absolute dark right app :width="drawerWidth">
      <v-list>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
      <v-icon>filter_vintage</v-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Scarecrow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'Main',
  data: () => ({
    drawer: null,
    drawerWidth: window.innerWidth * 0.75
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.drawerWidth = window.innerWidth * 0.75
      });
    })
  },
  methods: {
    setup(sketch) {
      sketch.background('green')
    }
  }
}
</script>
