// imageData.js

const loadMediaFiles = async () => {
  const mediaModules = import.meta.glob("../assets/photos/*.{jpg,png,mp4}");

  const mediaPaths = await Promise.all(
    Object.values(mediaModules).map(async (resolver) => {
      // Resolve each module to get the final URL
      const module = await resolver();
      return module.default;
    })
  );

  return mediaPaths;
};

export { loadMediaFiles };
