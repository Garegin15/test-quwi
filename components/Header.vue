<template>
   <div id="navigation-bar">
      <nav>
        <ul>
          <li>
            <nuxt-link to="/">PROJECT</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" v-show="authentication">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/login" v-show="!authentication">Login</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/register" v-show="!authentication">Register</nuxt-link>
          </li>
          <li>
            <span @click="logout" class="log-out" v-show="authentication">Log out</span>
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
    authentication() {
      return this.$auth.user || null;
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("login");
    },
  },
}


</script>

<style lang="scss">

  nav {
    overflow: hidden;
    background-color: #186804;
    position: fixed;
    top: 0;
    width: 100%;
    ul {
      text-align: start;
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
