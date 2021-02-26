<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import {
    Router,
    Route,
    Modal,
    Box,
    Text,
    Button,
    Image,
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
      <Box dir="column" style="width: 300px; height: 300px; background: wheat;">
        <Box style="height: 32px; background: #aaa">
          <button on:click={() => router.push("/")}> Index </button>
          <button on:click={() => router.push("/about")}> About </button>
        </Box>
        <Box style="height: 150px; background: #bbb">
          <Image src="https://i.imgur.com/nAnqC.jpg" />
        </Box>
        <Box style="flex: 1; background: #aba">
          <Box style="flex: 1">
            <Text text="c-1" />
          </Box>
          <Box style="flex: 1; background: #dbd">
            <Text text="c-2" />
          </Box>
        </Box>
        <Box style="height: 50px; background: #ccc">
          <Button text="Next" />
        </Box>
      </Box>
    </Modal>
  </Route>
  <Route path="/about">
    <Modal {opened} on:close={close} fog={true}>
      <div transition:fade>
        <Box
          dir="column"
          style="width: 300px; height: 300px; background: wheat;"
        >
          <Box style="height: 50px; background: #aaa">
            <button on:click={() => router.push("/")}> Index </button>
            <button on:click={() => router.push("/about")}> About </button>
          </Box>
          <Box style="height: 100px; background: #ccc">b</Box>
          <Box style="flex: 1; background: #aba">
            <Box style="flex: 3">c-1</Box>
            <Box style="flex: 1; background: #dbd">c-2</Box>
          </Box>
          <Box style="height: 50px; background: #999">d</Box>
        </Box>
      </div>
    </Modal>
  </Route>
</Router>
