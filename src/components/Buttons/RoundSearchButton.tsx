import SearchIcon from '@mui/icons-material/Search';
import { RoundSearchButton as RoundSearchButtonType } from '../../types/roundsearchbutton';

const RoundSearchButton = ({ onClick }: RoundSearchButtonType) => {
  return (
    <button
      data-testid="round-search-button"
      className="p-2 rounded-full bg-primary hover:bg-primary-dark"
      onClick={onClick}
    >
      <SearchIcon className="w-6 h-6 text-white" />
    </button>
  );
};

export default RoundSearchButton;