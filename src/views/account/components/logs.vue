<template>
	<el-card shadow="never" header="近7天操作记录">
		<hlTable ref="table" :data="data" height="auto" paginationLayout="total, prev, pager, next" hideDo>
			<hl-table-column label="序号" type="index"></hl-table-column>
			<hl-table-column label="业务名称" prop="title" min-width="240"></hl-table-column>
			<hl-table-column label="IP" prop="ip" width="150"></hl-table-column>
			<hl-table-column label="结果" prop="code" width="150">
				<el-tag type="success">成功</el-tag>
			</hl-table-column>
			<hl-table-column label="操作时间" prop="time" width="150"></hl-table-column>

		</hlTable>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
						title: "修改员工 lolowan",
						ip: "211.187.11.18",
						code: "成功",
						time: "2022-10-10 08:41:17"
					},
					{
						title: "员工登录",
						ip: "211.187.11.18",
						code: "成功",
						time: "2022-10-10 08:21:51"
					}
				]
			}
		}
	}
</script>

<style>
</style>
