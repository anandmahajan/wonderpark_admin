<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card rounded-5">
              <div class="card-body p-4 p-lg-5">
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.first_name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="first_name"
                      v-model="customer.first_name"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('first_name') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.first_name"
                    />
                    <i v-show="errors.has('first_name')"></i>
                    <span v-show="errors.has('first_name')" class="help is-info">{{
                      $lang.messages.please_enter_first_name
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.last_name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="last_name"
                      v-model="customer.last_name"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('last_name') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.last_name"
                    />
                    <i v-show="errors.has('last_name')"></i>
                    <span v-show="errors.has('last_name')" class="help is-info">{{
                      $lang.messages.please_enter_last_name
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.email }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="email"
                      v-model="customer.email"
                      v-validate="'required|email'"
                      :class="{
                        'form-control': true,
                        input: true,
                        'is-info': errors.has('email'),
                      }"
                      type="text"
                      v-bind:placeholder="$lang.messages.email"
                    />
                    <i v-show="errors.has('email')"></i>
                    <span v-show="errors.has('email')" class="help is-info">{{
                      $lang.messages.please_enter_email
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.contact }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="mobile_number"
                      id="mobile_number"
                      v-model="customer.mobile_number"
                      v-validate="{
                        required: true,
                        numeric: true,
                        min: 8,
                        max: 10,
                      }"
                      :class="{
                        'form-control': true,
                        input: true,
                        'is-info': errors.has('mobile_number'),
                      }"
                      type="text"
                      v-bind:placeholder="$lang.messages.contact"
                    />
                    <i v-show="errors.has('mobile_number')"></i>
                    <span v-show="errors.has('mobile_number')" class="help is-info">{{
                      $lang.messages.please_enter_contact
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label class="mr-3">
                      {{ $lang.messages.date_of_birth }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="customer.date_of_birth"
                      type="date"
                      class="form-control"
                      :class="{
                        input: true,
                        'is-info': errors.has('date_of_birth'),
                      }"
                      name="date_of_birth"
                      v-validate="'required'"
                    />
                    <i v-show="errors.has('date_of_birth')"></i>
                    <span v-show="errors.has('date_of_birth')" class="help is-info"
                      >Please select date of birth</span
                    >
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label class="mr-3">
                      {{ $lang.messages.date_of_anniversary }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="customer.date_of_anniversary"
                      type="date"
                      class="form-control"
                      :class="{
                        input: true,
                        'is-info': errors.has('date_of_anniversary'),
                      }"
                      lang="en"
                      name="date_of_anniversary"
                      v-validate="'required'"
                    />
                    <i v-show="errors.has('date_of_anniversary')"></i>
                    <span v-show="errors.has('date_of_anniversary')" class="help is-info"
                      >Please select date of anniversary</span
                    >
                  </div>
                </div>
                <div class="row form-style" v-if="customer.id">
                  <div class="col-lg-6 mb-3">
                    <label for
                      ><strong> {{ $lang.messages.wallet_balance }}:</strong>
                    </label>
                    <span class="ml-2">{{ customer.wallet_balance }}</span> <br />
                    <label for>
                      <strong>{{ $lang.messages.point_balance }}:</strong>
                    </label>
                    <span class="ml-2">{{
                      customer.point_balance ? customer.point_balance : 0
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3"></div>
                </div>
                <div></div>
              </div>

              <div class="row mt-5 mb-3" v-if="action == 'ADD' || action == 'EDIT'">
                <div class="col-12 text-center">
                  <button
                    type="button"
                    class="btn btn-outline-info mr-lg-3 mr-2 btn-lg"
                    @click="$router.go(-1)"
                  >
                    {{ $lang.messages.cancel }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-info btn-lg"
                    id="save-btn"
                    @click="validateBeforeSubmit()"
                  >
                    {{ $lang.messages.save }}
                  </button>
                </div>
              </div>

              <div class="row mt-5" v-else>
                <div class="col-12 text-right">
                  <button
                    type="button"
                    class="btn btn-outline-info mr-lg-3 mr-2 btn-lg"
                    @click="$router.go(-1)"
                  >
                    {{ $lang.messages.back }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import Multiselect from "vue-multiselect";
// import { customer } from "../../../lang/en/messages";
export default {
  name: "AddCustomer",
  components: { Multiselect },
  data() {
    return {
      action: "",
      customer: {
        name: "",
        email: "",
        wallet_balance: "",
        point_balance: "",
        dial_code: "+91",
        country_code: "IN",
        mobile_number: "",
        date_of_birth: "",
        date_of_anniversary: "",
        login_type: "EMAIL",
      },
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.save();
          return;
        }
      });
    },
    save() {
      if (this.customer.id) {
        this.$api
          .putAPI({
            _action: "customer/update/" + this.customer.id,
            _body: this.customer,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            router.push("/customer");
          })
          .catch((e) => {
            this.$noty.error("" + e.message, {
              timeout: 2000,
              layout: "topCenter",
              theme: "semanticui",
            });
          });
      } else {
        this.$api
          .postAPI({
            _action: "customer/add",
            _body: this.customer,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            router.push("/customer");
          })
          .catch((e) => {
            this.$noty.error("" + e.message, {
              timeout: 2000,
              layout: "topCenter",
              theme: "semanticui",
            });
          });
      }
    },

    getDetail() {
      this.$api
        .getAPI({
          _action: "customer/info/" + this.customer.id,
        })
        .then((res) => {
          this.customer = res;

          this.$validator.reset();
          this.errors.clear();
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
    var tabValue = this.$shareService.getMapValue("action");
    if (tabValue != null && tabValue != "") {
      this.action = tabValue;
      this.$shareService.deleteMapValue("action");
    } else {
      if (this.$route.params.id) {
        router.push("/customer");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.id) {
      this.customer.id = this.$route.params.id;
      this.getDetail();
    }
    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
