
exports.StorageClientMemory = class StorageClientMemory
{
	constructor(items)
	{
		this.items = items;
	}

	connect()
	{
		// Do nothing.
	}

	itemsGetAll(contextForCallback, callback)
	{
		var itemsRetrieved = this.items;
		callback.call(contextForCallback, itemsRetrieved);
	}
}
