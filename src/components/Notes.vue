<template>
  <div>
    <div class="notes">
      <Note v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Note from "@/components/Note.vue";
import store from "@/store";
import { mapState, mapGetters } from "vuex";

@Component({
  components: {
    Note
  },
  computed: {
    ...mapState(["notes"])
  }
})
export default class Notes extends Vue {}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
