import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import JIcon from '@/components/JIcon'
// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('j-icon', JIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
