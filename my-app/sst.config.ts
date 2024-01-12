import { SSTConfig } from "sst";
import { Bucket, NextjsSite, Service } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "my-app",
      region: "ca-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      
      const bucket = new Bucket(stack, "public");

      const service = new Service(stack, "MyService", {
        path: "./service",
        port: 8080,
        bind: [bucket]
      });

      const site = new NextjsSite(stack, "site", {
        bind: [service, bucket],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
