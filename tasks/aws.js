const gulp = require('gulp');
const AWS = require('aws-sdk');
const fs = require('fs');
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const version = '0.0.' + process.env.BUILDKITE_BUILD_NUMBER || '0';
const environment = process.env.ENVIRONMENT || 'dev';
var appName = 'indigo-backend';
if (environment === 'production') {
  appName = 'inquisicorp-backend';
  AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PROD;
  AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PROD;
}


AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

gulp.task('push-to-s3', (done) => {
  const s3 = new AWS.S3();
  s3.createBucket({
    Bucket: appName,
  }, (err) => {
    if (err && err.code !== 'BucketAlreadyOwnedByYou') {
      throw new gutil.PluginError('push-to-s3', err);
    }
    s3.upload({
      Bucket: appName,
      Key: `${appName}-${environment}.zip`,
      Body: fs.createReadStream(`zip/${appName}-${environment}.zip`),
    }, (uploadErr) => {
      if (uploadErr) {
        throw new gutil.PluginError('push-to-s3', uploadErr);
      }
      done();
    });
  });
});

gulp.task('update-elastic-beanstalk', ['push-to-s3'], (done) => {
  const eb = new AWS.ElasticBeanstalk();
  eb.createApplicationVersion({
    ApplicationName: appName,
    VersionLabel: version,
    SourceBundle: {
      S3Bucket: appName,
      S3Key: `${appName}-${environment}.zip`,
    },
  }, (err) => {
    if (err) {
      throw new gutil.PluginError('update-elastic-beanstalk', err);
    }

    eb.updateEnvironment({
      ApplicationName: appName,
      EnvironmentName: `${appName}-${environment}`,
      VersionLabel: version,
    }, (updateEnvironmentErr) => {
      if (updateEnvironmentErr) {
        throw new gutil.PluginError('update-elastic-beanstalk', updateEnvironmentErr);
      }
      done();
    });
  });
});

function deleteBucket(s3, bucket) {
  s3.deleteBucket({
    Bucket: bucket,
  }, (deleteBucketError) => {
    if (deleteBucketError) {
      throw new gutil.PluginError('delete-picture-bucket', deleteBucketError);
    }
    console.log('Bucket successfully deleted');
  });
}
