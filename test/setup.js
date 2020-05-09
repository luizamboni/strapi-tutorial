const strapi = require('strapi')();


const start = async function(cb) {
  try {
    await this.load();
    await this.freeze();


    if (cb && typeof cb === 'function') {
      cb();
    }
  } catch (err) {
      this.stopWithError(err);
  }
}


strapi.start = start;
start.bind(strapi)

before((done) => {

  strapi.start(() => {
    done()
  });
});

after(() => {
  strapi.stop(0);
});
