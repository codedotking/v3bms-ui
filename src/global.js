import config from "./config"
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'

import scTable from './components/hlTable/index.vue'
import scTableColumn from './components/hlTable/column.js'
import scFilterBar from './components/hlFilterBar/index'
import scUpload from './components/hlUpload'
import scUploadMultiple from './components/hlUpload/multiple'
import scUploadFile from './components/hlUpload/file'
import scFormTable from './components/hlFormTable'
import scTableSelect from './components/hlTableSelect'
import scPageHeader from './components/hlPageHeader'
import scSelect from './components/hlSelect'
import scDialog from './components/hlDialog'
import scForm from './components/hlForm'
import scTitle from './components/hlTitle'
import scWaterMark from './components/hlWaterMark'
import scQrCode from './components/hlQrCode'

import scStatusIndicator from './components/hlMini/hlStatusIndicator'
import scTrend from './components/hlMini/hlTrend'

import auth from './directives/auth'
import auths from './directives/auths'
import authsAll from './directives/authsAll'
import role from './directives/role'
import time from './directives/time'
import copy from './directives/copy'
import errorHandler from './utils/errorHandler'

import * as elIcons from '@element-plus/icons-vue'
import * as scIcons from './assets/icons'

export default {
	install(app) {
		//挂载全局对象
		app.config.globalProperties.$CONFIG = config;
		app.config.globalProperties.$TOOL = tool;
		app.config.globalProperties.$HTTP = http;
		app.config.globalProperties.$API = api;
		app.config.globalProperties.$AUTH = permission;
		app.config.globalProperties.$ROLE = rolePermission;

		//注册全局组件
		app.component('hlTable', scTable);
		app.component('hlTableColumn', scTableColumn);
		app.component('hlFilterBar', scFilterBar);
		app.component('hlUpload', scUpload);
		app.component('hlUploadMultiple', scUploadMultiple);
		app.component('hlUploadFile', scUploadFile);
		app.component('hlFormTable', scFormTable);
		app.component('hlTableSelect', scTableSelect);
		app.component('hlPageHeader', scPageHeader);
		app.component('hlSelect', scSelect);
		app.component('hlDialog', scDialog);
		app.component('hlForm', scForm);
		app.component('hlTitle', scTitle);
		app.component('hlWaterMark', scWaterMark);
		app.component('hlQrCode', scQrCode);
		app.component('hlStatusIndicator', scStatusIndicator);
		app.component('hlTrend', scTrend);

		//注册全局指令
		app.directive('auth', auth)
		app.directive('auths', auths)
		app.directive('auths-all', authsAll)
		app.directive('role', role)
		app.directive('time', time)
		app.directive('copy', copy)

		//统一注册el-icon图标
		for(let icon in elIcons){
			app.component(`ElIcon${icon}`, elIcons[icon])
		}
		//统一注册sc-icon图标
		for(let icon in scIcons){
			app.component(`ScIcon${icon}`, scIcons[icon])
		}

		//关闭async-validator全局控制台警告
		window.ASYNC_VALIDATOR_NO_WARNING = 1

		//全局代码错误捕捉
		app.config.errorHandler = errorHandler
	}
}
