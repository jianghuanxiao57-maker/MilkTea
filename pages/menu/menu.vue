<template>
	<view class="container" v-if="!loading">
		
	</view>

</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useStore } from 'vuex'


onLoad(async () => {
	await init()
})
</script>

<style lang="scss" scoped>

</style>
