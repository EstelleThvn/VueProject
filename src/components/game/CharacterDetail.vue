<template>
    <div>
        <p>{{detailName}}: </p>
        <p>{{detailInfo}}</p>
    </div>
</template>

<script>
    export default {
      name: 'CharacterDetail',
      props: {
          detailName: String,
          detailInfo: String,
      }
    }
</script>

<style scoped>
div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 6px 0;
}

div p:first-child{
    color: #9F9FAA;
    margin-right: 16px;
}
div p:last-child{
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>