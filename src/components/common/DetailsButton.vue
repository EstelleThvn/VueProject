<template>
    <div class="details-btn">
      <div v-if="!this.showDetails" class="sign"></div>
      <div class="sign"></div>
    </div>
</template>

<script>
    export default {
    name: 'DetailsButton',
    props: {
        showDetails: Boolean,
    }
    }
</script>

<style scoped>
  .details-btn {
    background: var(--primary-color);
    padding: 20px;
    margin-top: 16px;
    position: relative;
    border-radius: 24px;
    transition: .2s ease;
  }
  .details-btn:hover {
    cursor:pointer;
    background: var(--dark-color);
  }
   .details-btn .sign {
    position: absolute;
    background: var(--light-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   }
  .details-btn .sign:first-child {
    width: 4px;
    height: 16px;
  }
  .details-btn .sign:last-child {
    width: 16px;
    height: 4px;
  }

</style>