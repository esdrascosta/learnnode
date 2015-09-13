var Hopi = require('hapi'),
    server = new Hopi.Server(),
    Inert = require('inert'),
    Vision = require('vision'),
    H2o2 = require('h2o2'),
    Path = require('path');

server.register(Inert, function(err){
	if(err) throw err;
});

server.register(Vision, function(err){
	if(err) throw err;
});

server.register(H2o2, function(err){
	if(err) throw err;
});

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 3000)
});

server.views({
	engines:{
	   html: require('handlebars')
	},
	path: Path.join(__dirname,'templates')
});

server.route({
	        path: '/proxy',
		method: 'GET',
		handler: {
		    proxy: {
			host: '127.0.0.1',
			port: 65535
		    }
		}

	     });

server.route({
	      path:'/', 
	      method:'GET', 
              handler: { 
                  view: 'index.html' 
              }
             });

server.route({
              path:'/{name}', 
              method:'GET', 
              handler: function(request,reply){
	          reply(`Hello ${request.params.name}`);
              }
             });

server.route({
              path:'/foo/bar/baz/{file}', 
              method: 'GET', 
              handler:{ 
		directory :{
	          path: Path.join(__dirname,'./public')
		}
              }
             });

server.start(function(){
	console.log(`Server running at: ${ server.info.uri}`);
});
