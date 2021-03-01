<script lang="ts">
  import type {
    ExtendedTemplateNode,
    InlineComponentNode,
    TextNode,
  } from "../nodes";
  import FaChevronRight from "svelte-icons/fa/FaChevronRight.svelte";
  import FaChevronDown from "svelte-icons/fa/FaChevronDown.svelte";
  import produce from "immer";
  import ElementTreeNode from "./ElementTreeNode.svelte";
  import TextBlockNode from "./TextBlockNode.svelte";
  import ImageBlockNode from "./ImageBlockNode.svelte";
  import ButtonBlockNode from "./ButtonBlockNode.svelte";

  import { getTreeContext } from "./ElementTree.svelte";

  export let node: InlineComponentNode;
  export let defaultOpened: boolean = true;
  export let onUpdate: (newAst: ExtendedTemplateNode) => void;

  let opened = defaultOpened;
  let onClickOpenToggle = () => {
    opened = !opened;
  };

  const updateChildHandler = (idx: number) => (
    newChild: ExtendedTemplateNode
  ) => {
    // console.log("update index", node, idx);
    const newNode = produce(node, (draft) => {
      // @ts-ignore
      draft.children[idx] = newChild;
    });
    onUpdate(newNode);
  };

  const updateAttributeHandler = (idx: number) => (
    newChild: ExtendedTemplateNode
  ) => {
    // console.log("update attr", node, idx);

    const newNode = produce(node, (draft) => {
      // @ts-ignore
      draft.attributes[idx] = newChild;
    });
    onUpdate(newNode);
  };

  const onUpdateText = (ev: any) => {
    if (ev.target instanceof HTMLInputElement) {
      // console.log("update text", node, ev.target.value);
      // @ts-ignore
      const newNode = {
        ...node,
        data: ev.target.value,
        raw: undefined as any,
      } as TextNode;
      onUpdate(newNode);
    }
  };

  const { editMode } = getTreeContext();
</script>

{#if node.name === "Router"}
  {#each node.children as child, idx}
    <div style="width: 100%">
      <ElementTreeNode node={child} onUpdate={updateChildHandler(idx)} />
    </div>
  {/each}
{:else if node.name === "Route"}
  <span>
    Page
    <ElementTreeNode
      node={node.attributes[0]}
      onUpdate={updateAttributeHandler(0)}
    />
  </span>

  {#each node.children as child, idx}
    <div style="width: 100%">
      <ElementTreeNode node={child} onUpdate={updateChildHandler(idx)} />
    </div>
  {/each}
{:else if node.name === "TextBlock"}
  <TextBlockNode {node} {onUpdate} />
{:else if node.name === "ImageBlock"}
  <ImageBlockNode {node} {onUpdate} />
{:else if node.name === "ButtonBlock"}
  <ButtonBlockNode {node} {onUpdate} />
{:else if node.name === "Flex" && $editMode === "prop"}
  {#each node.children as child, idx}
    <div style="width: 100%">
      <ElementTreeNode node={child} onUpdate={updateChildHandler(idx)} />
    </div>
  {/each}
{:else}
  <div class="inline-flex">
    <button
      class="w-4 h-4 grid place-items-center"
      on:click={onClickOpenToggle}
    >
      {#if opened}
        <FaChevronDown />
      {:else}
        <FaChevronRight />
      {/if}
    </button>
    &nbsp;
    <div class="grid place-items-center">
      <h1>{node.name}</h1>
    </div>
  </div>
  <!-- {#each node.attributes as attr, i}
  <ElementTreeNode node={attr} onUpdate={updateAttributeHandler(i)} />
  &nbsp;
{/each} -->
  {#if opened}
    <div class="pl-4">
      {#each node.children as child, i}
        <div style="width: 100%">
          <ElementTreeNode node={child} onUpdate={updateChildHandler(i)} />
        </div>
      {/each}
      <!-- <div>
      <button class="w-4 h-4"><FaPlus /></button>
    </div> -->
    </div>
  {/if}
{/if}
