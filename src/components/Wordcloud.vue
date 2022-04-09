<template>
      <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="false"
      :wordClick="wordClickHandler">
      </wordcloud>
</template>

<script>
import wordcloud from 'vue-wordcloud'

export default {
  name: 'Wordcloud',
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    }
  },
  props: {
      defaultWords: Array,
  },
  data() {
    return {
      myColors: ['#64688C', '#953B54', '#EA823B'],
    }
  }
}
</script>

<style scoped>
.tooltip {
    display: none;
}
</style>