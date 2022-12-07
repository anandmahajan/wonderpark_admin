<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card rounded-5">
              <div class="card-body p-4 p-lg-5">
                <div class="col-md-6 mb-3">
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customSwitch9"
                      v-model="setting.auto_approval_task"
                      @change="save()"
                    />
                    <label class="custom-control-label" for="customSwitch9"
                      >Auto Approval of Task</label
                    >
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
      setting: {
        auto_approval_task: false,
      },
      type: "",
    };
  },
  methods: {
    save() {
      this.$api
        .postAPI({
          _action: "set-setting",
          _body: this.setting,
          _hide_loader: true,
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

    getDetail() {
      this.$api
        .getAPI({
          _action: "get-setting",
        })
        .then((res) => {
          this.setting = res.result;
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
    this.getDetail();
  },
};
</script>
