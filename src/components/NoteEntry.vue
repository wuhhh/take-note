<template>
  <div
    @click.self="closeEntry()"
    :style="{ backgroundColor: note.colour + '30' }"
    class="overlay"
  >
    <div class="note-entry">
      <textarea
        :style="{ backgroundColor: note.colour }"
        v-model="note.content"
      ></textarea>
      <div class="note-entry--actions">
        <div class="actions--swatches">
          <swatches
            colors="material-light"
            row-length="6"
            shapes="circles"
            show-border
            popover-to="right"
            v-model="note.colour"
            swatch-size="20"
          />
          <span>Choose A Colour</span>
        </div>
        <button @click="saveNote">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { mapState } from "vuex";
import { Note } from "@/interfaces/my-interfaces";

/**
 * Swatches
 * https://saintplay.github.io/vue-swatches/
 */
import Swatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";

@Component({
  components: {
    Swatches
  },
  computed: {
    ...mapState(["notes", "show_note_entry"])
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  }
})
export default class NoteEntry extends Vue {
  note: Note = this.note;
  notes: Note[] = this.notes;

  // Save the note to storage
  saveNote() {
    store.dispatch("saveNote", this.note);
    this.closeEntry();
  }

  // Close the entry modal
  closeEntry() {
    store.dispatch("setShowNoteEntry", false);
    store.dispatch("setEdit", false);
  }
}
</script>

<style lang="scss">
.overlay {
  background: rgba(0, 0, 0, 0.2);
  transition: background-color 300ms ease;
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
  box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.3);
}
.note-entry--actions {
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  .actions--swatches {
    display: flex;
    align-items: center;

    span {
      margin-left: 1em;
    }
  }
}
.note-entry--label {
  padding: 0 1em;
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
  transition: background-color 300ms ease;
}
.actions--swatches .vue-swatches__container {
  transform: translateY(-140%);
}
</style>
