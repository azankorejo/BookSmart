<template>
  <div v-if="loader" class="absolute color top-0 flex justify-center block items-center h-screen w-full">
      <img src="@/assets/spinner.png" class="animate-spin" alt="loading">
      <br>
      <p class="font-bold text-sm animate-pulse">Loading...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LoaderService } from '../services/LoaderService'
@Component
export default class Loader extends Vue {
    public loader = false
    public subscription:any

    mounted () :void{
      this.getloader()
    }

    public getloader () :void {
      this.subscription = LoaderService.getLoader()
        .subscribe(
          (data:boolean) => {
            this.loader = data
          }
        )
    }

    beforeDestroy () :void {
      this.subscription.unsubscribe()
    }
}
</script>

<style scoped>
.color {
  background-color: #0000005e;
}
</style>
