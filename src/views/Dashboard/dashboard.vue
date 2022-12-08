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
              <p class="tx-13 tx-lg-14 tx-color-02 mg-b-0">Total Customers</p>
              <h1 class="tx-light tx-sans tx-spacing--4 tx-primary mg-b-5">
                {{ total_customer }}
              </h1>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-pink-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Categories</p>
              <h1 class="mg-b-5 tx-sans tx-spacing--2 tx-light tx-pink">
                {{ total_category }}
              </h1>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-teal-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Products</p>
              <h1 class="mg-b-5 tx-sans tx-spacing--2 tx-light tx-teal">
                {{ total_product }}
              </h1>
            </div>
          </div>

          <div class="col-6 mb-3">
            <div class="card card-body pd-10 pd-md-15 bd-0 shadow-none bg-info-light">
              <p class="tx-13 tx-lg-14 tx-color-03 mg-b-0">Total Orders</p>
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
      total_customer: 0,
      total_category: 0,
      total_product: 0,
      total_order: 0,
      filterObj: {},
    };
  },
  methods: {
    getDashboard() {
      this.$api
        .getAPI({
          _action: "dashboard",
          _body: this.filterObj,
        })
        .then((res) => {
          if (res.info) {
            this.total_customer = res.info.total_customer;
            this.total_category = res.info.total_category;
            this.total_product = res.info.total_product;
            this.total_order = res.info.total_order;
          }
        })
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
    this.getDashboard();
  },
};
</script>
