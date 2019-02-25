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
  handleNoteClick(id: number) {
    store.dispatch("setNoteToEdit", id);
    store.dispatch("setShowNoteEntry", true);
  }

  /**
   * Set grid-row-end
   */
  setGridRowEnd() {
    // .note--inner height
    let gridGap: number = 15;
    let height: number = (this.$el.children[0] as HTMLElement).offsetHeight;
    console.log(height, gridGap);
    let remainder: number = height / gridGap;
    let gridRowEnd: number = Math.ceil((height + gridGap) / gridGap);

    // Set grid-row-end prop
    (this.$el as HTMLElement).style.gridRowEnd = `span ${gridRowEnd}`;

    // If remainder > 0, ceil the height for a perfect grid
    if (remainder) {
      let heightByGrid: number = height / gridGap;
      this.$el.style.height = Math.ceil(remainder) * gridGap + "px";
    }
  }

  mounted() {
    this.setGridRowEnd();
  }
}
</script>

<style lang="scss" scoped>
.note {
  cursor: pointer;
  width: 100%;

  .note--inner {
    padding: 1em;
    border-radius: 3px;
  }
}
</style>
