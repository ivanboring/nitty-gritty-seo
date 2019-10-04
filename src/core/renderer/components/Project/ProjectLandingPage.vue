<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-card
        class="mx-auto"
      >

        <v-list-item>
          <v-list-item-avatar><img :src="Project.projects[this.$route.params.id].icon"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ Project.projects[this.$route.params.id].name }}</v-list-item-title>
            <v-list-item-subtitle>{{ Project.projects[this.$route.params.id].domain }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-parallax
          :src="getBackgroundImage()"
          height="200"
        >
          <v-row
            align="center"
            justify="center"
          >
            <h1 class="display-2">{{ Project.projects[this.$route.params.id].name }}</h1>
          </v-row>
        </v-parallax>

        <v-card-actions>
          <v-btn rounded small color="success">
            <v-icon left>mdi-plus</v-icon>
            <div>Run an Full Audit</div>
          </v-btn>
          <v-btn rounded small color="blue-grey darken-1">
            <v-icon left>mdi-settings</v-icon>
            <div>Project Settings</div>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>
      <v-divider></v-divider>
      <br>
      <template>
        <v-data-table
          no-data-text="No audits run so far on this project"
          :headers="auditHeaders"
          :items="Audit.audits"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
      <br>
      <v-divider></v-divider>
      <br>
      <template>
        <v-data-table
          no-data-text="No audits run so far on this project"
          :headers="auditHeaders"
          :items="Audit.audits"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
      <br>
      <v-divider></v-divider>
      <br>
      <template>
        <v-data-table
          no-data-text="No audits run so far on this project"
          :headers="auditHeaders"
          :items="Audit.audits"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </template>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'
  import filenamify from 'filenamify'
  const electron = require('electron')

  var projectLandingPage = {
    computed: mapState(['Project', 'Audit']),
    data: () => ({
      showInfo: false,
      auditHeaders: [
        {text: 'Date/Time', value: 'date'},
        {text: 'Status', value: 'status'},
        {text: 'Pages audited', value: 'pages'},
        {text: 'Total tests', value: 'totaltests'},
        {text: 'Errors', value: 'errors'},
        {text: 'Warnings', value: 'warnings'},
        {text: 'Notices', value: 'notices'},
        {text: 'Tools', value: 'tools'}
      ]
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      getBackgroundImage () {
        var userDataDir = (electron.app || electron.remote.app).getPath('userData')
        var dir = filenamify(this.$store.getters.projects[this.$route.params.id].domain)

        return 'file://' + userDataDir + '/' + dir + '/resources/screenshot.png'
      }
    }
  }

  export default projectLandingPage
</script>