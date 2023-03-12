
export const localize = (i18next) => BaseElement => class extends BaseElement {
  /**
    * Declared properties and their corresponding attributes
    */
  static get properties() {
    return {

      /**
       * Language ISO Code. e.g. `en` for English. `hi` for Hindi.
       * This property is mainly for the output property, it's set/changed as per the `i18next` configuration.
       * In most of the cases, this isn't need to be used by anyone. But, it's declared as property as re-render
       * is triggered automatically, when it's changed.
       */
      language: {
        type: String
      },

      /**
       * When it's `true`, do not delay rendering.
       */
      doNotDelayRendering: { type: Boolean },
    };
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.__initLocalize();
  }

  /**
   * @returns `true` when Parent Class returns `true` & language resources is loaded except `doNotDelayRendering` is set to `true`.
   * @param {Object} changedProps Changed properties
   */
  shouldUpdate(changedProps) {
    return super.shouldUpdate(changedProps) && (this.doNotDelayRendering || this.language);
  }

  async __initLocalize() {
    await this.__initI18n();
    await this.__loadI18nextNamespaces();
    this._setLanguage(i18next.language);
    i18next.on('languageChanged', () => {
      this._setLanguage(i18next.language);
    });
  }

  /**
   * A protected function which implement can override to do some custom work when language is changed. e.g. If
   * some properties are bound with imperative bindings then those can be re-computed from this function.
   * 
   * Default implementation sets/updates `language` property, which triggered re-render of the element. So, don't
   * forget to invoke super function.
   * 
   * @param {String} newLanguage 
   */
  _setLanguage(newLanguage) {
    this.language = newLanguage;
  }

  __initI18n() {
    if (i18next.isInitialized) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      i18next.on('initialized', () => {
        resolve();
      });
    });
  }

  __loadI18nextNamespaces() {
    if (!this.i18nextNameSpaces || this.i18nextNameSpaces.length == 0) {
      return Promise.resolve();
    }
    return i18next.loadNamespaces(this.i18nextNameSpaces);
  }
};

export default localize;