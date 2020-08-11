<template>
  <div class="homepage container">

          <router-link :to="{ name: 'login' }"><p class="admin-login-link">Admin Login</p></router-link>
      <router-link :to="{ name: 'homepage' }">    <h1>Welcome to machina web application</h1></router-link>


      <div class="columns">
          <div class="column">

          </div>
          <div class="column registration-form">
              <div class="notification is-link" v-if="messages.length">
                  <button class="delete" v-on:click="clearMessages"></button>
                  <p v-for="message in messages" v-bind:key="message.id">{{message}}</p>
                  </div>

              <div class="notification is-danger" v-if="errors.length">
                  <button class="delete" v-on:click="clearErrors"></button>
                  <p v-for="error in errors" v-bind:key="error.id">{{error}}</p>
              </div>

              <h1>Registration form</h1>
              <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="Your name" v-model="name">
                  </div>
              </div>

              <div class="field">
                  <label class="label">Manager email address</label>
                  <div class="control has-icons-left has-icons-right">
                      <input class="input " type="email" placeholder="you@emaill.com" v-model="email">
                      <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                      <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
                  </div>

              </div>


              <div class="field">
                  <label class="label">Type of participant</label>
                  <div class="control">
                      <div class="select">
                          <select v-model="participant_type">
                              <option disabled value="">Please select one</option>
                              <option value="Band">Band</option>
                              <option value="Carriage">Carriage</option>
                          </select>
                      </div>
                  </div>
              </div>

              <div class="field">
                  <label class="label">Foundation Date</label>
                  <div class="control">
                      <input class="input" type="date" v-model="foundation_date" >
                  </div>
              </div>

              <button class="button is-link is-fullwidth is-rounded" v-on:click="checkForm">Register</button>
          </div>
          <div class="column">

          </div>

      </div>

  </div>
</template>

<script>
    import axios from 'axios'
export default {
  name: 'Homepage',
    data(){
        return {
            name : "",
            email : "",
            participant_type : "",
            foundation_date : "",
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
      validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        checkForm: function (e) {

            this.errors = [];

            if (!this.name) {
                this.errors.push("Name required.");
            }
            if (!this.participant_type) {
                this.errors.push("Participant type required.");
            }
            if (!this.foundation_date) {
                this.errors.push("Foundation date required.");
            }
            if (!this.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.errors.length) {
                this.handleSubmit();
            }
            e.preventDefault();

        },
        handleSubmit(){
            //e.preventDefault()

            if (!this.errors.length){


                let new_list={'name':this.name,'manager_email':this.email,'participant_type':this.participant_type,
                    'foundation_date':this.foundation_date,'id':this.id,'order_id':''
                };
                let slug_url='/api/submit/';
                axios({url: slug_url, data: new_list, method: 'POST'})
                    .then(resp => {
                        const success = resp.data
                        if (success) {
                            this.messages.push('Record added');
                            this.name = "",
                                this.email = "",
                                this.participant_type = "",
                                this.foundation_date = ""

                        } else {
                            this.errors.push("Record not added");
                        }
                    }).catch(err => {
                    this.errors.push(err);

                })
                

            }



        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="scss">
    .admin-login-link{
        text-align: center;
        padding:10px;
        background-color: #ccc;
        color:white;
        border-radius: 0px 0px 20px 20px;
        margin-bottom: 50px;
        margin-top:0px;
        width:200px;
        margin-right:auto;
        margin-left:auto;
    }
    .homepage{

    }
    h1{
        text-align: center;
    }
    .registration-form{
        margin-left: 20px;
        margin-right:20px;
        h1{
            font-size:40px;
        }
    }
</style>