<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card bg-white rounded-10 p-4">
              <div class="row justify-content-center form-style mt-4">
                <div class="col-md-8">
                  <div class="row justify-content-md-center">
                    <div class="col-12"></div>
                    <div class="col-lg-6 mb-3">
                      <label for>
                        {{$lang.messages.old_password}}
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        name="old_password"
                        v-validate="'required'"
                        v-model="old_password"
                        :class="{'form-control' : true,'input': true, 'is-info': errors.has('old_password') }"
                        type="text"
                        id="old_password"
                        v-bind:placeholder="$lang.messages.old_password"
                      />
                      <i v-show="errors.has('old_password')"></i>
                      <span
                        v-show="errors.has('old_password')"
                        class="help is-info"
                      >{{$lang.messages.please_enter_old_password}}</span>
                    </div>
                    <div class="col-12"></div>
                    <div class="col-lg-6 mb-3">
                      <label for>
                        {{$lang.messages.new_password}}
                        <span class="text-danger">*</span>
                      </label>
                      <div class="input-group" id="show_hide_password">
                        <input
                          name="new_password"
                          v-model="new_password"
                          v-validate="{ required: true, regex:'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' }"
                          :class="{'form-control' : true,'input': true, 'is-info': errors.has('new_password') }"
                          type="password"
                          v-bind:placeholder="$lang.messages.new_password"
                          ref="new_password"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            style="height: 37px;min-width: 50px;"
                          >
                            <i class="fa fa-eye-slash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <i v-show="errors.has('new_password')"></i>
                      <span
                        v-show="errors.has('new_password')"
                        class="help is-info"
                      >{{$lang.messages.please_enter_valid_password}}</span>
                    </div>
                    <div class="col-12"></div>
                    <div class="form-group col-lg-6">
                      <label for>
                        {{$lang.messages.confirm_password}}
                        <span class="text-danger">*</span>
                      </label>
                      <div class="input-group" id="show_hide_password_2">
                        <input
                          name="repeat_Password"
                          v-validate="'required|confirmed:new_password'"
                          v-model="confirm_password"
                          :class="{'form-control' : true,'input': true, 'is-info': errors.has('repeat_Password') }"
                          type="password"
                          id="repeat_password"
                          v-bind:placeholder="$lang.messages.confirm_password"
                          data-vv-as="new_password"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            style="height: 37px;min-width: 50px;"
                          >
                            <i class="fa fa-eye-slash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>

                      <i v-show="errors.has('repeat_Password')"></i>
                      <span
                        v-show="errors.has('repeat_Password')"
                        class="help is-info"
                      >{{$lang.messages.please_enter_confirm_password}}</span>
                    </div>

                    <div class="col-lg-12 mb-3 text-center">
                      <button
                        type="button"
                        class="btn btn-info btn-lg"
                        id="save-btn"
                        @click="validateBeforeSubmit()"
                      >{{$lang.messages.save}}</button>
                    </div>
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
export default {
  name: "RegisterAccount",
  data() {
    return {
      new_password: null,
      old_password: null,
      confirm_password: null
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.changePassword();
          return;
        }
      });
    },

    changePassword() {
      var obj = {
        new_password: this.new_password,
        old_password: this.old_password
      };
      this.$api
        .putAPI({
          _action: "/me/reset",
          _body: obj,
          _buttonId: "save-btn"
        })
        .then(res => {
          this.$noty.success("" + res.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui"
          });
          router.push("/profile");
        })
        .catch(e => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui"
          });
        });
    }
  },
  mounted() {
    $(document).ready(function() {
      $("#show_hide_password button").on("click", function(event) {
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

      $("#show_hide_password_2 button").on("click", function(event) {
        event.preventDefault();
        if ($("#show_hide_password_2 input").attr("type") == "text") {
          $("#show_hide_password_2 input").attr("type", "password");
          $("#show_hide_password_2 i").addClass("fa-eye-slash");
          $("#show_hide_password_2 i").removeClass("fa-eye");
        } else if (
          $("#show_hide_password_2 input").attr("type") == "password"
        ) {
          $("#show_hide_password_2 input").attr("type", "text");
          $("#show_hide_password_2 i").removeClass("fa-eye-slash");
          $("#show_hide_password_2 i").addClass("fa-eye");
        }
      });
    });
  }
};
</script>


