import * as React from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styles from "./ThemedButton.module.css";
import classNames from 'classnames';


interface ButtonProps {
  color: string;
  onClick?:(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; 
}
export class ThemedButton extends React.Component<ButtonProps> {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={classNames(styles.lineButton, styles['dark'])} style={{color: this.props.color}} {...this.props}>
        {this.props.children}
      </button>
    );
  }
}

ThemedButton.contextType = ThemeContext;
