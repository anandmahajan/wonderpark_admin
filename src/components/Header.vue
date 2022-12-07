<template>
  <div>
    <div class="header">
      <div class="header-left">
        <a href class="burger-menu">
          <i data-feather="menu"></i>
        </a>
      </div>
      <!-- header-left -->

      <div class="header-right">
        <div class="dropdown dropdown-loggeduser">
          <a href class="dropdown-link" data-toggle="dropdown">
            <div class="avatar avatar-sm">
              <img
                :src="
                  user.profile_image
                    ? user.profile_image
                    : '/static/img/profile-placeholder.jpg'
                "
                class="rounded-circle"
              />
            </div>
            <!-- avatar -->
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="dropdown-menu-header">
              <div class="media align-items-center">
                <div class="avatar">
                  <img
                    :src="
                      user.profile_image
                        ? user.profile_image
                        : '/static/img/profile-placeholder.jpg'
                    "
                    class="rounded-circle"
                  />
                </div>
                <!-- avatar -->
                <div class="media-body mg-l-10">
                  <h6>{{ user.name }}</h6>
                  <!-- <span>Administrator</span> -->
                </div>
              </div>
              <!-- media -->
            </div>
            <div class="dropdown-menu-body">
              <router-link to="/profile">
                <a href class="dropdown-item">
                  <i data-feather="user"></i> My Profile
                </a>
              </router-link>

              <router-link to="/change-password">
                <a href class="dropdown-item">
                  <i data-feather="user"></i> Change Password
                </a>
              </router-link>
              <a href class="dropdown-item" @click="logout()">
                <i data-feather="log-out"></i> Sign Out
              </a>
            </div>
          </div>
          <!-- dropdown-menu -->
        </div>
      </div>
      <!-- header-right -->
    </div>
    <!-- header -->

    <div class="content-header">
      <div>
        <nav aria-label="breadcrumb ">
          <!-- <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <a href="#">
              <template
                v-if=" $breadcrumbs &&  $breadcrumbs.length > 0 &&  $breadcrumbs[0].meta.title"
              >{{ $breadcrumbs[0].meta.title}}</template>
            </a>
          </li>
          </ol>-->
        </nav>
        <h4 class="content-title">
          <template
            v-if="
              $breadcrumbs &&
              $breadcrumbs.length > 0 &&
              $breadcrumbs[0].meta.title
            "
            >{{ $breadcrumbs[0].meta.title }}</template
          >
        </h4>
      </div>
    </div>
  </div>
  <!-- content-header -->
</template>
<script>
import router from "@/router";
import EventBus from "../eventBus";
import Multiselect from "vue-multiselect";
export default {
  name: "Header",
  components: {
    Multiselect,
  },
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
    logout() {
      localStorage.clear();
      if (this.$shareService) {
        this.$shareService.clearMap();
      }
      router.push("/login");
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
