<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <p>Rimba</p>

        <v-btn v-for="link in routes" :key="link.nameb" text>
          {{ link.name }}
        </v-btn>

        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col v-for="Product in Products" :key="Product.id">
            <Product :product="Product" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Product from "../components/Product.vue";
export default {
  name: "Home",
  data() {
    return {
      routes: [
        {
          name: "Home",
        },
      ],
    };
  },
  async mounted() {
    await this.GetProduct();
  },
  components: {
    Product,
  },
  computed: {
    Products() {
      return this.$store.getters.getProducts
    }
  },
  methods: {
    async GetProduct() {
      try {
        const response = await fetch("http://localhost:5050/api", {
          method: "GET",
        });
        const { ok, product } = await response.json();
        if (ok) this.$store.commit("addProduct", product);
      } catch ({ error: { message } }) {
        alert(message);
      }
    },
  },
};
</script>
