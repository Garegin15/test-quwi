<template>
    <div>
      <Header/>
      <Home/>
    </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth'
}
</script>
