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
      link() {
        return this.track.external_urls.spotify;
      },
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
                            <a target="_blank" :href="link">{{artist.name}}</a>
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
                            <li class="social-networks">
                                <social-sharing :url="link"
                                                title="The Progressive JavaScript Framework"
                                                description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                                                quote="Vue is a progressive framework for building user interfaces."
                                                hashtags="vuejs,javascript,framework"
                                                twitter-user="vuejs"
                                                inline-template>
                                    <div>
                                        <network network="facebook">
                                            <i class="fa fa-facebook"></i>
                                        </network>
                                        <network network="googleplus">
                                            <i class="fa fa-google-plus"></i>
                                        </network>
                                        <network network="sms">
                                            <i class="fa fa-commenting-o"></i>
                                        </network>
                                        <network network="telegram">
                                            <i class="fa fa-telegram"></i>
                                        </network>
                                        <network network="twitter">
                                            <i class="fa fa-twitter"></i>
                                        </network>
                                        <network network="whatsapp">
                                            <i class="fa fa-whatsapp"></i>
                                        </network>
                                    </div>
                                </social-sharing>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <iframe class="player" :src="'https://open.spotify.com/embed?uri=spotify:track:' + track.id"
                    frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>


        </div>
    </div>
</template>