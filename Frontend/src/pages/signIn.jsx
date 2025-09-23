import React, { useState } from "react";

function SignInModal({ open = false, onClose = () => {}, setView }) {
  if (!open) return null;

  return (
    <div
      className="absolute top-0 inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in modal"
      onClick={() => {
        console.log("Overlay clicked -> closing modal");
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside card
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            type="button"
            onClick={() => {
                setView("");
              console.log("Close button clicked");
              onClose();
            }}
            className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:shadow"
            aria-label="Close sign in modal"
          >
            ✕
          </button>

          <div className="p-6 sm:p-8">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Sign in to Ai Hunt
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Welcome back! Please sign in to continue
            </p>

            {/* Google button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => console.log("Google button clicked")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              >
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email input */}
            <label className="block mt-5 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Email address"
            />

            <button
              type="button"
              onClick={() => console.log("Continue clicked")}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
            >
              Continue
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => console.log("Sign up clicked")}
                className="text-green-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-amber-50 border-t border-amber-100 px-6 py-3 text-center text-sm text-gray-600">
            <span>Secured by Clerk</span>
            <div className="text-xs text-orange-600 mt-1">Development mode</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage({setView}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen absolute w-[100%] top-0 flex items-center justify-center bg-gray-100/50">
      {/* Button to open modal */}
      <button
        type="button"
        onClick={() => {
          console.log("Open clicked -> setOpen(true)");
          setOpen(true);
        }}
        className="px-6 py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
      >
        Sign In
      </button>

      {/* Modal */}
      <SignInModal open={open} onClose={() => setOpen(false)} setView={setView} />
    </div>
  );
}
