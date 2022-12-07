<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="text-center m-auto">
        <a href="javascript:void(0)" class="sidebar-logo mb-0">
          <img
            src="/static/img/bizActiv-white.png"
            alt="Logo"
            width="100"
            style="margin-top: 14px"
          />
        </a>
      </div>
    </div>
    <!-- sidebar-header -->
    <div id="dpSidebarBody" class="sidebar-body">
      <ul class="nav nav-sidebar">
        <li class="nav-item" id="dashboard">
          <router-link to="/dashboard">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Dashboard
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="admin">
          <router-link to="/admin">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Admin
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="banner">
          <router-link to="/banner">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Banner
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="customer">
          <router-link to="/customer">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Customer
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="category">
          <router-link to="/category">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Category
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="product">
          <router-link to="/product">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Product
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="order">
          <router-link to="/order">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Order
            </a>
          </router-link>
        </li>
        <li class="nav-item" id="voucher">
          <router-link to="/voucher">
            <a href="javascript:void(0)" class="nav-link">
              <i data-feather="box"></i>
              Manage Voucher
            </a>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- sidebar-body -->
  </div>
  <!-- sidebar -->
</template>
<style scoped>
.nav-sidebar .nav-item .router-link-exact-active .nav-link {
  background: #b7b7e457;
  color: #fff;
}
</style>
<script>
import router from "@/router";
import EventBus from "../eventBus";
export default {
  name: "Menu",
  data() {
    return {
      user: {
        name: "",
        email: "",
        profile_image: "",
      },
    };
  },
  methods: {
    getMe() {
      this.$api
        .getAPI({
          _action: "/me",
        })
        .then((res) => {
          this.user = res.result;
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
    setA(e) {
      $(e.target).parent().toggleClass("show");
      $(e.target).parent().siblings().removeClass("show");
    },
  },
  mounted() {
    this.getMe();
    EventBus.$on("profile_image", (payload) => {
      this.getMe();
    });
  },
};
</script>
