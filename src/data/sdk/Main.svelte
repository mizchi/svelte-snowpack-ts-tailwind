<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import {
    Router,
    Route,
    Modal,
    Flex,
    TextBlock,
    ButtonBlock,
    ImageBlock,
    initMemoryRouter,
  } from "./components/index";
  // @ts-ignore
  const router = initMemoryRouter("/");
  let opened = true;
  let close = () => {
    opened = false;
  };
  onMount(() => {});
</script>

<Router {router}>
  <Route path="/">
    <Modal {opened} on:close={close} fog={false}>
      <Flex
        dir="column"
        style="width: 300px; height: 300px; background: wheat;"
      >
        <Flex style="height: 32px; background: #aaa">
          <ButtonBlock
            id="top-left"
            text="Index"
            on:click={() => router.push("/")}
          />
          <ButtonBlock
            id="top-right"
            text="About"
            on:click={() => router.push("/about")}
          />
        </Flex>
        <Flex style="height: 150px; background: #bbb">
          <ImageBlock id="image" src="https://i.imgur.com/nAnqC.jpg" />
        </Flex>
        <Flex style="flex: 1; background: #aba">
          <Flex style="flex: 1">
            <TextBlock id="left">XXX</TextBlock>
          </Flex>
          <Flex style="flex: 1; background: #dbd">
            <TextBlock id="right">YYY</TextBlock>
          </Flex>
        </Flex>
        <Flex style="height: 50px; background: #ccc">
          <ButtonBlock id="bottom-button" text="Next" />
        </Flex>
      </Flex>
    </Modal>
  </Route>
  <Route path="/about">
    <Modal {opened} on:close={close} fog={true}>
      <div transition:fade>
        <Flex
          dir="column"
          style="width: 300px; height: 300px; background: wheat;"
        >
          <Flex style="flex:1; background: #999">
            <ButtonBlock
              id="top-left"
              text="Back"
              on:click={() => router.push("/")}
            />
          </Flex>
        </Flex>
      </div>
    </Modal>
  </Route>
</Router>
