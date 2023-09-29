import React, { useState } from 'react';

function VideoPlayer({ videoUrl }) {
  const [showModal, setShowModal] = useState(false);

  function handlePlayClick() {
    setShowModal(true);
  }

  function handleCloseClick() {
    setShowModal(false);
  }

  return (
    <div>
      {!showModal && (
        <button onClick={handlePlayClick} className="mt-1 btn btn-secondary">
          Play Video
        </button>
      )}

      {showModal && (
 

        <div class="fixed z-10 inset-0">
          <div class="flex items-center justify-center h-[70vh]">
            <div class="fixed inset-0 bg-gray-500 opacity-75 w-full"></div>
            <div class="bg-white rounded-lg p-2 md:p-8 absolute top-24 left-0 right-0">
              <div class="relative pb-9/16">
                <video
                  src={videoUrl}
                  controls
                  className="md:w-[50%] md:h-[40%] mx-auto w-full h-full"
                />
                <span
                  onClick={handleCloseClick}
                  className="cursor-pointer text-5xl btn btn-secondary my-4  z-50"
                >
                  Close
                </span>
              </div>
            </div>{' '}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
