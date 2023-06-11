import { useState } from "react"
import PromptCard from "./PromptCard"

export default function Feed({ allPosts }) {
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  function filterPrompts(searchtext) {
    const trimmedSearchText = searchtext.trim() // Remove whitespace from the start and end
    const regex = new RegExp(trimmedSearchText, "i") // 'i' flag for case-insensitive search
    return allPosts.filter((item) => {
      return (
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      )
    })
  }

  function handleSearchChange(e) {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(setTimeout(() => {
      const searchResult = filterPrompts(e.target.value)
      setSearchedResults(searchResult)
    }, 500)) // debounce method
  }

  function handleTagClick(tagName) {
    setSearchText(tagName)
    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <secton className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchText}
          onChange={handleSearchChange}
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer"
          required
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </secton>
  )
}

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
