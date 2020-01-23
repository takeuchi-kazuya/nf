<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      <p>{{ user.email }}でログイン中です</p>
      <p>
        <button v-on:click="logout">ログアウト</button>
      </p>
      <p>
        <a href="/member-page">メンバーページへ</a>
      </p>
    </div>

    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      <p>メール</p>
      <p>
        <input type="text" v-model="email" />
      </p>
      <p>パスワード</p>
      <p>
        <input type="password" v-model="password" />
      </p>
      <p>
        <button v-on:click="login">ログイン</button>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated"])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user);
    });
  },
  methods: {
    ...mapActions(["setUser"]),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // ログインしたら飛ぶページを指定
          this.$router.push("/member-page");
        })
        .catch(error => {
          alert(error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null);
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
