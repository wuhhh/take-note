<template>
  <div
    @click.self="closeEntry()"
    :style="{ backgroundColor: note.colour + '30' }"
    class="overlay"
  >
    <div class="note-entry">
      <textarea
        placeholder="Notes..."
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
            swatch-size="24"
          />
          <span>Choose A Colour</span>
        </div>
        <div class="actions--buttons">
          <button
            :disabled="hasContent"
            class="actions--save"
            @click="saveNote"
          >
            Save
          </button>
          <button
            :disabled="!edit_note"
            class="actions--delete"
            @click="deleteNote"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
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
  props: ["edit_note"]
})
export default class NoteEntry extends Vue {
  edit_note: number = this.edit_note;

  // Default note reference
  defaultNote: Note = {
    id: 0,
    colour: "#eeeeee",
    content: ""
  };

  // Note object for binding data
  note: Note = {
    id: this.nextNoteID,
    colour: this.defaultNote.colour,
    content: this.defaultNote.content
  };

  // Watched for edit_note prop
  @Watch("edit_note")
  onEditChanged(val: number | null) {
    if (val) this.setNote(val);
  }

  // Computed next ID property
  get nextNoteID() {
    return store.getters.getNextID();
  }

  // Computed hasContent property
  get hasContent() {
    return this.note.content.length === 0;
  }

  // Save button click handler - save note to storage
  saveNote() {
    store.dispatch("saveNote", this.note);
    this.closeEntry();
    this.resetNote();
  }

  // Delete button click handler
  deleteNote() {
    store.dispatch("deleteNote", this.edit_note);
    this.closeEntry();
    this.resetNote();
  }

  // Reset note data
  resetNote() {
    this.note = {
      id: this.nextNoteID,
      colour: this.defaultNote.colour,
      content: this.defaultNote.content
    };
  }

  // Set note data from stored note
  setNote(id: number) {
    let savedNote = store.getters.getNoteByID(id);

    this.note = {
      id: savedNote.id,
      colour: savedNote.colour,
      content: savedNote.content
    };
  }

  // Close the entry modal
  closeEntry() {
    store.dispatch("setShowNoteEntry", false);
    store.dispatch("setNoteToEdit", null);
    this.resetNote();
  }
}
</script>

<style lang="scss">
.overlay {
  background: rgba(0, 0, 0, 0.2);
  transition: background-color 300ms ease;
  position: fixed;
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
  border-radius: 6px;
  width: 100%;
  height: 100%;
  max-width: 520px;
  max-height: 610px;
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

  .actions--buttons {
  }

  button {
    border: 0;
    font-size: 1.1em;
    transition: color 250ms ease;
    outline: 0;
    cursor: pointer;

    &[disabled="disabled"] {
      color: #a7a7a7;
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
  font-size: 1.6em;
  line-height: 1.4em;
  box-sizing: border-box;
  resize: none;
  width: 100%;
  height: 100%;
  transition: background-color 300ms ease;
  border-radius: 6px 6px 0 0;
}
.actions--swatches .vue-swatches__container {
  transform: translateY(-140%);
}
</style>
