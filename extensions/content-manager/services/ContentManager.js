'use strict';

const _ = require('lodash');

/**
 * A set of functions called "actions" for `ContentManager`
 */

module.exports = {
  fetchAll(params, query) {
    const { query: request, populate, ...filters } = query;

    const queryFilter = !_.isEmpty(request)
      ? {
          ...filters, // Filters is an object containing the limit/sort and start
          ...request,
        }
      : filters;

    return strapi.entityService.find(
      { params: queryFilter, populate },
      { model: params.model }
    );
  },

  fetch(params, populate) {
    const { id, model } = params;

    return strapi.entityService.findOne(
      {
        params: {
          id,
        },
        populate,
      },
      { model }
    );
  },

  count(params, query) {
    const { model } = params;
    const { ...filters } = query;

    return strapi.entityService.count({ params: filters }, { model });
  },

  create(data, { files, model } = {}) {
    const [ , modelName ] = model.split('.')


    const service = strapi.services[modelName]
    if (service) { 
        return service.create(data, { files })
    } else {
        return strapi.entityService.create({ data, files }, { model });
    }
  },

  edit(params, data, { model, files } = {}) {

    const [ , modelName ] = model.split('.')


    const service = strapi.services[modelName]
    if (service) {
      return service.update(params, data, { files })
    } else {
      return strapi.entityService.update({ params, data, files }, { model })
    }
  },

  delete(params) {
    const { id, model } = params;

    const [ , modelName ] = model.split('.')

    const service = strapi.services[modelName]

    if (service) {
        return service.delete({ id })
    } else {
        return strapi.entityService.delete({ params: { id } }, { model });
    }
  },

  deleteMany(params, query) {
    const { model } = params;

    const { primaryKey } = strapi.query(model);

    const [ , modelName ] = model.split('.')
    const service = strapi.services[modelName]
    if (service) {
        return Promise.all(Object.values(query).map(id =>
            service.delete({id})
        ))
    } else {
        const filter = { [`${primaryKey}_in`]: Object.values(query), _limit: 100 };
        return strapi.entityService.delete({ params: filter }, { model });   
    }
  },

  search(params, query) {
    const { model } = params;

    return strapi.entityService.search({ params: query }, { model });
  },

  countSearch(params, query) {
    const { model } = params;
    const { _q } = query;

    return strapi.entityService.countSearch({ params: { _q } }, { model });
  },
};
