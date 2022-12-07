import Vue from 'vue'
import router from './router'
import App from './App.vue'
import api from './service/Webservice'
import VeeValidate from 'vee-validate'
import shareService from './service/ShareService'
window.$ = window.jQuery = require('jquery');
import VueNumeric from 'vue-numeric'
//import '../public/js/sorting.js'
import VCalendar from 'v-calendar'
import VueBreadcrumbs from 'vue-breadcrumbs'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import moment from "moment";
import 'vuejs-noty/dist/vuejs-noty.css' 
import VueNoty from 'vuejs-noty'

Vue.$api = api
Vue.$shareService = shareService

Object.defineProperty(Vue.prototype, '$api', {
  get() {
    return api
  }
})

Vue.config.productionTip = false
Vue.use(VeeValidate, {
  classes: true
})

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Object.defineProperty(Vue.prototype, '$shareService', {
  get() {
    return shareService
  }
})

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)
Vue.use(VueNumeric)
Vue.use(VueBreadcrumbs)

Vue.use(VueNoty)
var Lang = require('vuejs-localization');
//Notice that you need to specify the lang folder, in this case './lang'
Lang.requireAll(require.context('../lang', true, /\.js$/));

Vue.use(Lang);

Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


Vue.filter('titleCase', function (value) {
  if (!value) {
    return '';
  } else {
    var str = ""
    var arr = value.split("_");
    for (var i = 0; i < arr.length; i++) {
      if (i == 0) {
        str = arr[i].charAt(0).toUpperCase() + arr[i].substring(1).toLowerCase();
      } else {
        str = " " + arr[i].charAt(0).toUpperCase() + arr[i].substring(1).toLowerCase();
      }
    }
    return str;
  }

});

Vue.filter('formatDate', function (value) {
  if (value) {
    var testDateUtc = moment.utc(value);
    var localDate = moment(testDateUtc).local();

    return localDate.format('DD MMM YYYY & hh:mm A')
  }
});

Vue.filter('dateFilter', function (value) {
  if (value) {
    var testDateUtc = moment.utc(value);
    var localDate = moment(testDateUtc).local();

    var dif = Math.floor(((Date.now() - localDate) / 1000) / 86400);

    if (dif < 30) {
      var date = new Date(localDate),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        daydiff = Math.floor(diff / 86400);

      if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31)
        return '';

      return daydiff == 0 && (
        diff < 60 && "Just now" ||
        diff < 120 && "1 minute ago" ||
        diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
        daydiff == 1 && "Yesterday" ||
        daydiff < 7 && daydiff + " days ago" ||
        daydiff < 31 && Math.ceil(daydiff / 7) + " weeks ago";
    } else {
      var datePipe = new DatePipe("en-US");
      value = datePipe.transform(value, 'MMM-dd-yyyy');
      return value;
    }

    return localDate.format('DD MMM YYYY | hh:mm A')
  }
});
