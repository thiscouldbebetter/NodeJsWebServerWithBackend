
exports.StorageClientMemory = class StorageClientMemory
{
	constructor()
	{
		this.items = [];
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
		// Do nothing.
		return this;
	}

	itemsGetAll(contextForCallback, callback)
	{
		var itemsRetrieved = this.items;
		callback.call(contextForCallback, itemsRetrieved);
	}

	itemsSave(itemsToSave, contextForCallback, callback)
	{
		this.items.push(...itemsToSave);
		callback.call(contextForCallback);
	}
}
