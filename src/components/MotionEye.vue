<template>
  <div class="motion-eye">
    <a :href="link" target="_blank">
      <img alt="MotionEye Logo" height="64" src="../assets/motioneye.svg">
    </a>

    <img height="200" :src="streamLink">
  </div>
</template>

<script>
export default {
  name: 'MotionEye',
  data: () => ({
    link: process.env.VUE_APP_MOTIONEYE,
    streamLink: process.env.VUE_APP_MOTIONEYE_STREAM
  })
}
</script>
