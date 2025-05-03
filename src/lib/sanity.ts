// Temporary mock implementation of urlForImage
export function urlForImage(source: { asset: { _ref: string } }) {
  // Return placeholder images based on the reference
  const imageMap = {
    'image-sarah': 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800',
    'image-michael':
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    'image-emily': 'https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg?auto=compress&cs=tinysrgb&w=800',
    'image-1234':
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };

  return {
    width: (w: number) => ({
      url: () => imageMap[source.asset._ref] || 'https://via.placeholder.com/800x600',
    }),
  };
}
