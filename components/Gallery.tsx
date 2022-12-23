import ReactImageGallery from "react-image-gallery";
// CSS
import "react-image-gallery/styles/css/image-gallery.css";

function Gallery({ img }: any) {
  let images = img.map((x: any) => {
    return { original: x, thumbnail: x };
  });

  return (
    <div>
      <ReactImageGallery items={images} />
    </div>
  );
}

export default Gallery;
