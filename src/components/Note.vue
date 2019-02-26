<template>
  <div @click="handleNoteClick(note.id)" class="note">
    <div class="note--inner" :style="{ backgroundColor: note.colour }">
      {{ note.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component({
  props: {
    note: {
      type: Object,
      required: true
    }
  }
})
export default class Note extends Vue {
  /**
   * Note click handler
   */
  handleNoteClick(id: number) {
    store.dispatch("setNoteToEdit", id);
    store.dispatch("setShowNoteEntry", true);
  }

  /**
   * Set grid-row-end and balance note-inner height
   */
  balanceGrid() {
    // .note--inner height
    let note: Element = this.$el;
    let noteInner: Element = this.$el.children[0];
    let gridGap: number = 15; // Hard coded computed grid gap (px)
    let height: number = (noteInner as HTMLElement).offsetHeight;
    let heightByGrid: number = height / gridGap;
    let gridRowEnd: number = Math.ceil((height + gridGap) / gridGap);

    // Set grid-row-end prop on .note
    (note as HTMLElement).style.gridRowEnd = `span ${gridRowEnd}`;

    // ceil height of .note--inner for perfect grid
    (noteInner as HTMLElement).style.height =
      Math.ceil(heightByGrid) * gridGap + "px";
  }

  mounted() {
    this.balanceGrid();
  }
}
</script>

<style lang="scss" scoped>
.note {
  position: relative;
  cursor: pointer;
  width: 100%;

  .note--inner {
    padding: 1em;
    border-radius: 3px;
    box-sizing: border-box;
  }
}
</style>
