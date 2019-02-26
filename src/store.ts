import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/interfaces/my-interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    next_note_id: 8,
    edit_note_id: <null | number>null,
    show_note_entry: false,
    notes: <Note[]>[
      {
        id: 1,
        content:
          "Vue CLI provides built-in TypeScript tooling support. In our next major version of Vue (3.x), we are also planning to considerably improve our TypeScript support with built-in class based components API and TSX support.",
        colour: "#ED9A9B"
      },
      {
        id: 2,
        content:
          "A static type system can help prevent many potential runtime errors, especially as applications grow. That’s why Vue ships with official type declarations for TypeScript - not only in Vue core, but also for vue-router and vuex as well. Since these are published on NPM, and the latest TypeScript knows how to resolve type declarations in NPM packages, this means when installed via NPM, you don’t need any additional tooling to use TypeScript with Vue.",
        colour: "#F290B1"
      },
      {
        id: 3,
        content:
          "Note that you have to include strict: true (or at least noImplicitThis: true which is a part of strict flag) to leverage type checking of this in component methods otherwise it is always treated as any type.",
        colour: "#CD95D6"
      },
      {
        id: 4,
        content:
          "For developing Vue applications with TypeScript, we strongly recommend using Visual Studio Code, which provides great out-of-the-box support for TypeScript. If you are using single-file components (SFCs), get the awesome Vetur extension, which provides TypeScript inference inside SFCs and many other great features.",
        colour: "#B0BEC5"
      },
      {
        id: 5,
        content:
          "Plugins may add to Vue’s global/instance properties and component options. In these cases, type declarations are needed to make plugins compile in TypeScript. Fortunately, there’s a TypeScript feature to augment existing types called module augmentation.",
        colour: "#90CAF9"
      },
      {
        id: 6,
        content:
          "Because of the circular nature of Vue’s declaration files, TypeScript may have difficulties inferring the types of certain methods. For this reason, you may need to annotate the return type on methods like render and those in computed.",
        colour: "#E6EE9C"
      },
      {
        id: 7,
        content:
          "A component’s render output is primarily determined by the props it receives.",
        colour: "#FFE082"
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
    OVERWRITE_NOTE(state, payload: { note: Note; index: number }) {
      let note = payload.note;
      let index = payload.index;
      /**
       * Vue.set required for reactivity.
       * See: https://vuejs.org/v2/guide/list.html#Caveats
       *
       * Notes.vue will not react to state.notes[index] = note;
       */
      Vue.set(state.notes, index, note);
    },
    SET_NOTE_TO_EDIT(state, id: number | null) {
      state.edit_note_id = id;
    },
    DELETE_NOTE_BY_INDEX(state, id: number) {
      Vue.delete(state.notes, id);
    },
    INCREMENT_NEXT_ID(state) {
      state.next_note_id++;
    }
  },
  actions: {
    setShowNoteEntry({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    },
    saveNote({ commit }, note: Note) {
      // Check if note.id exists already
      let exists = this.getters.getNoteByID(note.id);

      if (exists) {
        // Existing note's index in notes array
        let note_index = this.getters.getNoteIndex(exists);
        // Commit using overwrite method
        commit({
          type: "OVERWRITE_NOTE",
          note: note,
          index: note_index
        });
      } else {
        // Commit using save new method
        commit("SAVE_NEW_NOTE", note);
      }

      // Increment next ID 
      commit("INCREMENT_NEXT_ID");
    },
    setNoteToEdit({ commit }, val: number | null) {
      commit("SET_NOTE_TO_EDIT", val);
    },
    deleteNote({ commit }, note_id: number): boolean {
      let exists = this.getters.getNoteByID(note_id);

      if (exists) {
        let note_index = this.getters.getNoteIndex(exists);
        commit("DELETE_NOTE_BY_INDEX", note_index);
        return true;
      }
      else {
        throw new Error(`Couldn't find note with ID ${note_id} in notes array.`);
      }
    },
    incrementNextID({ commit }) {
      commit("INCREMENT_NEXT_ID");
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
    },
    getNextID: state => () => {
      return state.next_note_id;
    }
  }
});
