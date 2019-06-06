<template>
  <card class="card-user">
    <img slot="image" src="/img/university-background.jpg" alt="..."/>
    <div class="author">
      <img class="avatar border-gray" :src="avatar" onerror="this.onerror=null; this.src='/img/default-avatar.png'" alt="Avatar"/>

      <h4 class="title">{{ user.full_name }}<br />
        <small>{{ user.email }}</small>
      </h4>
    </div>
    <p class="description text-center">
      <b>Факультет: </b> {{ user.faculty }} <br>
      <b>Роль: </b> {{ user.role }} <br>
    </p>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { server } from "@/utils/helper";

  export default {
    props: ['user'],
    computed: {
      serverUrl: {
        get() {
          return server.baseUrl
        }
      },
      avatar: {
        get() {
          return this.user.photo ? this.serverUrl+this.user.photo : '/img/default-avatar.png'
        }
      }
    },
    components: {
      Card
    }
  }

</script>
<style>

</style>
