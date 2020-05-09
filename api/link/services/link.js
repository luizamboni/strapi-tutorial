'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const modelName = 'link';

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }
  

module.exports = {

    _validate(data) {
        if (!isValidUrl(data.url)){
            throw new Error("url field should be a valid url")
        }
    },

    create(data, { files } = {}) {

        this._validate(data);

        return strapi.entityService
          .create({ data, files }, { model: modelName })
    },
    
    update(params, data, { files } = {}) {
        
        this._validate(data);
        return strapi.entityService
          .update({ params, data, files }, { model: modelName })
    },  
};
