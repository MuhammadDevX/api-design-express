import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

const loadConfig = async () => {
  let envConfigModule;

  if (stage === "production") {
    envConfigModule = await import("./product.js");
  } else if (stage === "testing") {
    envConfigModule = await import("./testing.js");
  } else {
    envConfigModule = await import("./local.js");
  }

  const envConfig = envConfigModule.default;

  return merge(
    {
      stage,
      env: process.env.NODE_ENV,
      port: 3001,
      secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL,
      },
    },
    envConfig
  );
};

export default await loadConfig();
