<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row mb-3">
          <div class="col-md-6">
            <date-range-picker
              ref="picker"
              v-model="date"
              style
              class="w-xs-100"
              format="YYYY-DD-MM"
              @update="getDashboard()"
            ></date-range-picker>
          </div>
        </div>

        <div class="row row-xs">
          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-primary-light">
              <p class="tx-13 tx-lg-14 tx-color-02 mg-b-0">Total Consumer</p>
              <h1 class="tx-light tx-sans tx-spacing--4 tx-primary mg-b-5">
                {{ total_consumer }}
              </h1>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-pink-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Category</p>
              <h1 class="mg-b-5 tx-sans tx-spacing--2 tx-light tx-pink">
                {{ total_category }}
              </h1>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-teal-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Product</p>
              <h1 class="mg-b-5 tx-sans tx-spacing--2 tx-light tx-teal">
                {{ total_product }}
              </h1>
            </div>
          </div>

          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-info-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Order</p>
              <h1 class="mg-b-5 tx-sans tx-spacing--2 tx-light tx-indigo">
                {{ total_order }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import moment from "moment";
export default {
  name: "Dashboard",
  components: {
    DateRangePicker,
  },
  data() {
    return {
      item: {},
      total_consumer: 0,
      total_category: 0,
      total_product: 0,
      total_order: 0,

      date: {
        startDate: "",
        endDate: "",
      },
      filterObj: {},
    };
  },
  methods: {
    gotoPage(type) {
      if (type == "VERIFIED_BUSINESS") {
        this.$shareService.setMapValue("business_is_verified", "1");
        router.push("/business");
      } else if (type == "AWAITING_VERIFCATION") {
        this.$shareService.setMapValue("business_is_verified", "0");
        router.push("/business");
      } else if (type == "EXPIRED_SUBS") {
        this.$shareService.setMapValue("user_subscription_status", "EXPIRED");
        router.push("/user_subscription");
      }
    },
    getDashboard() {
      this.filterObj.to_date = moment(String(this.date.endDate)).format("Y-MM-DD");

      this.filterObj.from_date = moment(String(this.date.startDate)).format("Y-MM-DD");
      this.$api
        .getAPI({
          _action: "/dashboard",
          _body: this.filterObj,
        })
        .then((res) => {})
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
  },
  mounted() {
    var currentDate = new Date();
    this.date.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), -6);
    this.date.endDate = currentDate;
    // this.getDashboard();
  },
};
</script>
