module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `images/icon.svg`,
      category: 'customer',
    },
    // For Custom Activity this must say, "REST"
    type: 'REST',
    lang: {
      'en-US': {
        name: 'Discount Code',
        description:
          'Issue a discount code to contact them to entice them to buy something.',
      },
    },
    arguments: {
      execute: {
        // See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/how-data-binding-works.htm
        inArguments: [
          {
            discount: 15,
            anotherDiscount: 16,
            key: '{{Contact.Key}}',
            FirstName1: '{{Contact_Salesforce}}',
            FirstName2: '{{Contact.Contact_Salesforce}}',
            FirstName3: '{{Contact.Salesforce}}',
            FirstName3: '{{Contact_Salesforce.FirstName}}',
          },
        ],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers.host}/modules/discount-code/execute`,
        // The amount of time we want Journey Builder to wait before cancel the request. Default is 60000, Minimal is 1000
        timeout: 10000,
        // how many retrys if the request failed with 5xx error or network error. default is 0
        retryCount: 3,
        // wait in ms between retry.
        retryDelay: 1000,
        // The number of concurrent requests Journey Builder will send all together
        concurrentRequests: 5,
      },
    },
    configurationArguments: {
      publish: {
        url: `https://${req.headers.host}/modules/discount-code/publish`,
      },
      validate: {
        url: `https://${req.headers.host}/modules/discount-code/validate`,
      },
      stop: {
        url: `https://${req.headers.host}/modules/discount-code/stop`,
      },
    },
    userInterfaces: {
      configurationSupportsReadOnlyMode: true,
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true,
      },
    },
    schema: {
      arguments: {
        execute: {
          inArguments: [],
          outArguments: [
            {
              discountCode: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
              discount: {
                dataType: 'Number',
                direction: 'out',
                access: 'visible',
              },
              anotherDiscount: {
                dataType: 'Number',
                direction: 'out',
                access: 'visible',
              },
              key: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
              FirstName1: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
              FirstName2: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
              FirstName3: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
              FirstName4: {
                dataType: 'Text',
                direction: 'out',
                access: 'visible',
              },
            },
          ],
        },
      },
    },
  }
}
