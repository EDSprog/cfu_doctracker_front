<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/dashboard/main">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Аналитика</p>
      </sidebar-link>
      <sidebar-link to="/dashboard/search">
        <i class="nc-icon nc-zoom-split"></i>
        <p>Отслеживание</p>
      </sidebar-link>
      <sidebar-link to="/dashboard/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Профиль</p>
      </sidebar-link>

      <template slot="bottom-links">
        <sidebar-link class="active" to="/dashboard/notifications">
          <i class="nc-icon nc-bell-55"></i>
          <p>Уведомление</p>
        </sidebar-link>
        <mobile-menu slot="content"></mobile-menu>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    created() {
      // if(!this.$store.state.token) {
      //   this.$router.push('/login')
      // }
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
