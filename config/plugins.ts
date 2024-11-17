export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        region: env("AWS_REGION", "af-south-1"),
        params: {
          ACL: env("AWS_ACL"),
          signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 6000),
          Bucket: env("AWS_BUCKET", "pdoprototypes-edo-prototype-storage1"),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
