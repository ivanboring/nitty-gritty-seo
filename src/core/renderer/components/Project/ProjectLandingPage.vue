<template>
  <v-row>
    <v-col cols="5" sm="5" md="5">
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
          <v-btn rounded small :color="auditColor" :disabled="auditRunning" :loading="auditLoading" v-on:click="startAudit()">
            <v-icon left>mdi-plus</v-icon>
            <div>{{ this.auditText }}</div>
          </v-btn>
          <v-btn rounded small color="blue-grey darken-1">
            <v-icon left>mdi-settings</v-icon>
            <div>Project Settings</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="7" sm="7" md="7">
      <template>
        <transition name="fade">
          <v-data-table
            no-data-text="No audits run so far on this project"
            :headers="auditHeaders"
            :items="Audit.projectAudits[Project.projects[this.$route.params.id].domain]"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </transition>
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
      domain: '',
      showInfo: false,
      auditRunning: false,
      auditLoading: false,
      auditColor: 'success',
      auditText: 'Run an Audit',
      auditHeaders: [
        {text: 'Date/Time', value: 'datetime'},
        {text: 'Status', value: 'status'},
        {text: 'Pages audited', value: 'pages'},
        {text: 'Total tests', value: 'totalTests'},
        {text: 'Errors', value: 'errors'},
        {text: 'Warnings', value: 'warnings'},
        {text: 'Notices', value: 'notices'},
        {text: 'Tools', value: 'tools'}
      ]
    }),
    created () {
      this.$vuetify.theme.dark = true
      this.domain = this.Project.projects[this.$route.params.id].domain
      // Check if audit is running
      if (typeof this.Audit.activeAudits[this.domain] !== 'undefined') {
        this.cancelState()
      }
    },
    methods: {
      getBackgroundImage () {
        return projectLoader.getResource(this.domain, 'screenshot.png')
      },
      startAudit () {
        // Cancel action
        console.log(this.auditColor)
        if (this.auditColor === 'error') {
          this.$store.dispatch('clean_non_finished_audits_from_project_list', {domain: this.domain})
          this.activeState()
        } else {
          this.auditRunning = true
          this.auditLoading = true
          var parentObject = this
          this.$store.dispatch('add_audit_to_active_list', {domain: this.domain})
          setTimeout(function () {
            parentObject.cancelState()
          }, 2000)
        }
      },
      activeState () {
        this.auditText = 'Run an Audit'
        this.auditColor = 'success'
        this.auditLoading = false
        this.auditRunning = false
      },
      cancelState () {
        this.auditText = 'Cancel Audit'
        this.auditColor = 'error'
        this.auditLoading = false
        this.auditRunning = false
      }
    }
  }

  export default projectLandingPage
</script>