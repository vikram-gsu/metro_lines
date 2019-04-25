import * as React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./ThemedButton.module.css";

interface ButtonProps {
  color: string;
  className: string;
  onClick?:(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
}
export class ThemedButton extends React.Component<ButtonProps> {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={this.props.className} {...this.props}>
        {this.props.children}
      </button>
    );
  }
}

ThemedButton.contextType = ThemeContext;