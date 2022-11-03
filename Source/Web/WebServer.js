
var http = require("http");

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
	constructor(hostAddress, portNumber, storageClient)
	{
		this.hostAddress = hostAddress;
		this.portNumber = portNumber;
		this.storageClient = storageClient;
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
			return;
		}

		this.storageClient.connect();
		this.storageClient.itemsGetAll
		(
			this.handleRequest_ItemsGetAllComplete.bind(this, webResult),
			this // context
		);
	}

	handleRequest_ItemsGetAllComplete(webResult, itemsRetrieved)
	{
		webResult.writeHead
		(
			200, // OK
			{"Content-Type": "text/html"}
		);

		var pageToReturn = new WebPage
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
		var htmlToReturn = pageToReturn.toStringHtml();

		console.log("Returning: " + htmlToReturn);

		webResult.end(htmlToReturn);
	}
}
