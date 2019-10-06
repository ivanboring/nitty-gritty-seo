<template>
  <v-row>
    <v-col cols="6" sm="6" md="6">
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
        <v-img
          :src="getBackgroundImage()"
          height="300px"
          position="top center"
          class="grey lighten-2"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
        </v-img>

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
  import projectLoader from '../../helpers/projectLoader'

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
        return projectLoader.getResource(this.$store.getters.projects[this.$route.params.id].domain, 'screenshot.png')
      }
    }
  }

  export default projectLandingPage
</script>