<template>
    <footer>
        <p>"Who said it?" game, 2022</p>

        <router-link to="/" class="home-btn">
            <p>Home</p>
            <img src="@/assets/images/home-logo-footer.svg">
        </router-link>
    </footer>
</template>

<script>
    export default {
    name: 'Footer',
    }
</script>

<style scoped>
    footer{
        background-color: var(--primary-color);
        color: var(--light-color);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 24px 40px;
    }
    .home-btn {
        display: flex;
        align-items: center;
        transition: 0.2s ease;
    }
    .home-btn:hover{
        opacity: 0.6;
    }
    .home-btn p {
        margin-right: 16px;
    }
    .home-btn img {
        height: 48px;
    }
    footer > p {
        opacity: 0.6;
        padding-right: 56px;
    }
</style>