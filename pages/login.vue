<template>
 <div>
   <Header />
    <div class="container">

      <form class="form" method="post" @submit.prevent="userLogin">
        <div class="login-form">
          <p class="error" v-show="errors.email">{{ errors.email }}</p>
          <input type="text" name="email" placeholder="Email" v-model="user.email" required>
           <p class="error" v-show="errors.password">{{ errors.password }}</p>
          <input type="password" name="password" placeholder="Password" v-model="user.password" required>
          <button type="submit" class="btn">Sign In</button>
          <p class="new-user">Don't you have an account? <nuxt-link to="register">Craete an account!</nuxt-link></p>
        </div>
      </form>
    </div>
 </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      },
    }
  },
  computed: {
    authUser() {
      return this.$auth.user;
    },
    token() {
      return this.$auth.strategy.token.get();
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    async userLogin() {
      this.resetErrors();
      try {
        let response = await this.$auth.loginWith('local', { data: this.user });
        this.$router.push("/");
      } catch (res) {
        if (res.response?.data?.first_errors) {
          Object.entries(res.response?.data?.first_errors).forEach(([key, value]) => {
            this.errors[key] = value
          })
        }
      }
    },
    resetErrors() {
      this.errors.email = '';
      this.errors.name = '';
      this.errors.password = '';
    }
  }
}
</script>

<style lang="scss" scoped>


  $font-family: 'Roboto', sans-serif;

  @mixin btn($fontcolor: #FAFAFA){
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    outline: 0;
    border: 0;
    width: 100%;
    padding: 15px;
    background: #186804;
    color: $fontcolor;
    text-transform: uppercase;
  }

  @mixin new-user($fontcolor: #076fa3){
    color: $fontcolor;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  @mixin input($bkgnd: #f5f5f573){
    font-family: $font-family;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    outline: 0;
    font-size: 15px;
    text-align: center;
    box-sizing: border-box;
    background: $bkgnd;
    border: 0.5px solid #186804;
  }

  .container{
    padding: 8% 0 0;
    width: 365px;
    margin: auto;
  }

  .form{
    position: relative;
    z-index: 1;
    max-width: 350px;
    margin: 0 auto 100px;
    padding: 45px;
    background: #FFFFFF;
  }

  .form {
    input{
      @include input;

      ::placeholder {
        color: #90A4AE;
      }
    }

    .btn{
      @include btn;
    }

    .new-user {
      @include new-user;
      a {
        text-decoration: none;
        color:#186804;
      }
    }
  }



</style>
