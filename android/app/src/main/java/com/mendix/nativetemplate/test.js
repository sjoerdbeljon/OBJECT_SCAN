function storeFile(imageObject, uri) {​​
	return new Promise((resolve, reject) => {​​
		fetch(uri)
			.then(res => res.blob())
			.then(blob => {​​
				const guid = imageObject.getGuid();
				const filename = /[^\/]*$/.exec(uri)[0];
				const onSuccess = () => {​​
					NativeModules.NativeFsModule.remove(uri).then(() => {​​
						imageObject.set("Name", filename);
						mx.data.commit({​​
							mxobj: imageObject,
							callback: () => resolve(true),
							error: error => reject(error)
						}​​);
					}​​);
				}​​;
				const onError = error => {​​
					NativeModules.NativeFsModule.remove(uri).then(undefined);
					reject(error);
				}​​;
				mx.data.saveDocument(guid, filename, {​​}​​, blob, onSuccess, onError);
			}​​);
	}​​);
}