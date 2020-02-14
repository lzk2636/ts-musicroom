<template>
	<div class="course-container">
		<div
			class="course-item"
			v-for="(item, index) in couseres"
			:key="index"
			@click="selectItem(item.id)"
		>
			<img :src="item.icon" @click.stop="ImageUrl(item.icon)" />
			<div class="title">{{item.title}}</div>
			<div class="desc">{{item.subtitle}}</div>
			<button plain size="mini">{{['初级','中级','高级'][item.level-1]}}</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
@Component
export default class CourseList extends Vue {
	@Prop(Array) couseres!: object[]
	ImageUrl(icon: string) {
		// console.log(icon)
		ImagePreview([
			icon
		])
	}
	selectItem(id) {
		this.$router.push('/course-detail/' + id)
	}
}
</script>

<style lang="less" scoped>
.course-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	/* width: 100%; */
	padding: 15px;
}
.course-item {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	padding: 15x;
	text-align: center;
	height: 158px;
	width: 167px;
	margin-bottom: 15px;
	background-color: #fff;
	border-radius: 3px;
}

.course-item img {
	height: 42px;
	width: 52px;
}

.course-item .title {
	font-size: 15x;
	font-weight: 400;
}

.course-item .desc {
	font-size: 10px;
	color: #a8a8a8;
}

.course-item button {
	display: flex;
	/* width: 84rpx;
  height: 24rpx; */
	width: 42px;
	border: 1px solid #ffb57d;
	font-size: 11px;
	border-radius: 5px;
	color: #ffb57d;
	background-color: #fff;
}
</style>