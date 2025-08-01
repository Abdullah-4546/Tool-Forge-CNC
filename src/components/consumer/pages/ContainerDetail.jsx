import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { containerGetById, placeBid, fetchBids } from "../../../redux/actions/containerAction";
import toast from "react-hot-toast";

function ContainerDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { containers, loading, error, bids } = useSelector((state) => state.container);
  const [bidAmount, setBidAmount] = useState(0);
  const [isBiddingEnded, setIsBiddingEnded] = useState(false);
  const [isWinner, setIsWinner] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(containerGetById(id));   
        await dispatch(fetchBids(id));         
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (containers?.endTime) {
      const currentTime = new Date().getTime();
      const endTime = new Date(containers?.endTime).getTime();
      setIsBiddingEnded(currentTime > endTime);  
      setIsWinner(bids?.user?._id === winningBid?.user?._id);
    }
  }, [containers?.endTime ,isWinner,isBiddingEnded ]);

  const containerBids = bids[id] || { bids: [], highestBid: 0 }; 
  const highestBid = containerBids.highestBid;
  const winningBid = containerBids.bids.find(bid => bid.amount === highestBid);

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };
  const handleAddToCart = () => {
    if (isWinner) {
      toast.success("Added to cart");
    }
  }
  const handlePlaceBid = async () => {
    if (parseFloat(bidAmount) <= highestBid) {
      toast.error(`Bid amount must be greater than the current highest bid of $${highestBid}`);
      return;
    }

    const bidData = {
      containerId: id,
      amount: parseFloat(bidAmount),
    };

    try {
      await dispatch(placeBid(bidData)).unwrap();
      toast.success("Bid placed successfully!");
      setBidAmount(0);
      await dispatch(fetchBids(id)); 
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <Loader />; 

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-center items-start space-x-4">
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        {containers?.images?.length > 0 ? (
          <img
            src={containers?.images[0]?.url}
            alt={containers?.title}
            className="rounded-lg shadow-lg w-full"
          />
        ) : (
          <p className="text-lg mb-6">No image available</p>
        )}
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold mb-4">{containers?.title}</h2>
        <p className="text-lg mb-6">{containers?.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Starting Bid Price: <span className="text-xl">${containers?.startingPrice}</span>
          </h3>
          <h3 className="text-lg font-semibold mb-2">
            Current Highest Bid: <span className="text-xl">${highestBid}</span>
          </h3>
          {isBiddingEnded && winningBid && (
          <div className="mt-6 p-4 border-t border-b">
            <h3 className="text-xl font-semibold text-green-600">Winner:</h3>
            <p className="text-lg">Username: {winningBid.user?.username || "Unknown User"}</p>
            <p className="text-lg">Winning Bid: ${winningBid.amount}</p>
          </div>
        )}
          {isWinner && isBiddingEnded && (
          <div className="mt-6">
            <h6>Congratulation's You Won The Bid. Now, You Can Proceed To Check Out .</h6>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        )}
        </div>
        <div className="mb-6">
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidChange}
            placeholder="Enter your bid amount"
            className="border p-2 rounded w-full md:w-1/2"
            disabled={isBiddingEnded} 
          />
          <button
            onClick={handlePlaceBid}
            className={`mt-4 ml-2 px-6 py-3 ${isBiddingEnded ? "bg-gray-400" : "bg-blue-400"} text-white rounded-md hover:${isBiddingEnded ? "bg-gray-400" : "bg-blue-600"}`}
            disabled={isBiddingEnded} 
          >
            {isBiddingEnded ? "Bidding Ended" : "Place Bid"}
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Bidding End Time: <span className="text-xl">{new Date(containers?.endTime).toLocaleString()}</span>
          </h3>
        </div>
        <div className="mt-6 max-h-64 overflow-y-auto border p-4 rounded-lg shadow-inner bg-gray-50">
          <h4 className="text-lg font-semibold mb-4">Bidding Details:</h4>
          {containerBids.bids.length > 0 ? (
            containerBids.bids.map((bid, index) => (
              <div key={index} className="flex justify-between mb-2 p-2 border-b">
                <span className="font-semibold">{bid.user?.username || "Unknown User"}</span>
                <span className="font-semibold text-sm">{new Date(bid.createdAt).toLocaleString()}</span>
                <span className="text-blue-500 font-semibold">${bid.amount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bids yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContainerDetail;
