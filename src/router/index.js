import Vue from "vue";
import Router from "vue-router";

import en from "../../lang/en/messages";
import ch from "../../lang/ch/messages";

Vue.use(Router);

var val = localStorage.getItem("locale");
var messages;
if (val == "ch") messages = ch;
else messages = en;

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "",
      redirect: "login"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/login")
    },
    {
      path: "/",
      component: () => import("@/views/Main"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/Profile/profile"),
          meta: {
            title: messages.profile,
            breadcrumb: [{ name: messages.profile }, { name: messages.profile }]
          }
        },

        {
          path: "/change-password",
          name: "ChangePassword",
          component: () => import("@/views/Profile/changePassword"),
          meta: {
            title: messages.change_password,
            breadcrumb: [
              { name: messages.change_password },
              { name: messages.change_password }
            ]
          }
        },

        {
          path: "/admin",
          name: "Admin",
          component: () => import("@/views/Admin/admin"),
          meta: {
            title: messages.manage_admin,
            breadcrumb: [
              { name: messages.manage_admin },
              { name: messages.manage_admin }
            ]
          }
        },

        {
          path: "/add-admin",
          name: "Admin",
          component: () => import("@/views/Admin/addAdmin"),
          meta: {
            title: messages.add_admin,
            breadcrumb: [
              { name: messages.add_admin },
              { name: messages.add_admin }
            ]
          }
        },

        {
          path: "/edit-admin/:uuid",
          name: "Admin",
          component: () => import("@/views/Admin/addAdmin"),
          meta: {
            title: messages.edit_admin,
            breadcrumb: [
              { name: messages.edit_admin },
              { name: messages.edit_admin }
            ]
          }
        },

        {
          path: "/category",
          name: "category",
          component: () => import("@/views/Category/category"),
          meta: {
            title: messages.manage_category,
            breadcrumb: [
              { name: messages.manage_category },
              { name: messages.manage_category }
            ]
          }
        },

        {
          path: "/add-category",
          name: "Addcategory",
          component: () => import("@/views/Category/addCategory"),
          meta: {
            title: messages.add_category,
            breadcrumb: [
              { name: messages.add_category },
              { name: messages.add_category }
            ]
          }
        },

        {
          path: "/edit-category/:uuid",
          name: "Addcategory",
          component: () => import("@/views/Category/addCategory"),
          meta: {
            title: messages.edit_category,
            breadcrumb: [
              { name: messages.edit_category },
              { name: messages.edit_category }
            ]
          }
        },
        {
          path: "/banner",
          name: "banner",
          component: () => import("@/views/Banner/banner"),
          meta: {
            title: messages.manage_banner,
            breadcrumb: [
              { name: messages.manage_banner },
              { name: messages.manage_banner }
            ]
          }
        },

        {
          path: "/add-banner",
          name: "addBanner",
          component: () => import("@/views/Banner/addBanner"),
          meta: {
            title: messages.add_banner,
            breadcrumb: [
              { name: messages.add_banner },
              { name: messages.add_banner }
            ]
          }
        },

        {
          path: "/edit-banner/:id",
          name: "addBanner",
          component: () => import("@/views/Banner/addBanner"),
          meta: {
            title: messages.edit_banner,
            breadcrumb: [
              { name: messages.edit_banner },
              { name: messages.edit_banner }
            ]
          }
        },

        {
          path: "/dashboard",
          name: "Dashboard",
          component: () => import("@/views/Dashboard/dashboard"),
          meta: {
            title: messages.dashboard,
            breadcrumb: [
              { name: messages.dashboard },
              { name: messages.dashboard }
            ]
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("access_token") == null
    ) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      if (localStorage.getItem("access_token") != null) {
        next({
          path: "/profile",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
export default router;
