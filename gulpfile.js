const gulp = require('gulp');
const gutil = require('gulp-util');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const AWS = require('aws-sdk');
const fs = require('fs');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const runSequence = require('run-sequence');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');

const environment = process.env.ENVIRONMENT || 'dev';
var appName = 'indigo-backend';
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

if(environment === 'production'){
	appName = 'inquisicorp-backend';
	AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PROD;
	AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PROD;
}


var version = process.env.BUILDKITE_BUILD_NUMBER || '0';
version = '0.0.'+version;
const coverageOptions = {
	statements: 80,
	branches: 70,
	lines: 80,
	functions: 80
};

AWS.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: 'us-east-1',
});

gulp.task('lint', function() {
	return gulp.src(['!node_modules/**', './server.js', 'app/**/*.js'
		])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('clean-dist', () => {
	return gulp.src(['dist/'], {
			read: false,
		})
		.pipe(clean());
});

gulp.task('zip-app', () => {
	return gulp.src(['./**/*.*'], {
			base: './'
		})
		.pipe(zip(`${appName}-${environment}.zip`))
		.pipe(gulp.dest('./dist'));
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
			Body: fs.createReadStream(`dist/${appName}-${environment}.zip`),
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
			VersionLabel: process.env.APPVEYOR_BUILD_VERSION || version,
		}, (updateEnvironmentErr) => {
			if (updateEnvironmentErr) {
				throw new gutil.PluginError('update-elastic-beanstalk', updateEnvironmentErr);
			}
			done();
		});
	});
});

gulp.task('istanbul-setup', function istanbulSetup() {
	return gulp.src(['app/handlers/**/*.js'])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['istanbul-setup'], function test() {
	return gulp.src(['test/**/*.js'], {
			read: false,
		})
		.pipe(mocha())
		.pipe(istanbul.writeReports({
			reporters: ['html', 'text-summary', 'lcov'],
		}))
		.pipe(istanbul.enforceThresholds({ thresholds: { global: coverageOptions } }));
});

gulp.task('watch', function () {
	nodemon({
		script: 'server.js',
		ext: 'js'
	})
})

gulp.task('deploy', (callback) => {
	return runSequence(
		'zip-app', 'update-elastic-beanstalk',
		callback
	);
});

gulp.task('default', (callback) => {
	return runSequence(
		'clean-dist', 'lint', 'test',
		callback
	);
});
