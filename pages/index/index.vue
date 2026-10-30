<template>
	<view class="container">
		<!-- 1. 顶部海报/封面轮播区域 -->
		<view class="banner-section">
			<swiper class="banner-swiper" :current="currentBanner" @change="onSwiperChange" autoplay circular
				interval="4000" duration="500">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image class="banner-img" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>

			<!-- 右下角胶囊切换按钮 -->
			<view class="tab-capsule">
				<view v-for="(item, index) in bannerList" :key="index"
					:class="['capsule-item', currentBanner === index ? 'active' : '']" @tap="switchBanner(index)">
					{{ index === 0 ? '封面' : '场馆环境' }}
				</view>
			</view>
		</view>
		<!-- 2. 场馆核心信息区域 -->
		<view class="store-info-section">
			<view class="header-row">
				<image class="logo" src="/static/img/Shop.jpg" mode="aspectFit"></image>
				<view class="title-wrap">
					<text class="store-name">金 泽 润 健 身 养 生 馆</text>
				</view>
			</view>

			<view class="time-row">
				<text class="time-text">周一至周日 9:00 - 22:00</text>
			</view>

			<view class="desc-contact-row">
				<view class="desc">让身体和心灵在这里相遇,记录每个不一样的你</view>
				<view class="contact-group">
					<view class="contact-item" @tap="handleContact('wechat')">
						<uni-icons type="weixin" size="24" color="#333"></uni-icons>
						<text>微信</text>
					</view>
					<view class="contact-item" @tap="handleContact('phone')">
						<uni-icons type="phone" size="24" color="#333"></uni-icons>
						<text>电话</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 3. 场馆设施 -->
		<view class="facility-section">
			<view class="section-title">场馆设施</view>
			<view class="facility-grid">
				<view class="facility-item" v-for="(item, index) in facilities" :key="index">
					<view class="icon-box">
						<uni-icons :type="item.icon" size="28" color="#333"></uni-icons>
					</view>
					<text class="label">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 4. 公告通知栏 -->
		<view class="notice-bar">
			<uni-icons type="sound-filled" size="18" color="#e5232a"></uni-icons>
			<text class="notice-text">印迦瑜伽普拉提 会员约课须知</text>
			<text class="notice-date">2025-12-19 16:49</text>
		</view>

		<!-- 5. 核心操作入口 (约课 & 签到) -->
		<view class="action-cards">
			<view class="card red-card" @tap="navigateTo('/pages/course/index')">
				<view class="card-title">约课</view>
				<view class="card-desc">勤加练习，身心更健康</view>
				<button class="card-btn">去约课</button>
			</view>

			<view class="card dark-red-card" @tap="navigateTo('/pages/checkin/index')">
				<view class="card-title">签到</view>
				<view class="card-desc">坚持自律，记录美好生活</view>
				<button class="card-btn">去签到</button>
			</view>
		</view>

		<!-- 6. 常用功能（两行宫格布局） -->
		<view class="common-functions">
			<view class="section-title">常用功能</view>
			<view class="grid-box">
				<view class="grid-item" v-for="(item, index) in commonFunctions" :key="index"
					@tap="navigateTo(item.path)">
					<view class="icon-wrap">
						<uni-icons :type="item.icon" size="28" color="#333"></uni-icons>
					</view>
					<text class="grid-label">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 7. 金牌教练（横向滚动列表） -->
		<view class="coach-section">
			<view class="section-header">
				<text class="section-title">金牌教练</text>
				<text class="more-text">更多 ></text>
			</view>
			<scroll-view scroll-x class="coach-scroll" show-scrollbar="false">
				<view class="coach-card" v-for="(coach, index) in coaches" :key="index">
					<image class="coach-avatar" :src="coach.avatar" mode="aspectFill"></image>
					<text class="coach-name">{{ coach.name }}</text>
					<text class="coach-desc">累计上课{{ coach.classes }}节</text>
				</view>
			</scroll-view>
		</view>

		<!-- 8. 活动专区 Tab 切换栏 -->
		<view class="activity-section">
			<view class="activity-tabs">
				<text v-for="(tab, index) in activityTabs" :key="index"
					:class="['tab-item', currentTab === index ? 'active' : '']" @tap="currentTab = index">
					{{ tab }}
				</text>
			</view>
		</view>

		<!-- 9. 底部版权支持 -->
		<view class="footer-copyright">
			<text>由随心瑜掌馆提供技术支持</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		getUserApi
	} from '@/api/index';

	// 场馆设施数据
	const facilities = ref([{
			name: '网络',
			icon: 'wifi'
		},
		{
			name: '储物柜',
			icon: 'locked'
		},
		{
			name: '水吧',
			icon: 'glass'
		}
	]);
	const currentBanner = ref(0);
	const bannerList = ref([{
			title: '封面',
			image: '/static/img/Shop.jpg'
		},
		{
			title: '场馆环境',
			image: '/static/img/Shop1.jpg'
		},
		{
			title: '场馆环境',
			image: '/static/img/Shop2.jpg'
		},
		{
			title: '场馆环境',
			image: '/static/img/Shop3.jpg'
		}
	]);

	// 常用功能宫格数据
	const commonFunctions = ref([{
			name: '热门课程',
			icon: 'fire',
			path: ''
		},
		{
			name: '班课',
			icon: 'calendar',
			path: ''
		},
		{
			name: '场馆预览',
			icon: 'home',
			path: ''
		},
		{
			name: '场馆公告',
			icon: 'sound',
			path: ''
		},
		{
			name: '体验课',
			icon: 'staff',
			path: ''
		},
		{
			name: '照片墙',
			icon: 'camera',
			path: ''
		},
		{
			name: '我的体测',
			icon: 'compose',
			path: ''
		},
		{
			name: '打卡',
			icon: 'checkbox',
			path: ''
		}
	]);

	// 金牌教练数据
	const coaches = ref([{
			name: '李老师',
			classes: 311,
			avatar: 'https://picsum.photos/200/200?1'
		},
		{
			name: '小樱老师',
			classes: 441,
			avatar: 'https://picsum.photos/200/200?2'
		},
		{
			name: '乔乔老师',
			classes: 258,
			avatar: 'https://picsum.photos/200/200?3'
		}
	]);

	const onSwiperChange = (e) => {
		currentBanner.value = e.detail.current;
	};

	// 点击右下角胶囊切换对应的轮播图片
	const switchBanner = (index) => {
		currentBanner.value = index;
	};


	async function loadData() {
		console.log(1111)
		try {
			const res = await getUserApi();
			if (res && Array.isArray(res)) {
				// 遍历后端返回的数据，映射到你的 coaches 结构上
				coaches.value = res.map(item => {
					return {
						name: item.nickname, // 把昵称赋给名字
						classes: 100, // 如果后端没返回上课数，可以给个默认值
						avatar: item.avatarUrl // 把头像链接赋给 avatar
					};
				});
			}
			console.log('获取成功：', res);
		} catch (error) {
			console.error('获取失败：', error);
		}
	}

	// 页面加载完成时自动执行
	onMounted(() => {
		loadData();
	});

	// 活动专区 Tab
	const activityTabs = ref(['优惠卡项', '特色课程', '会员案例']);
	const currentTab = ref(0);

	// 快捷页面跳转处理
	const navigateTo = (url) => {
		if (!url) {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			});
			return;
		}
		uni.navigateTo({
			url
		});
	};

	// 联系客服处理
	const handleContact = (type) => {
		if (type === 'phone') {
			uni.makePhoneCall({
				phoneNumber: '13800138000'
			});
		} else {
			uni.showToast({
				title: '微信号已复制',
				icon: 'none'
			});
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #f7f8fa;
		padding-bottom: 140rpx;
	}

	.banner-section {
		position: relative;
		width: 100vw;
		/* 强制视口 100% 宽度，不再受任何父级 padding 限制 */
		margin-left: calc(50% - 50vw);
		/* 完美居中并实现绝对全屏通栏 */
		height: 600rpx;
		/* 轮播图高度，可根据需要微调 */

		.banner-swiper {
			width: 100%;
			height: 100%;

			.banner-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.banner-text {
			position: absolute;
			left: 40rpx;
			top: 120rpx;
			color: #ffffff;
			display: flex;
			flex-direction: column;
			pointer-events: none;

			.title {
				font-size: 48rpx;
				font-weight: bold;
				text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.4);
			}

			.subtitle {
				font-size: 24rpx;
				margin-top: 6rpx;
				opacity: 0.9;
				text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.4);
			}
		}

		.tab-capsule {
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
			display: flex;
			background: rgba(0, 0, 0, 0.45);
			border-radius: 40rpx;
			padding: 6rpx;
			backdrop-filter: blur(4px);
			z-index: 10;

			.capsule-item {
				padding: 8rpx 24rpx;
				font-size: 24rpx;
				color: #ffffff;
				border-radius: 30rpx;
				transition: all 0.3s ease;

				&.active {
					background-color: #ffffff;
					color: #333333;
					font-weight: bold;
				}
			}
		}
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #1a1a1a;
	}

	/* 场馆核心信息 */
	.store-info-section {
		background-color: #ffffff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.header-row {
			display: flex;
			align-items: center;

			.logo {
				width: 70rpx;
				height: 70rpx;
				margin-right: 20rpx;
			}

			.title-wrap {
				display: flex;
				align-items: center;

				.store-name {
					font-size: 36rpx;
					font-weight: bold;
					color: #1a1a1a;
					margin-right: 16rpx;
				}

				.switch-btn {
					font-size: 22rpx;
					color: #666;
					background-color: #f2f2f2;
					padding: 4rpx 16rpx;
					border-radius: 20rpx;
				}
			}
		}

		.time-row {
			margin-top: 16rpx;
			font-size: 24rpx;
			color: #e5232a;
		}

		.desc-contact-row {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-top: 16rpx;

			.desc {
				font-size: 26rpx;
				color: #666666;
				width: 65%;
				line-height: 1.4;
			}

			.contact-group {
				display: flex;
				gap: 30rpx;

				.contact-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					text {
						font-size: 22rpx;
						color: #333333;
						margin-top: 6rpx;
					}
				}
			}
		}
	}

	/* 场馆设施 */
	.facility-section {
		background-color: #ffffff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.facility-grid {
			display: flex;
			gap: 60rpx;
			margin-top: 24rpx;

			.facility-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.icon-box {
					width: 80rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.label {
					font-size: 24rpx;
					color: #666666;
					margin-top: 8rpx;
				}
			}
		}
	}

	/* 公告通知 */
	.notice-bar {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		padding: 24rpx 30rpx;
		margin-bottom: 20rpx;

		.notice-text {
			flex: 1;
			font-size: 26rpx;
			color: #e5232a;
			font-weight: 500;
			margin-left: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.notice-date {
			font-size: 22rpx;
			color: #999999;
		}
	}

	/* 核心约课 / 签到卡片 */
	.action-cards {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		margin-bottom: 20rpx;

		.card {
			width: 48%;
			height: 200rpx;
			border-radius: 20rpx;
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.card-title {
				font-size: 34rpx;
				font-weight: bold;
				color: #ffffff;
			}

			.card-desc {
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.8);
				margin-top: -10rpx;
			}

			.card-btn {
				width: 130rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 25rpx;
				font-size: 24rpx;
				font-weight: bold;
				padding: 0;
				margin: 0;
			}
		}

		.red-card {
			background: linear-gradient(135deg, #f83600 0%, #fe8c00 100%);

			.card-btn {
				color: #f83600;
			}
		}

		.dark-red-card {
			background: linear-gradient(135deg, #e5232a 0%, #b80e14 100%);

			.card-btn {
				color: #e5232a;
			}
		}
	}

	/* 6. 常用功能宫格 */
	.common-functions {
		background-color: #ffffff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.grid-box {
			display: flex;
			flex-wrap: wrap;
			margin-top: 24rpx;

			.grid-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 30rpx;

				.icon-wrap {
					width: 80rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.grid-label {
					font-size: 24rpx;
					color: #333333;
					margin-top: 10rpx;
				}
			}
		}
	}

	/* 7. 金牌教练横向滚动 */
	.coach-section {
		background-color: #ffffff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;

			.more-text {
				font-size: 26rpx;
				color: #999999;
			}
		}

		.coach-scroll {
			width: 100%;
			white-space: nowrap;

			.coach-card {
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				width: 200rpx;
				background: #fafafa;
				border-radius: 16rpx;
				padding: 24rpx 16rpx;
				margin-right: 20rpx;
				box-sizing: border-box;

				.coach-avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-bottom: 16rpx;
				}

				.coach-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 6rpx;
				}

				.coach-desc {
					font-size: 20rpx;
					color: #999;
				}
			}
		}
	}

	/* 8. 活动专区 Tab */
	.activity-section {
		background-color: #ffffff;
		padding: 30rpx;
		margin-bottom: 20rpx;

		.activity-tabs {
			display: flex;
			gap: 40rpx;

			.tab-item {
				font-size: 30rpx;
				color: #666;
				font-weight: 500;
				position: relative;
				padding-bottom: 10rpx;

				&.active {
					color: #1a1a1a;
					font-weight: bold;

					&::after {
						content: '';
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 6rpx;
						background-color: #e5232a;
						border-radius: 3rpx;
					}
				}
			}
		}
	}

	/* 9. 底部技术支持 */
	.footer-copyright {
		text-align: center;
		padding: 20rpx 0;
		font-size: 24rpx;
		color: #b0b0b0;
	}
</style>