<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let text: string;
  let id: string;

  const dispatch = createEventDispatcher();
</script>

<div {id} class="container">
  <button class="link" on:click={() => dispatch("click")}>
    <!-- <slot /> -->
    {text}
  </button>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 12px;
    line-height: 1.66667;
  }
  .link {
    box-sizing: border-box;
    display: inline-block;
    border-radius: 4px;
    padding: 13px 16px;
    background-color: #333;
    color: #eee;
    text-decoration: none;
    text-align: center;
    width: 100%;
    transition: 0.2s;
  }
  .link:hover,
  .link:focus {
    opacity: 0.75;
  }
</style>
