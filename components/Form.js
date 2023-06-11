import Link from "next/link"

export default function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex flex-col justify-start items-start">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-start">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {type} Post
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl text-start max-w-md">
        {type} and share amazing AI-Powered prompts with the world, and let your imagination run wild with any AI-powered paltform.
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur p-5 mb-6"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Prompt Tag {" "}
            <span className='font-normal'>
              (e.g. #product, #webdev, #idea, etc.)
            </span>
          </span>
          <input
            type='text'
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#Tag"
            className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0"
            required
          />
        </label>
        <div className="flex justify-end items-center mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className={`
              px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white 
              ${submitting && "opacity-50 cursor-not-allowed"}
            `}
          >
            {submitting ? "Submitting..." : type}
          </button>
        </div>
      </form>
    </section>
  )
}
