<template>

<v-row>
  <v-col cols="12" sm="12" md="12">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div>
          <div class="float-left display-1">
            Domain Finder
            <v-hover v-slot:default="{ hover }" transition="slide-x-transition">
              <v-btn rounded small color="yellow darken-3">
                <v-icon :left="hover ? true : false">mdi-school</v-icon>
                <div  class="transition-slow-in-slow-out" v-if="hover">Learning Center</div>
              </v-btn>
            </v-hover>
            <v-hover v-slot:default="{ hover }" transition="slide-x-transition">
              <v-btn rounded small color="blue-grey darken-1">
                <v-icon :left="hover ? true : false">mdi-settings</v-icon>
                <div  class="transition-slow-in-slow-out" v-if="hover">Settings</div>
              </v-btn>
            </v-hover>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" sm="6" md="6">
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                  label="Keywords"
                  placeholder="Keywords (e.g. photo find)"
                  v-model="keywords"
                  outlined
                ></v-text-field>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="useSynonyms"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Use Synonyms"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="useStemming"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Use Stemming"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="allowEmd"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Allow EMD"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="useWebSuffixes"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Use Web Suffixes"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="useSuffixes"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Use Word Suffixes"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="usePrefixes"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Word Prefixes"
              ></v-switch>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <div class="float-left">
                <v-switch
                  v-model="usePrefixNumber"
                  class="mt-0"
                  color="blue lighten-2"
                  hide-details
                >
                  <template v-slot:label :indeterminate="usePrefixNumber">
                    Number Prefixes
                  </template>
                </v-switch>
              </div>
              <div class="float-left">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon @click="openUrl('https://www.google.com')" color="yellow darken-3" small v-on="on">mdi-school-outline</v-icon>
                  </template>
                  <span>Prefix the domain name with popular numbers. Click for more info.</span>
                </v-tooltip>
              </div>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-switch
                v-model="useDashes"
                class="mt-0"
                color="blue lighten-2"
                hide-details
                label="Use Hyphens"
              ></v-switch>
            </v-col>

            <v-col cols="6" sm="6" md="6">
              <v-slider
                v-model="domainLength"
                min="5"
                max="30"
                label="Max Domain Character Length"
                thumb-label
              ></v-slider>
            </v-col>

            <v-col cols="6" sm="6" md="6">
              <v-slider
                v-model="minScore"
                min="1"
                max="100"
                label="Min score"
                thumb-label
              ></v-slider>
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
            <v-col cols="12" sm="12" md="12">
              <v-btn
                color="primary"
                class="mr-4"
                @click="submit"
              >
                Find Domain Names
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="6" sm="6" md="6">
        <v-data-table
          :headers="headers"
          :items="domains"
          :items-per-page="10"
          :sort-by="['availability', 'score', 'domain']"
          :sort-desc="[false, true, false]"
          :loading="tableLoading(loadingKey)"
          :key="loadingKey"
        >
          <template v-slot:item.availability="{ item }">
            <v-btn @click="openWindow(item.domain, item.availability)" x-small :loading="getLoading(item.availability)" 
              :disabled="getDisabled(item.availability)" :color="getColor(item.availability)">{{ item.availability }}</v-btn>
          </template>
          <template v-slot:item.history="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn x-small :loading="getHistoryLoading(item.history)" 
                  :disabled="getHistoryDisabled(item.history)" :color="getHistoryColor(item.history)" v-on="on">{{ item.history }}</v-btn>
                </template>
              <v-list dense rounded>
                <v-list-item @click="openHistoryWindow(item.domain, item.history)">
                  <v-list-item-icon><v-icon>mdi-file-chart</v-icon></v-list-item-icon>
                  <v-list-item-title>Simple History Information</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openAdvancedHistoryWindow(item.domain, item.history)">
                  <v-list-item-icon><v-icon>mdi-file-chart</v-icon></v-list-item-icon>
                  <v-list-item-title>Advanced History Report</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:item.score="{ item }">
            <v-chip :color="getScoreColor(item.score)" small>{{ item.score }}</v-chip>
          </template>
        </v-data-table>
        <br>
        <div class="float-right">
          <v-btn @click="exportCsv(domains)" rounded :disabled="exportStatus(domains)" x-small color="primary">
            <v-icon left>mdi-file-excel</v-icon>Export results as CSV
          </v-btn>
          <v-btn @click="exportPdf(domains)" rounded :disabled="exportStatus(domains)" x-small color="primary">
            <v-icon left>mdi-file-pdf</v-icon>Export results as PDF
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script src="../DomainFinder.js"></script>
