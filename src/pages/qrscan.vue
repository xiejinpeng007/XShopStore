<template>
  <div id="qrscan">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import store from "@/simplestore.js";

export default {
  name: "qrscan",
  components: {
    QrcodeStream
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onDecode(decodedString) {
      // this.$toast(decodedString);
      console.log(decodedString);
      store.store.saveQrCode(decodedString);
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
