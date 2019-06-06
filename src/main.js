import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import LightBootstrap from './light-bootstrap-main'
import VueMoment from 'vue-moment'
import moment from 'moment'
import router from './routes/routes'
require('moment/locale/ru');
import Vuetify from 'vuetify'

Vue.use(Vuetify);
Vue.use(VueMoment, { moment });
// router setup
import routes from './routes/routes'

import './registerServiceWorker'
// plugin setup
Vue.use(VueMoment);
Vue.use(LightBootstrap);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
