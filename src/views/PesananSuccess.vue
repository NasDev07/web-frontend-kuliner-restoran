<template>
  <div class="pesanan-success">
    <Navbar />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img  src="../assets/images/breakfast.svg" width="300" alt="menunggu">
          <h2 class="mt-5"><strong>Success!!</strong></h2>
          <h4>Pesanan Anda Segera diproses <br> Selamat Menunggu 😊</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  name: "PesananSuccess",
  components: { Navbar }
}
</script>

<style>

</style>