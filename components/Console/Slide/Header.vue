<template>

  <div class="flex items-center gap-2">
    
    <div class="rounded-full size-10 overflow-hidden b-2 b-background">

      <img
        :src="user?.user_metadata.picture"
        :alt="user?.user_metadata.first_name"
      >

    </div>

    <p class="font-bold truncate max-w-48">
      {{ user?.user_metadata.name }}
    </p>

  </div>

</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script>
