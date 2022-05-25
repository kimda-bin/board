<template>
  <v-layout class="background" align-center justify-center>
    <div class="form">
      <v-text-field v-model="form.id" label="아이디"></v-text-field>
      <v-text-field
        v-model="form.password"
        type="password"
        label="password"
      ></v-text-field>
      <!--
      <v-btn class="mr-2" @click="login">로그인</v-btn>
      -->
      <mjc-btn
        :background="loginbtnBg"
        fontcolor="white"
        @click="login"
        @changeBackground="loginBtnBackground"
      >
        로그인
      </mjc-btn>
      <mjc-btn class="mt-2" background="#0000ff" fontcolor="white"
        >회원가입</mjc-btn
      >
      <!--<v-btn @click="moveJoin">회원가입</v-btn>-->
    </div>
  </v-layout>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import MjcBtn from "@/components/MjcBtn";

export default {
  components: {
    MjcBtn,
  },
  name: "Home",
  data() {
    return {
      loginbtnBg: "#ff0000",
      form: {
        id: "",
        password: "",
      },
      name: "",
    };
  },
  methods: {
    loginBtnBackground(background) {
      this.loginbtnBg = background;
    },
    login(background) {
      //TODO:폼체크하는거 추가
      if (this.form.id == "") {
        window.alert("아이디를 입력해주세요");
        return;
      }
      if (this.form.password.length < 8) {
        window.alert("패스워드는 8자 이상이어야 합니다");
        return;
      }

      //TODO:서버에 전송해서 로그인 시키기
      this.axios.post("/api/users/login", this.form).then((result) => {
        if (result.data.result == "ok") {
          this.$router.push("/board");
        }
        if (result.data.result == "fail") {
          window.alert(result.data.message);
        }
      });

      //this.$router.push("/board");
    },
    moveJoin() {
      this.$router.push("/join");
    },
  },
};
</script>

<style scoped>
.background {
  background: #eeeeee;
}
.background .form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
