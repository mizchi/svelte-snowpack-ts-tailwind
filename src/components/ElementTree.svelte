<script lang="ts">
  import ElementTreeNode from "./ElementTreeNode.svelte";
  import type { ExtendedTemplateNode } from "../nodes";
  export let root: ExtendedTemplateNode;
  export let onUpdate: (newAst: ExtendedTemplateNode) => void;
</script>

<div class="whitespace-nowrap w-full h-full overflow-y-auto font-mono">
  <ElementTreeNode node={root} {onUpdate} />
</div>
