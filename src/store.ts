import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/interfaces/my-interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    edit_note_id: <null | number>null,
    show_note_entry: false,
    notes: <Note[]>[
      {
        id: 1,
        content: "Hello!",
        colour: "grey"
      },
      {
        id: 2,
        content: "What's up yo!",
        colour: "green"
      }
    ]
  },
  mutations: {
    SET_SHOW_NOTE_ENTRY(state, val: boolean) {
      state.show_note_entry = val;
    },
    SAVE_NEW_NOTE(state, note: Note) {
      state.notes.push(note);
    },
    // Payload contains <Note>note and its index
    OVERWRITE_NOTE(state, payload: {note:Note, index:number}) {
      let note = payload.note;
      let index = payload.index;
      /**
       * Vue.set required for reactivity.
       * See: https://vuejs.org/v2/guide/list.html#Caveats
       * 
       * Notes.vue will not react to state.notes[index] = note;
       */
      Vue.set(state.notes, index, note)
    },
    SET_NOTE_TO_EDIT(state, id: number | null) {
      state.edit_note_id = id;
    }
  },
  actions: {
    setShowNoteEntry({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    },
    saveNote({ commit }, note: Note) {
      // Check if note.id exists already
      let exists = this.getters.getNoteByID(note.id);

      if(exists) {
        // Existing note's index in notes array
        let note_index = this.getters.getNoteIndex(exists);
        // Commit using overwrite method
        commit({
          type: 'OVERWRITE_NOTE',
          note: note,
          index: note_index
        });
      } else {
        // Commit using save new method
        commit("SAVE_NEW_NOTE", note);
      }
    },
    setNoteToEdit({ commit }, val: number | null) {
      commit("SET_NOTE_TO_EDIT", val);
    }
  },
  getters: {
    getNoteByID: state => (id: number) => {
      if (state.notes.length > 0) {
        return state.notes.find(note => note.id === id);
      } else {
        return null;
      }
    },
    getNoteIndex: state => (note: Note) => {
      return state.notes.findIndex(n => n.id === note.id);
    }
  }
});
