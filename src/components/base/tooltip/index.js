/**
 * Created by kingj on 2019/3/13
 */
import Tooltip from './src/main'

/* istanbul ignore next */
Tooltip.install = function (Vue) {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
