<template>
  <div :class="{ showing_note_entry: show_note_entry }" id="app">
    <Notes />
    <NewNote />
    <NoteEntry v-show="show_note_entry" :note="note" />
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
    ...mapState(["show_note_entry"]),
    note: function() {
      if (store.state.edit) {
        return store.getters.getNoteByID(store.state.edit_note_id);
      } else {
        return store.state.new_note;
      }
    }
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
  color: #000;
  margin: 0.5em 0;
  font-size: 20px;
}
</style>
