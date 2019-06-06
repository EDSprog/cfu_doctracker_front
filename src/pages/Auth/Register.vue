<template>
    <div class="container login-container">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 login-form-1">
                <div v-show="!isRegistered">
                    <h4>Регистрация</h4>
                    <form>
                        <p v-if="errors.length">
                        <div class="errors">
                            <span v-for="error in errors">{{ error }}</span>
                        </div>
                        <div class="form-group">
                            <label class="control-label">Факультет</label>
                            <select class="custom-select" v-model="facultyId">
                                <option disabled value="" selected>Факультет</option>
                                <option v-for="faculty in faculties" v-bind:value="faculty.id">{{ faculty.title }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <base-input type="text"
                                        label="Польное имя"
                                        placeholder="Иванов И. И."
                                        v-model="full_name">
                            </base-input>
                        </div>
                        <div class="form-group">
                            <base-input type="email "
                                        label="Email"
                                        placeholder="Email"
                                        v-model="email">
                            </base-input>
                        </div>
                        <div class="form-group" style="text-align: center">
                            <button type="submit" class="btn btn-info btn-fill" style="width: 100%" @click.prevent="register">
                                Зарегистрироваться
                            </button>
                        </div>
                        <div style="text-align: center">
                            <a href="/login">Уже зарегистрированы?</a>
                        </div>
                        <div class="clearfix"></div>
                    </form>
                </div>
                <div v-if="isRegistered">
                    <h4>На указанную почту выслана дальнейшая инструкция для продолжения регистрации!</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { server } from "@/utils/helper";
    import Card from 'src/components/Cards/Card.vue';
    import BaseDropdown from "../../components/BaseDropdown";
    import { mapState } from 'vuex';

    export default {
        name: "Register",
        comments: {
            Card,
            BaseDropdown,
        },
        data() {
            return {
                email: null,
                full_name: null,
                facultyId: null,
                phone: null,
                isRegistered: false,
                errors: []
            }
        },
        created() {
            if(this.$store.token) {
                this.$route.push("/dashboard");
            }
        },
        methods: {
            checkForm (e) {
                this.errors = [];

                if (!this.full_name) {
                    this.errors.push('Укажите имя.');
                } else if (!this.validName(this.full_name)) {
                    this.errors.push('Укажите имя корректно, например: Иванов И.И.')
                }

                if (!this.facultyId) {
                    this.errors.push('Укажите факультет.');
                }

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

            validName (name) {
                const re = /[А-Яа-я]+(([. ]{1,1}[А-Я])+([. ]{1,1})){1,2}/;
                return re.test(name);
            },

            async register(e) {
                if (this.checkForm(e)) {
                    try {
                        const response = await axios.post(`${server.apiUrl}/user/register`, {
                            email: this.email,
                            password: this.password,
                            full_name: this.full_name,
                            facultyId: this.facultyId,
                            phone: this.phone
                        });

                        if (response.status === 200) {
                            this.isRegistered = true;
                        }
                    } catch (error) {
                        this.errors.push(error.message)
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

<style lang="css">
    .login-container {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .login-form-1 {
        padding: 5%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    }
    .login-form-1 h4 {
        text-align: center;
        color: #333;
    }
    .login-container form {
        padding: 10%;
    }
</style>
