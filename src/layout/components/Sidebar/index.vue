<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<style>
.el-menu-item {
  font-size: 14px;
  font-family: Helvetica;
  color: #111111;
}
.el-submenu .el-menu-item {
  font-family: Helvetica;
  color: #111111;
  padding: 0 11px;
  padding-left: 44px !important;
}
.el-menu-item.is-active,
.el-menu-item.is-active {
  font-weight: bold;
}
.el-submenu__title {
  padding: 0 11px 0 14px;
  padding-left: 14px !important;
}
.el-menu-item {
  padding: 0 11px;
  padding-left: 14px !important;
}
#svg-icon .el-menu-item .svg-icon {
  width: 17px;
  height: 17px;
  vertical-align: middle;
}
.el-submenu__icon-arrow {
  right: 11px;
}
.el-icon-arrow-down:before {
    content: url("~@/assets/img/icon-arrow-down.png");
}
</style>
