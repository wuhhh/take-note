<template>
  <div :class="{ showing_note_entry: show_note_entry }" id="app">
    <Notes />
    <NewNote />
    <NoteEntry v-show="show_note_entry" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Notes from "./components/Notes.vue";
import NewNote from "./components/NewNote.vue";
import NoteEntry from "./components/NoteEntry.vue";
import store from "./store";
import { mapState } from "vuex";

@Component({
  components: {
    Notes,
    NewNote,
    NoteEntry
  },
  computed: {
    ...mapState(["show_note_entry"])
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0.5em 0;
}
</style>
