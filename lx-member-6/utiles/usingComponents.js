import  uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
import lxcCount from '@/components/lxc-count/lxc-count.vue'
// 存放全局组件的数组
const components=[
	uniPopupDialog,
	ypNumberBox,
	lxcCount
]
function install(vue){
	components.forEach(component=>{
		vue.component(component.name,component)
	})
	if(typeof window!=="undefined"&&window.Vue) install(window.Vue)
}
export default install