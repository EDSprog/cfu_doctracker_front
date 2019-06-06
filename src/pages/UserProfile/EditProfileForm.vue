<template>
  <card>
    <h4 slot="header" class="card-title">Изменить информацию</h4>
    <form>
      <p v-if="errors.length">
      <div class="errors">
        <span v-for="error in errors">{{ error }}<br/></span>
      </div>
      <div class="row">
        <div class="col-md-5">
          <label class="control-label">Факультет</label>
          <select class="custom-select"
                  v-model="newUser.facultyId">
            <option disabled value="" selected>Факультет</option>
            <option v-for="faculty in faculties" v-bind:value="faculty.id">{{ faculty.title }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Польное имя"
                    placeholder="Иванов И. И."
                    v-model="newUser.full_name">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="newUser.email">
          </base-input>
        </div>
      </div>

      <div class="custom-file">
        <input type="file" id="avatar" ref="avatar" @change="handleFileUpload()"/>
        <label class="custom-file-label" for="avatar">Выберите аватар</label>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                      label="Роль"
                      :disabled="true"
                      placeholder="Роль"
                      v-model="user.role">
          </base-input>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Сохранить изменения
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { server } from '@/utils/helper'
  import axios from 'axios'
  import { mapState } from 'vuex';

  export default {
    components: {
      Card
    },
    props: ['user'],
    data() {
      return {
        newUser: {
          email: this.user.email,
          role: this.user.role,
          full_name: this.user.full_name,
          photo: null,
          facultyId: this.user.facultyId
        },
        errors: []
      }
    },
    methods: {
      checkForm (e) {
        this.errors = [];

        if (!this.newUser.full_name) {
          this.errors.push('Укажите имя.');
        } else if (!this.validName(this.newUser.full_name)) {
          this.errors.push('Укажите имя корректно, например: Иванов И.И.')
        }

        if (!this.newUser.email) {
          this.errors.push('Укажите электронную почту.');
        } else if (!this.validEmail(this.newUser.email)) {
          this.errors.push('Укажите корректный адрес электронной почты.');
        }

        if (!this.errors.length) {
          return true;
        }

        e.preventDefault();
      },

      validEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      validName (name) {
        const re = /[А-Яа-я]+(([. ]{1,1}[А-Я])+([. ]{1,1})){1,2}/;
        return re.test(name);
      },
      handleFileUpload () {
        this.newUser.photo = this.$refs.avatar.files[0];
      },
      async updateProfile (e) {
        if (this.checkForm(e)) {
          try {
            let formData = new FormData();
            Object.keys(this.newUser).forEach(key => {
              formData.append(key, this.newUser[key]);
            });

            await axios.put(`${server.apiUrl}/user`, formData, {headers: {
                'Authorization': `Bearer ${this.$store.state.token}`,
                'Content-Type': 'multipart/form-data'
            }});

            this.$store.dispatch('user/getUserInfo');
            this.$notifications.notify(
              {
                message: `Данные успешно обновлены`,
                icon: 'nc-icon nc-app',
                horizontalAlign: 'bottom',
                verticalAlign: 'left',
                type: 'success'
              })
          } catch (error) {
            this.errors.push(error)
          }
        }
      }
    },
    created() {
      this.$store.dispatch('faculties/getFaculties');
    },
    computed: mapState({
      faculties: state => state.faculties.faculties
    })
  }

</script>
<style>

</style>
