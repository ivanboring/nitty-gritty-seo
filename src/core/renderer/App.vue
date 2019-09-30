<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="300"
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
            <v-list dense nav>
              <v-list-item
                v-for="item in Menu.items"
                :key="item.id"
              >
                  <v-list-item-icon v-on="on">
                    <router-link :to="{ path: item.path }">
                    <v-icon>mdi-{{ item.icon }}</v-icon>
                    </router-link>
                  </v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-list-item-content v-on="on">
                        <router-link :to="{ path: item.path }">
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </router-link>
                      </v-list-item-content>
                    </template>
                    <span>{{ item.description }}</span>
                  </v-tooltip>
                
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
            <v-list 
              dense
              expand
            >
              <v-list-item
                v-for="project in Project.projects"
                :key="project.domain"
              >
                <v-list-item-avatar height="30px" width="30px" min-width="30px">
                  <router-link :to="project.domain">
                    <v-badge overlap color="error" left small>
                      <template v-slot:badge>1</template>
                      <v-avatar size="27"><img :src="project.icon"></v-avatar>
                    </v-badge>
                  </router-link>
                </v-list-item-avatar>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-list-item-content v-on="on">
                      <router-link :to="project.domain">
                        <v-list-item-title v-html="project.name"></v-list-item-title>
                        <v-list-item-action-text>{{ project.domain }}</v-list-item-action-text>
                      </router-link>
                    </v-list-item-content>
                  </template>
                  <span>{{ project.domain }}</span>
                </v-tooltip>
              </v-list-item>

              <v-list-item>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <router-link to="/new-project">
                      <v-btn v-on="on" class="ma-2" rounded color="success">
                        <v-icon left>mdi-plus</v-icon> Add new project
                      </v-btn>
                    </router-link>
                  </template>
                  <span>Add a new project to audit continuously</span>
                </v-tooltip>
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
      >
        <transition>
          <router-view></router-view>
        </transition>
        </v-container>
      </v-content>

    <v-footer app>
      <span>Open source since 2019 - Created on the back off Electron, Vue, Vuex, Vuetify and the work of 100s of other great projects.</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState(['Menu', 'Project']),
    data: () => ({
      drawer: null,
      on: null
    })
  }
</script>
