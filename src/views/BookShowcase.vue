<template>
  <div v-if="book.name">
      <button type="submit" v-if="book.chapters[0].name !== '' && !printing" @click="exportToPDF()" class="z-50 rounded-bl-2xl absolute bottom-10 right-10 text-white bg-green-400 py-3 px-5" id="saveButton">
        Export PDF
      </button>
      <div class="flex p-4 bg-gray-100">
          <router-link to="/" v-if="!printing"><span class="text-sm">Go Back</span> </router-link>
          <div class="flex justify-center w-full items-center">
              <div class="text-xl font-bold">{{ book.name }} - {{ book.author }}</div>
          </div>
      </div>
      <div v-html="parsedBook" class="p-4" id="print"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BookService, defaultValue, sendBook } from '../services/BookService'
import { Book as IBook } from '../interfaces/Book'
import { Chapter as IChapter } from '../interfaces/Chapter'
import { take } from 'rxjs/operators'
import { JsonToHtml } from '@/services/OutputService'
import { LoaderService } from '@/services/LoaderService'
@Component
export default class BookShowcase extends Vue {
  book: IBook<IChapter> = defaultValue
  parsedBook = ''
  printing = false

  mounted () :void{
    this.setAndGetData()
  }

  public setAndGetData () :void {
    const book = JSON.parse(localStorage.getItem('book') as any)
    if (book !== null) sendBook(book)
    BookService.getBook().pipe(take(1)).subscribe(
      (data:IBook<IChapter>) => {
        this.book = data
        this.parsedBook = JsonToHtml(data.chapters)
      }
    )
  }

  public exportToPDF () :void {
    this.printing = true
    window.print()
    this.printing = false
  }
}
</script>
<style>
</style>

function html2pdf(element: HTMLElement|null) {
  throw new Error('Function not implemented.')
}
