<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
    </v-col>
    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <v-card>
          <v-card-title>Important information</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <p>To drop-catch an expiring popular domain the chances to catch it is extremely poor.</p>
            <p>The bidding services dropcatch.com, namejet.com and snapnames.com are vastly better if you really are set to buy a popular domain.</p>
            <p>Please note that this "flaw" is true for any other commercial dropcatch tool on the market. Click the info button to understand why this is.</p>
            <p>This tool only has the purpose of dropcatching less popular domains that are not to be used as primary domain but for potential backlink or redirect value.</p>
            <p>Since you pay an extra fee to use the above mentioned services, any domain that is not auctioned by them or that has low priority could be won with 
               the Spadework SEO Dropcatcher tool at a normal cheap registrar price.</p>
            <p>If this tool indicated that the domain name is having substantial bidding on dropcatch.com, namejet.com or snapnames.com you can assume that this tool will 
                not be able to catch that domain. You will then have to option to bid on the domains via those tools.</p>
            <p>Also be aware that you need to fill up your Dynadot account with money to be able to use dropcatching. We use Dynadot since they cover most tld's and has an api.</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">I've read and understood this</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script src="../Dropcatcher.js"></script>