
var FileHelper = require("./FileHelper").FileHelper;

var Item = require("../Models/Item").Item;

exports.StorageClientFilesystem = class StorageClientFilesystem
{
	constructor(fileHelper, directoryPathRoot)
	{
		this.fileHelper = fileHelper;
		this.directoryPathRoot = directoryPathRoot + "/";
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
		var doesRootDirectoryExist =
			this.fileHelper.directoryExistsAtPath(this.directoryPathRoot);

		if (doesRootDirectoryExist == false)
		{
			this.fileHelper.directoryCreateAtPath
			(
				this.directoryPathRoot
			);
		}

		var itemsDirectoryPath = this.itemsDirectoryPath();
		var doesItemsDirectoryExist =
			this.fileHelper.directoryExistsAtPath(itemsDirectoryPath);

		if (doesItemsDirectoryExist == false)
		{
			this.fileHelper.directoryCreateAtPath
			(
				itemsDirectoryPath
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

		var fileNamesInDirectory = this.fileHelper.fileNamesGetInDirectoryAtPathAsync
		(
			itemsDirectoryPath,
			(fileNames) =>
			{
				for (var i = 0; i < fileNames.length; i++)
				{
					var fileName = fileNames[i];
					var filePath = itemsDirectoryPath + fileName;
					this.fileHelper.fileAtPathContentsReadAsync
					(
						filePath,
						(fileContents) =>
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
					);
				}
			}
		);
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

			this.fileHelper.fileAtPathWriteStringAsync
			(
				itemFilePath,
				itemAsJsonString,
				() =>
				{
					itemsSavedSoFarCount++;
					if (itemsSavedSoFarCount >= itemsToSave.length)
					{
						callback.call(contextForCallback);
					}
				}
			);
		}
	}
}
