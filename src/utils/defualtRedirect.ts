const DEFAULT_REDIRECT_CALLBACK: Function = (): void =>
  window.history.replaceState({}, document.title, window.location.pathname);


export default DEFAULT_REDIRECT_CALLBACK;