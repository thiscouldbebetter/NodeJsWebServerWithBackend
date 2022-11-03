// Includes.

var StorageClientMemory =
	require("./Storage/StorageClientMemory").StorageClientMemory;
var Item =
	require("./Models/Item").Item;
var WebServer =
	require("./Web/WebServer").WebServer;

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

		var storageClient = new StorageClientMemory
		(
			items
		);

		var webServer = new WebServer
		(
			"127.0.0.1", // hostAddress
			1337, // portNumber
			storageClient
		);

		webServer.start();
	}
}

// Run.

new NodeJsWebServerWithBackend().main();

