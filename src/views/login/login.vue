<template>
  <div class="signin-panel">
    <div class="signin-sidebar">
      <div class="signin-sidebar-body">
        <a href="dashboard-one.html" class="sidebar-logo mg-b-40">
          <img src="/static/img/bizActiv.png" alt="Logo" width="120" />
        </a>
        <h4 class="signin-title">Welcome back!</h4>
        <h5 class="signin-subtitle">Please signin to continue.</h5>

        <div class="signin-form">
          <div class="form-group">
            <label>
              {{ $lang.messages.email }}
              <span class="text-danger">*</span>
            </label>
            <input
              name="email"
              v-on:keyup.enter="validateBeforeSubmit"
              v-model="email"
              v-validate="'required'"
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

          <div class="form-group">
            <!-- <label class="d-flex justify-content-between">
              {{$lang.messages.password}}
              <span class="text-danger">*</span>
               <a href="forgt-password.php" class="tx-13">Forgot password?</a> 
            </label>-->
            <label>
              {{ $lang.messages.password }}
              <span class="text-danger">*</span>
            </label>
            <div class="input-group" id="show_hide_password_2">
              <input
                name="password"
                v-on:keyup.enter="validateBeforeSubmit"
                v-model="password"
                v-validate="'required'"
                :class="{
                  'form-control': true,
                  input: true,
                  'is-info': errors.has('password'),
                }"
                type="password"
                v-bind:placeholder="$lang.messages.password"
                autocomplete="off"
              />
              <div
                class="input-group-addon bg-light border"
                style="
                  border-top-right-radius: 12px;
                  border-bottom-right-radius: 12px;
                "
              >
                <a
                  href="javascript:void(0);"
                  class="align-text-top text-info mt-1"
                >
                  <i
                    class="fa fa-eye-slash"
                    aria-hidden="true"
                    style="vertical-align: sub"
                  ></i>
                </a>
              </div>
            </div>
            <i v-show="errors.has('password')"></i>
            <span v-show="errors.has('password')" class="help is-info">{{
              $lang.messages.please_enter_password
            }}</span>
          </div>

          <div class="form-group d-flex mg-b-0">
            <button
              class="btn btn-brand-01 btn-uppercase flex-fill"
              id="save-btn"
              @click="validateBeforeSubmit"
            >
              Sign In
            </button>
          </div>

          <!-- <p>
            Do not have an Account?
            <a href="page-signup.php" class="tx-13">Sign Up</a>
          </p>-->
        </div>
        <!-- <p class="mg-t-auto mg-b-0 tx-sm tx-color-03">
          By signing in, you agree to our
          <a href>Terms of Use</a> and
          <a href>Privacy Policy</a>
        </p>-->
      </div>
      <!-- signin-sidebar-body -->
    </div>
    <!-- signin-sidebar -->
    <img src="/static/img/login.png" class="img-fluid login-img" width="600" />
  </div>
  <!-- signin-panel -->
</template>
<script>
import router from "../../router";
export default {
  name: "Login",
  mounted() {
    $("#show_hide_password_2 a").on("click", function (event) {
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
  },
  data() {
    return {
      password: "Admin@123",
      email: "admin@sphinx-solution.com",
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.accessToken();
          return;
        }
      });
    },
    accessToken() {
      this.errorMessage = "";
      this.$api
        .getAccesstoken({
          _action: "login",
          _buttonId: "save-btn",
          _body: { email: this.email, password: this.password },
          _hide_loader: true,
        })
        .then((res) => {
          if (res && res.token) {
            localStorage.setItem("access_token", res.token);
            this.getMe();
          }
        })
        .catch((e) => {
          this.errorMessage = e.message;
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },

    getMe() {
      this.$api
        .getAPI({
          _action: "me",
          _buttonId: "save-btn",
          _hide_loader: true,
        })
        .then((res) => {
          localStorage.setItem("admin_id", res.info.id);
          router.push("/profile");
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
};
</script>
