import ImageCard from '../image-card/image-card';
import ImageCardSkeleton from '../image-card-skeleton/image-card-skeleton';
const PopularLocations = (props) => {
  const { popularDestinationsData } = props;
  return (
    <div className="my-4">
      <h2 className="text-3xl font-medium text-slate-700 text-center">
        Book Hotels at Popular Destinations
      </h2>
      <div className="flex my-4 gap-x-8 gap-y-4 justify-center flex-wrap">
        {popularDestinationsData.isLoading
          ? Array.from({ length: 5 }, (_, index) => (
              <ImageCardSkeleton key={index} />
            ))
          : popularDestinationsData.data.map((city) => (
              <ImageCard
                key={city.code}
                name={city.name}
                imageUrl={city.imageUrl}
              />
            ))}
      </div>
    </div>
  );
};
export default PopularLocations;
