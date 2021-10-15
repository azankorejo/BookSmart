     var editor = new EditorJS({
       /**
        * Wrapper of Editor
        */
       holderId: 'editorjs',
       /**
        * Tools list
        */
       tools: {
         /**
          * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
          */
         underline: Underline,
         raw: RawTool,
         header: {
           class: Header,
           inlineToolbar: ['link'],
           config: {
             placeholder: 'Header'
           },
           shortcut: 'CMD+SHIFT+H'
         },
         /**
          * Or pass class directly without any configuration
          */
          embed: {
           class: Embed,
           config: {
             services: {
               youtube: true,
             }
           }
         },
         image: {
             class: ImageTool,
             config: {
               endpoints: {
                 byFile: 'https://codex.so', // Your backend file uploader endpoint
                 byUrl: 'https://codex.so', // Your backend endpoint for url data fetching

               }
             }
           },
         list: {
           class: List,
           inlineToolbar: true,
           shortcut: 'CMD+SHIFT+L'
         },
         checklist: {
           class: Checklist,
           inlineToolbar: true,
         },
         quote: {
           class: Quote,
           inlineToolbar: true,
           config: {
             quotePlaceholder: 'Enter a quote',
             captionPlaceholder: 'Quote\'s author',
           },
           shortcut: 'CMD+SHIFT+O'
         },
         warning: Warning,
         marker: {
           class:  Marker,
           shortcut: 'CMD+SHIFT+M'
         },
         code: {
           class:  CodeTool,
           shortcut: 'CMD+SHIFT+C'
         },
         delimiter: Delimiter,
         inlineCode: {
           class: InlineCode,
           shortcut: 'CMD+SHIFT+C'
         },

          linkTool: {
           class: LinkTool,
           config: {
             endpoint: 'https://codex.so', // Your backend endpoint for url data fetching
           }
         },

         embed: Embed,
         table: {
           class: Table,
           inlineToolbar: true,
           shortcut: 'CMD+ALT+T'
         },
          personality: {
           class: Personality,
           config: {
             endpoint: 'https://codex.so', // Your backend endpoint for url data fetching
           }
         }
       },


       data:  localStorage.getItem('chapter') !== null ? JSON.parse(localStorage.getItem('chapter')) : {},

       onChange: function() {
        editor.save().then((savedData) => {
        localStorage.setItem('chapter', JSON.stringify(savedData))
        //  if (document.getElementById('showJson') !== null) document.getElementById('showJson').innerHTML=JSON.stringify(savedData);
       });
       },

     });
    //  saveButton.addEventListener('click', function () {
    //   editor.save().then((savedData) => {
    //     HtmlToJson(savedData);
    //     localStorage.setItem('chapter', JSON.stringify(savedData))
    //     json.innerHTML= JSON.stringify(savedData);
    //   });
    // });
