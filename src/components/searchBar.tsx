import { Input, Button } from 'antd';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ query, setQuery, onSearch }: Props) => {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950 pb-4 pt-6 px-6 flex items-center gap-4 justify-between shadow-md">
      <h1 className="text-3xl font-bold text-purple-400 tracking-wide">
        SKUBERG
      </h1>
      <div className="flex gap-2 w-full max-w-md">
        <Input
          className="bg-zinc-900 text-white placeholder-gray-400"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={onSearch}
        />

        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
