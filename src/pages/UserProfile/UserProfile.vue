<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <edit-profile-form
            :user="userInfo"
          >
          </edit-profile-form>
        </div>
        <div class="col-md-4">
          <user-card
            :user="userInfo"
          ></user-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './EditProfileForm.vue'
  import UserCard from './UserCard.vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    computed: mapState({
        userInfo: state => state.user
    }),
  }

</script>
<style>

</style>
