import { BehaviorSubject } from 'rxjs'

const $subject = new BehaviorSubject<boolean>(false)

export const LoaderService = {
  sendLoader: (bool: boolean) => $subject.next(bool),
  getLoader: () => $subject.asObservable()
}
