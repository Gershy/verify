let [ http, { promises: fs }, path ] = [ 'http', 'fs', 'path' ].map(require);
let [ protocol, host, port ] = (process.argv[2] || 'http://localhost:80').split(/:[/][/]|:/);
console.log('Params:', { protocol, host, port });

(async () => {
  
  // Send response
  let serve = (res, status, content, type) => {
    res.writeHead(status, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(content) });
    res.end(content);
  };
  
  let readFile = (...fp) => fs.readFile(path.join(__dirname, ...fp));
  let server = http.createServer(async (req, res) => {
    
    let serveReq = (...args) => {
      console.log(`${req.connection.remoteAddress} <- ${req.url}`);
      serve(...args);
      console.log('');
    };
    
    try {
      
      let servables = JSON.parse(await readFile('asset', 'assets.json'));
      let [ url, query ] = req.url.slice(1).split('?');
      let [ contentType=null, code=null, ...fp ] = servables[url] || [];
      
      if (code && query !== code) throw new Error(``);
      
      if (!contentType) throw new Error(`Unknown asset: ${req.url}`);
      serveReq(res, 200, await readFile(...fp), contentType);
      
    } catch(err) {
      
      console.log(`Error occurred: ${err.stack}`);
      serveReq(res, 400, 'Your request is not fit for NASA', 'text/plain');
      
    }
    
  });
  
  server.listen(port, host);
  
  console.log(`Listening on ${protocol}://${host}:${port}`);
  
})();