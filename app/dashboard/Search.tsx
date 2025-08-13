import { Input } from "@/components/ui/input";
import useDebounce from "@/lib/hooks/useDebounce";
import { Board } from "@/lib/supabase/models";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({
  setFilteredBoards,
  boards,
}: {
  boards: Board[];
  setFilteredBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm);
  useEffect(() => {
    if (debouncedValue) {
      setFilteredBoards(() =>
        boards.filter((board) =>
          board.title.toLowerCase().includes(debouncedValue.toLowerCase())
        )
      );
    } else {
      setFilteredBoards(boards);
    }
  }, [debouncedValue, boards]);

  return (
    <div className="relative mb-4 sm:mb-6">
      <Search className="absolute left-3 top-1/2 transform text-gray-400 -translate-y-1/2 h-4 w-4" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        placeholder="Search boards..."
        className="pl-10"
      />
    </div>
  );
};
export default SearchBar;
