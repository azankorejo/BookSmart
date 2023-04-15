<template>
  <div>
    <router-link to="/?open=chapters">Go back</router-link>
    <Editor></Editor>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Editor from '../components/Editor.vue'
@Component({
  components: {
    Editor
  }
})
export default class Edit extends Vue {
  scripts :string[] = [
    'editor.config.js',
    'editor.parse.js'
  ]

  mounted () :void{
    this.scripts.forEach((element:string) => {
      this.loadScripts(element)
    })
  }

  public loadScripts (element: string) :void {
    const appendDoc : HTMLElement | null = document.getElementById('scripts')
    const scr = document.createElement('script')
    scr.setAttribute('src', `/js/${element}`)
    if (appendDoc) appendDoc.appendChild(scr)
  }
}
</script>
<style>
</style>
