import { Book } from '../interfaces/Book'
import fs from 'fs'
import { BookService, sendBook } from './BookService'
import { take } from 'rxjs/operators'
import { Chapter } from '@/interfaces/Chapter'

/* eslint-disable */


function downloadObjectAsJson (result: Book<Chapter>) :void {
  result.lastUpdatedAt = getDate()
  if(!result.directory) {
    alert('Provide a Directory!!!')
    return;
  }
  const data = JSON.stringify(result, null, 2)
  const directory = result.directory
  console.log(directory + '/' + result.name + '.json');
  fs.writeFile(directory + '/' + result.name + '.json', data, function (err) :void {
    if (err) throw err
    const NOTIFICATION_TITLE = 'Booksmart - Success'
    const NOTIFICATION_BODY = result.name + '.json' + ' File Saved Successfully to ' + directory
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  })
  // const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result))
  // const downloadAnchorNode = document.createElement('a')
  // downloadAnchorNode.setAttribute('href', dataStr)
  // downloadAnchorNode.setAttribute('download', result.name + '.json')
  // document.body.appendChild(downloadAnchorNode) // required for firefox
  // downloadAnchorNode.click()
  // downloadAnchorNode.remove()
}

export function saveFile () :void {
  BookService.getBook().pipe(take(1)).subscribe(
    (data:Book<Chapter>) => {
      if (data.name !== '') {
        downloadObjectAsJson(data)
        sendBook(data)
      }
    }
  )
}

export function makeChaptersArrayObjects (chapters:string, id: string) :Chapter[] {
  const result : any = []
  chapters.split('#').forEach((item:string) => {
    const props = item.split('=')
    result.push(
      {
        id: id,
        name: props[0],
        color: props[1].trim(),
        data: {},
        createdAt: getDate(),
        lastUpdatedAt: getDate()
      })
  })
  return result
}
export function getDate () :string {
  const d = new Date()
  const n = d.toLocaleString([], { hour12: true })
  return n
}


export function JsonToHtml(chapters: any){
	var html = '';
  chapters.forEach((json:any) => {
    if (json.data.blocks !== undefined) {
      html += '<br>'
      json.data.blocks.map((block: any) => {
        html += '<br>'
        switch (block.type) {
          case 'header':
            html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
            break;
          case 'paragraph':
            html += `<p class="pl-4">${block.data.text}</p>`;
            break;
          case 'delimiter':
            html += '<h6  class="text-center">* * *</h6>';
            break;
          case 'image':
            if(block.data.stretched == true && block.data.withBackground == true){
              html += `<div style="background-color:#eee!important"><img style="padding:20px 60px" class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em></div>`;
                break;
            }
            if (block.data.stretched == true) {
            html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
            }else if(block.data.withBackground == true){
              html += `<div class="container" style="background-color:#eee!important"><img style="padding:20px 60px" class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em></div>`;
            }else{
              html += `<div class="container"><img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em></div>`;
            }
            break;
          case 'list':
            html += '<ul class="list-decimal ml-8">';
            block.data.items.forEach(function(li:any) {
              html += `<li>${li}</li>`;
            });
            html += '</ul>';
            break;
          case 'raw':
            html += `${block.data.html}`;
            break;
            case 'checklist':
            block.data.items.forEach(function(checkbox:any) {
              html += `<p class="mx-2"><input type="checkbox" class="form-control" ${checkbox.checked == true?"checked":"" }>${checkbox.text}</p>`;
            });
            break;
            case "quote":
            html += `<blockquote class="italic pl-4"><p class="mb-0">${block.data.text	}</p></blockquote> <span class="font-bold pl-4">- ${block.data.caption}</span>`;
            break;
            case "warning":
            html += `<div class="p-4 bg-red-500 text-white mt-2"><p><b>${block.data.title}&nbsp;-&nbsp;</b>${block.data.message}</p></div>`;
            break;
            case "code":
            html += `<div class="p-3 my-4 bg-black rounded-lg text-white"><code>${block.data.code}</code></div>`;
            break;
            case 'linkTool':
              html += `<p><a style="color:grey" class="text-decoration-none" href="${block.data.link}" target="_blank">${block.data.link}</a></p>`
            break;
            case 'table':
              html += `<table class="table-auto border-collapse"><tbody>`
            block.data.content.forEach(function(row:any) {
              html +=`<tr>`;
                  row.forEach(function(td:any) {
                  html +=`<td >${td}</td>`;
                });
              html +=`</tr>`;
              });
              html +=`</tbody></table>`;
            break;
            case 'personality':
              html += `<div class="row p-3" style="border:1px solid lightgrey;border-radius:5px"><div class="p-3"><p class="mb-1"><b>${block.data.name}</b></p><p class="mb-1" style="color:grey">${block.data.description}</p><p><a style="color:grey" class="text-decoration-none" href="${block.data.link}" target="_blank">${block.data.link}</a></p></div><div class="col-md-2 mt-2"><div><img src="${block.data.photo}" class="personality_picture" width="150"></div></div></div>`;
            break;
            case 'attaches':
            console.log('currently being work on');
          //     setTimeout(function() {
            // 	if (block.data.file.url !== undefined) {
            // 	   html += `<a href="${file.url}" target="_blank">${file.url}</a><p>${file.name}</p><br><p>${file.size}</p>`;
            // 	}
            // }, 3000);
            break;
          default:
            console.log('Undefined Element', block.type);
            break;
        }
      })
    }
  });
  return html
}
