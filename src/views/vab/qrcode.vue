<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="常用">
					<hl-qr-code text="HUALA"></hl-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="带Logo">
					<hl-qr-code text="HUALA" logo="/img/logo.png"></hl-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="自定义颜色大小">
					<hl-qr-code text="HUALA" :size="100" colorDark="#088200" colorLight="#fff"></hl-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="动态">
					<hl-qr-code :text="qrcode"></hl-qr-code>
					<el-input v-model="qrcode" placeholder="Please input"  style="margin-top: 20px;"/>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'qrcode',
		data() {
			return {
				qrcode: "HUALA"
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
