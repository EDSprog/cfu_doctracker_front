<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app id="inspire">
        <v-form>
            <v-container fluid grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <v-text-field
                                solo
                                v-model="code"
                                label="Введите код документа"
                                append-icon="search"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn
                            @click="extended = !extended"
                            depressed
                            large
                        >Расширенный поиск</v-btn>
                    </v-flex>
                    <v-flex xs12 sm3 d-flex>
                        <v-select
                                v-show="extended"
                                :items="faculties"
                                item-text="title"
                                item-value="id"
                                v-model="facultyId"
                                label="Выбериет факультет"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 d-flex>
                        <v-select
                                v-show="extended"
                                :items="developers"
                                item-text="full_name"
                                item-value="id"
                                v-model="developerId"
                                label="Выберите разработчика"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-data-table
                :headers="headers"
                :items="documents"
                hide-actions
                :loading="loading"
                class="elevation-1"
                :search="code"
        >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
                <td>{{ props.item.code }}</td>
                <td class="text-xs-center">{{ props.item.title }}</td>
                <td class="text-xs-center">{{ props.item.program ? props.item.program.subsidiary.title : '' }}</td>
                <td class="text-xs-center">{{ props.item.program ? props.item.program.title : '' }}</td>
                <td class="text-xs-center">{{
                     props.item.users.map(function(developer){
                        return developer.full_name
                     }).join("\n")
                }}</td>
                <td class="text-xs-center">{{ props.item.status.title }}</td>
                <td class="text-xs-center"><a :href=props.item.url ><i class="nc-icon nc-paper-2"></i></a></td>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
    import Card from 'src/components/Cards/Card.vue'
    import { server } from '@/utils/helper'
    import { mapState } from 'vuex';

    export default {
        components: {
            Card
        },
        data() {
            return {
                code: '',
                loading: false,
                extended: false,
                facultyId: 0,
                developerId: 0,
                headers: [
                    {
                        text: 'Код документа',
                        align: 'left',
                        sortable: false,
                        value: 'code'
                    },
                    { text: 'Название', align: 'center', value: 'title', sortable: false},
                    { text: 'Направление подготовки', align: 'center', value: 'program.subsidiary.title', sortable: false},
                    { text: 'ОПОП', align: 'center', value: 'program.title', sortable: false },
                    { text: 'Разработчики', align: 'center', value: 'user.name', sortable: false },
                    { text: 'Статус', align: 'center', value: 'status', sortable: false },
                    { text: 'Файл', align: 'center', value: 'url', sortable: false }
                ],
            }
        },
        methods: {},
        watch: {
            facultyId: {
                handler() {
                    const searchParams = {
                        code: this.code,
                        facultyId: this.facultyId,
                        developerId: this.developerId
                    };

                    this.$store.dispatch('search/getDevelopers', {facultyId: this.facultyId});
                    this.$store.dispatch('search/getDocuments', searchParams)
                }
            },
            code: {
                handler() {
                    const searchParams = {
                        code: this.code,
                        facultyId: this.facultyId,
                        developerId: this.developerId
                    };

                    this.$store.dispatch('search/getDocuments', searchParams)
                }
            },
            developerId: {
                handler() {
                    const searchParams = {
                        code: this.code,
                        facultyId: this.facultyId,
                        developerId: this.developerId
                    };

                    this.$store.dispatch('search/getDocuments', searchParams)
                }
            }
        },
        created() {
            this.$store.dispatch('faculties/getFaculties');
            this.$store.dispatch('search/getDevelopers', {facultyId: this.facultyId});
        },
        computed: mapState({
            documents: state => state.search.documents,
            faculties: state => state.faculties.faculties,
            developers: state => state.search.developers,
        })
    }

</script>
<style>

</style>
