<script lang="ts">
  export let src: string;
  export let width: string = "auto";
  export let height: string = "auto";
  export let round: boolean = false;
  let id: string = "i";

  $: radius = round ? "50%" : "0";
</script>

<div {id} class="container" style="height: {height}; width: {width};">
  <img
    class="g"
    {src}
    alt="image"
    loading="lazy"
    {width}
    {height}
    style="border-radius: {radius}"
  />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
  }
</style>
