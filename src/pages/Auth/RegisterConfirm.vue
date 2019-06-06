<template>
    <div class="container login-container">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 login-form-1">
                <div v-show="!success">
                    <h4>Подтверждение регистрации</h4>
                    <form>
                        <p v-if="errors.length">
                            <b>Пожалуйста исправьте указанные ошибки:</b>
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        <div class="form-group">
                            <base-input type="password"
                                        label="Пароль"
                                        placeholder="Пароль"
                                        v-model="password">
                            </base-input>
                        </div>
                        <div class="form-group">
                            <base-input type="password"
                                        label="Повторите пароль"
                                        placeholder="Повторите пароль"
                                        v-model="confirm_password">
                            </base-input>
                        </div>
                        <div class="form-group" style="text-align: center">
                            <button type="submit" class="btn btn-info btn-fill" style="width: 100%" @click.prevent="verify">
                                Подтвердить
                            </button>
                        </div>
                        <div class="clearfix"></div>
                    </form>
                </div>
                <div v-show="success">
                    <h4>Регистрация прошла успешно!</h4><br/>
                    <div style="text-align: center"><router-link :to="{path:'/login'}">Войти</router-link></div>
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

    export default {
        name: "RegisterConfirm",
        comments: {
            Card,
            BaseDropdown
        },
        data() {
            return {
                hash: this.$route.params.hash,
                password: null,
                confirm_password: null,
                success: false,
                errors: []
            }
        },
        methods: {
            async verify() {
                if (this.password === this.confirm_password) {
                    try {
                        const response = await axios.post(`${server.apiUrl}/user/register/verify`, {
                            hash: this.hash,
                            password: this.password
                        });

                        if (response.status === 200) {
                            this.success = true
                        }
                    } catch (error) {
                        this.errors.push(error.message)
                    }
                } else {
                    this.errors = [];
                    this.errors.push('Пароли должны совпадать.');
                }
            }
        }
    }
</script>

<style scoped>

</style>
