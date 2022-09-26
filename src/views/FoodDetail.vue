<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!-- Background -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/food" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="#" class="breadcrumb-item active" aria-colcount="page">Food Order</router-link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <img :src="'../assets/images/'+product.gambar" class="img-fluid shadow" alt="">
        </div>
        <div class="col-md-6">
          <h2><strong>{{ product.nama }}</strong></h2>
          <hr>
          <h4>Harga : <strong>Rp. {{ product.harga }}</strong></h4>

          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <table for="jumlah_pesanan">Jumlah Pesanan</table>
              <input type="number" id="jumlah_pesanan" name="jumlah_pesanan" class="form-control"
                v-model="pesan.jumlah_pesanan">
            </div>

            <div class="form-group">
              <table for="keterangan">Keterangan</table>
              <textarea name="keterangan" id="keterangan" cols="10" rows="3" class="form-control"
                placeholder="Keterangan : Pedas, Nasi Goreng..." v-model="pesan.keterangan"></textarea>
            </div>
            <button type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name: "FoodDetail",
  components: { Navbar },
  data() {
    return {
      product: {},
      pesan: {}
    }
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.pesan.jumlah_pesanan) {
        this.pesan.products = this.product;
        axios
          .post("http://localhost:3000/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({ path: "/keranjang" })
            this.$toast.success("Success Add Card.", {
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Masukkan Pesanan Anda", {
          type: 'error',
          position: 'top-right',
          duration: 3000,
          dismissible: true
        });
      }
    }
  },
  mounted() {
    axios.get("http://localhost:3000/products/" + this.$route.params.id)
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

<style>

</style>