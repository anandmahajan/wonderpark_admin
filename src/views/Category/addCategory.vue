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
                      {{ $lang.messages.title }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="title"
                      v-model="category.title"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('title') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.title"
                      :disabled="action == 'VIEW'"
                    />
                    <i v-show="errors.has('title')"></i>
                    <span v-show="errors.has('title')" class="help is-info">{{
                      $lang.messages.please_enter_title
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.order }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="order"
                      v-model="category.ordering"
                      v-validate="'required|numeric'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('order') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.order"
                      :disabled="action == 'VIEW'"
                    />
                    <i v-show="errors.has('order')"></i>
                    <span v-show="errors.has('order')" class="help is-info">{{
                      $lang.messages.please_enter_valid_order
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-12 mb-3">
                    <label>Icon</label>
                    <div class="row">
                      <div class="col-lg-4 col-md-5 mb-4">
                        <div class="mb-3">
                          <img
                            :src="
                              category.image
                                ? category.image
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
                </div>

                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch9"
                      v-model="category.is_active"
                      :disabled="action == 'VIEW'"
                    />
                    <label class="custom-control-label" for="customSwitch9">{{
                      $lang.messages.status
                    }}</label>
                  </div>
                </div>

                <div class="row mt-5" v-if="action == 'ADD' || action == 'EDIT'">
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
  </div>
</template>
<script>
import router from "../../router";
export default {
  name: "AddCategory",
  components: {},
  data() {
    return {
      action: "",
      category: {
        name: "",
        is_active: true,
      },
      type: "",
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
      if (this.category.is_active) {
        this.category.status = "ACTIVE";
      } else {
        this.category.status = "INACTIVE";
      }

      if (this.category.id) {
        this.$api
          .putAPI({
            _action: "category/" + this.category.id,
            _body: this.category,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.category.id = res.id;
            if (this.file) {
              this.uploadFile(this.file);
            } else {
              router.go(-1);
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
            _action: "category",
            _body: this.category,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.category.id = res.id;
            if (this.file) {
              this.uploadFile(this.file);
            } else {
              router.go(-1);
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
          _action: "category/upload-icon/" + this.category.uuid,
          _key: "icon",
          _file: this.file,
        })
        .then((res) => {
          this.$noty.success("" + "Successfully Uploaded", {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });

          router.go(-1);
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
          _action: "category/" + this.category.uuid,
        })
        .then((res) => {
          this.category = res.info;
          if (this.category.status == "ACTIVE") {
            this.category.is_active = true;
          } else {
            this.category.is_active = false;
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
    var tabValue = this.$shareService.getMapValue("action");
    if (tabValue != null && tabValue != "") {
      this.action = tabValue;
      this.$shareService.deleteMapValue("action");
    } else {
      if (this.$route.params.uuid) {
        router.push("/category");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.uuid) {
      this.category.uuid = this.$route.params.uuid;
      this.getDetail();
    }

    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
