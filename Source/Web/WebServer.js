
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
var WebPageFromElements =
	require("./WebPageFromElements").WebPageFromElements;
var WebPageFromHtmlFile =
	require("./WebPageFromHtmlFile").WebPageFromHtmlFile;
var WebPageStatusCodes =
	require("./Elements/WebPageStatusCodes").WebPageStatusCodes;
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

		this.isLoggingEnabled = false;
	}

	log(messageToLog)
	{
		if (this.isLoggingEnabled)
		{
			console.log(messageToLog);
		}
	}

	pageGetForWebRequestDefault(
		webRequest, contextForCallback, callback
	)
	{
		log("No route found.");

		var pageErrorNotFound = new WebPageFromHtmlFile(
			WebPageStatusCodes.Instance().NotFound,
			"Pages/Errors/NotFound.html"
		);
		
		callback.call(contextForCallback, pageErrorNotFound)
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
		this.log
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
			var dataReadFromRequestSoFar = "";

			webRequest.on
			(
				"readable",
				() =>
				{
					var dataReadFromRequestJustNow = webRequest.read();
					dataReadFromRequestSoFar +=
						dataReadFromRequestJustNow;
					console.log("drfrjn is: " + dataReadFromRequestJustNow);
				}
			);

			webRequest.on
			(
				"end",
				() =>
				{
					console.log("dataReadFromRequestSoFar is " + dataReadFromRequestSoFar);
				}
			);

			var requestUrlParsed = url.parse(webRequest.url);
			var requestPath = requestUrlParsed.pathname;
			var routeForRequestPath =
				this.routeByPath(requestPath);

			var pageGetForWebRequest =
			(
				routeForRequestPath == null
				? this.pageGetForWebRequestDefault
				: routeForRequestPath.pageGetForWebRequest
			);
			pageGetForWebRequest.call
			(
				this,
				webRequest,
				this, // contextForCallback
				(pageToRender) => // callback
				{
					var htmlToReturn =
						pageToRender.toStringHtmlForWebServer(this);
					this.log("Returning: " + htmlToReturn);

					webResult.writeHead
					(
						pageToRender.statusCode,
						{"Content-Type": "text/html"}
					);

					webResult.end(htmlToReturn);
				}
			);

		}
	}
}
