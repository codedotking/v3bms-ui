<template>
	<el-main>
		<el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<hl-statistic title="Title" value="112893" description="Description" tips="Tips" groupSeparator></hl-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<hl-statistic title="今日净利润" value="112893.00" prefix="¥" groupSeparator>
						<hl-trend v-model="trendValue1"></hl-trend>
					</hl-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<hl-statistic title="留言" value="112893" suffix="条" groupSeparator>
						<hl-trend v-model="trendValue2"></hl-trend>
					</hl-statistic>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import scStatistic from '@/components/hlStatistic';

	export default {
		name: 'statistic',
		components: {
			scStatistic
		},
		data() {
			return {
				trendValue1: 7.7,
				trendValue2: -18.9
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 15px;}
	.up {color: #F56C6C;margin-left: 5px;}
	.down {color: #67C23A;margin-left: 5px;}
</style>
