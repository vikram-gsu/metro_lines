import React from 'react';

type Icon = string | React.ElementType;
type Anchor = 'top' | 'bottom';
type Position = 'left' | 'right';

interface TabProps{
  id: string,
  header: string,
  icon:Icon,
  anchor?: Anchor,
  disabled?: boolean,
  onClose?: () => void,
  closeIcon?: Icon,
  position?: Position,
  active?: boolean
}
declare class Tab extends React.Component<TabProps, any>{}

type TabType = Tab | Tab[]

interface SidebarProps {
  id: string,
  collapsed: boolean,
  position: Position,
  selected: string,
  closeIcon?: Icon,
  onClose?:() => void,
  onOpen?: () => void,
  children: TabType
}

declare class Sidebar extends React.Component<SidebarProps, any>{}

export {Tab, Sidebar}