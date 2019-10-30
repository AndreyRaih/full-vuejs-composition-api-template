<template>
  <div :class="$style.main">
    <div :class="$style.description">
      <h1>This page was building with Vue Composition API, and with Stylus in style modules</h1>
      <a :class="$style.link" @click="$router.back()">Go back</a>
      <a :class="$style.link" @click="$router.push('/compositionApi/vuex')">Go to example with Vuex</a>
      <a :class="$style.link" @click="$router.push('/compositionApi/typescript')">Go to example with TypeScript</a>
    </div>
    <div :class="$style.actions">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" module>
.main
  height 100%
  width 100%
  margin: 32px;
  display flex
  flex-direction row
  justify-content center
  align-items center

.description
  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start
  a
    margin-bottom: 4px;

.actions
  margin: 32px;
  width 100%
  border 1px solid #d9d9d9
  border-radius 3px

.link
  color: #41b883;
  opacity: 0.5;
  transition: 0.2s;
  cursor: pointer;
  &:hover
    opacity: 1;
    transition: 0.2s;

</style>