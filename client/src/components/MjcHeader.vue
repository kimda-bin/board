<template>
  <div class="header">
    <v-layout align-center>
      <div class="logo" @click="moveMain">Mjc Board</div>
      <v-spacer></v-spacer>
      <v-btn text v-if="$store.state.user" @click="logout">로그아웃</v-btn>
      <v-btn text v-if="!$store.state.user" @click="$router.push('/')"
        >로그인</v-btn
      >
      <div v-if="$store.state.user">
        {{ $store.state.user.name }}
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    moveMain() {
      this.$router.push("/board");
    },
    logout() {
      this.axios.post("/api/users/logout").then((result) => {
        if (result.data.result == "ok") {
          this.$store.commit("logout");
        }
      });
    },
  },
  mounted() {
    this.axios.post("/api/users/info").then((result) => {
      if (result.data.result == "ok") {
        this.$store.commit("setUser", result.data.user);
      }
    });
  },
};
</script>

<style scoped>
.header {
  padding: 10px 20px;
  box-shadow: 0 6px 6px #eee;
}
.header .logo {
  cursor: pointer;
}
</style>