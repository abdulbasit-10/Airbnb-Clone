import React from "react";

function SignUpModal({ setView }) {
  return (
    <div
      className="absolute top-0 inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Sign up modal"
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
            }}
            className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:shadow"
            aria-label="Close sign up modal"
          >
            ✕
          </button>

          <div className="p-6 sm:p-8">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Welcome! Please fill in the details to get startd.
            </p>

            {/* Google button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => console.log("Google button clicked")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              >
                {/* Google SVG */}
                <svg width="20" height="20" viewBox="0 0 48 48" className="mr-1" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.23 3.22l6.9-6.9C36.62 2.54 30.7 0 24 0 14.64 0 6.4 5.48 2.44 13.44l8.06 6.27C12.6 13.09 17.85 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9.02h12.45c-.54 2.9-2.17 5.36-4.62 7.02l7.18 5.59C43.98 37.36 46.1 31.41 46.1 24.5z"/>
                    <path fill="#FBBC05" d="M10.5 28.71c-1.01-2.99-1.01-6.23 0-9.22l-8.06-6.27C.81 17.41 0 20.62 0 24c0 3.38.81 6.59 2.44 9.78l8.06-6.27z"/>
                    <path fill="#EA4335" d="M24 46c6.7 0 12.62-2.21 16.91-6.04l-7.18-5.59c-2.01 1.36-4.59 2.13-7.73 2.13-6.15 0-11.4-3.59-13.5-8.71l-8.06 6.27C6.4 42.52 14.64 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </g>
                </svg>
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

            {/* Password input with eye icon */}
            <label className="block mt-5 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 pr-12"
                aria-label="Password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Show password"
                // Add onClick logic for toggling password visibility if needed
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={() => console.log("Continue clicked")}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-400 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
            >
              Continue
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signIn")}
                className="text-green-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-amber-50 border-t border-amber-100 px-6 py-3 text-center text-sm text-gray-600">
            <span>Secured by Clerk</span>
            <div className="text-xs text-orange-600 mt-2">Development mode</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage({setView}) {
  return (
    <div className="h-screen absolute w-[100%] top-0 flex items-center justify-center bg-gray-100/50">
      {/* Modal */}
      <SignUpModal setView={setView} />
    </div>
  );
}
