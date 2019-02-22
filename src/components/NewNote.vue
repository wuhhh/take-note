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

<style lang="scss" scoped></style>
