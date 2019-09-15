<template>

  <v-layout
    align-left
  >
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
                label="Your brand name"
                placeholder="Your brand name"
                outlined
              ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-text-field
                label="Keywords"
                placeholder="Keywords"
                outlined
              ></v-text-field>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="findSynonyms"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Find Synonyms"
            ></v-switch>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="allowEmd"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Allow EMD"
            ></v-switch>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-slider
              v-model="max"
              min="8"
              max="30"
              label="Max Domain Character Length"
              thumb-label
            ></v-slider>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="value"
              :items="items"
              label="Select TLD's"
              multiple
            >
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-layout>
</template>

<script>
  export default {
    props: {
      source: String
    },
    data: () => ({
      max: 15,
      items: ['.com', '.org', '.net', '.edu', '.io', '.test'],
      value: ['.com', '.org', '.net'],
    }),
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>
