"use client";

const SpinLoader = () => {
  return (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 9999;
        }
        .spinner:before {
          content: "";
          box-sizing: border-box;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid #ccc;
          border-top-color: #0070f3;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SpinLoader;
