<template>
  <v-stepper v-model="e1">
    <v-overlay :value="loadingOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Add Basic Information</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Answer Questionnaire</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Choose Automation</v-stepper-step>
    </v-stepper-header>

    <v-form ref="form" lazy-validation>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card>
                <v-card-text>
                  <v-text-field
                    v-model="projectName"
                    label="Name of Project"
                    hint="This is the human readable name of your project. E.g. Facebook, Yahoo"
                    :rules="[rules.required, rules.min]"
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
                        :rules="[rules.required, rules.domainName]"
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
              <v-card>
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

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-select
                      v-model="concurrency"
                      :items="concurrencyList"
                      filled
                      label="How much concurrency can your site handle?"
                      hint="So we do not kill your website by running our audits we need to know how many connections at a time your site handles. 
                      If you do not know we try to figure it out the same way Google does with it's crawl budget by raising connections until we see slowness."
                      persistent-hint
                    ></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="12">
                    <v-select
                      @change="showLocal(localWebsite)"
                      v-model="localWebsite"
                      :items="noYes"
                      filled
                      label="Is your website targeted against a single geographical region?"
                      hint="SEO for websites targeting local delivery is very different then a generic website and requires some additional audits."
                      persistent-hint
                    ></v-select>
                  </v-col>

                  <v-card v-bind:class="{ 'd-none': localHidden }">
                    <v-card-text>
                      <div class="headline mb-2">Business Data</div>
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="12">
                          <v-text-field
                            label="Business Name"
                            filled
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="d-flex" cols="12" sm="12">
                          <v-text-field
                            label="Address"
                            filled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      
                      <v-row>
                        <v-col class="d-flex" cols="6" sm="6">
                          <v-text-field
                            label="City"
                            filled
                          ></v-text-field>
                        </v-col>

                        <v-col class="d-flex" cols="6" sm="6">
                          <v-text-field
                            label="Zip Code"
                            filled
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="d-flex" cols="6" sm="6">
                          <v-text-field
                            label="State (Where applicable)"
                            filled
                          ></v-text-field>
                        </v-col>

                        <v-col class="d-flex" cols="6" sm="6">
                          <v-text-field
                            label="Country"
                            filled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

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
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card>
                <v-card-text>
                  <v-col class="d-flex" cols="12" sm="12">
                    <v-select
                      v-model="runAutomated"
                      :items="automationOptions"
                      filled
                      label="Do you want to run audits automatically?"
                      hint="If you want to run nightly audits on some schedule you can leave the app in the background. Otherwise audits are started manually."
                      persistent-hint
                    ></v-select>
                  </v-col>

                  <v-alert type="error" v-bind:class="{ 'd-none': isNotValid }">
                    Validation error, please go back and check all fields.
                  </v-alert>

                  <v-btn text
                    @click="e1 = 2"
                  >
                    Back
                  </v-btn>

                  <v-btn
                    color="success"
                    @click="validateAndSave"
                  >
                    Save Project
                  </v-btn>
                    </v-card-text>
                  </v-card>
            </v-col>
          </v-row>
        
        </v-stepper-content>
      </v-stepper-items>
    </v-form>
  </v-stepper>
</template>

<script>
  import { mapState } from 'vuex'
  const isValidDomain = require('is-valid-domain')

  var newProject = {
    data: () => ({
      loadingOverlay: false,
      projectName: '',
      baseDomain: '',
      loadingIconHidden: true,
      iconHidden: true,
      unknownIconHidden: false,
      imageUrl: '',
      oldDomain: '',
      renderingNeeded: ['Do not know', 'No', 'Yes'],
      defaultRenderingNeeded: 'Do not know',
      noYes: ['No', 'Yes'],
      localWebsite: 'No',
      localHidden: true,
      automationOptions: ['No automation', 'Every Night', 'Once per week'],
      runAutomated: 'No automation',
      concurrencyList: ['Do not know', 'Very low (1 connection)', 'Low (2-3 connections)', 'Average (4-6 connections)', 'High (7-10 connections)'],
      concurrency: 'Do not know',
      isNotValid: true,
      e1: 0,
      rules: {
        required: v => !!v || 'Required.',
        min: v => v.length >= 3 || 'Min 3 characters',
        domainName: v => isValidDomain(v) ? false : ('That is not a valid domain name')
      }
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
      this.$store.watch(
        (state, getters) => getters.projectQueue,
        (newValue, oldValue) => {
          if (this.$store.getters.projectQueue === null) {
            this.loadingOverlay = false
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
      },
      showLocal (showLocal) {
        if (showLocal === 'No') {
          this.localHidden = true
        } else {
          this.localHidden = false
        }
      },
      validateAndSave () {
        if (this.$refs.form.validate()) {
          this.isNotValid = true
          this.loadingOverlay = true
          var renderValue = 0
          if (this.defaultRenderingNeeded === 'No') {
            renderValue = 1
          } else if (this.defaultRenderingNeeded === 'Yes') {
            renderValue = 2
          }

          var localWebsite = this.localWebsite === 'No' ? 0 : 1

          var automation = 0
          if (this.runAutomated === 'Every night') {
            automation = 1
          } else if (this.runAutomated === 'Once per week') {
            automation = 2
          }

          var stress = 0
          switch (this.concurrency) {
            case 'Very low (1 connection)':
              stress = 1
              break
            case 'Low (2-3 connections)':
              stress = 3
              break
            case 'Average (4-6 connections)':
              stress = 5
              break
            case 'High (7-10 connections)':
              stress = 8
              break
          }

          this.$store.dispatch('add_project_to_queue', {
            name: this.projectName,
            domain: this.baseDomain,
            icon: this.imageUrl,
            rendering: renderValue,
            local: localWebsite,
            automation: automation,
            concurrency: stress
          })
        } else {
          this.isNotValid = false
        }
      }
    }
  }

  export default newProject
</script>