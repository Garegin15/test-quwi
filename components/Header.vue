<template>
   <div id="navigation-bar">
      <nav>
        <ul>
          <li>
            <nuxt-link to="">LOGO</nuxt-link>
          </li>
          <li>
            <nuxt-link to="" v-show="authUser">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/login" v-show="!authUser">Login</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/register" v-show="!authUser">Register</nuxt-link>
          </li>
          <li>
            <span @click="logOut" class="log-out" v-show="authUser">Log out</span>
          </li>
          <a href="#" id="menu-icon"></a>
        </ul>
      </nav>
    </div>
</template>

<script>

  export default {
  data() {
      return {

      }
  },
  computed: {
    authUser() {
      return this.$store.state.user || null
    },
  },
  methods: {
    logOut() {
      this.$axios.$post('auth/logout', { "anywhere": true }).then((res) => {
        this.$store.commit('SET_USER', null);
        this.$router.push("/login");
      })
    }
  },
}


</script>

<style lang="scss">

  nav {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
    ul {
      text-align: center;
      list-style-type: none;
      list-style-type: none;
      margin: 0;
      padding: 15px;
      li {
        display: inline;
        font-family: "Fira Sans", sans-serif;
        font-size: 17px;
        a {
          color: #f2f2f2;
          text-decoration: none;
          padding: 14px;
          &:hover {
            background-color: #111;
          }
        }
      }
    }
  }
</style>
