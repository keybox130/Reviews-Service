const { exec } = require('child_process');

/**
 * Load data into cache using redis-cli pipe mode
 * @param None
 */
module.exports.load = () => {
  const cmd = `cat ./public/db/rooms.txt | redis-cli -h localhost -p 6379 --pipe`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
