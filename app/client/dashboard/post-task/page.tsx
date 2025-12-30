export default function PostTaskPage() {
  return (
    <div className="space-y-5 w-9/12 mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Post a Task</h1>
          <p className="opacity-70 mt-1">
            Share details clearly. Taskers will bid based on your description.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <span className="badge badge-outline">Client</span>
          <span className="badge badge-outline">New Task</span>
        </div>
      </div>

      {/* Layout: Form + Preview */}
      <div className="grid gap-6">
        {/* Form */}
      <div className=" space-y-8">

          {/* Section 1 */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
     <div className="flex items-center gap-2">
  <span className="text-lg">📝</span>
  <h2 className="text-lg font-bold">Task Information</h2>
</div>

              <p className="text-sm opacity-70">
                Give your task a clear title and choose the best category.
              </p>

              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pb-2 pr-2">Task Title</span>
                  </label>
                  <input
                    className="input input-bordered"
                    placeholder="e.g., Fix my kitchen sink"
                  />
                  {/* <p className="text-xs opacity-70 mt-2">
                    Keep it short and specific.
                  </p> */}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pb-2 pr-2">Category</span>
                  </label>
                  <select className="select select-bordered">
                    <option>Cleaning</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Moving</option>
                    <option>Delivery</option>
                    <option>Gardening</option>
                  </select>
                  {/* <p className="text-xs opacity-70 mt-2">
                    Helps taskers find your job faster.
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <h2 className="text-lg font-bold">Details</h2>
              </div>
              <p className="text-sm opacity-70">
                Add location and describe the task properly.
              </p>

              <div className="grid gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pr-8 ">Location</span>
                  </label>
                  <input
                    className="input input-bordered"
                    placeholder="e.g., Sylhet"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pr-3">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-32"
                    placeholder="Explain the task details clearly..."
                  />
                  <p className="text-xs opacity-70 mt-2">
                    Mention tools needed, exact address area, and expected time.
                  </p>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pb-2">Images (optional)</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered w-full" />
                  <p className="text-xs opacity-70 mt-2">
                    Add photos if it helps taskers understand faster.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <span className="text-lg">⏰</span>
                <h2 className="text-lg font-bold ">Schedule & Budget</h2>
              </div>
              <p className="text-sm opacity-70">
                Set your deadline and approximate budget.
              </p>

              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pb-2 pr-2">Deadline</span>
                  </label>
                  <input type="date" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium pb-2 pr-2">Budget (BDT)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
                {/* <button className="btn btn-outline rounded-full">
                  Save Draft
                </button> */}
                <button className="btn btn-primary rounded-full">
                  Post Task
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview (Right side) */}
        {/* <div className="card bg-base-100 border border-base-300 h-fit"> */}
          {/* <div className="card-body">
            <h3 className="font-bold text-lg">Preview</h3>
            <p className="text-sm opacity-70">
              This is how taskers will see your post.
            </p> */}

            {/* <div className="mt-4 p-4 rounded-xl border border-base-300 bg-base-200">
              <p className="font-semibold">Task Title</p>
              <p className="text-sm opacity-70 mt-1">Category • Location</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="badge badge-info">Open</span>
                <span className="font-bold">৳ 0</span>
              </div>

              <p className="text-sm opacity-70 mt-3">
                Task description will appear here...
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">Tips</p>
              <ul className="list-disc pl-5 text-sm opacity-70 mt-2 space-y-1">
                <li>Use a clear title.</li>
                <li>Give exact requirements.</li>
                <li>Add photos if needed.</li>
              </ul>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
