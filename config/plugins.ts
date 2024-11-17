export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        region: env("AWS_REGION", "af-south-1"),
        params: {
          ACL: env("AWS_ACL", "private"),
          signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 7 * 24 * 60 * 60),
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
