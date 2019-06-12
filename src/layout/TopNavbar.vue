<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <form class="navbar-form navbar-left navbar-search-form" style="margin: 0" role="search">
              <div class="input-group">
                <i class="nc-icon nc-zoom-split" style="margin-right: 10px"></i>
                <input type="text" value="" class="form-control" placeholder="Search...">
              </div>
            </form>
          </li>
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-bell-55"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Уведомление 1</a>
            <a class="dropdown-item" href="#">Уведомление 2</a>
            <a class="dropdown-item" href="#">Уведомление 3</a>
            <a class="dropdown-item" href="#">Уведомление 4</a>
          </base-dropdown>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/user">
              Аккаунт
            </router-link>
          </li>
          <li class="nav-item">
            <span v-on:click="logOut" class="nav-link">
              Выйти
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('logOut');
        this.$router.push('/login');
        localStorage.removeItem('token');
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>
  .nav-link {
    cursor: pointer;
  }
</style>
