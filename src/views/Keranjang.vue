<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs" />
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
                <router-link to="#" class="breadcrumb-item active" aria-colcount="page">Keranjang</router-link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                  <th scope="row">{{ index+1 }}</th>
                  <td>
                    <img :src="'../assets/images/'+keranjang.products.gambar" class="img-fluid shadow" width="150"
                      alt="">
                  </td>
                  <td><strong>{{ keranjang.products.nama }}</strong></td>
                  <td>{{ keranjang.keterangan ? keranjang.keterangan : "-" }}</td>
                  <td>{{ keranjang.jumlah_pesanan }}</td>
                  <td align="left">Rp. {{ keranjang.products.harga }}</td>
                  <td align="left"><strong>Rp. {{ keranjang.products.harga*keranjang.jumlah_pesanan }}</strong></td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash>
                  </td>
                </tr>

                <!-- Total -->
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga : </strong>
                  </td>
                  <td colspan="2" align="left"><strong>Rp. {{ totalHarga }}</strong></td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- from checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <table for="nama">Nama : </table>
              <input type="text" id="nama" name="nama" class="form-control" v-model="pesan.nama">
            </div>

            <div class="form-group">
              <table for="noMeja">Nomor Meja : </table>
              <input type="text" id="noMeja" name="noMeja" class="form-control" v-model="pesan.noMeja">
            </div>

            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart> Checkout
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Keranjang",
  components: { Navbar },
  data() {
    return {
      keranjangs: [],
      pesan: {}
    }
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios.delete("http://localhost:3000/keranjangs/" + id)
        .then(() => {
          this.$toast.error("Success Delete Pesanan", {
            type: 'error',
            position: 'top-right',
            duration: 3000,
            dismissible: true
          });
          // Update data keranjang
          axios.get("http://localhost:3000/keranjangs")
            .then((response) =>
              // handle success
              this.setKeranjangs(response.data)
            )
            .catch((error) =>
              // handle error
              console.log("Gagal: ", error)
            );
        })
        .catch((error) =>
          // handle error
          console.log("Gagal: ", error)
        );
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then(() => {
            // Hapus semua keranjang
            this.keranjangs.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id)
                .catch((error) => console.log(error));
            });

            this.$router.push({ path: "/pesanan-success" })
            this.$toast.success("Pesanan Anda Success.", {
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Masukkan Nomor Meja Pesanan Anda", {
          type: 'error',
          position: 'top-right',
          duration: 3000,
          dismissible: true
        });
      }
    }
  },
  mounted() {
    axios.get("http://localhost:3000/keranjangs")
      .then((response) =>
        // handle success
        this.setKeranjangs(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Gagal: ", error)
      );
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + (data.products.harga * data.jumlah_pesanan)
      }, 0)
    }
  }
};
</script>

<style>

</style>