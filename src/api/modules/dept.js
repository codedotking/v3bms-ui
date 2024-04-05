import config from "@/config"
import http from "@/utils/request"


const API = `${config.API_URL}/sys/dept`

export default {
	async add(data) {
		return await http.post(API, data);
	},
	async update(data) {
		return await http.put(API, data);
	},
	async batchDelete(ids) {
		return await http.delete(API, {
			ids
		});
	},
	ver: {
		url: `${config.API_URL}/demo/ver`,
		name: "获取最新版本号",
		get: async function (params) {
			return await http.get(this.url, params);
		}
	},
	post: {
		url: `${API}/list`,
		name: "分页列表",
		post: async function (data) {
			return await http.post(this.url, data, {
				headers: {
					//'response-status': 401
				}
			});
		}
	},
	page: {
		url: `${config.API_URL}/demo/page`,
		name: "分页列表",
		get: async function (params) {
			return await http.get(this.url, params);
		}
	},
	list: {
		url: `${API}/list`,
		name: "数据列表",
		get: async function (params) {
			return await http.get(this.url, params);
		}
	},
	menu: {
		url: `${config.API_URL}/demo/menu`,
		name: "普通员工菜单",
		get: async function () {
			return await http.get(this.url);
		}
	},
	status: {
		url: `${config.API_URL}/demo/status`,
		name: "模拟无权限",
		get: async function (code) {
			return await http.get(this.url, {}, {
				headers: {
					"response-status": code
				}
			});
		}
	}
}
