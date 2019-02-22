<template>
  <div class="note">
    <div class="note--inner" :style="{ backgroundColor: note.colour }">{{ note.note }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    note: {
      type: Object,
      required: true
    }
  }
})
export default class Note extends Vue {}
</script>

<style lang="scss" scoped>
.note {
  width: 25%;

  .note--inner {
    margin: 0.5em;
    padding: 1em;
    border-radius: 3px;
  }
}
</style>
