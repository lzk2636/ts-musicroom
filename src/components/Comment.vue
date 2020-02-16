<template>
	<van-dialog
		:value="value"
		@input="$emit('input',$event.target)"
		title="课程评价"
		@cancel="$emit('input',false)"
		show-cancel-button
		@confirm="confirm"
	>
			<div class="score"><span>内容:</span><textarea cols="10" rows="3" v-model="inputValue"></textarea></div>
		<div class="score"><span>评分:</span><Star :isChange="true" @Comment="Comments" /></div>
	</van-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
// import { VanComponent } from 'vant/types/component';
import Star from '@/components/star.vue'
import http from '@/utils/http'
@Component({
	components: {
		Star
	}
})
export default class Comment extends Vue {
	@Prop({ type: Boolean, default: false }) value!: boolean
	@Prop({ type: String, default: 0 }) Course!: string
	inputValue = ''
	score = ''
	@Emit('Comment')
	Comments(s) {
		this.score = s.score
		// console.log(s)
	}
	async confirm() {
		const res = await http({
			url: 'comment/create',
			method: 'POST',
			data: {
				['course_id']: this.Course,
				content: this.inputValue,
				score: this.score
			}
		})
		if (res.data.status === 0) {
      this.$toast(res.data.message)
      this.$emit('input',false)
		}
	}
}
</script>

<style lang="less" scoped>
textarea {
	width: 319px;
	height: 59px;
	border: none;
}
.score{
	display: flex;
	span{
		display: inline-block;
		width: 68px;
    margin-right: 5px;
	}
}
</style>