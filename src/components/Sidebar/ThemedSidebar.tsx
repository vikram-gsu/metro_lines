import * as React from "react";
import { Sidebar } from "react-leaflet-sidebarv2";
import { ThemeContext } from "../../contexts/ThemeContext";
import {SidebarProps} from '../../types/Sidebar';

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
