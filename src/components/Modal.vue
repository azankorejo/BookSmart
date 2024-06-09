<template>
<div  v-if="open" class="absolute top-0 flex h-screen w-full justify-center items-center">
  <div class="p-10 rounded-lg w-1/3 bg-white rounded-lg">
   <div class="flex flex-col">
       <div class="flex justify-between">
            <h6 class="font-bold mb-3">Add A Book</h6>
            <h6 class="font-bold mb-3 cursor-pointer" @click="toggleModal()">X</h6>
       </div>
        <div>
            <label>Book Name :</label>
            <input type="text" v-model="bookName" placeholder="Harry Potter" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
        </div>
        <div>
            <label>Book Author :</label>
            <input type="text" v-model="bookAuthor" placeholder="J. K. Rowling" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
        </div>
        <div>
            <label>Book Color :</label>
            <select v-model="bookColor" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
                <option value="gray">Gray</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
            </select>
        </div>
        <div>
            <label>Chapter Name :<small>{ separted by # and to add colors do eg [chapter1=gray] }</small></label>
            <input type="text" v-model="chapters" placeholder="Harry Potter" class="w-full bg-gray-100 p-2 rounded-lg my-2 shadow-md focus:outline-none focus:border-indigo-600">
        </div>
        <div class="my-3"></div>
        <button type="submit" @click="ObjectAsJson()" class="bg-blue-500 rounded-md px-5 py-3 font-bold text-white">Save</button>
   </div>
  </div>

</div>
</template>

<script lang="ts">
import { Chapter } from '@/interfaces/Chapter'
import { Book } from '@/interfaces/Book'
import { makeChaptersArrayObjects, getDate } from '../services/OutputService'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { sendBook } from '@/services/BookService'
@Component
export default class Modal extends Vue {
    @Prop({ default: false }) open! :boolean

    public bookid = 0
    public bookName = ''
    public bookColor = 'gray'
    public bookAuthor = ''
    public bookCreatedAt = ''
    public bookLastUpdatedAt = ''
    public chapters = ''

    @Emit('toggle-modal')
    public toggleModal () :void{
      console.log('emitted')
    }

    public ObjectAsJson () :void{
      this.$router.replace('/')
      const result = this.makeObject()
      sendBook(result)
      this.setDefault()
      this.toggleModal()
    }

    private makeObject () :Book<Chapter> {
      let id = Math.random().toString(36).substr(2)
      id = id + id
      return {
        id: this.bookName + '=' + id,
        name: this.bookName,
        author: this.bookAuthor,
        color: this.bookColor,
        createdAt: getDate(),
        lastUpdatedAt: getDate(),
        chapters: makeChaptersArrayObjects(this.chapters, id)
      }
    }

    private setDefault () :void {
      this.bookid = 0
      this.bookName = ''
      this.bookColor = 'gray'
      this.bookAuthor = ''
      this.bookCreatedAt = ''
      this.bookLastUpdatedAt = ''
      this.chapters = ''
    }
}
</script>

<style>
</style>
