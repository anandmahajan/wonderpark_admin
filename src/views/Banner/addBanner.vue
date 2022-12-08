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
                    <label for> Placement</label>
                    <span class="text-danger">*</span>
                    <select
                      class="custom-select"
                      name="placeholder_pos"
                      v-model="banner.placeholder_pos"
                      v-validate="'required'"
                      placeholder="Banner placeholder_pos"
                      :class="{
                        input: true,
                        'is-info': errors.has('placeholder_pos'),
                      }"
                    >
                      <option value>Select placement</option>
                      <option value="TOP">Top</option>
                      <option value="BOTTOM">Bottom</option>
                    </select>
                    <i v-show="errors.has('placeholder_pos')"></i>
                    <span v-show="errors.has('placeholder_pos')" class="help is-info"
                      >Please select placement</span
                    >
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.url }}
                    </label>
                    <input
                      name="url"
                      v-model="banner.url"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('url') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.url"
                    />
                    <i v-show="errors.has('url')"></i>
                    <span v-show="errors.has('url')" class="help is-info">{{
                      $lang.messages.please_enter_title
                    }}</span>
                  </div>
                </div>

                <div class="col-lg-12 mb-3">
                  <label>Banner</label>
                  <div class="row">
                    <div class="col-lg-4 col-md-5 mb-4">
                      <div class="mb-3">
                        <img
                          :src="
                            banner.image
                              ? banner.image
                              : '/static/img/upload-placeholder.jpg'
                          "
                          id="img_hoder_1"
                          width="300"
                          height="150"
                          @click="openImages()"
                        />
                      </div>

                      <input
                        type="file"
                        class="btn upload-img"
                        id="AddPhoto"
                        accept="logo/*"
                        @change="onChange($event)"
                        hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-6 mb-3">
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch9"
                      v-model="banner.active"
                    />
                    <label class="custom-control-label" for="customSwitch9"
                      >Status</label
                    >
                  </div>
                </div> -->
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  name: "AddBanner",
  components: { DatePicker },
  data() {
    return {
      action: "",
      banner: {
        placeholder_pos: "",
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
      if (this.banner.id) {
        this.$api
          .putAPI({
            _action: "banner/" + this.banner.id,
            _body: this.banner,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.banner.id = res.info.id;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/banner");
            }
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
            _action: "banner",
            _body: this.banner,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.banner.id = res.info.id;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/banner");
            }
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

    openImages() {
      document.getElementById("AddPhoto").click();
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
    },

    uploadFile() {
      this.$api
        .uploadImageAPI({
          _action: "/banner/" + this.banner.id,
          _key: "image",
          _file: this.file,
          _body: this.banner,
        })
        .then((res) => {
          this.$noty.success("" + "Successfully Uploaded", {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          router.push("/banner");
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
          _action: "/banners/" + this.banner.id,
        })
        .then((res) => {
          this.banner = res;
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
        router.push("/banner");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.id) {
      this.banner.id = this.$route.params.id;
      this.getDetail();
    }

    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
