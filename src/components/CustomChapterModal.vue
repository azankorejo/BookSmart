<template>
<div  v-if="modal" class="absolute top-0 flex h-screen w-full justify-center items-center">
  <div class="p-10 rounded-lg w-1/3 bg-white rounded-lg">
   <div class="flex flex-col">
       <div class="flex justify-between">
            <h6 class="font-bold mb-3">{{ step === 1 ? 'Add': 'Delete'}} Chapters</h6>
            <h6 class="font-bold mb-3 cursor-pointer" @click="toggleModal()">X</h6>
       </div>
       <div v-if="step === 1">
            <div>
                <label>Chapter Name :<small>{ separted by # and to add colors do eg [chapter1=gray] }</small></label>
                <input type="text" v-model="chapters" placeholder="Harry Potter" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
            </div>
            <div class="my-3"></div>
            <button type="submit" @click="ObjectAsJson()" class="bg-blue-500 rounded-md px-5 py-3 font-bold text-white">Save</button>
       </div>
        <div class="my-2"></div>
       <div v-if="step === 2">
            <div>
                <label>Select Chapter to Delete</label>
                <select v-model="chapterId" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
                    <option v-for="(ch,index) in currentBook.chapters" :key="index" :value="index">{{ ch.name }}</option>
                </select>
            </div>
            <div class="my-3"></div>
            <button type="submit" @click="deleteChapter()" class="bg-blue-500 rounded-md px-5 py-3 font-bold text-white">Delete</button>
       </div>
   </div>
  </div>

</div>
</template>

<script lang="ts">
import { Chapter } from '@/interfaces/Chapter'
import { Book } from '@/interfaces/Book'
import { makeChaptersArrayObjects } from '../services/OutputService'
import { BookService, defaultValue, sendBook } from '../services/BookService'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CustomChapterModal extends Vue {
    public chapters = ''
    public modal = false
    public currentBook: Book<Chapter> = defaultValue
    public subscription: any
    public chapterId = 0
    public step = 1

    public toggleModal () :void{
      this.modal = !this.modal
    }

    public getBook () :void {
      this.subscription = BookService.getBook().subscribe(
        (data:Book<Chapter>) => {
          this.currentBook = data
        }
      )
    }

    public deleteChapter () :void {
      this.currentBook.chapters.splice(this.chapterId, 1)
      sendBook(this.currentBook)
      this.toggleModal()
    }

    public ObjectAsJson () :void{
      let id = Math.random().toString(36).substr(2)
      id = id + id
      this.getBook()
      const chapters = makeChaptersArrayObjects(this.chapters, id)
      chapters.map((e:Chapter) => {
        if (e.name !== '') this.currentBook.chapters.push(e)
      })
      sendBook(this.currentBook)
      this.chapters = ''
      this.toggleModal()
    }

    public changeStep (step:number) :void {
      this.step = step
      if (step === 2) this.getBook()
    }
}
</script>
<style>
</style>
