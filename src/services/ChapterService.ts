import { take } from 'rxjs/operators'
import { BookService, sendBook } from './BookService'
import { getDate, saveFile } from './OutputService'

export function sendChapter (index:number, chapter: any) :void {
  localStorage.setItem('chapter', chapter)
  localStorage.setItem('chId', index.toString())
  saveBook()
}

function saveBook () {
  BookService.getBook().pipe(<any>take(1)).subscribe(
    (data:any) => {
      data.chapters[parseInt(localStorage.getItem('chId') as any)].data = JSON.parse(localStorage.getItem('chapter') as any)
      data.chapters[parseInt(localStorage.getItem('chId') as any)].lastUpdatedAt = getDate()
      sendBook(data)
      saveFile()
    }
  )
}
