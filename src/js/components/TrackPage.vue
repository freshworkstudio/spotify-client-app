<script>
  import store from '../services/store';
  import router from '../services/router';
  import API from '../services/api';
  import {millisToMinutesAndSeconds} from '../services/helpers';

  export  default {
    mounted() {
        API.getTrack(this.$route.params.track)
        .then((response) => {
          this.shared.selectedTrack = response.data;
        })
    },
    methods:{
      goBack() {
        router.push({name:'home'});
      }
    },
    computed: {
      duration() {
        return millisToMinutesAndSeconds(this.track.duration_ms);
      },
      track() {
        return this.shared.selectedTrack;
      }
    },
    data() {
      return {
        shared: store
      }
    }
  }
</script>
<template>
    <div class="app track-page flex-column d-flex justify-content-center align-items-center">
        <div v-if="!track">
            <h2>Cargando <i class="fa fa-spin fa-refresh"></i></h2>
        </div>
        <div class="track-detail" v-if="track">
            <div class="image">
                <img :src="track.album.images[0].url" width="100" height="100" alt="">
            </div>
            <div class="info">
                <h1>{{ track.name }}</h1>
                <div class="artists results-item-name">
                    <ul>
                        <li>{{ duration }}</li>
                        <li v-for="artist in track.artists">
                            <a target="_blank" :href="artist.external_urls.spotify">{{artist.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="search-box-container">
                    <div class="shortcuts">
                        <ul>
                            <li>
                                <a href="#" @click.prevent="goBack"><i class="fa fa-arrow-left"></i> Volver</a>
                            </li>
                            <li>
                                <a target="_blank" :href="track.external_urls.spotify">Abrir en Spotify</a>
                            </li>
                        </ul>
                        <iframe class="player" :src="'https://open.spotify.com/embed?uri=spotify:track:' + track.id"
                                frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>

                    </div>
                </div>
            </div>


        </div>
    </div>
</template>