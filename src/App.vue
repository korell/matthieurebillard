<template>
  <div class="Page" ref="page">
    <div class="Page-bg">
      <div class="Page-bg-img" data-parallax-component="bg"></div>
      <cite>Photo de <a href="https://unsplash.com/@justatony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Tony Litvyak</a></cite>
    </div>
    <div class="Page-content">
      <h1>Matthieu Rébillard</h1>
      <h2>Développeur front-end senior</h2>
      <div class="Page-city">Nantes</div>
      <a href="https://www.linkedin.com/in/matthieurebillard/" target="_blank" class="Page-cta">
        <img src="/logo-linkedin.svg" alt="logo LinkedIn" width="50"/>
      </a>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {Parallax} from "./services/Parallax";

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
}
setVh()
window.addEventListener('resize', setVh)


const page = ref(null)

onMounted(() => {
  new Parallax(page.value)
})

</script>

<style scoped lang="scss">
.Page {
  position: relative;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: calc(var(--vh) * 100);
  background-color: var(--color-black);
  overflow: hidden;

  &-bg {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
    position: absolute;
    z-index: 1;
    inset: 0;
    opacity: 0;

    --opacity: 0.5;

    animation: fadeIn 10000ms forwards;

    cite {
      position: relative;
      z-index: 2;
      font-size: 1.6rem;
    }
  }

  &-bg-img {
    --scale-ratio: 1;
    --offset-x: 0;
    --offset-y: 0;

    position: absolute;
    z-index: 1;
    inset: 0;

    background-image: url('/bg-desktop-dark-1600-1300.jpg');
    background-size: cover;
    will-change: transform;


    @media (prefers-reduced-motion: no-preference){
      transform:
          translate3d(var(--offset-x), var(--offset-y), 0)
          scale(var(--scale-ratio));
    }


    @media screen and (-webkit-min-device-pixel-ratio: 1.5),
    screen and (min-resolution: 1.5dppx) {
      background-image: url('/bg-desktop-dark-3200-2600.jpg');
    }

    @media screen and (max-aspect-ratio: 1/1) {
      background-image: url('/bg-mobile-dark-700-1200.jpg');
      background-position-x: center;
    }

    @media screen and (-webkit-min-device-pixel-ratio: 1.5) and (max-aspect-ratio: 1/1),
    screen and (min-resolution: 1.5dppx) and (max-aspect-ratio: 1/1) {
      background-image: url('/bg-mobile-dark-1400-2400.jpg');
    }
  }

  &-content {
    position: relative;
    z-index: 2;
    text-align: center;

    & > * {
      opacity: 0;
      transform: translateY(-0.5rem);
      animation-name: fadeIn, slideDown;
      animation-duration: 2000ms, 1000ms;
      animation-fill-mode: forwards;
    }

    h1 {
      font-size: clamp(3rem, 15vw, 6.4rem);
    }

    h2 {
      //font-size: 4rem;
      font-size: clamp(2.5rem, 8vw, 3.5rem);
      margin-top: 1rem;
      animation-delay: 300ms;
    }

  }
  &-city {
    font-size: 2rem;
    margin-top: 2.5rem;
    animation-delay: 600ms;
  }

  &-cta {
    display: block;
    width: 4rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 7rem;
    animation-delay: 900ms;

    img {
      transition: transform 300ms;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: var(--opacity, 1);
    }
  }

  @keyframes slideDown {
    to {
      transform: translateY(0);
    }
  }
}
</style>
