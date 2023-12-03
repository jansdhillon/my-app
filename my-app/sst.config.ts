import { SSTConfig } from "sst";
import { NextjsSite, Service } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "my-app",
      region: "ca-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      

      const service = new Service(stack, "MyService", {
        path: "./service"
      });

      const site = new NextjsSite(stack, "site", {
        bind: [service],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
