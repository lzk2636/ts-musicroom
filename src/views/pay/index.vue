<template>
	<div class="pay-container">
		<van-nav-bar left-arrow @click-left="$router.back()"></van-nav-bar>
		<div class="order-info">
			<img :src="message.imagesUrl" />
			<div class="name">
				<span>{{message.title}}</span>
				<span>永久观看</span>
			</div>
			<div class="price">￥{{message.price}}.00</div>
		</div>
		<div class="pay-style">
			<div>支付方式</div>
			<div class="wx-pay">
				<image src="/static/images/wx_pay_logo@2x.png" alt />
				<div class="name">
					<span>微信支付</span>
					<span>微信安全支付</span>
				</div>
				<img class="select-image" src="../../assets/images/selected@2x.png" alt />
			</div>
		</div>
		<div class="tip">注：该订单不支持退款、提交订单则表示您同意《用户付款协议》</div>
		<div class="bottom">
			<div class="content">
				<span>实付金额</span>
				<span>￥{{message.price}}</span>
				<img @click="orderAndPay" class="pay" src="../../assets/images/wx_pay@2x.png" alt />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import http from '@/utils/http'
@Component
export default class Pay extends Vue {
	message = null
	created() {
		// console.log(this.$route)
		this.message = this.$route.params
	}
	async orderAndPay() {
    //创建订单
    const res= await http({
      url:"order/create",
      method:"POST",
      data:{
        ["course_id"]:this.message.id,
        price:this.message.price,

      }
    })
    if(res.data.status===0){
      // console.log(res)
      this.IcanPay(res.data)
      // this.weixinPay(res.data)
    }
  }
  async IcanPay(item){
    const res = await http({
      url:"order/pay",
      method:"post",
      data:{
       ["order_id"] :item["order_id"]
      }
    })
    if(res.data.status===0){
      this.$toast.success(res.data.message)
      this.$router.back()
    }
    

  }
  async weixinPay(item){
    const res =await http({
      url:"pay/req_unifiedorder",
       method:"post",
      data:{
       ["order_number"] :item["order_number"]
      }
    })
     if(res.data.status===0){
      this.$toast.success(res.data.message)
      // this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.pay-container {
	height: 100%;
	width: 375px;
	.order-info {
		background-color: #ffffff;
		display: flex;
		width: 375px;
		height: 136px;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
		img {
			padding-left: 16px;
			width: 150px;
			height: 100rpx;
		}
		.name {
			align-self: flex-start;
			margin-top: 15px;
			margin-left: 15px;
			flex: 1;
			span :nth-child(1) {
				margin-top: 10px;
				color: #343434;
				font-size: 19px;
				display: block;
				font-weight: bolod;
			}
			span :nth-child(2) {
				margin-top: 10px;
				color: #a8a8a8;
				font-size: 12px;
			}
		}
		.price {
			align-self: flex-end;
			margin-bottom: 15px;
			color: #ee3939;
			font-size: 16px;
			font-weight: bold;
			padding-right: 16px;
		}
	}
	.pay-style {
		width: 375px;
		height: 205px;
		background-color: #ffffff;
		div:nth-child(1) {
			padding-left: 16px;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid#F6F6F6;
			color: #343434;
			font-size: 16px;
		}
		.wx-pay {
			height: 100px;
			align-items: center;
			display: flex;
			// justify-content: space-between;
			image:nth-child(1) {
				padding-left: 16px;
				width: 19px;
				height: 17px;
			}
			.select-image {
				width: 18px;
				height: 18px;
				align-content: flex-end;
				padding-right: 16px;
			}
			.name {
				flex: 1;
				margin-left: 20px;
				span:nth-child(1) {
					color: #333333;
					display: block;
					font-size: 16px;
				}
				span:nth-child(2) {
					color: #a8a8a8;
					font-size: 11px;
					margin-top: 5px;
				}
			}
		}
	}
	.tip {
		position: absolute;
		color: #dbdbdb;
		width: 375px;
		text-align: center;
		font-size: 10px;
		bottom: 140px;
	}
	.bottom {
		width: 375px;
		height: 107px;
		position: fixed;
		bottom: 0;
		.content {
			align-items: center;
			display: flex;
			height: 107px;
			background-color: #fff;
			span:nth-child(1) {
				padding-left: 16px;
				color: #a2a2a2;
				font-size: 12px;
			}
			span:nth-child(2) {
				color: #ee3939;
				font-size: 20px;
				margin-left: 10px;
				font-weight: bold;
			}
			.pay {
				margin-left: 40px;
				width: 164px;
				height: 48px;
			}
		}
	}
}
</style>
