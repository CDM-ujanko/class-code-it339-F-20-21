const cheerio = require('cheerio');

module.exports = rdf => {
 let book = {}
 const $ = cheerio.load(rdf);
 book.id = parseInt($('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''));
 book.title = $('dcterms\\:title').text();
 book.authors = $('pgterms\\:agent pgterms\\:name')
     .toArray()
     .map((item) => $(item).text());

 book.subjects = $('[rdf\\:resource$="/LCSH"]')
     .parent()
     .find('rdf\\:value')
     .toArray()
     .map((item) => $(item).text());
 return book;
}

// function x(rdf) {
//   return {}
// }
//
// module.exports = x;