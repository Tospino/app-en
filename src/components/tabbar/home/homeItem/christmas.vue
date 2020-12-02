<template>
	<div class="christmas">
		<div class="flex christmas_top" v-show="christmasBg">
			<img class="christmas_black" src="@/assets/img/activity/christmas/christmas_list_back.png" @click="$router.go(-1)" />
			<div class="christmas_heard">Christmas Festival</div>
		</div>
		<!-- 圣诞-绿 -->
		<div class="christmas_tree">
			<div class="christmas_banner">
				<img class="christmas_black" src="@/assets/img/activity/christmas/christmas_list_back.png" @click="$router.go(-1)" />
			</div>
			<div class="christmas_content flex_col_center">
				<div class="head_tilte">
					Trending
				</div>
				<div class="main_shop mt_22">
					<div class="main_shop_box flex flex_warp " :class="{'flex':(christmasFrist.length%3)!==0,'flex_space':(christmasFrist.length%3)===0}">
						<div :class="{'mr_15':idx==0||idx==1 ||idx==3 ||idx==4}" v-for="(christmasItem,idx) in christmasFrist">
							<div class="main_christmas flex_col_center pd_b_40">
								<img  class="main_img"  v-lazy="$webUrl + christmasItem.skuImg" @click="toDetail(christmasItem.skuId)"/>
								<span class="main_text txt_color mt_10">
									<i>{{jn}}</i> {{christmasItem.activityPrice}}
								</span>
								<div class="christmas_btn mt_6">Buy Now</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 圣诞-红 -->
		<div class="christmas_old">
			<div class="christmas_old_img" :class="{christmas_old_fixed:styleFixed==true}">
				<div class="christmas__old_item  flex flex_warp">
					<div class="christmas_old_box" v-for="(tabItem,idx) in christmasTab">
						<img src="@/assets/img/activity/christmas/christmas_list_lable.png" class="tab_click_icon" v-if="arrSelect==idx" />
						<div class="tab_bg tab_bg_r " :class="{'tab_bg_click':arrSelect==idx}" @click="btnTitle(idx)">
							{{tabItem.themeModuleName}}
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="christmas_red_fixed" v-if="styleFixed==true"></div> -->
			<div class="christmas_list_red">
				<div class="christmas_old_content flex_col_center">
					<div class="christmas_old_item" v-for="(christmasOldItem,idxo) in christmasOld ">
						<div class="flex_space box_two">
							<img src="@/assets/img/activity/christmas/christmas_list_first_had.png" class="christmas_old_img" />
							<div class="box_right">
								<div class="title_two">
									<img src="@/assets/img/activity/christmas/christmas_list_lable.png" class="title_two_icon" />
									<span class="title_two_text">Christmas Festival</span>
								</div>
								<div class="text_conter">
									{{christmasOldItem.lable}}
								</div>

								<div class="mt_22 flex">
									<div>
										<del class="text_del">{{jn}} {{christmasOldItem.delet}}</del>
										<div class="text_price txt_color"><i>{{jn}}</i> {{christmasOldItem.delet}}</div>
									</div>
									<div class="christmas_btn mt_22 ml_20">Buy Now</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	// import detailsHeader from "@/multiplexing/detailsHeader";
	// import { productevaluationlistApi } from "@/api/home/commodityDetails";
	import {
		christmasThemeApi,
		christmasThemeategoryApi
	} from "@/api/home/index";
	export default {
		name: "christmas",
		props: {},
		data() {
			return {
				christmasFrist: [],
				christmasTab: [],
				christmasOld: [{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
					{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
					{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
					{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
					{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
					{
						lable: "2020 new bag women's small fragrance rhombus chain bag shoulder bag messenger bag female bag",
						delet: 60.88
					},
				],
				arrSelect: 0,
				christmasBg: false, //圣诞
				styleFixed: false,
				christmasData: {
					page: 1,
					limit: 10,
					moduleId: 0
				},
				christmasPage:{
					page: 1,
					limit: 10,
				}
			};
		},
		computed: {},
		created() {
			this.theme()
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
			// 监听（绑定）滚轮 滚动事件
		},
		watch: {},
		methods: {
			// 点击样式
			btnTitle(key) {
				//  点击后改变样式颜色
				this.arrSelect = key;
			},
			handleScroll() {
				// 页面滚动距顶部距离
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop
				if (scrollTop < 600) {
					this.styleFixed = false
				} else {
					this.styleFixed = true
				}

				if (scrollTop > 10) {
					this.christmasBg = true;
				} else {
					this.christmasBg = false;
				}
			},
			
			// 圣诞专栏
			theme() {
				christmasThemeategoryApi(this.christmasData).then((res) => {
					if(res.code==0){
						this.christmasFrist=res.page.list
					}
				})
				christmasThemeApi(this.christmasPage).then((res) => {
					this.christmasTab=res.page.list
				})
			},
			//跳转详情页
			toDetail(skuId) {
			  this.$router.push({
			    name: "商品详情",
			    query: { skuId: skuId },
			  });
			},
		},
		components: {},
	};
</script>

<style scoped lang="less">
	.mt_10 {
		margin-top: 10px;
	}

	.mt_6 {
		margin-top: 6px;
	}

	.mt_22 {
		margin-top: 22px;
	}

	.pd_b_40 {
		padding-bottom: 40px;
	}

	// 圣诞字体样式
	.txt_color {
		color: #BB2229 !important;
	}

	.tab_bg_r {
		background: url('~@/assets/img/activity/christmas/christmas_list_two_lable.png') no-repeat;
		background-size: 100%;
	}

	.tab_bg_click {
		background: url('~@/assets/img/activity/christmas/christmas_list_two_lableClick.png') no-repeat !important;
		background-size: 100% !important;
	}

	.tab_click_icon {
		width: 50px;
		height: 50px;
		position: absolute;
		z-index: 1;
		top: -20px;
		left: 0;
	}

	.christmas_btn {
		background: #BB2229;
		width: 160px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		color: #fff;
	}

	.christmas_black {
		width: 40px;
		height: 40px;
		position: absolute;
		top: 28px;
		left: 20px;
		// padding: 30px 0px 0px 20px;
	}

	.christmas_top {
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 2;
		height: 88px;
		background-color: #A3030D;
		color: #fff;
		font-size: 34px;

		.christmas_heard {
			text-align: center;
			width: 100%;
		}
	}

	.christmas_old_fixed {
		position: sticky;
		z-index: 1;
		// top: 0;
		top: -82px;
	}

	// .christmas_red_fixed {
	// 	// background-color: #A3030D;
	// }

	.christmas_banner {
		background: url('~@/assets/img/activity/christmas/christmas_list_first_had.png') no-repeat;
		background-size: 100%;
		box-sizing: border-box;
		height: 450px;
		position: relative;
	}

	.christmas_content {
		background: url('~@/assets/img/activity/christmas/christmas_list_first_bg.png') no-repeat;
		background-size: 100%;
		box-sizing: border-box;
		height: 884px;

		.head_tilte {
			background: url('~@/assets/img/activity/christmas/christmas_list_first.png') no-repeat;
			background-size: 100%;
			width: 452px;
			height: 50px;
			margin-top: 32px;
			color: #fff;
			font-size: 26px;
			line-height: 40px;
			text-align: center;
		}

		.main_shop {
			width: 710px;
			height: 724px;
			background: #FFF6EF;
			border: 4px solid #E8A976;
		}

		.main_shop_box {
			box-sizing: border-box;
			padding: 30px 25px;
		}

		.main_christmas {
			width: 210px;
		}

		.main_img {
			width: 210px;
			height: 210px;
		}

		.main_text {
			text-align: center;
			font-size: 30px;
			font-weight: bold;

			i {
				font-size: 20px;
			}
		}
	}

	.christmas_old {
		.christmas_old_img {
			background: url('~@/assets/img/activity/christmas/christmas_list_two_bg.png') no-repeat;
			background-size: 100%;
			height: 420px;
			box-sizing: border-box;
		}

		.christmas__old_item {
			height: 190px;
			width: 100%;
			padding-top: 202px;

		}

		.christmas_old_box {
			padding: 0 20px;
			box-sizing: border-box;
			position: relative;
		}

		.tab_bg {
			width: 210px;
			height: 60px;
			line-height: 58px;
			text-align: center;
			color: #fff;
		}

		.christmas_list_red {
			background-color: #A3030D;
			padding: 40px 16px 40px 16px;

			.christmas_old_content {
				// box-sizing: border-box;
				// height: 1160px;
				background: #FFF6EF;
				border: 4px solid #E8A976;
				// border-top: 0;
				overflow: hidden;
			}

			.christmas_old_item {
				height: 290px;
			}

			.box_two {
				width: 670px;
				border-bottom: 2px solid #E8DDD7;
				box-sizing: border-box;
				padding: 30px 20px;
			}

			.christmas_old_img {
				width: 230px;
				height: 230px;

			}

			.box_right {
				width: 364px;

			}

			.title_two {
				color: #fff;
				margin-top: 20px;
				position: relative;
			}

			.title_two_text {
				background-color: #BB2229;
				box-sizing: border-box;
				padding: 4px 12px;
			}

			.title_two_icon {
				position: absolute;
				top: -28px;
				left: -24px;
				width: 50px;
				height: 50px;
			}

			.text_conter {
				width: 364px;
				font-size: 20px;
				line-height: 26px;
				margin-top: 16px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

			.text_del {
				color: #02261C;
				font-size: 22px;
			}

			.text_price {
				font-size: 36px;
				font-weight: bold;
				padding-top: 10px;

				i {
					font-size: 20px;
				}
			}

		}
	}
</style>
