import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Loader from "../../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  getAllProductsByCategoryBased,
  productGetById,
} from "../../../redux/actions/productAction";
import {
  addToCart,
  clearError,
  clearMessage,
} from "../../../redux/reducers/productReducer";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import ProductCard from "../home/ProductCard";
function ProductDetail() {
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [localReviews, setLocalReviews] = useState([]);
  const dispatch = useDispatch();
  const { singalData, categoryProductData, loading, error, message } =
    useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const categoryId = singalData?.category?._id;

  useEffect(() => {
    dispatch(productGetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLocalReviews(singalData?.reviews);
  }, [singalData?.reviews]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  useEffect(() => {
    if (categoryId) {
      dispatch(getAllProductsByCategoryBased(categoryId));
    }
  }, [dispatch, categoryId]);
  const handleIncreaseQuantity = () => {
    if (quantity < singalData?.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: singalData, quantity: quantity }));
    toast.success("Add to Cart");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = () => {
    const reviewData = {
      rating: rating,
      comment: comment,
    };

    dispatch(createProductReview({ id, reviewData }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      dispatch(productGetById(id));
      setRating(0);
      setComment("");
      closeModal();
    }
  }, [error, message, dispatch, toast]);

  // Filter out the detailed product from category products
  const filteredCategoryProducts = categoryProductData?.filter(
    (product) => product._id !== id
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <img
                  src={singalData?.images[currentImageIndex]?.url}
                  alt={singalData?.name}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="flex justify-center">
                {singalData?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail cursor-pointer mr-2 ${
                      index === currentImageIndex
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image?.url}
                      alt={singalData?.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                {singalData?.name}
              </h2>
              <p className="text-lg mb-6">{singalData?.description}</p>
              <div className="flex items-center mb-6">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="px-4 py-2 w-12 text-center bg-gray-100"
                />
                <button
                  onClick={handleIncreaseQuantity}
                  className={`px-4 py-2 bg-gray-200 rounded-r ${
                    quantity === singalData?.quantity
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                >
                  +
                </button>
                {user?.role !== "seller" && (
                  <button
                    onClick={handleAddToCart}
                    className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <p className="text-lg">
                Available Quantity: {singalData?.quantity}
              </p>
              <div className="flex items-center mb-4">
                <div
                  className="w-8 h-8 rounded-full mr-2"
                  style={{ backgroundColor: singalData?.color }}
                ></div>
                <p className="text-lg">Color: {singalData?.color}</p>
              </div>
              <p className="text-lg">Size: {singalData?.size}</p>
              <p className="text-lg">Weight: {singalData?.weight} kg</p>
              <p className="text-lg">
                Dimensions: {singalData?.dimensions?.length} x{" "}
                {singalData?.dimensions?.width} x{" "}
                {singalData?.dimensions?.height} inches
              </p>
              <p className="text-lg">Category: {singalData?.category?.name}</p>
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-2">Seller Details</h3>
                <p className="text-lg">
                  Company Name: {singalData?.seller?.sellerInfo?.companyName}
                </p>
                <p className="text-lg">
                  Address: {singalData?.seller?.sellerInfo?.address}
                </p>
                <p className="text-lg">
                  Phone Number: {singalData?.seller?.sellerInfo?.phoneNumber}
                </p>
                <div className="flex items-center gap-5 mt-5">
                  <Link
                    to={`/seller-store/${singalData?.seller?.sellerInfo?._id}`}
                  >
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      View Store
                    </button>
                  </Link>
                  {user?.role !== "seller" && (
                    <button
                      onClick={openModal}
                      className="flex items-center bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
                    >
                      <MdAdd className="mr-2" /> Add Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Review</h2>
                {/* Star ratings */}
                <StarRatings
                  rating={rating}
                  starRatedColor="#FFD700"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name="rating"
                />
                {/* Comment input */}
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Write your review..."
                  className="mt-4 p-2 w-full border rounded-md"
                  rows={4}
                />
                {/* Submit button */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSubmitReview}
                    className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={closeModal}
                    className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-4">Reviews</h3>
            {localReviews?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localReviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <p className="text-xl font-semibold mb-2">{review?.name}</p>
                    <StarRatings
                      rating={review?.rating}
                      starDimension="20px"
                      starSpacing="2px"
                      starRatedColor="#FFD700"
                      numberOfStars={5}
                      name={`rating-${index}`}
                    />
                    <p className="text-lg">{review?.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg">No reviews yet.</p>
            )}
          </div>

          {/* <div className="py-20">
            <h1 className="text-4xl font-bold text-gray-800 my-10">
              Related products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10 px-10 bg-slate-100 rounded-xl">
              {filteredCategoryProducts &&
              filteredCategoryProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCategoryProducts?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-lg">No related products found.</p>
              )}
            </div>
          </div>
           */}
          {/* <div className="py-20">
            <h1 className="text-4xl font-bold text-gray-800 my-10">
              Related products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 px-10 bg-slate-100 rounded-xl">
              {filteredCategoryProducts &&
              filteredCategoryProducts.length > 0 ? (
                filteredCategoryProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              ) : (
                <p className="text-lg">No related products found.</p>
              )}
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default ProductDetail;
