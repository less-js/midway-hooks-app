<template>
  <a v-if="props.externalLink" :href="props.externalLink" target="_blank" rel="noreferrer">
    <slot></slot>
  </a>
  <router-link v-else :to="props.to" :replace="props.replace">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  externalLink?: string
  to?: string
  replace?: {
    type: boolean
    default: false
  }
}>()
</script>

<style scoped lang="scss"></style>
