<template>
  <div>
    <span v-on:click="users">用户列表</span>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    users() {
      this.$http
        .get(
          `http://authing.wangrujian.com/auth/admin/realms/${this.$keycloak.keycloak.realm}/users`
        )
        .then((d) => {
          console.log(d);
        });
    },
  },
};
</script>
