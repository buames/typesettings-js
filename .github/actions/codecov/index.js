const { exec } = require('child_process');

const upload = (done) => {
  exec(
    'curl -s https://codecov.io/bash | bash -s -- -t ${CODECOV_TOKEN}',
    (error, stdout, stderr) => {
      if (error) throw error;
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      done();
    },
  );
};

upload(() => {
  console.log('Done!');
});
