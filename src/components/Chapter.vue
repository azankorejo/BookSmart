<template>
  <div v-if="chapters.length > 0 && chapters[0].name !== ''">
    <div v-if="!showChapters" class="absolute top-0 bg-green-500 w-full p-3 cursor-pointer" @click="toggleChapters()">
        <p class="text-white text-center">Click here to view book Chapters</p>
    </div>
    <div v-else class="absolute top-0 bg-green-500 z-10 w-full p-3 cursor-pointer" @click="toggleChapters()">
        <p class="text-white text-center">Go to book lobby</p>
    </div>
    <div v-if="showChapters" class="scroll-done bg-white h-screen absolute flex gap-x-4 justify-center items-center">
        <div class="flex gap-x-4 w-full">
        <p class="font-bold text-md text-3xl" v-if="showChapters">Select a chapter to edit</p>
          <div v-for="(ch, index) in chapters" :key="index" class="p-20 rounded-sm cursor-pointer" :class="'bg-' + ch.color + '-def'" @click="editChapter(index, ch)">
              <h1 class="text-2xl">{{ ch.name }}</h1>
              <p class="text-sm"><span class="font-bold">Created :</span> {{ ch.createdAt}}</p>
              <p class="text-sm"><span class="font-bold">Last Edited :</span> {{ ch.lastUpdatedAt }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BookService, defaultValue } from '../services/BookService'
import { sendChapter } from '../services/ChapterService'
import { Chapter as IChapter } from '../interfaces/Chapter'
import { Book } from '../interfaces/Book'
@Component
export default class Chapter extends Vue {
  subscription:any;

  chapters: IChapter[] = defaultValue.chapters

  chapterId = 0

  showChapters = false

  mounted () :void {
    this.getChapters()
  }

  public getChapters () :void {
    this.subscription = BookService.getBook().subscribe(
      (data:Book<IChapter>) => {
        this.chapters = data.chapters
        if (localStorage.getItem('chId') !== null) {
          console.log(localStorage.getItem('chId'))
          if (data.chapters[parseInt(localStorage.getItem('chId') as any)] !== undefined) {
            this.$set(this.chapters[parseInt(localStorage.getItem('chId') as any)], 'data', data.chapters[parseInt(localStorage.getItem('chId') as any)].data)
            // console.log('yup i got the chapter', this.chapters[parseInt(localStorage.getItem('chId') as any)])
          }
        }
      }
    )
  }

  public editChapter (index: number, chapter:IChapter) :void {
    this.toggleChapters()
    const data = JSON.stringify(chapter.data)
    sendChapter(index, data)
    this.$router.push('edit')
  }

  toggleChapters () :void {
    this.showChapters = !this.showChapters
  }
}
</script>

<style scoped>
.scroll-done {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.scroll-done::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
