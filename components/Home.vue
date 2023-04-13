<!-- Please remove this file from your project -->
<template>
  <div class="container">
    <div class="card" v-for="project in projects" :key="project.id">
      <div class="logo">
        <img :src="project.logo_url" alt="" width="80px">
      </div>
      <div class="title">
        <input type="text" v-if="project.isEdit" v-model="project.name" @blur="onEdit(project)">
        <h2 v-else @click="project.isEdit = true">{{ project.name }} <img src="~/assets/icons/edit-icon.png" width="20" alt=""></h2>
      </div>
      <div class="status" :class="{'active': project.is_active }">{{ project.is_active ? 'Active' : 'Disabled' }}</div>
      <div class="content">
        <div class="times">
          <p>Time this week</p>
          <p>00:00:00</p>
        </div>
        <div class="times">
          <p>This month</p>
          <p>00:00:00</p>
        </div>
        <div class="times">
          <p>Total</p>
          <p>00:00:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      projects: []
    }
  },
  computed: {
    authUser() {
      return this.$store.state.user
    },
    token() {
      return this.$store.state.token
    }
  },
  mounted() {
    this.getProjects()
    console.log(this.authUser);
  },
  methods: {
    async onEdit(project) {
      try {
        (await this.$axios.$post('projects-manage/update?id=' + project.id, {
          name: project.name
        }, {
          headers: {
            'authorization': `Bearer ${this.token}`
          }
        }))
      } catch (error) {
        console.log(error);
      } finally {
        project.isEdit = false
      }
    },
    async getProjects() {
      try {
        this.projects = (await this.$axios.$get('projects-manage/index?filters[is_active]=1&sort=dta_create', {
          headers: {
            'authorization': `Bearer ${this.token}`
          }
        })).projects.map(project => {
          project.isEdit = false
          return project
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style lang="scss" >
.container{
    margin-top: 50px !important;
    padding: 20px 100px;
    margin: auto;
  }
.card {
  justify-content: space-between;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  position: relative;
  min-width: 450px;
  padding: 20px;
  box-shadow: 3px 10px 20px rgb(0 0 0 / 20%);
  border-radius: 3px;
  border: 0;

  > div {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .times{
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      margin-left: 10px ;
      margin-bottom: 5px ;
    }
  }

  .title {

  }

  .status {
    &.active{
      color: green;
    }
    color: red;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 0;
  }
  h2 {
    cursor: pointer;
    display: flex;
    line-height: 1;
    font-size: 18px;
    letter-spacing: 0.5px;
    font-weight: 300;
  }
  .social {
    margin-bottom: 5px;
      a {
   text-decoration: none !important;
   color: black;
    margin-left: 8px;
    font-weight: 300;
    i {
      font-weight: 400;
    }
  }
  }
  .location {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    i {
      color: red;
    }
    p {
      font-weight: 300;
    }
  }
  }

</style>


