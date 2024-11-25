import { useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const useSupabase = () => {
    const [loadingSupabase, setLoadingSupabase] = useState(false);
    const [error, setError] = useState(null);

    async function uploadFile(file, bucketName) {
        setLoadingSupabase(true);
        setError(null);
        try {
            // Generate a unique identifier and concatenate it to the file name
            const uniqueFileName = `${file.name.split('.').slice(0, -1).join('.')}-${uuidv4()}.${file.name.split('.').pop()}`;
    
            const { data, error } = await supabase.storage.from(bucketName).upload(uniqueFileName, file, {
                cacheControl: '3600',
                upsert: false, // Prevent overwriting files with the same name
            });
    
            if (error) {
                console.error("Error uploading Supabase file:", error.message);
                setError(error.message);
                return null; // Return null on error
            }
    
            // Return the file path (uniqueFileName) if upload is successful
            return data?.path; // This is the path to the file in Supabase storage (the unique file name)
    
        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);
            return null; // Return null on any error
        } finally {
            setLoadingSupabase(false);
        }
    }
    


    // Get file URL from Supabase
    async function getFileUrl(bucketName, filePath) {
        setError(null);

        try {
            const { data, error } = supabase.storage.from(bucketName).getPublicUrl(filePath);

            if (error) throw error;
                return data.publicUrl;

        } catch (err) {
            setError(err.message);
            return null;
        }
    }

    // Download a file from Supabase
    async function downloadFile(bucketName, filePath) {
        setLoadingSupabase(true);
        setError(null);

        try {
            const { data, error } = await supabase.storage.from(bucketName).download(filePath);

            if (error) throw error;
            // Create a Blob URL for the file and trigger download
            const blob = new Blob([data]);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filePath.split('/').pop(); // Extract filename from the path
            link.click();    

            // Clean up the Blob URL after download
            URL.revokeObjectURL(link.href);     
            return true;

        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoadingSupabase(false);
        }
  }

    return { uploadFile, getFileUrl, downloadFile, loadingSupabase, error };
};
