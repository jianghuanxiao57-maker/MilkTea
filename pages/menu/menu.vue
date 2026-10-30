<template>
	<view class="container">
		<!-- 1. 顶部日课表 / 周课表 切换 (完美视觉居中适配) -->
		<view class="top-switch-header" :style="{ paddingTop: statusBarHeight + 'px', height: capsuleHeight + 'px' }">
			<view class="switch-tabs">
				<text :class="['switch-tab', viewType === 'day' ? 'active' : '']" @tap="viewType = 'day'">日课表</text>
				<text :class="['switch-tab', viewType === 'week' ? 'active' : '']" @tap="viewType = 'week'">周课表</text>
			</view>
		</view>

		<!-- ==================== 视图 A：日课表视图 ==================== -->
		<block v-if="viewType === 'day'">
			<!-- 2. 课程一级分类 (团课、精品课、私教课、班课) -->
			<view class="category-tabs">
				<view v-for="(item, index) in categoryList" :key="index"
					:class="['category-item', currentCategory === index ? 'active' : '']" @tap="currentCategory = index">
					{{ item }}
				</view>
				<view class="calendar-icon-wrap" @tap="openCalendar">
					<uni-icons type="calendar" size="20" color="#333"></uni-icons>
				</view>
			</view>

			<!-- 3. 横向整月日期选择条 (过去日期显示为灰色) -->
			<scroll-view scroll-x class="date-scroll" :scroll-into-view="'date-' + (currentDateIndex > 3 ? currentDateIndex - 3 : 0)" scroll-with-animation>
				<view class="date-list">
					<view v-for="(item, index) in dateList" :key="index" :id="'date-' + index"
						:class="[
							'date-item', 
							currentDateIndex === index ? 'active' : '',
							item.isPast ? 'past-date' : ''
						]" @tap="selectDate(index)">
						<text class="week-label">{{ item.weekStr }}</text>
						<view :class="['day-circle', currentDateIndex === index ? 'active-circle' : '']">
							{{ item.dayNum }}
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 4. 课程列表区域 -->
			<view class="course-list">
				<view class="course-card" v-for="(course, index) in courseList" :key="index">
					<!-- 左侧讲师与课程信息 -->
					<view class="course-left">
						<view class="teacher-row">
							<image class="teacher-avatar" :src="course.teacherAvatar" mode="aspectFill"></image>
							<text class="teacher-name">{{ course.teacherName }}</text>
						</view>
						<view class="course-title">{{ course.title }}</view>
						<view class="course-desc">
							{{ course.duration }}分钟 · {{ course.location }} · 
							<text class="stars">★★★</text>
						</view>
						<view class="course-status-text" v-if="course.status === 'ended'">已结束</view>
						<view class="course-status-text" v-else>已约: {{ course.bookedCount }}/{{ course.maxCount }}</view>
					</view>

					<!-- 右侧时间与预约按钮 -->
					<view class="course-right">
						<view class="time-box">
							<text class="start-time">{{ course.startTime }}</text>
							<text class="end-time">{{ course.endTime }} 结束</text>
						</view>
						<button v-if="course.status === 'ended'" class="action-btn ended-btn" disabled>已结束</button>
						<button v-else-if="course.status === 'booked'" class="action-btn booked-btn" @tap="handleBook(course)">已预约</button>
						<button v-else class="action-btn normal-btn" @tap="handleBook(course)">预约</button>
					</view>
				</view>
			</view>
		</block>

		<!-- ==================== 视图 B：周课表视图 ==================== -->
		<block v-else>
			<!-- 周课表子 Tab (约课周课表 / 班课周课表) -->
			<view class="week-sub-tabs">
				<text :class="['sub-tab', currentWeekSub === 0 ? 'active' : '']" @tap="currentWeekSub = 0">约课周课表</text>
				<text :class="['sub-tab', currentWeekSub === 1 ? 'active' : '']" @tap="currentWeekSub = 1">班课周课表</text>
				<view class="calendar-icon-wrap" @tap="openCalendar">
					<uni-icons type="calendar" size="20" color="#333"></uni-icons>
				</view>
			</view>

			<!-- 周课表多列滚动矩阵 -->
			<scroll-view scroll-x class="week-matrix-scroll">
				<view class="week-matrix-container">
					<!-- 表头：日期列 -->
					<view class="matrix-header-row">
						<view class="time-axis-placeholder"></view>
						<view class="matrix-day-col" v-for="(day, dIndex) in weekDays" :key="dIndex">
							<text class="w-name">{{ day.name }}</text>
							<text class="w-date">{{ day.date }}</text>
						</view>
					</view>

					<!-- 表体：时间与课程格子矩阵 -->
					<view class="matrix-body">
						<view class="matrix-time-row" v-for="(timeSlot, tIndex) in timeSlots" :key="tIndex">
							<!-- 左侧时间轴 -->
							<view class="time-axis-label">{{ timeSlot }}</view>
							<!-- 右侧每一天的课程格子 -->
							<view class="matrix-cell" v-for="(day, dIndex) in weekDays" :key="dIndex">
								<template v-if="getCourseBySlot(dIndex, timeSlot)">
									<view :class="['mini-course-card', getCourseBySlot(dIndex, timeSlot).status]">
										<text class="m-title">{{ getCourseBySlot(dIndex, timeSlot).title }}</text>
										<text class="m-time">{{ getCourseBySlot(dIndex, timeSlot).startTime }}-{{ getCourseBySlot(dIndex, timeSlot).endTime }}</text>
										<text class="m-teacher">{{ getCourseBySlot(dIndex, timeSlot).teacherName }}</text>
										<text class="m-tag">{{ getCourseBySlot(dIndex, timeSlot).category }}</text>
										<view class="m-status-btn">{{ getCourseBySlot(dIndex, timeSlot).statusText }}</view>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</block>

		<!-- 5. 底部版权支持 -->
		<view class="footer-copyright">
			<text>由随心瑜掌馆提供技术支持</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	// 顶部视图切换：day-日课表，week-周课表
	const viewType = ref('day');
	const currentWeekSub = ref(0);

	// 适配状态栏与胶囊高度
	const statusBarHeight = ref(20);
	const capsuleHeight = ref(44);

	// 课程大分类
	const categoryList = ref(['团课', '精品课', '私教课', '班课']);
	const currentCategory = ref(0);

	// 日期横向滚动数据
	const dateList = ref([]);
	const currentDateIndex = ref(0);

	// 周课表模拟数据（7天表头）
	const weekDays = ref([
		{ name: 'DAY', date: '26' },
		{ name: '周二', date: '10.27' },
		{ name: '周三', date: '10.28' },
		{ name: '周四', date: '10.29' },
		{ name: '周五', date: '10.30' },
		{ name: '周六', date: '10.31' },
		{ name: '周日', date: '11.01' }
	]);

	// 时间轴时段
	const timeSlots = ref(['09:30', '12:30', '15:00', '18:20']);

	// 周课表课程矩阵模拟数据 (key格式: dayIndex-timeSlot)
	const weekCourses = ref({
		'1-12:30': { title: '美胸美背', startTime: '12:30', endTime: '13:30', teacherName: '小樱老师', category: '精品课', status: 'ended', statusText: '已结束' },
		'1-15:00': { title: '根基稳定', startTime: '15:00', endTime: '16:00', teacherName: '小樱老师', category: '精品课', status: 'ended', statusText: '已结束' },
		'2-15:00': { title: '扭转排毒', startTime: '15:00', endTime: '16:00', teacherName: '徐一帆', category: '精品课', status: 'ended', statusText: '已结束' },
		'3-15:00': { title: '轮瑜伽', startTime: '15:00', endTime: '16:00', teacherName: '小樱老师', category: '精品课', status: 'ended', statusText: '已结束' },
		'0-15:00': { title: '臀养成', startTime: '15:00', endTime: '16:00', teacherName: '乔乔', category: '私教课', status: 'cancelled', statusText: '已取消' }
	});

	const getCourseBySlot = (dayIndex, timeSlot) => {
		return weekCourses.value[`${dayIndex}-${timeSlot}`] || null;
	};

	// 模拟课程列表数据
	const courseList = ref([
		{
			id: 1,
			teacherName: '橙子老师',
			teacherAvatar: 'https://picsum.photos/200/200?1',
			title: '肩颈理疗',
			duration: 60,
			location: '融静瑜伽室',
			startTime: '15:00',
			endTime: '16:00',
			bookedCount: 10,
			maxCount: 10,
			status: 'ended'
		},
		{
			id: 2,
			teacherName: '小樱老师',
			teacherAvatar: 'https://picsum.photos/200/200?2',
			title: '舒缓拉伸',
			duration: 60,
			location: '融静瑜伽室',
			startTime: '19:00',
			endTime: '20:00',
			bookedCount: 2,
			maxCount: 10,
			status: 'normal'
		}
	]);

	// 初始化生成当前月份的所有日期（判断过去日期）
	const initDates = () => {
		const list = [];
		const daysMap = ['日', '一', '二', '三', '四', '五', '六'];
		
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		
		const totalDays = new Date(year, month + 1, 0).getDate();
		const todayTimestamp = new Date(year, today.getMonth(), today.getDate()).getTime();
		
		for (let i = 1; i <= totalDays; i++) {
			const d = new Date(year, month, i);
			const dayTimestamp = d.getTime();
			const dayOfWeek = d.getDay();
			
			const isPast = dayTimestamp < todayTimestamp;
			
			let weekStr = '';
			const diffDays = Math.round((dayTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));
			
			if (diffDays === 0) {
				weekStr = '今天';
			} else if (diffDays === 1) {
				weekStr = '明天';
			} else {
				weekStr = daysMap[dayOfWeek];
			}

			list.push({
				weekStr: weekStr,
				dayNum: i,
				fullDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
				isPast: isPast
			});
		}
		
		dateList.value = list;
		const todayIndex = list.findIndex(item => item.weekStr === '今天');
		if (todayIndex !== -1) {
			currentDateIndex.value = todayIndex;
		}
	};

	const selectDate = (index) => {
		currentDateIndex.value = index;
	};

	const openCalendar = () => {
		uni.showToast({
			title: '打开完整日历控件',
			icon: 'none'
		});
	};

	const handleBook = (course) => {
		uni.showModal({
			title: '提示',
			content: `确定要预约 ${course.teacherName} 的《${course.title}》吗？`,
			success: (res) => {
				if (res.confirm) {
					uni.showToast({
						title: '预约成功',
						icon: 'success'
					});
					course.status = 'booked';
				}
			}
		});
	};

	onMounted(() => {
		initDates();
		
		// #ifdef MP-WEIXIN
		const systemInfo = uni.getSystemInfoSync();
		statusBarHeight.value = systemInfo.statusBarHeight || 20;
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		capsuleHeight.value = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight.value) * 2;
		// #endif
	});
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #f7f8fa;
		padding-bottom: 50rpx;
	}

	/* 顶部日课表/周课表切换 */
	.top-switch-header {
		background-color: #ffffff;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: content-box;
		z-index: 99;

		.switch-tabs {
			display: flex;
			background-color: #f0f2f5;
			border-radius: 30rpx;
			padding: 4rpx;
			transform: translateX(-40rpx);

			.switch-tab {
				padding: 6rpx 28rpx;
				font-size: 26rpx;
				color: #666;
				border-radius: 26rpx;
				transition: all 0.3s;

				&.active {
					background-color: #ffffff;
					color: #333;
					font-weight: bold;
					box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
				}
			}
		}
	}

	/* 日课表分类 Tab 栏 */
	.category-tabs {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		padding: 0 30rpx 20rpx 30rpx;
		position: relative;
		border-bottom: 1rpx solid #f0f0f0;

		.category-item {
			font-size: 30rpx;
			color: #666;
			margin-right: 50rpx;
			position: relative;
			font-weight: 500;

			&.active {
				color: #e5232a;
				font-weight: bold;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: -10rpx;
					transform: translateX(-50%);
					width: 40rpx;
					height: 6rpx;
					background-color: #e5232a;
					border-radius: 3rpx;
				}
			}
		}

		.calendar-icon-wrap {
			margin-left: auto;
			padding: 10rpx;
		}
	}

	/* 周课表子 Tab 栏 */
	.week-sub-tabs {
		background-color: #ffffff;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #f0f0f0;

		.sub-tab {
			font-size: 32rpx;
			color: #666;
			margin-right: 40rpx;
			font-weight: 500;
			position: relative;

			&.active {
				color: #e5232a;
				font-weight: bold;

				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: -12rpx;
					width: 100%;
					height: 6rpx;
					background-color: #e5232a;
					border-radius: 3rpx;
				}
			}
		}

		.calendar-icon-wrap {
			margin-left: auto;
		}
	}

	/* 周课表矩阵布局样式 */
	.week-matrix-scroll {
		background-color: #ffffff;
		width: 100vw;
		white-space: nowrap;

		.week-matrix-container {
			display: inline-block;
			min-width: 100%;
		}

		.matrix-header-row {
			display: flex;
			background-color: #ffffff;
			border-bottom: 1rpx solid #eee;
			padding: 20rpx 0;

			.time-axis-placeholder {
				width: 100rpx;
				flex-shrink: 0;
			}

			.matrix-day-col {
				width: 180rpx;
				text-align: center;
				flex-shrink: 0;
				display: flex;
				flex-direction: column;

				.w-name {
					font-size: 24rpx;
					color: #999;
					margin-bottom: 6rpx;
				}

				.w-date {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
				}
			}
		}

		.matrix-body {
			.matrix-time-row {
				display: flex;
				border-bottom: 1rpx solid #f5f5f5;
				min-height: 180rpx;

				.time-axis-label {
					width: 100rpx;
					font-size: 24rpx;
					color: #999;
					text-align: center;
					padding-top: 20rpx;
					flex-shrink: 0;
				}

				.matrix-cell {
					width: 180rpx;
					padding: 10rpx;
					box-sizing: border-box;
					border-left: 1rpx solid #f9f9f9;
					flex-shrink: 0;

					.mini-course-card {
						background-color: #f2f3f5;
						border-radius: 12rpx;
						padding: 16rpx 12rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 100%;
						box-sizing: border-box;

						.m-title {
							font-size: 26rpx;
							font-weight: bold;
							color: #333;
							margin-bottom: 6rpx;
							white-space: normal;
						}

						.m-time, .m-teacher, .m-tag {
							font-size: 20rpx;
							color: #666;
							margin-bottom: 4rpx;
							white-space: normal;
						}

						.m-status-btn {
							margin-top: 10rpx;
							background-color: #e5232a;
							color: #fff;
							font-size: 20rpx;
							text-align: center;
							padding: 4rpx 0;
							border-radius: 8rpx;
						}

						&.ended {
							background-color: #f0f0f0;
							.m-title, .m-time, .m-teacher { color: #999; }
							.m-status-btn { background-color: #ddd; color: #888; }
						}
					}
				}
			}
		}
	}

	/* 横向日期选择条（整月） */
	.date-scroll {
		background-color: #ffffff;
		padding: 20rpx 0 30rpx 0;
		white-space: nowrap;
		margin-bottom: 20rpx;

		.date-list {
			display: inline-flex;
			padding: 0 20rpx;
			gap: 24rpx;

			.date-item {
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				width: 70rpx;

				.week-label {
					font-size: 24rpx;
					color: #999;
					margin-bottom: 12rpx;
				}

				.day-circle {
					width: 64rpx;
					height: 64rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #333;
					border-radius: 50%;
					font-weight: bold;

					&.active-circle {
						background-color: #e5232a;
						color: #ffffff;
					}
				}

				&.past-date {
					.week-label {
						color: #cccccc !important;
					}
					.day-circle {
						color: #b0b0b0 !important;
					}
				}
			}
		}
	}

	/* 课程列表 */
	.course-list {
		padding: 0 30rpx;

		.course-card {
			background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
			border-radius: 20rpx;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			color: #ffffff;
			box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);

			.course-left {
				flex: 1;

				.teacher-row {
					display: flex;
					align-items: center;
					margin-bottom: 16rpx;

					.teacher-avatar {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin-right: 12rpx;
					}

					.teacher-name {
						font-size: 26rpx;
						color: rgba(255, 255, 255, 0.9);
					}
				}

				.course-title {
					font-size: 34rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.course-desc {
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.7);
					margin-bottom: 12rpx;

					.stars {
						color: #f39c12;
					}
				}

				.course-status-text {
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.8);
				}
			}

			.course-right {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: space-between;
				height: 140rpx;

				.time-box {
					text-align: right;

					.start-time {
						font-size: 36rpx;
						font-weight: bold;
						display: block;
					}

					.end-time {
						font-size: 20rpx;
						color: rgba(255, 255, 255, 0.6);
					}
				}

				.action-btn {
					width: 130rpx;
					height: 50rpx;
					line-height: 50rpx;
					border-radius: 25rpx;
					font-size: 24rpx;
					font-weight: bold;
					text-align: center;
					margin: 0;
					padding: 0;

					&.normal-btn {
						background-color: #e5232a;
						color: #ffffff;
					}

					&.booked-btn {
						background-color: #27ae60;
						color: #ffffff;
					}

					&.ended-btn {
						background-color: rgba(255, 255, 255, 0.2);
						color: rgba(255, 255, 255, 0.5);
					}
				}
			}
		}
	}

	/* 版权支持 */
	.footer-copyright {
		text-align: center;
		padding: 40rpx 0;
		font-size: 24rpx;
		color: #b0b0b0;
	}
</style>