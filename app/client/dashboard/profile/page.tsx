export default function ClientProfilePage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="avatar mb-3">
            <div className="w-24 rounded-full bg-base-200 border border-base-300" />
          </div>

          <h1 className="text-2xl font-bold">Your Name</h1>
          <p className="text-sm opacity-70">client@email.com</p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body space-y-5">
            <h2 className="text-lg font-bold">Personal Information</h2>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-4"> Name</span>
              </label>
              <input
                className="input input-bordered h-12"
                placeholder="Your full name"
              />
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-4">Phone</span>
              </label>
              <input
                className="input input-bordered h-12"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-1.5 ">Address</span>
              </label>
              <input
                className="input input-bordered h-12"
                placeholder="Area, city, details..."
              />
            </div>

            {/* Preferred Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-1">
                   Category
                </span>
              </label>
              <select className="select select-bordered h-12">
                <option>Cleaning</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Moving</option>
                <option>Delivery</option>
                <option>Gardening</option>
              </select>
            </div>

            {/* Communication */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-3">
                  Connect 
                </span>
              </label>
              <select className="select select-bordered h-12">
                <option>Phone</option>
                <option>Email</option>
                <option>In-app messages</option>
              </select>
            </div>

            {/* Profile Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium pr-6"> Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered h-12"
              />
              <p className="text-xs opacity-60 mt-1">
                Optional. You can update this anytime.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3 mx-auto">
              <button className="btn btn-primary rounded-full w-full  h-12">
                Save Changes
              </button>
              <button className="btn btn-outline rounded-full w-full h-12">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
