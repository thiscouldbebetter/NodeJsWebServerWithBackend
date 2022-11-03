
var fs = require('fs');

var Item = require("../Models/Item").Item;

exports.StorageClientFilesystem = class StorageClientFilesystem
{
	constructor(directoryPathRoot)
	{
		this.directoryPathRoot = directoryPathRoot + "/";

		this.textEncodingName = "utf8";
	}

	connect()
	{
		// Do nothing.
		return this;
	}

	disconnect()
	{
		// Do nothing.
		return this;
	}

	initialize()
	{
		if (fs.existsSync(this.directoryPathRoot) == false)
		{
			fs.mkdir
			(
				this.directoryPathRoot, 
				(err) =>
				{
					if (err != null)
					{
						throw err;
					}
				}
			);
		}

		var itemsDirectoryPath = this.itemsDirectoryPath();
		if (fs.existsSync(itemsDirectoryPath) == false)
		{
			fs.mkdir
			(
				itemsDirectoryPath,
				(err) =>
				{
					if (err != null)
					{
						throw err;
					}
				}
			);
		}

		return this;
	}

	itemsDirectoryPath()
	{
		return this.directoryPathRoot + "Items/";
	}

	itemsGetAll(contextForCallback, callback)
	{
		var itemsRetrievedSoFar = [];

		var itemsDirectoryPath = this.itemsDirectoryPath();

		var itemsReadSoFarCount = 0;

		var fileNamesInDirectory = fs.readdir
		(
			itemsDirectoryPath,
			(err, fileNames) =>
			{
				for (var i = 0; i < fileNames.length; i++)
				{
					var fileName = fileNames[i];
					var filePath = itemsDirectoryPath + fileName;
					fs.readFile
					(
						filePath,
						this.textEncodingName,
						(err, fileContents) =>
						{
							if (err)
							{
								throw err;
							}
							else
							{
								var itemAsJson = fileContents;
								var item =
									Item.fromStringJson(itemAsJson);
								itemsRetrievedSoFar.push(item);
								itemsReadSoFarCount++;
								if (itemsReadSoFarCount >= fileNames.length)
								{
									callback.call(contextForCallback, itemsRetrievedSoFar);
								}
							}
						}
					);
				}
			}
		);

		callback.call(contextForCallback, itemsRetrievedSoFar);
	}

	itemsSave(itemsToSave, contextForCallback, callback)
	{
		var directoryPath = this.itemsDirectoryPath();

		for (var i = 0; i < itemsToSave.length; i++)
		{
			var item = itemsToSave[i];

			var itemAsJsonString = item.toStringJson();
			var itemFilePath = directoryPath + item.id() + ".json";

			var itemsSavedSoFarCount = 0;

			fs.writeFile
			(
				itemFilePath,
				itemAsJsonString,
				this.textEncodingName,
				(err, data) =>
				{
					if (err != null)
					{
						throw err;
					}
					else
					{
						itemsSavedSoFarCount++;
						if (itemsSavedSoFarCount >= itemsToSave.length)
						{
							callback.call(contextForCallback, data);
						}
					}
				}
			);
		}
	}
}
