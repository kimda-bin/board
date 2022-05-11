<template>
  <v-layout class="background" align-center justify-center>
    <div class="form">
      <v-text-field v-model="form.id" label="아이디"></v-text-field>
      <v-text-field v-model="form.name" label="이름"></v-text-field>
      <v-text-field
        v-model="form.password"
        type="password"
        label="패스워드"
      ></v-text-field>
      <v-text-field
        v-model="form.passwordConfirm"
        type="password"
        label="패스워드 확인"
      ></v-text-field>

      <v-btn block @click="join">회원가입</v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },
  methods: {
    join() {
      if (this.form.id == "") {
        window.alert("아이디를 입력해주세요");
        return;
      }
      if (this.form.name == "") {
        window.alert("이름을 입력해주세요");
        return;
      }
      if (this.form.password.length < 8) {
        window.alert("패스워드는 8자 이상이어야 합니다");
        return;
      }
      if (this.form.password != this.form.passwordConfirm) {
        window.alert("패스워드가 일치하지 않습니다");
        return;
      }

      //TODO:서버에 전송해서 회원가입 시키기
      this.axios.post("/api/users/join", this.form).then((result) => {
        console.log(result);
        if (result.data.result == "ok") {
          //회원가입이 성공한 경우
          window.alert("회원가입이 완료되었습니다");
          this.$router.push("/");
        }
        if (result.data.result == "fail") {
          //회원가입이 실패한경우
          window.alert(result.data.message);
        }
      });
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