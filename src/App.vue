<template>
  <div :class="{ showing_note_entry: show_note_entry }" id="app">
    <Notes />
    <NewNote />
    <NoteEntry v-show="show_note_entry" :noteProp="noteProp" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Notes from "./components/Notes.vue";
import NewNote from "./components/NewNote.vue";
import NoteEntry from "./components/NoteEntry.vue";
import store from "./store";
import { mapState, mapGetters } from "vuex";

@Component({
  data() {
    return {
      edit: false,
      edit_note_id: 2
    };
  },
  components: {
    Notes,
    NewNote,
    NoteEntry
  },
  computed: {
    ...mapState(["show_note_entry", "notes"]),
    noteProp: function() {
      if (this.$data.edit) {
        return store.getters.getNoteByID(this.$data.edit_note_id);
      } else {
        return {
          id: this.notes.length + 1,
          content: "",
          colour: "#B0BEC5"
        };
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
