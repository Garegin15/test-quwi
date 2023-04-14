<!-- Please remove this file from your project -->
<template>
  <div class="container">
    <div class="card" v-for="project in projects" :key="project.id">
      <div class="project-logo">
        <img :src="project.logo_url" alt="" width="80px">
      </div>
      <div class="project-title">
        <input type="text" class="h2" v-if="project.isEdit" v-model="project.name" @blur="editProject(project)">
        <h2 v-else @click="project.isEdit = true">{{ project.name }}</h2>
      </div>
      <div class="project-status" :class="{'active': project.is_active }">{{ project.is_active ? 'Active' : 'Disabled' }}</div>
      <div class="project-content">
        <div class="project-times">
          <p>Time this week</p>
          <p>00:00:00</p>
        </div>
        <div class="project-times">
          <p>This month</p>
          <p>00:00:00</p>
        </div>
        <div class="project-times">
          <p>Total</p>
          <p>00:00:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      projects: []
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
  created() {
    this.getProjects();
  },
  mounted() {
  },
  methods: {
    async editProject(project) {
      try {
        (await this.$axios.$post('projects-manage/update?id=' + project.id, {
          name: project.name
        }))
      } catch (error) {
        console.log(error);
      } finally {
        project.isEdit = false
      }
    },
    async getProjects() {
      console.log(this.$auth.strategy.token.get());
      try {
        this.projects = (await this.$axios.$get('projects-manage/index?filters[is_active]=1&sort=dta_create')).projects.map(project => {
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

  .project-times{
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

  .project-status {
    &.active{
      color: #186804;
    }
    color: rgb(153, 19, 19);
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
  h2, .h2 {
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


