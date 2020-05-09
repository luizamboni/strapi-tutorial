const strapi = require('strapi')();


/*
* create a proxy for strapi.start()
* that prevent open in browser and other 
* annoying  behaviours as undesirable console outputs
*/
const start = new Proxy(strapi.start, {
  
  apply: async (target, thisArgs, argumentList) => {
    const [ cb ] = argumentList;

    try {
      await thisArgs.load();
      await thisArgs.freeze();


      if (cb && typeof cb === 'function') {
        cb();
      }
    } catch (err) {
      thisArgs.stopWithError(err);
    }
  }
})


strapi.start = start;

before((done) => {

  strapi.start(() => {
    done()
  });
});

after(() => {
  strapi.stop(0);
});
