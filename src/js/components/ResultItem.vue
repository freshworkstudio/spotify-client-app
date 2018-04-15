<script>
    export default {
      props: ['result', 'index'],
      data() {
        return {
          opened: false
        }
      },
      computed: {
        duration() {
          return this.millisToMinutesAndSeconds(this.result.duration_ms);
        }
      },
      methods: {
        openResult() {
          this.opened = true;
        },
        millisToMinutesAndSeconds (millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
      }
    }
</script>
<template>
    <div class="result-item" @click="openResult" :class="{'active': opened}">
        <div class="result-item-index">
            <span>{{index + 1}}</span>
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