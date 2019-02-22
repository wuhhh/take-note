import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface Note {
  id: number;
  colour: string;
  note: string;
}

export default new Vuex.Store({
  state: {
    show_note_entry: false,
    notes: []
  },
  mutations: {
    SET_SHOW_NOTE_ENTRY(state, val: boolean) {
      state.show_note_entry = val;
    },
    SAVE_NOTE(state, note: Note) {
      state.notes.push(note);
    }
  },
  actions: {
    setShowNoteEntry({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    },
    saveNote({ commit }, note: Note) {
      commit("SAVE_NOTE", note);
    }
  }
});
