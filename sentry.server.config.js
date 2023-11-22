import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fa3d049817b69ea7b2d5a930b0640b8c@o4506263865982976.ingest.sentry.io/4506263872471040",

  tracesSampleRate: 1,

  debug: false,
});
