export default [
  { path: '/', name: 'home', component: require('../components/SearchPage.vue') },
  { path: '/track/:track', name: 'track', component: require('../components/TrackPage.vue')}
]