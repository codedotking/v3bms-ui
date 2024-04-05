import config from "@/config"
import http from "@/utils/request"

const API = `${config.API_URL}/sys/role`

export default {
	list: {
		url: `${API}/list`,
		name: "获取角色列表",
		get: async function (params) {
			return await http.get(this.url, params);
		}
	},
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
}
