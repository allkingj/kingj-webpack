/**
 * Created by kingj on 2019/3/8
 */
import MenuItem from './aria-menubar'

const Menu = function (domNode) {
  this.domNode = domNode
  this.init()
}
Menu.prototype.init = function () {
  let menuChildren = this.domNode.childNodes
  Array.filter.call(menuChildren, child => child.nodeType === 1).forEach(child => {
    new MenuItem(child) // eslint-disable-line
  })
}
export default Menu
