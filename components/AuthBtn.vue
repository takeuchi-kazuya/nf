<template>
  <button class="authBtn" v-on:click="doAuth" disabled></button>
</template>

<script>
import firebase from "~/plugins/firebase";
import "firebase/database";

// TODO: 必要か不要か検証する
import "firebase/auth";

export default {
  components: {},

  data: function() {},

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
            function() {
              _this.AuthUI.data.authed = false;
              _this.AuthUI.data.userId = "";
              _this.textChange();
            },
            function(error) {
              // An error happened.
            }
          );
      } else {
        // login
        firebase.auth().signInWithRedirect(this.AuthUI.provider);
      }
    }
  },
  mounted: function() {
    this.textChange();
  }
};
</script>
<style>
</style>
