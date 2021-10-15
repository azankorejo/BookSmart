<template>
    <button type="submit" id="saveButton" @click="saveFile()" class="z-50 rounded-bl-2xl fixed top-0 right-0 text-white bg-green-400 py-3 px-5">
      &#10004;
    </button>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { sendChapter } from '../services/ChapterService'

@Component
export default class SaveButton extends Vue {
  saveFile () :void {
    sendChapter(parseInt(localStorage.getItem('chId') as string), localStorage.getItem('chapter'))
  }
}
</script>
