<script>
    import ResultItem from './ResultItem.vue';
    export default {
      components: {ResultItem},
      props: ['results', 'busy']
    }
</script>
<template>
    <div class="result-list">
        <div v-if="busy" class="loading">
            Cargando...
        </div>
        <ul v-else>
            <result-item :key="result.id" v-for="(result, index) in results" :index="index" :result="result"></result-item>
        </ul>
    </div>
</template>