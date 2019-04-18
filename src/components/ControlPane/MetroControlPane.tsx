import * as React from 'react';
import Control from './Control';
import styles from './MetroControlPane.module.css';

export interface MetroControlPaneProps {
  current_language: string;
  current_theme_name: string;
  handleLanguageChange(e:React.SyntheticEvent): void;
  handleThemeChange(e:React.SyntheticEvent): void;
}

export const MetroControlPane = ({current_language, current_theme_name, handleLanguageChange, handleThemeChange}:MetroControlPaneProps) => {

  return (
    <Control position="topleft">
            <div className={styles.themePanel}>
              <form>
                <input
                  type="radio"
                  id="en"
                  checked={current_language === "en"}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="en">English</label>
                <input
                  type="radio"
                  id="te"
                  checked={current_language === "te"}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="te">Telugu</label>
              </form>
              <form>
                <input
                  type="radio"
                  id="light"
                  checked={current_theme_name === "light"}
                  onChange={handleThemeChange}
                />
                <label htmlFor="light">light</label>
                <input
                  type="radio"
                  id="dark"
                  checked={current_theme_name === "dark"}
                  onChange={handleThemeChange}
                />
                <label htmlFor="dark">dark</label>
              </form>
            </div>
          </Control>
  )
}