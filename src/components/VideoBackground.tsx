'use client';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover filter blur-[2px]"
        // This is a placeholder video showing a chef plating a dish.
        // For best results, replace with your own high-quality, optimized video.
        // Source: https://coverr.co/videos/chef-s-special-AB2m9bT2c
        src="https://utfs.io/f/b8de156c-8137-4591-a1e4-39908d0e405d-k438j9.mp4"
      >
        <source
          src="https://utfs.io/f/b8de156c-8137-4591-a1e4-39908d0e405d-k438j9.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Soft dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
    </div>
  );
};

export default VideoBackground;
