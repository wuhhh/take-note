<template>
  <div :class="{ showing_note_entry: show_note_entry }" id="app">
    <Notes />
    <NewNoteButton />
    <NoteEntry v-show="show_note_entry" :edit_note="edit_note" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Notes from "./components/Notes.vue";
import NewNoteButton from "./components/NewNoteButton.vue";
import NoteEntry from "./components/NoteEntry.vue";
import store from "./store";
import { mapState } from "vuex";

@Component({
  components: {
    Notes,
    NewNoteButton,
    NoteEntry
  },
  computed: {
    ...mapState(["show_note_entry"]),
    edit_note() {
      return store.state.edit_note_id;
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./css/reset.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  margin: 0.75em;
  font-size: 20px;
  line-height: 1.3em;
}
</style>
