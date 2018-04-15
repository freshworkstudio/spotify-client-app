<script>
  export default {
    props: {
      busy: {
        default: false
      },
      value: {
        type: String,
        default: ""
      }
    },
    computed: {
      listeners() {
        return {
          // Pass all component listeners directly to input
          ...this.$listeners,
          // Override input listener to work with v-model
          input: event => this.$emit("input", event.target.value)
        };
      }
    }
  }
</script>
<template>
    <div>
        <div class="search-box">
            <input
                    placeholder="Buscar"
                    type="text"
                    class="input"
                    :value="value"
                    v-on="listeners"
            >
            <i v-if="busy" class="fa fa-refresh fa-spin" aria-hidden="true"></i>
            <i v-else class="fa fa-search" aria-hidden="true"></i>
        </div>
    </div>
</template>