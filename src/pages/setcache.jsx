import React from "react";
import { listAll, storage, ref, getMetadata, updateMetadata } from '../../firebase';

const setCacheControlForAllFiles = async () => {
  try {
    const storageRef = ref(storage, "contents/lesideeen"); // Replace "contents" with your folder path
    const result = await listAll(storageRef);
    const files = result.items;

    const promises = files.map(async (fileRef) => {
      try {
        const metadata = await getMetadata(fileRef);
        const newMetadata = { ...metadata, cacheControl: 'public, max-age=2592000' }; // Cache for 30 days

        await updateMetadata(fileRef, newMetadata);
        console.log(`Cache-Control set for file: ${fileRef.name}`);
      } catch (error) {
        console.error(`Error setting Cache-Control for file: ${fileRef.name}`, error);
      }
    });

    await Promise.all(promises);
    console.log("Cache-Control metadata applied to all files.");
  } catch (error) {
    console.error("Error applying Cache-Control to all files:", error);
  }
};

const CacheControlComponent = () => {
  return (
    <div>
      {/* <h1>Apply Cache-Control Metadata</h1>
      <button onClick={setCacheControlForAllFiles}>Set Cache-Control for All Files</button>
      <p>Click the button to apply Cache-Control metadata to all files in the folder.</p> */}
    </div>
  );
};

export default CacheControlComponent;
