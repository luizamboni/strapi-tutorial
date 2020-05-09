const { expect } = require('chai');

describe('strapi.services.page', () => {
    describe('#create', () => {
        context('with invalid data', () => {
            it('should fails', async () => {
                try {
                    await strapi.services['page-content'].create({ 
                        name: "invalid",
                        startAt: '2020-05-07T15:00:00.000Z',
                        endAt: '2020-05-05T15:00:00.000Z'
                    })
                } catch(err) {
                    expect(err.message).to.be.eqls('startAt should be less than endAt date')
                }
            })
        })
        context('with valid data', () => {
            it('should create', async () => {             
                
                const pageContent = await strapi.services['page-content'].create({ 
                    name: "valid",
                    startAt: '2020-05-07T15:00:00.000Z',
                    endAt: '2020-05-10T15:00:00.000Z'
                })

                expect(pageContent).to.be.not.null
            })
        })
    })
})