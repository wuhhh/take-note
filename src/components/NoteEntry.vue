<template>
  <div class="overlay">
    <div class="note-entry">
      <textarea></textarea>
      <div class="note-entry--actions">
        <button>Do A Thing</button>
        <button>Do Another Thing</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NoteEntry extends Vue {}
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.note-entry {
  background: #fff;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  max-width: 520px;
  max-height: 700px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.note-entry--actions {
  padding: 1em;
}
textarea {
  background: transparent;
  border: 0;
  padding: 1em;
  margin: 0;
  outline: 0;
  font-size: 2em;
  line-height: 1.6em;
  box-sizing: border-box;
  resize: none;
  width: 100%;
  height: 100%;
}
</style>
