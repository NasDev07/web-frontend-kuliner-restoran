<template>
  <div class="food">
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar <strong>Makanan</strong></h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input v-model="search" type="text" class="form-control" placeholder="search food favorit" aria-label="Username"
              aria-describedby="basic-addon1" @keyup="searchFood">
            <span class="input-group-text" id="basic-addon1"><b-icon-search></b-icon-search></span>
          </div>
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
import Navbar from '../components/Navbar.vue';
import CardProduct from '@/components/CardProduct.vue';
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "food",
  components: {
    Navbar,
    CardProduct
  },
  data() {
    return {
      products: [],
      search: '',
    }
  },
  methods: {
    setProduct(data) {
      this.products = data
    },
    searchFood() {
      axios.get('http://localhost:3000/products?q='+this.search)
      .then((response) =>
        // handle success
        this.setProduct(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Gagal: ", error)
      );
    }
  },
  mounted() {
    axios.get('http://localhost:3000/products')
      .then((response) =>
        // handle success
        this.setProduct(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Gagal: ", error)
      );
  }
}
</script>

<style>

</style>