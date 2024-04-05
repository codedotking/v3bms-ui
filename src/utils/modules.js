/**
 * @description 自动import导入所有 api 模块
 */

// 定义一个异步函数，用于动态导入模块
export const importAll = async function (r) {
	const modules = {}
	// 遍历匹配到的模块文件
	for (const path of Object.keys(r)) {
		// 根据文件名去除路径和后缀，作为模块的 key
		const moduleName = path.match(/([^\/]+)\.[^.]+$/)[1]
		// 动态导入模块，并将默认导出赋值给模块对象
		modules[moduleName] = ( r[path]).default
	}
	return modules
}