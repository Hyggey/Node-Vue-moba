import Vue from 'vue'


import { 
    Button, 
    Select,
    Container,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Header,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Main,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Message,
    MessageBox
 } from 'element-ui';

//  message需要挂载载vue实例，因为vue实例上没有这个方法
 Vue.prototype.$message = Message
 Vue.prototype.$confirm = MessageBox.confirm 

Vue.component(Button.name, Button)
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Header.name, Header)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Main.name, Main)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
// Vue.component(Message.name, Message)


