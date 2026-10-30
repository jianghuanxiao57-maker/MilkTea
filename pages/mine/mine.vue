<template>
	<view class="container">
		<!-- 1. 顶部个人信息区域 -->
		<view class="user-header">
			<image class="avatar" src="https://picsum.photos/200/200?avatar" mode="aspectFill"></image>
			<view class="user-info">
				<text class="nickname">微信272727</text>
				<text class="phone">13760063769</text>
			</view>
		</view>

		<!-- 2. 会员卡、积分、优惠券数据卡片 -->
		<view class="stats-card">
			<view class="stat-item">
				<text class="num">0</text>
				<text class="label">会员卡</text>
			</view>
			<view class="stat-item">
				<text class="num">0</text>
				<text class="label">积分</text>
			</view>
			<view class="stat-item">
				<text class="num">0</text>
				<text class="label">优惠券</text>
			</view>
		</view>

		<!-- 3. 月度练习排行榜提示卡片 -->
		<view class="ranking-section">
			<view class="ranking-header">
				<text class="rank-title">{{ currentYear }}</text>
				<text class="rank-more">排行榜 &gt;</text>
			</view>
			<view class="ranking-content">
				<view class="rank-left">
					<text class="slogan-bold">每一次参与都是成长的一部分</text>
					<text class="slogan-sub">快去约课吧！</text>
					<view class="stat-row">
						<text class="label">练习次数</text>
						<text class="val">3</text> <!-- 模拟数据：练习了3次 -->
					</view>
					<view class="stat-row">
						<text class="label">馆内排名</text>
						<text class="val">TOP 5</text>
					</view>
				</view>
				<view class="rank-right-icon">
					<!-- 奖牌图标示意 -->
					<uni-icons type="medal-filled" size="60" color="#f39c12"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 4. 我的练习日历 (带模拟数据打卡记录) -->
		<view class="calendar-section">
			<view class="calendar-title-bar">
				<text class="sec-title">我的练习日历</text>
				<view class="month-selector">
					<text class="arrow" @tap="changeMonth(-1)">&lt;</text>
					<text class="current-month-text">{{ currentYear }}/{{ String(currentMonth + 1).padStart(2, '0') }}</text>
					<text class="arrow" @tap="changeMonth(1)">&gt;</text>
				</view>
			</view>

			<!-- 星期表头 -->
			<view class="week-header">
				<text v-for="(w, i) in weeks" :key="i" class="week-text">{{ w }}</text>
			</view>

			<!-- 日期网格 -->
			<view class="days-grid">
				<view v-for="(day, index) in calendarDays" :key="index" 
					:class="['day-cell', day.isCurrentMonth ? '' : 'other-month']"
					@tap="clickDay(day)">
					<view :class="[
						'day-num', 
						day.isSigned ? 'signed-day' : '',
						isToday(day) ? 'today-day' : ''
					]">
						{{ day.dayNum }}
					</view>
					<!-- 打卡小红点或标记 -->
					<view v-if="day.isSigned" class="sign-dot"></view>
				</view>
			</view>
		</view>

		<!-- 5. 底部版权支持 -->
		<view class="footer-copyright">
			<text>由随心瑜掌馆提供技术支持</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';

	const weeks = ['日', '一', '二', '三', '四', '五', '六'];

	// 当前操作的年月
	const today = new Date();
	const currentYear = ref(today.getFullYear());
	const currentMonth = ref(today.getMonth()); // 0-11

	// 模拟已打卡/练习的日期数据 (格式: "YYYY-MM-DD")
	// 比如在当前月份的 5号、12号、20号 有打卡记录
	const signedDates = ref([
		`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-05`,
		`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-12`,
		`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-20`
	]);

	// 计算当前月份的日历网格数据
	const calendarDays = computed(() => {
		const year = currentYear.value;
		const month = currentMonth.value;

		// 当月第一天是星期几
		const firstDayIndex = new Date(year, month, 1).getDay();
		// 当月总天数
		const totalDays = new Date(year, month + 1, 0).getDate();
		// 上个月总天数
		const prevMonthTotalDays = new Date(year, month, 0).getDate();

		const days = [];

		// 1. 补全上个月尾数
		for (let i = firstDayIndex - 1; i >= 0; i--) {
			days.push({
				dayNum: prevMonthTotalDays - i,
				isCurrentMonth: false,
				fullDate: ''
			});
		}

		// 2. 填充当月天数
		for (let i = 1; i <= totalDays; i++) {
			const mStr = String(month + 1).padStart(2, '0');
			const dStr = String(i).padStart(2, '0');
			const fullDate = `${year}-${mStr}-${dStr}`;
			
			// 检查这天是否打卡了
			const isSigned = signedDates.value.includes(fullDate);

			days.push({
				dayNum: i,
				isCurrentMonth: true,
				fullDate: fullDate,
				isSigned: isSigned
			});
		}

		// 3. 补全下个月头部，凑齐 35 或 42 格
		const remaining = 7 - (days.length % 7);
		if (remaining < 7) {
			for (let i = 1; i <= remaining; i++) {
				days.push({
					dayNum: i,
					isCurrentMonth: false,
					fullDate: ''
				});
			}
		}

		return days;
	});

	// 判断是否是今天
	const isToday = (day) => {
		if (!day.isCurrentMonth) return false;
		const d = new Date();
		return day.dayNum === d.getDate() && currentMonth.value === d.getMonth() && currentYear.value === d.getFullYear();
	};

	// 切换月份
	const changeMonth = (step) => {
		let m = currentMonth.value + step;
		let y = currentYear.value;
		if (m > 11) {
			m = 0;
			y++;
		} else if (m < 0) {
			m = 11;
			y--;
		}
		currentMonth.value = m;
		currentYear.value = y;
	};

	// 点击某一天
	const clickDay = (day) => {
		if (!day.isCurrentMonth) return;
		if (day.isSigned) {
			uni.showToast({
				title: `${day.fullDate} 已完成练习打卡`,
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: `${day.fullDate} 暂无练习记录`,
				icon: 'none'
			});
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #f7f8fa;
		padding-bottom: 60rpx;
	}

	/* 1. 顶部个人信息 */
	.user-header {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
		padding: 40rpx 30rpx 60rpx 30rpx;
		display: flex;
		align-items: center;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 4rpx solid rgba(255, 255, 255, 0.8);
			margin-right: 24rpx;
		}

		.user-info {
			display: flex;
			flex-direction: column;

			.nickname {
				font-size: 36rpx;
				font-weight: bold;
				color: #ffffff;
				margin-bottom: 8rpx;
			}

			.phone {
				font-size: 26rpx;
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}

	/* 2. 数据卡片 (会员卡/积分/优惠券) */
	.stats-card {
		background-color: #ffffff;
		margin: -30rpx 30rpx 20rpx 30rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		padding: 30rpx 0;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

		.stat-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.num {
				font-size: 36rpx;
				font-weight: bold;
				color: #e5232a;
				margin-bottom: 6rpx;
			}

			.label {
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	/* 3. 排行榜卡片 */
	.ranking-section {
		background-color: #ffffff;
		margin: 0 30rpx 20rpx 30rpx;
		border-radius: 20rpx;
		padding: 24rpx 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);

		.ranking-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.rank-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
			}

			.rank-more {
				font-size: 24rpx;
				color: #999;
			}
		}

		.ranking-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fafbfc;
			padding: 20rpx;
			border-radius: 16rpx;

			.rank-left {
				.slogan-bold {
					font-size: 28rpx;
					font-weight: bold;
					color: #2c3e50;
					display: block;
				}

				.slogan-sub {
					font-size: 22rpx;
					color: #888;
					margin-top: 4rpx;
					display: block;
					margin-bottom: 16rpx;
				}

				.stat-row {
					display: flex;
					gap: 20rpx;
					font-size: 24rpx;
					margin-bottom: 4rpx;

					.label { color: #666; }
					.val { font-weight: bold; color: #333; }
				}
			}
		}
	}

	/* 4. 日历卡片 */
	.calendar-section {
		background-color: #ffffff;
		margin: 0 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);

		.calendar-title-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.sec-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}

			.month-selector {
				display: flex;
				align-items: center;
				gap: 20rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #333;

				.arrow {
					padding: 0 10rpx;
					color: #999;
					font-size: 32rpx;
				}
			}
		}

		.week-header {
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;

			.week-text {
				font-size: 26rpx;
				color: #999;
				width: 60rpx;
				text-align: center;
			}
		}

		.days-grid {
			display: flex;
			flex-wrap: wrap;

			.day-cell {
				width: calc(100% / 7);
				height: 80rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				margin-bottom: 10rpx;
				position: relative;

				&.other-month {
					opacity: 0.3;
				}

				.day-num {
					width: 56rpx;
					height: 56rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #333;
					border-radius: 50%;

					/* 已打卡日期的红色圆圈样式 */
					&.signed-day {
						background-color: #e5232a;
						color: #ffffff;
						font-weight: bold;
					}

					/* 今天且没打卡的边框高亮 */
					&.today-day:not(.signed-day) {
						border: 2rpx solid #e5232a;
						color: #e5232a;
					}
				}

				.sign-dot {
					width: 6rpx;
					height: 6rpx;
					background-color: #fff;
					border-radius: 50%;
					margin-top: 2rpx;
				}
			}
		}
	}

	/* 5. 底部支持 */
	.footer-copyright {
		text-align: center;
		padding: 40rpx 0;
		font-size: 24rpx;
		color: #b0b0b0;
	}
</style>