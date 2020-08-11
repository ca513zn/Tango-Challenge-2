<template>
  <div class="homepage container">


      <div class="columns">
          <div class="column">

          </div>
          <div class="column admin-login">

              <router-link :to="{ name: 'homepage' }">    <h2>Rose Parade Signup</h2></router-link>
              <h1>Admin Login</h1>
              <div class="notification is-link" v-if="messages.length">
                  <button class="delete" v-on:click="clearMessages"></button>
                  <p v-for="message in messages" v-bind:key="message.id">{{message}}</p>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                  <button class="delete" v-on:click="clearErrors"></button>
                  <p v-for="error in errors" v-bind:key="error.id">{{error}}</p>
              </div>
              <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="username" v-model="username">
                  </div>
              </div>

              <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                      <input class="input" type="password" placeholder="********" v-model="password">
                  </div>
              </div>


              <button class="button is-link is-fullwidth is-rounded" v-on:click="handleSubmit">Login</button>
          </div>
          <div class="column">

          </div>

      </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
    data(){
        return {
            username : "",
            password : "",
            errors:[],
            messages:[]
        }
    },
    methods : {
        clearMessages:function(){
            this.messages=[];
        },
        clearErrors:function(){
            this.errors=[];
        },
        handleSubmit(e){
            e.preventDefault()


            let username = this.username
            let password = this.password
            if (this.password.length > 0 && this.username.length > 0){
                this.processing=true;
                this.submitted=true;
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                this.$store.dispatch('login', formData)
                    .then(() => this.$router.push('/dashboard'))
                    .catch(err => {this.errors.push(err);})
            }
            else{
                this.email = ''
                this.password = ''
            }


        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="scss">
   h1{
       text-align:center;

           font-size:40px;

   }
   h2{
       text-align:center;
   }
    .admin-login{
        margin-top: 40px;
        margin-left: 20px;
        margin-right:20px;
    }
</style>