<template>
  <i class="fa" :class="`icon-${name}`" aria-hidden="true" />
</template>

<script>
import './style/font-icons.min.css'
export default {
  name: 'JIcon',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
