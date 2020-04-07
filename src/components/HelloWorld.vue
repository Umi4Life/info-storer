<template>
  <v-container>
    <v-row lign="center"
           justify="center"
           class="text-center">

      <v-col center class="mb-4">

          <input type="file" accept=".csv" @change="chooseFiles">

          <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
          ></v-text-field>
          <v-data-table
                  v-if="table.length > 0"
                  :headers="header"
                  :items="table"
                  :items-per-page="5"
                  :search="search"
                  class="elevation-1"
          ></v-data-table>




      </v-col>

    </v-row>
  </v-container>
</template>

<script>
    import store from '../store'
    var Papa = require("papaparse")
    export default {
        name: 'HelloWorld',
        props: {

        },
        data: () => ({
            search: '',
            file: null,
            header:[],
            table: [],
            message : store.getters.getMessage
        }),
        created (){
            this.table = store.getters.getJson
            if(this.table.length>0){
                Object.keys(this.table[1]).forEach(element => this.header.push({text: element, value:element}));
            }
        },
        methods: {
            submit: function (message){
                store.commit('setMessage', message)
            },
            chooseFiles: function (e) {
                this.file = e.target.files || e.dataTransfer.files;
                Papa.parse(this.file[0], {
                    header: true,
                    complete: function(results) {
                        store.commit("setJson", results.data)
                    }});
                this.table = store.getters.getJson
                Object.keys(this.table[1]).forEach(element => this.header.push({text: element, value:element}));

            }
        }
    }
</script>