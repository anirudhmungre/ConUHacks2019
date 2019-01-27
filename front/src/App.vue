<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-icon>filter_vintage</v-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Scarecrow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/dials">Dials</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'Main',
  data: () => ({ }),
  mounted() { },
}
</script>
