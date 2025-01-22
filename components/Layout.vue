<template>

  <main class="min-h-screen w-full flex flex-col items-center gap-8 min-h-dvh">
   
    <nav
      v-if="$slots.nav"
      class="shadowed sticky top-0 z-1 w-full flex justify-center bg-white p-4 print:hidden"
    >

      <div class="max-w-360 w-full flex flex-col items-center justify-between gap-2">

        <slot name="nav" />

      </div>

    </nav>

    <nav
      v-if="$slots.homeNav"
      class="shadowed sticky top-0 z-1 w-full flex justify-center bg-white p-4"
    >

      <div class="max-w-360 w-full flex items-center justify-between">

        <slot name="homeNav" />

      </div>

    </nav>

    <section class="max-w-360 w-full flex flex-auto flex-col items-center gap-y-8 px-4">

      <slot name="body" />

    </section>

    <footer
      v-if="$slots.footer"
      class="shadowed w-full flex flex-auto justify-center bg-white p4"
    >

      <div class="max-w-360 w-full flex items-center justify-between">

        <slot name="footer" />

      </div>

    </footer>

  </main>

</template>
