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
.choice-card {
  border: 2px solid #64688C;
  transition: 0.2s ease;
  margin: 12px 0;
  text-align: center;
  width: 100%;
  max-width: 440px;
  position: relative;
}
.choice-card p {
  padding: 16px 32px;
}
.choice-card:hover {
  background-color: rgba(100, 104, 140,0.24);
  cursor: pointer;
}

.winner, .looser {
  pointer-events: none;
  color: #FEFEFF;
}
.winner {
  background-color: #64688C;
}
.winner:hover{
  background-color: #64688C;
}
.looser {
  background-color: #953B54;
  border: 2px solid #953B54;
}
.looser:hover{
  background-color: #953B54;
}
.choice-card p::before {
  content: "";
  position: absolute;
  width: 56px;
  height: 56px;
  background-size: 56px;
  top: 50%;
  right: -24px;
  transform: translate(100%, -50%);
  display: none;
}
.winner p::before {
  background-image: url("../assets/images/check-mark.svg");
  display: block;
}
.looser p::before {
  background-image: url("../assets/images/cross.svg");
  display: block;
}
</style>
