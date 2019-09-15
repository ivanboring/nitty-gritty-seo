<template>
  <v-layout
    align-left
  >
    <v-flex shrink>
      <template>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Bajs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </template>
    </v-flex>
  </v-layout>
  
</template>

<script>
  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        }
      ]
    }),
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>
