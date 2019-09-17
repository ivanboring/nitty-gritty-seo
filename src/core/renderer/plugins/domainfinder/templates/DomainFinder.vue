<template>

  <v-layout
    align-left
  >
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
                label="Your brand name"
                placeholder="Your brand name"
                outlined
                v-model="name"
              >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-text-field
                label="Keywords"
                placeholder="Keywords (e.g. photo find)"
                v-model="keywords"
                outlined
              ></v-text-field>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="useSynonyms"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Use Synonyms (e.g. polaroid-getter.com)"
            ></v-switch>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="allowEmd"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Allow EMD (e.g. photo-finder.com)"
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

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="useSuffixes"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Use Web Suffixes (e.g. photOFY, photR)"
            ></v-switch>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="usePrefixes"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Use Prefixes (e.g. thephoto, bestphoto)"
            ></v-switch>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <v-select
              v-model="tldValue"
              :items="tldItems"
              label="Select TLD's"
              multiple
            >
            </v-select>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="usePrefixes"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Use Dashes (e.g. find-photos.com)"
            ></v-switch>
          </v-col>

          <v-col cols="3" sm="3" md="3">
            <v-switch
              v-model="useStemming"
              class="mt-0"
              color="blue lighten-2"
              hide-details
              label="Use Stemming (e.g. find-photos.com and find-photo.com)"
            ></v-switch>
          </v-col>

          <v-btn
            color="success"
            class="mr-4"
            @click="submit"
          >
            Find Domain Names
          </v-btn>
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
      tldItems: ['.com', '.org', '.net', '.edu', '.io', '.test'],
      tldValue: ['.com', '.org', '.net'],
      name: '',
      valid: true,
      lazy: false,
      allowEmd: true,
      useSynonyms: true,
      usePrefixes: false,
      useSuffixes: false,
      useDashes: false,
      useStemming: false,
      useDashes: false,
      keywords: ''
    }),
    methods: {
      submit () {
        console.log(this.name)
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>
