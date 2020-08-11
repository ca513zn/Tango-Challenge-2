<template>
    <div class="homepage container">

        <router-link :to="{ name: 'dashboard' }"><p class="admin-login-link"> Dashboard</p></router-link>
        <router-link :to="{ name: 'homepage' }">    <h1>Edit recruit</h1></router-link>


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
                        <input class="input " type="email" placeholder="you@emaill.com" v-model="manager_email">
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

                <button class="button is-link is-fullwidth is-rounded" v-on:click="saveChanges">Save Changes</button>
            </div>
            <div class="column">

            </div>

        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SingleSoldier",
        components: {

        },
        data() {
            return {
                recruit: '',
                dragging: false,
                name : "",
                manager_email : "",
                participant_type : "",
                foundation_date : "",
                id:"",
                errors:[],
                messages:[]
            };
        },
        methods: {
            saveUpdatedOrder: function () {
                this.listChanged = true;
            },
            saveChanges: function(e) {
                e.preventDefault()



               let new_list={'name':this.name,'manager_email':this.manager_email,'participant_type':this.participant_type,
                   'foundation_date':this.foundation_date,'id':this.id
                };



                let slug_url = '/api/edit/' + this.id +'/';
                axios({url: slug_url, data: new_list, method: 'PUT'})
                    .then(resp => {
                        const success = resp.data
                        if (success) {
                            this.messages.push('Changes saved');


                        } else {
                            this.errors.push("Changes not changed");
                        }
                    }).catch(err => {
                    this.errors.push(err);

                })


            }
        },

        created: function() {

            const slug=      this.$route.params.slug;
            let slug_url = '/api/edit/' + slug;
            axios({url:slug_url,method:'GET'

            })
                .then(res => {

                    this.recruit=res.data;
                    this.name = res.data.name;
                        this.manager_email= res.data.manager_email;
                        this.participant_type= res.data.participant_type;
                        this.foundation_date= res.data.foundation_date;
                        this.id =res.data.id;
                    //const recommended_tours=resp.data.recommended_tours
                    // eslint-disable-next-line no-console
                    console.log(res.request)


                }).catch(err => {
                this.errors.push(err);
                // eslint-disable-next-line no-console
                console.log(err.request)

            })
        },
    };
</script>
<style scoped>
    .admin-login-link{
        text-align:center;

    }
    h1{
        text-align:center;
    }
    .buttons {
        margin-top: 35px;
    }
</style>