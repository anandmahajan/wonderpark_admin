<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card rounded-5">
              <div class="card-body p-4 p-lg-5">
                <div class="row form-style">
                  <div class="col-lg-12 mb-3">
                    <div class="row">
                      <div class="col-lg-4 col-md-5 mb-2 mx-auto">
                        <!-- <label>voucher Image</label> -->
                        <div class="mb-3">
                          <img
                            :src="
                              voucher.image
                                ? voucher.image
                                : '/static/img/upload-placeholder.jpg'
                            "
                            id="img_hoder_1"
                            width="280"
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
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.voucher_title }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="title"
                      v-model="voucher.title"
                      v-validate="'required|max:250'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('title') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.voucher_title"
                    />
                    <i v-show="errors.has('title')"></i>
                    <span v-show="errors.has('title')" class="help is-info">{{
                      $lang.messages.please_enter_voucher_title
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.voucher_name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="buy_points"
                      v-model="voucher.buy_points"
                      v-validate="'required|numeric'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('buy_points') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.voucher_name"
                    />
                    <i v-show="errors.has('buy_points')"></i>
                    <span v-show="errors.has('buy_points')" class="help is-info">{{
                      $lang.messages.please_enter_buy_points
                    }}</span>
                  </div>
                </div>

                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label>Discount Type </label>
                    <div class="">
                      <input
                        type="radio"
                        name="discount_type"
                        style="width: 50px; height: 14px !important"
                        value="PERCENTAGE"
                        id="option1"
                        v-model="voucher.discount_type"
                      />
                      <span>PERCENTAGE</span>
                      <input
                        style="width: 50px; height: 14px !important"
                        type="radio"
                        name="discount_type"
                        value="FIXED"
                        id="option2"
                        v-model="voucher.discount_type"
                      />
                      <span>FIXED</span>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.discount_amount }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="discount"
                      v-model="voucher.discount"
                      v-validate="'required|decimal'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('discount') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.discount_amount"
                    />
                    <i v-show="errors.has('discount')"></i>
                    <span v-show="errors.has('discount')" class="help is-info">{{
                      $lang.messages.please_enter_valid_discount_amount
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-12 mb-3">
                    <label for>
                      {{ $lang.messages.description }}
                    </label>
                    <textarea
                      name="description"
                      v-model="voucher.description"
                      rows="4"
                      cols="50"
                      class="form-control"
                      type="text"
                      v-bind:placeholder="$lang.messages.description"
                    ></textarea>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label>{{ $lang.messages.voucher_type }}</label>
                    <div class="">
                      <input
                        type="radio"
                        name="type"
                        style="width: 50px; height: 14px !important"
                        value="CATEGORY"
                        id="type2"
                        v-model="voucher.type"
                      />
                      <span>Product</span>
                      <input
                        style="width: 50px; height: 14px !important"
                        type="radio"
                        name="type"
                        value="VISIT"
                        id="type1"
                        v-model="voucher.type"
                      />
                      <span>VISIT</span>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-3" v-if="voucher.type == 'CATEGORY'">
                    <label for> Category</label>
                    <span class="text-danger">*</span>
                    <multiselect
                      class="mr-2"
                      v-model="category_id"
                      :options="cat_select_box"
                      :placeholder="$lang.messages.select_category"
                      label="title"
                      track-by="id"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :multiple="true"
                      name="category_id"
                      id="category_id"
                      v-validate="'required'"
                    ></multiselect>

                    <i v-show="errors.has('category_id')"></i>
                    <span v-show="errors.has('category_id')" class="help is-info"
                      >Please select category</span
                    >
                  </div>
                </div>

                <div class="row form-style">
                  <div class="col-lg-4 mb-3">
                    <label class="mr-3">
                      Start Date
                      <span class="text-danger">*</span>
                    </label>
                    <date-picker
                      v-model="voucher.valid_from"
                      format="DD-MM-YYYY"
                      :class="{
                        input: true,
                        'is-info': errors.has('valid_from'),
                      }"
                      lang="en"
                      name="valid_from"
                      v-validate="'required'"
                      :disabled-date="notBeforeDate"
                      placeholder="Start Date"
                      @change="checkEndate()"
                    ></date-picker>
                    <i v-show="errors.has('valid_from')"></i><br />
                    <span v-show="errors.has('valid_from')" class="help is-info"
                      >Please select start date</span
                    >
                  </div>
                  <div class="col-lg-4 mb-3">
                    <label class="mr-3">
                      End Date
                      <span class="text-danger">*</span>
                    </label>
                    <date-picker
                      v-model="voucher.valid_to"
                      format="DD-MM-YYYY"
                      :class="{
                        input: true,
                        'is-info': errors.has('valid_to'),
                      }"
                      lang="en"
                      name="valid_to"
                      v-validate="'required'"
                      :disabled-date="notBeforeStartDate"
                      placeholder="End Date"
                      :disabled="!voucher.valid_from"
                    ></date-picker>
                    <i v-show="errors.has('valid_to')"></i><br />
                    <span v-show="errors.has('valid_to')" class="help is-info"
                      >Please select end date</span
                    >
                  </div>
                  <div class="col-lg-3 mb-3">
                    <label for>
                      {{ $lang.messages.validity }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="validity"
                      v-model="voucher.validity"
                      v-validate="'required|numeric'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('validity') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.validity"
                    />
                    <i v-show="errors.has('validity')"></i>
                    <span v-show="errors.has('validity')" class="help is-info">{{
                      $lang.messages.please_enter_valid_validity
                    }}</span>
                  </div>
                </div>
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
import Multiselect from "vue-multiselect";
import moment from "moment";
export default {
  name: "AddVoucher",
  components: { DatePicker, Multiselect },
  data() {
    return {
      action: "",
      cat_select_box: [],
      voucher: {
        title: "",
        buy_points: "",
        description: "",
        discount_type: "PERCENTAGE",
        type: "CATEGORY",
        category_id: "",
        validity: "",
        image: "",
        valid_from: "",
        valid_to: "",
      },
    };
  },
  methods: {
    notBeforeDate(date) {
      var current_date = new Date();
      return date < current_date.setDate(current_date.getDate() - 1);
    },

    notBeforeStartDate(date) {
      var current_date = new Date();
      var range =
        date < this.voucher.valid_from.setDate(this.voucher.valid_from.getDate()) ||
        date < current_date.setDate(current_date.getDate() - 1);
      return range;
    },

    checkEndate() {
      var current_date = new Date();
      if (this.voucher.valid_from < current_date.setDate(current_date.getDate() - 1)) {
        this.voucher.valid_from = "";
      }
      this.voucher.valid_to = "";
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.save();
          return;
        }
      });
    },

    validateBeforeTypeSubmit() {
      this.$validator.validateAll("item").then((result) => {
        if (result) {
          this.saveItem();
          return;
        }
      });
    },

    save() {
      var valid_from = moment(String(this.voucher.valid_from)).format("Y-MM-DD");
      var valid_to = moment(String(this.voucher.valid_to)).format("Y-MM-DD");

      this.voucher.valid_from = valid_from;
      this.voucher.valid_to = valid_to;

      if (this.voucher.uuid) {
        this.$api
          .putAPI({
            _action: "/voucher/" + this.voucher.uuid,
            _body: this.voucher,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.voucher.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/voucher");
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
            _action: "voucher",
            _body: this.voucher,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.voucher.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/voucher");
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
          _action: "/voucher/image/" + this.voucher.uuid,
          _key: "image",
          _file: this.file,
          _body: this.voucher,
        })
        .then((res) => {
          this.$noty.success("" + "Successfully Uploaded", {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          router.push("/voucher");
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
          _action: "/voucher/info/" + this.voucher.uuid,
        })
        .then((res) => {
          this.voucher = res.info;

          this.voucher.valid_from = new Date(this.voucher.valid_from);
          this.voucher.valid_to = new Date(this.voucher.valid_to);
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
    getSelectBox() {
      this.$api
        .getAPI({
          _action: "category/list/",
        })
        .then((res) => {
          this.cat_select_box = res.list;
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
        router.push("/voucher");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.uuid) {
      this.voucher.uuid = this.$route.params.uuid;
      this.getDetail();
    }
    this.getSelectBox();

    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
