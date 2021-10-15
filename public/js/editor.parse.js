function HtmlToJson(json){
	var html = '';
	json.blocks.forEach(function(block) {
	  switch (block.type) {
	    case 'header':
	      html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
	      break;
	    case 'paragraph':
	      html += `<p>${block.data.text}</p>`;
	      break;
	    case 'delimiter':
	      html += '<br />';
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
	      html += '<ul>';
	      block.data.items.forEach(function(li) {
	        html += `<li>${li}</li>`;
	      });
	      html += '</ul>';
	      break;
	    case 'raw':
	      html += `${block.data.html}`;
	      break;
	      case 'checklist':
	       block.data.items.forEach(function(checkbox) {
	        html += `<p><input type="checkbox" class="form-control" ${checkbox.checked == true?"checked":"" }>${checkbox.text}</p>`;
	      });
	      break;
	      case "quote":
	      html += `<blockquote class="blockquote"><p class="mb-0">${block.data.text	}</p></blockquote> - ${block.data.caption}`;
	      break;
	      case "warning":
	      html += `<div class="px-4 pt-2 pb-1" style="color: #ffffff;background-color: #ff4b4be3;border-radius: 30px;"><p><b>${block.data.title}&nbsp;-&nbsp;</b>${block.data.message}</p></div>`;
	      break;
	      case "code":
	      html += `<div class="p-3 bg-light shadow-sm" style="border=radius:10px;"><code>${block.data.code}</code></div>`;
	      break;
	      case 'table':
	        html += `<div class="table table-responsive-md"><table class="table table-bordered"><tbody>`
	       block.data.content.forEach(function(row) {
	        html +=`<tr>`;
	       	    row.forEach(function(td) {
		        	html +=`<td >${td}</td>`;
		      	});
	        html +=`</tr>`;

	      	});
	        html +=`</tbody></table></div>`;
	      break;
	      case 'personality':
	       	html += `<div class="row p-3" style="border:1px solid lightgrey;border-radius:5px"><div class="col-md-8"><p class="mb-1"><b>${block.data.name}</b></p><p class="mb-1" style="color:grey">${block.data.description}</p><p><a style="color:grey" class="text-decoration-none" href="${block.data.link}" target="_blank">${block.data.link}</a></p></div><div class="col-md-2 mt-2"><div><img src="${block.data.photo}" class="personality_picture" width="150"></div></div></div>`;
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
	});
}