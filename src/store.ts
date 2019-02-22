import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/interfaces/my-interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    SAVE_NOTE(state, note: Note) {
      state.notes.push(note);
    },
    SET_EDIT(state, val: boolean) {},
    SET_NOTE_TO_EDIT(state, id: number) {}
  },
  actions: {
    setShowNoteEntry({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    },
    saveNote({ commit }, note: Note) {
      commit("SAVE_NOTE", note);
    }
  },
  getters: {
    getNoteByID: state => id => {
      if (state.notes.length > 0) {
        return state.notes.find(note => note.id === id);
      } else {
        return null;
      }
    }
  }
});
