<script>
    import SearchBox from './components/SearchBox.vue'
    import ResultsList from './components/ResultsList.vue'
    import API from './services/api';

    export default {
      components: {SearchBox, ResultsList},
      data() {
        return {
          searchText: '',
          results: [],
          busy: false,
        }
      },
      methods: {
        search() {
          if (this.busy) return;
          this.busy = true;
          if (this.searchText.length >= 3) {
            API.search(this.searchText)
            .then( response => {
              this.results = response.data.tracks.items;
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

          }
        },
        searchMostPopular() {
          this.searchText = '';
        },
        resetSearch() {
          this.searchText = '';
          this.results = [];
        }
      }
    }
</script>
<template>
    <div>

        <header>
            <h1>Spotify Client</h1>
        </header>
        <div class="app flex-column d-flex justify-content-center align-items-center">
            <div class="search-box-container">
                <search-box :busy="busy" v-model="searchText" @keydown.enter="search"></search-box>
                <div v-if="" class="errors"></div>
                <div class="shortcuts">
                    <ul>
                        <li>
                            <a href="" @click.prevent="searchMostPopular();">Más populares en Chile</a>
                        </li>
                        <li>
                            <a href="" @click.prevent="resetSearch();">Borrar búsqueda</a>
                        </li>
                    </ul>

                </div>
            </div>
            <results-list :busy="busy" :results="results" :class="{'with-results': results.length }"></results-list>
        </div>
    </div>
</template>