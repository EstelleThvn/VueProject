<template>
    <div class="button">
        <div>
            <h3>{{text}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'Button',
    props: {
        text: String,
    }
    }
</script>

<style scoped>
    .button{
        width: fit-content;
        overflow: hidden;
        
    }

    .button > div {
        background-color: #953B54;
        padding: 4px 36px;
        transition: 0.2s ease;
    }
    h3 {
        font-family: "Aniron Bold", sans-serif;
        font-size: 1.125rem;
        transform: translateY(-2px);
        text-transform:lowercase;
        color: #fefeff;
    }

    .button:hover div {
        background-color: #EA823B;
        cursor:pointer;
    }
</style>