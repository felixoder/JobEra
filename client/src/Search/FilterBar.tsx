// FilterBar.tsx
import  { useState } from 'react';

interface Props {
  onFilter: (filters: Record<string, string>) => void;
}

const FilterBar: React.FC<Props> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    title: '',
    company: '',
    salary: '',
    experience: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleFilterSubmit} className="flex flex-col gap-2 items-center mt-4 justify-center md:flex-row">
      <input
        type="text"
        name="title"
        value={filters.title}
        onChange={handleInputChange}
        placeholder="Filter by title..."
        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md mr-2"
      />
      <input
        type="text"
        name="company"
        value={filters.company}
        onChange={handleInputChange}
        placeholder="Filter by company..."
        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md mr-2"
      />
      <input
        type="text"
        name="salary"
        value={filters.salary}
        onChange={handleInputChange}
        placeholder="Filter by salary..."
        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md mr-2"
      />
      <input
        type="text"
        name="experience"
        value={filters.experience}
        onChange={handleInputChange}
        placeholder="Filter by experience..."
        className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Apply Filters
      </button>
    </form>
  );
};

export default FilterBar;
