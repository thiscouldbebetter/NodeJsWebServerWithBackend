
var fs = require('fs');

exports.FileHelper = class FileHelper
{
	constructor()
	{
		this.textEncodingName = "utf8";
	}

	directoryCreateAtPath(directoryPath)
	{
		fs.mkdir
		(
			directoryPath, 
			(err) =>
			{
				if (err != null)
				{
					throw err;
				}
			}
		);
	}

	directoryExistsAtPath(directoryPath)
	{
		return fs.existsSync(directoryPath);
	}

	fileAtPathContentsRead(filePath, callback)
	{
		return fs.readFileSync(filePath);
	}

	fileAtPathContentsReadAsync(filePath, callback)
	{
		fs.readFile
		(
			filePath,
			this.textEncodingName,
			(err, fileContents) =>
			{
				if (err != null)
				{
					throw err;
				}
				else
				{
					callback(fileContents);
				}
			}
		);
	}

	fileAtPathWriteStringAsync(filePath, contentsToWrite, callback)
	{
		fs.writeFile
		(
			filePath,
			contentsToWrite,
			this.textEncodingName,
			(err) =>
			{
				if (err != null)
				{
					throw err;
				}
				else
				{
					callback();
				}
			}
		);
	}

	fileNamesGetInDirectoryAtPathAsync(directoryPath, callback)
	{
		fs.readdir
		(
			directoryPath,
			(err, fileNames) =>
			{
				if (err != null)
				{
					throw err;
				}
				else
				{
					callback(fileNames);
				}
			}
		);
	}

}