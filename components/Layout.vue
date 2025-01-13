<template>

  <main class="min-h-screen w-full flex flex-col items-center gap-8 min-h-dvh">

    <slot name="nav" />

    <section class="max-w-360 w-full flex flex-auto flex-col items-center gap-y-8 px-4">

      <slot name="body" />

    </section>

    <slot name="footer" />

  </main>

</template>
