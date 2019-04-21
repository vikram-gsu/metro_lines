import * as React from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './ThemedButton.module.css';

export class ThemedButton extends React.Component {

 render(){
  return <button className={styles[`${this.context}Button`]} {...this.props} >
  {this.props.children}
    </button>
 }
}

ThemedButton.contextType = ThemeContext;