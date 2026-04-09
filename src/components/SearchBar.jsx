import { useForm } from 'react-hook-form'

const SearchBar = ({ onSearch, isLoading }) => {
  let { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (data.city.trim() !== '') {
      onSearch(data.city);
      reset(); // clear the search bar after submitting
    }
  }

  return (
    <div className="search-container mt-4 mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="search-form mx-auto">
        <input
          type="text"
          placeholder="Search for a city..."
          {...register("city", { required: true })}
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '20px', height: '20px' }}></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchBar