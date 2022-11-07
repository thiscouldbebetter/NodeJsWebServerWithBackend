// Includes.

// Models.

var Item =
	require("./Models/Item").Item;

// Storage.

var FileHelper =
	require("./Storage/FileHelper").FileHelper;
var StorageClientFilesystem = require("./Storage/StorageClientFilesystem").StorageClientFilesystem;
//var StorageClientMemory = require("./Storage/StorageClientMemory").StorageClientMemory;

// Web.

var WebRoute =
	require("./Web/WebRoute").WebRoute;
var WebServer =
	require("./Web/WebServer").WebServer;

// Web/Elements.
var WebPageFromElements =
	require("./Web/WebPageFromElements").WebPageFromElements;
var WebPageStatusCodes =
	require("./Web/Elements/WebPageStatusCodes").WebPageStatusCodes;
var WebParagraph =
	require("./Web/Elements/WebParagraph").WebParagraph;

// Main.

class NodeJsWebServerWithBackend
{
	main()
	{
		var fileHelper = new FileHelper();

		var storageClient =
			//new StorageClientMemory();
			new StorageClientFilesystem(fileHelper, "../Data/");

		storageClient.initialize();

		var webServer = new WebServer
		(
			"127.0.0.1", // hostAddress
			1337, // portNumber
			storageClient,
			[
				WebRoute.fromUrlAndFilePaths("/", "Pages/Welcome.html"),
				WebRoute.fromUrlPathAndPage
				(
					"/healthcheck",
					new WebPageFromElements
					(
						WebPageStatusCodes.Instance().Ok,
						new WebParagraph("OK")
					)
				),
				WebRoute.fromUrlAndFilePaths
				(
					"/fromFile", "Pages/FromFile.html"
				),
				WebRoute.fromPageName("ItemSearch"),
				WebRoute.fromPageName("UserDetails"),
				WebRoute.fromPageName("UserLogin"),
				WebRoute.fromPageName("UserLoginExecute")
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

