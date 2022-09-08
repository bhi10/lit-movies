import { ThemeStyle } from "@dreamworld/material-styles";
import { css } from "lit-element";

export const TmdbThemeStyle = css`
  ${ThemeStyle}

  :host {
    --mdc-theme-primary: #17368c;
    --mdc-theme-secondary: #c12a5d;

    --mdc-theme-text-primary: var(--mdc-theme-text-primary-on-background);

    /** text field custom CSS */
    --mdc-text-field-outlined-idle-border-color: var(
      --mdc-theme-text-hint-on-background
    );
    --mdc-text-field-outlined-hover-border-color: var(
      --mdc-theme-text-primary-on-background
    );
    --mdc-text-field-label-ink-color: var(
      --mdc-theme-text-secondary-on-background
    );
    --mdc-text-field-disabled-ink-color: var(
      --mdc-theme-text-disabled-on-background
    );
    --mdc-text-field-ink-color: var(--mdc-theme-text-primary-on-background);
    /** text field custom CSS */
  }
`;
