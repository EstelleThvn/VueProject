<template>
  <div class="choice-card">
      <p>{{characterName}}</p>
  </div>
</template>

<script>
export default {
  name: 'Choice',
  props: {
      characterName: String,
  }
}
</script>


<style scoped>

</style>
