<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Add Basic Information</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Answer Questionnaire</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Choose Audits</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Verify and Save</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-text>
                <v-text-field
                  v-model="projectName"
                  label="Name of Project"
                  hint="This is the human readable name of your project. E.g. Facebook, Yahoo"
                  persistent-hint
                  filled
                ></v-text-field>

                <v-row align="center">
                  <v-col cols="1"  class="float-left">
                    <v-avatar color="grey">
                      <span class="white--text headline" transition="fade-transition" v-bind:class="{ 'd-none': unknownIconHidden }">?</span>
                      <v-progress-circular indeterminate v-bind:class="{ 'd-none': loadingIconHidden }"></v-progress-circular>
                      <img :src="imageUrl" v-bind:class="{ 'd-none': iconHidden }">
                    </v-avatar>
                  </v-col>
                  <v-col cols="11">
                    <v-text-field
                      v-on:blur="loadIcon"
                      v-model="baseDomain"
                      label="Base Domain of Project"
                      hint="The base domain of the project, not including protocol. E.g. www.facebook.com, yahoo.com"
                      persistent-hint
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-btn
                  color="primary"
                  @click="e1 = 2"
                >
                  Next Step
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-text>
                <v-col class="d-flex" cols="12" sm="12">
                  <v-select
                    v-model="defaultRenderingNeeded"
                    :items="renderingNeeded"
                    filled
                    label="Does your website need rendering for bots?"
                    hint="Is it needed to run Chromium to be able to render the content of a page on your website? Non rendered pages helps us (and Google) speed up the indexing."
                    persistent-hint
                  ></v-select>
                </v-col>

                <v-btn text
                  @click="e1 = 1"
                >
                  Back
                </v-btn>

                <v-btn
                  color="primary"
                  @click="e1 = 3"
                >
                  Next Step
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn text
          @click="e1 = 2"
        >
          Back
        </v-btn>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Next Step
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import { mapState } from 'vuex'
  var newProject = {
    data: () => ({
      projectName: '',
      baseDomain: '',
      loadingIconHidden: true,
      iconHidden: true,
      unknownIconHidden: false,
      imageUrl: '',
      oldDomain: '',
      renderingNeeded: ['Do not know', 'No', 'Yes'],
      defaultRenderingNeeded: 'Do not know',
      e1: 0
    }),
    created () {
      this.$vuetify.theme.dark = true
      this.$store.watch(
        (state, getters) => getters.iconToLoad,
        (newValue, oldValue) => {
          if (this.$store.getters.iconToLoad) {
            this.imageUrl = this.$store.getters.iconToLoad
            this.loadingIconHidden = true
            this.iconHidden = false
          }
        }
      )
    },
    computed: mapState([
      'iconToLoad'
    ]),
    methods: {
      loadIcon () {
        if (this.baseDomain && this.oldDomain !== this.baseDomain) {
          this.loadingIconHidden = false
          this.unknownIconHidden = true
          this.iconHidden = true
          if (this.baseDomain.substr(0, 7) === 'http://') {
            this.baseDomain = this.baseDomain.substr(7)
          }
          if (this.baseDomain.substr(0, 8) === 'https://') {
            this.baseDomain = this.baseDomain.substr(8)
          }
          this.oldDomain = this.baseDomain
          this.$store.dispatch('remove_icon_from_queue')
          this.$store.dispatch('add_icon_website_to_queue', this.baseDomain)
        }
      }
    }
  }

  export default newProject
</script>