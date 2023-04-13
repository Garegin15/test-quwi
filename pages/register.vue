<template>

 <div>
    <Header/>
   <div class="container">
      <div class="form">
        <div>
            <p class="error-message" v-show="errors.name">{{ errors.name }}</p>
            <input type="text" name="name" placeholder="Name" v-model="user.name" required>
            <p class="error-message" v-show="errors.email">{{ errors.email }}</p>
            <input type="text" name="email" placeholder="Email" v-model="user.email" required>
            <p class="error-message" v-show="errors.password">{{ errors.password }}</p>
            <input type="password" name="password" placeholder="Password" v-model="user.password" required>
            <button type="submit" class="btn" @click="saveClient">Submit</button>
            <p class="message">New User? <a href="#">Create an account</a></p>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    // If the user authenticated
    if (store.state.user) {
      return redirect('/')
    }
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        tariff_sname: "starter"
      },
      errors: {
        name: "",
        email: "",
        password: ""
      },
      serverError: ''
    }
  },
  methods: {
    saveClient() {
      this.resetErrors()
      this.$axios.$post('auth/signup', this.user).then((res) => {
        this.$store.commit('SET_USER', res.app_init.token);
        this.$store.commit('SET_TOKEN', res.token);
        this.$router.push("/");
      }).catch((res) => {
        if (res.response?.data?.first_errors) {
          Object.entries(res.response?.data?.first_errors).forEach(([key, value]) => {
            this.errors[key] = value
          })
        }
      })
    },
    resetErrors() {
      this.errors.email = ''
      this.errors.name = ''
      this.errors.password = ''
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
    background: #FF5722;
    color: $fontcolor;
    text-transform: uppercase;
  }

  @mixin message($fontcolor: #90A4AE){
    color: $fontcolor;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  @mixin input($bkgnd: #F5F5F5){
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

    .message {
      @include message;
      a {
        text-decoration: none;
        color: #00BFA5;
      }
    }
  }

  .form .register-form{
    display: none;
  }


</style>
