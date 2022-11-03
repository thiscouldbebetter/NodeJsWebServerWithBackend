// Includes.

// Models.

var Item =
	require("./Models/Item").Item;

// Storage.

//var StorageClientFilesystem = require("./Storage/StorageClientFilesystem").StorageClientFilesystem;
var StorageClientMemory = require("./Storage/StorageClientMemory").StorageClientMemory;

// Web.

var WebRoute =
	require("./Web/WebRoute").WebRoute;
var WebServer =
	require("./Web/WebServer").WebServer;

// Web/Elements.
var WebDivision =
	require("./Web/Elements/WebDivision").WebDivision;
var WebHeading =
	require("./Web/Elements/WebHeading").WebHeading;
var WebLabel =
	require("./Web/Elements/WebLabel").WebLabel;
var WebList =
	require("./Web/Elements/WebList").WebList;
var WebPage =
	require("./Web/Elements/WebPage").WebPage;
var WebParagraph =
	require("./Web/Elements/WebParagraph").WebParagraph;

// Main.

class NodeJsWebServerWithBackend
{
	main()
	{
		var storageClient =
			new StorageClientMemory();
			//new StorageClientFilesystem("./Data/");

		storageClient.initialize();

		var webServer = new WebServer
		(
			"127.0.0.1", // hostAddress
			1337, // portNumber
			storageClient,
			[
				new WebRoute
				(
					"/healthcheck",
					(webRequest) =>
					{
						return new WebPage
						(
							new WebParagraph("OK")
						)
					}
				)
			]
		);

		var items =
		[
			new Item("Item0"),
			new Item("Item1"),
			new Item("Item2")
		];

		storageClient.itemsSave
		(
			items,
			this,
			() =>
			{
				webServer.start();
			}
		);
	}
}

// Run.

new NodeJsWebServerWithBackend().main();

