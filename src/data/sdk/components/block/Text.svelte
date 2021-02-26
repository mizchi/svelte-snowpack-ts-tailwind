<script lang="ts">
  export let text: string;
  const id = `box_${Math.random().toString(32).substring(2)}`;
</script>

<div class="text" {id}>{text}</div>

<style>
  .text {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
