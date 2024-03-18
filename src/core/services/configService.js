const config = {
  _configPromise: null,

  loadConfig() {
    if (!this._configPromise) {
      this._configPromise = fetch('/config.json')
        .then(response => response.json())
        .then(data => {
          Object.assign(config, data);
        })
        .catch(err => {
          console.error(err);
        });
    }
    return this._configPromise;
  },
};

export default config;
