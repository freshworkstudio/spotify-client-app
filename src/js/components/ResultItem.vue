<script>
    import router from '../services/router';
    import store from '../services/store';
    import {millisToMinutesAndSeconds} from '../services/helpers';

    export default {
      props: ['result', 'index'],
      data() {
        return {
          shared: store,
          opened: false
        }
      },
      computed: {
        duration() {
          return millisToMinutesAndSeconds(this.result.duration_ms);
        }
      },
      methods: {
        openResult() {
          this.shared.selectedTrack = this.result;
          this.opened = true;
          let track = this.result.id;
          router.push({ name: 'track', params: { track }}) // -> /user/123
        }
      }
    }
</script>
<template>
    <div class="result-item"  @click="openResult" :class="{'active': opened}">
        <div class="result-item-index">
            <span>{{index + 1}}.</span>
        </div>
        <div class="result-item-name">
            <span>{{ result.name }}</span>
            <div class="artists">
                <ul>
                    <li v-for="artist in result.artists">
                        <a target="_blank" :href="artist.external_urls.spotify">{{artist.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="result-item-duration">
            <span>{{ duration }}</span>
        </div>
        <div class="result-item-see-more">
            <i class="fa fa-arrow-right"></i>
        </div>


    </div>
</template>