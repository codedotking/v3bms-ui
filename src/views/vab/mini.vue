
<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="脉冲圆点">
					<el-space wrap :size="15">
						<hl-status-indicator pulse type="primary"></hl-status-indicator>
						<hl-status-indicator pulse type="success"></hl-status-indicator>
						<hl-status-indicator pulse type="warning"></hl-status-indicator>
						<hl-status-indicator pulse type="danger"></hl-status-indicator>
						<hl-status-indicator type="info"></hl-status-indicator>
					</el-space>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="趋势">
					<el-space wrap :size="15">
						<hl-trend v-model="trendValue" prefix="¥"></hl-trend>
						<hl-trend v-model="trendValue2"></hl-trend>
						<hl-trend v-model="trendValue3" suffix="%"></hl-trend>
					</el-space>

					<p style="margin-top: 15px;color: #999;">设置reverse可反转颜色。</p>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="up">
						<h2>持续更新中...</h2>
						<p>非常欢迎提交Issue/PR完善和补充更多好玩的原子组件</p>
						<p>原子组件库位置：@/components/hlMini/*</p>
						<el-button type="primary" text @click="goIssue">提交想法</el-button>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'minivab',
		data() {
			return {
				trendValue: 4.6,
				trendValue2: 0,
				trendValue3: -32
			}
		},
		mounted() {

		},
		methods: {
			goIssue(){
			}
		}
	}
</script>

<style scoped>
	.up {text-align: center;}
	.up h2 {margin-bottom: 10px;}
	.up p {color: #999;line-height: 1.5;}
	.el-card {height:150px;}
</style>
