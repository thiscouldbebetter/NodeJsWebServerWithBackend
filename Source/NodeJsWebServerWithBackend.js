// Includes.

var http = require("http");

// Main.

class NodeJsWebServerWithBackend
{
	main()
	{
		var items =
		[
			new Item("Item0"),
			new Item("Item1"),
			new Item("Item2")
		];

		var database = new DatabaseClientMemory
		(
			items
		);

		var webServer = new WebServer
		(
			"127.0.0.1", // hostAddress
			1337, // portNumber
			database
		);

		webServer.start();
	}
}

// Classes.

class DatabaseClientMemory
{
	constructor(items)
	{
		this.items = items;
	}

	connect()
	{
		// Do nothing.
	}

	itemsGetAll(callback, contextForCallback)
	{
		var itemsRetrieved = this.items;
		callback.call(contextForCallback, itemsRetrieved);
	}
}

class Item
{
	constructor(name)
	{
		this.name = name;
	}

	toStringJson()
	{
		return JSON.stringify(this);
	}

	toStringHtml()
	{
		return this.toStringJson();
	}
}

class WebDiv
{
	constructor(children)
	{
		this.children = children;
	}

	toStringHtml()
	{
		var childrenAsHtml = this.children.map
		(
			x => x.toStringHtml()
		).join("\n");
		var divAsHtml =
			"<div>" + childrenAsHtml + "</div>";

		return divAsHtml;
	}
}

class WebHeading
{
	constructor(level, text)
	{
		this.level = level;
		this.text = text;
	}

	toStringHtml()
	{
		var headingAsHtml =
			"<h" + this.level + ">"
			+ this.text
			+ "</h" + this.level + ">";

		return headingAsHtml;
	}
}

class WebLabel
{
	constructor(text)
	{
		this.text = text;
	}

	toStringHtml()
	{
		return "<label>" + this.text + "</label>";
	}
}

class WebList
{
	constructor(elements)
	{
		this.elements = elements;
	}

	toStringHtml()
	{
		var elementsAsStringHtml = this.elements.map
		(
			x => "\t<li>" + x.toStringHtml() + "</li>"
		).join("\n");
		
		var listAsHtml =
			"<ul>\n" + elementsAsStringHtml + "\n</ul>";

		return listAsHtml;
	}
}

class WebPage
{
	constructor(elementRoot)
	{
		this.elementRoot = elementRoot;
	}

	toStringHtml()
	{
		var elementRootAsHtml =
			this.elementRoot.toStringHtml();

		var pageAsHtml =
			"<html>\n<body>\n"
			+ elementRootAsHtml
			+ "\n</body>\n</html>\n";

		return pageAsHtml;
	}
}

class WebParagraph
{
	constructor(text)
	{
		this.text = text;
	}

	toStringHtml()
	{
		return "<p>" + this.text + "</p>";
	}
}

class WebServer
{
	constructor(hostAddress, portNumber, database)
	{
		this.hostAddress = hostAddress;
		this.portNumber = portNumber;
		this.database = database;
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

		this.database.connect();
		this.database.itemsGetAll
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
			new WebDiv
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

// Run.

new NodeJsWebServerWithBackend().main();

