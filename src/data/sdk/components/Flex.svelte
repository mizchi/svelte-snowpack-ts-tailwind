<script lang="ts">
  export let style: string = "";
  export let dir: "column" | "row" = "row";
  export let display: "inline-flex" | "flex" | "grid" = "flex";
  const id = `box_${Math.random().toString(32).substring(2)}`;
</script>

<div
  {id}
  style={`display:${display};
flex-direction: ${dir};
${style}
`}
>
  <slot />
</div>
