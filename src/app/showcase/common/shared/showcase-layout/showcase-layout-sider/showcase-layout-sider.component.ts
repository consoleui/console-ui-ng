import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-showcase-layout-sider',
  templateUrl: './showcase-layout-sider.component.html',
  styleUrls: ['./showcase-layout-sider.component.scss']
})
export class ShowcaseLayoutSiderComponent implements OnInit {

  navComps = [
    {title: 'Layout', children: [
      {title: 'Grid 栅格', routerLink: ['/showcase', 'grid']},
      {title: 'Layout 布局', routerLink: ['/showcase', 'layout']},
    ]},
    {title: 'Data Display', children: [
      {title: 'Table 表格', routerLink: ['/showcase', 'data', 'data-table']},
      {title: 'Tree 树', routerLink: ['/showcase', 'data', 'tree']},
    ]},
    {title: 'Forms', children: [
      {title: 'Editor 富文本编辑器', routerLink: ['/showcase', 'forms', 'ueditor']},
      {title: 'FileUpload 文件上传', routerLink: ['/showcase', 'forms', 'fileupload']},
    ]},
    {title: 'Utils', children: [
      {title: 'Cropper 图片裁剪', routerLink: ['/showcase', 'cropper']},
    ]},
  ];

  _navComps = [
    {title: 'General', children: [
      {title: 'Button 按钮', routerLink: ['/showcase', '']},
      {title: 'Icon 图标', routerLink: ['/showcase', '']},
    ]},
    {title: 'Layout', children: [
      {title: 'Grid 栅格', routerLink: ['/showcase', '']},
      {title: 'Layout 布局', routerLink: ['/showcase', 'layout']},
    ]},
    {title: 'Navigation', children: [
      {title: 'Affix 固钉', routerLink: ['/showcase', '']},
      {title: 'Breakcrumb 面包屑', routerLink: ['/showcase', '']},
      {title: 'Dropdown 下拉菜单', routerLink: ['/showcase', '']},
      {title: 'Menu 菜单', routerLink: ['/showcase', '']},
      {title: 'Pagination 分页', routerLink: ['/showcase', '']},
      {title: 'Steps 步骤条', routerLink: ['/showcase', '']},
    ]},
    {title: 'Data Entry', children: [
      {title: 'Caseader 级联选择', routerLink: ['/showcase', '']},
      {title: 'checkbox 多选框', routerLink: ['/showcase', '']},
      {title: 'DatePicker 日期选择框', routerLink: ['/showcase', '']},
      {title: 'Form 表单', routerLink: ['/showcase', '']},
      {title: 'InputNumber 数字输入框', routerLink: ['/showcase', '']},
      {title: 'Input 输入框', routerLink: ['/showcase', '']},
      {title: 'Rate 评分', routerLink: ['/showcase', '']},
      {title: 'Radio 单选框', routerLink: ['/showcase', '']},
      {title: 'Select 选择器', routerLink: ['/showcase', '']},
      {title: 'Slider 滑动输入条', routerLink: ['/showcase', '']},
      {title: 'Switch 开关', routerLink: ['/showcase', '']},
      {title: 'TimePicker 事件选择框', routerLink: ['/showcase', '']},
    ]},
    {title: 'Data Display', children: [
      {title: 'Avatar 头像', routerLink: ['/showcase', '']},
      {title: 'Badge 徽标', routerLink: ['/showcase', '']},
      {title: 'Calendar 日历', routerLink: ['/showcase', '']},
      {title: 'Card 卡片', routerLink: ['/showcase', '']},
      {title: 'Carousel 走马灯', routerLink: ['/showcase', '']},
      {title: 'Collapse 折叠面板', routerLink: ['/showcase', '']},
      {title: 'Popover 气泡卡片', routerLink: ['/showcase', '']},
      {title: 'Tooltip 文字提示', routerLink: ['/showcase', '']},
      {title: 'Table 表格', routerLink: ['/showcase', 'data', 'data-table']},
      {title: 'Tabs 标签页', routerLink: ['/showcase', '']},
      {title: 'Tag 标签', routerLink: ['/showcase', '']},
      {title: 'Timeline 时间轴', routerLink: ['/showcase', '']},
    ]},
    {title: 'FeedBack', children: [
      {title: 'Alert 警告提示', routerLink: ['/showcase', '']},
      {title: 'Message 全局提示', routerLink: ['/showcase', '']},
      {title: 'Modal 对话框', routerLink: ['/showcase', '']},
      {title: 'Notification 通知提醒框', routerLink: ['/showcase', '']},
      {title: 'Progress 进度条', routerLink: ['/showcase', '']},
      {title: 'Popconfirm 气泡确认框', routerLink: ['/showcase', '']},
      {title: 'Spin 加载中', routerLink: ['/showcase', '']},
    ]},
    {title: 'Other', children: [
      {title: 'Anchor 锚点', routerLink: ['/showcase', '']},
      {title: 'BackTop 回到顶部', routerLink: ['/showcase', '']},
    ]},
  ];

  constructor() { }

  ngOnInit() {
  }

}
