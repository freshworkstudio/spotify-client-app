<script>
  import SearchBox from './SearchBox.vue'
  import ResultsList from './ResultsList.vue'
  import API from '../services/api';
  import swal from 'sweetalert';
  import store from '../services/store';

  export default {
    components: {SearchBox, ResultsList},
    data() {
      return {
        shared: store,
        searched: false,
        searchText: '',
        busy: false,
      }
    },
    methods: {
      search() {
        if (this.searchText.length ===0) {
          this.resetSearch();
          return;
        }
        if (this.searchText.length < 3) {
          swal('','Tu búsqueda debe tener al menos tres caracteres.');
          return;
        }

        if (this.busy) return;
        this.busy = true;
        this.searched = true;

        API.search(this.searchText)
        .then( response => {
        this.shared.results = response.data;
        })
        .catch(error => {
        if (error.response.status === 422) {
          swal('', 'Error de validación. ', 'error');
          return;
        }

        swal('', 'Ocurrió un error inesperado. Por favor intenta más tarde.', 'error');
        })
        .then(() => {
        this.busy = false;
      });

      },
      searchMostPopular() {
        this.searchText = 'most_popular';
        this.search();
      },
      resetSearch() {
        this.searched = false;
        this.searchText = '';
        this.shared.results = [];
      }
    }
  }
</script>
<template>
    <div>
        <div class="app flex-column d-flex justify-content-center align-items-center">
            <div class="search-box-container">
                <search-box :busy="busy" @doSearch="search" v-model="searchText" @keydown.enter="search"></search-box>
                <div v-if="!busy && shared.results.length === 0 && searched" class="errors">No se han encontrado resultados</div>
                <div class="shortcuts">
                    <ul>
                        <li>
                            <a href="#" @click.prevent="searchMostPopular">Más populares en Chile</a>
                        </li>
                        <li v-if="searched">
                            <a href="#" @click.prevent="resetSearch">Borrar búsqueda</a>
                        </li>
                    </ul>

                </div>
            </div>
            <results-list :busy="busy" :results="shared.results" :class="{'with-results': shared.results.length }"></results-list>
        </div>
    </div>
</template>