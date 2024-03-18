import React, { createContext, useState, useContext, useCallback } from 'react';

const MediaContext = createContext();

export const useMediaContext = () => useContext(MediaContext);

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState([]);

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      } else {
        throw new Error('Failed to fetch media');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }, []);

  const createMedia = useCallback(async (formData, isAIGenerated = false) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {},
      };
  
      if (isAIGenerated) {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(formData);
      } else {
        fetchOptions.body = formData;
      }
  
      const response = await fetch('/api/media', fetchOptions);
  
      if (response.ok) {
        const newMedia = await response.json();
        setMedia((prevMedia) => [...prevMedia, newMedia]);
        return newMedia;
      } else {
        throw new Error('Failed to create media');
      }
    } catch (error) {
      console.error('Error creating media:', error);
      throw error;
    }
  }, []);
  
  

  const updateMedia = useCallback(async (id, updatedData) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchMedia();
      } else {
        throw new Error('Failed to update media');
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  }, [fetchMedia]);

  const deleteMedia = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMedia((prevMedia) => prevMedia.filter(m => m.id !== id));
      } else {
        throw new Error('Failed to delete media');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  }, []);

  return (
    <MediaContext.Provider value={{
      media,
      createMedia,
      updateMedia,
      deleteMedia,
    }}>
      {children}
    </MediaContext.Provider>
  );
};
