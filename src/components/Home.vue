<template>
    <div class="homepage">

        <kinesis-container class="scene">
            <img src="@/assets/images/parallax/layer7.png">
            <kinesis-element :strength="20">
                <img src="../assets/images/parallax/layer6.png">
            </kinesis-element>
            <kinesis-element :strength="16">
                <img src="../assets/images/parallax/layer5.png">
            </kinesis-element>
            <kinesis-element :strength="12">
                <img src="../assets/images/parallax/layer4.png">
            </kinesis-element>
            <kinesis-element :strength="8">
                <img src="../assets/images/parallax/layer3.png">
            </kinesis-element>
            <kinesis-element :strength="4">
                <img src="../assets/images/parallax/layer2.png">
            </kinesis-element>

            <img src="@/assets/images/parallax/layer1.png">
            <div class="border"></div>
        </kinesis-container>

        
        <div class="text">
            <h1>Who said it?</h1>
            <p>One movie quote from The Lord of the Ring, and only one answer.</p>
            <p>Guess which character said it!</p>

            <a href="#game">
                <Button text="play" class="btn-play" />
            </a>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Home',
  components: {
    Button,
  }
}
</script>


<style scoped>
    .homepage {
        width:100%;
        height: 100vh;
        background-color: var(--dark-color);
        color: var(--light-color);
    }
    h1 {
        margin-bottom: 12px;
    }
    p {
        color: rgba(254,254,255, .87);
        max-width:400px;
    }
    .text {
        position: absolute;
        bottom: 64px;
        left: 6%;
    }
    .btn-play{
        margin-top: 32px;
    }
    .scene{
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .scene img, .scene div{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        position: absolute;
    }
    .scene p {
        position: absolute;
    }

    .border {
        position: absolute;
        width: 100%;
        height:100%;
        border: 40px solid var(--dark-color);
    }


/* ------------- */
/* MEDIA QUERIES */
/* ------------- */
@media (max-width: 1199.98px) {
    
}

@media (max-width: 991.98px) {
    
}

@media (max-width: 767.98px) {
    .homepage {
        display:flex;
        flex-direction:column;
        overflow: hidden;
    }
    .scene {
        height: 100%;
    }
    .scene img, .scene div{
        object-position: 80% 50%;
    }
    .text {
        position: relative;
        bottom:0;
        left:0;
        margin: 48px 32px;
        margin-top: 0;
    }
    p {
        max-width:unset;
    }
    .border {
        border: 32px solid #12172C;
    }
}

@media (max-width: 575.98px) {
    .border {
        border: 32px solid #12172C;
    }
    .text {
        margin: 48px 24px;
        margin-top: 0;
    }
    .btn-play{
        margin: auto;
        margin-top: 32px;
    }
}
</style>