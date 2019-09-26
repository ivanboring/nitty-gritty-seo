<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Basic Information</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Answer Questionnaire</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Choose Control</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Verify and Save</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-text-field
          v-model="projectName"
          label="Name of Project"
          hint="This is the human readable name of your project. E.g. Facebook, Yahoo"
          persistent-hint
          filled
        ></v-text-field>

        <v-text-field
          v-model="baseDomain"
          label="Base Domain of Project"
          hint="The base domain of the project, not including protocol. E.g. www.facebook.com, yahoo.com"
          persistent-hint
          filled
        ></v-text-field>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Next Step
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Next Step
        </v-btn>

        <v-btn text
          @click="e1 = 1"
        >
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Next Step
        </v-btn>

        <v-btn text
          @click="e1 = 2"
        >
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data: () => ({
      projectName: '',
      baseDomain: '',
      e1: 0
    }),
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>