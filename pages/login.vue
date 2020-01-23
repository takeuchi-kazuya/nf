<!-- <template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" :counter="32" label="email" prepend-icon="mdi-email" />
                <v-text-field
                  v-model="password"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  :counter="32"
                  label="password"
                  prepend-icon="mdi-lock"
                  @click:append="show_password = !show_password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="gotoSignup">SIGNUP</v-btn>
              <v-spacer />
              <v-btn v-on:click="doLogin">LOGIN</v-btn>
            </v-card-actions>
            <hr />
            <v-spacer />
            <v-btn v-on:click="gotoResetPassword">パスワードを忘れたかたはこちら</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template> -->

<!-- <script>
// import Vue from "vue";
// import vuetify from "@/plugins/vuetify";
// import firebase from "~/plugins/firebase";
// import "firebase/database";
// import "firebase/auth";

// export default {
//   data() {
//     return {
//       email: "",
//       password: "",
//       show_password: false
//     };
//   },
//   methods: {
//     doLogin() {
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(this.email, this.password)
//         .then(user => {
//           console.log(user);
//           // this.$router.push("/");
//         })
//         .catch(error => {
//           // alert(error);
//           console.error(error);
//         });
//     },
//     gotoSignup() {
//       this.$router.push("/signup");
//     },
//     gotoResetPassword() {
//       this.$router.push("/reset-password");
//     }
//   }
// };
// </script> -->


<template>
  <firebase-auth />
</template>

<script>
import FirebaseAuth from "@/components/FirebaseAuth";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    FirebaseAuth
  }
};
</script>
