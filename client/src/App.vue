<template>
  <div id="app">
    <div class="container">
      <Modal :toggleModal="toggleModal" />
      <Header />
      <router-view :toggleModal="toggleModal" :setCurrentContactId="setCurrentContactId" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Modal,
  },
  computed: mapGetters(['getStatusModal']),
  methods: {
    toggleModal() {
      this.$store.dispatch('switchStatusModal', !this.getStatusModal)
    },
    setCurrentContactId(action, id) {
      this.$store.dispatch('setActionsForModal', action)
      this.$store.dispatch('setCurrentContactId', id)
      this.toggleModal()
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  background-image: url('~@/assets/backgrounds-blank.jpg');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
#app > .container {
  margin: 0 auto;
  max-width: 1200px;
  padding-bottom: 50px;
}
</style>
