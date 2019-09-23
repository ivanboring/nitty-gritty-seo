<template>
  <v-combobox
        v-model="model"
        :items="items"
        :search-input.sync="search"
        hide-selected
        label="Match on this characters in the beginning"
        multiple
        persistent-hint
        small-chips
      >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>