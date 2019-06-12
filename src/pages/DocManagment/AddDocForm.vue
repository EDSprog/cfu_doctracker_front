<template>
    <card>
        <h4 slot="header" class="card-title">Добавить документ</h4>
        <form>
            <p v-if="errors.length">
            <div class="errors">
                <span v-for="error in errors">{{ error }}<br/></span>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <base-input type="text"
                                label="Название"
                                placeholder="Введите название"
                                v-model="newDocument.title">
                    </base-input>
                </div>
                <div class="col-md-3">
                    <base-input type="text"
                                label="URL"
                                placeholder="Введите url"
                                v-model="newDocument.url">
                    </base-input>
                </div>
                <div class="col-md-4">
                    <base-input type="email"
                                label="Код документа"
                                placeholder="Введите код документа"
                                v-model="newDocument.code">
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
    export default {
        name: "AddDocForm",
        data() {
            return {
                newDocument: {
                    title: '',
                    url: '',
                    code: '',
                    users: [],
                    programId: null,
                    newProgram: {
                        title: '',
                        code: '',
                        facultyId: null
                    }
                },
                errors: []
            }
        },
    }
</script>

<style scoped>

</style>
