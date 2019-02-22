import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/interfaces/my-interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    edit: <boolean>false,
    edit_note_id: <null | number>null,
    show_note_entry: false,
    new_note: <Note>{
      id:0,
      colour: "pink",
      content: ""
    },
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
    SET_EDIT(state, val: boolean) {
      state.edit = val;
    },
    SET_NOTE_TO_EDIT(state, id: number) {
      state.edit_note_id = id;
    }
  },
  actions: {
    setShowNoteEntry({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    },
    saveNote({ commit }, note: Note) {
      commit("SAVE_NOTE", note);
    },
    setEdit({ commit }, val: boolean) {
      commit("SET_EDIT", val);
    },
    setNoteToEdit({ commit }, val: number) {
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
    }
  }
});
