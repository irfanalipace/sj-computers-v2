import React from 'react'
import "./ReviewDialog.css"

const ImageGallery = ({getReviewById, ReviewsData}) => {
  return (
    <div style={{ height: "30rem" }}>
                        <div className="gallery-container">
                            {ReviewsData?.data?.map((data, i) => (
                                <React.Fragment key={data.id}>
                                {data?.product_media?.map((image, index) => (
                                <div
                                    key={image?.id}
                                    className="images-container"
                                >
                                    <div
                                        onClick={() =>
                                            getReviewById(
                                                image?.product_review_id,
                                                image?.id,
                                                index
                                            )
                                        }
                                        className="image-item"
                                        style={{
                                            backgroundImage: `url(${image?.file_path})`,
                                        }}
                                    ></div>
                                </div>
                                ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
  )
}

export default ImageGallery