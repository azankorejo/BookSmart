import { BehaviorSubject } from 'rxjs'
// import { takeUntil } from 'rxjs/operators'
import { Book } from '../interfaces/Book'
import { Chapter } from '../interfaces/Chapter'

/* eslint-disable */

export const defaultValue =
    {
      id: '',
      name: '',
      color: '',
      author: '',
      isSaved: false,
      createdAt: '',
      lastUpdatedAt: '',
      chapters: [
        {
          id: '',
          name: '',
          color: '',
          data: JSON,
          createdAt: '',
          lastUpdatedAt: '',
        }
      ]
    }

const $subject = new BehaviorSubject<Book<Chapter>>(defaultValue)

export const BookService = {
  clearBook: ()  => $subject.next(defaultValue),
  getBook: ()  => $subject.asObservable()
}
export function sendBook (book: Book<Chapter>) :void {
  $subject.next(book)
  localStorage.setItem('book',JSON.stringify(book))
}