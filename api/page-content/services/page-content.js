'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const modelName = 'page-content'

module.exports = {

    _validate(data) {
        if (!(data.startAt < data.endAt)){
            throw new Error("startAt should be less than endAt date")
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
