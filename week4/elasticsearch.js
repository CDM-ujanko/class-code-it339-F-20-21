'use strict'

let program = require('commander'),
    fs = require('fs'),
    axios = require('axios');

function fullUrl (path = '') {
  let url = `http://${program.host}:${program.port}/`
  if (program.index) {
    url += `${program.index}/`
    if (program.type) {
      url += `${program.type}/`
    }
  }
  return url + path.replace(/^\/*/, '')
}


program
    .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
    .option('-p, --port <number>', 'port [port]', '9200')
    .option('-i, --index <name>', 'What index to use', 'books')
    .option('-t, --type <pizza>', 'What type to use', 'book');

program
    .command('delete [id]')
    .description('Deletes a recourse by ID')
    .action((id) => {

      axios.delete(fullUrl(id))
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          })
    });

program
    .command('deleteBooks')
    .description('Deletes a recourse by ID')
    .action((id) => {

      axios.delete('http://localhost:9200/books')
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          })
    });

program
    .command('createBooks')
    .description('Deletes a recourse by ID')
    .action((id) => {

      axios.put('http://localhost:9200/books')
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          })
    });

program
    .command('bulk [file]')
    .description('Adds bulk files')
    .action(file => {
      fs.stat(file, (err, stats) => {
        if (err) throw err;

        axios({
          method: 'POST',
          url: fullUrl('_bulk'),
          data: fs.createReadStream(file),
          headers: {
            'Content-Length': stats.size,
            'Content-Type': 'application/json',
          },
          maxContentLength: 100000000,
          maxBodyLength: 1000000000
        }).then(console.log)
          .catch(console.error)
      })
    });

program.parse(process.argv);