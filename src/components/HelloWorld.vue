<template>
  <v-container>
    <v-row lign="center"
           justify="center"
           class="text-center">

      <v-col center>


          <input type="file" accept=".csv" @change="chooseFiles">
          <!--<v-btn raised @click="log">Log</v-btn>-->
          <v-card v-if="table.length > 0 || loading">
          <v-card-title>
          <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
          ></v-text-field>
          </v-card-title>
          <v-data-table
                  :headers="header"
                  :items="table"
                  :items-per-page="5"
                  :search="search"
                  :loading="loading"
                  class="elevation-1"
          ></v-data-table>
          </v-card>





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
            loading: false,
            search: '',
            file: null,
            header:[],
            table: [],
            message : store.getters.getMessage,
        }),
        computed: {
            getTable () {
                return store.state.table
            },
            getHeader(){
                return store.getters.header
            }
        },
        // watch: {
        //     count (newCount, oldCount) {
        //         // Our fancy notification (2).
        //         console.log(`We have ${newCount} fruits now, yay!`)
        // },
        created (){
            this.table = store.getters.getJson
            if(this.table.length>0){
                this.header = []
                Object.keys(this.table[1]).forEach(element => this.header.push({text: element, value:element}));
            }
        },
        methods: {
            log: function (){
                console.log(this.table)
            },
            chooseFiles: function (e) {
                this.file = e.target.files || e.dataTransfer.files;
                // store.commit('setLoading', true)
                Papa.parse(this.file[0], {
                    header: true,
                    complete: (results) => {
                        store.commit("setJson", results.data)
                        this.table = results.data
                        if(this.table.length>0){
                            this.header = []
                            Object.keys(this.table[1]).forEach(element => this.header.push({text: element, value:element}));
                        }
                    }}
                );


            }
        }
    }
</script>