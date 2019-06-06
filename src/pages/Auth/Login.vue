<template>
    <div class="container login-container">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 login-form-1">
                <h4>Вход</h4>
                <form>
                    <p v-if="errors.length">
                        <div class="errors">
                            <span v-for="error in errors">{{ error }}</span>
                        </div>
                    <div class="form-group">
                        <base-input type="email "
                                    label="Email"
                                    placeholder="Email"
                                    v-model="email">
                        </base-input>
                    </div>
                    <div class="form-group">
                        <base-input type="password"
                                    label="Пароль"
                                    placeholder="Пароль"
                                    v-model="password">
                        </base-input>
                    </div>
                    <div class="form-group" style="text-align: center">
                        <button type="submit" class="btn btn-info btn-fill" style="width: 100%;" @click.prevent="login">
                             Войти
                        </button>
                    </div>
                    <div style="text-align: center">
                        <a href="/register">Еще не зарегистрированы?</a>
                    </div>
                    <div class="clearfix"></div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { server } from "@/utils/helper";

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                errors: []
            }
        },
        created() {
          if(this.$store.state.token) {
              this.$router.push("/dashboard");
          }
        },
        methods: {
            checkForm (e) {
                this.errors = [];

                if (!this.email) {
                    this.errors.push('Укажите электронную почту.');
                } else if (!this.validEmail(this.email)) {
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

            async login(e) {
                if (this.checkForm(e)) {
                    try {
                        const response = await axios.post(`${server.apiUrl}/user/login`, {
                            email: this.email,
                            password: this.password,
                        });

                        this.$store.dispatch('setBasics', response.data);
                        localStorage.setItem('token', response.data.token);
                        this.$store.dispatch('user/getUserInfo');
                        this.$router.push('/dashboard');
                    } catch (error) {
                        this.errors.push(error.message)
                    }
                }
            }
        }
    }
</script>

<style>
    .errors {
        color: red;
        text-align: center;
    }
</style>
