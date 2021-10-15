<template>
  <div v-if="book.chapters.length > 0 && book.chapters[0].name !== ''">

    <div  v-if="open" class="absolute top-0 flex h-screen w-full justify-center items-center">
  <div class="p-10 rounded-lg w-1/3 bg-white rounded-lg">
   <div class="flex flex-col">
       <div class="flex justify-between">
            <h6 class="font-bold mb-3">Edit Chapters</h6>
            <h6 class="font-bold mb-3 cursor-pointer" @click="toggleModal()">X</h6>
       </div>
        <div>
            <label>Select Chapter to edit :</label>
            <select v-model="chapterId" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
              <option v-for="(ch,index) in book.chapters" :key="index" :value="index">{{ ch.name }}</option>
            </select>
        </div>
        <div>
            <label>Change Chapter Name :</label>
            <input type="text" v-model="ChapterName" placeholder="Harry Potter" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
        </div>
        <div>
            <label>Change Chapter Position :</label>
            <select v-model="position" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
              <option v-for="(ch,index) in book.chapters" :key="index" :value="index">{{ ch.name }}</option>
            </select>
        </div>
        <div class="my-3"></div>
        <button type="submit" @click="saveData()" class="bg-blue-500 rounded-md px-5 py-3 font-bold text-white">Save</button>
   </div>
  </div>
  </div>

</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Modal from '../components/Modal.vue'
import { BookService, defaultValue, sendBook } from '../services/BookService'
import { Book as IBook } from '../interfaces/Book'
import { Chapter as IChapter } from '../interfaces/Chapter'
@Component
export default class EditChapterModal extends Vue {
  open = false

  ChapterName = ''

  position = -1

  chapterId = -1

  subscription: any

  book:IBook<IChapter> = defaultValue

  mounted () :void {
    this.getChapters()
  }

  public getChapters () :void {
    this.subscription = BookService.getBook().subscribe(
      (data:IBook<IChapter>) => {
        this.book = data
      }
    )
  }

  public toggleModal () :void {
    this.open = !this.open
  }

  public saveData () :void {
    if (this.ChapterName) this.book.chapters[this.chapterId].name = this.ChapterName
    if (this.position >= 0 && this.chapterId >= 0) {
      const chapter = this.book.chapters[this.chapterId]
      this.book.chapters.splice(this.chapterId, 1, this.book.chapters[this.position])
      this.book.chapters.splice(this.position, 1, chapter)
    }
    this.ChapterName = ''
    this.position = -1
    this.chapterId = -1
    sendBook(this.book)
    this.toggleModal()
  }

  beforeDestroy () :void {
    this.subscription.unsubscribe()
  }
}
</script>
