<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card rounded-5">
              <div class="card-body p-4 p-lg-5 justify-content-center">
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="name"
                      v-model="admin.name"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('name') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.name"
                    />
                    <i v-show="errors.has('name')"></i>
                    <span v-show="errors.has('name')" class="help is-info">{{
                      $lang.messages.please_enter_name
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
                      v-model="admin.email"
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
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.contact }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="mobile_number"
                      id="mobile_number"
                      v-model="admin.mobile_number"
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

                <div class="row form-style" v-if="!admin.uuid">
                  <div class="col-lg-6 mb-3">
                    <label for>{{ $lang.messages.password }}</label>
                    <div class="input-group" id="show_hide_password">
                      <input
                        name="password"
                        v-model="admin.password"
                        v-validate="{
                          required: true,
                          regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                        }"
                        :class="{
                          'form-control': true,
                          input: true,
                          'is-info': errors.has('password'),
                        }"
                        type="password"
                        v-bind:placeholder="$lang.messages.password"
                        ref="password"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          style="height: 37px; min-width: 50px"
                        >
                          <i class="fa fa-eye-slash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <i v-show="errors.has('password')"></i>
                    <span v-show="errors.has('password')" class="help is-info">{{
                      $lang.messages.please_enter_valid_password
                    }}</span>
                  </div>
                </div>
                <div class="row form-style" v-if="!admin.uuid">
                  <div class="form-group col-lg-6">
                    <label for>{{ $lang.messages.confirm_password }}</label>
                    <div class="input-group" id="show_hide_password_2">
                      <input
                        name="repeat_Password"
                        v-validate="'required|confirmed:password'"
                        v-model="confirm_password"
                        :class="{
                          'form-control': true,
                          input: true,
                          'is-info': errors.has('repeat_Password'),
                        }"
                        type="password"
                        id="repeat_password"
                        v-bind:placeholder="$lang.messages.confirm_password"
                        data-vv-as="password"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          style="height: 37px; min-width: 50px"
                        >
                          <i class="fa fa-eye-slash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>

                    <i v-show="errors.has('repeat_Password')"></i>
                    <span v-show="errors.has('repeat_Password')" class="help is-info">{{
                      $lang.messages.please_enter_confirm_password
                    }}</span>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch1"
                      v-model="admin.is_active"
                    />
                    <label class="custom-control-label" for="customSwitch1">Status</label>
                  </div>
                </div>
                <div class="row mt-5">
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
                      class="btn btn-brand-01 btn-lg mr-3"
                      id="save-btn"
                      @click="validateBeforeSubmit()"
                    >
                      {{ $lang.messages.save }}
                    </button>
                  </div>
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
import { admin } from "../../../lang/en/messages";
export default {
  name: "AddAdmin",
  components: { Multiselect },
  data() {
    return {
      admin: {
        name: "",
        email: "",
        dial_code: "+91",
        country_code: "IN",
        mobile_number: "",
        password: "",
      },
      confirm_password: "",
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
      if (this.admin.is_active) {
        this.admin.status = "ACTIVE";
      } else {
        this.admin.status = "INACTIVE";
      }

      if (this.admin.uuid) {
        this.$api
          .putAPI({
            _action: "user/" + this.admin.uuid,
            _body: this.admin,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            router.push("/admin");
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
            _action: "user",
            _body: this.admin,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            router.push("/admin");
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

    validateBeforeSubmitPassword() {
      this.$validator.validateAll("modifier-form").then((result) => {
        if (result) {
          this.changePassdowrd();
          return;
        }
      });
    },
    changePassdowrd() {
      this.$api
        .postAPI({
          _action: "/admins/" + this.admin.id + "/change_password",
          _body: this.user,
          _buttonId: "passowrd-btn",
          _hide_loader: true,
        })
        .then((res) => {
          this.$noty.success("" + res.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          document.getElementById("cancel-btn").click();
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
    getDetail() {
      this.$api
        .getAPI({
          _action: "/user/" + this.admin.uuid,
        })
        .then((res) => {
          this.admin = res.info;

          if (this.admin.status == "ACTIVE") {
            this.admin.is_active = true;
          } else {
            this.admin.is_active = false;
          }
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
    $(document).ready(function () {
      $("#show_hide_password button").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password input").attr("type") == "text") {
          $("#show_hide_password input").attr("type", "password");
          $("#show_hide_password i").addClass("fa-eye-slash");
          $("#show_hide_password i").removeClass("fa-eye");
        } else if ($("#show_hide_password input").attr("type") == "password") {
          $("#show_hide_password input").attr("type", "text");
          $("#show_hide_password i").removeClass("fa-eye-slash");
          $("#show_hide_password i").addClass("fa-eye");
        }
      });

      $("#show_hide_password_2 button").on("click", function (event) {
        event.preventDefault();
        if ($("#show_hide_password_2 input").attr("type") == "text") {
          $("#show_hide_password_2 input").attr("type", "password");
          $("#show_hide_password_2 i").addClass("fa-eye-slash");
          $("#show_hide_password_2 i").removeClass("fa-eye");
        } else if ($("#show_hide_password_2 input").attr("type") == "password") {
          $("#show_hide_password_2 input").attr("type", "text");
          $("#show_hide_password_2 i").removeClass("fa-eye-slash");
          $("#show_hide_password_2 i").addClass("fa-eye");
        }
      });
    });

    var tabValue = this.$shareService.getMapValue("action");
    if (tabValue != null && tabValue != "") {
      this.action = tabValue;
      this.$shareService.deleteMapValue("action");
    } else {
      if (this.$route.params.id) {
        router.push("/admin");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.uuid) {
      this.admin.uuid = this.$route.params.uuid;
      this.getDetail();
    }
    setTimeout(() => {
      this.admin.mobile_number = "";
      this.admin.password = "";
      this.$validator.reset();
      this.errors.clear();
    }, 500);
  },
};
</script>
