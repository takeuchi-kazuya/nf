<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です
      <br />
      <button v-on:click="logout">ログアウト</button>
      <br />
      <a href="/member-page">メンバーページへ</a>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      メール
      <br />
      <input type="text" v-model="email" />
      <br />パスワード
      <br />
      <input type="password" v-model="password" />
      <br />
      <button v-on:click="login">ログイン</button>
    </div>

    <div>
      <span class="userId"></span>
      <ul>
        <li id="textMessage">{{ textMessage }}</li>
        <li>
          <input type="text" id="message" />
        </li>
        <li>
          <input type="button" value="Reload" id="btnChangeData" v-on:click="changeData" />
        </li>
      </ul>

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    :counter="32"
                    label="email"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_password ? 'text' : 'password'"
                    :counter="32"
                    label="password"
                    prepend-icon="mdi-lock"
                    @click:append="show_password = !show_password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn class="authBtn" v-on:click="doAuth" disabled></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import { mapActions, mapState, mapGetters } from "vuex";

import firebase from "~/plugins/firebase";
import "firebase/database";
import "firebase/auth";

// import Logo from "~/components/Logo.vue";
import AuthBtn from "~/components/AuthBtn.vue";
export default {
  components: {
    // Logo,
    AuthBtn
  },

  data: function() {
    return {
      textMessage: "初期値",
      AuthUI: {
        provider: new firebase.auth.GoogleAuthProvider(),
        data: {
          authed: false,
          userId: ""
        }
      }
    };
  },

  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated"])
  },

  mounted() {
    this.AuthUI.elAuthBtn = document.querySelector(".authBtn");
    this.AuthUI.elUserId = document.querySelector(".userId");
    firebase.auth().onAuthStateChanged(user => {
      const { uid, email, displayName } = user;
      this.setUser({ uid, email, displayName });
    });

    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        this.AuthUI.elAuthBtn.disabled = this.AuthUI.data.authed;

        if (result.credential) {
          var token = result.credential.accessToken;
        }

        console.log(result);

        if (result.user) {
          data.authed = true;
          data.userId = result.user.email;
          this.editDataBase();
          this.db = firebase.database();
          this.chatAll = this.db.ref("/user");
        }
        this.textChange();
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(result);
        this.textChange();
      });

    console.log(this.user);
    setTimeout(() => {
      console.log(this.user);
    });

    setTimeout(() => {
      if (!this.isAuthenticated) {
        // ログインしていなかったら飛ぶページを設定
        console.log("ログインしていない");
        // this.$router.push('account')
      } else {
        console.log("ログインしている");
      }
      this.loaded = true;
    }, 0);
  },

  methods: {
    textChange: function() {
      this.AuthUI.elAuthBtn.textContent = this.AuthUI.data.authed
        ? "LOGOUT"
        : "LOGIN";
      this.AuthUI.elUserId.textContent = this.AuthUI.data.userId;
    },

    doAuth: function() {
      var _this = this;

      if (this.AuthUI.data.authed) {
        // logout
        firebase
          .auth()
          .signOut()
          .then(
            // function() {
            () => {
              this.AuthUI.data.authed = false;
              this.AuthUI.data.userId = "";

              this.textChange();
            },
            function(error) {
              // An error happened.
            }
          );
      } else {
        // login
        firebase.auth().signInWithRedirect(this.AuthUI.provider);

        firebase.auth().onAuthStateChanged(user => {
          const { uid, email, displayName } = user;
          this.setUser({ uid, email, displayName });
        });
      }
    },

    editDataBase: function() {
      // 初期値設定
      this.chatAll.set({
        message: "初期値"
      });

      // TODO: View上のテキスト、プレースホルダ埋め込む
      this.chatAll.on("value", function(snapshot) {
        document.getElementById(
          "textMessage"
        ).innerText = snapshot.val().message;

        console.log(snapshot.val().message);
      });
    },

    changeData: function() {
      // TODO: ログイン時にのみDB操作できるようにする
      var message = document.getElementById("message").value;
      var db = firebase.database();
      var chatAll = db.ref("/user");
      chatAll.set({
        message: message
      });
    },

    ...mapActions(["setUser"]),

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // ログインしたら飛ぶページを指定
          // this.$router.push("/member-page")
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
<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
