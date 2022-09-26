<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Hero />
      <div class="row mt-4">
        <div class="col">
          <h2>Best <strong>Foods</strong></h2>
        </div>
        <div class="col">
          <router-link to="/food" class="btn btn-success shadow float-right">
            <b-icon-eye></b-icon-eye> Daftar Menu
          </router-link>
        </div>
      </div>

      <div class="row bm-3">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';
import CardProduct from '@/components/CardProduct.vue';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Hero,
    CardProduct
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    setProduct(data) {
      this.products = data
    }
  },
  mounted() {
    axios.get('http://localhost:3000/best-products')
      .then((response) =>
        // handle success
        this.setProduct(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Gagal: ", error)
      );
  }
};
</script>
