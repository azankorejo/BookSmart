<template>
  <div>
    <Chapter/>
    <CustomChapterModal ref="customChapterModal" />
    <Modal :open="open" @toggle-modal="toggleModal" />
    <EditChapterModal ref="editChapterModal" />
    <button type="submit" v-if="book.name && book.chapters[0].name" @click="showcase()" class="z-50 rounded-bl-2xl absolute bottom-10 right-10 text-white bg-green-400 py-3 px-5" id="saveButton">
      Showcase Book
    </button>
    <p class="text-sm font-bold">Scroll left and right to select books</p>
    <div class="path-form">
      <button type="submit" v-if="!showPath" @click="showPath = true" class="z-50 text-white bg-green-400 py-1 px-3"> Add Path </button>
      <form class="p-3" v-if="showPath">
        <input type="text" id="path-input" v-model="directory" placeholder="Add Path" class="w-100 py-1">
        <button type="submit" class="z-50 text-white bg-green-400 py-1 px-3" @click="sendPath()"> ✔ </button>
      </form>
    </div>
    <div class="scroll-done mx-20 mt-10">
      <div class="flex justify-center gap-x-4 items-center h-screen w-max">
        <div class="bg-gray-100 p-20 rounded-sm cursor-pointer" @click="toggleModal()">
            <h1 class="text-4xl">+</h1>
        </div>
        <div class="bg-gray-100 p-20 rounded-sm cursor-pointer" @click="getJsonFile()">
          <h1 class="text-2xl">Add Existing</h1>
        </div>
        <div class="p-20 rounded-sm cursor-pointer" :class="color" @click="toggleCutomModal()" v-if="book.name">
          <h1 class="text-2xl">{{ book.name }}</h1>
          <p class="text-sm"><span class="font-bold">Author:</span> {{ book.author }}</p>
          <p class="text-sm"><span class="font-bold">Created :</span> {{ book.createdAt}}</p>
          <p class="text-sm"><span class="font-bold">Last Edited :</span> {{ book.lastUpdatedAt }}</p>
          <p>click to add chapters</p>
        </div>
        <div class="bg-gray-100 p-20 rounded-sm cursor-pointer" @click="deleteChapter()" v-if="book.name">
          <h1 class="text-2xl">Delete Chapters</h1>
        </div>
        <div class="bg-gray-100 p-20 rounded-sm cursor-pointer" @click="toggleEditChapterModal()" v-if="book.name">
          <h1 class="text-2xl">Edit Chapters</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import Modal from '../components/Modal.vue'
import { BookService, defaultValue, sendBook } from '../services/BookService'
import { Book as IBook } from '../interfaces/Book'
import { Chapter as IChapter } from '../interfaces/Chapter'
import Chapter from '../components/Chapter.vue'
import CustomChapterModal from '../components/CustomChapterModal.vue'
import EditChapterModal from '../components/EditChapterModal.vue'
import { LoaderService } from '../services/LoaderService'
import { first } from 'rxjs/operators'
@Component({
  components: {
    Modal,
    Chapter,
    CustomChapterModal,
    EditChapterModal
  }
})
export default class Book extends Vue {

  $refs!: {
    customChapterModal: any,
    editChapterModal: any,
  };

  showPath: boolean = false

  open = false

  subscription:any;

  book: IBook<IChapter> = defaultValue

  color = ''

  directory:string = ''

  mounted () :void {
    const book  = JSON.parse(localStorage.getItem('book') as any)
    if (book !== null) sendBook(book)
    this.getData()
  }

  public sendPath() {
    if (!this.directory) {
      return;
    }
    this.showPath = false
    BookService.getBook().pipe(first()).subscribe(
      (data:IBook<IChapter>) => {
        let book =  data
        data.directory = this.directory
        sendBook(book)
      }
    )
  }

  public showcase () :void {
    this.$router.push('/show')
  }

  public toggleEditChapterModal () :void {
    this.$refs.editChapterModal.toggleModal()
  }

  public toggleModal () :void {
    this.open = !this.open
  }

  public toggleCutomModal () :void {
    this.$refs.customChapterModal.toggleModal()
    this.$refs.customChapterModal.changeStep(1)
  }

  public deleteChapter () :void {
    this.$refs.customChapterModal.toggleModal()
    this.$refs.customChapterModal.changeStep(2)
  }

  public getJsonFile () :boolean {
    LoaderService.sendLoader(true)
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()
    document.body.appendChild(input) // required for firefox
    input.onchange = function (file:any) {
      if (!file) return false
      var fr = new FileReader()
      fr.onload = function (e:any) {
        var result = JSON.parse(e.target.result)
        sendBook(result)
        setTimeout(function () {
          input.remove()
        }, 0)
      }
      fr.onloadend = function (e:any) {
        LoaderService.sendLoader(false)
      }
      fr.onabort = function (e:any) {
        LoaderService.sendLoader(false)
      }
      fr.readAsText(file.target.files[0])
    }
    this.getData()
    return true
  }

  public getData () :void {
    this.subscription = BookService.getBook().subscribe(
      (data:IBook<IChapter>) => {
        this.book = data
        this.color = 'bg-' + data.color + '-100'
      }
    )
  }
}
</script>
<style scoped>
.scroll-done {
  height: auto;
  max-height: 80vh;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
.path-form {
  margin-top: 1.7rem;
}
.scroll-done::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
