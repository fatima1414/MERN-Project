const ImageList = ({ images }) => (
  <td>
    {images?.map((img, i) => (
      <img
        key={img}
        className="p-3"
        src={`${import.meta.env.VITE_IMAGE_URL}/${img}`}
        width="120"
        height="100"
        alt=""
      />
    ))}
  </td>
);

export default ImageList;
