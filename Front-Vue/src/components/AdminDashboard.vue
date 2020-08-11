<script src="../router.js"></script>
<template>
  <div class="columns">
    <div class="column"></div>
    <div class="row column">
      <div class="notification is-link" v-if="messages.length">
        <button class="delete" v-on:click="clearMessages"></button>
        <p v-for="message in messages" v-bind:key="message.id">{{message}}</p>
      </div>
      <div class="notification is-danger" v-if="errors.length">
        <button class="delete" v-on:click="clearErrors"></button>
        <p v-for="error in errors" v-bind:key="error.id">{{error}}</p>
      </div>
      <div class="col-8">
        <button class="button" v-on:click="logout">Logout</button>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Name</th>
              <th scope="col">Manager email address</th>
              <th scope="col">Type of participant</th>
              <th scope="col">Foundation date</th>
            </tr>
          </thead>
          <draggable v-model="thelist" tag="tbody">
            <router-link
              :to="{ name: 'edit',params: { slug: item.id } }"
              v-for="(item, index) in thelist"
              :key="item.name"
              tag="tr"
            >
              <td scope="row" class="td-select">{{ index + 1 }}</td>
              <td scope="row" class="td-select">{{ item.name }}</td>
              <td>{{ item.manager_email }}</td>
              <td>{{ item.participant_type }}</td>
              <td>{{ item.foundation_date }}</td>
            </router-link>
          </draggable>
        </table>
      </div>

      <br />
      <button class="button is-link is-medium is-rounded" v-on:click="saveChanges">Save Changes</button>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
export default {
  name: "AdminDashboard",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      dragging: false,
      thelist: "",
      messages: [],
      errors: []
    };
  },
  methods: {
    clearMessages: function() {
      this.messages = [];
    },
    clearErrors: function() {
      this.errors = [];
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },

    saveUpdatedOrder: function() {
      this.listChanged = true;
    },
    saveChanges: function(e) {
      e.preventDefault();

      //let soldierList = this.sortedList

      //const formData = new FormData();
      //formData.append('soldierList', soldierList);

      let slug_url = "/api/bulkedit/";
      let this_vue = this;
      let new_list = this.sortedList;
      console.log(new_list);
      axios({ url: slug_url, data: new_list, method: "PUT" })
        .then(res => {
          this_vue.messages.push("Changes saved");
        })
        .catch(err => {
          this_vue.errors.push(err);
        });
    }
  },
  computed: {
    sortOnId: function() {
      let local_list = JSON.parse(JSON.stringify(this.thelist));
      return local_list.sort(function(a, b) {
        return a["id"] - b["id"];
      });
    },
    sortedList: function() {
      let tempArray = [];
      let strArray = JSON.parse(JSON.stringify(this.thelist));
      for (let i = 0; i < strArray.length; i++) {
        let order_id = i + 1;

        let temp = strArray[i];

        temp["order_id"] = order_id;
        tempArray.push(temp);
      }
      return tempArray;
    }
  },
  created: function() {
    axios({
      url: "/api/list",
      method: "GET"
    })
      .then(res => {
        //const recommended_tours=resp.data.recommended_tours
        // eslint-disable-next-line no-console
        console.log(res.request);
        let new_list = res.data;

        this.thelist = res.data;
      })
      .catch(err => {
        this.errors.push(err);
        // eslint-disable-next-line no-console
        console.log(err.request);
      });
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
tr {
  cursor: move;
}
.td-select {
  cursor: pointer;
}
</style>