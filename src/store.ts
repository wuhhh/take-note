import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show_note_entry: false,
    notes: [
      {
        id: 1,
        colour: "blue",
        note: "This is the content of my first note!"
      },
      {
        id: 2,
        colour: "green",
        note: "I could just keep making more and more notes!"
      },
      {
        id: 3,
        colour: "yellow",
        note:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis lectus magna, ac ullamcorper diam convallis et. Integer in gravida nisi. Nulla facilisi. Etiam nunc leo, rutrum non sagittis vel, commodo id nulla. Cras facilisis ac lectus sit amet feugiat."
      }
    ]
  },
  mutations: {
    SET_SHOW_NOTE_ENTRY(state, val: boolean) {
      state.show_note_entry = val;
    }
  },
  actions: {
    setLoading({ commit }, val: boolean) {
      commit("SET_SHOW_NOTE_ENTRY", val);
    }
  }
});
