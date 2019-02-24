<template>
  <div>
    <button @click="showNewNote()">New Note</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component({
  methods: {
    showNewNote: () => {
      store.dispatch("setShowNoteEntry", true);
    }
  }
})
export default class NewNote extends Vue {}
</script>

<style lang="scss" scoped>
button {
  outline:0;
  font-size: 0.9em;
  background: #7ec3ff;
  border: 0px solid black;
  padding: 0.3em 0.8em 0.4em 1.75em;
  border-radius: 5px;
  line-height: 27px;
  font-weight: 400;
  position: relative;
  margin-top: 4vh;
  cursor: pointer;
  transition: background-color 250ms ease;

  &:before {
    content: "+";
    line-height: 0;
    position: absolute;
    top: calc(47% - 0.2em);
    left: 0.5em;
    padding: 0.2em;
    box-sizing: border-box;
    color: white;
  }

  &:hover {
    background: saturate(darken(#7ec3ff, 6%), 6%);
  }
}
</style>
