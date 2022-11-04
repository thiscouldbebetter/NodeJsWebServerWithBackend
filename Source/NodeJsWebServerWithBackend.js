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

var WebPageFromHtmlFile =
	require("./Web/WebPageFromHtmlFile").WebPageFromHtmlFile;
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
				new WebRoute
				(
					"/",
					(webRequest, contextForCallback, callback) =>
					{
						var page = new WebPageFromHtmlFile
						(
							fileHelper,
							WebPageStatusCodes.Instance().Ok,
							"Pages/Welcome.html"
						);

						callback.call(contextForCallback, page);
					}
				),

				new WebRoute
				(
					"/healthcheck",
					(webRequest, contextForCallback, callback) =>
					{
						callback.call
						(
							contextForCallback,
							new WebPageFromElements
							(
								WebPageStatusCodes.Instance().Ok,
								new WebParagraph("OK")
							)
						);
					}
				),

				new WebRoute
				(
					"/fromFile",
					(webRequest, contextForCallback, callback) =>
					{
						var page = new WebPageFromHtmlFile
						(
							fileHelper,
							WebPageStatusCodes.Instance().Ok,
							"Pages/FromFile.html"
						);

						callback.call(contextForCallback, page);
					}
				),

				new WebRoute
				(
					"/ItemSearch.html",
					(webRequest, contextForCallback, callback) =>
					{
						var page = new WebPageFromHtmlFile
						(
							fileHelper,
							WebPageStatusCodes.Instance().Ok,
							"Pages/ItemSearch.html"
						);

						callback.call(contextForCallback, page);
					}
				),


				new WebRoute
				(
					"/UserDetails.html",
					(webRequest, contextForCallback, callback) =>
					{
						var page = new WebPageFromHtmlFile
						(
							fileHelper,
							WebPageStatusCodes.Instance().Ok,
							"Pages/UserDetails.html"
						);

						callback.call(contextForCallback, page);
					}
				),

				new WebRoute
				(
					"/UserLogin.html",
					(webRequest, contextForCallback, callback) =>
					{
						var page = new WebPageFromHtmlFile
						(
							fileHelper,
							WebPageStatusCodes.Instance().Ok,
							"Pages/UserLogin.html"
						);

						callback.call(contextForCallback, page);
					}
				),

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

