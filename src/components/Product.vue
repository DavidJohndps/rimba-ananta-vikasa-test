<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      :src="`../../server/product_image/${product.image}`"
      height="200px"
    ></v-img>

    <v-card-title> {{ product.name }} </v-card-title>

    <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
    <v-card-text class="text--primary">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              <v-chip>{{`Price @${product.isKg ? "Kg" : "Pcs"}`}}</v-chip>
            </v-col>
            <v-col>{{ product.price }}</v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              <v-chip>Stock</v-chip>
            </v-col>
            <v-col>{{ product.qty }}</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Share </v-btn>

      <v-btn color="orange" text> Explore </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style></style>
