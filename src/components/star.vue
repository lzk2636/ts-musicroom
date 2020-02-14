<template>
	<div class="container">
		<div class="star-bg">
			<img
				src="../assets/images/star_empty@2x.png"
				alt
				v-for="(item, index) in 5"
				:key="index"
				@click="star(index)"
			/>
		</div>
		<div class="star">
			<img
				src="../assets/images/star_fill@2x.png"
				v-for="(item,index) in myScore"
				:key="index"
				@click="star(index)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Star extends Vue {
	@Prop({ type: Number, default: 0 }) score!: number
	@Prop({ type: Boolean, default: false }) isChange!: boolean
	myScore = 0
	created() {
		this.myScore = this.score
	}
	// @Emit('Comments')
	star(index: number) {
		console.log(index)
		if (!this.isChange) {
			return
		}
		this.myScore = index + 1
		this.$emit('Comment', { score: this.myScore })
	}
}
</script>

<style lang="less">
.container {
	position: relative;
	display: flex;
	align-items: center;
	.star-bg,
	.star {
		float: left;
		// vertical-align:

		img {
			width: 15px;
			height: 15px;
		}
	}
	.star {
		position: absolute;
		left: 0;
	}
}
</style>