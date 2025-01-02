<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-auto items-center justify-center gap-2 b-1 px-2 py-1 rounded-lg"
    >
      <span class="i-hugeicons:user" />
      Account
    </button>

    <button
      type="button"
      class="flex flex-auto items-center justify-center gap-2 b-1 px-2 py-1 rounded-lg b-rose text-rose"
      @click="signOut()"
    >
      <span class="i-hugeicons:logout-02" />
      Logout
    </button>
  </div>
</template>
