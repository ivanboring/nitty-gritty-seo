<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>General</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list dense>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-anchor</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Tools</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item click>
                <v-list-item-action>
                  <v-icon>mdi-anchor</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Add new project</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Projects</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item click>
                <v-list-item-action>
                  <v-icon>mdi-anchor</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Add new project</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Spadework SEO</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
          <div id="app">
            <router-view></router-view>
          </div>
        </v-container>
      </v-content>

    <v-footer app>
      <span>Open source since 2019 - Created using Electron, Vue and the work of 100s of other great projects.</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
  export default {
    name: 'nitty-gritty-seo'
  }
</script>

<style>
  /* CSS */
</style>
