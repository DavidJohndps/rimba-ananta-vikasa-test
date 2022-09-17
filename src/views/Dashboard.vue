<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>
              <v-row>
                <v-col v-for="Product in Products" :key="Product.id">
                  <Product :product="Product" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Product from "../components/Product.vue";
export default {
  data() {
    return {
      product: {
        input: {
          name: "",
          image: "",
          isKg: false,
          qty: 0,
        },
        dialog: false,
      },
      drawer: null
    };
  },
  components: {
    Product,
  },
  computed: {
    Products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    async CreateProduct() {
      try {
        const result = await fetch("http://localhost:5050/api/product/", {
          method: "POST",
          body: {
            input: { ...this.product.input },
          },
        });

        const { ok, product } = await result.json();
        if (ok) {
          this.$store.commit("addProduct", product);
          this.product.dialog = !this.product.dialog;
        }
      } catch ({ error: { message } }) {
        alert(message);
      }
    },
  },
};
</script>

<style></style>
