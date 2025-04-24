import { BlobServiceClient } from "@azure/storage-blob";

const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;
const containerName = import.meta.env.VITE_AZURE_STORAGE_CONTAINER_NAME;

if (!accountName || !sasToken || !containerName) {
  throw new Error("Azure Storage environment variables are not defined");
}

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net?${sasToken}`
);

export const uploadImageToAzureBlob = async (file: File): Promise<string> => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = new Date().getTime() + "-" + file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file);

    return blockBlobClient.url;
  } catch (error) {
    console.error("Failed to upload image to Azure Blob Storage:", error);
    throw new Error("Failed to upload image to Azure Blob Storage");
  }
};
