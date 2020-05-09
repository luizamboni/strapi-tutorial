const { expect } = require('chai');

describe('strapi.services.link', () => {
    describe('#create', () => {
        context('with invalid data', () => {
            it('should fails', async () => {
                try {
                    await strapi.services.link.create({ 
                        name: "invalid",
                        url: 'invalid-url-formt'
                    })
                } catch(err) {
                    expect(err.message).to.be.eqls('url field should be a valid url')
                }
            })
        })
        context('with valid data', () => {
            it('should create', async () => {             
                
                const pageContent = await strapi.services.link.create({ 
                    name: "invalid",
                    url: 'https://valid.url.format'
                })

                expect(pageContent).to.be.not.null
            })
        })
    })
})