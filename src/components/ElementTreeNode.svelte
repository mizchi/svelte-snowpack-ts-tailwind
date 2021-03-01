<script lang="ts">
  import type { ExtendedTemplateNode, TextNode } from "../nodes";
  import FaChevronRight from "svelte-icons/fa/FaChevronRight.svelte";
  import FaChevronDown from "svelte-icons/fa/FaChevronDown.svelte";
  // import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import produce from "immer";
  export let node: ExtendedTemplateNode;
  export let defaultOpened: boolean = true;
  export let onUpdate: (newAst: ExtendedTemplateNode) => void;

  let opened = defaultOpened;
  let onClickOpenToggle = () => {
    opened = !opened;
  };

  const updateChildHandler = (idx: number) => (
    newChild: ExtendedTemplateNode
  ) => {
    console.log("update index", node, idx);
    const newNode = produce(node, (draft) => {
      // @ts-ignore
      draft.children[idx] = newChild;
    });
    onUpdate(newNode);
  };

  const updateAttributeHandler = (idx: number) => (
    newChild: ExtendedTemplateNode
  ) => {
    console.log("update attr", node, idx);

    const newNode = produce(node, (draft) => {
      // @ts-ignore
      draft.attributes[idx] = newChild;
    });
    onUpdate(newNode);
  };

  const updateAttributeValueHandler = (idx: number) => (
    newChild: ExtendedTemplateNode
  ) => {
    console.log("update attr value", node, idx, newChild);

    const newNode = produce(node, (draft) => {
      // @ts-ignore
      draft.value[idx] = newChild;
    });
    onUpdate(newNode);
  };

  const onUpdateText = (ev: any) => {
    if (ev.target instanceof HTMLInputElement) {
      console.log("update text", node, ev.target.value);

      const newNode = {
        ...node,
        data: ev.target.value,
        raw: undefined as any,
      } as TextNode;
      onUpdate(newNode);
    }
  };

  const onUpdateExpression = (newNode: ExtendedTemplateNode) => {
    // @ts-ignore
    onUpdate({ ...node, expression: newNode });
  };
</script>

{#if node.type === "Fragment"}
  <div>
    <div class="p-4">
      {#each node.children as child, i}
        <div style="width: 100%">
          <svelte:self node={child} onUpdate={updateChildHandler(i)} />
        </div>
      {/each}
    </div>
  </div>
{:else if node.type === "Element"}
  {#each node.children as child, idx}
    <svelte:self node={child} onUpdate={updateChildHandler(idx)} />
  {/each}
{:else if node.type === "Attribute"}
  {node.name}=
  {#each node.value as v, idx}
    <svelte:self node={v} onUpdate={updateAttributeValueHandler(idx)} />
  {/each}
{:else if node.type === "InlineComponent"}
  {#if node.name === "Router"}
    {#each node.children as child, idx}
      <div style="width: 100%">
        <svelte:self node={child} onUpdate={updateChildHandler(idx)} />
      </div>
    {/each}
  {:else if node.name === "Route"}
    <span>
      Page
      <svelte:self
        node={node.attributes[0]}
        onUpdate={updateAttributeHandler(0)}
      />
    </span>

    {#each node.children as child, idx}
      <div style="width: 100%">
        <svelte:self node={child} onUpdate={updateChildHandler(idx)} />
      </div>
    {/each}
  {:else if node.name === "Text"}
    <span>- Text </span>
    <span>
      <svelte:self node={node.attributes[0]} onUpdate={onUpdateText} />
    </span>
  {:else if node.name === "Box"}
    {#each node.children as child, idx}
      <div style="width: 100%">
        <svelte:self node={child} onUpdate={updateChildHandler(idx)} />
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
      <svelte:self node={attr} onUpdate={updateAttributeHandler(i)} />
      &nbsp;
    {/each} -->
    {#if opened}
      <div class="p-4">
        {#each node.children as child, i}
          <div style="width: 100%">
            <svelte:self node={child} onUpdate={updateChildHandler(i)} />
          </div>
        {/each}
        <!-- <div>
          <button class="w-4 h-4"><FaPlus /></button>
        </div> -->
      </div>
    {/if}
  {/if}
{:else if node.type === "MustacheTag"}
  {"{"}
  <svelte:self node={node.expression} onUpdate={onUpdateExpression} />
  {"}"}
{:else if node.type === "Identifier"}
  {node.name}
{:else if node.type === "Text"}
  {#if /\s+$/.test(node.data)}
    <!-- No content -->
  {:else}
    <input
      value={node.data}
      on:input={onUpdateText}
      class="rounded border border-gray-200 focus:bg-white focus:outline-none min-w-min"
    />
  {/if}
{:else}
  <!-- unknown: {node.type} -->
{/if}

<style>
  button {
    border: 1px solid black;
    border-radius: 3px;
  }
</style>
