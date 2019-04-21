import * as React from "react";
import { Sidebar } from "react-leaflet-sidebarv2";
import { ThemeContext } from "../../contexts/ThemeContext";

type Icon = string | React.ElementType;
type Anchor = 'top' | 'bottom';
type Position = 'left' | 'right';

interface TabProps {
  id: string;
  header: string;
  icon: Icon;
  anchor?: Anchor;
  disabled?: boolean;
  onClose?: () => void;
  closeIcon?: Icon;
  position?: Position;
  active?: boolean;
}

declare class Tab extends React.Component<TabProps, any> {}

type TabType = React.ReactElement<Tab> | Array<React.ReactElement<Tab>>;

interface SidebarProps {
  id: string;
  collapsed: boolean;
  position: Position;
  selected: string;
  closeIcon?: Icon;
  onClose?: () => void;
  onOpen?: () => void;
  children: TabType;
}

export class ThemedSidebar extends React.Component<SidebarProps> {
  // state = {
  //   current_theme : 'light'
  // }
  componentDidUpdate() {
    if (this.context === "dark") {
      require("../../themes/dark.css");
    } else if (this.context === "light") {
      require("../../themes/light.css");
    }
  }

  // shouldComponentUpdate(nextProps:object, nextState:object){
  //   if this.context != this.state.current_theme 
  //     return true;
  // }
  render() {
    return (
      <Sidebar id={this.props.id} {...this.props}>
        {this.props.children}
      </Sidebar>
    );
  }
}

ThemedSidebar.contextType = ThemeContext;
