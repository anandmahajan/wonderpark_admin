<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row justify-content-center mb-4">
          <div class="col-md-3 text-center">
            <div class="picture mb-3">
              <img
                :src="
                  user.profile_image
                    ? user.profile_image
                    : '/static/img/profile-placeholder.jpg'
                "
                class="image"
                id="img_hoder_1"
              />
              <input
                type="file"
                id="AddPhoto"
                accept="image/*"
                @change="onChange($event)"
              />
            </div>
            <h6 class="text-primary">Choose Picture</h6>
          </div>
        </div>
        <div class="row row-sm">
          <div class="col-sm-6 mb-3">
            <label>{{ $lang.messages.name }}</label>
            <input
              name="name"
              v-model="user.name"
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

          <div class="col-sm-6 mb-3">
            <label>{{ $lang.messages.email }}</label>
            <input
              name="email"
              v-model="user.email"
              v-validate="'required|email'"
              :class="{
                'form-control': true,
                input: true,
                'is-info': errors.has('email'),
              }"
              type="text"
              v-bind:placeholder="$lang.messages.email"
              disabled
            />
            <i v-show="errors.has('email')"></i>
            <span v-show="errors.has('email')" class="help is-info">{{
              $lang.messages.please_enter_email
            }}</span>
          </div>
          <div class="col-sm-6 mb-3">
            <label>{{ $lang.messages.contact }}</label>
            <input
              name="contact"
              id="contact"
              v-model="user.mobile_number"
              v-validate="{ required: true, numeric: true, min: 8, max: 20 }"
              :class="{
                'form-control': true,
                input: true,
                'is-info': errors.has('contact'),
              }"
              type="text"
              v-bind:placeholder="$lang.messages.contact"
            />
            <i v-show="errors.has('contact')"></i>
            <span v-show="errors.has('contact')" class="help is-info">{{
              $lang.messages.please_enter_contact
            }}</span>
          </div>

          <div class="col-12">
            <button
              type="button"
              class="btn btn-brand-01 btn-lg mr-3"
              id="save-btn"
              @click="validateBeforeSubmit()"
            >
              Save
            </button>
            <!-- <button type="button" class="btn btn-outline-secondary">Cancel</button> -->
          </div>
        </div>
        <!-- row -->
      </div>
    </div>
  </div>
  <!-- content-body -->
</template>
<style>
.picture {
  width: 106px;
  height: 106px;
  background-color: #999999;
  border: 4px solid #cccccc;
  color: #ffffff;
  border-radius: 50%;
  margin: 0px auto;
  overflow: hidden;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}
.picture:hover {
  border-color: #2ca8ff;
}
.content.ct-wizard-green .picture:hover {
  border-color: #05ae0e;
}
.content.ct-wizard-blue .picture:hover {
  border-color: #3472f7;
}
.content.ct-wizard-orange .picture:hover {
  border-color: #ff9500;
}
.content.ct-wizard-red .picture:hover {
  border-color: #ff3b30;
}
.picture input[type="file"] {
  cursor: pointer;
  display: block;
  height: 100%;
  left: 0;
  opacity: 0 !important;
  position: absolute;
  top: 0;
  width: 100%;
}

.image {
  width: 100%;
}
</style>
<script>
import router from "../../router";
import EventBus from "../../eventBus";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      user: {},
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
      this.$api
        .putAPI({
          _action: "user/" +this.user.uuid,
          _body: this.user,
          _buttonId: "save-btn",
          _hide_loader: true,
        })
        .then((res) => {
          this.$noty.success("" + res.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });

          this.getMe();
        })
        .catch((e) => {
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
        })
        .then((res) => {
          this.user = res.info;
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
    onChange(e) {
      let files = e.target.files;
      this.file = files[0];
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#img_hoder_1").attr("src", e.target.result);
        };
      }
      reader.readAsDataURL(e.target.files[0]);
      this.uploadFile();
    },
    sendData() {
      var payload = {
        action: "test",
      };
      EventBus.$emit("profile_image", payload);
    },
    uploadFile() {
      this.$api
        .uploadImageAPI({
          _action: "/me/profile/image",
          _key: "image",
          _file: this.file,
        })
        .then((res) => {
          this.sendData();
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
    this.getMe();
    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
