/**
 * 利用 import.meta.glob 动态加载所有 vue 文件
 */

const viewsVues = import.meta.glob('./**/*.vue', { eager: false });
export default Object.entries(viewsVues).reduce((res, [path, value]) => {
    const viewPath = path.match(/\.\/(.*?)\.vue/)[1];
    res[viewPath] = value;
    return res;
}, {});