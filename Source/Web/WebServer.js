
var http = require("http");
var url = require("url");

var WebDivision =
	require("./Elements/WebDivision").WebDivision;
var WebHeading =
	require("./Elements/WebHeading").WebHeading;
var WebLabel =
	require("./Elements/WebLabel").WebLabel;
var WebList =
	require("./Elements/WebList").WebList;
var WebPage =
	require("./Elements/WebPage").WebPage;
var WebParagraph =
	require("./Elements/WebParagraph").WebParagraph;

exports.WebServer = class WebServer
{
	constructor
	(
		hostAddress,
		portNumber,
		storageClient,
		routes
	)
	{
		this.hostAddress = hostAddress;
		this.portNumber = portNumber;
		this.storageClient = storageClient;

		this.routes = routes;
		this._routesByPath = new Map
		(
			this.routes.map(x => [ x.path, x ] )
		);
	}

	pageGetForWebRequestDefault(webRequest)
	{
		var pageToReturn = null;

		this.storageClient.connect();
		this.storageClient.itemsGetAll
		(
			this, // context

			(itemsRetrieved) =>
			{
				pageToReturn = new WebPage
				(
					new WebDivision
					([
						new WebHeading(3, "Node.js Web Server with Backend"),
						new WebParagraph
						(
							"A simple Node.js web server with a backing data store."
						),
						new WebLabel("Items Retrieved:"),
						new WebList(itemsRetrieved)
					])
				);
			}
		);

		return pageToReturn;

	}

	routeByPath(path)
	{
		return this._routesByPath.get(path);
	}

	start()
	{
		this.server = http.createServer
		(
			this.handleRequest.bind(this)
		);

		this.server.listen(this.portNumber, this.hostAddress);
		console.log
		(
			"Server running at http://"
			+ this.hostAddress + ":" + this.portNumber + "/"
		);
	}

	// Event handlers.

	handleRequest(webRequest, webResult)
	{
		if (webRequest.url == "/favicon.ico")
		{
			// Ignore favicon requests.
		}
		else
		{
			var requestUrlParsed = url.parse(webRequest.url);
			var requestPath = requestUrlParsed.pathname;
			var routeForRequestPath =
				this.routeByPath(requestPath);

			var pageGetForPath =
			(
				routeForRequestPath == null
				? this.pageGetForWebRequestDefault
				: routeForRequestPath.pageGetForWebRequest
			);
			var pageToRender = pageGetForPath.call(this);

			var htmlToReturn = pageToRender.toStringHtml();
			console.log("Returning: " + htmlToReturn);

			webResult.writeHead
			(
				200, // OK
				{"Content-Type": "text/html"}
			);

			webResult.end(htmlToReturn);
		}
	}
}
